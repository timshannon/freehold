package main

import (
	"net/http"
	"os"

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
		get: rootGet,
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
	if r.URL.Path != "/" {
		four04(w, r)
		return
	}
	user, err := authUser(r)
	if errHandled(err, w) {
		return
	}

	var homeFile string
	if user != nil {
		homeFile = user.HomeApp
	}
	if homeFile == "" {
		homeFile = settingString("PublicRootFile")
	}

	file, err := os.Open(urlPathToFile(homeFile))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}
	if errHandled(err, w) {
		return
	}

	serveDir(w, r, file, user)
}
