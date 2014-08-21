// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package fileinfo

import (
	"errors"
	"time"

	"bitbucket.org/tshannon/freehold/data"
)

const (
	DS = "core/fileinfo.ds"
)

type FileInfo struct {
	UploadDate   string `json:"uploadDate,omitempty"`
	ModifiedDate string `json:"modifiedDate,omitempty"`
}

func Get(filename string) (*FileInfo, error) {
	info := &FileInfo{}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	err = ds.Get(filename, info)
	if err == data.ErrNotFound {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return info, nil
}

func Put(filename string, info *FileInfo) error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	return ds.Put(filename, info)
}

func SetUpload(filename string, when time.Time) error {
	info := &FileInfo{
		UploadDate: when.Format(time.RFC3339),
	}

	return Put(filename, info)
}

func SetModified(filename string, when time.Time) error {
	info, err := Get(filename)
	if err != nil {
		return err
	}

	if info == nil {
		return errors.New("Cannot set modified date on file that hasn't been uploaded yet.")
	}

	info.ModifiedDate = when.Format(time.RFC3339)

	return Put(filename, info)
}
