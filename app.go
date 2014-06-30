package main

import (
	"errors"
	"net/http"
	"path"

	"bitbucket.org/tshannon/freehold/application"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
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

	prm := permission.Application()

	if !prm.CanRead(auth.User) {
		four04(w, r)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Id != nil {
		app, err := application.Get(*input.Id)
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

	apps, err := application.GetAll()
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
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Application()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to install an application.", nil), w)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		errHandled(fail.New("JSON request must contain file property", nil), w)
		return
	}

	app, err := application.Install(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   app,
	})

}

func appPut(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Application()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to update an application.", nil), w)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		errHandled(fail.New("JSON request must contain file property", nil), w)
		return
	}
	app, err := application.Upgrade(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   app,
	})
}

func appDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Application()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to uninstall an application.", nil), w)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Id == nil {
		errHandled(fail.New("JSON request must contain the id property", nil), w)
		return
	}

	err = application.Uninstall(*input.Id)
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

	app, err := application.Get(appHandler.Root(r))

	if errHandled(err, w) {
		return
	}
	if app == nil {
		four04(w, r)
		return
	}

	root := app.Root
	if root == "" {
		log.Error(errors.New("App " + app.Id + " has no root specified."))
		root = path.Join("/", app.Id, version, "file")
	}

	serveResource(w, r, root, auth)
}

func appAvailableGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.AppAvailable()

	if !prm.CanRead(auth.User) {
		errHandled(fail.New("You do not have permissions to view available applications.", nil), w)
		return
	}

	apps, fails, err := application.Available()
	if errHandled(err, w) {
		return
	}

	if len(fails) > 0 {
		respondJsend(w, &JSend{
			Status:   statusFail,
			Data:     apps,
			Failures: fails,
		})
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   apps,
	})
}

func appAvailablePost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.AppAvailable()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to post a new available application.", nil), w)
		return
	}

	input := &ApplicationInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}
	if input.File == nil {
		errHandled(fail.New("JSON request must contain file property", nil), w)
		return
	}

	file, err := application.PostAvailable(*input.File)
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   file,
	})
	return

}
