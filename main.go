package main

import (
	"flag"
	"net/http"

	"bitbucket.org/tshannon/config"
)

const (
	defaultCertFile = "cert.pem"
	defaultKeyFile  = "key.pem"
)

var selfSign bool = false

func init() {
	flag.Var(&selfSign, "selfsign", "Generate a self-signed certificate. "+
		"If "+defaultCertFile+", or "+defaultKeyFile+"already exists, they will not be overridden.")
}

func main() {
	flag.Parse()
	if selfSign {

		//TODO
		return
	}
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
