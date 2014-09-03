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
	if errHandled(err, w) {
		return
	}
	prm := permission.Session()
	if !auth.canRead(prm) {
		four04(w, r)
		return
	}

	sessions, err := session.All(auth.User)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   sessions,
	})
}

func sessionPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Session()
	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		//should never happen
		errHandled(fail.New("You do not have proper permissions to post a new session.", nil), w)
		return
	}

	baseSession := &session.Session{}
	err = parseJson(r, baseSession)
	if errHandled(err, w) {
		return
	}

	baseSession.IpAddress = ipAddress(r)
	ses, err := session.New(auth.User, baseSession)
	if errHandled(err, w) {
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
	if errHandled(err, w) {
		return
	}

	prm := permission.Session()
	if !auth.canWrite(prm) {
		if !auth.canRead(prm) {
			four04(w, r)
			return
		}
		//should never happen
		errHandled(fail.New("You do not have proper permissions to delete a session.", nil), w)
		return
	}

	if auth.Session != nil {
		if errHandled(auth.Session.Expire(), w) {
			return
		}

	}

	cookie, err := r.Cookie(session.CookieName)

	if err != http.ErrNoCookie {
		cookie.MaxAge = 0
		cookie.Value = ""
		http.SetCookie(w, cookie)
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})

}
