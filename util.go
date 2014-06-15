package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"os"
	"path"
	"strings"
)

var versions = map[string]struct{}{"v1": struct{}{}}

const (
	version      = "v1"
	docsDir      = "./docs/"
	fileDir      = "./files/"
	datastoreDir = "./datastores/"
	appDir       = "./apps/"
)

// splitRootAndPath splits the first item in a path from the rest
// /v1/file/test.txt:
// root = "v1"
// path = "/file/test.txt"
func splitRootAndPath(pattern string) (root, path string) {
	if pattern == "" {
		panic("Invalid pattern")
	}
	split := strings.SplitN(pattern[1:], "/", 2)
	root = split[0]
	if len(split) < 2 {
		path = "/"
	} else {
		path = "/" + split[1]
	}
	return root, path
}

func halt(msg string) {
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(2)
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
	root, respath := splitRootAndPath(urlPath)
	if _, ok := versions[root]; !ok {
		if strings.ToLower(root) == "docs" {
			return path.Join(docsDir, respath)
		}
		//TODO: is app
	}
	//strip off version
	root, respath = splitRootAndPath(respath)
	switch strings.ToLower(root) {
	case "file":
		return path.Join(fileDir, respath)
	case "datastore":
		return path.Join(datastoreDir, respath)
	default:
		//shouldn't happen unless mux handlers are improperly defined
		panic("unhandled path")
	}
}

//Returns a random value of the bit length passed in
func random(bits int) string {
	result := make([]byte, bits/4)
	_, err := io.ReadFull(rand.Reader, result)
	if err != nil {
		panic(fmt.Sprintf("Error generating random values: %v", err))
	}

	return base64.StdEncoding.EncodeToString(result)

}
