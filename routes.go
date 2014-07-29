// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"

	"bitbucket.org/tshannon/treemux"
)

var rootHandler *treemux.Mux
var appHandler *treemux.Mux

func init() {
	setupRoutes()
}

func setupRoutes() {
	rootHandler = treemux.NewServeMux()

	rootHandler.Handle("/", &methodHandler{
		get:  rootGet,
		post: rootPost,
	})

	rootHandler.Handle("/v1/file/", &methodHandler{
		get:    fileGet,
		post:   filePost,
		delete: fileDelete,
	})

	rootHandler.Handle("/v1/properties/", &methodHandler{
		get: propertiesGet,
		put: propertiesPut,
	})

	rootHandler.Handle("/docs/", &methodHandler{
		get: docsGet,
	})

	rootHandler.Handle("/v1/auth/", &methodHandler{
		get: authGet,
	})

	rootHandler.Handle("/v1/auth/session/", &methodHandler{
		get:    sessionGet,
		post:   sessionPost,
		delete: sessionDelete,
	})

	rootHandler.Handle("/v1/application/", &methodHandler{
		get:    appGet,
		post:   appPost,
		put:    appPut,
		delete: appDelete,
	})

	rootHandler.Handle("/v1/application/available/", &methodHandler{
		get:  appAvailableGet,
		post: appAvailablePost,
	})

	rootHandler.Handle("/v1/settings/", &methodHandler{
		get:    settingsGet,
		put:    settingsPut,
		delete: settingsDelete,
	})

	//apps
	appHandler = treemux.NewServeMux()
	rootHandler.SetChild(appHandler)

	appHandler.Handle("/", &methodHandler{
		get: appRootGet,
	})

	appHandler.Handle("/v1/file/", &methodHandler{
		get:    fileGet,
		post:   filePost,
		delete: fileDelete,
	})

	appHandler.Handle("/v1/properties/", &methodHandler{
		get: propertiesGet,
		put: propertiesPut,
	})

}

type methodHandler struct {
	get    http.HandlerFunc
	post   http.HandlerFunc
	put    http.HandlerFunc
	delete http.HandlerFunc
}

func (m *methodHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if m.get == nil {
		m.get = four04
	}
	if m.post == nil {
		m.post = four04
	}
	if m.put == nil {
		m.put = four04
	}
	if m.delete == nil {
		m.delete = four04
	}
	switch r.Method {
	case "GET":
		m.get(w, r)
		return
	case "POST":
		m.post(w, r)
		return
	case "PUT":
		m.put(w, r)
		return
	case "DELETE":
		m.delete(w, r)
		return
	default:
		four04(w, r)
		return
	}
}
