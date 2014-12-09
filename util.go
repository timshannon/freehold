// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"crypto/md5"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"bitbucket.org/tshannon/freehold/data/store"
)

func halt(msg string) {
	store.Halt()
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(1)
}

// splitRootAndPath splits the first item in a path from the rest
// /v1/file/test.txt:
// root = "v1"
// path = "/file/test.txt"
func splitRootAndPath(pattern string) (root, path string) {
	if pattern == "" {
		panic("Invalid pattern")
	}
	if pattern[:1] == "/" {
		pattern = pattern[1:]
	}
	split := strings.SplitN(pattern, "/", 2)
	root = split[0]
	if len(split) < 2 {
		path = "/"
	} else {
		path = "/" + split[1]
	}
	return root, path
}

func checksum(rs io.Reader) string {
	buff, err := ioutil.ReadAll(rs)
	if err != nil {
		halt("Error calculating checksum: " + err.Error())
	}
	return fmt.Sprintf("%x", md5.Sum(buff))
}

func fileExists(filename string) bool {
	if _, err := os.Stat(filename); err == nil {
		return true
	}
	return false
}

func isDir(filename string) bool {
	if stat, err := os.Stat(filename); err == nil {
		return stat.IsDir()
	}
	return false
}

func clearEmptyFolder(folder string) error {
	file, err := os.Open(folder)
	defer file.Close()

	files, err := file.Readdir(0)
	if err != nil {
		return err
	}
	if len(files) == 0 {
		return os.Remove(file.Name())
	}
	return nil
}

//ipAddress returns the actual ip address from the request
func ipAddress(r *http.Request) string {
	address := r.RemoteAddr
	index := strings.LastIndex(address, ":")
	if index == -1 {
		return address
	}
	return address[:index]
}
