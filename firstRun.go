package main

import (
	"os"
	"path"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/user"
)

var firstRun bool

const coreFilePath = "/" + version + "/file/core/"

//TODO: Replace with core and home apps, install at first run

// makeFirstAdmin is used to make the first admin user, then set the default starting permissions
// on all of the core resources
func makeFirstAdmin(username, password string) error {
	if !firstRun {
		return fail.New("The freehold "+userDS+" datastore has already been initiated, "+
			"and the First Admin has already been created. Another cannot be created using this method.", nil)
	}

	admin := &user.User{
		username: username,
		Password: password,
	}
	err := user.New(admin)
	if err != nil {
		return err
	}

	err = setCoreDefaultPermissions(username)
	if err != nil {
		return err
	}

	firstRun = false
	return nil
}

// setCoreDefaultPermissions sets the initial starting permissions for all necessary core resources
func setCoreDefaultPermissions(owner string) error {
	//core files
	return recurseSetPermissionOnFolder(coreFilePath, &Permission{
		Owner:   owner,
		Public:  "r",
		Friend:  "r",
		Private: "rw",
	})
}

func recurseSetPermissionOnFolder(urlPath string, permission *Permission) error {
	filePath := urlPathToFile(urlPath)
	dir, err := os.Open(filePath)
	if err != nil {
		return err
	}

	files, err := dir.Readdir(0)
	if err != nil {
		return err
	}

	for i := range files {
		fileUrl := path.Join(urlPath, files[i].Name())
		if files[i].IsDir() {
			err = recurseSetPermissionOnFolder(fileUrl, permission)
			if err != nil {
				return err
			}
			continue
		}

		err = permission.Set(fileUrl, permission)
		if err != nil {
			return err
		}
	}
	return nil
}

const firstRunAdminPage = `
<!DOCTYPE html>
<html>
<head>
	<title>freehold</title>
</head>
<body>
	<h2>Welcome to your new freehold instance!</h2>
	<p>You need to setup the first administrative user before you can start using your freehold instance.</p>

	<h3>Choose a username and password</h3>
	{{if . }}
	<label style="color:red;">An error occurred when processing your login: <b>{{.}}</b></label>
	{{end}}
	<form role="form" id="login" name="login" action="/" method="post">
		<label for="username">Username</label><br>
		<input type="username" id="username" name="username" placeholder="Enter Username">
		<br><br>
		<label for="password">Password</label><br>
		<input type="password" id="password" name="password" placeholder="Enter Password"><br>
		<button type="submit">Submit</button>
	</form>
	
	<br><br>
	<p>If you have issues creating your adminstative user, or forget your password,<br>
	you can reset your freehold instance by deleting the <b>core</b> folder in your running directory.</p>
</body>
</html>
`
