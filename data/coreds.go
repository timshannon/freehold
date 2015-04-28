// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package data

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"

	"bitbucket.org/tshannon/freehold/data/store"
)

// ErrNotFound is the error returned from a core datastore if a value
// is not found for the passed in key
var ErrNotFound = errors.New("Value not found")

// CoreDS is a wrapper of the store interface with a few
// handy things added for managing core datastores used for the operation
// of a freehold instance
type CoreDS struct {
	store.Storer
}

// OpenCoreDS opens a Core datastore
func OpenCoreDS(filename string) (*CoreDS, error) {
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		err := os.MkdirAll(filepath.Dir(filename), 0777)
		if err != nil {
			return nil, errors.New("Error creating core datastore folder at: " + filepath.Dir(filename) + ":" + err.Error())
		}
		err = store.Create(filename)
		if err != nil {
			return nil, errors.New("Error creating core datastore " + filename + ": " + err.Error())
		}
	}
	ds, err := store.Open(filename)

	if err != nil {
		return nil, errors.New("Error opening core datastore " + filename + ": " + err.Error())
	}
	return &CoreDS{ds}, nil
}

// Get retrieves a value from the core datastore
func (c *CoreDS) Get(key interface{}, result interface{}) error {
	dsKey, err := json.Marshal(key)
	if err != nil {
		return err
	}
	dsValue, err := c.Storer.Get(dsKey)
	if err != nil {
		return err
	}

	if dsValue == nil {
		return ErrNotFound
	}

	return json.Unmarshal(dsValue, result)
}

// Put puts a new key /value in the core datastore
func (c *CoreDS) Put(key interface{}, value interface{}) error {
	dsKey, err := json.Marshal(key)
	if err != nil {
		return err
	}

	dsValue, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return c.Storer.Put(dsKey, dsValue)
}

// Delete deletes a key / value from the coreds
func (c *CoreDS) Delete(key interface{}) error {
	dsKey, err := json.Marshal(key)
	if err != nil {
		return err
	}

	return c.Storer.Delete(dsKey)
}

// MakeDatastore creates a datastore type from the core datastore
func (c *CoreDS) MakeDatastore() *Datastore {
	return &Datastore{c.Storer}
}
