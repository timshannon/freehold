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

	session := &Session{}

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

	session.key = cookie.Value

	return session, nil
}

func newSession(auth *Auth, base *Session) (*http.Cookie, error) {
	if auth.User == nil || auth.AuthType == authTypeToken {
		return nil, errors.New("Invalid authentication")
	}

	sessionId := random(128)
	base.CSRFToken = random(256)

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

func (s *Session) checkCSRF(r *http.Request) error {
	if r.Method != "GET" {
		if s.isExpired() {
			return pubErr(errors.New("Your session has expired"))
		}
		reqToken := r.Header.Get("X-CSRFToken")
		if reqToken != s.CSRFToken {
			return pubErr(errors.New("Invalid CSRFToken"))
		}
	}
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
	var key string
	s := &Session{}

	for iter.Next() {
		if iter.Err() != nil {
			return iter.Err()
		}

		err = json.Unmarshal(iter.Key(), &key)
		if err != nil {
			return err
		}
		err = json.Unmarshal(iter.Value(), s)
		if err != nil {
			return err
		}

		if strings.Split(key, "_")[0] != username {
			break
		}
		if s.isExpired() {
			err = ds.Delete(iter.Key())
			if err != nil {
				return err
			}
			continue
		}
		s.key = key
		sessions = append(sessions, s)
	}

	over := len(sessions) - settingInt("MaxOpenSessions")
	if over > 0 {
		//Remove oldest sessions
		sort.Sort(SessionByCreated(sessions))
		toRemove := sessions[len(sessions)-over:]
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
func (s SessionByCreated) Less(i, j int) bool { return s[i].Created < s[j].Created }
