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

	//Check for session cookie
	ses, err := session(r)
	if err != nil {
		return nil, err
	}

	if ses == nil {
		//No session cookie
		// public access
		return nil, nil
	}

	if ses.IsExpired() {
		return nil, pubErr(errors.New("Your session has expired"))
	}

	// Check for CSRF token
	err = checkCSRF(r, ses)
	if err != nil {
		return nil, err
	}
	return ses.User()
}

func checkCSRF(r *http.Request, s *Session) error {
	if r.Method != "GET" {
		if s.IsExpired() {
			return pubErr(errors.New("Your session has expired"))
		}
		reqToken := r.Header.Get("X-CSRFToken")
		if reqToken != s.CSRFToken {
			return pubErr(errors.New("Invalid CSRFToken"))
		}
	}
	return nil
}
