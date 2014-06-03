package main

const settingDS = "core/settings.ds"

type Setting struct {
	Description string      `json:"description,omitempty"`
	Value       interface{} `json:"value,omitempty"`
}

func Setting(setting string) interface{} {
	ds := openCoreDS(settingDS)
}
