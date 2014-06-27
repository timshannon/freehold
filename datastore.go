package main

import "encoding/json"

type KeyValue struct {
	Key   json.RawMessage
	Value json.RawMessage
}
