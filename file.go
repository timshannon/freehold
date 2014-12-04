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
	"path/filepath"
	"strings"
	"time"

	"bytes"

	"bitbucket.org/tshannon/freehold/app"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
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

	serveResource(w, r, r.URL.Path, auth)
}

func filePost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}
	if !validFileUrl(r.URL.Path) {
		errHandled(fail.New("Invalid path for file upload.", r.URL.Path), w, auth)
		return
	}

	foldername := urlPathToFile(r.URL.Path)

	if r.ContentLength != 0 {
		//file upload
		prm, err := permission.Get(urlPathToFile(foldername))
		if errHandled(err, w, auth) {
			return
		}
		if !auth.canWrite(prm) {
			if !auth.canRead(prm) {
				four04(w, r)
				return
			}
			errHandled(fail.New("You do not have permissions to write here.", nil), w, auth)
			return
		}

		err = r.ParseMultipartForm(setting.Int64("MaxUploadMemory"))
		if errHandled(err, w, auth) {
			return
		}
		mp := r.MultipartForm
		uploadFile(w, r.URL.Path, auth.User, mp)
		return

	}

	prm, err := permission.FileParent(foldername)
	if errHandled(err, w, auth) {
		return
	}
	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to write here.", nil), w, auth)
		return
	}

	//New Folder
	err = os.Mkdir(foldername, 0777)
	if os.IsExist(err) {
		err = fail.New("Folder already exists!", r.URL.Path)
	}
	if os.IsNotExist(err) {
		err = fail.New("Invalid Folder path specified!", r.URL.Path)
	}
	if errHandled(err, w, auth) {
		return
	}

	err = permission.Set(foldername, permission.FileNewDefault(auth.Username))
	if errHandled(err, w, auth) {
		return
	}

	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   r.URL.Path,
	})

}

func uploadFile(w http.ResponseWriter, resourcePath string, owner *user.User, mp *multipart.Form) {
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
			if isHidden(files[i].Filename) {
				continue

			}
			resource := path.Join(resourcePath, files[i].Filename)
			filename := urlPathToFile(resource)

			//write file
			file, err := files[i].Open()

			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", resource))
				status = statusFail

				continue
			}

			err = writeFile(file, filename, false)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, resource))
				status = statusFail

				continue
			}
			err = permission.Set(filename, permission.FileNewDefault(owner.Username()))
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, resource))
				status = statusFail

				continue
			}

			fileList = append(fileList, Properties{
				Name: filepath.Base(filename),
				Url:  resource,
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
	if !validFileUrl(r.URL.Path) {
		errHandled(fail.New("Invalid path for file update.", r.URL.Path), w, auth)
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

		sourceFile := urlPathToFile(r.URL.Path)
		destFile := urlPathToFile(input.Move)

		//Source parent permissions
		prm, err := permission.FileParent(sourceFile)
		if errHandled(err, w, auth) {
			return
		}

		if !auth.canWrite(prm) {
			if !auth.canRead(prm) {
				four04(w, r)
				return
			}
			errHandled(fail.New("You do not have permissions to update this file.", r.URL.Path), w, auth)
			return
		}

		// Source File Permissions
		prm, err = permission.Get(sourceFile)
		if errHandled(err, w, auth) {
			return
		}
		if !auth.canWrite(permission.FileUpdate(prm)) {
			if !auth.canRead(prm) {
				four04(w, r)
				return
			}
			errHandled(fail.New("You do not have permissions to update this file.", r.URL.Path), w, auth)
			return
		}

		//Dest Parent Permissions
		prm, err = permission.FileParent(destFile)
		if !auth.canWrite(prm) {
			if !auth.canRead(prm) {
				four04(w, r)
				return
			}
			errHandled(fail.New("You do not have permissions to move this file to the destination.", input.Move), w, auth)
			return
		}

		if !fileExists(sourceFile) {
			four04(w, r)
			return

		}
		if !validFileUrl(input.Move) {
			errHandled(fail.New("Invalid destination for file move.", r.URL.Path), w, auth)
			return

		}

		if fileExists(destFile) {
			errHandled(fail.New("Destination file already exists", input), w, auth)
			return
		}

		err = moveFile(sourceFile, destFile)
		if os.IsExist(err) {
			err = fail.New("Folder already exists!", r.URL.Path)
		}
		if os.IsNotExist(err) {
			err = fail.New("Invalid Folder path specified!", r.URL.Path)
		}
		if errHandled(err, w, auth) {
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: Properties{
				Name: filepath.Base(destFile),
				Url:  input.Move,
			},
		})
		return

	}

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
			if isHidden(files[i].Filename) {
				continue

			}
			resource := path.Join(r.URL.Path, files[i].Filename)
			filename := urlPathToFile(resource)

			prm, err := permission.Get(filename)
			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", resource))
				status = statusFail

				continue
			}

			prm = permission.FileUpdate(prm)
			if !auth.canWrite(prm) {
				err = fail.New("You do not have permissions to update this file.", resource)
				log.Error(err)
				failures = append(failures, err)
				status = statusFail

				continue
			}

			//write file
			file, err := files[i].Open()

			if err != nil {
				log.Error(err)
				failures = append(failures, fail.New("Error opening file for writing.", resource))
				status = statusFail

				continue
			}

			err = writeFile(file, filename, true)
			if err != nil {
				failures = append(failures, fail.NewFromErr(err, resource))
				status = statusFail

				continue
			}

			fileList = append(fileList, Properties{
				Name: filepath.Base(filename),
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
	if errHandled(err, w, auth) {
		return
	}

	resource := r.URL.Path
	filename := urlPathToFile(resource)

	file, err := os.Open(filename)
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w, auth) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w, auth) {
		return
	}

	if isHidden(info.Name()) {
		four04Page(w, r)
		return
	}

	//parent folder permissions
	prm, err := permission.FileParent(filename)
	if errHandled(err, w, auth) {
		return
	}

	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}

		errHandled(fail.New("You do not have permissions to delete this resource.", resource), w, auth)
		return
	}

	//File Permissions
	prm, err = permission.Get(filename)
	if errHandled(err, w, auth) {
		return
	}

	prm = permission.FileUpdate(prm)
	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}

		errHandled(fail.New("You do not have permissions to delete this resource.", resource), w, auth)
		return
	}

	//TODO: Should I recurse folder structure and now allow the delete to finish if
	// they don't have permissions on children?  Or does owning the folder give the rights
	// to remove everything in it regardless of children's owner?  I'm in favor of the latter
	// as it's simplier, however is it expected behavior?
	err = os.RemoveAll(filename)
	if errHandled(err, w, auth) {
		return
	}

	err = permission.Delete(filename)
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data: Properties{
			Name: filepath.Base(filename),
			Url:  resource,
		},
	})

}

