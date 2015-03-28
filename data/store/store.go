// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// store is the wrapper around the boltdb to match the minimum interface
// used by freehold for a KV store.

package store

import (
	"bytes"
	"fmt"
	"log"
	"log/syslog"
	"os"
	"sync"
	"time"

	"github.com/boltdb/bolt"
)

// DS is a datstore, holds the pointer to the
// underlying kv file, and keeps track of
// when a file timesout and needs to be closed
type DS struct {
	*bolt.DB
	filePath string
	timeout  *time.Timer
}

type timeoutLock struct {
	sync.RWMutex
	duration time.Duration
}

var timeout timeoutLock
var files openedFiles

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

	db, err := bolt.Open(name, 0666, nil)
	if err != nil {
		//try convert
		cErr := convert(name)
		if cErr != nil {
			return nil, fmt.Errorf("Could not open datastore file %s.  Error: %s."+
				"Tried conversion but that failed as well: %s", name, err, cErr)
		}
		//conversion succeded, try openging again

		db, err = bolt.Open(name, 0666, nil)
		if err != nil {
			return nil, err
		}
	}
	err = db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte(name))
		return err
	})

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
	db, ok := o.files[name]
	if ok {
		delete(o.files, name)
		err := db.Close()
		if err != nil {
			return err
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
	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		result = tx.Bucket([]byte(d.filePath)).Get(key)
		return nil
	})

	return result, nil
}

// Max returns the max value in the datastore
func (d *DS) Max() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}

	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		c := tx.Bucket([]byte(d.filePath)).Cursor()
		result, _ = c.Last()
		return nil
	})

	return result, nil
}

// Min returns the min value in the datastore
func (d *DS) Min() ([]byte, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}
	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		c := tx.Bucket([]byte(d.filePath)).Cursor()
		result, _ = c.First()
		return nil
	})

	return result, nil
}

// Put puts a new value in the datastore
func (d *DS) Put(key, value []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}
	err = d.DB.Update(func(tx *bolt.Tx) error {
		err = tx.Bucket([]byte(d.filePath)).Put(key, value)
		return err
	})
	return err
}

// Delete deletes a value from the datastore
func (d *DS) Delete(key []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}
	err = d.DB.Update(func(tx *bolt.Tx) error {
		err = tx.Bucket([]byte(d.filePath)).Delete(key)
		return err
	})
	return err
}

// Iter returns an iteratore for the datastore
func (d *DS) Iter(from, to []byte) (Iterator, error) {
	err := d.reset()
	if err != nil {
		return nil, err
	}

	iter := &KvIterator{
		ds:   d,
		from: from,
		to:   to,
		err:  nil,
	}
	tx, err := d.DB.Begin(false)
	if err != nil {
		return nil, err
	}
	iter.Cursor = tx.Bucket([]byte(d.filePath)).Cursor()

	if to != nil && bytes.Compare(from, to) == 1 {
		iter.reverse = true
	}

	return iter, nil
}

// KvIterator is a key value iterator
type KvIterator struct {
	ds *DS
	*bolt.Cursor
	reverse bool
	from    []byte
	to      []byte
	key     []byte
	value   []byte
	err     error
	seeked  bool
}

// Next gets the next value from the iterator
func (i *KvIterator) Next() bool {
	err := i.ds.reset()
	if err != nil {
		i.err = err
		i.Cursor.Bucket().Tx().Rollback()
		return false
	}

	var key, value []byte

	if i.reverse {
		key, value = i.Cursor.Prev()
	} else {
		key, value = i.Cursor.Next()
	}

	if key == nil {
		i.Cursor.Bucket().Tx().Rollback()
		return false
	}

	if bytes.Compare(key, i.to) == -1 {
		i.Cursor.Bucket().Tx().Rollback()
		return false
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
