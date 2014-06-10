package main

import (
	"encoding/base64"
	"errors"
	"net/http"
	"strings"
)

// authUser authenticates an http request in one of 2 ways
// Checks for basic http authentication where the password is either the user's password
// or a valid security token, or the user has an valid cookie based session. It returns
// the authenticated user, or an error
func authUser(r *http.Request) (*User, error) {
	var u, pass string

	headerInfo := r.Header.Get("Authorization")
	if headerInfo != "" {
		userPass, err := base64.StdEncoding.DecodeString(headerInfo)
		if err != nil {
			return nil, err
		}
		split := strings.Split(string(userPass), ":")
		if len(split) != 2 {
			err = errors.New("Error, malformed basic auth header.")
			return nil, err
		}
		u = split[0]
		pass = split[1]
	}

	//TODO: Check for session cookie

	if u == "" {
		//public access
		return nil, nil
	}

	user, err := getUser(u)
	if err != nil {
		return nil, err
	}

	err = user.login(pass)
	if err != nil {
		return nil, err
	}
	return user, nil
}
