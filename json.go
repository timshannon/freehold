// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
)

const (
	statusSuccess = "success"
	statusError   = "error"
	statusFail    = "fail"
)

type JSend struct {
	Status   string      `json:"status"`
	Data     interface{} `json:"data,omitempty"`
	Message  string      `json:"message,omitempty"`
	Failures []error     `json:"failures,omitempty"`
}

//respondJsend marshalls the input into a json byte array
// and writes it to the reponse with appropriate header
func respondJsend(w http.ResponseWriter, response *JSend) {
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Content-Type", "application/json")

	result, err := json.Marshal(response)
	if err != nil {
		log.Error(err)
		result, _ = json.Marshal(&JSend{
			Status:  statusError,
			Message: "An internal error occurred, and we'll look into it.",
		})
	}

	switch response.Status {
	case statusFail:
		w.WriteHeader(http.StatusBadRequest)
	case statusError:
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Write(result)
}

func parseJson(r *http.Request, result interface{}) error {
	buff, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}
	if len(buff) == 0 {
		if r.Method != "GET" {
			return nil
		}
		//Browsers will send GET request body as URL parms
		// We'll support either, but the request body will
		// take precedence
		v, err := url.QueryUnescape(r.URL.RawQuery)
		if err != nil {
			return fail.NewFromErr(err, r.URL.RawQuery)
		}

		buff = []byte(v)
	}

	if len(buff) == 0 {
		return nil
	}

	err = json.Unmarshal(buff, result)
	switch err := err.(type) {
	case nil:
		return nil
	case *json.SyntaxError:
		return fail.New("Request contains invalid JSON: "+err.Error(), string(buff))
	case *json.UnmarshalTypeError:
		return fail.New("Request contains a JSON structure that doesn't match the expected structure.", string(buff))
	default:
		return err
	}
}
