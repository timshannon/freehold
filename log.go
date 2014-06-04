package main

import (
	"encoding/json"
	"log"
	"log/syslog"
	"time"
)

const logDS = "core/log.ds"

type FHLog struct {
	Type string `json:"type"`
	Log  string `json:"log"`
}

func logEntry(Type string, entry string) {
	ds := openCoreDS(settingDS)
	key, err := json.Marshal(time.Now())

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
