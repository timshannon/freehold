package main

import (
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"strings"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"

	"github.com/russross/blackfriday"
)

const (
	markdownType = ".markdown"
)

func fileGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	serveResource(w, r, r.URL.Path, auth)
}

func filePost(w http.ResponseWriter, r *http.Request) {
	//TODO: handle having a user creating a new file that already exists
	// but they don't have permissions to know that the file already exists
	// show them an error without exposing the fact that a file already exists
	// Maybe it's ok for Friends to know that a file exists even though they can't
	// read it?

	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.FileNew()
	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to a post a file.", nil), w)
		return
	}

	r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))

	mp := r.MultipartForm

	var fileList []Properties
	var failures []*fail.Fail
	status := statusSuccess

	for _, files := range mp.File {
		for i := range files {
			resource := path.Join(r.URL.Path, files[i].Filename)
			filename := urlPathToFile(resource)

			//write file
			file, err := files[i].Open()

			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", resource))
				status = statusFail

				continue
			}

			err = writeFile(file, filename)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, resource))
				status = statusFail

				continue
			}

			fileList = append(fileList, Properties{
				Name: filename,
				Url:  resource,
			})
		}
	}

	respondJsend(w, &JSend{
		Status:   status,
		Data:     fileList,
		Failures: failures,
	})

}

func fileDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	resource := r.URL.Path

	file, err := os.Open(urlPathToFile(resource))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		prm, err := permission.Get(resource)
		if errHandled(err, w) {
			return
		}

		prm = permission.FileDelete(prm)

		if !prm.CanWrite(auth.User) {
			if !prm.canRead(auth.User) {
				four04(w, r)
				return
			}

			errHandled(fail.New("You do not have owner permissions on this resource.", resource), w)
			return
		}
		os.Remove(urlPathToFile(resource))
		return
	}

	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	fileList := make([]Properties, 0, len(files))
	var failures []*fail.Fail
	status := statusSuccess
	dir := file.Name()

	for i := range files {
		if !files[i].IsDir() {
			child := path.Join(resource, files[i].Name())

			prm, err := permission.Get(child)
			if errHandled(err, w) {
				return
			}
			prm = permission.FileDelete(prm)

			if prm.CanWrite(auth.User) {
				os.Remove(path.Join(dir, files[i].Name()))

				fileList = append(fileList, Properties{
					Name: files[i].Name(),
					Url:  child,
				})
			} else {
				if !prm.canRead(auth.User) {
					continue
				}

				status = statusFail
				failures = append(failures, fail.New("You do not have owner permissions on this resource.",
					&Properties{
						Name: files[i].Name(),
						Url:  child,
					}))

			}
		}
	}

	respondJsend(w, &JSend{
		Status:   status,
		Data:     fileList,
		Failures: failures,
	})

	//Check if folder is now empty and clean it up
	files, err = file.Readdir(0)
	if err != nil {
		log.Error(err)
		return
	}
	if len(files) == 0 {
		os.Remove(file.Name())
	}
}

func serveResource(w http.ResponseWriter, r *http.Request, resource string, auth *Auth) {
	file, err := os.Open(urlPathToFile(resource))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		if isDocPath(resource) {
			prm := permission.Doc()
		} else {
			prm, err := permission.Get(resource)
			if errHandled(err, w) {
				return
			}
		}

		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}

		serveFile(w, r, file, info)
		return
	}

	dir := file.Name()

	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	canReadDir := false

	for i := range files {
		if files[i].IsDir() {
			continue
		}
		if isDocPath(resource) {
			prm := permission.Doc()
		} else {
			prm, err := permission.Get(path.Join(resource, files[i].Name()))
			if errHandled(err, w) {
				return
			}
		}

		if prm.CanRead(auth.User) {
			//If a user can read one file in a dir, then they can know of the existence
			// of the dir
			canReadDir = true
			if strings.TrimRight(files[i].Name(), path.Ext(files[i].Name())) == "index" {
				indexFile, err := os.Open(path.Join(dir, files[i].Name()))
				defer indexFile.Close()

				if errHandled(err, w) {
					return
				}
				serveFile(w, r, indexFile, files[i])
				return

			}
			continue
		} else {
			four04(w, r)
			return
		}
	}

	if canReadDir {
		//No index file found, redirect to properties
		http.Redirect(w, r, strings.Replace(r.URL.Path, "/v1/file/", "/v1/properties/file/", 1), http.StatusFound)
		return
	}

	// Is a dir lookup, but user doesn't have access to any files in the dir.  Give them a 404
	// instead of a redirect
	four04(w, r)
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
	serveResource(w, r, r.URL.Path, &Auth{})
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
		strings.TrimRight(file.Name(), markdownType), settingString("MarkdownCSSFile"))

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

//writeFile writes the contents of the reader, and closes it
func writeFile(reader io.Reader, filename string) error {
	bytes, err := ioutil.ReadAll(reader)
	if err != nil {
		return err
	}
	newFile, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0600)
	if err != nil {
		return err
	}

	n, err := newFile.Write(bytes)
	if err == nil && n < len(bytes) {
		err = io.ErrShortWrite
	}
	if err1 := newFile.Close(); err == nil {
		err = err1
	}
	if err != nil {
		return err
	}
	return nil
}
