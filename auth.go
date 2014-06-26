package main

import (
	"encoding/base64"
	"errors"
	"net/http"
	"strings"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/session"
	"bitbucket.org/tshannon/freehold/token"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	authTypeBasic   = "basic"
	authTypeSession = "session"
	authTypeToken   = "token"
)

type Auth struct {
	AuthType string `json:"authType"`
	*user.User
	*token.Token
	*session.Session `json:"-"`
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
			return nil, nil
		}

		user, err := user.Get(u)
		if err != nil {
			return nil, err
		}

		//TODO: security tokens

		err = user.Login(pass)
		if err != nil {
			return nil, err
		}
		return &Auth{
			AuthType: authTypeBasic,
			User:     user,
		}, nil
	}

	//Check for session cookie
	ses, err := session.Get(r)
	if err != nil {
		return nil, err
	}

	if ses == nil {
		//No session cookie
		// public access
		return nil, nil
	}

	if ses.IsExpired() {
		return nil, fail.New("Your session has expired", nil)
	}

	// Check for CSRF token
	err = ses.HandleCSRF(w, r)
	if err != nil {
		return nil, err
	}

	return &Auth{
		AuthType: authTypeSession,
		User:     ses.User(),
		Session:  ses,
	}, nil
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
	prm, err := permissions.Get(resource)
	if err != nil {
		return false, nil, err
	}
	return prm.CanWrite(auth), prm, nil
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

// authedForAdmin checks if the current user
// is admin and handles a bunch of commonly used responses if not
// If is admin, returns true
func authedForAdmin(w http.ResponseWriter, r *http.Request) (*Auth, bool) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return nil, false
	}
	if auth == nil {
		four04(w, r)
		return nil, false
	}

	if auth.AuthType == authTypeToken && !auth.Token.isOwner() {
		four04(w, r)
		return nil, false
	}
	if !auth.User.Admin {
		four04(w, r)
		return nil, false
	}

	return auth, true
}

func authedForOwner(w http.ResponseWriter, r *http.Request) (*Auth, bool) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return nil, false
	}
	if auth == nil {
		errHandled(pubFail(errors.New("You must log in before deleting a file.")), w)
		return nil, false
	}

	//If access is granted via token check if token grants owner level permissions
	if auth.AuthType == authTypeToken && !auth.Token.isOwner() {
		errHandled(pubFail(errors.New("You must log in before deleting a file.")), w)
		return nil, false
	}

	return auth, true
}
