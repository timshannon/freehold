package main

import (
	"errors"
	"os"
	"path"
)

const coreFilePath = "./file/core/"

// makeFirstAdmin is used to make the first admin user, then set the default starting permissions
// on all of the core resources
func makeFirstAdmin(username, password string) error {
	if fileExists(userDS) {
		return publicError(errors.New("The freehold " + userDS + " datastore has already been initiated, " +
			"and the First Admin has already been created. Another cannot be created using this method."))

	}

	admin := &User{
		username: username,
		Password: password,
	}
	err := setCoreDefaultPermissions(username)
	if err != nil {
		return err
	}
	return newUser(admin)
}

// setCoreDefaultPermissions sets the initial starting permissions for all necessary core resources
func setCoreDefaultPermissions(owner string) error {
	//core files
	return setPermissionOnFolder(coreFilePath, &Permission{
		Owner:   owner,
		Public:  "r",
		Friend:  "r",
		Private: "rw",
	})
}

func setPermissionOnFolder(dirPath string, permission *Permission) error {
	dir, err := os.Open(dirPath)
	if err != nil {
		return err
	}

	files, err := dir.Readdir(0)
	if err != nil {
		return err
	}

	for i := range files {
		if files[i].IsDir() {
			err = setPermissionOnFolder(path.Join(dirPath, files[i].Name()), permission)
			if err != nil {
				return err
			}
		}

		err = setPermissions(path.Join(version, dirPath, files[i].Name()), permission)
		if err != nil {
			return err
		}
	}
	return nil
}
