package main

import (
	"encoding/json"
	"errors"
)

const (
	permissionsDS = "core/permission.ds"
)

type Permission struct {
	Owner   string `json:"owner"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`
}

func permissions(resource string) (*Permission, error) {
	ds := openCoreDS(permissionsDS)
	key, err := json.Marshal(resource)
	if err != nil {
		logError(err)
		return nil, err
	}

	var value []byte
	var perm *Permission

	err = ds.Get(key, value)
	if err != nil {
		logError(err)
		return nil, err
	}
	if value == nil {
		return nil, errors.New("Permissions not found for resource: " + resource)
	}

	err = json.Unmarshal(value, perm)
	if err != nil {
		logError(err)
		return nil, err
	}

	return perm, nil
}

func setPermissions(resource string, permissions *Permission) error {
	//TODO:
	return nil
}
