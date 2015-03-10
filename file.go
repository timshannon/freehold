// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"

	"github.com/rhinoman/go-commonmark"
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

		err = r.ParseMultipartForm(setting.Int64("MaxFileMemory"))
		if errHandled(err, w, auth) {
			return
		}
		mp := r.MultipartForm

		fileList, failures := uploadFile(w, res, auth.User, mp)
		status := statusSuccess

		if len(failures) == 0 {
			w.WriteHeader(http.StatusCreated)
		} else {
			status = statusFail
		}

		respondJsend(w, &JSend{
			Status:   status,
			Data:     fileList,
			Failures: failures,
		})

		return
	}

	//New Folder
	if errHandled(createFolder(res, auth), w, auth) {
		return
	}

	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   res.Url(),
	})

}

func createFolder(res *resource.File, auth *Auth) error {
	err := auth.tryWrite(res.Parent())
	if err != nil {
		return err
	}

	err = os.Mkdir(res.Filepath(), 0777)
	if os.IsExist(err) {
		err = fail.New("Folder already exists!", res.Url())
	} else if os.IsNotExist(err) {
		err = fail.New("Invalid Folder path specified!", res.Url())
	}
	if err != nil {
		return err
	}

	err = permission.Set(res, permission.FileNewDefault(auth.Username))
	if err != nil {
		return err
	}
	return nil
}

func uploadFile(w http.ResponseWriter, parent *resource.File, owner *user.User, mp *multipart.Form) ([]Properties, []error) {
	var fileList []Properties
	var failures []error

	for _, files := range mp.File {
		for i := range files {

			if path.Base(files[i].Filename) != files[i].Filename {
				failures = append(failures, fail.New("File name must not contain a path.", files[i].Filename))

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

				continue
			}

			err = resource.WriteFile(file, res.Filepath(), false)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, res.Url()))

				continue
			}
			err = permission.Set(res, permission.FileNewDefault(owner.Username()))
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, res.Url()))

				continue
			}

			fileList = append(fileList, Properties{
				Name: res.Name(),
				Url:  res.Url(),
			})
		}
	}

	return fileList, failures

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
			errHandled(fail.New("Invalid file type or path", sourceFile.Name()), w, auth)
			return
		}

		if destFile.IsDatastore() {
			errHandled(fail.New("Invalid file type or path", destFile.Name()), w, auth)
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

	err = r.ParseMultipartForm(setting.Int64("MaxFileMemory"))
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

			err = resource.WriteFile(file, res.Filepath(), true)
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
		four04(w, r)
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
		if isIndex(child.Name()) {
			serveFile(w, r, child, auth)
			return
		}
		continue
	}

	//No index file found, redirect to properties
	http.Redirect(w, r, strings.Replace(res.Url(), "/v1/file/", "/v1/properties/file/", 1), http.StatusFound)
	return
}

func isIndex(filename string) bool {
	return strings.ToLower(strings.TrimRight(filepath.Base(filename), filepath.Ext(filename))) == "index"
}

func serveFile(w http.ResponseWriter, r *http.Request, res *resource.File, auth *Auth) {
	file, err := os.Open(res.Filepath())
	if errHandled(err, w, auth) {
		return
	}

	var rs io.ReadSeeker

	if isMarkDown(file.Name()) {
		buf, err := writeMarkdown(file, res)
		if errHandled(err, w, auth) {
			return
		}

		rs = bytes.NewReader(buf)
		w.Header().Add("Content-Type", "text/html; charset=utf-8")
	} else {
		rs = file
	}

	var modTime time.Time
	if setting.Bool("ModifiedDateForHTTPCaching") || res.FileInfo().Size() > setting.Int64("MaxFileMemory") {
		modTime = res.FileInfo().ModTime()
	} else {
		//ETag is an checksum has of the contents of the file.  If the file changes
		// clients should know to grab the new version because the sum won't match.
		// but the server will pay the cost of the check sum and the filecheck no matter what
		// ETag's won't be generated if the size of the file is greater than the max file memory to use
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

func writeMarkdown(file *os.File, res *resource.File) ([]byte, error) {
	buf, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	title := strings.TrimSuffix(filepath.Base(file.Name()), filepath.Ext(file.Name()))
	if isIndex(title) {
		title = filepath.Base(res.Parent().Name())
	}

	htmlHeader := "<html><head><title>" + title + "</title><link href='" + setting.String("MarkdownCSSFile") +
		"' rel='stylesheet' media='screen'></head><body>"
	htmlFooter := "</body></html>"

	return []byte(commonmark.Md2Html(htmlHeader + string(buf) + htmlFooter)), nil
}
