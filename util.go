package main

import (
	"fmt"
	"os"
	"strings"
)

const version = "v1"

func splitRootAndPath(pattern string) (root, path string) {
	if pattern == "" {
		panic("Invalid pattern")
	}
	split := strings.SplitN(pattern[1:], "/", 2)
	root = split[0]
	if len(split) < 2 {
		path = "/"
	} else {
		path = "/" + split[1]
	}
	return root, path
}

func halt(msg string) {
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(2)
}
