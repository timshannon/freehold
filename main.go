// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

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

var flagSelfSign bool = false
var flagAdmin string = ""
var flagAdminPass string = ""
var isSSL bool = false

func init() {
	flag.BoolVar(&flagSelfSign, "selfsign", false, "Generate a self-signed certificate, and host using it. "+
		"If "+defaultCertFile+", or "+defaultKeyFile+" already exists, they will not be overridden.")
	flag.StringVar(&flagAdmin, "admin", "", "Creates an admin user in the system with the passed in userid. "+
		"An admin is only added if the core/user datastore doesn't exist.")
	flag.StringVar(&flagAdminPass, "adminPass", "", "Sets the password for the admin user passed in with the "+
		"admin option.")
}

func main() {
	flag.Parse()

	cfg, err := config.LoadOrCreate("settings.json")
	if err != nil {
		halt("Error loading settings.json file: " + err.Error())
	}

	address := cfg.String("address", "")
	port := cfg.String("port", "")
	certFile := cfg.String("certificateFile", "")
	keyFile := cfg.String("keyFile", "")

	firstRun = !fileExists(userDS)

	if flagAdmin != "" {
		if flagAdminPass == "" {
			halt("You must specify admin and adminPass")
		}
		err := makeFirstAdmin(flagAdmin, flagAdminPass)
		if err != nil {
			halt("Error creating first admin from command line: " + err.Error())
		}
	}

	if flagSelfSign {
		if certFile == "" || keyFile == "" {
			cfg.SetValue("certificateFile", defaultCertFile)
			cfg.SetValue("keyFile", defaultKeyFile)
			cfg.Write()
			certFile = defaultCertFile
			keyFile = defaultKeyFile
		}
		if !fileExists(certFile) || !fileExists(keyFile) {
			host := address

			if host == "" {
				host, err = os.Hostname()
				if err != nil {
					halt("Can't get hostname for self-signed hosting, specify an address in settings.json. Error: " +
						err.Error())
				}
			}

			err = cert.GenerateCert(host, "freehold-self-signing", time.Now(), 365*24*time.Hour, false, 2048,
				certFile, keyFile)
			if err != nil {
				halt("Error generating self-signed cert: " + err.Error())
			}
		}

	}
	if certFile == "" || keyFile == "" {
		if port == "" {
			port = "80"
		}
		err = http.ListenAndServe(address+":"+port, rootHandler)
	} else {
		if port == "" {
			port = "443"
		}
		isSSL = true
		//SSL added and removed here :-)
		err = http.ListenAndServeTLS(address+":"+port, certFile, keyFile, rootHandler)
	}

	if err != nil {
		halt("Error Starting freehold instance: " + err.Error())
	}

}

func fileExists(fileName string) bool {
	file, err := os.Open(fileName)
	file.Close()

	return err == nil || !os.IsNotExist(err)
}
