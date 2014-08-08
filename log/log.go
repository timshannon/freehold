// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package log

import (
	"errors"
	"fmt"
	"log"
	"log/syslog"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/setting"
)

const DS = "core/log.ds"

type Log struct {
	When string `json:"when"`
	Type string `json:"type"`
	Log  string `json:"log"`
}

func NewEntry(Type string, entry string) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		syslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return

	}
	when := time.Now().Format(time.RFC3339)

	log := &Log{
		When: when,
		Type: Type,
		Log:  entry,
	}

	err = ds.Put(when, log)
	if err != nil {
		syslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return
	}
}

//TODO:
//func Get(iter *data.Iter) ([]Log, error) {
//ds, err := data.OpenCoreDS(ds)
//if err != nil {
//return nil, err
//}
//}

// Error logs and error to the core log datastore.  For core code the rule for error logging
// is to not log it until it's "bubbled up to the top".  Meaning only the http handler
// should log the error.  This is to prevent the same error from being logged a bunch of times.
func Error(err error) {
	if !setting.Bool("LogErrors") {
		return
	}
	if setting.Bool("LogErrorsToSyslog") {
		syslogError(err)
	}
	//TODO: Remove
	fmt.Println("Error: ", err)
	NewEntry("error", err.Error())
}

func Fail(err error) {
	if !setting.Bool("LogFailures") {
		return
	}
	NewEntry("failure", err.Error())
}

func syslogError(err error) {
	lWriter, err := syslog.New(syslog.LOG_ERR, "freehold")
	if err != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}
	lWriter.Err(err.Error())
}
