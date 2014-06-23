package main

import (
	"net/http"
	"os"
	"path"
	"path/filepath"
)

type Properties struct {
	Name        string      `json:"name,omitempty"`
	Url         string      `json:"url,omitempty"`
	Permissions *Permission `json:"permissions,omitempty"`
	Size        int64       `json:"size,omitempty"`
}

//TODO: Encryption
// PGP with sane defaults
// Settings will allow you to change default hash, cypher, compression, etc
// Store encryption settings with file?

func resPathFromProperty(propertyPath string) string {
	root, resource := splitRootAndPath(propertyPath)
	if isVersion(root) {
		//strip out properties from path
		_, resource = splitRootAndPath(resource)
		return path.Join("/", root, resource)
	}
	//must be app path
	resource = resPathFromProperty(resource)
	return path.Join("/", root, resource)
}

func propertiesGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	resource := resPathFromProperty(r.URL.Path)
	file, err := os.Open(urlPathToFile(resource))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		ok, prm, err := canRead(auth, resource)

		if errHandled(err, w) {
			return
		}
		if !ok || auth == nil {
			//Public can't view permissions
			four04(w, r)
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &Properties{
				Name:        filepath.Base(file.Name()),
				Permissions: prm,
				Url:         resource,
				Size:        info.Size(),
			},
		})
		return
	}

	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	fileList := make([]Properties, 0, len(files))

	for i := range files {
		var size int64
		var prm *Permission
		if files[i].IsDir() {
			if auth == nil {
				//Public can't view the existence of directories
				continue
			}
		} else {
			size = files[i].Size()
			ok, p, err := canRead(auth, path.Join(resource, files[i].Name()))
			if errHandled(err, w) {
				return
			}
			if !ok {
				continue
			}
			if auth != nil {
				//PUBLIC can't view permissions
				prm = p
			}
		}

		fileList = append(fileList, Properties{
			Name:        files[i].Name(),
			Permissions: prm,
			Url:         path.Join(resource, files[i].Name()),
			Size:        size,
		})
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   fileList,
	})

}

type PropertyInput struct {
	Permissions *PermissionsInput `json:"permissions,omitempty"`
}

func propertiesPut(w http.ResponseWriter, r *http.Request) {
	input := &PropertyInput{}

	err := parseJson(r, input)
	if errHandled(err, w) {
		return
	}

	if input.Permissions == nil {
		//return failure?
		return
	}

	auth, err := authenticate(w, r)
	if errHandled(err, w) {
		return
	}

	resource := resPathFromProperty(r.URL.Path)
	file, err := os.Open(urlPathToFile(resource))
	defer file.Close()

	if os.IsNotExist(err) {
		four04(w, r)
		return
	}

	if errHandled(err, w) {
		return
	}

	info, err := file.Stat()
	if errHandled(err, w) {
		return
	}

	if !info.IsDir() {
		newprm, err := input.Permissions.makePermission(resource)
		if errHandled(err, w) {
			return
		}

		prm, err := permissions(resource)
		if errHandled(err, w) {
			return
		}

		if !prm.isOwner(auth.User) {
			if !prm.canRead(auth) {
				four04(w, r)
				return
			}

			respondJsend(w, &JSend{
				Status:  statusFail,
				Message: "You do not have owner permissions on this resource.",
			})
			return
		}

		err = setPermissions(resource, newprm)
		if errHandled(err, w) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &Properties{
				Name: file.Name(),
				Url:  resource,
			},
		})
		return
	}

	files, err := file.Readdir(0)
	if errHandled(err, w) {
		return
	}

	fileList := make([]Properties, 0, len(files))
	var errors []ErrorItem
	status := statusSuccess

	for i := range files {
		if !files[i].IsDir() {

			child := path.Join(resource, files[i].Name())
			newprm, err := input.Permissions.makePermission(child)
			if errHandled(err, w) {
				return
			}
			prm, err := permissions(child)
			if errHandled(err, w) {
				return
			}

			if prm.isOwner(auth.User) {
				err = setPermissions(child, newprm)
				if err != nil {
					errStatus, item := fileErrorItem(err, files[i].Name(), child)
					errors = append(errors, item)
					status = errStatus

					continue
				}
				fileList = append(fileList, Properties{
					Name: files[i].Name(),
					Url:  child,
				})
			} else {
				if !prm.canRead(auth) {
					continue
				}

				status = statusFail
				errors = append(errors, ErrorItem{
					Message: "You do not have owner permissions on this resource.",
					Data: Properties{
						Name: files[i].Name(),
						Url:  child,
					},
				})

			}
		}
	}

	respondJsend(w, &JSend{
		Status: status,
		Data:   fileList,
		Errors: errors,
	})
}

func fileErrorItem(err error, name, url string) (status string, item ErrorItem) {
	status, errMsg := errorMessage(err)
	return status, ErrorItem{
		Message: errMsg,
		Data: Properties{
			Name: name,
			Url:  url,
		},
	}
}
