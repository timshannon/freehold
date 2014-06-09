// Datastore is the wrapper around the cznic/kv to match the minimum interface
// used by freehold for a KV store.

package datastore

import (
	"io"
	"log"
	"log/syslog"
	"sync"
	"time"

	"github.com/cznic/kv"
)

type DS struct {
	*kv.DB
	timeout *time.Timer
}

type timeoutLock struct {
	sync.RWMutex
	duration time.Duration
}

var timeout timeoutLock
var files openedFiles

func init() {
	timeout = timeoutLock{RWMutex: sync.RWMutex{}, duration: 1 * time.Minute}
	files = openedFiles{RWMutex: sync.RWMutex{}}
}

// SetFileTimeout sets when the file will automatically close
// after the timeout duration has passed with no activity on the datastore file.
// Any new activity will restart the timeout.  Shorter timeout means fewer open files, but less
// concurrency.
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
	defer o.RUnlock()
	if ds, ok := o.files[name]; ok {
		err := ds.reset()
		if err != nil {
			return nil, err
		}
		return ds, nil
	}
	o.Lock()
	defer o.Unlock()

	db, err := kv.Open(name, nil)
	if err != nil {
		return nil, err
	}

	ds := &DS{
		DB: db,
		timeout: time.AfterFunc(Timeout(), func() {
			o.close(name)
		}),
	}
	o.files[name] = ds
	return ds, nil
}

func (o *openedFiles) close(name string) {
	o.Lock()
	defer o.Unlock()
	db, ok := o.files[name]
	if ok {
		delete(o.files, name)
		err := db.Close()

		if err != nil {
		}

	}
}

func (d *DS) reset() error {
	if !d.timeout.Reset(Timeout()) {
		//TODO: Test if Name can be retrieved after file is closed, if not, store it on DS
		var err error
		d.DB, err = kv.Open(d.Name(), nil)
		return err
	}
	return nil
}

func (d *DS) Get(key, result []byte) error {
	err := d.reset()
	if err != nil {
		return err
	}
	result, err = d.DB.Get(result, key)
	return err
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

	enum, _, err := d.DB.Seek(from)
	if err != nil {
		return nil, err
	}
	return &KvIterator{
		ds:         d,
		Enumerator: enum,
		to:         to,
		err:        nil,
	}, nil
}

type KvIterator struct {
	ds *DS
	*kv.Enumerator
	to  []byte
	err error
}

func (i *KvIterator) Next(key, value []byte) bool {
	err := i.ds.reset()
	if err != nil {
		i.err = err
		return false
	}

	key, value, err = i.Enumerator.Next()
	if err == io.EOF {
		return false
	}
	i.err = err
	return true
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
