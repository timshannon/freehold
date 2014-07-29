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

	"code.google.com/p/go.crypto/bcrypt"
)

const (
	DS          = "core/user.ds"
	authLogType = "authentication"
)

var FailLogon = errors.New("Invalid user and / or password")

type User struct {
	User        string `json:"user,omitempty"`
	Name        string `json:"name,omitempty"`
	Password    string `json:"password,omitempty"`
	EncPassword []byte `json:"encPassword,omitempty"`
	HomeApp     string `json:"homeApp,omitempty"`
	Admin       bool   `json:"admin,omitempty"`
}

func Get(username string) (*User, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}
	key, err := json.Marshal(username)
	if err != nil {
		return nil, err
	}

	usr := &User{}

	value, err := ds.Get(key)
	if err != nil {
		return nil, err
	}
	if value == nil {
		return nil, fail.NewFromErr(FailLogon, username)
	}

	err = json.Unmarshal(value, usr)
	if err != nil {
		return nil, err
	}
	usr.User = username

	return usr, nil
}

func New(username string, u *User) error {
	u.User = username
	//Check if user exists
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(u.User)
	if err != nil {
		return err
	}

	if u.HomeApp == "" {
		u.HomeApp = setting.String("DefaultHomeApp")
	}

	value, err := ds.Get(key)
	if err != nil {
		return err
	}
	if value != nil {
		u.ClearPassword()
		return fail.New("User already exists", u)
	}

	err = u.SetPassword(u.Password)
	if err != nil {
		return err
	}
	return u.update()
}

func Delete(username string) error {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(username)
	if err != nil {
		return err
	}

	err = ds.Delete(key)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) update() error {
	if u.User == "" {
		return fail.New("Invalid username", u.User)
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(u.User)
	if err != nil {
		return err
	}

	value, err := json.Marshal(u)
	if err != nil {
		return err
	}

	err = ds.Put(key, value)
	if err != nil {
		return err
	}
	return nil
}

func (u *User) UpdatePassword(password string) error {
	err := u.SetPassword(password)
	if err != nil {
		return err
	}

	err = u.update()
	if err != nil {
		return err
	}

	if setting.Bool("LogPasswordChange") {
		log.NewEntry(authLogType, "User "+u.User+" has changed their password.")
	}
	return nil
}

func (u *User) SetPassword(password string) error {
	if len(password) < setting.Int("MinPasswordLength") {
		u.ClearPassword()
		return fail.New("Password isn't long enough.", u)
	}
	encPass, err := bcrypt.GenerateFromPassword([]byte(password), setting.Int("PasswordBcryptWorkFactor"))
	if err != nil {
		return err
	}
	u.EncPassword = encPass
	u.Password = ""
	return nil
}

func (u *User) Login(password string) error {
	if u.User == "" {
		return loginFailure(u)
	}

	//TODO: Rate limit login attempts? Or rate limit all public requests?
	if len(password) < setting.Int("MinPasswordLength") {
		return loginFailure(u)
	}

	err := bcrypt.CompareHashAndPassword(u.EncPassword, []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return loginFailure(u)
		}
		return err
	}
	if setting.Bool("LogSuccessAuth") {
		log.NewEntry(authLogType, "User "+u.User+" has logged in successfully.")
	}
	//done with password, clear it
	u.ClearPassword()

	return nil
}

func (u *User) ClearPassword() {
	u.Password = ""
	u.EncPassword = nil
}

func loginFailure(u *User) error {
	if setting.Bool("LogFailedAuth") {
		log.NewEntry(authLogType, "User "+u.User+" has failed a login attempt.")
	}
	u.ClearPassword()
	return fail.NewFromErr(FailLogon, u.User)

}
