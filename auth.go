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
	*Session `json:"-"`
}

// authenticate authenticates an http request in one of 2 ways
// Checks for basic http authentication where the password is either the user's password
// or a valid security token, or the user has an valid cookie based session. It returns
// the auth type containing the user / permissions, or an error
func authenticate(w http.ResponseWriter, r *http.Request) (*Auth, error) {
	headerInfo := r.Header.Get("Authorization")
	if headerInfo != "" {
		authInfo := strings.TrimLeft(headerInfo, "Basic ")
		if len(authInfo) == len(headerInfo) {
			err := pubFail(errors.New("Error, malformed basic auth header."))
			return nil, err
		}
		userPass, err := base64.StdEncoding.DecodeString(authInfo)
		if err != nil {
			logError(err)
			err = pubFail(errors.New("Error, malformed basic auth header."))
			return nil, err
		}
		split := strings.SplitN(string(userPass), ":", 2)
		if len(split) != 2 {
			err = pubFail(errors.New("Error, malformed basic auth header."))
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
			AuthType: authTypeBasic,
			User:     user,
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
	err = ses.handleCSRF(w, r)
	if err != nil {
		return nil, err
	}

	user, err := ses.user()
	if err != nil {
		return nil, err
	}
	return &Auth{
		AuthType: authTypeSession,
		User:     user,
		Session:  ses,
	}, nil
}

func authGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}
	if auth != nil {
		auth.clearPassword()
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   auth,
	})
}

func canRead(auth *Auth, resource string) (bool, *Permission, error) {
	if auth != nil && auth.tokenRestricted(resource) {
		return false, nil, nil
	}
	prm, err := permissions(resource)
	if err != nil {
		return false, nil, err
	}
	return prm.canRead(auth), prm, nil
}

func canWrite(auth *Auth, resource string) (bool, *Permission, error) {
	if auth != nil && auth.tokenRestricted(resource) {
		return false, nil, nil
	}
	prm, err := permissions(resource)
	if err != nil {
		return false, nil, err
	}
	return prm.canWrite(auth), prm, nil
}

// tokenRestricted is whether or not a token exists and does not
// allow access to the resource
func (a *Auth) tokenRestricted(resource string) bool {
	if a.Token != nil {
		if a.Resource != resource {
			return true
		}
	}
	return false
}
