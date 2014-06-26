package paths

import (
	"path"
	"strings"
)

var Versions = map[string]struct{}{"v1": struct{}{}}

const (
	Version      = "v1"
	DocsDir      = "./docs/"
	FileDir      = "./files/"
	DatastoreDir = "./datastores/"
	AppDir       = "./apps/"
)

// splitRootAndPath splits the first item in a path from the rest
// /v1/file/test.txt:
// root = "v1"
// path = "/file/test.txt"
func SplitRootAndPath(pattern string) (root, path string) {
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
func IsDocPath(resource string) bool {
	root, _ := SplitRootAndPath(resource)
	return root == "docs"
}

// urlPathToFile takes a url path and returns the path to the file
// on the os filesystem
// url path format will usually be
// /<version>/<type of resource>/<path to resource>/
func UrlPathToFile(urlPath string) string {
	root, respath := SplitRootAndPath(urlPath)

	//strip off version and check if valid
	if !IsVersion(root) {
		//not a version prefix
		if strings.ToLower(root) == "docs" {
			return path.Join(DocsDir, respath)
		}

		//Is app path and root is app-id
		return path.Join(AppDir, root, V1FilePath(respath))
	}
	return V1FilePath(respath)
}

func V1FilePath(resourcePath string) string {
	root, respath := SplitRootAndPath(resourcePath)
	switch strings.ToLower(root) {
	case "file":
		return path.Join(FileDir, respath)
	case "datastore":
		return path.Join(DatastoreDir, respath)
	case "properties":
		return V1FilePath(respath)
	default:
		//invalid path
		return ""
	}
}

func IsVersion(version string) bool {
	//TODO: Check for all possible versions?
	// make sure apps can be registered on possible future version endpoints?
	_, ok := Versions[version]
	return ok
}
