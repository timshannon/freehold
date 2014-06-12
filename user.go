package main

import (
	"encoding/json"
	"errors"

	"code.google.com/p/go.crypto/bcrypt"
)

const (
	userDS      = "core/user.ds"
	authLogType = "authentication"
)

var ErrLogonFailure = pubErr(errors.New("Invalid user and / or password"))

type User struct {
	username string `json:"-"`

	Name        string `json:"name,omitempty"`
	Password    string `json:"password,omitempty"`
	EncPassword []byte `json:"encPassword,omitempty"`
	HomeApp     string `json:"name,omitempty"`
	Admin       bool   `json:"admin,omitempty"`
}

func getUser(username string) (*User, error) {
	ds := openCoreDS(userDS)
	key, err := json.Marshal(username)
	if err != nil {
		return nil, err
	}

	var usr *User

	value, err := ds.Get(key)
	if err != nil {
		return nil, err
	}
	if value == nil {
		return nil, errors.New("User does not exist.")
	}

	err = json.Unmarshal(value, usr)
	if err != nil {
		return nil, err
	}
	usr.username = username

	return usr, nil
}

func newUser(u *User) error {
	//Check if user exists
	ds := openCoreDS(userDS)
	key, err := json.Marshal(u.username)
	if err != nil {
		return err
	}

	value, err := ds.Get(key)
	if err != nil {
		return err
	}
	if value != nil {
		return pubErr(errors.New("User already exists"))
	}

	err = u.setPassword(u.Password)
	if err != nil {
		return err
	}
	return u.update()
}

func (u *User) update() error {
	if u.username == "" {
		return errors.New("Invalid user")
	}

	ds := openCoreDS(userDS)
	key, err := json.Marshal(u.username)
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

func (u *User) updatePassword(password string) error {
	err := u.setPassword(password)
	if err != nil {
		return err
	}

	err = u.update()
	if err != nil {
		return err
	}

	if settingBool("LogPasswordChange") {
		logEntry(authLogType, "User "+u.username+" has changed their password.")
	}
	return nil
}

func (u *User) setPassword(password string) error {
	if len(password) < settingInt("MinPasswordLength") {
		return pubErr(errors.New("Password isn't long enough."))
	}
	encPass, err := bcrypt.GenerateFromPassword([]byte(password), settingInt("PasswordBcryptWorkFactor"))
	if err != nil {
		return err
	}
	u.EncPassword = encPass
	u.Password = ""
	return nil
}

func (u *User) login(password string) error {
	if u.username == "" {
		return ErrLogonFailure
	}

	//TODO: Rate limit login attempts
	if len(password) < settingInt("MinPasswordLength") {
		if settingBool("LogFailedAuth") {
			logEntry(authLogType, "User "+u.username+" has failed a login attempt.")
		}
		return ErrLogonFailure
	}

	err := bcrypt.CompareHashAndPassword(u.EncPassword, []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			if settingBool("LogFailedAuth") {
				logEntry(authLogType, "User "+u.username+" has failed a login attempt.")
			}
			return ErrLogonFailure
		}
		return err
	}
	if settingBool("LogSuccessAuth") {
		logEntry(authLogType, "User "+u.username+" has logged in successfully.")
	}

	return nil
}
