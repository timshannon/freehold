package main

import (
	"encoding/json"
	"errors"
	"log"
	"log/syslog"
	"time"
)

const logDS = "core/log.ds"

type Log struct {
	Type string `json:"type"`
	Log  string `json:"log"`
}

func logEntry(Type string, entry string) {
	ds := openCoreDS(settingDS)
	key, err := json.Marshal(time.Now().Format(time.RFC3339))
	if err != nil {
		logSyslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return
	}

	log := &Log{
		Type: Type,
		Log:  entry,
	}

	value, err := json.Marshal(log)
	if err != nil {
		logSyslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return
	}

	err = ds.Put(key, value)
	if err != nil {
		logSyslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return
	}
}

func logError(err error) {
	if !settingBool("LogErrors") {
		return
	}
	if settingBool("LogErrorsToSyslog") {
		logSyslogError(err)
	}
	logEntry("error", err.Error())
}

func logSyslogError(err error) {
	lWriter, err := syslog.New(syslog.LOG_ERR, "freehold")
	if err != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}
	lWriter.Err(err.Error())
}
