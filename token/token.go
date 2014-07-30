// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package token

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/token.ds"
)

var FailTokenLevel = errors.New("Token grants more permissions than requester has.")

type Token struct {
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:permission,omitempty"`
	Created    string `json:"created,omitempty"`

	requester *user.User `json:"_"`
	token     string     `json:"-"`
}

func New(t *Token, requester *user.User) (*Token, error) {
	t.requester = requester

	err := t.verify()
	if err != nil {
		return nil, err
	}
	t.token = generateToken()

	t.Created = time.Now().Format(time.RFC3339)

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	key, err := json.Marshal(key(t.requester.Username(), t.token))
	if err != nil {
		return nil, err
	}
	value, err := json.Marshal(t)
	if err != nil {
		return nil, err
	}

	err = ds.Put(key, value)
	if err != nil {
		return nil, err
	}
	return t, nil
}

func (t *Token) verify() error {
	if t.Name == "" {
		return fail.New("You must specify a name for the token", t)
	}

	if !permission.Valid(t.Permission) {
		return fail.New("Invalid permission value", t)
	}

	if t.requester == nil {
		return fail.New("You must log in before requesting a security token", nil)
	}

	if t.Resource == "" {
		if t.Permission != "" {
			return fail.New("You must specify a resource when generating a token with permissions.", t)
		}
		return nil
	}

	prm, err := permission.Get(t.Resource)
	if err != nil {
		return err
	}
	return t.checkPermissionsLevel(prm)
}

func (t *Token) checkPermissionsLevel(prm *permission.Permission) error {
	switch t.Permission {
	case permission.Read:
		if !prm.CanRead(t.requester) {
			return fail.NewFromErr(FailTokenLevel, t)
		}
	case permission.Read + permission.Write:
		if !prm.CanRead(t.requester) || !prm.CanWrite(t.requester) {
			return fail.NewFromErr(FailTokenLevel, t)
		}
	case permission.Write:
		if !prm.CanWrite(t.requester) {
			return fail.NewFromErr(FailTokenLevel, t)
		}
	}
	return nil
}

func Get(u *user.User, token string) (*Token, error) {
	t := &Token{}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	key, err := json.Marshal(key(u.Username(), token))
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

	err = json.Unmarshal(value, t)

	if err != nil {
		return nil, err
	}

	t.requester = u

	return t, nil
}

func (t *Token) getUser(username string) error {
	if username == "" {
		errors.New("Invalid Token")
	}

	user, err := user.Get(username)
	if err != nil {
		return err
	}
	t.requester = user
	return nil
}

func key(username, token string) string {
	return username + "_" + token
}

func generateToken() string {
	result := make([]byte, 128/4)
	_, err := io.ReadFull(rand.Reader, result)
	if err != nil {
		panic(fmt.Sprintf("Error generating random values: %v", err))
	}

	return base64.StdEncoding.EncodeToString(result)
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

// User returns the user this token is granting permissions as
// but only if the token doesn't grant specific resource or permissions access
// Tokens without resource or permissions specified allow the token user to
// fully emulate the user's access
func (t *Token) User() *user.User {
	if t.Resource == "" && t.Permission == "" && !t.IsExpired() {
		return t.requester
	}
	return nil
}

// SetPermission creates the permissions to check against
// based on the token.
// token access is unauthenticated in that
// it doesn't return a *user.User if a permission and / or a resource is supplied
// so SetPermissions sets the appropriate public permissions based on token
func (t *Token) SetPermission(resource string, base *permission.Permission) {
	if t.User() != nil {
		//No change
		return
	}

	if t.Resource != "" {
		if t.Resource != resource {
			base.Public = ""
			return
		}
	}

	if t.Permission != "" {
		err := t.checkPermissionsLevel(base)
		if err != nil {
			base.Public = ""
			return
		}
		base.Public = t.Permission
		return
	}

	//No change
}
