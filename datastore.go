package main

import (
	"encoding/json"
	"os"
	"path"
	"time"

	"bitbucket.org/tshannon/freehold/datastore"
)

type FHIter struct {
	From   interface{} `json:"from,omitempty"`
	To     interface{} `json:"to,omitempty"`
	Skip   int         `json:"skip,omitempty"`
	Order  string      `json:"order,omitempty"`
	Limit  int         `json:"limit,omitempty"`
	Regexp string      `json:"regexp,omitempty"`

	ds datastore.Datastorer `json:"-"`
}

type KeyValue struct {
	Key   json.RawMessage
	Value json.RawMessage
}

func openCoreDS(filename string) datastore.Datastorer {
	if !fileExists(filename) {
		err := os.MkdirAll(path.Dir(filename), 0777)
		if err != nil {
			halt("Error creating core datastore folder at: " + path.Dir(filename))
		}
		err = datastore.Create(filename)
		if err != nil {
			halt("Error creating core datastore: " + err.Error())
		}
	}

	ds, err := datastore.Open(filename)
	if err != nil {
		halt("Error opening core datastore: " + err.Error())
	}
	return ds
}

// iter returns a json encoded []byte result of the iterator
func (i *FHIter) iter() []byte {
	//TODO
	return nil
}

func setDatastoreTimeout() {
	datastore.SetFileTimeout(time.Duration(settingInt("DatastoreFileTimeout")) * time.Second)
}
