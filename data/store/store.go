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
	"runtime"
	"sync"
	"time"

	"github.com/boltdb/bolt"
)

// DS is a datstore, holds the pointer to the
// underlying kv file, and keeps track of
// when a file times-out and needs to be closed
// and when it's in use
type DS struct {
	*bolt.DB
	filePath string
	timeout  *time.Timer
	inUse    sync.WaitGroup
	t        *time.Timer
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

		db, err = bolt.Open(name, 0666, &bolt.Options{Timeout: 1 * time.Second})
		if err != nil {
			return nil, err
		}
	}

	DS := &DS{
		DB:       db,
		filePath: name,
		timeout: time.AfterFunc(Timeout(), func() {
			o.close(name)
		}),
		inUse: sync.WaitGroup{},
	}

	o.files[name] = DS
	return DS, nil
}

func (d *DS) finish() {
	d.inUse.Done()
	d.t.Stop()
}

func (d *DS) start() {
	d.inUse.Add(1)
	if d.t != nil {
		d.t.Stop()
	}
	d.t = time.AfterFunc(10*time.Second, func() {
		fmt.Printf("Open Transactions: %d\n", d.Stats().OpenTxN)
		buf := make([]byte, 1<<20)
		fmt.Printf("Timedout: %s\n", buf[:runtime.Stack(buf, true)])
	})
}

func (o *openedFiles) waitForInUse(name string) {
	o.RLock()
	defer o.RUnlock()
	if db, ok := o.files[name]; ok {
		db.inUse.Wait()
	}
}

func (o *openedFiles) close(name string) {
	o.waitForInUse(name)
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
	o.close(name)
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
	d.start()
	defer d.finish()
	err := d.reset()
	if err != nil {
		return nil, err
	}
	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		v := tx.Bucket([]byte(d.filePath)).Get(key)
		if v != nil {
			result = make([]byte, len(v))
			copy(result, v)
		}
		return nil
	})
	return result, nil
}

// Max returns the max value in the datastore
func (d *DS) Max() ([]byte, error) {
	d.start()
	defer d.finish()

	err := d.reset()
	if err != nil {
		return nil, err
	}

	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		l, _ := tx.Bucket([]byte(d.filePath)).Cursor().Last()
		if l != nil {
			result = make([]byte, len(l))
			copy(result, l)
		}
		return nil
	})

	return result, nil
}

// Min returns the min value in the datastore
func (d *DS) Min() ([]byte, error) {
	d.start()
	defer d.finish()

	err := d.reset()
	if err != nil {
		return nil, err
	}

	var result []byte
	d.DB.View(func(tx *bolt.Tx) error {
		f, _ := tx.Bucket([]byte(d.filePath)).Cursor().First()
		if f != nil {
			result = make([]byte, len(f))
			copy(result, f)
		}
		return nil
	})

	return result, nil
}

// Put puts a new value in the datastore
func (d *DS) Put(key, value []byte) error {

	d.start()
	defer d.finish()

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
	d.start()
	defer d.finish()

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
	d.start()
	defer d.finish()

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

	b := tx.Bucket([]byte(d.filePath))
	if b == nil {
		return nil, fmt.Errorf("Bucket not found for %s", d.filePath)
	}
	iter.Cursor = b.Cursor()

	if bytes.Compare(from, to) == 1 {
		iter.reverse = true
	}

	d.start()
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
	t       *time.Timer
}

// Next gets the next value from the iterator
func (i *KvIterator) Next() bool {
	err := i.ds.reset()
	if err != nil {
		i.err = err
		return false
	}

	var key, value []byte
	compare := 0

	if !i.seeked {
		if i.from == nil {
			key, value = i.First()
		} else {
			key, value = i.Seek(i.from)
		}
		i.seeked = true
	} else {
		if i.reverse {
			key, value = i.Cursor.Prev()
			compare = -1
		} else {
			key, value = i.Cursor.Next()
			compare = 1
		}
	}

	if key == nil {
		return false
	}

	if i.to != nil && bytes.Compare(key, i.to) == compare {
		return false
	}

	if key != nil {
		i.key = make([]byte, len(key))
		copy(i.key, key)
	}

	if value != nil {
		i.value = make([]byte, len(value))
		copy(i.value, value)
	}
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

// Close closes the iterator
func (i *KvIterator) Close() error {
	err := i.Cursor.Bucket().Tx().Rollback()
	i.ds.finish()

	return err
}

func logError(err error) {
	lWriter, err := syslog.New(syslog.LOG_ERR, "freehold")
	if err != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}
	lWriter.Err(err.Error())
}
