package main

import (
	"net/http"
	"text/template"

	"bitbucket.org/tshannon/freehold/setting"
)

func rootGet(w http.ResponseWriter, r *http.Request) {
	if firstRun {
		t, err := template.New("firstRun").Parse(firstRunAdminPage)
		if err != nil {
			panic("First Run admin template cannot be parsed!")
		}
		t.Execute(w, nil)
		return
	}
	_, pth := splitRootAndPath(r.URL.Path)
	if pth != "/" {
		four04(w, r)
		return
	}
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	if auth.User != nil {
		if auth.User.HomeApp != "" {
			serveApp(w, r, auth.User.HomeApp, auth)
			return
		}
	}

	serveResource(w, r, setting.String("PublicRootFile"), auth)
}

//Only used on first login
func rootPost(w http.ResponseWriter, r *http.Request) {
	if !firstRun {
		four04(w, r)
	}
	usrErr := makeFirstAdmin(r.FormValue("username"), r.FormValue("password"))

	if usrErr != nil {
		t, err := template.New("firstRun").Parse(firstRunAdminPage)
		if err != nil {
			panic("First Run admin template cannot be parsed!")
		}
		t.Execute(w, usrErr.Error())
		return
	}

	http.Redirect(w, r, "/", http.StatusFound)
}
