package token

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"time"

	"bitbucket.org/tshannon/freehold/datastore"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/token.ds"
)

type Requester interface {
	User() *user.User
}

type Token struct {
	Name       string `json:"name,omitempty"`
	Expires    string `json:"expires,omitempty"`
	Resource   string `json:"resource,omitempty"`
	Permission string `json:permission,omitempty"`

	requester Requester `json:"_"`
	token     string    `json:"-"`
}

func New(t *Token, r Requester) (*Token, error) {
	t.requester = r

	err := t.verify()
	if err != nil {
		return nil, err
	}
	t.token = generateToken()

	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	key, err := json.Marshal(key(r, t.token))
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
		return errors.New("requester is not set in the token")
	}

	if t.requester.User() == nil {
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

	switch t.Permission {
	case "r":
		if !prm.CanRead(t.requester) {
			return fail.New("You can't grant read permissions for a resource you can't read from.", t)
		}
	case "rw":
		if !prm.CanRead(t.requester) || !prm.CanWrite(t.requester) {
			return fail.New("You can't grant read/write permissions for a resource you can't read from / write to.", t)
		}
	case "w":
		if !prm.CanWrite(t.requester) {
			return fail.New("You can't grant write permissions for a resource you can't write to.", t)
		}
	}

	return nil
}

func key(r Requester, token string) string {
	return r.User().Username() + "_" + token
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
		return t.requester.User()
	}
	return nil
}
