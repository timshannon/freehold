// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package permission

//Docs are open to public
func Doc() *Permission {
	return &Permission{
		Owner:  "",
		Public: Read,
	}
}

//admins can install / write
// authenticated users can view installed apps
func Application() *Permission {
	return &Permission{
		admin:  Read + Write,
		Friend: Read,
	}
}

//admin only
func AppAvailable() *Permission {
	return &Permission{
		admin: Read + Write,
	}
}

// Any authenticated user can post a new file
func FileNew() *Permission {
	return &Permission{
		Friend: Read + Write,
	}
}

//Only file owners can delete a file
func FileDelete(base *Permission) *Permission {
	prm := *base
	prm.Private = Read + Write
	removeWrite(&prm.Friend)
	removeWrite(&prm.Public)
	return &prm
}

//Default file permissions for new files
func FileNewDefault(owner string) *Permission {
	return &Permission{
		Owner:   owner,
		Private: Read + Write,
	}
}

//Only owners can update properties.
// Public can't view any properites
// authenticated users who have read rights can read properties
func Properties(base *Permission) *Permission {
	prm := *base
	prm.Private = Read + Write
	removeRead(&prm.Public)
	removeWrite(&prm.Public)
	removeWrite(&prm.Friend)
	return &prm
}

// Only authenticated users (and not partially athenticated tokens)
// can write a new sesion or view an existing one
func Session() *Permission {
	return &Permission{
		Friend: Read + Write,
	}
}
