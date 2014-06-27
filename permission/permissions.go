package permission

import (
	"encoding/json"
	"errors"
	"strings"

	"bitbucket.org/tshannon/freehold/datastore"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/permission.ds"

	Read  = "r"
	Write = "w"
)

type Permission struct {
	Owner   string `json:"owner,omitempty"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`
	admin   string `json:"-"`
}

func Get(resource string) (*Permission, error) {
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	key, err := json.Marshal(resource)
	if err != nil {
		return nil, err
	}

	value, err := ds.Get(key)

	if err != nil {
		return nil, err
	}

	prm := &Permission{}
	if value == nil {
		log.Error(errors.New("Permissions not found for resource: " + resource))
		return prm, nil
	}

	err = json.Unmarshal(value, prm)
	if err != nil {
		return nil, err
	}

	return prm, nil
}

func Set(resource string, permissions *Permission) error {
	err := permissions.validate()

	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(resource)
	if err != nil {
		return err
	}

	value, err := json.Marshal(permissions)
	if err != nil {
		return err
	}

	err = ds.Put(key, value)
	if err != nil {
		return err
	}

	return nil
}

func (p *Permission) validate() error {
	strings.ToLower(p.Private)
	strings.ToLower(p.Friend)
	strings.ToLower(p.Public)
	if !Valid(p.Private) {
		return fail.New("Invalid Private permission. Value must be blank, r, w, or rw", p)
	}
	if !Valid(p.Friend) {
		return fail.New("Invalid Friend permission. Value must be blank, r, w, or rw", p)
	}

	if !Valid(p.Public) {
		return fail.New("Invalid Public permission. Value must be blank, r, w, or rw", p)
	}

	_, err := user.Get(p.Owner)
	if fail.IsEqual(user.FailLogon, err) {
		return fail.New("Set permission failed because owner isn't a valid user.", p)
	}

	return err
}

func Valid(permission string) bool {
	switch permission {
	case "", Read, Write, Read + Write:
		return true
	default:
		return false
	}

}

func (p *Permission) can(permType rune, u *user.User) bool {
	if p.admin != "" {
		if !u.Admin {
			return false
		}
		return strings.ContainsRune(p.admin, permType)
	}

	if u == nil { //public
		return strings.ContainsRune(p.Public, permType)
	}

	if p.isOwner(u) {
		return strings.ContainsRune(p.Private, permType)
	}

	//authenticated friend
	return strings.ContainsRune(p.Friend, permType)
}

func (p *Permission) CanRead(u *user.User) bool {
	return p.can(rune(Read[0]), u)
}

func (p *Permission) CanWrite(u *user.User) bool {
	return p.can(rune(Write[0]), u)
}

func (p *Permission) isOwner(u *user.User) bool {
	if u == nil {
		return false
	}
	if p.Owner == u.Username() {
		return true
	}

	return false
}

func removeWrite(permission string) {
	strings.TrimRight(permission, Write)
}

func removeRead(permission string) {
	strings.TrimRight(permission, Write)
}