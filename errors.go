package main

import (
	"errors"
	"net/http"
)

type publicError error

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}

	var errMsg string
	if !settingBool("FullClientErrors") {
		switch err.(type) {
		case nil:
			return false
		case publicError:
			errMsg = err.Error()
		default:
			errMsg = "An internal error has occurred"
		}
	}
	respondJsend(w, &JSend{
		Status:  statusError,
		Message: errMsg,
	})
	logError(err)
	return true
}

func four04(w http.ResponseWriter, r *http.Request) {
	if settingBool("Log404") {
		logError(errors.New("Resource not found: " + r.URL.String()))
	}
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)
	r.URL.Path = settingString("404Path") //not sure if this works
	fileGet(w, r)
}
