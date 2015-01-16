// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package resource

import (
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/permission"
)

type File struct {
	filepath   string
	url        string
	permission *permission.Permission
	info       os.FileInfo
	exists     bool
}

func NewFile(url string) *File {

	r := &File{
		url:      url,
		filepath: path.Clean(urlPathToFile(url)),
		exists:   true,
	}

	info, err := os.Stat(r.filepath)
	if err != nil {
		if os.IsNotExist(err) {
			r.exists = false
		} else {
			//shouldn't happen unless there's something wrong with the OS
			panic(err)
		}
	} else {
		r.info = info
	}

	return r
}

func NewFileFromProperty(url string) *File {
	return NewFile(resPathFromProperty(url))
}

func (r *File) Parent() *File {
	return NewFile(filepath.Dir(strings.TrimSuffix(r.url, "/")))
}

func (r *File) Children() ([]*File, error) {
	if !r.IsDir() {
		return make([]*File, 0), nil
		//return nil, errors.New("File " + r.Filepath() + " is not a folder!")
	}

	file, err := os.Open(r.Filepath())
	defer file.Close()

	if err != nil {
		return nil, err
	}

	childNames, err := file.Readdirnames(0)
	if err != nil {
		return nil, err
	}

	children := make([]*File, 0, len(childNames))

	for i := range childNames {
		n := NewFile(path.Join(r.Url(), filepath.Base(childNames[i])))
		if !n.IsHidden() && n.Exists() {
			children = append(children, n)
		}
	}

	return children, nil
}

func (r *File) IsDir() bool {
	if r.exists {
		return r.info.IsDir()
	}
	return false
}

func (r *File) IsDatastore() bool {
	return !isFilePath(r.url)
}

func (r *File) IsHidden() bool {
	return strings.HasPrefix(r.Name(), ".")
}

func (r *File) Exists() bool {
	return r.exists
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
	if r.IsDatastore() && r.IsDir() {
		//Datastore directories dont' have permissions
		// and shouldn't be set
		return permission.INVALID_ID
	}

	if !r.IsDatastore() && isRootPath(r.Url()) {
		//make sure permissions don't get set on root
		return permission.INVALID_ID
	}

	return r.filepath
}

func (r *File) Name() string {
	return filepath.Base(r.filepath)
}

func (r *File) Size() int64 {
	if r.exists && !r.IsDir() {
		return r.info.Size()
	}
	return 0
}

func (r *File) Modified() string {
	if r.exists {
		return r.info.ModTime().Format(time.RFC3339)
	}
	return ""
}

func (r *File) FileInfo() os.FileInfo {
	if r.exists {
		return r.info
	}
	return nil
}

func (r *File) Move(to *File) error {
	err := r.movePermissions(to)
	if err != nil {
		return err
	}

	return os.Rename(r.Filepath(), to.Filepath())
}

func (r *File) movePermissions(to *File) error {
	err := permission.Move(r, to)
	if err != nil {
		return err
	}

	if !r.IsDir() {
		return nil
	}

	children, err := r.Children()
	if err != nil {
		return err
	}
	for i := range children {
		child := children[i]
		childTo := NewFile(path.Join(to.Url(), child.Name()))
		err = child.movePermissions(childTo)
		if err != nil {
			return err
		}
	}
	return nil
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

	if r.IsDir() {
		if r.IsDatastore() {
			r.permission = permission.DatastoreDir()
			return r.permission, nil
		}

		if isRootPath(r.url) {
			r.permission = permission.FileRoot()
			return r.permission, nil
		}
	}

	prm, err := permission.Get(r)
	if err != nil {
		return nil, err
	}
	r.permission = prm

	return r.permission, nil
}
