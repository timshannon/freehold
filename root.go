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
	if r.URL.Path != "/" {
		four04(w, r)
		return
	}
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	var homeFile string
	if auth.User != nil {
		homeFile = auth.User.HomeApp
	}

	if homeFile == "" {
		homeFile = setting.String("PublicRootFile")
	}

	serveResource(w, r, homeFile, auth)
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
