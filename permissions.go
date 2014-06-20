package main

import (
	"encoding/json"
	"errors"
	"strings"
)

const (
	permissionsDS = "core/permission.ds"
)

type Permission struct {
	Owner   string `json:"owner,omitempty"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`
}

type PermissionsInput struct {
	Owner   *string `json:"owner,omitempty"`
	Public  *string `json:"public,omitempty"`
	Friend  *string `json:"friend,omitempty"`
	Private *string `json:"private,omitempty"`
}

// makePermission translates a partial permissions input to a full permissions type
// by filling in the unspecfied entries from the datastore
func (pi *PermissionsInput) makePermission(resource string) (*Permission, error) {
	prm, err := permissions(resource)
	if err != nil {
		return nil, err
	}

	if pi.Owner != nil {
		prm.Owner = *pi.Owner
	}
	if pi.Public != nil {
		prm.Public = *pi.Public
	}
	if pi.Friend != nil {
		prm.Friend = *pi.Friend
	}
	if pi.Private != nil {
		prm.Private = *pi.Private
	}

	err = prm.validate()
	if err != nil {
		return nil, err
	}
	return prm, nil
}

func permissions(resource string) (*Permission, error) {
	//Docs are open to public
	if isDocPath(resource) {
		return &Permission{
			Owner:  "",
			Public: "r",
		}, nil

	}
	ds := openCoreDS(permissionsDS)
	key, err := json.Marshal(resource)
	if err != nil {
		logError(err)
		return nil, err
	}

	perm := &Permission{}

	value, err := ds.Get(key)

	if err != nil {
		logError(err)
		return nil, err
	}
	if value == nil {
		logError(errors.New("Permissions not found for resource: " + resource))

		return perm, nil
	}

	err = json.Unmarshal(value, perm)
	if err != nil {
		logError(err)
		return nil, err
	}

	return perm, nil
}

func setPermissions(resource string, permissions *Permission) error {
	err := permissions.validate()

	_, err = getUser(permissions.Owner)
	if err == ErrLogonFailure {
		return errors.New("Set permission failed because owner isn't a valid user.")
	}

	if err != nil {
		return err
	}
	ds := openCoreDS(permissionsDS)
	key, err := json.Marshal(resource)
	if err != nil {
		logError(err)
		return err
	}

	value, err := json.Marshal(permissions)
	if err != nil {
		logError(err)
		return err
	}

	err = ds.Put(key, value)
	if err != nil {
		logError(err)
		return err
	}

	return nil
}

func (p *Permission) validate() error {
	strings.ToLower(p.Private)
	strings.ToLower(p.Friend)
	strings.ToLower(p.Public)
	if !validPermission(p.Private) {
		return pubFail(errors.New("Invalid Private permission. Value must be blank, r, w, or rw"))
	}
	if !validPermission(p.Friend) {
		return pubFail(errors.New("Invalid Friend permission. Value must be blank, r, w, or rw"))
	}

	if !validPermission(p.Public) {
		return pubFail(errors.New("Invalid Public permission. Value must be blank, r, w, or rw"))
	}
	return nil
}

func validPermission(permission string) bool {
	switch permission {
	case "", "r", "w", "rw":
		return true
	default:
		return false
	}

}

func (p *Permission) canPermission(permType rune, auth *Auth) bool {
	if auth == nil { //public
		return strings.ContainsRune(p.Public, permType)
	}
	//check for security token
	if auth.Token != nil && auth.Permission != "" {
		return strings.ContainsRune(auth.Permission, permType)

	}
	if p.isOwner(auth.User) {
		return strings.ContainsRune(p.Private, permType)
	}

	//authenticated friend
	return strings.ContainsRune(p.Friend, permType)
}

func (p *Permission) canRead(auth *Auth) bool {
	return p.canPermission('r', auth)
}

func (p *Permission) canWrite(auth *Auth) bool {
	return p.canPermission('w', auth)
}

func (p *Permission) isOwner(u *User) bool {
	if p.Owner == u.username {
		return true
	}

	return false
}
