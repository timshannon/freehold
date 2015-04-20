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

// JSend is the standard format for a response from freehold
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

	if len(response.Failures) > 0 && response.Message == "" {
		response.Message = "One or more item has failed. Check the individual failures for details."
	}

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

func parseJSON(r *http.Request, result interface{}) error {
	buff, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}

	//TODO: Parse input differently based on content type
	// accept x-www-form-urlencoded as well as json?
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
	if err != nil {
		return err
	}
	return nil
}
