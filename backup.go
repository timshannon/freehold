// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"
	"path"
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/backup"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
)

type backupInput struct {
	Datastores []string `json:"datastores,omitempty"`
	File       *string  `json:"file,omitempty"`
	From       *string  `json:"from,omitempty"`
	To         *string  `json:"to,omitempty"`
}

func backupGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	if !permission.Backup().CanRead(auth.User) {
		four04(w, r)
		return
	}

	input := &backupInput{}

	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.From == nil {
		errHandled(fail.New("Invalid input.  From is required to retrieve backups", input), w, auth)
		return
	}

	if input.To == nil {
		input.To = new(string)
	}

	backups, err := backup.Get(*input.From, *input.To)
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   backups,
	})

}

func backupPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	if auth.AuthType != authTypeBasic {
		errHandled(fail.New("Backups cannot be taken from a Session or Token.", nil), w, auth)
		return
	}
	if !permission.Backup().CanWrite(auth.User) {
		four04(w, r)
		return
	}

	input := &backupInput{}

	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.File == nil {
		errHandled(fail.New("Invalid input. File is required to take a new backup.", input), w, auth)
		return

	}

	res := resource.NewFile(*input.File)
	if res.IsDatastore() {
		errHandled(fail.New("Invalid file path!", res.URL()), w, auth)
		return
	}

	if !res.Exists() && strings.HasSuffix(res.URL(), "/") {
		//create folder
		if errHandled(createFolder(res, auth), w, auth) {
			return
		}
		res = resource.NewFile(res.URL())
	}
	if res.IsDir() {
		res = resource.NewFile(path.Join(res.URL(), "freehold_backup-"+time.Now().Format(time.RFC3339)+".zip"))
	}
	if strings.ToLower(path.Ext(res.Name())) != ".zip" {
		res = resource.NewFile(res.URL() + ".zip")
	}

	if res.Exists() {
		errHandled(fail.New("Backup file already exists!", res.URL()), w, auth)
		return
	}

	err = backup.New(res, input.Datastores, auth.Username)
	if errHandled(err, w, auth) {
		return
	}

	//set permissions on backup file
	if errHandled(permission.Set(res, permission.FileNewDefault(auth.Username)), w, auth) {
		return
	}

	w.WriteHeader(http.StatusCreated)

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   res.URL(),
	})

}
