package main

import (
	"encoding/json"
	"os"

	"bitbucket.org/tshannon/freehold/datastore"
)

type FHIter struct {
	From   interface{} `json:"from,omitempty"`
	To     interface{} `json:"to,omitempty"`
	Skip   int         `json:"skip,omitempty"`
	Order  string      `json:"order,omitempty"`
	Limit  int         `json:"limit,omitempty"`
	Regexp string      `json:"regexp,omitempty"`

	ds datastore.Datastore
}

type KeyValue struct {
	Key   json.RawMessage
	Value json.RawMessage
}

func openCoreDS(filename string) datastore.Datastore {
	ds, err := datastore.Open(filename)
	if os.IsNotExist(err) {
		err = datastore.Create(filename)
		if err != nil {
			//TODO: Log error
			return nil
		}
		ds, err = datastore.Open(filename)
	}

	if err != nil {
		//TODO: Log error
		return nil
	}
	return ds
}

// m is an internal only shortcut for marshalling an arbitrary value.
// It will panic if it can't be marshalled
func m(key interface{}) []byte {
	buf, err := json.Marshal(key)
	if err != nil {
		panic("Error marshalling key: " + err.Error())
	}
	return buf
}

// iter returns a json []byte result of the iterater
func (i *FHIter) iter() []byte {

}
