// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import "encoding/json"

type KeyValue struct {
	Key   json.RawMessage
	Value json.RawMessage
}
