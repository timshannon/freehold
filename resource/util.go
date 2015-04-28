// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package resource

import (
	"io"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"bufio"

	"bitbucket.org/tshannon/freehold/fail"
)

const (
	// DocsDir is the path to the Documentation directory
	DocsDir = "docs/"
	// FileDir is the path to where files will be stored
	FileDir = "file/"
	// CoreDSDir is where the core datastore files will be stored
	CoreDSDir = "core/"
	// DatastoreDir is where user datastore files will be stored
	DatastoreDir = "datastore/"
	// AvailableAppDir is where new available application zip files are stored
	AvailableAppDir = AppDir + "available/"
	// AppDir are were installed applications are installed to
	AppDir = "application/"
)

const modifiedHeader = "Fh-Modified"

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
			return filepath.Join(DocsDir, filepath.FromSlash(respath))
		}

		//Is app path and root is app-id
		return filepath.Join(AppDir, root, urlPathToFile(respath))
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
		return filepath.ToSlash(filepath.Join(FileDir, respath))
	case "datastore":
		return filepath.ToSlash(filepath.Join(DatastoreDir, respath))
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

// IsRestrictedPath is whether or not the passed in path is allowed to be created.  i.e Not a version and not a doc
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
func WriteFile(reader io.ReadCloser, filePath string, overwrite bool, modTime time.Time) error {
	var newFile *os.File
	var err error

	defer reader.Close()

	if overwrite {
		newFile, err = os.Create(filePath)
	} else {
		newFile, err = os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0666)
	}

	if os.IsExist(err) {
		//capturing is exists error so that too much info isn't exposed to end users
		return fail.New("File already exists", path.Base(filePath))
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
	if !modTime.IsZero() && !overwrite {
		err = os.Chtimes(filePath, time.Now(), modTime)
		if err != nil {
			return err
		}
	}
	return nil
}

// ModTimeFromRequest returns the time parsed from the fh-modified header
// If the header doesn't exist, it returns a Zero time
func ModTimeFromRequest(r *http.Request) time.Time {
	strTime := r.Header.Get(modifiedHeader)
	if strTime == "" {
		return time.Time{}
	}

	t, err := time.Parse(time.RFC3339, strTime)
	if err != nil {
		return time.Time{}
	}
	return t

}
