// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"

	"bitbucket.org/tshannon/freehold/app"
	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
)

type KeyValue struct {
	Key   json.RawMessage
	Value json.RawMessage
}

func datastoreGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	filename := urlPathToFile(r.URL.Path)
	prm, err := permission.Get(filename)
	if errHandled(err, w) {
		return
	}

	if !auth.canRead(prm) {
		four04(w, r)
		return
	}
	input := &KeyValue{}
	parseJson(r, input)

	if input.Key == nil {
		fmt.Println("Key exists: %v", input)
	}

}

func datastorePost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.DatastoreNew()

	if !auth.canWrite(prm) {
		errHandled(fail.New("You do not have permissions to a post a datastore.", nil), w)
		return
	}

	if !validDSPath(r.URL.Path) {
		errHandled(fail.New("Invalid path for a datastore.", r.URL.Path), w)
		return
	}

	if r.Header.Get("Content-Type") == "multipart/form-data" {
		err = r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))
		if errHandled(err, w) {
			return
		}

		mp := r.MultipartForm
		err = os.MkdirAll(urlPathToFile(r.URL.Path), 0777)
		if errHandled(err, w) {
			return
		}
		//Is a datastore upload, use file upload
		uploadFile(w, r.URL.Path, auth.User, mp)
		return
	}

	//not an upload, create the datastore instead
	err = os.MkdirAll(urlPathToFile(path.Dir(r.URL.Path)), 0777)
	if errHandled(err, w) {
		return
	}

	filename := urlPathToFile(r.URL.Path)
	err = data.Create(filename)
	if errHandled(err, w) {
		return
	}

	err = permission.Set(filename, permission.DatastoreNewDefault(auth.User.Username()))
	if errHandled(err, w) {
		return
	}
	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: path.Base(filename),
			Url:  r.URL.Path,
		},
	})
}

func datastorePut(w http.ResponseWriter, r *http.Request) {
}

func datastoreDelete(w http.ResponseWriter, r *http.Request) {
}

func validDSPath(url string) bool {
	if isDocPath(url) {
		return false
	}

	root, pth := splitRootAndPath(url)
	if !isVersion(root) {
		a, err := app.Get(root)
		if err != nil || a == nil {
			return false
		}
		root, pth = splitRootAndPath(pth)
		if !isVersion(root) {
			return false
		}
	}
	root, pth = splitRootAndPath(pth)
	if root != "datastore" {
		return false
	}
	return true
}
