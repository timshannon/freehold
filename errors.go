package main

import (
	"errors"
	"io"
	"net/http"
	"os"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/paths"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
)

func errHandled(err error, w http.ResponseWriter) bool {
	if err == nil {
		return false
	}

	var status, errMsg string

	if fail.IsFail(err) {
		status = statusFail
		log.Fail(err)
	} else {
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
			Status: status,
			Data:   err.(*fail.Fail),
		})
	} else {
		respondJsend(w, &JSend{
			Status:  status,
			Message: errMsg,
		})
	}

	return true
}

func four04(w http.ResponseWriter, r *http.Request) {
	if setting.Bool("Log404") {
		log.Error(errors.New("Resource not found: " + r.URL.String()))
	}

	prm, err := permission.Get(setting.String("404File"))
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

	file, err := os.Open(paths.UrlPathToFile(setting.String("404File")))
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
