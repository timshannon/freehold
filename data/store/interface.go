// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package store

// Storer is the interface that is needed to run a freehold instance an any datastores in it
type Storer interface {
	Get(key []byte) ([]byte, error)
	Put(key, value []byte) error
	Delete(key []byte) error
	Max() ([]byte, error) //Max Key in store
	Min() ([]byte, error) //Min Key in store
	Iter(from, to []byte) (Iterator, error)
}

// Iterator is used for iterating through a range of keys in a datastore
type Iterator interface {
	Next() bool
	Key() []byte
	Value() []byte
	Err() error
}

//Replace Create, Open, Close and Drop with any data backend that satisfies store and iterator interface
// may make these 4 a interface as well

// Create creates a new store file
func Create(name string) error {
	_, err := files.open(name)
	return err
}

// Drop deletes a store file
func Drop(name string) error {
	return files.drop(name)
}

// Open opens an existing store file, if the file is currently open
// then it passes back the current pointer to the store
func Open(name string) (Storer, error) {
	return files.open(name)
}

//Close / finish writes on a file
func Close(name string) {
	files.close(name)
}
