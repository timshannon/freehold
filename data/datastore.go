// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package data

import (
	"encoding/binary"
	"encoding/json"
	"math"
	"regexp"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/data/store"
	"bitbucket.org/tshannon/freehold/fail"
)

//FYI: must use pointers to json.RawMessage because of issue #6528 (probably not going to change)

// Datastore holds data and an identifying key in json format in a file on the host
type Datastore struct {
	store store.Storer
}

// Iter is the json view of an iterator
type Iter struct {
	From   *Key   `json:"from,omitempty"`
	To     *Key   `json:"to,omitempty"`
	Skip   int    `json:"skip,omitempty"`
	Limit  int    `json:"limit,omitempty"`
	Regexp string `json:"regexp,omitempty"`
	Order  string `json:"order,omitempty"`
}

// Data is a generic key / value representation for JSON data
// the values we dont' acctual decode as it's just stored in the DS as raw
// JSON bytes anyway
type Data map[string]*json.RawMessage

// Key is type that tries to save keys in proper byte order if they are numbers, so they
// remain sortable
// It does this by testing whether or not the incoming key is a number
// if it is, then it'll pack the encoded value with big endian
// encoded float value at the lead for sorting
// for decoding it simply throws away that extra info
type Key json.RawMessage

// MarshalJSON implements  json.Marshaler interface
func (k *Key) MarshalJSON() ([]byte, error) {
	return (*json.RawMessage)(k).MarshalJSON()
}

// UnmarshalJSON implements  json.Unmarshaler interface
func (k *Key) UnmarshalJSON(data []byte) error {
	return (*json.RawMessage)(k).UnmarshalJSON(data)
}

func (k *Key) bytes() ([]byte, error) {
	m, err := json.Marshal(k)
	if err != nil {
		return nil, err
	}
	f, err := json.Number(*k).Float64()
	if err != nil {
		return m, nil
	}

	//is a number
	bits := math.Float64bits(f)
	byteNum := make([]byte, 8)
	binary.BigEndian.PutUint64(byteNum, bits)
	return append(byteNum, m...), nil
}

func (k *Key) fromBytes(data []byte) error {
	err := json.Unmarshal(data, k)
	if err == nil {
		return nil
	}
	if len(data) < 8 {
		return err
	}
	//try removing the leading 8 bytes
	return json.Unmarshal(data[8:], k)
}

// KeyValue is a JSON representation of a key value
type KeyValue struct {
	Key   *Key             `json:"key,omitempty"`
	Value *json.RawMessage `json:"value,omitempty"`
}

// Create creates a new datastore
func Create(name string) error {
	return store.Create(name)
}

// Drop Delete deletes a datastore
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

// Close closes an open datastore
func Close(name string) {
	store.Close(name)
}

// Get gets a value out of a datastore
func (d *Datastore) Get(key *Key) (*json.RawMessage, error) {
	keyBytes, err := key.bytes()
	if err != nil {
		return nil, err
	}
	result, err := d.store.Get(keyBytes)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, ErrNotFound
	}
	return (*json.RawMessage)(&result), nil
}

// Max gets the max value in the datastore
func (d *Datastore) Max() (*Key, error) {
	data, err := d.store.Max()
	if err != nil {
		return nil, err
	}

	var key Key
	err = key.fromBytes(data)

	return &key, err
}

// Min gets the min value in the datastore
func (d *Datastore) Min() (*Key, error) {
	data, err := d.store.Min()
	if err != nil {
		return nil, err
	}

	var key Key
	err = key.fromBytes(data)

	return &key, err
}

// Put puts a new value or sets of values in the datastore
func (d *Datastore) Put(data Data) []error {
	var errors []error

	if keyBytes, ok := data["key"]; ok {
		v, ok := data["value"]
		if !ok {
			errors = append(errors, fail.New("No value put in datastore", data))
			return errors
		}

		putBytes, err := (*Key)(keyBytes).bytes()
		if err != nil {
			errors = append(errors, err)
			return errors
		}

		err = d.store.Put(putBytes, []byte(*v))
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

// Delete delets a value from the datastore
func (d *Datastore) Delete(key *Key) error {
	keyBytes, err := key.bytes()
	if err != nil {
		return err
	}
	return d.store.Delete(keyBytes)
}

// Count returns the number of records in the datastore
func (d *Datastore) Count(iter *Iter) (int, error) {
	if iter == nil {
		iter = &Iter{}
	}

	iter.Limit = -1
	results, err := d.Iter(iter)
	if err != nil {
		return -1, err
	}

	return len(results), nil

}

// Iter returns the key value result set of the passed in json iterator
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
		from, err = iter.From.bytes()
		if err != nil {
			return nil, err
		}
	} else {
		from, err = d.store.Min()
		if err != nil {
			return nil, err
		}
	}
	if iter.To != nil {
		to, err = iter.To.bytes()
		if err != nil {
			return nil, err
		}
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
		if (iter.Order == "dsc" && bytes.Compare(from, to) != 1) ||
			(iter.Order == "asc" && bytes.Compare(to, from) == -1) {
			from, to = to, from
		}
	}

	i, err := d.store.Iter(from, to)
	defer i.Close()
	if err != nil {
		return nil, err
	}

	if iter.Limit < 0 {
		iter.Limit = 0
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

		var key Key
		err = key.fromBytes(i.Key())
		if err != nil {
			return nil, err
		}
		value := i.Value()
		if value == nil {
			//shouldn't happen
			panic("Nil value returned from datastore iterator")
		}

		result = append(result, KeyValue{
			Key:   &key,
			Value: (*json.RawMessage)(&value),
		})

		limit++
	}

	return result, nil
}

// SetTimeout sets the file timeout (when a datatstore file will auto close)
func SetTimeout(timeout time.Duration) {
	store.SetFileTimeout(timeout)
}
