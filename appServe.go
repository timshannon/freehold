package main

import (
	"errors"
	"net/http"
	"path"
)

func appGet(w http.ResponseWriter, r *http.Request) {
}

func appPost(w http.ResponseWriter, r *http.Request) {
}

func appPut(w http.ResponseWriter, r *http.Request) {

}

func appDelete(w http.ResponseWriter, r *http.Request) {
}

func appRootGet(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		four04(w, r)
		return
	}
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	app, err := getApp(appHandler.Root(r))
	if errHandled(err, w) {
		return
	}
	if app == nil {
		four04(w, r)
		return
	}

	root := app.Root
	if root == "" {
		logError(errors.New("App " + app.id + " has not root specified."))
		root = path.Join("/", app.id, version, "file")
	}

	serveResource(w, r, root, auth)
}
