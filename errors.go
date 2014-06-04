package main

import "net/http"

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}
	respondJsend(w, &JSend{
		Status:  statusError,
		Message: err.Error(),
	})
	logError(err)
	return true
}