func serveResource(w http.ResponseWriter, r *http.Request, resource string, auth *Auth) {
	filename := urlPathToFile(resource)
	file, err := os.Open(filename)
	defer file.Close()

	if os.IsNotExist(err) {
		four04Page(w, r)
		return
	}

	if errHandled(err, w, auth) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w, auth) {
		return
	}

	if isHidden(info.Name()) {
		four04Page(w, r)
		return
	}

	var prm *permission.Permission
	if isDocPath(resource) {
		prm = permission.Doc()
	} else {
		prm, err = permission.Get(filename)
		if errHandled(err, w, auth) {
			return
		}
	}

	if !auth.canRead(prm) {
		four04Page(w, r)
		return
	}

	if !info.IsDir() {
		serveFile(w, r, file, auth)
		return
	}

	files, err := file.Readdir(0)
	if errHandled(err, w, auth) {
		return
	}

	for i := range files {
		var prm *permission.Permission
		if files[i].IsDir() || isHidden(files[i].Name()) {
			continue
		}
		if isDocPath(resource) {
			prm = permission.Doc()
		} else {
			prm, err = permission.Get(path.Join(filename, files[i].Name()))
			if errHandled(err, w, auth) {
				return
			}
		}

		if auth.canRead(prm) {
			if strings.TrimRight(files[i].Name(), path.Ext(files[i].Name())) == "index" {
				indexFile, err := os.Open(path.Join(filename, files[i].Name()))
				defer indexFile.Close()

				if errHandled(err, w, auth) {
					return
				}
				serveFile(w, r, indexFile, auth)
				return
			}
			continue
		} else {
			continue
		}
	}

	//No index file found, redirect to properties
	http.Redirect(w, r, strings.Replace(r.URL.Path, "/v1/file/", "/v1/properties/file/", 1), http.StatusFound)
	return
}

func serveFile(w http.ResponseWriter, r *http.Request, file *os.File, auth *Auth) {
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

	//TODO: Setting for modified date instead of etag?

	//ETag is an MD5 sum of the contents of the file.  If the file changes
	// clients should know to grab the new version because the md5 won't match.
	w.Header().Add("ETag", md5Sum(rs))
	http.ServeContent(w, r, file.Name(), time.Time{}, rs)
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
	serveResource(w, r, r.URL.Path, &Auth{})
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

func validFileUrl(url string) bool {
	if isDocPath(url) {
		return false
	}

	root, pth := splitRootAndPath(url)
	if !isVersion(root) {
		a, err := app.Get(root)
		if err != nil || a == nil {
			return false
		}
		root, pth = splitRootAndPath(pth)
		if !isVersion(root) {
			return false
		}
	}
	root, pth = splitRootAndPath(pth)
	if root != "file" {
		return false
	}
	return true
}

func moveFile(from, to string) error {
	//move permissions
	err := permission.Move(from, to)
	if err != nil {
		return err
	}
	return os.Rename(from, to)
}
