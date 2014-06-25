package main

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"time"
)

const (
	appDS = "core/app.ds"
)

var (
	ErrNoWebInstall = pubErr(errors.New("Web based application installs are not allowed on this instance. " +
		"See the AllowWebAppInstall Setting for more information."))
	ErrAppNotFound = pubErr(errors.New("Invalid application file path. Application file not found."))
	ErrAppInvalid  = pubErr(errors.New("Application file is an invalid format and cannot be installed."))
	ErrInvalidId   = pubErr(errors.New("Invalid App id"))
)

type App struct {
	Id          string `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Author      string `json:"author,omitempty"`
	Root        string `json:"root,omitempty"`
	Icon        string `json:"icon,omitempty"`
}

func getApp(id string) (*App, error) {
	ds := openCoreDS(appDS)
	key, err := json.Marshal(id)
	if err != nil {
		return nil, err
	}

	app := &App{}

	value, err := ds.Get(key)
	if err != nil {
		return nil, err
	}
	if value == nil {
		return nil, nil
	}

	err = json.Unmarshal(value, app)
	if err != nil {
		return nil, err
	}

	app.Id = id

	return app, nil
}

func getAllApps() ([]*App, error) {
	ds := openCoreDS(appDS)

	iter, err := ds.Iter(nil, nil)
	if err != nil {
		return nil, err
	}

	var apps []*App

	for iter.Next() {
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		app := &App{}
		err = json.Unmarshal(iter.Value(), app)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(iter.Key(), app.Id)
		if err != nil {
			return nil, err
		}

		apps = append(apps, app)
	}

	return apps, nil
}

func installApp(filepath string) (*App, error) {
	app, err := appInfoFromZip(filepath)
	if err != nil {
		return nil, err
	}

	a, err := getApp(app.Id)
	if err != nil {
		return nil, err
	}
	if a != nil {
		return nil, pubFail(errors.New("An app with id " + app.Id + " is already installed"))
	}

	installDir := path.Join(appDir, app.Id)
	r, err := appFileReader(filepath)
	defer r.Close()
	if err != nil {
		return nil, err
	}
	for _, f := range r.File {
		fr, err := f.Open()
		if err != nil {
			fr.Close()
			logError(err)
			return nil, ErrAppInvalid
		}
		err = writeFile(fr, path.Join(installDir, f.Name))
		if err != nil {
			return nil, err
		}
	}

	ds := openCoreDS(appDS)

	key, err := json.Marshal(app.Id)
	value, err := json.Marshal(app)

	err = ds.Put(key, value)
	if err != nil {
		return nil, err
	}
	return app, nil
}

func upgradeApp(filepath string) (*App, error) {
	app, err := appInfoFromZip(filepath)
	if err != nil {
		return nil, err
	}

	err = uninstallApp(app.Id)
	if err != nil {
		return nil, err
	}
	app, err = installApp(filepath)
	if err != nil {
		return nil, err
	}
	return app, nil

}

func uninstallApp(appid string) error {
	app, err := getApp(appid)
	if err != nil {
		return err
	}

	if app == nil {
		return ErrInvalidId
	}

	return os.RemoveAll(path.Join(appDir, appid))
}

func getAppsFromDir(dir string) ([]*App, []ErrorItem, error) {
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

	var apps []*App
	var errList []ErrorItem
	for _, f := range files {
		child := path.Join(dir, f.Name())
		if f.IsDir() {
			childApps, childerr, err := getAppsFromDir(child)
			apps = append(apps, childApps...)
			errList = append(errList, childerr...)
			if err != nil {
				return apps, childerr, err
			}
			continue
		}
		app, err := appInfoFromZip(child)
		if err != nil {
			_, errMsg := errorMessage(err)
			errList = append(errList, ErrorItem{
				Message: errMsg,
				Data:    child,
			})
			continue

		}
		apps = append(apps, app)
	}

	return apps, errList, nil
}

func appInfoFromZip(file string) (*App, error) {
	r, err := appFileReader(file)
	defer r.Close()
	if err != nil {
		return nil, err
	}
	for _, f := range r.File {
		if f.Name == "app.json" {
			return appInfoFromJsonFile(f)
		}
	}
	return nil, ErrAppInvalid
}

func appInfoFromJsonFile(f *zip.File) (*App, error) {
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
		return nil, pubFail(errors.New("app.json file contains invalid JSON: " + err.Error()))
	case *json.UnmarshalTypeError:
		return nil, pubFail(errors.New("app.json file contains a JSON structure that " +
			"doesn't match the expected structure."))
	}
	if err != nil {
		return nil, err
	}

	if app.Id == "" {
		return nil, ErrInvalidId
	}

	return app, nil

}

func appFileReader(zippath string) (*zip.ReadCloser, error) {
	if zippath == "" {
		return nil, pubErr(errors.New("Invalid application path."))
	}

	filepath := path.Join(availableAppDir, zippath)

	if filepath == "" {
		return nil, pubErr(errors.New("Invalid application path."))
	}

	r, err := zip.OpenReader(filepath)
	if os.IsNotExist(err) {
		return nil, ErrAppNotFound
	}

	if err != nil {
		logError(err)
		return nil, ErrAppInvalid
	}
	return r, nil
}

func appFileFromUrl(url string) (string, error) {
	if !settingBool("AllowWebAppInstall") {
		return "", ErrNoWebInstall
	}

	client := &http.Client{
		Timeout: time.Duration(settingInt("HttpClientTimeout")) * time.Second,
	}
	r, err := client.Get(url)

	if err != nil {
		return "", err
	}

	if r.StatusCode != http.StatusOK {
		return "", pubErr(errors.New("Unable to retrieve app file from url: " + r.Status))
	}

	filename := path.Base(url)
	err = writeFile(r.Body, path.Join(availableAppDir, filename))
	if err != nil {
		return "", err
	}
	return filename, nil
}
