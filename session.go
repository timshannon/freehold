// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/session"
)

func sessionGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}
	prm := permission.Session()
	if !prm.CanRead(auth.User) {
		four04(w, r)
		return
	}

	sessions, err := session.All(auth.User)
	if errHandled(err, w, auth) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   sessions,
	})
}

func sessionPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	if auth.AuthType != authTypeBasic {
		errHandled(fail.New("Sessions cannot be generated from a security Token or another session.", nil), w, auth)
		return
	}

	prm := permission.Session()
	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		//should never happen
		errHandled(fail.NewFromErr(ErrNoWritePermission, nil), w, auth)
		return
	}

	baseSession := &session.Session{}
	err = parseJSON(r, baseSession)
	if errHandled(err, w, auth) {
		return
	}

	baseSession.IPAddress = ipAddress(r)
	baseSession.UserAgent = r.UserAgent()
	ses, err := session.New(auth.User, baseSession)
	if errHandled(err, w, auth) {
		return
	}

	http.SetCookie(w, ses.Cookie(isSSL))
	w.WriteHeader(http.StatusCreated)
	respondJsend(w, &JSend{
		Status: statusSuccess,
	})
}

func sessionDelete(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	prm := permission.Session()
	if !prm.CanWrite(auth.User) {
		if !prm.CanRead(auth.User) {
			four04(w, r)
			return
		}
		//should never happen
		errHandled(fail.NewFromErr(ErrNoWritePermission, nil), w, auth)
		return
	}

	input := &session.Session{}
	err = parseJSON(r, input)
	if errHandled(err, w, auth) {
		return
	}

	ses := auth.Session

	if input.ID != "" && input.ID != ses.ID {
		ses, err = session.GetByID(input.ID, auth.User)
		if errHandled(err, w, auth) {
			return
		}
		if ses == nil {
			four04(w, r)
			return
		}
	}

	if errHandled(ses.Expire(), w, auth) {
		return
	}

	cookie, err := r.Cookie(session.CookieName)

	if err != http.ErrNoCookie {
		if cookie.Value == ses.Key() {
			cookie.MaxAge = 0
			cookie.Value = ""
			http.SetCookie(w, cookie)
		}
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})

}
