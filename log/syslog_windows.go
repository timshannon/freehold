// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package log

import (
	"fmt"
	"os"
)

// SyslogError logs the error to the system log, UNIX only
func SyslogError(err error) {
	//No syslog on windows, sorry
	fmt.Fprintln(os.Stderr, err)
}
