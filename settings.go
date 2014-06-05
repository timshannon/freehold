package main

import (
	"encoding/json"
	"errors"
)

const settingDS = "core/settings.ds"

type Setting struct {
	Description string      `json:"description,omitempty"`
	Value       interface{} `json:"value,omitempty"`

	setFunc func() `json:"-"` //optional function to call when a setting is set
}

func setting(settingName string) (*Setting, error) {
	ds := openCoreDS(settingDS)
	var value []byte

	key, err := json.Marshal(settingName)
	if err != nil {
		return nil, err
	}
	err = ds.Get(key, value)
	if err != nil {
		return nil, err
	}

	var result *Setting

	if value == nil {
		return settingDefault(settingName), nil
	}

	err = json.Unmarshal(value, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func setSetting(settingName string, value interface{}) error {
	ds := openCoreDS(settingDS)
	key, err := json.Marshal(settingName)
	if err != nil {
		return err
	}

	fhSetting := settingDefault(settingName)
	fhSetting.Value = value

	dsValue, err := json.Marshal(fhSetting)
	if err != nil {
		return err
	}
	err = ds.Put(key, dsValue)
	if err != nil {
		return err
	}
	if fhSetting.setFunc != nil {
		fhSetting.setFunc()
	}
	return nil
}

// Helper functions for grabbing specific setting values
// Will panic if requesting the wrong type for the setting

func settingValue(settingName string) interface{} {
	s, err := setting(settingName)
	if err != nil {
		logError(errors.New("Error getting setting " + settingName + ": " + err.Error()))
		return settingDefault(settingName).Value
	}
	return s.Value
}

func settingBool(settingName string) bool {
	return settingValue(settingName).(bool)
}

func settingInt(settingName string) int {
	return int(settingValue(settingName).(float64))
}

func settingString(settingName string) string {
	return settingValue(settingName).(string)
}

func settingFloat(settingName string) float64 {
	return settingValue(settingName).(float64)
}
