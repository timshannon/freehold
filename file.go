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
	markdownType = ".markdown"
	markdownCss  = "/" + version + "/file/core/css/markdown.css"
)

type File struct {
	Name        string      `json:"name,omitempty"`
	Url         string      `json:"url,omitempty"`
	Permissions *Permission `json:"permissions,omitempty"`
	Size        int64       `json:"size,omitempty"`
}

// filePath retrieves the path to the file on the server that
// the request URL refers to
func filePath(r *http.Request) string {
	return urlPathToFile(r.URL.Path)
}

func fileGet(w http.ResponseWriter, r *http.Request) {
	user, err := authUser(r)
	if errHandled(err, w) {
		return
	}

	file, err := os.Open(filePath(r))
	defer file.Close()
	if os.IsNotExist(err) {
		four04(w, r)
		return
	}
	if errHandled(err, w) {
		return
	}

	serveDir(w, r, file, user)
}

func filePost(w http.ResponseWriter, r *http.Request) {
	//TODO: handle having a user creating a new file that already exists
	// but they don't have permissions to know that the file already exists
	// show them an error without exposing the fact that a file already exists
	// Maybe it's ok for Friends to know that a file exists even though they can't
	// read it?
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
			four04(w, r)
			return
		}

		serveFile(w, r, file, info)
		return
	}

	dir := file.Name()

	if errHandled(err, w) {
		return
	}
	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	fileList := make([]File, 0, len(files))

	for i := range files {
		if strings.TrimRight(files[i].Name(), path.Ext(files[i].Name())) == "index" {
			prm, err := permissions(path.Join(r.URL.Path, files[i].Name()))
			if errHandled(err, w) {
				return
			}
			if prm.canRead(user) {
				indexFile, err := os.Open(path.Join(dir, files[i].Name()))
				defer indexFile.Close()

				if errHandled(err, w) {
					return
				}
				serveFile(w, r, indexFile, files[i])
				return
			} else {
				//We already know the index file shouldnt' be added
				// to the file list, so skip to the next one
				continue
			}
		}

		var size int64
		var prm *Permission
		if files[i].IsDir() {
			if user == nil {
				//Public can't view the existence of directories
				continue
			}
		} else {
			size = files[i].Size()
			prm, err := permissions(path.Join(r.URL.Path, files[i].Name()))
			if errHandled(err, w) {
				return
			}
			if !prm.canRead(user) {
				continue
			}
		}

		fileList = append(fileList, File{
			Name:        files[i].Name(),
			Url:         path.Join(r.URL.Path, files[i].Name()),
			Size:        size,
			Permissions: prm,
		})
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
	file, err := os.Open(filePath(r))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

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
