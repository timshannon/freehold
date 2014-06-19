package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
)

const (
	statusSuccess = "success"
	statusError   = "error"
	statusFail    = "fail"
)

type JSend struct {
	Status  string      `json:"status"`
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty"`
}

//respondJsend marshalls the input into a json byte array
// and writes it to the reponse with appropriate header
func respondJsend(w http.ResponseWriter, response *JSend) {
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Content-Type", "application/json")

	result, err := json.Marshal(response)
	if err != nil {
		logError(err)
		result, _ = json.Marshal(&JSend{
			Status:  statusError,
			Message: "An internal error occurred, and we'll look into it.",
		})
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
		// take precedent
		buff = []byte(r.URL.RawQuery)
	}

	err = json.Unmarshal(buff, result)
	switch err := err.(type) {
	case nil:
		return nil
	case *json.SyntaxError, *json.UnmarshalTypeError:
		return pubFail(errors.New("Request contains invalid JSON"))
	default:
		return err
	}
}
