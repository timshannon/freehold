package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/russross/blackfriday"
)

const (
	fileDir      = "./file/"
	markdownType = ".markdown"
	markdownCss  = "/" + version + "/file/core/css/markdown.css"
)

type File struct {
	Name        string     `json:"name,omitempty"`
	Url         string     `json:"url,omitempty"`
	Permissions Permission `json:"permissions,omitempty"`
	Size        int64      `json:"size,omitempty"`
}

// filePath retrieves the path to the file on the server that
// the request URL refers to
func filePath(r *http.Request) string {
	_, pattern, root := rootHandler.Handler(r)
	return path.Join(fileDir, root, strings.TrimLeft(r.URL.Path, pattern))
}

func fileGet(w http.ResponseWriter, r *http.Request) {
	user, err := authUser(r)
	if errHandled(err, w) {
		return
	}

	file, err := os.Open(filePath(r))
	defer file.Close()
	if errHandled(err, w) {
		return
	}

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	serveDir(w, r, file, user)
}

func filePost(w http.ResponseWriter, r *http.Request) {
}

func filePut(w http.ResponseWriter, r *http.Request) {
}

func fileDelete(w http.ResponseWriter, r *http.Request) {
}

func serveDir(w http.ResponseWriter, r *http.Request, file *os.File, user *User) {
	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		prm, err := permissions(r.URL.Path)
		if errHandled(err, w) {
			return
		}
		if !prm.canRead(user) {
			fmt.Println("Can't read: ", r.URL.Path)
			four04(w, r)
			return
		}
		serveFile(w, r, file, info)
	}

	//Serve dir
	dir := file.Name()

	if errHandled(err, w) {
		return
	}
	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	fileList := make([]File, len(files))

	for i := range files {
		if strings.TrimRight(files[i].Name(), path.Ext(files[i].Name())) == "index" {
			indexFile, err := os.Open(path.Join(dir, files[i].Name()))
			defer indexFile.Close()
			//TODO: Permissions

			if errHandled(err, w) {
				return
			}
			serveFile(w, r, indexFile, files[i])
			return
		}

		var size int64
		if !files[i].IsDir() {
			size = files[i].Size()
		}

		fileList[i] = File{
			Name: files[i].Name(),
			Url:  path.Join(r.URL.Path, files[i].Name()),
			Size: size,
			//Permissions: , //TODO
		}
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   fileList,
	})
}

func serveFile(w http.ResponseWriter, r *http.Request, file *os.File, info os.FileInfo) {

	if path.Ext(file.Name()) == markdownType {
		buf, err := writeMarkdown(file)
		if errHandled(err, w) {
			return
		}
		w.Write(buf)
		return
	}

	http.ServeContent(w, r, file.Name(), info.ModTime(), file)
	return

}

func docsGet(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open(path.Join("./", r.URL.Path))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	//TODO: Permissions on core files
	serveDir(w, r, file, nil)
}

func writeMarkdown(file *os.File) ([]byte, error) {
	//TODO: Cache result and check modtime? Might be overkill.
	buf, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	//blackfriday.MarkdownCommon with custom CSS
	// set up the HTML renderer
	htmlFlags := 0
	htmlFlags |= blackfriday.HTML_USE_XHTML
	htmlFlags |= blackfriday.HTML_USE_SMARTYPANTS
	htmlFlags |= blackfriday.HTML_SMARTYPANTS_FRACTIONS
	htmlFlags |= blackfriday.HTML_SMARTYPANTS_LATEX_DASHES
	htmlFlags |= blackfriday.HTML_COMPLETE_PAGE
	renderer := blackfriday.HtmlRenderer(htmlFlags,
		strings.TrimRight(file.Name(), markdownType), markdownCss)

	// set up the parser
	extensions := 0
	extensions |= blackfriday.EXTENSION_NO_INTRA_EMPHASIS
	extensions |= blackfriday.EXTENSION_TABLES
	extensions |= blackfriday.EXTENSION_FENCED_CODE
	extensions |= blackfriday.EXTENSION_AUTOLINK
	extensions |= blackfriday.EXTENSION_STRIKETHROUGH
	extensions |= blackfriday.EXTENSION_SPACE_HEADERS
	extensions |= blackfriday.EXTENSION_HEADER_IDS

	return blackfriday.Markdown(buf, renderer, extensions), nil
}
