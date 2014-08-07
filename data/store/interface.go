// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package store

import (
	"bytes"
	"encoding/json"
	"os"

	"github.com/cznic/kv"
)

// Store is the interface that is needed to run a freehold instance an any datastores in it
type Storer interface {
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

//Replace Create, Open, Close and Delete with any data backend that satisfies store and iterator interface

// Create creates a new store file
func Create(name string) error {
	option := options()
	db, err := kv.Create(name, option)
	if err != nil {
		return err
	}
	return db.Close()
}

// Delete deletes a store file
func Delete(name string) error {
	files.close(name)
	return os.Remove(name)

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

// naturalCompare is will try to sort numbers like you expect even
// though their source is utf-8 json, as opposed to the default byte compare
// if a number is compared with a non number, then default byte compare is used
// Currently performance doesn't seem impacted
func naturalCompare(x, y []byte) int {
	var keyX interface{}
	var keyY interface{}

	err := json.Unmarshal(x, &keyX)
	if err != nil {
		return bytes.Compare(x, y)
	}

	err = json.Unmarshal(y, &keyY)
	if err != nil {
		return bytes.Compare(x, y)
	}

	switch keyX := keyX.(type) {
	case float64:
		switch keyY := keyY.(type) {
		case float64:
			if keyX == keyY {
				return 0
			}
			if keyX < keyY {
				return -1
			}
			return 1
		default:

			return bytes.Compare(x, y)
		}

	default:
		return bytes.Compare(x, y)

	}
}
