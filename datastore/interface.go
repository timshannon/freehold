package datastore

import (
	"os"

	"github.com/cznic/kv"
)

// Datastore is the interface that is needed to run a freehold instance an any datastores in it
type Datastorer interface {
	Get(key []byte) ([]byte, error)
	Put(key, value []byte) error
	Delete(key []byte) error
	Iter(from, to []byte) (Iterator, error)
}

// Iterator is used for iterating through a range of keys in a datastore
type Iterator interface {
	Next() bool
	Key() []byte
	Value() []byte
	Err() error
}

//Replace Create, Open, and Delete with any store that satisfies Datastore and Iterator interface

// Create creates a new datastore file
func Create(name string) error {
	option := options()
	db, err := kv.Create(name, option)
	if err != nil {
		return err
	}
	return db.Close()
}

// Delete deletes a datastore file
func Delete(name string) error {
	files.close(name)
	return os.Remove(name)

}

// Open opens an existing datastore file, if the file is currently open
// then it passes back the current pointer to the datastore
func Open(name string) (Datastorer, error) {
	return files.open(name)
}
