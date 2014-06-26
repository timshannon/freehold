package main

import (
	"errors"
	"io"
	"net/http"
	"os"

	"bitbucket.org/tshannon/freehold/fail"
)

const (
	default404Path = "/" + version + "/file/core/404.html"
)

func errorMessage(err error) (status, errMsg string) {

}

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}

	var status, errMsg string

	switch err := err.(type) {
	case *fail.Fail:
		status = statusFail
		logFail(err)
	default:
		status = statusError
		logError(err)
		if settingBool("FullClientErrors") {
			errMsg = err.Error()
		} else {
			errMsg = "An internal server error has occurred"
		}
	}

	if status == statusFail {
		w.WriteHeader(http.StatusBadRequest)
		respondJsend(w, &JSend{
			Status: status,
			Data:   err.(fail.Fail),
		})
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		respondJsend(w, &JSend{
			Status:  status,
			Message: errMsg,
		})
	}

	return true
}

func four04(w http.ResponseWriter, r *http.Request) {
	if settingBool("Log404") {
		logError(errors.New("Resource not found: " + r.URL.String()))
	}

	prm, err := permissions(settingString("404File"))
	if err != nil {
		logError(err)
		http.NotFound(w, r)
		return
	}
	if !prm.canRead(nil) {
		logError(errors.New("The 404File setting is pointing at a non-public file: " +
			settingString("404File")))
		http.NotFound(w, r)
		return
	}

	file, err := os.Open(urlPathToFile(settingString("404File")))
	defer file.Close()
	if err != nil {
		logError(err)
		http.NotFound(w, r)
		return
	}

	info, err := file.Stat()
	if err != nil {
		logError(err)
		http.NotFound(w, r)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	//Have to do this manually so 404 Status Code is preserved
	io.CopyN(w, file, info.Size())
}
