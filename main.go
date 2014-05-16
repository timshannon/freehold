package main

import (
	"net/http"

	"bitbucket.org/tshannon/config"
)

//selfsign

func main() {
	cfg, err := config.LoadOrCreate("settings.json")
	if err != nil {
		panic("Error loading settings.json file: " + err.Error())
	}

	address := cfg.String("address", ":80")
	certFile := cfg.String("certificateFile", "")
	keyFile := cfg.String("keyFile", "")

	if certFile == "" || keyFile == "" {
		err = http.ListenAndServe(address, nil)
	} else {
		err = http.ListenAndServeTLS(address, certFile, keyFile, nil)
	}

	if err != nil {
		panic("Error Starting freehold instance: " + err.Error())
	}

}
