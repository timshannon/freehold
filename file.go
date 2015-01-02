// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"errors"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"

	"github.com/russross/blackfriday"
)

var markdownTypes = []string{".markdown", ".md"}

func fileGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	serveResource(w, r, resource.NewFile(r.URL.Path), auth)
}

func filePost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFile(r.URL.Path)

	if r.ContentLength != 0 {
		//file upload
		if !res.IsDir() {
			errHandled(fail.New("Invalid location for upload!", res.Url()), w, auth)
			return
		}

		if errHandled(auth.tryWrite(res), w, auth) {
			return
		}

		err = r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))
		if errHandled(err, w, auth) {
			return
		}
		mp := r.MultipartForm
		uploadFile(w, res, auth.User, mp)
		return
	}

	//New Folder

	if errHandled(auth.tryWrite(res.Parent()), w, auth) {
		return
	}

	err = os.Mkdir(res.Filepath(), 0777)
	if os.IsExist(err) {
		err = fail.New("Folder already exists!", res.Url())
	} else if os.IsNotExist(err) {
		err = fail.New("Invalid Folder path specified!", res.Url())
	}
	if errHandled(err, w, auth) {
		return
	}

	err = permission.Set(res, permission.FileNewDefault(auth.Username))
	if errHandled(err, w, auth) {
		return
	}

	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   res.Url(),
	})

}

func uploadFile(w http.ResponseWriter, parent *resource.File, owner *user.User, mp *multipart.Form) {
	var fileList []Properties
	var failures []error
	status := statusSuccess

	for _, files := range mp.File {
		for i := range files {

			if path.Base(files[i].Filename) != files[i].Filename {
				failures = append(failures, fail.New("File name must not contain a path.", files[i].Filename))
				status = statusFail

				continue
			}

			res := resource.NewFile(path.Join(parent.Url(), files[i].Filename))
			if res.IsHidden() {
				continue
			}

			//write file
			file, err := files[i].Open()

			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", res.Url()))
				status = statusFail

				continue
			}

			err = writeFile(file, res.Filepath(), false)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, res.Url()))
				status = statusFail

				continue
			}
			err = permission.Set(res, permission.FileNewDefault(owner.Username()))
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, res.Url()))
				status = statusFail

				continue
			}

			fileList = append(fileList, Properties{
				Name: res.Name(),
				Url:  res.Url(),
			})
		}
	}

	if status == statusSuccess {
		w.WriteHeader(http.StatusCreated)
	}
	respondJsend(w, &JSend{
		Status:   status,
		Data:     fileList,
		Failures: failures,
	})
}

type FileInput struct {
	Move string `json:"move,omitempty"`
}

func filePut(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	if !strings.HasPrefix(r.Header.Get("Content-Type"), "multipart/form-data") {
		//Move
		input := &FileInput{}
		err = parseJson(r, input)
		if errHandled(err, w, auth) {
			return
		}
		if input.Move == "" {
			errHandled(fail.New("Invalid file PUT call", r.URL.Path), w, auth)
			return
		}

		sourceFile := resource.NewFile(r.URL.Path)
		destFile := resource.NewFile(input.Move)

		if sourceFile.IsDatastore() {
			errHandled(fail.New("Invalid file type", sourceFile.Name()), w, auth)
			return
		}

		if destFile.IsDatastore() {
			errHandled(fail.New("Invalid file type", destFile.Name()), w, auth)
			return
		}

		//Source parent permissions
		if errHandled(auth.tryWrite(sourceFile.Parent()), w, auth) {
			return
		}

		//Dest Parent Permissions
		if errHandled(auth.tryWrite(destFile.Parent()), w, auth) {
			return
		}

		if !sourceFile.Exists() {
			four04(w, r)
			return
		}

		if destFile.Exists() {
			errHandled(fail.New("Destination file already exists", input), w, auth)
			return
		}

		err = sourceFile.Move(destFile)
		if os.IsExist(err) {
			err = fail.New("Folder already exists!", destFile.Url())
		} else if os.IsNotExist(err) {
			err = fail.New("Invalid Folder path specified!", sourceFile.Url())
		}
		if errHandled(err, w, auth) {
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: Properties{
				Name: destFile.Name(),
				Url:  destFile.Url(),
			},
		})
		return

	}

	parent := resource.NewFile(r.URL.Path)

	err = r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))
	if errHandled(err, w, auth) {
		return
	}

	mp := r.MultipartForm

	var fileList []Properties
	var failures []error
	status := statusSuccess

	for _, files := range mp.File {
		for i := range files {
			if path.Base(files[i].Filename) != files[i].Filename {
				failures = append(failures, fail.New("File name must not contain a path.", files[i].Filename))
				status = statusFail

				continue
			}

			res := resource.NewFile(path.Join(parent.Url(), files[i].Filename))

			err := auth.tryWrite(res)

			if err != nil {
				failures = append(failures, err)
				status = statusFail

				continue
			}

			//write file
			file, err := files[i].Open()

			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", res.Url()))
				status = statusFail

				continue
			}

			err = writeFile(file, res.Filepath(), true)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, res.Url()))
				status = statusFail

				continue
			}

			fileList = append(fileList, Properties{
				Name: res.Name(),
				Url:  res.Url(),
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
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFile(r.URL.Path)

	//parent folder permissions
	if errHandled(auth.tryWrite(res.Parent()), w, auth) {
		return
	}

	err = os.RemoveAll(res.Filepath())
	if errHandled(err, w, auth) {
		return
	}

	err = permission.Delete(res)
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: res.Name(),
			Url:  res.Url(),
		},
	})
}

