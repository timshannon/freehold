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
	"unicode/utf8"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/data/store"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	// DS is the location of the token datastore
	DS = "core/token.ds"
)

// ErrTokenLevel is when a token is created that grants more permissions than the requester has
var ErrTokenLevel = errors.New("Token grants permissions that the requester does not currently have.")

// Token grants access to everything a user can access, or access just to a specific resource and permissions level
type Token struct {
	Token      string `json:"token,omitempty"` // Unique identifier used for authentication
	ID         string `json:"id,omitempty"`    //Unique identifier used for identification
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:"permission,omitempty"`
	Created    string `json:"created,omitempty"`

	requester *user.User `json:"_"`
	resource  *resource.File
}

// New creates a new token
func New(t *Token, requester *user.User) (*Token, error) {
	t.requester = requester
	t.resource = resource.NewFile(t.Resource)

	err := t.verify()
	if err != nil {
		return nil, err
	}
	t.Token = generateToken()
	t.ID = generateID()

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

	if t.expireTime().IsZero() {
		t.Expires = time.Now().AddDate(0, 0, setting.Int("TokenMaxDaysTillExpire")).Format(time.RFC3339)
	}
	if t.expireTime().After(time.Now().AddDate(0, 0, setting.Int("TokenMaxDaysTillExpire"))) {
		return fail.New("Token Expiration date is set too far into the future.  See TokenMaxDaysTillExpire setting.", t)
	}

	if t.Resource == "" {
		if t.Permission != "" {
			return fail.New("You must specify a resource when generating a token with permissions.", t)
		}
		return nil
	}

	prm, err := permission.Get(t.resource)
	if err != nil {
		return err
	}
	return t.checkPermissionsLevel(prm)
}

func (t *Token) checkPermissionsLevel(prm *permission.Permission) error {
	switch t.Permission {
	case permission.Read:
		if !prm.CanRead(t.requester) {
			return fail.NewFromErr(ErrTokenLevel, t)
		}
	case permission.Read + permission.Write:
		if !prm.CanRead(t.requester) || !prm.CanWrite(t.requester) {
			return fail.NewFromErr(ErrTokenLevel, t)
		}
	case permission.Write:
		if !prm.CanWrite(t.requester) {
			return fail.NewFromErr(ErrTokenLevel, t)
		}
	}
	return nil
}

// Get retrieves a token based on the passed in ID and user
func Get(u *user.User, id string) (*Token, error) {
	t, err := get(u, id)
	if err != nil {
		return nil, err
	}
	t.Token = ""
	return t, nil
}

func get(u *user.User, id string) (*Token, error) {
	iter, err := iter(u)
	if err != nil {
		return nil, err
	}

	for iter.Next() {

		t := &Token{}
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		k := ""

		err = json.Unmarshal(iter.Key(), &k)
		if err != nil {
			return nil, err
		}
		if username(k) != u.Username() {
			continue
		}

		err = json.Unmarshal(iter.Value(), t)
		if err != nil {
			return nil, err
		}

		if t.IsExpired() && setting.Bool("RemoveExpiredTokens") {
			ds, err := data.OpenCoreDS(DS)
			if err != nil {
				return nil, err
			}
			err = ds.Delete(k)
			if err != nil {
				return nil, err
			}
			continue
		}

		t.requester = u
		if t.ID == id {
			return t, nil
		}

	}

	return nil, fail.NewFromErr(data.ErrNotFound, id)
}

// Login attempts to login with the given token
func Login(u *user.User, tkn string) (*Token, error) {
	t := &Token{}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	k := key(u.Username(), tkn)
	err = ds.Get(k, t)
	if err == data.ErrNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	t.requester = u
	if t.Resource != "" {
		t.resource = resource.NewFile(t.Resource)
	}

	if t.IsExpired() && setting.Bool("RemoveExpiredTokens") {
		err = ds.Delete(k)
		if err != nil {
			return nil, err
		}
	}
	t.Token = ""

	return t, nil
}

func iter(u *user.User) (store.Iterator, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	from, err := json.Marshal(u.Username())
	if err != nil {
		return nil, err
	}

	to, err := json.Marshal(u.Username() + string(utf8.MaxRune))
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(from, to)
	defer iter.Close()
	if err != nil {
		return nil, err
	}
	return iter, nil
}

// All retrieves all tokens for the user
func All(u *user.User) ([]*Token, error) {
	iter, err := iter(u)
	if err != nil {
		return nil, err
	}

	var tokens []*Token

	for iter.Next() {

		t := &Token{}
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		k := ""

		err = json.Unmarshal(iter.Key(), &k)
		if err != nil {
			return nil, err
		}
		if username(k) != u.Username() {
			continue
		}

		err = json.Unmarshal(iter.Value(), t)
		if err != nil {
			return nil, err
		}

		if t.IsExpired() && setting.Bool("RemoveExpiredTokens") {
			ds, err := data.OpenCoreDS(DS)
			if err != nil {
				return nil, err
			}
			err = ds.Delete(k)

			if err != nil {
				return nil, err
			}
			continue
		}

		t.requester = u
		t.Token = ""

		tokens = append(tokens, t)
	}

	return tokens, nil
}

// Delete deletes a token
func Delete(u *user.User, id string) error {
	tkn, err := get(u, id)
	if err != nil {
		return err
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Delete(key(u.Username(), tkn.Token))
	if err != nil {
		return err
	}

	return nil
}

func key(username, tkn string) string {
	return username + "_" + tkn
}

func username(key string) string {
	return strings.Split(key, "_")[0]
}

func generateID() string {
	b := make([]byte, 16)
	_, err := io.ReadFull(rand.Reader, b)
	if err != nil {
		panic(fmt.Sprintf("Error generating random values: %v", err))
	}

	return fmt.Sprintf("%x%x%x%x%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:])
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

// IsExpired is whether or not the given token is expired
func (t *Token) IsExpired() bool {
	if t.Expires == "" {
		return true
	}

	e := t.expireTime()
	return e.Before(time.Now())
}

func (t *Token) expireTime() time.Time {
	if t.Expires == "" {
		return time.Time{}
	}

	tm, err := time.Parse(time.RFC3339, t.Expires)
	if err != nil {
		log.Error(errors.New("Error parsing token expiration: " + err.Error()))
		return time.Time{}
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

// GetPermission creates the permissions to check against
// based on the token.
// token access is unauthenticated in that
// the token doesn't have a *user.User if a permission and / or a resource is supplied
// so SetPermissions sets the appropriate public permissions based on token
func (t *Token) GetPermission(res permission.Permitter) (*permission.Permission, error) {
	if t.User() != nil {
		//No change
		return res.Permission()
	}

	if t.Resource != "" {
		if t.resource.ID() != res.ID() {
			return &permission.Permission{}, nil
		}
	}

	prm, err := res.Permission()
	if err != nil {
		return nil, err
	}
	if t.Permission != "" {

		err = t.checkPermissionsLevel(prm)
		if err != nil {
			return nil, err
		}
		prm.Public = t.Permission
	} else {
		if t.User().Username() == prm.Owner {
			prm.Public = prm.Private
		} else {
			prm.Public = prm.Friend
		}
	}

	return prm, nil
}
