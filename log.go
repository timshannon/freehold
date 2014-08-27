// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"

	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
)

type LogInput struct {
	Iter *log.Iter `json:"iter,omitempty"`
}

func logGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Log()

	if !auth.canRead(prm) {
		four04(w, r)
		return
	}

	input := &LogInput{}

	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Iter == nil {
		input.Iter = &log.Iter{}
	}

	logs, err := log.Get(input.Iter)

	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   logs,
	})
	return

}