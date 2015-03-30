// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// failures are errors which can be returned to the client and are the result
// of user input or action in some way.  Different from an error in that they
// are used to prevent internal data from being exposed to clients, and they
// contain additional information as to the source of the error, usually their
// input sent back to them

package fail

// Fail is an error whos contents can be exposed to the client and is usually the result
// of incorrect client input
type Fail struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func (f *Fail) Error() string {
	return f.Message
}

// New creates a new failure
func New(message string, data interface{}) error {
	return &Fail{
		Message: message,
		Data:    data,
	}
}

// NewFromErr returns a new failure based on the passed in error
func NewFromErr(err error, data interface{}) error {
	return New(err.Error(), data)
}

// IsEqual tests whether an error is equal to another error / failure
func IsEqual(err, other error) bool {
	if err == nil {
		if other == nil {
			return true
		}
		return false
	}
	return err.Error() == other.Error()
}

// IsFail tests whether the passed in error is a failure
func IsFail(err error) bool {
	if err == nil {
		return false
	}
	switch err.(type) {
	case *Fail:
		return true
	default:
		return false
	}
}
