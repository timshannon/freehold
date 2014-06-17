package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"sort"
	"strings"
	"time"
)

const (
	sessionDS  = "core/session.ds"
	cookieName = "freehold_session"
)

type Session struct {
	key string `json:"-"`

	Expires   string `json:"expires,omitempty"`
	CSRFToken string `json:"CSRFToken,omitempty"`
	IpAddress string `json:"ipAddress,omitempty"`
	Created   string `json:"created,omitempty"`
}

func session(r *http.Request) (*Session, error) {
	session := &Session{}

	session.key = sessionCookieValue(r)
	if session.key == "" {
		return nil, nil
	}

	ds := openCoreDS(sessionDS)
	key, err := json.Marshal(session.key)
	if err != nil {
		return nil, err
	}

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

	return session, nil
}

// Gets the cookie value for the freehold session cookie, and
// ignores empty values
func sessionCookieValue(r *http.Request) string {
	cookies := r.Cookies()
	cValue := ""

	for i := range cookies {
		if cookies[i].Name == cookieName {
			if cookies[i].Value != "" {
				cValue = cookies[i].Value
			}
		}
	}
	return cValue
}

func newSession(auth *Auth, base *Session) (*http.Cookie, error) {
	if auth.User == nil || auth.AuthType == authTypeToken {
		return nil, errors.New("Invalid authentication")
	}

	sessionId := random(128)
	base.CSRFToken = random(128)

	base.key = auth.User.username + "_" + sessionId

	cookie := &http.Cookie{
		Name:     cookieName,
		Value:    base.key,
		HttpOnly: true,
		Path:     "/",
		Secure:   isSSL,
	}
	if base.Expires != "" {
		cookie.Expires = base.expireTime()
	} else {
		//Browser should clean up expired cookie, but just incase
		// we'll expire the session in 1 day
		base.Expires = time.Now().Add(24 * time.Hour).Format(time.RFC3339)
	}
	base.Created = time.Now().Format(time.RFC3339)

	ds := openCoreDS(sessionDS)
	jKey, err := json.Marshal(base.key)
	if err != nil {
		return nil, err
	}
	value, err := json.Marshal(base)
	if err != nil {
		return nil, err
	}

	err = ds.Put(jKey, value)
	if err != nil {
		return nil, err
	}

	err = enforceSessionLimit(auth.User.username)
	if err != nil {
		return nil, err
	}

	return cookie, nil
}

func (s *Session) username() string {
	return strings.Split(s.key, "_")[0]
}

func (s *Session) id() string {
	return strings.Split(s.key, "_")[1]
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

func (s *Session) createdTime() time.Time {
	if s.Created == "" {
		return time.Unix(0, 0)
	}

	t, err := time.Parse(time.RFC3339, s.Created)
	if err != nil {
		logError(errors.New("Error parsing session expiration: " + err.Error()))
		return time.Unix(0, 0)
	}
	return t
}

func (s *Session) handleCSRF(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "GET" {
		if s.isExpired() {
			return pubErr(errors.New("Your session has expired"))
		}
		reqToken := r.Header.Get("X-CSRFToken")
		if reqToken != s.CSRFToken {
			return pubErr(errors.New("Invalid CSRFToken"))
		}
		return nil
	}

	//Get requests, put CSRF token in header
	w.Header().Add("X-CSRFToken", s.CSRFToken)

	return nil
}

func (s *Session) user() (*User, error) {
	if s.isExpired() || s.username() == "" {
		errors.New("Invalid Session")
	}

	return getUser(s.username())
}

func (s *Session) expire() error {
	ds := openCoreDS(sessionDS)
	key, err := json.Marshal(s.key)
	if err != nil {
		return err
	}
	return ds.Delete(key)
}

func enforceSessionLimit(username string) error {
	ds := openCoreDS(sessionDS)
	from, err := json.Marshal(username)
	if err != nil {
		return err
	}

	iter, err := ds.Iter(from, nil)
	if err != nil {
		return err
	}

	var sessions []*Session

	for iter.Next() {

		s := &Session{}
		if iter.Err() != nil {
			return iter.Err()
		}

		err = json.Unmarshal(iter.Value(), s)
		if err != nil {
			return err
		}
		err = json.Unmarshal(iter.Key(), &s.key)
		if err != nil {
			return err
		}

		if s.username() != username {
			break
		}
		if s.isExpired() {
			err = ds.Delete(iter.Key())
			if err != nil {
				return err
			}
			continue
		}
		sessions = append(sessions, s)
	}

	over := len(sessions) - settingInt("MaxOpenSessions")

	if over > 0 {
		//Remove oldest sessions
		sort.Sort(SessionByCreated(sessions))

		toRemove := sessions[:over]
		for i := range toRemove {
			err = toRemove[i].expire()
			if err != nil {
				return err
			}
		}
	}
	return nil
}

type SessionByCreated []*Session

func (s SessionByCreated) Len() int           { return len(s) }
func (s SessionByCreated) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
func (s SessionByCreated) Less(i, j int) bool { return s[i].createdTime().Before(s[j].createdTime()) }
