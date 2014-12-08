package main

import (
	"os"
	"path"
	"path/filepath"
	"strings"

	"bitbucket.org/tshannon/freehold/permission"
)

type fileResource struct {
	filepath   string
	url        string
	permission *permission.Permission
}

func newFileRes(url string) *fileResource {
	r := &Resource{
		url:      url,
		filepath: path.Clean(urlPathToFile(url)),
	}

	return r
}

func newFileResFromProperty(url string) *fileResource {
	return New(resPathFromProperty(url))
}

func (r *fileResource) parent() *fileResource {
	return newFileRes(filepath.Dir(strings.TrimSuffix(r.url, "/")))
}

func (r *fileResource) isDir() bool {
	if stat, err := os.Stat(r.filepath); err == nil {
		return stat.IsDir()
	}
	return false
}

func (r *fileResource) isHidden() bool {
	return strings.HasPrefix(path.Base(r.filepath), ".")
}

func (r *fileResource) Url() string {
	return r.url
}

func (r *fileResource) ID() string {
	return r.filepath
}

func (r *fileResource) name() string {
	return filepath.Base(r.filepath)
}
func (r *fileResource) Permission() (*permission.Permission, error) {
	if r.permission != nil {
		return r.permission, nil
	}
	if r.isHidden() || !fileExists(r.filepath) {
		//Hidden files can't be accessed by anyone
		r.permission = &permission.Permission{}
		return r.permission, nil
	}

	if isDocPath(r.filepath) {
		r.permission = permission.Doc()
		return r.permission, nil
	}

	if !isFilePath(r.url) & r.IsDir() {
		r.permission = permission.DatastoreDir()
		return r.permission, nil
	}
	if isFileRoot(r.url) {
		r.permission = permission.FileRoot()
		return r.permission, nil
	}

	prm, err := permission.Get(r.filepath)
	if err != nil {
		return nil, err
	}
	r.permission = prm

	return r.permission, nil
}
