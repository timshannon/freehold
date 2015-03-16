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
	//DS is the location of the application ds file
	DS = "core/app.ds"
)

var (
	// ErrNoWebInstall is when web based applicadtion installs are not allowed
	ErrNoWebInstall = errors.New("Web based application installs are not allowed on this instance. " +
		"See the AllowWebAppInstall Setting for more information.")
	//ErrAppNotFound is when the app.json file can't be found in the app zip file
	ErrAppNotFound = errors.New("Invalid application file path. Application file not found.")
	//ErrAppInvalid is when the application zip file can't be read or extracted
	ErrAppInvalid = errors.New("Application file is an invalid format and cannot be installed.")

	//ErrInvalidID is when the application ID is invalid
	ErrInvalidID = errors.New("Invalid App ID")
)

// App is the structure of an Application Install
type App struct {
	ID          string `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Author      string `json:"author,omitempty"`
	Root        string `json:"root,omitempty"`
	Icon        string `json:"icon,omitempty"`
	Version     string `json:"version,omitempty"`
	File        string `json:"file,omitempty"`
}

// Get retrieves an Application based on the passed in ID
func Get(ID string) (*App, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	app := &App{}

	err = ds.Get(ID, app)

	if err == data.ErrNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	app.ID = ID

	return app, nil
}

// All returns all installed applications
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

		err = json.Unmarshal(iter.Key(), &app.ID)
		if err != nil {
			return nil, err
		}

		apps[app.ID] = app
	}

	return apps, nil
}

// Install installs the application at the file path, and sets the passed in owner
// as the owner of the file
func Install(file, owner string) (*App, error) {
	app, err := appInfoFromZip(file)
	if err != nil {
		return nil, err
	}
	if resource.IsRestrictedPath(app.ID) {
		return nil, fail.New("Application ID is invalid.  The application cannot be installed.", app)
	}

	a, err := Get(app.ID)

	if err != nil && err != data.ErrNotFound {
		return nil, err
	}

	if a != nil {
		return nil, fail.New("An app with the same ID is already installed", app)
	}

	installDir := path.Join(resource.AppDir, app.ID)
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
		res := &Resource{path.Join(installDir, f.Name)}

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
			return nil, fail.NewFromErr(ErrAppInvalid, filepath.Base(file))
		}

		defer fr.Close()
		err = resource.WriteFile(fr, res.Filepath, false, f.ModTime())
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

	err = ds.Put(app.ID, app)
	if err != nil {
		return nil, err
	}
	return app, nil
}

// Upgrade upgrades the application identified by the passed in filepath with the contents
// of the passed in filepath, setting the owner to the files therein to the owner passed in
func Upgrade(file, owner string) (*App, error) {
	app, err := appInfoFromZip(file)
	if err != nil {
		return nil, err
	}

	err = Uninstall(app.ID)
	if err != nil {
		return nil, err
	}
	app, err = Install(file, owner)
	if err != nil {
		return nil, err
	}
	return app, nil

}

// Uninstall removes the application from the instance
func Uninstall(appID string) error {
	app, err := Get(appID)
	if err == data.ErrNotFound || app == nil {
		return fail.NewFromErr(ErrInvalidID, appID)
	}
	if err != nil {
		return err
	}

	//remove from DS
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = os.RemoveAll(path.Join(resource.AppDir, appID))
	if err != nil {
		return err
	}

	return ds.Delete(app.ID)
}

// Available returns all Available Applications, including those already
// installed
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
		apps[app.ID] = app
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
			app, err := appInfoFromJSONFile(f)
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
	return nil, fail.NewFromErr(ErrAppInvalid, filepath.Base(zippath))
}

func appInfoFromJSONFile(f *zip.File) (*App, error) {
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

	if app.ID == "" {
		return nil, fail.NewFromErr(ErrInvalidID, nil)
	}

	return app, nil
}

func appFileReader(zippath string) (*zip.ReadCloser, error) {
	if zippath == "" {
		return nil, fail.New("Invalid application path.", zippath)
	}

	r, err := zip.OpenReader(zippath)
	if os.IsNotExist(err) {
		return nil, fail.NewFromErr(ErrAppNotFound, zippath)
	}

	if err != nil {
		log.Error(err)
		return nil, fail.NewFromErr(ErrAppInvalid, filepath.Base(zippath))
	}
	return r, nil
}

// PostAvailable uses an HTTP client to retrieve a zip from from an external url
// and puts it in the available folder for installation
func PostAvailable(uri string) (string, error) {
	if !setting.Bool("AllowWebAppInstall") {
		return "", fail.NewFromErr(ErrNoWebInstall, uri)
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

	err = resource.WriteFile(r.Body, path.Join(resource.AvailableAppDir, filename), true, time.Time{})
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

// Resource is a resource definition for a file in an application
// zip file, used for setting permissions by satisfying the permitter interface
type Resource struct {
	Filepath string
}

// ID is the unique identifier for this resource
func (a *Resource) ID() string {
	return a.Filepath
}

// Permission is here to satisfy the permitter interface, but I'm cheating as it's
// only used setting permissions on not retrieving them.  Seems I have a leaky abstraction
// TODO: reconsider this
func (a *Resource) Permission() (*permission.Permission, error) {
	return nil, errors.New("This should not be used for retrieving file permissions.")
}
