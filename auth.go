// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"encoding/base64"
	"errors"
	"net/http"
	"strings"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/ratelimit"
	"bitbucket.org/tshannon/freehold/session"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/token"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	authTypeNone    = "none"
	authTypeBasic   = "basic"
	authTypeSession = "session"
	authTypeToken   = "token"
)

const (
	publicWriteLimitType = "publicWriteLimit"
	authRateLimitType    = "authentication"
)

type Auth struct {
	AuthType string `json:"type"`
	Username string `json:"user,omitempty"`
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
		err := ratelimit.AttemptRequest(ipAddress(r), authRateLimitType, setting.Float("LogonAttemptRateLimit"))
		if err != nil {
			return nil, err
		}

		authInfo := strings.TrimPrefix(headerInfo, "Basic ")
		if len(authInfo) == len(headerInfo) {
			return nil, fail.New("Error, malformed basic auth header.", nil)
		}
		userPass, err := base64.StdEncoding.DecodeString(authInfo)
		if err != nil {
			log.Error(errors.New("Error decoding base64 auth header: " + err.Error()))
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
			return a, a.attemptWrite(r)
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
			a.Username = t.User().Username()
			return a, nil
		}

		a.AuthType = authTypeBasic
		err = user.Login(pass)
		if err != nil {
			return a, err
		}
		a.User = user
		a.Username = user.Username()
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
		return a, a.attemptWrite(r)
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
	a.Username = ses.User().Username()
	a.Session = ses
	return a, nil
}

func (a *Auth) canRead(prm *permission.Permission) bool {
	if a.AuthType != authTypeToken {
		return prm.CanRead(a.User)
	}
	a.Token.SetPermission(prm)
	return prm.CanRead(a.User)
}

func (a *Auth) canWrite(prm *permission.Permission) bool {
	if a.AuthType != authTypeToken {
		return prm.CanWrite(a.User)
	}
	a.Token.SetPermission(prm)
	return prm.CanWrite(a.User)
}

func (a *Auth) attemptWrite(r *http.Request) error {
	if r.Method == "GET" {
		return nil
	}
	if a.User != nil {
		return nil
	}

	return ratelimit.AttemptRequest(ipAddress(r), publicWriteLimitType, setting.Float("PublicWriteRateLimit"))
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
