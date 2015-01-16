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
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
	"bitbucket.org/tshannon/freehold/setting"
)

type DatastoreInput struct {
	Key   *json.RawMessage `json:"key,omitempty"`
	Max   *json.RawMessage `json:"max,omitempty"`
	Min   *json.RawMessage `json:"min,omitempty"`
	Iter  *data.Iter       `json:"iter,omitempty"`
	Count *json.RawMessage `json:"count,omitempty"`
}

func datastoreGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFile(r.URL.Path)

	if errHandled(auth.tryRead(res), w, auth) {
		return
	}

	input := &DatastoreInput{}
	parseJson(r, input)

	switch {
	case input.Key != nil:
		//return key's value
		ds, err := data.Open(res.Filepath())
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w, auth) {
			return
		}
		val, err := ds.Get(*input.Key)
		if err == data.ErrNotFound {
			ds404(w, r, input.Key)
			return
		}
		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   val,
		})
	case input.Count != nil:
		//return count
		ds, err := data.Open(res.Filepath())
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}
		if errHandled(err, w, auth) {
			return
		}

		count, err := ds.Count(input.Iter)
		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   count,
		})

	case input.Iter != nil:
		//return iter result
		ds, err := data.Open(res.Filepath())
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}
		if errHandled(err, w, auth) {
			return
		}

		val, err := ds.Iter(input.Iter)
		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   val,
		})
	case input.Max != nil:
		ds, err := data.Open(res.Filepath())
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w, auth) {
			return
		}
		key, err := ds.Max()
		if errHandled(err, w, auth) {
			return
		}

		val, err := ds.Get(*key)
		if err == data.ErrNotFound {
			//shouldn't happen
			errHandled(errors.New(fmt.Sprintf("Max key was retrieved but value was not key: %s", key)), w, auth)
			return
		}

		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: data.KeyValue{
				Key:   key,
				Value: val,
			},
		})
	case input.Min != nil:
		ds, err := data.Open(res.Filepath())
		if os.IsNotExist(err) {
			four04(w, r)
			return
		}

		if errHandled(err, w, auth) {
			return
		}
		key, err := ds.Min()
		if errHandled(err, w, auth) {
			return
		}

		val, err := ds.Get(*key)
		if err == data.ErrNotFound {
			//shouldn't happen
			errHandled(errors.New(fmt.Sprintf("Max key was retrieved but value was not key: %s", key)), w, auth)
			return
		}

		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: data.KeyValue{
				Key:   key,
				Value: val,
			},
		})

	default:
		//return entire file

		prm, err := res.Permission()
		if errHandled(err, w, auth) {
			return
		}
		if !permission.DatastoreDownload(prm).CanRead(auth.User) {
			four04(w, r)
			return
		}
		data.Close(res.Filepath())
		dsFile, err := os.Open(res.Filepath())
		if errHandled(err, w, auth) {
			return
		}
		defer dsFile.Close()
		http.ServeContent(w, r, dsFile.Name(), time.Time{}, dsFile)
	}
}

func datastorePost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFile(r.URL.Path)

	if strings.HasPrefix(r.Header.Get("Content-Type"), "multipart/form-data") {
		if !res.IsDir() {
			errHandled(fail.New("Path is not a directory. A datastore cannot be uploaded here.", res.Url()), w, auth)
			return
		}

		if errHandled(auth.tryWrite(res), w, auth) {
			return
		}

		err = r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))
		if errHandled(err, w, auth) {
			return
		}

		mp := r.MultipartForm
		err = os.MkdirAll(res.Filepath(), 0777)
		if errHandled(err, w, auth) {
			return
		}
		//Is a datastore upload, use file upload
		fileList, failures := uploadFile(w, res, auth.User, mp)

		status := statusSuccess

		if len(failures) == 0 {
			w.WriteHeader(http.StatusCreated)
		} else {
			status = statusFail
		}

		//Validate datastore files
		for i := range fileList {
			dsRes := resource.NewFile(fileList[i].Url)
			_, err = data.Open(dsRes.Filepath())
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, dsRes.Name()))
				status = statusFail
				os.Remove(dsRes.Filepath())
				permission.Delete(dsRes)
			} else {
				data.Close(dsRes.Filepath())
			}
		}
		respondJsend(w, &JSend{
			Status:   status,
			Data:     fileList,
			Failures: failures,
		})
		return
	}

	//not an upload, create the datastore instead
	err = os.MkdirAll(res.Parent().Filepath(), 0777)
	if errHandled(err, w, auth) {
		return
	}

	if errHandled(auth.tryWrite(res.Parent()), w, auth) {
		return
	}

	err = data.Create(res.Filepath())
	if errHandled(err, w, auth) {
		return
	}

	err = permission.Set(res, permission.DatastoreNewDefault(auth.User.Username()))
	if errHandled(err, w, auth) {
		return
	}
	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: res.Name(),
			Url:  res.Url(),
		},
	})
}

func datastorePut(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFile(r.URL.Path)

	if errHandled(auth.tryWrite(res), w, auth) {
		return
	}

	input := make(data.Data)
	err = parseJson(r, &input)
	if errHandled(err, w, auth) {
		return
	}

	if input == nil {
		errHandled(fail.New("Empty datastore input, nothing to PUT", input), w, auth)
		return
	}

	ds, err := data.Open(res.Filepath())
	if errHandled(err, w, auth) {
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
	if errHandled(err, w, auth) {
		return
	}

	input := &DatastoreInput{}
	parseJson(r, input)

	res := resource.NewFile(r.URL.Path)
	if errHandled(auth.tryWrite(res), w, auth) {
		return
	}

	if input.Key != nil {
		ds, err := data.Open(res.Filepath())
		if errHandled(err, w, auth) {
			return
		}
		err = ds.Delete(*input.Key)
		if errHandled(err, w, auth) {
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
		})
		return
	}

	//no key specified drop datastore
	prm, err := res.Permission()
	if errHandled(err, w, auth) {
		return
	}
	prm = permission.DatastoreDrop(prm)

	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to drop this datastore.", nil), w, auth)
		return
	}

	err = data.Drop(res.Filepath())
	if errHandled(err, w, auth) {
		return
	}
	err = permission.Delete(res)
	if errHandled(err, w, auth) {
		return
	}

	err = clearEmptyFolder(res.Parent())
	if errHandled(err, w, auth) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: res.Name(),
			Url:  res.Url(),
		},
	})
}
