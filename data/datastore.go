// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package data

import (
	"encoding/json"
	"regexp"
	"time"

	"bitbucket.org/tshannon/freehold/data/store"
	"bitbucket.org/tshannon/freehold/fail"
)

//FYI: must use pointers to json.RawMessage because of issue #6528 (probably not going to change)

// Datastore holds data and an identifying key in json format in a file on the host
type Datastore struct {
	store store.Storer
}

type Iter struct {
	From   *json.RawMessage `json:"from,omitempty"`
	To     *json.RawMessage `json:"to,omitempty"`
	Skip   int              `json:"skip,omitempty"`
	Limit  int              `json:"limit,omitempty"`
	Regexp string           `json:"regexp,omitempty"`
	Order  string           `json:"order,omitempty"`
}

// Data is a generic key / value representation for JSON data
// the values we dont' acctual decode as it's just stored in the DS as raw
// JSON bytes anyway
type Data map[string]*json.RawMessage

type KeyValue struct {
	Key   *json.RawMessage `json:"key,omitempty"`
	Value *json.RawMessage `json:"value,omitempty"`
}

// Create creates a new datastore
func Create(name string) error {
	return store.Create(name)
}

// Delete deletes a datastore
func Drop(name string) error {
	return store.Drop(name)
}

// Open opens an existing datastore file
func Open(name string) (*Datastore, error) {
	storer, err := store.Open(name)
	if err != nil {
		return nil, err
	}
	return &Datastore{storer}, nil

}

func Close(name string) {
	store.Close(name)
}

func (d *Datastore) Get(key json.RawMessage) (*json.RawMessage, error) {
	result, err := d.store.Get([]byte(key))
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, ErrNotFound
	}
	return (*json.RawMessage)(&result), nil
}

func (d *Datastore) Max() (*json.RawMessage, error) {
	key, err := d.store.Max()
	if err != nil {
		return nil, err
	}

	return (*json.RawMessage)(&key), nil
}

func (d *Datastore) Min() (*json.RawMessage, error) {
	key, err := d.store.Min()
	if err != nil {
		return nil, err
	}

	return (*json.RawMessage)(&key), nil
}

func (d *Datastore) Put(data Data) []error {
	errors := make([]error, 0, len(data))

	if key, ok := data["key"]; ok {
		v := data["value"]

		err := d.store.Put([]byte(*key), []byte(*v))
		if err != nil {
			errors = append(errors, err)
		}
		return errors
	}

	for k, v := range data {
		key, err := json.Marshal(k)
		if err != nil {
			errors = append(errors, err)
			continue
		}

		err = d.store.Put([]byte(key), []byte(*v))
		if err != nil {
			errors = append(errors, err)
			continue
		}
	}
	return errors
}

func (d *Datastore) Delete(key json.RawMessage) error {
	return d.store.Delete([]byte(key))
}

func (d *Datastore) Iter(iter *Iter) ([]KeyValue, error) {
	var rx *regexp.Regexp
	var err error
	if iter.Regexp != "" {
		rx, err = regexp.Compile(iter.Regexp)
		if err != nil {
			return nil, fail.NewFromErr(err, iter.Regexp)
		}
	}

	var from []byte
	var to []byte

	if iter.From != nil {
		from = []byte(*iter.From)
	} else {
		from, err = d.store.Min()
		if err != nil {
			return nil, err
		}
	}
	if iter.To != nil {
		to = []byte(*iter.To)
	} else {
		to, err = d.store.Max()
		if err != nil {
			return nil, err
		}

	}

	if iter.Order != "" {
		if iter.Order != "asc" && iter.Order != "dsc" {
			return nil, fail.New("Invalid Order specified", iter)
		}
		//Flip from and to if order is specified.  If order isn't specified, then iteration direction
		// is implied
		if (iter.Order == "dsc" && store.Compare(from, to) != 1) ||
			(iter.Order == "asc" && store.Compare(to, from) == -1) {
			from, to = to, from
		}
	}

	i, err := d.store.Iter(from, to)
	if err != nil {
		return nil, err
	}

	skip := 0
	limit := 0
	result := make([]KeyValue, 0, iter.Limit)

	for i.Next() {
		if iter.Limit > 0 && iter.Limit <= limit {
			break
		}
		if i.Err() != nil {
			return nil, i.Err()
		}

		if rx != nil && !rx.Match(i.Key()) {
			continue
		}

		skip++
		if iter.Skip > 0 && iter.Skip >= skip {
			continue
		}

		key := i.Key()
		value := i.Value()
		if value == nil {
			//shouldn't happen
			panic("Nil value returned from datastore iterator")
		}

		result = append(result, KeyValue{
			Key:   (*json.RawMessage)(&key),
			Value: (*json.RawMessage)(&value),
		})

		limit++
	}

	return result, nil
}

func SetTimeout(timeout time.Duration) {
	store.SetFileTimeout(timeout)
}
