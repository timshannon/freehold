// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package session

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"sort"
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS         = "core/session.ds"
	CookieName = "freehold_session"
)

type Session struct {
	key  string     `json:"-"`
	user *user.User `json:"-"`

	ID        string `json:"id,omitempty"`
	Expires   string `json:"expires,omitempty"`
	CSRFToken string `json:"CSRFToken,omitempty"`
	IpAddress string `json:"ipAddress,omitempty"`
	Created   string `json:"created,omitempty"`
	UserAgent string `json:"userAgent,omitempty"`
}

func Get(r *http.Request) (*Session, error) {

	key := sessionCookieValue(r)
	if key == "" {
		return nil, nil
	}

	return get(key)
}

func get(key string) (*Session, error) {
	session := &Session{}

	session.key = key
	if session.key == "" {
		return nil, nil
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	err = ds.Get(session.key, session)
	if err == data.ErrNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	err = session.getUser()
	if err != nil {
		return nil, err
	}
	return session, nil
}

func GetByID(id string, user *user.User) (*Session, error) {
	k := makeKey(user.Username(), id)
	return get(k)
}

func All(user *user.User) ([]*Session, error) {
	if user == nil {
		return nil, fail.New("Invalid user", nil)
	}

	sessions, err := userSessions(user.Username())
	if err != nil {
		return nil, err
	}
	return sessions, nil
}

// Gets the cookie value for the freehold session cookie, and
// ignores empty values
func sessionCookieValue(r *http.Request) string {
	cookies := r.Cookies()
	cValue := ""

	for i := range cookies {
		if cookies[i].Name == CookieName {
			if cookies[i].Value != "" {
				cValue = cookies[i].Value
			}
		}
	}
	return cValue
}

func New(u *user.User, base *Session) (*Session, error) {
	if u == nil {
		return nil, fail.New("Invalid authentication", nil)
	}

	newSession := *base

	newSession.ID = random(128)
	newSession.CSRFToken = random(128)

	newSession.key = makeKey(u.Username(), newSession.ID)

	newSession.Created = time.Now().Format(time.RFC3339)

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	err = ds.Put(newSession.key, newSession)
	if err != nil {
		return nil, err
	}

	err = enforceSessionLimit(u)
	if err != nil {
		return nil, err
	}
	newSession.user = u

	return &newSession, nil
}

func makeKey(username, id string) string {
	return username + "_" + id
}

func (s *Session) Key() string {
	return s.key
}

func (s *Session) verify() error {
	if s.Expires != "" && s.expireTime().After(time.Now().AddDate(0, 0, setting.Int("SessionMaxDaysTillExpire"))) {
		return fail.New("Session Expiration date is set too far into the future.  See SessionMaxDaysTillExpire setting.", s)
	}
	return nil
}

func (s *Session) Cookie(isSSL bool) *http.Cookie {
	if s.key == "" {
		return nil
	}
	cookie := &http.Cookie{
		Name:     CookieName,
		Value:    s.key,
		HttpOnly: true,
		Path:     "/",
		Secure:   isSSL,
	}
	if s.Expires != "" {
		cookie.Expires = s.expireTime()
	}

	return cookie
}

func username(key string) string {
	return strings.Split(key, "_")[0]
}

func id(key string) string {
	return strings.Split(key, "_")[1]
}

func (s *Session) IsExpired() bool {
	if s.Expires == "" {
		//If expires isn't specified then it's a session cookie
		// that should expire at the end of the session.  Use
		// 12 hours past created date to make sure the session gets
		// cleaned up in the datastore regardless of what the client does
		return time.Now().After(s.createdTime().Add(time.Hour * 12))
	}

	return s.expireTime().Before(time.Now())
}

func (s *Session) expireTime() time.Time {
	if s.Expires == "" {
		return time.Unix(0, 0)
	}

	t, err := time.Parse(time.RFC3339, s.Expires)
	if err != nil {
		log.Error(errors.New("Error parsing session expiration: " + err.Error()))
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
		log.Error(errors.New("Error parsing session expiration: " + err.Error()))
		return time.Unix(0, 0)
	}
	return t
}

func (s *Session) HandleCSRF(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "GET" {
		if s.IsExpired() {
			return fail.New("Your session has expired", nil)
		}
		reqToken := r.Header.Get("X-CSRFToken")
		if reqToken != s.CSRFToken {
			return fail.New("Invalid CSRFToken", reqToken)
		}
		return nil
	}

	//Get requests, put CSRF token in header
	w.Header().Add("X-CSRFToken", s.CSRFToken)

	return nil
}

func (s *Session) getUser() error {
	if s.key == "" || username(s.key) == "" {
		errors.New("Invalid Session")
	}

	user, err := user.Get(username(s.key))
	if err != nil {
		return err
	}
	s.user = user
	return nil
}
func (s *Session) User() *user.User {
	return s.user
}

func (s *Session) Expire() error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	return ds.Delete(s.key)
}

func userSessions(user string) ([]*Session, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	from, err := json.Marshal(user)
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(from, nil)
	if err != nil {
		return nil, err
	}

	var sessions []*Session

	for iter.Next() {
		s := &Session{}
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		err = json.Unmarshal(iter.Value(), s)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(iter.Key(), &s.key)
		if err != nil {
			return nil, err
		}

		if username(s.key) != user {
			break
		}
		if s.IsExpired() {
			err = ds.Delete(iter.Key())
			if err != nil {
				return nil, err
			}
			continue
		}
		sessions = append(sessions, s)
	}

	return sessions, nil
}

func enforceSessionLimit(u *user.User) error {
	sessions, err := userSessions(u.Username())
	if err != nil {
		return err
	}

	over := len(sessions) - setting.Int("MaxOpenSessions")

	if over > 0 {
		//Remove oldest sessions
		sort.Sort(SessionByCreated(sessions))

		toRemove := sessions[:over]
		for i := range toRemove {
			err = toRemove[i].Expire()
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

//Returns a random value of the bit length passed in
func random(bits int) string {
	result := make([]byte, bits/4)
	_, err := io.ReadFull(rand.Reader, result)
	if err != nil {
		panic(fmt.Sprintf("Error generating random values: %v", err))
	}

	return base64.StdEncoding.EncodeToString(result)

}
