package main

const settingDS = "core/settings.ds"

type FHSetting struct {
	Description string      `json:"description,omitempty"`
	Value       interface{} `json:"value,omitempty"`
}

func Setting(setting string) interface{} {
	ds := openCoreDS(settingDS)
	var value []byte
	err := ds.Get(m(setting), value)
	if err != nil {
		//TODO: Log error
	}

	if value == nil {
		//Lookup default value

	}
}
