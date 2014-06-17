package main

import "net/http"

func sessionGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}
	if auth == nil {
		four04(w, r)
		return
	}
}

func sessionPost(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
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
	if auth == nil {
		four04(w, r)
		return
	}

	if auth.Session != nil {
		if errHandled(auth.Session.expire(), w) {
			return
		}
	}

	cookie, err := r.Cookie(cookieName)

	if err != http.ErrNoCookie {
		cookie.MaxAge = 0
		cookie.Value = ""
		http.SetCookie(w, cookie)
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
	})

}
