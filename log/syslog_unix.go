// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// +build !windows,!nacl,!plan9

package log

import (
	"log"
	"log/syslog"
)

// SyslogError logs the error to the system log, UNIX only
func SyslogError(err error) {
	lWriter, lerr := syslog.New(syslog.LOG_ERR, "freehold")
	if lerr != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}

	lWriter.Err(err.Error())
}
