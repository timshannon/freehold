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

var ErrLogonFailure = publicError(errors.New("Invalid user and / or password"))

type User struct {
	username string `json:"-"`

	Name     string `json:"name,omitempty"`
	Password []byte `json:"password,omitempty"`
	HomeApp  string `json:"name,omitempty"`
	Admin    bool   `json:"admin,omitempty"`
}

func getUser(username string) (*User, error) {
	ds := openCoreDS(userDS)
	key, err := json.Marshal(username)
	if err != nil {
		return nil, err
	}

	var value []byte
	var usr *User

	err = ds.Get(key, value)
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

func (u *User) SetPassword(password string) error {
	if len(password) < settingInt("MinPasswordLength") {
		return publicError(errors.New("Password isn't long enough."))
	}
	encPass, err := bcrypt.GenerateFromPassword([]byte(password), settingInt("PasswordBcryptWorkFactor"))
	if err != nil {
		return err
	}
	u.Password = encPass
	err = u.update()
	if err != nil {
		return err
	}

	if settingBool("LogPasswordChange") {
		logEntry(authLogType, "User "+u.username+" has changed their password.")
	}
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

	err := bcrypt.CompareHashAndPassword(u.Password, []byte(password))
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
