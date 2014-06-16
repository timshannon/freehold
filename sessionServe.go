package main

import "net/http"

func sessionGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(r)
	if errHandled(err, w) {
		return
	}
	if auth == nil {
		four04(w, r)
		return
	}
}

func sessionPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(r)
	if errHandled(err, w) {
		return
	}
	if auth == nil {
		four04(w, r)
		return
	}

	baseSession := &Session{}
	err = parseJson(r, baseSession)
	if errHandled(err, w) {
		return
	}
	cookie, err := newSession(auth, baseSession)
	if errHandled(err, w) {
		return
	}
	http.SetCookie(w, cookie)
}

func sessionDelete(w http.ResponseWriter, r *http.Request) {

}
