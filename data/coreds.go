// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package data

import (
	"encoding/json"
	"errors"
	"os"
	"path"

	"bitbucket.org/tshannon/freehold/data/store"
)

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
		err := os.MkdirAll(path.Dir(filename), 0777)
		if err != nil {
			return nil, errors.New("Error creating core datastore folder at: " + path.Dir(filename) + ":" + err.Error())
		}
		err = store.Create(filename)
		if err != nil {
			return nil, errors.New("Error creating core datastore: " + err.Error())
		}
	}

	ds, err := store.Open(filename)
	if err != nil {
		return nil, errors.New("Error opening core datastore: " + err.Error())
	}
	return &CoreDS{ds}, nil
}

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

func (c *CoreDS) Delete(key interface{}) error {
	dsKey, err := json.Marshal(key)
	if err != nil {
		return err
	}

	return c.Storer.Delete(dsKey)
}
