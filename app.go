package main

import "encoding/json"

const (
	appDS = "core/app.ds"
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

func getAvailableApps() ([]*App, error) {

}

func appInfoFromZip(file string) (*App, error) {

}
