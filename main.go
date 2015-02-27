// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"time"

	"bitbucket.org/tshannon/config"
	"bitbucket.org/tshannon/freehold/cert"
	"bitbucket.org/tshannon/freehold/log"
	"bitbucket.org/tshannon/freehold/user"
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

	//Capture program shutdown, to make sure everything shuts down nicely
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for sig := range c {
			if sig == os.Interrupt {
				halt("Freehold shutting down")
			}
		}
	}()
}

func main() {
	flag.Parse()

	settingPaths := config.StandardFileLocations("freehold/settings.json")
	fmt.Println("Freehold is looking for settings files in the following locations (in order of priority):")
	for i := range settingPaths {
		fmt.Println("\t", settingPaths[i])
	}
	cfg, err := config.LoadOrCreate(settingPaths...)
	if err != nil {
		halt(err.Error())
	}

	address := cfg.String("address", "")
	port := cfg.String("port", "")
	certFile := cfg.String("certificateFile", "")
	keyFile := cfg.String("keyFile", "")
	dataDir := cfg.String("dataDir", "./")

	fmt.Printf("Freehold found a settings file and is currently using the file %s for settings.\n", cfg.FileName())

	cwd, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		halt("Error getting current working directory " + err.Error())
	}

	if fileExists(dataDir) && isDir(dataDir) {
		os.Chdir(dataDir)
	}

	firstRun = !fileExists(user.DS)

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
					halt("Can't get hostname for self-signed hosting, specify an address in " +
						"settings.json. Error: " + err.Error())
				}
			}

			err = cert.GenerateCert(host, "freehold-self-signing", time.Now(), 365*24*time.Hour, false, 2048,
				certFile, keyFile)
			if err != nil {
				halt("Error generating self-signed cert: " + err.Error())
			}
		}

	}

	server := &http.Server{
		Handler:        rootHandler,
		ReadTimeout:    time.Duration(cfg.Int("ReadTimeoutSeconds", 0)) * time.Second,
		WriteTimeout:   time.Duration(cfg.Int("WriteTimeoutSeconds", 0)) * time.Second,
		MaxHeaderBytes: cfg.Int("MaxHeaderBytes", 0),
		ErrorLog:       log.FHLogger(),
	}
	if certFile == "" || keyFile == "" {
		if port == "" {
			port = "80"
		}
		server.Addr = address + ":" + port
		err = server.ListenAndServe()
	} else {
		if port == "" {
			port = "443"
		}
		if !filepath.IsAbs(keyFile) {
			keyFile = filepath.Join(cwd, keyFile)
		}
		if !filepath.IsAbs(certFile) {
			certFile = filepath.Join(cwd, certFile)
		}

		isSSL = true
		//SSL added and removed here :-)
		server.Addr = address + ":" + port
		err = server.ListenAndServeTLS(certFile, keyFile)
	}

	if err != nil {
		halt("Error Starting freehold instance: " + err.Error())
	}

}
