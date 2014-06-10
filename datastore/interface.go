package datastore

import (
	"os"

	"github.com/cznic/kv"
)

// Datastore is the interface that is needed to run a freehold instance an any datastores in it
type Datastore interface {
	Get(key, result []byte) error
	Put(key, value []byte) error
	Delete(key []byte) error
	Iter(from, to []byte) (Iterator, error)
}

// Iterator is used for iterating through a range of keys in a datastore
type Iterator interface {
	Next(key, value []byte) bool
	Err() error
}

//Replace Create, Open, and Delete with any store that satisfies Datastore and Iterator interface

// Create creates a new datastore file
func Create(name string) error {
	db, err := kv.Create(name, options)
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
func Open(name string) (*DS, error) {
	return files.open(name)
}
