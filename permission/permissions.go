package permission

import (
	"encoding/json"
	"errors"
	"strings"

	"bitbucket.org/tshannon/freehold/datastore"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/paths"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/permission.ds"
)

type Permission struct {
	Owner   string `json:"owner,omitempty"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`
}

func Get(resource string) (*Permission, error) {
	//Docs are open to public
	if paths.IsDocPath(resource) {
		return &Permission{
			Owner:  "",
			Public: "r",
		}, nil

	}
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	key, err := json.Marshal(resource)
	if err != nil {
		return nil, err
	}

	perm := &Permission{}

	value, err := ds.Get(key)

	if err != nil {
		return nil, err
	}
	if value == nil {
		log.Error(errors.New("Permissions not found for resource: " + resource))
		return perm, nil
	}

	err = json.Unmarshal(value, perm)
	if err != nil {
		return nil, err
	}

	return perm, nil
}

func Set(resource string, permissions *Permission) error {
	err := permissions.validate()

	_, err = user.Get(permissions.Owner)
	if fail.IsEqual(user.FailLogon, err) {
		return fail.New("Set permission failed because owner isn't a valid user.", permissions)
	}

	if err != nil {
		return err
	}
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
	return nil
}

func Valid(permission string) bool {
	switch permission {
	case "", "r", "w", "rw":
		return true
	default:
		return false
	}

}

// Accessor defines the behavior required for
// something accessing a resource
type Accessor interface {
	User() *user.User
}

func (p *Permission) can(permType rune, a Accessor) bool {
	if a.User() == nil { //public
		return strings.ContainsRune(p.Public, permType)
	}

	if p.IsOwner(a) {
		return strings.ContainsRune(p.Private, permType)
	}

	//authenticated friend
	return strings.ContainsRune(p.Friend, permType)
}

func (p *Permission) CanRead(a Accessor) bool {
	return p.can('r', a)
}

func (p *Permission) CanWrite(a Accessor) bool {
	return p.can('w', a)
}

func (p *Permission) IsOwner(a Accessor) bool {
	if a.User() == nil {
		return false
	}
	if p.Owner == a.User().Username() {
		return true
	}

	return false
}
