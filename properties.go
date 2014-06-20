package main

import (
	"fmt"
	"net/http"
	"os"
	"path"
)

type Properties struct {
	Name        string      `json:"name,omitempty"`
	Url         string      `json:"url,omitempty"`
	Permissions *Permission `json:"permissions,omitempty"`
	Size        int64       `json:"size,omitempty"`
}

func resPathFromProperty(propertyPath string) string {
	version, resource := splitRootAndPath(propertyPath)
	_, resource = splitRootAndPath(resource)
	return path.Join("/", version, resource)
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
		if !ok {
			four04(w, r)
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &Properties{
				Name:        file.Name(),
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
			prm = p
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

func propertiesPut(w http.ResponseWriter, r *http.Request) {
	toSet := &Properties{}

	err := parseJson(r, toSet)
	if errHandled(err, w) {
		return
	}

	fmt.Println("Property: ", toSet.Permissions)
	return

	if toSet.Permissions == nil {
		//do nothing? or Fail with invalid syntax?
		return
	}

	if errHandled(toSet.Permissions.validate(), w) {
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
		ok, prm, err := canWrite(auth, resource)

		if errHandled(err, w) {
			return
		}
		if !ok {
			if !prm.canRead(auth) {
				four04(w, r)
				return
			}

			respondJsend(w, &JSend{
				Status:  statusFail,
				Message: "You do not have write permissisions on this resource.",
			})
			return
		}

		err = setPermissions(resource, toSet.Permissions)
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

	for i := range files {
		if !files[i].IsDir() {
			child := path.Join(resource, files[i].Name())
			ok, _, err := canWrite(auth, child)
			if errHandled(err, w) {
				return
			}

			if ok {
				setPermissions(child, toSet.Permissions)
				fileList = append(fileList, Properties{
					Name: files[i].Name(),
					Url:  child,
				})
			}
			//if they don't have permissions to set all files in folder
			// don't fail, just quitely pass over them?
		}
	}

	respondJsend(w, &JSend{
		Status: statusSuccess,
		Data:   fileList,
	})
}
