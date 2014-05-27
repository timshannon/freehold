package main

import (
	"flag"
	"net/http"
	"os"
	"time"

	"bitbucket.org/tshannon/config"
	"bitbucket.org/tshannon/freehold/cert"
)

const (
	defaultCertFile = "cert.pem"
	defaultKeyFile  = "key.pem"
)

var selfSign bool = false

func init() {
	flag.BoolVar(&selfSign, "selfsign", false, "Generate a self-signed certificate, and host using it."+
		"If "+defaultCertFile+", or "+defaultKeyFile+"already exists, they will not be overridden.")
}

func main() {
	flag.Parse()

	cfg, err := config.LoadOrCreate("settings.json")
	if err != nil {
		panic("Error loading settings.json file: " + err.Error())
	}

	address := cfg.String("address", "")
	port := cfg.String("port", "")
	certFile := cfg.String("certificateFile", "")
	keyFile := cfg.String("keyFile", "")

	if selfSign {
		if !fileExists(defaultCertFile) || !fileExists(defaultKeyFile) {
			cert.GenerateCert(address, "freehold-self-signing", time.Now(), 365*24*time.Hour, false, 2048,
				defaultCertFile, defaultKeyFile)
		}
		certFile = defaultCertFile
		keyFile = defaultKeyFile
	}
	if certFile == "" || keyFile == "" {
		if port == "" {
			port = "80"
		}
		err = http.ListenAndServe(address+":"+port, nil)
	} else {
		if port == "" {
			port = "443"
		}
		err = http.ListenAndServeTLS(address+":"+port, certFile, keyFile, nil)
	}

	if err != nil {
		panic("Error Starting freehold instance: " + err.Error())
	}

}

func fileExists(fileName string) bool {
	file, err := os.Open(fileName)
	file.Close()

	return err == nil || !os.IsNotExist(err)
}
