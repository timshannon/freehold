package main

import "encoding/json"

const (
	appDS = "core/app.ds"
)

type App struct {
	id string `json:"-"`

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

	app.id = id

	return app, nil
}
