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
	"bitbucket.org/tshannon/freehold/resource"
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

// ErrNoWritePermissions is the error returned when the user does not have permissions
// to write to a given resource
var ErrNoWritePermission = errors.New("You do not have permission to write to this resource.")

// Auth contains the type and identity of a user in Freehold
// if user == nil, then auth is public access
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

		t, err := token.Login(user, pass)
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
			if a.User != nil {
				a.Username = t.User().Username()
			}
			err = ratelimit.ResetLimit(ipAddress(r), authRateLimitType)
			return a, nil
		}

		a.AuthType = authTypeBasic
		err = user.Login(pass)
		if err != nil {
			return a, err
		}
		a.User = user
		a.Username = user.Username()

		err = ratelimit.ResetLimit(ipAddress(r), authRateLimitType)
		if err != nil {
			return nil, err
		}
		return a, nil
	}

	//Check for session cookie
	ses, err := session.Get(r)
	if err != nil {
		return nil, err
	}

	if ses == nil || ses.IsExpired() {
		//No valid session cookie
		// public access
		return a, a.attemptWrite(r)
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

func (a *Auth) tryRead(res permission.Permitter) error {
	var prm *permission.Permission
	var err error

	if a.AuthType == authTypeToken {
		prm, err = a.Token.GetPermission(res)
	} else {
		prm, err = res.Permission()
	}
	if err != nil {
		return err
	}

	if !prm.CanRead(a.User) {
		switch res.(type) {

		case *resource.File:
			return four04Fail(res.(*resource.File).URL())
		default:
			return four04Fail("")
		}
	}

	return nil
}

func (a *Auth) tryWrite(res permission.Permitter) error {
	var prm *permission.Permission
	var err error

	if a.AuthType == authTypeToken {
		prm, err = a.Token.GetPermission(res)
	} else {
		prm, err = res.Permission()
	}
	if err != nil {
		return err
	}
	if !prm.CanWrite(a.User) {
		switch res.(type) {
		case *resource.File:
			if prm.CanRead(a.User) {
				return fail.NewFromErr(ErrNoWritePermission, res.(*resource.File).URL())
			}
			return four04Fail(res.(*resource.File).URL())

		default:
			if prm.CanRead(a.User) {
				return fail.NewFromErr(ErrNoWritePermission, nil)
			}
			return four04Fail("")
		}
	}

	return nil
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
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   auth,
	})
}
