// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"archive/zip"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
)

type BackupInput struct {
	Datastores []string `json:"datastores,omitempty"`
	Filename   *string  `json:"filename,omitempty"`
}

//TODO: Can't dynamically download a file, so instead change backup to generate a file in the instance

func backupGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	if auth.AuthType != authTypeBasic {
		errHandled(fail.New("Backups cannot be taken from a Session or Token.", nil), w, auth)
		return
	}

	if !permission.Backup().CanRead(auth.User) {
		four04(w, r)
		return
	}

	input := &BackupInput{}

	err = parseJson(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.Datastores == nil || len(input.Datastores) == 0 {
		input.Datastores, err = allCoreDSFiles()
		if errHandled(err, w, auth) {
			return
		}
	} else {
		for i := range input.Datastores {
			if strings.ToLower(filepath.Ext(input.Datastores[i])) != ".ds" {
				input.Datastores[i] += ".ds"
			}
		}
	}

	filename := ""
	if input.Filename == nil {
		filename = "freehold_backup" + time.Now().Format(time.RFC3339) + ".zip"
	} else {
		filename = *input.Filename
		if strings.ToLower(filepath.Ext(filename)) != ".zip" {
			filename += ".zip"
		}
	}

	buf := new(bytes.Buffer)

	writer := zip.NewWriter(buf)

	for i := range input.Datastores {
		f, err := writer.Create(input.Datastores[i])
		if errHandled(err, w, auth) {
			return
		}

		dsPath := filepath.Join(resource.CoreDSDir, input.Datastores[i])
		data.Close(dsPath)

		dsFile, err := os.Open(dsPath)
		if errHandled(err, w, auth) {
			return
		}

		_, err = io.Copy(f, dsFile)
		dsFile.Close()
		if errHandled(err, w, auth) {
			return
		}
	}

	writer.Flush()
	err = writer.Close()
	if errHandled(err, w, auth) {
		return
	}

	reader := bytes.NewReader(buf.Bytes())

	http.ServeContent(w, r, filename, time.Time{}, reader)
	return
}

func allCoreDSFiles() ([]string, error) {
	coreDir, err := os.Open(resource.CoreDSDir)
	defer coreDir.Close()
	if err != nil {
		return nil, err
	}

	dsFiles := make([]string, 0)
	files, err := coreDir.Readdirnames(0)
	if err != nil {
		return nil, err
	}

	for i := range files {
		if filepath.Ext(files[i]) == ".ds" {
			dsFiles = append(dsFiles, files[i])
		}
	}

	return dsFiles, nil
}
