package setting

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"

	"bitbucket.org/tshannon/freehold/datastore"
	"bitbucket.org/tshannon/freehold/fail"
)

const DS = "core/settings.ds"

type Setting struct {
	Description string      `json:"description,omitempty"`
	Value       interface{} `json:"value,omitempty"`

	setFunc func() `json:"-"` //optional function to call when a setting is set
}

func Get(settingName string) (*Setting, error) {
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	key, err := json.Marshal(settingName)
	if err != nil {
		return nil, err
	}
	value, err := ds.Get(key)
	if err != nil {
		return nil, err
	}

	result := &Setting{}

	if value == nil {
		return settingDefault(settingName), nil
	}

	err = json.Unmarshal(value, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func Set(settingName string, value interface{}) error {
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(settingName)
	if err != nil {
		return err
	}

	fhSetting := settingDefault(settingName)

	if reflect.TypeOf(value) != reflect.TypeOf(fhSetting.Value) {
		return fail.New("Invalid setting value type", value)
	}

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

func Value(settingName string) interface{} {
	s, err := Get(settingName)
	if err != nil {
		//TODO: I want to log this error, but that would create a cyclical import
		// with the log package.  This error shouldn't happen unless there's an issue
		// with the core datastore, which usually means the instance can't really run
		// anyway.  This will have to do until I think of something better
		fmt.Fprintln(os.Stderr, "Error getting setting "+settingName+": "+err.Error())
		os.Exit(2)
	}
	return s.Value
}

func Bool(settingName string) bool {
	return Value(settingName).(bool)
}

func Int(settingName string) int {
	return int(Value(settingName).(float64))
}

func Int64(settingName string) int64 {
	return int64(Value(settingName).(float64))
}

func String(settingName string) string {
	return Value(settingName).(string)
}

func Float(settingName string) float64 {
	return Value(settingName).(float64)
}
