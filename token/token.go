package token

import (
	"errors"
	"time"

	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/token.ds"
)

type Token struct {
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:permission,omitempty"`

	requester *user.User
}

func (t *Token) IsExpired() bool {
	if t.Expires == "" {
		return true
	}

	e := t.expireTime()
	return e.Before(time.Now())
}

func (t *Token) expireTime() time.Time {
	if t.Expires == "" {
		return time.Unix(0, 0)
	}

	tm, err := time.Parse(time.RFC3339, t.Expires)
	if err != nil {
		log.Error(errors.New("Error parsing token expiration: " + err.Error()))
		return time.Unix(0, 0)
	}
	return tm
}

func (t *Token) User() *user.User {
	if t.Resource == "" && t.Permission == "" && !t.IsExpired() {
		return t.requester
	}
	return nil
}
