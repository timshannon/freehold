package main

import (
	"net/http"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/setting"
)

type SettingInput struct {
	Setting *string     `json:"setting,omitempty"`
	Value   interface{} `json:"value,omitempty"`
}

func settingsGet(w http.ResponseWriter, r *http.Request) {
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
		s, err := setting.Get(*input.Setting)

		if errHandled(err, w) {
			return
		}

		if s == nil {
			four04(w, r)
			return
		}
		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data:   s,
		})
		return
	}

	settings, err := setting.All()
	if errHandled(err, w) {
		return
	}
	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   settings,
	})
	return

}

func settingsPut(w http.ResponseWriter, r *http.Request) {
	input := &SettingInput{}

	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Setting == nil || input.Value == nil {
		errHandled(fail.New("No setting or value passed in.", nil), w)
		return
	}

	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Settings()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to update settings.  Admin rights are required.", nil), w)
		return
	}

	err = setting.Set(*input.Setting, input.Value)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{Status: statusSuccess})
}

func settingsDelete(w http.ResponseWriter, r *http.Request) {
	input := &SettingInput{}

	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Setting == nil {
		errHandled(fail.New("No setting passed in.", nil), w)
		return
	}

	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	prm := permission.Settings()

	if !prm.CanWrite(auth.User) {
		errHandled(fail.New("You do not have permissions to update settings.  Admin rights are required.", nil), w)
		return
	}

	err = setting.Default(*input.Setting)
	if errHandled(err, w) {
		return
	}

	respondJsend(w, &JSend{Status: statusSuccess})
}
