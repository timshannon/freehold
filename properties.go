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

type properties struct {
	Name        string                 `json:"name,omitempty"`
	URL         string                 `json:"url,omitempty"`
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
			Data: &properties{
				Name:        res.Name(),
				Permissions: prm,
				URL:         res.URL(),
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

	fileList := make([]properties, 0, len(files))

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

		fileList = append(fileList, properties{
			Name:        child.Name(),
			Permissions: filePrm,
			URL:         child.URL(),
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

type propertyInput struct {
	Permissions *permissionsInput `json:"permissions,omitempty"`
}

type permissionsInput struct {
	Owner   *string `json:"owner,omitempty"`
	Public  *string `json:"public,omitempty"`
	Friend  *string `json:"friend,omitempty"`
	Private *string `json:"private,omitempty"`
}

// makePermission translates a partial permissions input to a full permissions type
// by filling in the unspecfied entries from the datastore
func (pi *permissionsInput) makePermission(curPrm *permission.Permission) *permission.Permission {
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
	input := &propertyInput{}

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
				&properties{
					Name: res.Name(),
					URL:  res.URL(),
				}), w, auth)

			return
		}
		err = permission.Set(res, newprm)

		if errHandled(err, w, auth) {
			return
		}

		respondJsend(w, &JSend{
			Status: statusSuccess,
			Data: &properties{
				Name: res.Name(),
				URL:  res.URL(),
			},
		})
		return
	}

	files, err := res.Children()
	if errHandled(err, w, auth) {
		return
	}

	fileList := make([]properties, 0, len(files))
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
				&properties{
					Name: child.Name(),
					URL:  child.URL(),
				}))
		}
	}

	respondJsend(w, &JSend{
		Status:   status,
		Data:     fileList,
		Failures: failures,
	})
}
