package main

import (
	"fmt"
	"os"
)

func halt(msg string) {
	fmt.Fprintln(os.Stderr, msg)
	os.Exit(2)
}
