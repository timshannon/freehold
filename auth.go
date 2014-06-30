package main

import (
	"encoding/base64"
	"net/http"
	"strings"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/session"
	"bitbucket.org/tshannon/freehold/token"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	authTypeNone    = "none"
	authTypeBasic   = "basic"
	authTypeSession = "session"
	authTypeToken   = "token"
)

type Auth struct {
	AuthType string `json:"type"`
	*user.User
	*token.Token
	*session.Session `json:"-"`
}

// authenticate authenticates an http request in one of 3 ways
// Checks for basic http authentication where the password is either the user's password
// or a valid security token, or the user has an valid cookie based session.
func authenticate(w http.ResponseWriter, r *http.Request) (*Auth, error) {
	a := &Auth{
		AuthType: authTypeNone,
	}
	headerInfo := r.Header.Get("Authorization")
	if headerInfo != "" {
		authInfo := strings.TrimLeft(headerInfo, "Basic ")
		if len(authInfo) == len(headerInfo) {
			return nil, fail.New("Error, malformed basic auth header.", nil)
		}
		userPass, err := base64.StdEncoding.DecodeString(authInfo)
		if err != nil {
			log.Error(err)
			return nil, fail.New("Error, malformed basic auth header.", nil)
		}
		split := strings.SplitN(string(userPass), ":", 2)
		if len(split) != 2 {
			return nil, fail.New("Error, malformed basic auth header.", nil)
		}
		u := split[0]
		pass := split[1]

		if u == "" {
			//public access
			return a, nil
		}

		user, err := user.Get(u)
		if err != nil {
			return nil, err
		}

		t, err := token.Get(user, pass)
		if err != nil {
			return nil, err
		}

		if t != nil {
			a.AuthType = authTypeToken
			if t.IsExpired() {
				return nil, fail.New("Your token has expired", nil)
			}
			a.Token = t
			a.User = t.User()
			return a, nil
		}

		a.AuthType = authTypeBasic
		err = user.Login(pass)
		if err != nil {
			return a, err
		}
		a.User = user
		return a, nil
	}

	//Check for session cookie
	ses, err := session.Get(r)
	if err != nil {
		return nil, err
	}

	if ses == nil {
		//No session cookie
		// public access
		return a, nil
	}

	if ses.IsExpired() {
		return nil, fail.New("Your session has expired", nil)
	}

	// Check for CSRF token
	err = ses.HandleCSRF(w, r)
	if err != nil {
		return nil, err
	}

	a.AuthType = authTypeSession
	a.User = ses.User()
	a.Session = ses
	return a, nil
}

func authGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   auth,
	})
}
