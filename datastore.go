package main

import "bitbucket.org/tshannon/freehold/datastore"

type FHIter struct {
	From   interface{} `json:"from,omitempty"`
	To     interface{} `json:"to,omitempty"`
	Skip   int         `json:"skip,omitempty"`
	Order  string      `json:"order,omitempty"`
	Limit  int         `json:"limit,omitempty"`
	Regexp string      `json:"regexp,omitempty"`
}

type FHDSResult struct {
	Key   interface{} `json:"key,omitempty"`
	Value interface{} `json:"value,omitempty"`
}

func openCoreDS(filename string) datastore.Datastore {
	ds, err := datastore.Open(filename)
	if io.IsNotExist(err) {
		err = datastore.Create(filename)
		if err != nil {
			//TODO: Log error
		}
		ds, err = datastore.Open(filename)
	}

	if err != nil {
		//TODO: Log error
	}
	return ds
}
