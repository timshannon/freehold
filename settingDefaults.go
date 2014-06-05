package main

var settingDefaults map[string]*Setting

func init() {
	settingDefaults = map[string]*Setting{
		"LogErrors": &Setting{
			Description: "Whether or not errors will be logged in the core/log datastore.",
			Value:       true,
		},
		"LogErrorsToSyslog": &Setting{
			Description: "Whether or not errors will be logged in the OS's error log.",
			Value:       false,
		},

		"DatastoreFileTimeout": &Setting{
			Description: "The number of seconds of inactivity is needed for a a datastore file is automatically closed. " +
				"The higher the timeout the more resources needed to hold open more files.  The lower the timeout " +
				"the more clients will be waiting on locked files to be opened.",
			Value:   60,
			setFunc: setDatastoreTimeout,
		},
	}

}

func settingDefault(settingName string) *Setting {
	result, ok := settingDefaults[settingName]
	if !ok {
		panic("Default setting " + settingName + " not configured yet")
	}
	return result
}
