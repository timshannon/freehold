// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// store is the wrapper around the cznic/kv to match the minimum interface
// used by freehold for a KV store.

package store

import (
	"io"
	"log"
	"log/syslog"
	"os"
	"os/signal"
	"sync"
	"time"

	"github.com/cznic/kv"
)

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
		VerifyDbAfterOpen:  true,
		VerifyDbAfterClose: true,
		Compare:            naturalCompare,
	}
}

func init() {
	timeout = timeoutLock{RWMutex: sync.RWMutex{}, duration: 1 * time.Minute}
	files = openedFiles{
		RWMutex: sync.RWMutex{},
		files:   make(map[string]*DS),
	}

	//Capture program shutdown, finish closing datastore files
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for sig := range c {
			if sig == os.Interrupt {
				for k := range files.files {
					files.close(k)
				}
				os.Exit(1)
			}
		}
	}()
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

	o.Lock()
	o.files[name] = DS
	o.Unlock()
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

	} else {
		//file hasn't been opened yet in this session
		// open it to get the wal file, then close and delete
		db, err := kv.Open(name, options())
		if err != nil {
			return err
		}
		wal = db.WALName()
		err = db.Close()
		if err != nil {
			return err
		}

	}

	if _, ferr := os.Stat(wal); ferr == nil {
		//clean up wal file
		err := os.Remove(wal)
		if err != nil {
			return err
		}
	}
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

func (d *DS) Get(key []byte) ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	result, err := d.DB.Get(nil, key)
	return result, err
}

func (d *DS) Max() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	key, _, err := d.DB.Last()
	return key, err
}

func (d *DS) Min() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	key, _, err := d.DB.First()
	return key, err
}

func (d *DS) Put(key, value []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}

	return d.DB.Set(key, value)
}

func (d *DS) Delete(key []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}
	return d.DB.Delete(key)
}

func (d *DS) Iter(from, to []byte) (Iterator, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}

	if to != nil && naturalCompare(from, to) == 1 {
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
		if naturalCompare(key, i.to) == -1 {
			return false
		}
	} else {
		key, value, err = i.Enumerator.Next()
		if err == io.EOF {
			return false
		}

		if i.to != nil && naturalCompare(key, i.to) == 1 {
			return false
		}
	}

	i.key = key
	i.value = value
	i.err = err

	return true
}

func (i *KvIterator) Key() []byte {
	return i.key
}

func (i *KvIterator) Value() []byte {
	return i.value
}

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
