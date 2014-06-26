package application

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"time"

	"bitbucket.org/tshannon/freehold/datastore"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/paths"
	"bitbucket.org/tshannon/freehold/setting"
)

const (
	DS              = "core/app.ds"
	AVAILABLEAPPDIR = paths.AppDir + "available/"
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
}

func Get(id string) (*App, error) {
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
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

func GetAll() ([]*App, error) {
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

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

func Install(filepath string) (*App, error) {
	app, err := appInfoFromZip(filepath)
	if err != nil {
		return nil, err
	}

	a, err := Get(app.Id)
	if err != nil {
		return nil, err
	}
	if a != nil {
		return nil, fail.New("An app with the same id is already installed", app)
	}

	installDir := path.Join(paths.AppDir, app.Id)
	r, err := appFileReader(filepath)
	defer r.Close()
	if err != nil {
		return nil, err
	}
	for _, f := range r.File {
		fr, err := f.Open()
		if err != nil {
			fr.Close()
			log.Error(err)
			return nil, fail.NewFromErr(FailAppInvalid, filepath)
		}
		err = writeFile(fr, path.Join(installDir, f.Name))
		if err != nil {
			return nil, err
		}
	}

	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	key, err := json.Marshal(app.Id)
	value, err := json.Marshal(app)

	err = ds.Put(key, value)
	if err != nil {
		return nil, err
	}
	return app, nil
}

func Upgrade(filepath string) (*App, error) {
	app, err := appInfoFromZip(filepath)
	if err != nil {
		return nil, err
	}

	err = Uninstall(app.Id)
	if err != nil {
		return nil, err
	}
	app, err = Install(filepath)
	if err != nil {
		return nil, err
	}
	return app, nil

}

func Uninstall(appid string) error {
	app, err := Get(appid)
	if err != nil {
		return err
	}

	if app == nil {
		return fail.NewFromErr(FailInvalidId, appid)
	}

	return os.RemoveAll(path.Join(paths.AppDir, appid))
}

func Available() ([]*App, []*fail.Fail, error) {
	return getAppsFromDir(AVAILABLEAPPDIR)
}

func getAppsFromDir(dir string) ([]*App, []*fail.Fail, error) {
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
	var failures []*fail.Fail
	for _, f := range files {
		child := path.Join(dir, f.Name())
		if f.IsDir() {
			childApps, childfail, err := getAppsFromDir(child)
			apps = append(apps, childApps...)
			failures = append(failures, childfail...)
			if err != nil {
				return apps, childfail, err
			}
			continue
		}
		app, err := appInfoFromZip(child)
		if err != nil {
			if fail.IsFail(err) {
				failures = append(failures, err.(*fail.Fail))
				continue
			}
			return apps, failures, err
		}
		apps = append(apps, app)
	}

	return apps, failures, nil
}

func appInfoFromZip(file string) (*App, error) {
	r, err := appFileReader(file)
	defer r.Close()
	if err != nil {
		return nil, err
	}
	for _, f := range r.File {
		if f.Name == "app.json" {
			app, err := appInfoFromJsonFile(f)
			if err != nil {
				if fail.IsFail(err) {
					return nil, fail.NewFromErr(err, file)
				}
				return nil, err
			}
			return app, nil
		}
	}
	return nil, fail.NewFromErr(FailAppInvalid, file)
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

	filepath := path.Join(AVAILABLEAPPDIR, zippath)

	r, err := zip.OpenReader(filepath)
	if os.IsNotExist(err) {
		return nil, fail.NewFromErr(FailAppNotFound, zippath)
	}

	if err != nil {
		log.Error(err)
		return nil, fail.NewFromErr(FailAppInvalid, zippath)
	}
	return r, nil
}

func appFileFromUrl(url string) (string, error) {
	if !setting.Bool("AllowWebAppInstall") {
		return "", fail.NewFromErr(FailNoWebInstall, url)
	}

	client := &http.Client{
		Timeout: time.Duration(setting.Int("HttpClientTimeout")) * time.Second,
	}
	r, err := client.Get(url)

	if err != nil {
		return "", err
	}

	if r.StatusCode != http.StatusOK {
		return "", fail.New("Unable to retrieve app file from url: "+r.Status, url)
	}

	filename := path.Base(url)
	err = writeFile(r.Body, path.Join(AVAILABLEAPPDIR, filename))
	if err != nil {
		return "", err
	}
	return filename, nil
}

//writeFile writes the contents of the reader, and closes it
func writeFile(reader io.Reader, filename string) error {
	bytes, err := ioutil.ReadAll(reader)
	if err != nil {
		return err
	}
	newFile, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0600)
	if os.IsExist(err) {
		return fail.New("File already exists.", filename)
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
