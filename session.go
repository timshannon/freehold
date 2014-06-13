package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"
)

const (
	sessionDS = "core/session.ds"
)

type Session struct {
	userName string `json:"-"`

	Expires   string `json:"expires,omitempty"`
	CSRFToken string `json:"CSRFToken,omitempty"`
	IpAddress string `json:"ipAddress,omitempty"`
}

func session(r *http.Request) (*Session, error) {
	cookie, err := r.Cookie("freehold_session")
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

func (s *Session) IsExpired() bool {
	if s.Expires == "" {
		return true
	}

	t, err := time.Parse(time.RFC3339, s.Expires)
	if err != nil {
		logError(errors.New("Error parsing session expiration: " + err.Error()))
		return true
	}
	return t.Before(time.Now())
}

func (s *Session) User() (*User, error) {
	if s.IsExpired() || s.userName == "" {
		errors.New("Invalid Session")
	}

	return getUser(s.userName)
}

//TODO: When creating a cookie with no expiration (i.e. expires at session)
// set the session expiration out 1 day so it expires eventually evenif the
// browser or user doesn't clean up the cookie properly.
