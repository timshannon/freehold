package main

import (
	"net/http"
	"text/template"

	"bitbucket.org/tshannon/treemux"
)

const (
	defaultRoot = "/" + version + "/file/core/index.html"
)

var rootHandler *treemux.Mux

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
		put:    filePut,
		delete: fileDelete,
	})

	rootHandler.Handle("/docs/", &methodHandler{
		get: docsGet,
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
	auth, err := authenticate(r)
	if errHandled(err, w) {
		return
	}

	var homeFile string
	if auth != nil {
		homeFile = auth.User.HomeApp
	}

	if homeFile == "" {
		homeFile = settingString("PublicRootFile")
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
