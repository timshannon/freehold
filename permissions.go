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
	Owner   string `json:"owner"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`
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
		return nil, errors.New("Permissions not found for resource: " + resource)
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
		return pubErr(errors.New("Invalid Private permission. Value must be blank, r, w, or rw"))
	}
	if !validPermission(p.Friend) {
		return pubErr(errors.New("Invalid Friend permission. Value must be blank, r, w, or rw"))
	}

	if !validPermission(p.Public) {
		return pubErr(errors.New("Invalid Public permission. Value must be blank, r, w, or rw"))
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
	if auth.Permission != "" {
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

//func canWriteRequest(w http.ResponseWriter, r *http.Request, user *User) bool {
//prm, err := permissions(r.URL.Path)
//if errHandled(err, w) {
//return false
//}
//if !prm.canWrite(user) {
//if !prm.canRead(user) {
//four04(w, r)
//return false
//}
////user can read but not write, let them know the
////file exists but they don't have permissions
//errHandled(pubErr(errors.New("You do not have permissions to update "+
//"the file "+r.URL.Path+".")), w)
//return false
//}

//return true
//}
