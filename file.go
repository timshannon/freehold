package main

import (
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/russross/blackfriday"
)

const (
	fileDir      = "./file/"
	typeMarkdown = ".markdown"
)

type FHFile struct {
	Name        string     `json: "name,omitempty"`
	Url         string     `json: "url,omitempty"`
	Permissions Permission `json: "permissions,omitempty`
}

// filePath retrieves the path to the file on the server that
// the request URL refers to
func filePath(r *http.Request) string {
	_, pattern, root := rootHandler.Handler(r)
	return path.Join(fileDir, root, strings.TrimLeft(r.URL.Path, pattern))
}

func fileGet(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open(filePath(r))
	defer file.Close()

	//TODO: Permissions
	//If no permissions return not authorized

	if os.IsNotExist(err) {
		//TODO: Setting for 404 path
		http.NotFound(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	serveDir(w, r, file)
}

func filePost(w http.ResponseWriter, r *http.Request) {
}

func filePut(w http.ResponseWriter, r *http.Request) {
}

func fileDelete(w http.ResponseWriter, r *http.Request) {
}

func serveDir(w http.ResponseWriter, r *http.Request, file *os.File) {
	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		serveFile(w, r, file, info)
	}

	//Serve dir
}

func serveFile(w http.ResponseWriter, r *http.Request, file *os.File, info os.FileInfo) {
	if path.Ext(file.Name()) == typeMarkdown {
		//TODO: Cache result and check modtime?
		buf, err := ioutil.ReadAll(file)
		if errHandled(err, w) {
			return
		}

		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Content-Type", "text/html")
		w.Write(blackfriday.MarkdownCommon(buf))
		return
	}

	http.ServeContent(w, r, file.Name(), info.ModTime(), file)
	return

}

func docsGet(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("./docs/")
	defer file.Close()

	if os.IsNotExist(err) {
		//TODO: Setting for 404 path
		http.NotFound(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}
	serveDir(w, r, file)
}
