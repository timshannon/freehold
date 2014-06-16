package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"
)

const (
	sessionDS  = "core/session.ds"
	cookieName = "freehold_session"
)

type Session struct {
	userName string `json:"-"`

	Expires   string `json:"expires,omitempty"`
	CSRFToken string `json:"CSRFToken,omitempty"`
	IpAddress string `json:"ipAddress,omitempty"`
}

func session(r *http.Request) (*Session, error) {
	cookie, err := r.Cookie(cookieName)
	if err == http.ErrNoCookie {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	ds := openCoreDS(sessionDS)
	key, err := json.Marshal(cookie.Value)
	if err != nil {
		return nil, err
	}

	var session *Session

	value, err := ds.Get(key)
	if err != nil {
		return nil, err
	}
	if value == nil {
		return nil, nil
	}

	err = json.Unmarshal(value, session)

	if err != nil {
		return nil, err
	}

	cVal := strings.Split(cookie.Value, "_")
	session.userName = cVal[0]

	return session, nil
}

func newSession(auth *Auth, base *Session) (*http.Cookie, error) {
	if auth.User == nil || auth.AuthType == authTypeToken {
		return nil, errors.New("Invalid authentication")
	}

	sessionId := random(128)
	base.CSRFToken = random(256)

	key := auth.User.username + "_" + sessionId

	cookie := &http.Cookie{
		Name:     cookieName,
		Value:    key,
		HttpOnly: true,
		Path:     "/",
		Secure:   isSSL,
	}
	if base.Expires != "" {
		cookie.Expires = base.expireTime()
	} else {
		//Browser should clean up expired cookie, but just incase
		// we'll expire the session in 1 day
		base.Expires = time.Now().Add(24 * time.Hour)
	}

	//TODO: Check for sessionLimit
	return nil, nil
}

func (s *Session) isExpired() bool {
	if s.Expires == "" {
		return true
	}

	t := s.expireTime()
	return t.Before(time.Now())
}

func (s *Session) expireTime() time.Time {
	if s.Expires == "" {
		return time.Unix(0, 0)
	}

	t, err := time.Parse(time.RFC3339, s.Expires)
	if err != nil {
		logError(errors.New("Error parsing session expiration: " + err.Error()))
		return time.Unix(0, 0)
	}
	return t
}

func (s *Session) user() (*User, error) {
	if s.isExpired() || s.userName == "" {
		errors.New("Invalid Session")
	}

	return getUser(s.userName)
}

//TODO: When creating a cookie with no expiration (i.e. expires at session)
// set the session expiration out 1 day so it expires eventually evenif the
// browser or user doesn't clean up the cookie properly.

func sessionGet(w http.ResponseWriter, r *http.Request) {

}

func sessionPost(w http.ResponseWriter, r *http.Request) {
}

func sessionPut(w http.ResponseWriter, r *http.Request) {
}

func sessionDelete(w http.ResponseWriter, r *http.Request) {

}
