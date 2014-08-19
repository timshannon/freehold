// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package ratelimit

import (
	"errors"
	"time"
)

const (
	DS = "core/token.ds"
)

var FailExceededLimit = errors.New("Maximum request limit has been reached. Please try again later.")

type attempt struct {
	IpAddress string    `json:"ipAddress,omitempty"`
	When      time.Time `json:"when,omitempty"`
	Type      string    `json:"type,omitempty"`
}
