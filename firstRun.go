package main

import (
	"os"
	"path"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/user"
)

var firstRun bool

const coreFilePath = "/core/" + version + "/file/"

//TODO: Replace with core and home apps, install at first run

// makeFirstAdmin is used to make the first admin user, then set the default starting permissions
// on all of the core resources
func makeFirstAdmin(username, password string) error {
	if !firstRun {
		return fail.New("The freehold "+user.DS+" datastore has already been initiated, "+
			"and the First Admin has already been created. Another cannot be created using this method.", nil)
	}

	//setup folders
	err := os.MkdirAll(appDir, 0777)
	if err != nil {
		return err
	}
	err = os.MkdirAll(fileDir, 0777)
	if err != nil {
		return err
	}
	err = os.MkdirAll(datastoreDir, 0777)
	if err != nil {
		return err
	}

	admin := &user.User{
		Password: password,
	}
	err = user.New(username, admin)
	if err != nil {
		return err
	}

	//TODO: core and home app auto install
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
	return recurseSetPermissionOnFolder(coreFilePath, &permission.Permission{
		Owner:   owner,
		Public:  "r",
		Friend:  "r",
		Private: "rw",
	})
}

func recurseSetPermissionOnFolder(urlPath string, prm *permission.Permission) error {
	filePath := urlPathToFile(urlPath)
	dir, err := os.Open(filePath)
	defer dir.Close()
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
			err = recurseSetPermissionOnFolder(fileUrl, prm)
			if err != nil {
				return err
			}
			continue
		}

		err = permission.Set(fileUrl, prm)
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
</body>
</html>
`
