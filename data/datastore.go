package data

import (
	"encoding/json"
	"time"

	"bitbucket.org/tshannon/freehold/data/store"
)

// Datastore holds data and an identifying key in json format in a file on the host
type Datastore struct {
	store store.Storer
}

type Iter struct {
	From   json.RawMessage `json:"from,omitempty"`
	To     json.RawMessage `json:"to,omitempty"`
	Skip   int             `json:"skip,omitempty"`
	Order  string          `json:"order,omitempty"`
	Limit  int             `json:"limit,omitempty"`
	Regexp string          `json:"regexp,omitempty"`
}

// Create creates a new datastore
func Create(name string) error {
	return store.Create(name)
}

// Delete deletes a datastore
func Delete(name string) error {
	return store.Delete(name)
}

// Open opens an existing datastore file
func Open(name string) (*Datastore, error) {
	storer, err := store.Open(name)
	if err != nil {
		return nil, err
	}
	return &Datastore{storer}, nil

}

func (d *Datastore) Get(key json.RawMessage) (json.RawMessage, error) {
	result, err := d.store.Get([]byte(key))
	if err != nil {
		return nil, err
	}
	return json.RawMessage(result), nil
}

func (d *Datastore) Put(key, value json.RawMessage) error {
	return d.store.Put([]byte(key), []byte(value))
}

func (d *Datastore) Delete(key json.RawMessage) error {
	return d.store.Delete([]byte(key))
}

func (d *Datastore) Iter(iter *Iter) (json.RawMessage, error) {
	//TODO:
	return nil, nil
}

func SetTimeout(timeout time.Duration) {
	store.SetFileTimeout(timeout)
}
