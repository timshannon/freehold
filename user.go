// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
	"bitbucket.org/tshannon/freehold/user"
)

type userInput struct {
	User     *string `json:"user,omitempty"`
	Name     *string `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	HomeApp  *string `json:"homeApp,omitempty"`
	Admin    *bool   `json:"admin,omitempty"`
}

func userGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	prm := permission.User("")

	if !prm.CanRead(auth.User) {
		four04(w, r)
		return
	}

	input := &userInput{}
	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.User != nil {
		u, err := user.Get(*input.User)

		if errHandled(err, w, auth) {
			return
		}

		if u == nil {
			four04(w, r)
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   u,
		})
		return
	}

	users, err := user.All()
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   users,
	})
	return
}

func userPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	prm := permission.User("")

	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to post a new user", nil), w, auth)
		return
	}

	input := &userInput{}
	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.User == nil {
		errHandled(fail.New("Invalid user input. User field is required", input), w, auth)
		return
	}

	newUsr := input.makeUser(&user.User{})

	err = user.New(*input.User, newUsr)
	if errHandled(err, w, auth) {
		return
	}

	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   newUsr,
	})
	return

}

func userPut(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	input := &userInput{}
	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.User == nil {
		cur := auth.User.Username()
		input.User = &cur
	}

	prm := permission.User(*input.User)

	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to update this user.", input), w, auth)
		return
	}

	usr, err := user.Get(*input.User)
	if fail.IsEqual(err, user.ErrLogon) {
		err = fail.New("Invalid user", input)
	}
	if errHandled(err, w, auth) {
		return
	}

	if input.isMakeAdmin() {

		prm = permission.UserMakeAdmin()
		if !prm.CanWrite(auth.User) {
			errHandled(fail.New("Invalid permissions.  Admin is required to make a new admin user.", input), w, auth)
			return
		}
		if setting.Bool("LogAdminChange") {
			log.NewEntry(log.AuthType, "User "+usr.Username()+" has been made an admin by "+auth.Username)
		}
	}

	if input.isRemoveAdmin() {
		prm = permission.UserRemoveAdmin(*input.User)
		if !prm.CanWrite(auth.User) {
			errHandled(fail.New("You do not have permissions to remove admin rights.", input), w, auth)
			return
		}
		if setting.Bool("LogAdminChange") {
			log.NewEntry(log.AuthType, "User "+usr.Username()+" has removed their admin rights.")
		}

	}

	newUsr := input.makeUser(usr)
	if input.isPasswordChange() {
		err = newUsr.UpdatePassword(*input.Password)
		if errHandled(err, w, auth) {
			return
		}
	}

	err = newUsr.Update()
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   newUsr,
	})
	return

}

func userDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	input := &userInput{}
	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.User == nil {
		errHandled(fail.New("Invalid user input. User field is required", input), w, auth)
		return
	}
	prm := permission.User(*input.User)

	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		errHandled(fail.New("You do not have permissions to delete this user.", input), w, auth)
		return
	}

	err = user.Delete(*input.User)
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})
	return

}

func (ui *userInput) makeUser(curUsr *user.User) *user.User {
	usr := *curUsr

	if ui.Name != nil {
		usr.Name = *ui.Name
	}

	if ui.HomeApp != nil {
		usr.HomeApp = *ui.HomeApp
	}

	if ui.Admin != nil {
		usr.Admin = *ui.Admin
	}

	if ui.Password != nil {
		usr.Password = *ui.Password
	}

	return &usr
}

func (ui *userInput) isPasswordChange() bool {
	return ui.Password != nil
}

func (ui *userInput) isMakeAdmin() bool {
	return ui.Admin != nil && *ui.Admin
}

func (ui *userInput) isRemoveAdmin() bool {
	return ui.Admin != nil && !*ui.Admin
}
