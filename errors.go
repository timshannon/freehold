// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
)

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}

	var status, errMsg string

	switch err.(type) {

	case *fail.Fail:
		status = statusFail
		log.Fail(err)
	case *http.ProtocolError, *json.SyntaxError, *json.UnmarshalTypeError:
		//Hardcoded external errors which can bubble up to the end users
		// without exposing internal server information, make them failures
		err = fail.NewFromErr(err, nil)
		status = statusFail
		log.Fail(err)
	default:
		status = statusError
		log.Error(err)
		if setting.Bool("FullClientErrors") {
			errMsg = err.Error()
		} else {
			errMsg = "An internal server error has occurred"
		}
	}

	if status == statusFail {
		respondJsend(w, &JSend{
			Status:  status,
			Message: err.(*fail.Fail).Message,
			Data:    err.(*fail.Fail).Data,
		})
	} else {
		respondJsend(w, &JSend{
			Status:  status,
			Message: errMsg,
		})
	}

	return true
}

// four04 is a standard 404 response to a rest request
// if its a request for a file, then a user will get a four04Page
func four04(w http.ResponseWriter, r *http.Request) {
	if setting.Bool("Log404") {
		log.Error(errors.New("Resource not found: " + r.URL.String()))
	}

	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Content-Type", "application/json")
	response := &JSend{
		Status:  statusFail,
		Message: "Resource not found",
		Data:    r.URL.String(),
	}

	w.WriteHeader(http.StatusNotFound)

	result, err := json.Marshal(response)
	if err != nil {
		log.Error(err)
		return
	}

	w.Write(result)
}

// four04Page returns a 404 status with custom page that can be set to any
// file in the system.  This is displayed when a user tries to access a file
// that doesn't exist, or they don't have the right to know it exists
func four04Page(w http.ResponseWriter, r *http.Request) {
	if setting.Bool("Log404") {
		log.Error(errors.New("Resource not found: " + r.URL.String()))
	}

	prm, err := permission.Get(urlPathToFile(setting.String("404File")))
	if err != nil {
		log.Error(err)
		http.NotFound(w, r)
		return
	}
	if !prm.CanRead(nil) {
		log.Error(errors.New("The 404File setting is pointing at a non-public file: " +
			setting.String("404File")))
		http.NotFound(w, r)
		return
	}

	file, err := os.Open(urlPathToFile(setting.String("404File")))
	defer file.Close()
	if err != nil {
		log.Error(err)
		http.NotFound(w, r)
		return
	}

	info, err := file.Stat()
	if err != nil {
		log.Error(err)
		http.NotFound(w, r)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	//Have to do this manually so 404 Status Code is preserved
	io.CopyN(w, file, info.Size())
}

//ds404 is the response returned when a datastore entry is not found
func ds404(w http.ResponseWriter, r *http.Request, key *json.RawMessage) {
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Content-Type", "application/json")
	response := &JSend{
		Status:  statusFail,
		Message: "Value not found for key",
		Data:    key,
	}

	w.WriteHeader(http.StatusNotFound)

	result, err := json.Marshal(response)
	if err != nil {
		log.Error(err)
		return
	}

	w.Write(result)
}
