package main

import (
	"errors"
	"net/http"
	"path"
)

type ApplicationInput struct {
	Id   *string `json:"id,omitempty"`
	File *string `json:"file,omitempty"`
}

func appGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}
	if auth == nil {
		four04(w, r)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Id != nil {
		app, err := getApp(*input.Id)
		if errHandled(err, w) {
			return
		}

		if app == nil {
			four04(w, r)
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   app,
		})
		return
	}

	apps, err := getAllApps()
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   apps,
	})
	return

}

func appPost(w http.ResponseWriter, r *http.Request) {
	if _, ok := authedForAdmin(w, r); !ok {
		return
	}

	input := &ApplicationInput{}
	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		respondJsend(w, &JSend{
			Status:  statusFail,
			Message: "JSON request must contain file property",
		})
		return
	}

	app, err := installApp(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   app,
	})

}

func appPut(w http.ResponseWriter, r *http.Request) {
	if _, ok := authedForAdmin(w, r); !ok {
		return
	}

	input := &ApplicationInput{}
	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		respondJsend(w, &JSend{
			Status:  statusFail,
			Message: "JSON request must contain file property",
		})
		return
	}
	app, err := upgradeApp(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   app,
	})
}

func appDelete(w http.ResponseWriter, r *http.Request) {
	if _, ok := authedForAdmin(w, r); !ok {
		return
	}

	input := &ApplicationInput{}
	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Id == nil {
		respondJsend(w, &JSend{
			Status:  statusFail,
			Message: "JSON request must contain the id property",
		})
		return
	}

	err = uninstallApp(*input.Id)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})
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
		logError(errors.New("App " + app.Id + " has not root specified."))
		root = path.Join("/", app.Id, version, "file")
	}

	serveResource(w, r, root, auth)
}

func appAvailableGet(w http.ResponseWriter, r *http.Request) {
	if _, ok := authedForAdmin(w, r); !ok {
		return
	}

	apps, errors, err := getAppsFromDir(availableAppDir)
	if errHandled(err, w) {
		return
	}

	if len(errors) > 0 {
		respondJsend(w, &JSend{
			Status: statusError,
			Data:   apps,
			Errors: errors,
		})
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   apps,
	})
}

func appAvailablePost(w http.ResponseWriter, r *http.Request) {
	if _, ok := authedForAdmin(w, r); !ok {
		return
	}

	input := &ApplicationInput{}
	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		respondJsend(w, &JSend{
			Status:  statusFail,
			Message: "JSON request must contain file property",
		})
		return
	}

	file, err := appFileFromUrl(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   file,
	})
	return

}
