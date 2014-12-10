// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package permission

import (
	"errors"
	"strings"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"
)

const (
	DS = "core/permission.ds"

	Read  = "r"
	Write = "w"

	INVALID_ID = ""
)

type Permitter interface {
	ID() string
	Permission() (*Permission, error)
}

type Permission struct {
	Owner   string `json:"owner,omitempty"`
	Public  string `json:"public,omitempty"`
	Friend  string `json:"friend,omitempty"`
	Private string `json:"private,omitempty"`

	admin string `json:"-"`
}

//Get the permissions by ID what the ID is will depend on the resource
func Get(ptr Permitter) (*Permission, error) {
	if ptr.ID() == INVALID_ID {
		return nil, errors.New("Invalid resource id")
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	prm := &Permission{}
	err = ds.Get(ptr.ID(), prm)
	if err == data.ErrNotFound {
		return orphanedResource(ptr)
	}

	if err != nil {
		return nil, err
	}

	return prm, nil
}

func orphanedResource(ptr Permitter) (*Permission, error) {
	o := setting.String("OrphanedPermissionOwner")
	if o == "" {
		return &Permission{}, nil
	}
	prm := FileNewDefault(o)
	err := Set(ptr, prm)
	if err != nil {
		return nil, err
	}
	return prm, nil
}

func Set(ptr Permitter, permissions *Permission) error {
	if ptr.ID() == INVALID_ID {
		return errors.New("Invalid resource id")
	}

	err := permissions.validate()
	if err != nil {
		return err
	}
	return set(ptr.ID(), permissions)
}

//allows for skipping permissions validation
func set(id string, permissions *Permission) error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Put(id, permissions)
	if err != nil {
		return err
	}

	return nil
}

func Delete(ptr Permitter) error {
	if ptr.ID() == INVALID_ID {
		return errors.New("Invalid resource id")
	}
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Delete(ptr.ID())
	if err != nil {
		return err
	}

	return nil
}

func Move(from, to Permitter) error {
	prm, err := Get(from)
	if err != nil {
		return err
	}

	err = Delete(from)
	if err != nil {
		return err
	}

	return Set(to, prm)
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
	if err != nil {
		if fail.IsEqual(user.FailLogon, err) {
			return fail.New("Set permission failed because owner isn't a valid user.", p)
		}
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

	if u == nil { //public
		return strings.ContainsRune(p.Public, permType)
	}

	if u.Admin && p.admin != "" {
		return strings.ContainsRune(p.admin, permType)
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
	if u == nil || p.Owner == "" {
		return false
	}

	return p.Owner == u.Username()
}

func removeWrite(permission *string) {
	*permission = strings.TrimRight(*permission, Write)
}

func removeRead(permission *string) {
	*permission = strings.TrimRight(*permission, Read)
}
