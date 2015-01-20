// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package resource

import (
	"io"
	"os"
	"path"
	"strings"

	"bufio"

	"bitbucket.org/tshannon/freehold/fail"
)

const (
	DocsDir         = "docs/"
	FileDir         = "file/"
	DatastoreDir    = "datastore/"
	AvailableAppDir = AppDir + "available/"
	AppDir          = "application/"
)

var versions = map[string]struct{}{"v1": struct{}{}}

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
			return path.Join(DocsDir, respath)
		}

		//Is app path and root is app-id
		return path.Join(AppDir, root, urlPathToFile(respath))
	}
	return v1FilePath(respath)
}

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

func isRootPath(resource string) bool {
	if resource == "/" {
		return false
	}
	root, path := splitRootAndPath(resource)
	if isVersion(root) {
		_, path = splitRootAndPath(path)
		return path == "/"
	}

	return isRootPath(path)
}

func isDocPath(resource string) bool {
	root, _ := splitRootAndPath(resource)
	return root == "docs"
}

func isFilePath(resource string) bool {
	if resource == "/" {
		return false
	}
	root, path := splitRootAndPath(resource)
	if isVersion(root) {
		root, _ = splitRootAndPath(path)
		return root == "file"
	}

	return isFilePath(path)
}

func v1FilePath(resourcePath string) string {
	root, respath := splitRootAndPath(resourcePath)
	switch strings.ToLower(root) {
	case "file":
		return path.Join(FileDir, respath)
	case "datastore":
		return path.Join(DatastoreDir, respath)
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

func IsRestrictedPath(path string) bool {
	if isDocPath(path) {
		return true
	}
	if isVersion(path) {
		return true
	}
	return false
}

func resPathFromProperty(propertyPath string) string {
	root, resource := splitRootAndPath(propertyPath)
	if isVersion(root) {
		//strip out properties from path
		_, resource = splitRootAndPath(resource)
		return path.Join("/", root, resource)
	}
	//must be app path
	resource = resPathFromProperty(resource)
	return path.Join("/", root, resource)
}

//WriteFile writes the contents of the reader buffered, and closes it
func WriteFile(reader io.Reader, filepath string, overwrite bool) error {
	var newFile *os.File
	var err error

	if overwrite {
		newFile, err = os.Create(filepath)
	} else {
		newFile, err = os.OpenFile(filepath, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0666)
	}

	if os.IsExist(err) {
		//capturing is exists error so that too much info isn't exposed to end users
		return fail.New("File already exists", path.Base(filepath))
	}
	if err != nil {
		return err
	}

	writer := bufio.NewWriter(newFile)

	_, err = io.Copy(writer, reader)
	if err != nil {
		newFile.Close()
		return err
	}

	err = writer.Flush()
	if err != nil {
		newFile.Close()
		return err
	}

	err = newFile.Close()

	if err != nil {
		return err
	}
	return nil
}
