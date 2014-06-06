package main

import "code.google.com/p/go.crypto/bcrypt"

var settingDefaults map[string]*Setting

func settingDefault(settingName string) *Setting {
	result, ok := settingDefaults[settingName]
	if !ok {
		panic("Default setting " + settingName + " not configured yet")
	}
	return result
}

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
			Description: "The number of seconds of inactivity is needed for a a datastore file is " +
				"automatically closed. The higher the timeout the more resources needed to hold " +
				"open more files.  The lower the timeout the more clients will be waiting on " +
				"locked files to be opened.",
			Value:   60,
			setFunc: setDatastoreTimeout,
		},
		"MinPasswordLength": &Setting{
			Description: "Minimum length of new passwords.",
			Value:       8,
		},
		"PasswordBcryptWorkFactor": &Setting{
			Description: "Work factor used for encrypting passwords.  The higher the value the longer " +
				"it takes to encrypt a password and the safer the password is from dictionary attacks.",
			Value: bcrypt.DefaultCost,
		},
		"LogFailedAuth": &Setting{
			Description: "Whether or not to log failed authentication attempts.",
			Value:       true,
		},
		"LogSuccessAuth": &Setting{
			Description: "Whether or not to log successful authentication attempts.",
			Value:       false,
		},
		"LogPasswordChange": &Setting{
			Description: "Logs when a user changes their password.",
			Value:       false,
		},
	}

}
