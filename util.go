// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"crypto/md5"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strings"

	"bitbucket.org/tshannon/freehold/app"
	"bitbucket.org/tshannon/freehold/data/store"
)

var versions = map[string]struct{}{"v1": struct{}{}}

func init() {
	app.IsRestrictedFunc = isRestricted
}

const (
	docsDir      = "docs/"
	fileDir      = "file/"
	datastoreDir = "datastore/"
	appDir       = app.AppDir
)

// splitRootAndPath splits the first item in a path from the rest
// /v1/file/test.txt:
// root = "v1"
// path = "/file/test.txt"
func splitRootAndPath(pattern string) (root, path string) {
	if pattern == "" {
		panic("Invalid pattern")
	}
	if pattern[:1] == "/" {
		pattern = pattern[1:]
	}
	split := strings.SplitN(pattern, "/", 2)
	root = split[0]
	if len(split) < 2 {
		path = "/"
	} else {
		path = "/" + split[1]
	}
	return root, path
}

func isDocPath(resource string) bool {
	root, _ := splitRootAndPath(resource)
	return root == "docs"
}

func isFilePath(resource string) bool {
	root, path := splitRootAndPath(resource)
	if isVersion(root) {
		root, _ = splitRootAndPath(path)
		return root == "file"
	}

	return isFilePath(path)
}

// urlPathToFile takes a url path and returns the path to the file
// on the os filesystem
// url path format will usually be
// /<version>/<type of resource>/<path to resource>/
func urlPathToFile(urlPath string) string {
	if urlPath == "/" || urlPath == "" {
		return "/"
	}
	root, respath := splitRootAndPath(urlPath)

	//strip off version and check if valid
	if !isVersion(root) {
		//not a version prefix
		if strings.ToLower(root) == "docs" {
			return path.Join(docsDir, respath)
		}

		//Is app path and root is app-id
		return path.Join(appDir, root, urlPathToFile(respath))
	}
	return v1FilePath(respath)
}

func v1FilePath(resourcePath string) string {
	root, respath := splitRootAndPath(resourcePath)
	switch strings.ToLower(root) {
	case "file":
		return path.Join(fileDir, respath)
	case "datastore":
		return path.Join(datastoreDir, respath)
	case "properties":
		return v1FilePath(respath)
	default:
		//invalid path
		return ""
	}
}

func isVersion(version string) bool {
	//TODO: Check for all possible versions?
	// make sure apps can be registered on possible future version endpoints?
	_, ok := versions[version]
	return ok
}

func isRestricted(path string) bool {
	if isDocPath(path) {
		return true
	}
	if isVersion(path) {
		return true
	}
	return false
}

func halt(msg string) {
	store.Halt()
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(1)
}

func md5Sum(rs io.Reader) string {
	buff, err := ioutil.ReadAll(rs)
	if err != nil {
		halt("Error calculating MD5 sum: " + err.Error())
	}
	return fmt.Sprintf("%x", md5.Sum(buff))
}

func fileExists(filename string) bool {
	if _, err := os.Stat(filename); err == nil {
		return true
	}
	return false
}

func isHidden(filename string) bool {
	return strings.HasPrefix(path.Base(filename), ".")
}

func isDir(filename string) bool {
	if stat, err := os.Stat(filename); err == nil {
		return stat.IsDir()
	}
	return false
}

func clearEmptyFolder(folder string) error {
	file, err := os.Open(folder)
	defer file.Close()

	files, err := file.Readdir(0)
	if err != nil {
		return err
	}
	if len(files) == 0 {
		return os.Remove(file.Name())
	}
	return nil
}

//ipAddress returns the actual ip address from the request
func ipAddress(r *http.Request) string {
	address := r.RemoteAddr
	index := strings.LastIndex(address, ":")
	if index == -1 {
		return address
	}
	return address[:index]
}
