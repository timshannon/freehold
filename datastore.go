// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/app"
	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
)

type DatastoreInput struct {
	Key  *json.RawMessage `json:"key,omitempty"`
	Max  *json.RawMessage `json:"max,omitempty"`
	Min  *json.RawMessage `json:"min,omitempty"`
	Iter *data.Iter       `json:"iter,omitempty"`
}

func datastoreGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	filename := urlPathToFile(r.URL.Path)
	if !fileExists(filename) {
		four04(w, r)
		return
	}

	prm, err := permission.Get(filename)
	if errHandled(err, w) {
		return
	}

	if !auth.canRead(prm) {
		four04(w, r)
		return
	}
	input := &DatastoreInput{}
	parseJson(r, input)

	if input.Key != nil {
		//return key's value
		ds, err := data.Open(filename)
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w) {
			return
		}
		val, err := ds.Get(*input.Key)
		if err == data.ErrNotFound {
			ds404(w, r, input.Key)
			return
		}
		if errHandled(err, w) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   val,
		})
	} else if input.Iter != nil {
		//return iter result
		ds, err := data.Open(filename)
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		val, err := ds.Iter(input.Iter)
		if errHandled(err, w) {
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   val,
		})
	} else if input.Max != nil {
		ds, err := data.Open(filename)
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w) {
			return
		}
		key, err := ds.Max()
		if errHandled(err, w) {
			return
		}

		val, err := ds.Get(*key)
		if err == data.ErrNotFound {
			//shouldn't happen
			errHandled(errors.New(fmt.Sprintf("Max key was retrieved but value was not key: %s", key)), w)
			return
		}

		if errHandled(err, w) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: data.KeyValue{
				Key:   key,
				Value: val,
			},
		})
	} else if input.Min != nil {
		ds, err := data.Open(filename)
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w) {
			return
		}
		key, err := ds.Min()
		if errHandled(err, w) {
			return
		}

		val, err := ds.Get(*key)
		if err == data.ErrNotFound {
			//shouldn't happen
			errHandled(errors.New(fmt.Sprintf("Max key was retrieved but value was not key: %s", key)), w)
			return
		}

		if errHandled(err, w) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: data.KeyValue{
				Key:   key,
				Value: val,
			},
		})

	} else {
		//return entire file

		if !auth.canRead(permission.DatastoreDownload(prm)) {
			four04(w, r)
			return
		}
		data.Close(filename)
		dsFile, err := os.Open(filename)
		if errHandled(err, w) {
			return
		}
		defer dsFile.Close()
		http.ServeContent(w, r, dsFile.Name(), time.Time{}, dsFile)
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

	if strings.HasPrefix(r.Header.Get("Content-Type"), "multipart/form-data") {
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
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	filename := urlPathToFile(r.URL.Path)
	if !fileExists(filename) {
		four04(w, r)
		return
	}

	prm, err := permission.Get(filename)
	if errHandled(err, w) {
		return
	}

	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to update this datastore.", nil), w)
		return
	}

	input := make(data.Data)
	err = parseJson(r, &input)
	if errHandled(err, w) {
		return
	}

	ds, err := data.Open(filename)
	if errHandled(err, w) {
		return
	}

	errors := ds.Put(input)
	if len(errors) == 0 {
		respondJsend(w, &JSend{
			Status: statusSuccess,
		})
		return
	}

	respondJsend(w, &JSend{
		Status:   statusFail,
		Failures: errors,
	})

}

func datastoreDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	filename := urlPathToFile(r.URL.Path)
	if !fileExists(filename) {
		four04(w, r)
		return
	}

	input := &DatastoreInput{}
	parseJson(r, input)

	prm, err := permission.Get(filename)
	if errHandled(err, w) {
		return
	}

	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to a delete from this datastore.", nil), w)
		return
	}

	if input.Key != nil {
		ds, err := data.Open(filename)
		if errHandled(err, w) {
			return
		}
		err = ds.Delete(*input.Key)
		if errHandled(err, w) {
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
		})
		return
	}

	//no key specified drop datastore
	prm = permission.DatastoreDrop(prm)

	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to drop this datastore.", nil), w)
		return
	}

	err = data.Drop(filename)
	if errHandled(err, w) {
		return
	}

	err = clearEmptyFolder(path.Dir(filename))
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: path.Base(filename),
			Url:  r.URL.Path,
		},
	})
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
