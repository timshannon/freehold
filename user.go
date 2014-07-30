package main

import "net/http"

func userGet(w http.ResponseWriter, r *http.Request) {

	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Settings()

	if !prm.CanRead(auth.User) {
		four04(w, r)
		return
	}

	input := &SettingInput{}
	err = parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Setting != nil {
}
func userPost(w http.ResponseWriter, r *http.Request) {
}
func userPut(w http.ResponseWriter, r *http.Request) {
}
func userDelete(w http.ResponseWriter, r *http.Request) {
}
