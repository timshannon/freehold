// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package backup

import (
	"archive/zip"
	"encoding/json"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/resource"
)

const DS = "core/backup.ds"

type Backup struct {
	When       string   `json:"when"`
	Filename   string   `json:"filename"`
	Who        string   `json:"Who"`
	Datastores []string `json:"datastores"`
}

func Get(from, to string) ([]*Backup, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	if to == "" {
		to = time.Now().Format(time.RFC3339)
	}

	iter, err := ds.Iter([]byte(from), []byte(to))
	if err != nil {
		return nil, err
	}

	result := make([]*Backup, 0)

	for iter.Next() {
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		value := iter.Value()
		if value == nil {
			//shouldn't happen
			panic("Nil value returned from datastore iterator")
		}

		entry := &Backup{}
		err = json.Unmarshal(value, entry)
		if err != nil {
			return nil, err
		}

		result = append(result, entry)
	}

	return result, nil
}

func New(backupFile *resource.File, datastores []string, who string) error {
	var err error

	if len(datastores) == 0 {
		datastores, err = allCoreDSFiles()
		if err != nil {
			return err
		}
	} else {
		for i := range datastores {
			if strings.ToLower(filepath.Ext(datastores[i])) != ".ds" {
				datastores[i] += ".ds"
			}
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

	//set permissions on new file
	// insert backup record
	return nil
}

func (b *Backup) insert() error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

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
