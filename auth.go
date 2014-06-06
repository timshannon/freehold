package main

import "net/http"

// authUser authenticates an http request in one of 2 ways
// Checks for basic http authentication where the password is either the user's password
// or a valid security token, or the user has an valid cookie based session. It returns
// the authenticated user, or an error
func authUser(r *http.Request) (*User, error) {

	return nil, nil
}
