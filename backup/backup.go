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

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/resource"
)

// DS is the path to the backup datastore file
const DS = resource.CoreDSDir + "backup.ds"

// Backup is the structure of a freehold backup
type Backup struct {
	When       string   `json:"when"`
	File       string   `json:"file"`
	Who        string   `json:"who"`
	Datastores []string `json:"datastores"`
}

// Get retrieves a list of backups between the From and To dates passed in
func Get(from, to string) ([]*Backup, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	if to == "" {
		to = time.Now().Format(time.RFC3339)
	}

	fromKey, err := json.Marshal(from)
	if err != nil {
		return nil, err
	}
	toKey, err := json.Marshal(to)
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(fromKey, toKey)
	defer iter.Close()
	if err != nil {
		return nil, err
	}

	var result []*Backup

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

// New generates a new backup file
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

	newFile, err := os.OpenFile(backupFile.Filepath(), os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0666)

	if os.IsExist(err) {
		return fail.New("Backup file already exists", backupFile.Name())
	}

	if err != nil {
		return err
	}

	writer := zip.NewWriter(newFile)

	cleanUp := func() {
		writer.Flush()
		writer.Close()
		newFile.Close()
		os.Remove(backupFile.Filepath())
	}

	for i := range datastores {
		f, err := writer.Create(datastores[i])
		if err != nil {
			cleanUp()
			return err
		}

		dsPath := filepath.Join(resource.CoreDSDir, datastores[i])
		data.Close(dsPath)

		dsFile, err := os.Open(dsPath)
		if os.IsNotExist(err) {
			cleanUp()
			return fail.New("Invalid Datastore for backup.", datastores[i])
		}
		if err != nil {
			cleanUp()
			return err
		}

		_, err = io.Copy(f, dsFile)
		dsFile.Close()
		if err != nil {
			cleanUp()
			return err
		}
	}

	writer.Flush()
	err = writer.Close()
	if err != nil {
		cleanUp()
		return err
	}
	newFile.Close()

	// insert backup record
	b := &Backup{
		When:       time.Now().Format(time.RFC3339),
		File:       backupFile.URL(),
		Who:        who,
		Datastores: datastores,
	}

	return b.insert()
}

func (b *Backup) insert() error {
	if b.When == "" {
		b.When = time.Now().Format(time.RFC3339)
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	return ds.Put(b.When, b)
}

func allCoreDSFiles() ([]string, error) {
	coreDir, err := os.Open(resource.CoreDSDir)
	defer coreDir.Close()
	if err != nil {
		return nil, err
	}

	var dsFiles []string
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
