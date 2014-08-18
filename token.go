// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/token"
)

type TokenInput struct {
	Token      *string `json:"token,omitempty"`
	Name       *string `json:"name,omitempty"`
	Expires    *string `json:"expires,omitempty"`
	Resource   *string `json:"resource,omitempty"`
	Permission *string `json"permission,omitempty"`
}

func tokenGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Token(auth.User.Username())
	if !auth.canRead(prm) {
		four04(w, r)
		return
	}

	input := &TokenInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Token != nil {
		t, err := token.Get(auth.User, *input.Token)
		if errHandled(err, w) {
			return
		}

		if t == nil {
			four04(w, r)
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   t,
		})
		return
	}

	tokens, err := token.All(auth.User)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   tokens,
	})

}

func tokenPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	input := &TokenInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Name == nil {
		errHandled(fail.New("You must specify a name for the new token.", input), w)
		return
	}

	prm := permission.Token(auth.User.Username())

	if !auth.canWrite(prm) {
		errHandled(fail.New("You do not have permissions to generate a new token.", input), w)
		return
	}

	tkn := input.makeToken()

	tkn, err = token.New(tkn, auth.User)
	if errHandled(err, w) {
		return
	}

	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   tkn,
	})
	return

}

func tokenDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Token(auth.User.Username())
	if !auth.canWrite(prm) {
		four04(w, r)
		return
	}

	input := &TokenInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Token == nil {
		errHandled(fail.New("You must specify a token to delete.", input), w)
		return
	}

	err = token.Delete(auth.User, *input.Token)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})

}

func (ti *TokenInput) makeToken() *token.Token {
	t := &token.Token{}

	if ti.Name != nil {
		t.Name = *ti.Name
	}
	if ti.Expires != nil {
		t.Expires = *ti.Expires
	}
	if ti.Resource != nil {
		t.Resource = *ti.Resource
	}
	if ti.Permission != nil {
		t.Permission = *ti.Permission
	}
	return t
}
