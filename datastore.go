package main

import (
	"encoding/json"
	"os"
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

	ds datastore.Datastore `json:"-"`
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
			logError(err)
			panic("Error opening core datastore: " + err.Error())
		}
		ds, err = datastore.Open(filename)
	}

	if err != nil {
		logError(err)
		panic("Error opening core datastore: " + err.Error())
	}
	return ds
}

// iter returns a json []byte result of the iterater
func (i *FHIter) iter() []byte {
	//TODO
	return nil
}

func setDatastoreTimeout() {
	datastore.SetFileTimeout(time.Duration(settingInt("DatastoreFileTimeout")) * time.Second)
}
