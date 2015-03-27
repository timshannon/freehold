// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// store is the wrapper around the cznic/kv to match the minimum interface
// used by freehold for a KV store.

package store

import (
	"bytes"
	"io"
	"log"
	"log/syslog"
	"os"
	"sync"
	"time"

	"github.com/cznic/kv"
)

// DS is a datstore, holds the pointer to the
// underlying kv file, and keeps track of
// when a file timesout and needs to be closed
type DS struct {
	*kv.DB
	filePath string
	timeout  *time.Timer
}

type timeoutLock struct {
	sync.RWMutex
	duration time.Duration
}

var timeout timeoutLock
var files openedFiles

func options() *kv.Options {

	return &kv.Options{
		VerifyDbAfterOpen:   true,
		VerifyDbBeforeOpen:  true,
		VerifyDbAfterClose:  true,
		VerifyDbBeforeClose: true,
		Locker:              freeholdLocker,
	}
}

func init() {
	timeout = timeoutLock{RWMutex: sync.RWMutex{}, duration: 1 * time.Minute}
	files = openedFiles{
		RWMutex: sync.RWMutex{},
		files:   make(map[string]*DS),
	}

}

// Halt closes all open datastore files
func Halt() {
	for k := range files.files {
		files.close(k)
	}
}

// SetFileTimeout sets when the file will automatically close
// after the timeout duration has passed with no activity on the datastore file.
// Any new activity will restart the timeout.  Shorter timeout means fewer open files, but less
// concurrency due to locking on open.
func SetFileTimeout(newTimeout time.Duration) {
	timeout.Lock()
	timeout.duration = newTimeout
	defer timeout.Unlock()
}

// Timeout returns the current file timeout value
func Timeout() time.Duration {
	timeout.RLock()
	defer timeout.RUnlock()

	return timeout.duration
}

// opendFiles keeps track of previous opened files
type openedFiles struct {
	sync.RWMutex
	files map[string]*DS
}

// Open opens an existing datastore file
func (o *openedFiles) open(name string) (*DS, error) {
	o.RLock()
	if DS, ok := o.files[name]; ok {
		o.RUnlock()
		err := DS.reset()
		if err != nil {
			return nil, err
		}
		return DS, nil
	}

	o.RUnlock()

	o.Lock()
	defer o.Unlock()

	db, err := kv.Open(name, options())
	if err != nil {
		return nil, err
	}

	DS := &DS{
		DB:       db,
		filePath: name,
		timeout: time.AfterFunc(Timeout(), func() {
			o.close(name)
		}),
	}

	o.files[name] = DS
	return DS, nil
}

func (o *openedFiles) close(name string) {
	o.Lock()
	defer o.Unlock()
	db, ok := o.files[name]
	if ok {
		delete(o.files, name)
		err := db.Close()

		if err != nil {
			logError(err)
		}

	}
}

func (o *openedFiles) drop(name string) error {
	o.Lock()
	defer o.Unlock()
	wal := ""

	db, ok := o.files[name]
	if ok {
		delete(o.files, name)
		wal = db.WALName()

		err := db.Close()
		if err != nil {
			return err
		}

		if _, ferr := os.Stat(wal); ferr == nil {
			//clean up wal file
			err := os.Remove(wal)
			if err != nil {
				return err
			}
		}
	}
	// if db isn't open, then just remove the file
	return os.Remove(name)
}

func (d *DS) reset() error {
	if !d.timeout.Reset(Timeout()) {
		var err error
		d, err = files.open(d.filePath)
		return err
	}
	return nil
}

// Get get's a value from the datastore
func (d *DS) Get(key []byte) ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	result, err := d.DB.Get(nil, key)

	return result, err
}

// Max returns the max value in the datastore
func (d *DS) Max() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	key, _, err := d.DB.Last()
	return key, err
}

// Min returns the min value in the datastore
func (d *DS) Min() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	key, _, err := d.DB.First()
	return key, err
}

// Put puts a new value in the datastore
func (d *DS) Put(key, value []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}

	return d.DB.Set(key, value)
}

// Delete deletes a value from the datastore
func (d *DS) Delete(key []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}
	return d.DB.Delete(key)
}

// Iter returns an iteratore for the datastore
func (d *DS) Iter(from, to []byte) (Iterator, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}

	if to != nil && bytes.Compare(from, to) == 1 {
		enum, _, err := d.DB.Seek(from)
		if err != nil {
			return nil, err
		}
		return &KvIterator{
			ds:         d,
			Enumerator: enum,
			from:       from,
			to:         to,
			reverse:    true,
			err:        nil,
		}, nil

	}

	enum, _, err := d.DB.Seek(from)
	if err != nil {
		return nil, err
	}
	return &KvIterator{
		ds:         d,
		Enumerator: enum,
		from:       from,
		to:         to,
		err:        nil,
	}, nil
}

// KvIterator is a key value iterator
type KvIterator struct {
	ds *DS
	*kv.Enumerator
	reverse bool
	from    []byte
	to      []byte
	key     []byte
	value   []byte
	err     error
}

// Next gets the next value from the iterator
func (i *KvIterator) Next() bool {
	err := i.ds.reset()
	if err != nil {
		i.err = err
		return false
	}

	var key, value []byte

	if i.reverse {
		key, value, err = i.Enumerator.Prev()

		if err == io.EOF {
			return false
		}
		if bytes.Compare(key, i.to) == -1 {
			return false
		}

	} else {
		key, value, err = i.Enumerator.Next()
		if err == io.EOF {
			return false
		}

		if i.to != nil && bytes.Compare(key, i.to) == 1 {
			return false
		}

	}
	i.key = key
	i.value = value
	i.err = err

	return true
}

// Key gets the current key in the iterator
func (i *KvIterator) Key() []byte {
	return i.key
}

// Value returns the current value in the iterator
func (i *KvIterator) Value() []byte {
	return i.value
}

// Err returns any errors that may have happened during iterating
func (i *KvIterator) Err() error {
	return i.err
}

func logError(err error) {
	lWriter, err := syslog.New(syslog.LOG_ERR, "freehold")
	if err != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}
	lWriter.Err(err.Error())
}
