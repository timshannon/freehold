package main

import (
	"crypto/md5"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"bitbucket.org/tshannon/freehold/app"
)

var versions = map[string]struct{}{"v1": struct{}{}}

func init() {
	app.IsVersionFunc = isVersion
}

const (
	version      = "v1"
	docsDir      = "./docs/"
	fileDir      = "./file/"
	datastoreDir = "./datastore/"
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

func halt(msg string) {
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(2)
}

func md5Sum(file *os.File) string {
	buff, err := ioutil.ReadAll(file)
	if err != nil {
		halt("Error calculating MD5 sum on file " + file.Name() + " Error: " + err.Error())
	}
	return fmt.Sprintf("%x", md5.Sum(buff))
}
