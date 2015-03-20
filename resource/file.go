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

// File is a freehold file
type File struct {
	filepath   string
	url        string
	permission *permission.Permission
	info       os.FileInfo
	exists     bool
}

// NewFile returns a new freehold file object
func NewFile(url string) *File {
	//TODO: validate url path

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
			//shouldn't happen
			panic(err)
		}
	} else {
		r.info = info
	}

	return r
}

// NewFileFromProperty returns a freehold file object from the
// passed in property url
func NewFileFromProperty(url string) *File {
	return NewFile(resPathFromProperty(url))
}

// Parent returns the parent directory of the current file
func (r *File) Parent() *File {
	return NewFile(filepath.Dir(strings.TrimSuffix(r.url, "/")))
}

// Children returns the child files of the current directory
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
		n := NewFile(path.Join(r.URL(), filepath.Base(childNames[i])))
		if !r.IsHidden() && n.Exists() {
			children = append(children, n)
		}
	}

	return children, nil
}

// IsDir is whether or not this file is a directory
func (r *File) IsDir() bool {
	if r.exists {
		return r.info.IsDir()
	}
	return false
}

// IsDatastore is whether or not this file is a datastore
func (r *File) IsDatastore() bool {
	return !isFilePath(r.url)
}

// IsHidden is whether or not freehold sees this file as hidden
// freehold will accept regular files starting with ., but not datastore files
func (r *File) IsHidden() bool {
	if r.IsDatastore() {
		return strings.HasPrefix(r.Name(), ".")
	}
	return false
}

// Exists is whether or not this file exists
func (r *File) Exists() bool {
	return r.exists
}

// URL is the url to this file
func (r *File) URL() string {
	if r.IsDir() && !strings.HasSuffix(r.url, "/") {
		return r.url + "/" // add trailing slash for convience when traversing the filetree
	}
	return r.url
}

// Filepath is the path to the file
func (r *File) Filepath() string {
	return r.filepath
}

// ID is the unique identifier for this file
func (r *File) ID() string {
	if r.IsDatastore() && r.IsDir() {
		//Datastore directories dont' have permissions
		// and shouldn't be set
		return permission.INVALID_ID
	}

	if !r.IsDatastore() && isRootPath(r.URL()) {
		//make sure permissions don't get set on root
		return permission.INVALID_ID
	}

	return r.filepath
}

// Name is the name of the file without the path
func (r *File) Name() string {
	return filepath.Base(r.filepath)
}

// Size is the size of the file in bytes
func (r *File) Size() int64 {
	if r.exists && !r.IsDir() {
		return r.info.Size()
	}
	return 0
}

// Modified is a JSON string value of when the file was last modified
func (r *File) Modified() string {
	if r.exists {
		return r.info.ModTime().Format(time.RFC3339)
	}
	return ""
}

// FileInfo is the FileInfo object returned by the OS
func (r *File) FileInfo() os.FileInfo {
	if r.exists {
		return r.info
	}
	return nil
}

// Move moves the file to the new location
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
		childTo := NewFile(path.Join(to.URL(), child.Name()))
		err = child.movePermissions(childTo)
		if err != nil {
			return err
		}
	}
	return nil
}

// Permission  retrieves the freehold permissions for this file
func (r *File) Permission() (*permission.Permission, error) {
	if r.permission != nil {
		return r.permission, nil
	}
	if r.IsHidden() || !r.Exists() {
		//Datastore Hidden files can't be accessed by anyone
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
