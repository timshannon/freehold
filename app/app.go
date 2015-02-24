// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package app

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
	"bitbucket.org/tshannon/freehold/setting"
)

const (
	DS = "core/app.ds"
)

var (
	FailNoWebInstall = errors.New("Web based application installs are not allowed on this instance. " +
		"See the AllowWebAppInstall Setting for more information.")
	FailAppNotFound = errors.New("Invalid application file path. Application file not found.")
	FailAppInvalid  = errors.New("Application file is an invalid format and cannot be installed.")
	FailInvalidId   = errors.New("Invalid App id")
)

type App struct {
	Id          string `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Author      string `json:"author,omitempty"`
	Root        string `json:"root,omitempty"`
	Icon        string `json:"icon,omitempty"`
	Version     string `json:"version,omitempty"`
	File        string `json:"file,omitempty"`
}

func Get(id string) (*App, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	app := &App{}

	err = ds.Get(id, app)

	if err == data.ErrNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	app.Id = id

	return app, nil
}

func All() (map[string]*App, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(nil, nil)
	if err != nil {
		return nil, err
	}

	apps := make(map[string]*App)

	for iter.Next() {
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		app := &App{}
		err = json.Unmarshal(iter.Value(), app)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(iter.Key(), &app.Id)
		if err != nil {
			return nil, err
		}

		apps[app.Id] = app
	}

	return apps, nil
}

func Install(file, owner string) (*App, error) {
	app, err := appInfoFromZip(file)
	if err != nil {
		return nil, err
	}
	if resource.IsRestrictedPath(app.Id) {
		return nil, fail.New("Application ID is invalid.  The application cannot be installed.", app)
	}

	a, err := Get(app.Id)

	if err != nil && err != data.ErrNotFound {
		return nil, err
	}

	if a != nil {
		return nil, fail.New("An app with the same id is already installed", app)
	}

	installDir := path.Join(resource.AppDir, app.Id)
	r, err := appFileReader(path.Join(resource.AvailableAppDir, file))
	if err != nil {
		return nil, err
	}
	defer r.Close()

	err = os.Mkdir(installDir, 0777)
	if err != nil {
		return nil, err
	}
	for _, f := range r.File {
		res := &AppResource{path.Join(installDir, f.Name)}

		if f.FileInfo().IsDir() {
			err := os.Mkdir(res.Filepath, 0777)
			if err != nil {
				return nil, err
			}
			err = permission.Set(res, permission.AppNewDefault(owner))
			if err != nil {
				return nil, err
			}
			continue
		}
		fr, err := f.Open()
		if err != nil {
			log.Error(err)
			return nil, fail.NewFromErr(FailAppInvalid, filepath.Base(file))
		}

		defer fr.Close()
		err = resource.WriteFile(fr, res.Filepath, false)
		if err != nil {
			return nil, err
		}
		//set permissions
		err = permission.Set(res, permission.AppNewDefault(owner))
		if err != nil {
			return nil, err
		}
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	err = ds.Put(app.Id, app)
	if err != nil {
		return nil, err
	}
	return app, nil
}

func Upgrade(file, owner string) (*App, error) {
	app, err := appInfoFromZip(file)
	if err != nil {
		return nil, err
	}

	err = Uninstall(app.Id)
	if err != nil {
		return nil, err
	}
	app, err = Install(file, owner)
	if err != nil {
		return nil, err
	}
	return app, nil

}

func Uninstall(appid string) error {
	app, err := Get(appid)
	if err == data.ErrNotFound || app == nil {
		return fail.NewFromErr(FailInvalidId, appid)
	}
	if err != nil {
		return err
	}

	//remove from DS
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = os.RemoveAll(path.Join(resource.AppDir, appid))
	if err != nil {
		return err
	}

	return ds.Delete(app.Id)
}

func Available() (map[string]*App, []error, error) {
	return getAppsFromDir(resource.AvailableAppDir)
}

func getAppsFromDir(dir string) (apps map[string]*App, failures []error, err error) {
	apps = make(map[string]*App)
	file, err := os.Open(dir)
	defer file.Close()
	if err != nil {
		return nil, nil, err
	}
	info, err := file.Stat()
	if err != nil {
		return nil, nil, err
	}
	if !info.IsDir() {
		return nil, nil, errors.New("Passed dir is not a directory.")
	}

	files, err := file.Readdir(0)
	if err != nil {
		return nil, nil, err
	}

	for _, f := range files {
		if f.IsDir() {
			//only look in base dir, can change if need be
			continue
		}
		app, err := appInfoFromZip(f.Name())
		if err != nil {
			if fail.IsFail(err) {
				failures = append(failures, err)
				continue
			}
			return apps, failures, err
		}
		//return app even if it's already installed
		// leave it up to the client to differentiate
		// between files for upgrade vs new apps (i.e compare version)
		apps[app.Id] = app
	}

	return apps, failures, nil
}

func appInfoFromZip(file string) (*App, error) {
	zippath := path.Join(resource.AvailableAppDir, file)
	r, err := appFileReader(zippath)
	if err != nil {
		return nil, fail.NewFromErr(err, file)
	}

	defer r.Close()
	for _, f := range r.File {
		if f.Name == "app.json" {
			app, err := appInfoFromJsonFile(f)
			app.File = file
			if err != nil {
				if fail.IsFail(err) {
					return nil, fail.NewFromErr(err, filepath.Base(zippath))
				}
				return nil, err
			}
			return app, nil
		}
	}
	return nil, fail.NewFromErr(FailAppInvalid, filepath.Base(zippath))
}

func appInfoFromJsonFile(f *zip.File) (*App, error) {
	//TODO: Support other application file formats, if they
	// support the minimum requirements of freehold

	app := &App{}
	rc, err := f.Open()
	defer rc.Close()

	if err != nil {
		return nil, err
	}
	buff, err := ioutil.ReadAll(rc)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(buff, app)
	switch err := err.(type) {
	case *json.SyntaxError:
		return nil, fail.New("app.json file contains invalid JSON: "+err.Error(), nil)
	case *json.UnmarshalTypeError:
		return nil, fail.New("app.json file contains a JSON structure that "+
			"doesn't match the expected structure.", nil)
	}
	if err != nil {
		return nil, err
	}

	if app.Id == "" {
		return nil, fail.NewFromErr(FailInvalidId, nil)
	}

	return app, nil
}

func appFileReader(zippath string) (*zip.ReadCloser, error) {
	if zippath == "" {
		return nil, fail.New("Invalid application path.", zippath)
	}

	r, err := zip.OpenReader(zippath)
	if os.IsNotExist(err) {
		return nil, fail.NewFromErr(FailAppNotFound, zippath)
	}

	if err != nil {
		log.Error(err)
		return nil, fail.NewFromErr(FailAppInvalid, filepath.Base(zippath))
	}
	return r, nil
}

func PostAvailable(uri string) (string, error) {
	if !setting.Bool("AllowWebAppInstall") {
		return "", fail.NewFromErr(FailNoWebInstall, uri)
	}
	u, err := url.Parse(uri)
	if err != nil {
		return "", fail.NewFromErr(err, uri)
	}

	client := &http.Client{
		Timeout: time.Duration(setting.Int("HttpClientTimeout")) * time.Second,
	}
	r, err := client.Get(uri)

	if err != nil {
		return "", err
	}

	if r.StatusCode != http.StatusOK {
		return "", fail.New("Unable to retrieve app file from url: "+r.Status, uri)
	}

	var filename string

	cd := r.Header.Get("Content-disposition")
	if cd != "" {
		filename = strings.Trim(strings.Trim(strings.TrimPrefix(cd, "attachment; filename="), "'"), `"`)
	} else {
		filename = path.Base(u.Path)
	}

	if filepath.Ext(filename) != ".zip" {
		filename += ".zip"
	}

	err = resource.WriteFile(r.Body, path.Join(resource.AvailableAppDir, filename), false)
	if err != nil {
		os.Remove(path.Join(resource.AvailableAppDir, filename))
		return "", err
	}

	_, err = appInfoFromZip(filename)
	if err != nil {
		os.Remove(path.Join(resource.AvailableAppDir, filename))
		return "", err
	}

	return filename, nil
}

type AppResource struct {
	Filepath string
}

func (a *AppResource) ID() string {
	return a.Filepath
}

func (a *AppResource) Permission() (*permission.Permission, error) {
	return nil, errors.New("This should not be used for retrieving file permissions.")
}
