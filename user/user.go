package user

import (
	"encoding/json"
	"errors"

	"bitbucket.org/tshannon/freehold/datastore"
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
	username string `json:"-"`

	Name        string `json:"name,omitempty"`
	Password    string `json:"password,omitempty"`
	EncPassword []byte `json:"encPassword,omitempty"`
	HomeApp     string `json:"name,omitempty"`
	Admin       bool   `json:"admin,omitempty"`
}

func Get(username string) (*User, error) {
	ds, err := datastore.OpenCoreDS(DS)
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
	usr.username = username

	return usr, nil
}

func New(u *User) error {
	//Check if user exists
	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return err
	}
	key, err := json.Marshal(u.username)
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
		u.clearPassword()
		return fail.New("User already exists", u)
	}

	err = u.SetPassword(u.Password)
	if err != nil {
		return err
	}
	return u.update()
}

func (u *User) update() error {
	if u.username == "" {
		return fail.New("Invalid username", u.username)
	}

	ds, err := datastore.OpenCoreDS(DS)
	if err != nil {
		return err
	}
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
		log.NewEntry(authLogType, "User "+u.username+" has changed their password.")
	}
	return nil
}

func (u *User) SetPassword(password string) error {
	if len(password) < setting.Int("MinPasswordLength") {
		u.clearPassword()
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
	if u.username == "" {
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
		log.NewEntry(authLogType, "User "+u.username+" has logged in successfully.")
	}
	//done with password, clear it
	u.clearPassword()

	return nil
}

func (u *User) clearPassword() {
	u.Password = ""
	u.EncPassword = nil
}

func (u *User) Username() string {
	return u.username
}

func loginFailure(u *User) error {
	if setting.Bool("LogFailedAuth") {
		log.NewEntry(authLogType, "User "+u.username+" has failed a login attempt.")
	}
	u.clearPassword()
	return fail.NewFromErr(FailLogon, u)

}