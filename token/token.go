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
	"strings"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/token.ds"
)

var FailTokenLevel = errors.New("Token grants more permissions than requester has.")

type Token struct {
	Token      string `json:"token,omitempty"`
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:permission,omitempty"`
	Created    string `json:"created,omitempty"`

	requester *user.User `json:"_"`
}

func New(t *Token, requester *user.User) (*Token, error) {
	t.requester = requester

	err := t.verify()
	if err != nil {
		return nil, err
	}
	t.Token = generateToken()

	t.Created = time.Now().Format(time.RFC3339)

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	err = ds.Put(key(t.requester.Username(), t.Token), t)
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

	k := key(u.Username(), token)
	err = ds.Get(k, t)
	if err == data.ErrNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	t.requester = u

	if t.IsExpired() && setting.Bool("RemoveExpiredTokens") {
		err = ds.Delete(k)
		if err != nil {
			return nil, err
		}
	}

	return t, nil
}

func All(u *user.User) ([]*Token, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	from, err := json.Marshal(u.Username())
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(from, nil)
	if err != nil {
		return nil, err
	}

	tokens := make([]*Token, 0)

	for iter.Next() {

		t := &Token{}
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		err = json.Unmarshal(iter.Value(), t)
		if err != nil {
			return nil, err
		}

		t.requester = u

		tokens = append(tokens, t)
	}

	return tokens, nil
}

func Delete(u *user.User, token string) error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Delete(key(u.Username(), token))
	if err != nil {
		return err
	}

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

	b64 := base64.StdEncoding.EncodeToString(result)
	//make token url safe
	return strings.Replace(strings.Replace(b64, "+", "-", -1), "/", "_", -1)
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
// the token doesn't have a *user.User if a permission and / or a resource is supplied
// so SetPermissions sets the appropriate public permissions based on token
func (t *Token) SetPermission(base *permission.Permission) {
	if t.User() != nil {
		//No change
		return
	}

	if t.Resource != "" {
		if t.Resource != base.Resource() {
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
