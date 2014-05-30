package main

import (
	"encoding/json"
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
		//TODO: Error Logging
		result, _ = json.Marshal(&JSend{
			Status:  statusError,
			Message: "An internal error occurred, and we'll look into it.",
		})
	}
	w.Write(result)
}
