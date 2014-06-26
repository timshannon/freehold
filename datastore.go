package main

import "bitbucket.org/tshannon/freehold/datastore"

type KeyValue struct {
	Key   datastore.Key
	Value datastore.Value
}
