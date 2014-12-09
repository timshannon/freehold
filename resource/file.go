// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package resource

import (
	"os"
	"path"
	"path/filepath"
	"strings"

	"bitbucket.org/tshannon/freehold/permission"
)

type File struct {
	filepath   string
	url        string
	permission *permission.Permission
}

func NewFile(url string) *File {
	r := &File{
		url:      url,
		filepath: path.Clean(urlPathToFile(url)),
	}

	return r
}

func NewFileFromProperty(url string) *File {
	return NewFile(resPathFromProperty(url))
}

func (r *File) Parent() *File {
	return NewFile(filepath.Dir(strings.TrimSuffix(r.url, "/")))
}

func (r *File) IsDir() bool {
	if stat, err := os.Stat(r.filepath); err == nil {
		return stat.IsDir()
	}
	return false
}

func (r *File) IsDatastore() bool {
	return !isFilePath(r.url)
}

func (r *File) IsHidden() bool {
	return strings.HasPrefix(path.Base(r.filepath), ".")
}

func (r *File) Exists() bool {
	if _, err := os.Stat(r.filepath); err == nil {
		return true
	}
	return false
}

func (r *File) Url() string {
	if r.IsDir() && !strings.HasSuffix(r.url, "/") {
		return r.url + "/" // add trailing slash for convience when traversing the filetree
	} else {
		return r.url
	}
}

func (r *File) Filepath() string {
	return r.filepath
}

func (r *File) ID() string {
	return r.filepath
}

func (r *File) Name() string {
	return filepath.Base(r.filepath)
}
func (r *File) Permission() (*permission.Permission, error) {
	if r.permission != nil {
		return r.permission, nil
	}
	if r.IsHidden() || !r.Exists() {
		//Hidden files can't be accessed by anyone
		r.permission = &permission.Permission{}
		return r.permission, nil
	}

	if isDocPath(r.filepath) {
		r.permission = permission.Doc()
		return r.permission, nil
	}

	if !isFilePath(r.url) && r.IsDir() {
		r.permission = permission.DatastoreDir()
		return r.permission, nil
	}
	if isFileRoot(r.url) {
		r.permission = permission.FileRoot()
		return r.permission, nil
	}

	prm, err := permission.Get(r)
	if err != nil {
		return nil, err
	}
	r.permission = prm

	return r.permission, nil
}