func serveResource(w http.ResponseWriter, r *http.Request, res *resource.File, auth *Auth) {
	err := auth.tryRead(res)
	if fail.IsEqual(err, Err404) {
		four04Page(w, r)
		return
	}
	if errHandled(err, w, auth) {
		return
	}

	if !res.IsDir() {
		serveFile(w, r, res, auth)
		return
	}

	files, err := res.Children()
	if errHandled(err, w, auth) {
		return
	}

	for i := range files {
		child := files[i]
		if child.IsDir() || child.IsHidden() {
			continue
		}

		err = auth.tryRead(child)
		if fail.IsEqual(err, Err404) {
			continue
		}

		if errHandled(err, w, auth) {
			return
		}
		if strings.TrimRight(child.Name(), path.Ext(child.Name())) == "index" {
			serveFile(w, r, child, auth)
			return
		}
		continue
	}

	//No index file found, redirect to properties
	http.Redirect(w, r, strings.Replace(res.Url(), "/v1/file/", "/v1/properties/file/", 1), http.StatusFound)
	return
}

func serveFile(w http.ResponseWriter, r *http.Request, res *resource.File, auth *Auth) {
	file, err := os.Open(res.Filepath())
	if errHandled(err, w, auth) {
		return
	}

	var rs io.ReadSeeker

	if isMarkDown(file.Name()) {
		buf, err := writeMarkdown(file)
		if errHandled(err, w, auth) {
			return
		}

		rs = bytes.NewReader(buf)
		w.Header().Add("Content-Type", "text/html; charset=utf-8")
	} else {
		rs = file
	}

	var modTime time.Time
	if setting.Bool("ModifiedDateForHTTPCaching") {
		modTime = res.FileInfo().ModTime()
	} else {
		//ETag is an checksum has of the contents of the file.  If the file changes
		// clients should know to grab the new version because the sum won't match.
		// but the server will pay the cost of the check sum and the filecheck no matter what
		w.Header().Add("ETag", checksum(rs))
		modTime = time.Time{}
	}
	http.ServeContent(w, r, file.Name(), modTime, rs)
	return
}

func isMarkDown(filename string) bool {
	for i := range markdownTypes {
		if path.Ext(filename) == markdownTypes[i] {
			return true
		}
	}
	return false
}

func docsGet(w http.ResponseWriter, r *http.Request) {
	serveResource(w, r, resource.NewFile(r.URL.Path), &Auth{})
}

func writeMarkdown(file *os.File) ([]byte, error) {
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
		strings.TrimSuffix(file.Name(), path.Ext(file.Name())), setting.String("MarkdownCSSFile"))

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
func writeFile(reader io.Reader, filename string, overwrite bool) error {
	bytes, err := ioutil.ReadAll(reader)
	if err != nil {
		return err
	}

	var newFile *os.File

	if overwrite {
		newFile, err = os.Create(filename)
	} else {
		newFile, err = os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0666)
	}

	if os.IsExist(err) {
		//capturing is exists error so that too much info isn't exposed to end users
		return errors.New("File already exists")
	}
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
