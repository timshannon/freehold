// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package user

import (
	"encoding/json"
	"errors"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/setting"

	"golang.org/x/crypto/bcrypt"
)

const (
	DS = "core/user.ds"
)

var FailLogon = errors.New("Invalid user and / or password")

type User struct {
	Name        string `json:"name,omitempty"`
	Password    string `json:"password,omitempty"`
	EncPassword []byte `json:"encPassword,omitempty"`
	HomeApp     string `json:"homeApp,omitempty"`
	Admin       bool   `json:"admin,omitempty"`

	username    string `json:"-"`
	passFromDs  []byte `json"-"`  //Set to value from DS, used for protecting password changes
	adminFromDS bool   `json:"-"` //Set to the value retrieved from the DS, used for determine when to log admin changes
}

func Get(username string) (*User, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	usr := &User{}

	err = ds.Get(username, usr)
	if err == data.ErrNotFound {
		return nil, fail.NewFromErr(FailLogon, username)
	}
	if err != nil {
		return nil, err
	}

	usr.prep(username)

	return usr, nil
}

func (u *User) prep(username string) {
	u.username = username
	u.adminFromDS = u.Admin
	u.passFromDs = u.EncPassword
	u.EncPassword = nil
	u.Password = ""
}

func All() (map[string]*User, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(nil, nil)
	if err != nil {
		return nil, err
	}

	users := make(map[string]*User)

	for iter.Next() {
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		usr := &User{}

		err = json.Unmarshal(iter.Value(), usr)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(iter.Key(), &usr.username)
		if err != nil {
			return nil, err
		}

		usr.prep(usr.username)
		users[usr.username] = usr
	}

	return users, nil
}

func New(username string, u *User) error {
	u.username = username

	err := u.validate()
	if err != nil {
		return err
	}

	if u.HomeApp == "" {
		u.HomeApp = setting.String("DefaultHomeApp")
	}
	err = u.setPassword(u.Password)
	if err != nil {
		return err
	}
	return u.Update()
}

func (u *User) validate() error {

	if u.username == "" {
		return fail.New("Username not specified, a username is required", nil)
	}

	if u.Password == "" {
		return fail.New("Password not specified, a password is required", nil)
	}

	//Check if user exists
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	value := &User{}
	err = ds.Get(u.username, value)
	if err == nil {
		u.clearPassword()
		return fail.New("User already exists", u)

	}
	if err != nil && err != data.ErrNotFound {
		return err
	}

	return nil
}

func Delete(username string) error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Delete(username)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) Update() error {
	if u.username == "" {
		return fail.New("Invalid username", u.username)
	}

	u.EncPassword = u.passFromDs
	u.Password = ""

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	err = ds.Put(u.username, u)
	if err != nil {
		return err
	}

	u.clearPassword()
	return nil
}

func (u *User) UpdatePassword(password string) error {
	err := u.setPassword(password)
	if err != nil {
		return err
	}

	err = u.Update()
	if err != nil {
		return err
	}

	if setting.Bool("LogPasswordChange") {
		log.NewEntry(log.AuthType, "User "+u.username+" has changed their password.")
	}
	return nil
}

func (u *User) setPassword(password string) error {
	if len(password) < setting.Int("MinPasswordLength") {
		u.clearPassword()
		return fail.New("Password isn't long enough.", u)
	}
	encPass, err := bcrypt.GenerateFromPassword([]byte(password), setting.Int("PasswordBcryptWorkFactor"))
	if err != nil {
		return err
	}
	u.passFromDs = encPass
	u.Password = ""

	return nil
}

func (u *User) Login(password string) error {
	if u.username == "" {
		return loginFailure(u)
	}

	if len(password) < setting.Int("MinPasswordLength") {
		return loginFailure(u)
	}

	err := bcrypt.CompareHashAndPassword(u.passFromDs, []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return loginFailure(u)
		}
		return err
	}
	if setting.Bool("LogSuccessAuth") {
		log.NewEntry(log.AuthType, "User "+u.username+" has logged in successfully.")
	}
	//done with password, clear it
	u.clearPassword()

	return nil
}

func (u *User) Username() string {
	return u.username
}

func (u *User) clearPassword() {
	u.Password = ""
	u.EncPassword = nil
}

func loginFailure(u *User) error {
	if setting.Bool("LogFailedAuth") {
		log.NewEntry(log.AuthType, "User "+u.username+" has failed a login attempt.")
	}

	u.clearPassword()
	return fail.NewFromErr(FailLogon, u.username)

}
