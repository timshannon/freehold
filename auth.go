package main

import (
	"encoding/base64"
	"errors"
	"net/http"
	"strings"
)

const (
	authTypeBasic   = "basic"
	authTypeSession = "session"
	authTypeToken   = "token"
)

type Auth struct {
	AuthType string `json:"authType"`
	*User
	*Token
}

// authenticate authenticates an http request in one of 2 ways
// Checks for basic http authentication where the password is either the user's password
// or a valid security token, or the user has an valid cookie based session. It returns
// the auth type containing the user / permissions, or an error
func authenticate(r *http.Request) (*Auth, error) {
	//TODO: Is basic auth defined as user:password@host or Authorization header?
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
		u := split[0]
		pass := split[1]

		if u == "" {
			//public access
			return nil, nil
		}

		user, err := getUser(u)
		if err != nil {
			return nil, err
		}

		//TODO: security tokens

		err = user.login(pass)
		if err != nil {
			return nil, err
		}
		return &Auth{
			User:     user,
			AuthType: authTypeBasic,
		}, nil
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

	if ses.isExpired() {
		return nil, pubErr(errors.New("Your session has expired"))
	}

	// Check for CSRF token
	err = ses.checkCSRF(r)
	if err != nil {
		return nil, err
	}

	user, err := ses.user()
	if err != nil {
		return nil, err
	}
	return &Auth{
		User:     user,
		AuthType: authTypeSession,
	}, nil
}

func authGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(r)
	if errHandled(err, w) {
		return
	}
	auth.clearPassword()

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   auth,
	})
}
