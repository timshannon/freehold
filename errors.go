package main

import (
	"errors"
	"io"
	"net/http"
	"os"
)

const (
	default404Path = "/" + version + "/file/core/404.html"
)

type publicError struct {
	error
}

func pubErr(err error) error {
	return publicError{err}
}

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}

	var errMsg string
	if !settingBool("FullClientErrors") {
		switch err.(type) {
		case nil:
			return false
		case *publicError:
			errMsg = err.Error()
		default:
			errMsg = "An internal server error has occurred"
		}
	} else {
		errMsg = err.Error()
	}
	w.WriteHeader(http.StatusInternalServerError)
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
