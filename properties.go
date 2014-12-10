// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package main

import (
	"net/http"
	"strings"

	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/permission"
	"bitbucket.org/tshannon/freehold/resource"
)

type Properties struct {
	Name        string                 `json:"name,omitempty"`
	Url         string                 `json:"url,omitempty"`
	Permissions *permission.Permission `json:"permissions,omitempty"`
	Size        int64                  `json:"size,omitempty"`
	Modified    string                 `json:"modified,omitempty"`
	IsDir       bool                   `json:"isDir,omitempty"`
}

//TODO: Encryption, AES?

func propertiesGet(w http.ResponseWriter, r *http.Request) {
	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	res := resource.NewFileFromProperty(r.URL.Path)

	if errHandled(auth.tryRead(res), w, auth) {
		return
	}

	if !res.IsDir() || !strings.HasSuffix(r.URL.Path, "/") {
		prm, err := res.Permission()
		if errHandled(err, w, auth) {
			return
		}
		propPrm := permission.Properties(prm)

		if !propPrm.CanRead(auth.User) {
			prm = nil
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &Properties{
				Name:        res.Name(),
				Permissions: prm,
				Url:         res.Url(),
				Size:        res.Size(),
				Modified:    res.Modified(),
				IsDir:       res.IsDir(),
			},
		})
		return
	}

	files, err := res.Children()
	if errHandled(err, w, auth) {
		return
	}

	fileList := make([]Properties, 0, len(files))

	for i := range files {
		child := files[i]
		if child.IsHidden() {
			continue
		}
		var size int64
		var modTime string
		var filePrm *permission.Permission

		prm, err := child.Permission()
		if errHandled(err, w, auth) {
			return
		}
		if prm.CanRead(auth.User) {
			size = child.Size()
			modTime = child.Modified()
		}

		if permission.Properties(prm).CanRead(auth.User) {
			filePrm = prm
		} else {
			filePrm = nil
		}

		fileList = append(fileList, Properties{
			Name:        child.Name(),
			Permissions: filePrm,
			Url:         child.Url(),
			Size:        size,
			Modified:    modTime,
			IsDir:       child.IsDir(),
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

type PermissionsInput struct {
	Owner   *string `json:"owner,omitempty"`
	Public  *string `json:"public,omitempty"`
	Friend  *string `json:"friend,omitempty"`
	Private *string `json:"private,omitempty"`
}

// makePermission translates a partial permissions input to a full permissions type
// by filling in the unspecfied entries from the datastore
func (pi *PermissionsInput) makePermission(curPrm *permission.Permission) *permission.Permission {
	prm := *curPrm
	if pi.Owner != nil {
		prm.Owner = *pi.Owner
	}
	if pi.Public != nil {
		prm.Public = *pi.Public
	}
	if pi.Friend != nil {
		prm.Friend = *pi.Friend
	}
	if pi.Private != nil {
		prm.Private = *pi.Private
	}

	return &prm
}

func propertiesPut(w http.ResponseWriter, r *http.Request) {
	input := &PropertyInput{}

	auth, err := authenticate(w, r)
	if errHandled(err, w, auth) {
		return
	}

	err = parseJson(r, input)
	if errHandled(err, w, auth) {
		return
	}

	if input.Permissions == nil {
		errHandled(fail.New("No permissions passed in.", nil), w, auth)
		return
	}

	res := resource.NewFileFromProperty(r.URL.Path)

	if errHandled(auth.tryWrite(res), w, auth) {
		return
	}

	if !res.IsDir() || !strings.HasSuffix(r.URL.Path, "/") {
		prm, err := res.Permission()
		if errHandled(err, w, auth) {
			return
		}

		newprm := input.Permissions.makePermission(prm)
		propPrm := permission.Properties(prm)

		if !propPrm.CanWrite(auth.User) {
			if !propPrm.CanRead(auth.User) {
				four04(w, r)
				return
			}

			errHandled(fail.NewFromErr(ErrNoWritePermission,
				&Properties{
					Name: res.Name(),
					Url:  res.Url(),
				}), w, auth)

			return
		}
		err = permission.Set(res, newprm)

		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &Properties{
				Name: res.Name(),
				Url:  res.Url(),
			},
		})
		return
	}

	files, err := res.Children()
	if errHandled(err, w, auth) {
		return
	}

	fileList := make([]Properties, 0, len(files))
	var failures []error
	status := statusSuccess

	for i := range files {
		child := files[i]
		if (child.IsDatastore() && child.IsDir()) || child.IsHidden() {
			continue
		}

		prm, err := child.Permission()
		if errHandled(err, w, auth) {
			return
		}

		newprm := input.Permissions.makePermission(prm)

		propPrm := permission.Properties(prm)
		if propPrm.CanWrite(auth.User) {
			err = permission.Set(child, newprm)
			if errHandled(err, w, auth) {
				return
			}

		} else {
			if !propPrm.CanRead(auth.User) {
				continue
			}

			status = statusFail
			failures = append(failures, fail.NewFromErr(ErrNoWritePermission,
				&Properties{
					Name: child.Name(),
					Url:  child.Url(),
				}))
		}
	}

	respondJsend(w, &JSend{
		Status:   status,
		Data:     fileList,
		Failures: failures,
	})
}
