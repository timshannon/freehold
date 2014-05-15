API Conventions
==============
Freehold's REST api will generally use the following conventions.

* GET will retrieve
* POST will create
* PUT will update
* Delete will remove

Responses will be in the JSEND (http://labs.omniti.com/labs/jsend) format with appropriate
http status codes.

```
{
	status: <"success"|"fail"|"error">,
	data: {
		<content>	
	}
}
```

* success - Submission succeeded
* fail - There was a problem with the data submitted - client error - usually (400)
* error - There was a problem on the server - server error - usually (500)

If status != "success" look for `data.message`.  It will always be there in non-successful transmissions. 
For multiple failures, there will be a top `data.message` and an `data.item[item#].message` for the individual 
failures.

Authentication will be done through the Basic HTTP Auth.
```
https://username:password@host.com/
```
Username is always required, and Password can be the users password, or a valid security token. See 
Authentication section for more detail.

If the Auth header isn't included in the request, then cookies will be checked for a valid session.
The Auth header will always override any authentication via cookie.

Storage
=======
You can store data either in files directly or in a key / value DataStore.
Each File / Datastore can have Read or Write permissions applied at one of three
levels. 

* Private - Applies to the owner of the current file
* Public - Applies to everyone
* Friend - Applies to everyone with a valid login to this freehold instance

Default permissions are Private R/W only.  Permissions only apply to an individual object 
(File or Datastore).  There currently is no concept of Folder permissions, or inheritance.
New Files or Datastores can only be created by the current authenticated user. Permissions can only
be granted by the file owner.

If a user doesn't have permissions to read a file they will get a 404 or a not exists error in the
case of a datastore collection.

Authenticated access is granted either by having an active cookie with proper session credentials
or including an AuthToken field with the proper token in the request

Application Specific Storage paths will be prefixed with the given applications identifier
* <app-name>/v1/file/<path to file>
* <appID>/v1/datastore/<path to file>

File
----
### /v1/file/<path to file>

**GET** - Works just like you think it should. 
```
GET /v1/file/important-stuff/spreadsheet1.ods
GET /v1/file/static/header.jpg
GET /v1/file/blog/index.html
```

*Get Permissions of a file* - the file data itself is not returned
```
GET /v1/file/important-stuff/spreadsheet1.ods
{
	permissions: {}
}

Response (200):
{
	status: "success",
	data: {
		name: "spreadsheet1.ods",
		permissions: {
			public: "",
			friend: "r",
			private: "rw"
		}
	}
}
```

GET at a directory returns a list of its contents with absolute rooted urls to the items.
```
GET /v1/file/family-pictures/

Response (200):
{
	status: "success",
	data: [
			{name: "IMG01.jpg",	url: "/v1/file/family-pictures/IMG01.jpg"},
			{name: "IMG02.jpg", url: "/v1/file/family-pictures/IMG02.jpg"},
			{name: "IMG03.jpg",	url: "/v1/file/family-pictures/IMG03.jpg"}
	]
}
```

*Get Permissions of all files in a folder* - the file data itself is not returned
```
GET /v1/file/family-pictures/
{
	permissions: {}
}

Response (200):
{
	status: "success",
	data: [
		{name: "IMG01.jpg", permissions: {public: "",	friend: "r",	private: "rw"}},
		{name: "IMG02.jpg", permissions: {public: "",	friend: "r",	private: "rw"}},
		{name: "IMG03.jpg", permissions: {public: "",	friend: "r",	private: "rw"}},
	]
}
```

If a file called index. (.html, .markup, .jpg, etc) is found in the directory, it will be loaded automatically
at directory GET calls.

If a GET is called against a file of extension type *.markdown* the markdown will automatically be
rendered as html (thanks to https://github.com/russross/blackfriday) such as with this file.

**POST** - Add a new file.  Any non existent folders in the path will be automatically created.
multipart/formdata are accepted.

This example will create a new directory and put profile.jpg in it
```
POST "/v1/file/new-directory/"
------WebKitFormBoundary
Content-Disposition: form-data; name="files[]"; filename="profile.jpg"
Content-Type: image/jpeg
...
------WebKitFormBoundary--

Response (201):
{
	status: "success",
	data: {
		url: "/v1/file/new-directory/profile.jpg"
	}
}
```

If the file already exists:
```
Response (500):
{
	status: "error",
	data: {
		message: "file already exists",
		url: "/v1/file/new-directory/profile.jpg"
	}
}
```
To replace an existing file, you'll need to delete the existing file first.

Multiple file posts will have multiple entries in the data field.
```
Response (201):
{
	status: "success",
	data: [
		{
			url: "/v1/file/new-directory/profile.jpg"
		},
		{
			url: "/v1/file/new-directory/header.jpg"
		},
		{
			url: "/v1/file/new-directory/favicon.ico"
		}
	]
}

Error Response (500):
{
	status: "error",
	data: {
		message: "one or more file failed",
		items: [
			{
				url: "/v1/file/new-directory/profile.jpg"
			},
			{
				message: "file already exists"
				url: "/v1/file/new-directory/header.jpg",
			},
			{
				message: "not enough disk space",
				url: "/v1/file/new-directory/wikipedia.zip"
			}
		]
	}
}
```

**PUT** - Updating existing files.  If the file is not found a 404 will be sent.

*Setting File Permissions* - r=read  w=write
```
PUT "/v1/file/notes/history.txt"

{
	permissions: {
		public: "",
		friend: "rw"
	}
}

Response (200):
{
	status: "success",
	data: {
		url: "/v1/file/blog/post.html"
	}
}
```
By default new files are private rw only. By not specifying private permissions the file retains its
existing permissions for that group.

*Set permissions for all files in a directory*
```
PUT "/v1/file/blog/published/"

{
	permissions: {
		public: "r",
		friend: "r"
	}
}

Response (200):
{
	status: "success",
	data: {
		[
			{url: "/v1/file/blog/2014-01-01.html"},
			{url: "/v1/file/blog/2014-01-12.html"},
			{url: "/v1/file/blog/2014-03-06.html"}
		]
	}
}
```

**DELETE** - If the last file in a given folder is deleted, the folder is also deleted

*Delete a single file*
```
DELETE "/v1/file/xml_SOAP_spec.doc"

Response (200):
{
	status: "success",
	data: {
		url: "/v1/file/xml_SOAP_spec.doc"
	}
}
```

*Delete a folder and it's contents*
```
DELETE "/v1/file/3001_lolcat_pictures/"

Response (200):
{
	status: "success",
	data: {
		[
			{url: "/v1/file/3001_lolcat_pictures/funney_kitteh.jpg"},
			{url: "/v1/file/3001_lolcat_pictures/funney_kitteh0sevn.jpg"},
			{url: "/v1/file/3001_lolcat_pictures/funney_kitteh01.jpg"}
		]
	}
}
```


DataStore
---------
### /v1/datastore/<path to datastore>/

A DataStore is file that contains collections of keys and their values. One datastore file has multiple collections,
and one collection has multiple keys and their values.

As with files, only Private can create new datastore files, and directories will be auto-created.  Empty directories will
be automatically removed. Only Private can create new collections.

Permissions are granted on per collection basis, NOT on a per file basis.  For instance, you can grant a Friend access to
write to the *notes* collection in the *lab_work* datastore file, but you CANNOT grant a friend access to create new
collections in the *lab_work* datastore.

Permissions are designed to be simple so there is no granular control over what a group can, or cannot write to in a 
given collection. If you grant a Friend access to Write to a collection, they can delete your records, and you can delete
theirs.

Public write access to a datastore collection are automatically rate-limited based on ip address.  Limites can be configured
with a Core Setting.  This allows an application to setup scenarios like Comments where public users can leave comments,
but the rate limiting should prevent spammy users.

**POST**

*Create a new datastore file*
```
POST /v1/datastore/personal/bookmarks.ds

Response (201):
{
	status: "success",
	data: {
		url: "/v1/datastore/personal/bookmarks.ds"
	}
}
```

*Create a new datastore collection*
```
POST /v1/datastore/personal/bookmarks.ds
{
	collection: "documentation"
}

Response (201):
{
	status: "success",
	data: {
		url: "/v1/datastore/personal/bookmarks.ds",
		collection: "documentation"
	}
}
```

**GET**

*Get a list of collections in a datastore file*
```
GET /v1/datastore/personal/bookmarks.ds

Response (200):
{
	status: "success",
	data: {
		url: "/v1/datastore/personal/bookmarks.ds",
		collections: [
			"documenation",
			"time-suck",
			"links-i-found-on-reddit"
		]
	}
}
```

*Get a value from the collection* 
```
GET /v1/datastore/personal/bookmarks.ds
{
	collection: "documentation",
	key: "http://golang.org/pkg"
}

Response (200):
{
	status: "success",
	data: {
		key: "http://golang.org/pkg",
		value: {
			tags: "programming,golang,go,awesome"
		}
	}
}
```
*Iterate through values in the collection*
```
GET /v1/datastore/personal/bookmarks.ds
{
	collection: "documentation",
	iter: {
		from: <key>,
		to: <key>,
		skip: <count>,
		order: <"asc" | "dsc">,
		limit: <count>
	}
}
```
* from - defaults to minimum key in the collection
* to - defaults to maximum key in the collection
* skip - defaults to 0
* order - defaults to asc

*Example: Consider a collection with 50 items with keys 1 - 50*

Get the 3rd page of 10 items per page in the collection
```
GET /v1/datastore/50items.ds
{
	collection: "testitems",
	iter: {
		skip: 30,
		limit: 10
	}
}

Response (200):
{
	status: "success",
	data: {
		[key: 31,	value: "Data"],
		[key: 32,	value: "Data"],
		[key: 33,	value: "Data"],
		[key: 34,	value: "Data"],
		[key: 35,	value: "Data"],
		[key: 36,	value: "Data"],
		[key: 37,	value: "Data"],
		[key: 38,	value: "Data"],
		[key: 39,	value: "Data"],
		[key: 40,	value: "Data"]
	}
}
```

*Get all the records where the key is greater than or equal 43*
```
GET /v1/datastore/50items.ds
{
	collection: "testitems",
	iter: {
		from: 43
	}
}

Response (200):
{
	status: "success",
	data: {
		[key: 43,	value: "Data"],
		[key: 44,	value: "Data"],
		[key: 45,	value: "Data"],
		[key: 46, value: "Data"],
		[key: 47,	value: "Data"],
		[key: 48,	value: "Data"],
		[key: 49,	value: "Data"],
		[key: 50,	value: "Data"]
	}
}
```
Both *from* and *to* and inclusive of the specified key in their range.

The underlying value of a key is an array of bytes, and it is important to understand that 30 != "30".
The type of the PUT key prefixed in byte array so that it can be properly decoded on the way back.
For this reason if you use different types of keys ordering and comparisons won't work the way you expect.

In general it's best to use the same type of key for an entire collection and be careful not to combine
things like strings ("1234") and numbers (1234).  The keys returned will always be the proper type of the
keys inserted.

**PUT**
```
PUT /v1/datastore/personal/bookmarks.ds
{
	collection: "documentation",
	key: "http://golang.org/pkg"
	value: {
			tags: "programming,golang,go,awesome"
	}
}

Response (200):
{
	status: "success",
	data: {
		key: "http://golang.org/pkg",
	}
}

If the datastore file doesn't exist:
Response (404):

If the collection doesn't exist in the datastore:
Response (200):
{
	status: "error",
	data: {
		message: "collection doesn't exist",
		url: "/v1/datastore/personal/bookmarks.ds"
		collection: "documentation"
	}
}
```

*Set Permissions for a collection*
```
PUT "/v1/datastore/passwords.ds"

{
	collection: "shared",
	permissions: {
		public: "",
		friend: "rw"
	}
}

Response (200):
{
	status: "success",
	data: {
		url: "/v1/datastore/passwords.ds",
		collection: "shared"
	}
}

```

*Set Permissions for all collection in a datastore file*
```
PUT /v1/datastore/private/top-secret.ds

{
	permissions: {
		public: "",
		friend: "",
		private: "rw"
	}
}

Response (200):
{
	status: "success",
	data: {
		url: "/v1/datastore/private/top-secret.ds"
		collections: [
			"links",
			"passwords",
			"certificates"
		]
	}
}
```


**DELETE** - Requires private permissions

*Delete a datastore file*
```
DELETE /v1/datastore/personal/bookmarks.ds

Response (200):
{
	status: "success",
	data: {
		url: "/v1/datastore/personal/bookmarks.ds"
	}
}
```

*Delete a datastore collection*
```
DELETE /v1/datastore/personal/bookmarks.ds
{
	collection: "documentation"
}

Response (200):
{
	status: "success",
	data: {
		url: "/v1/datastore/personal/bookmarks.ds",
		collection: "documentation"
	}
}
```

* * *

Core Datastore
==============
Data used for the running of the freehold instance are stored in the *core* datastore. The core datastore is designed to only be 
modified via specific REST requests and not directly. It contains data used for authentication, authorization, session data, 
permissions, and settings.

The core datastore has a different permissions model than normal datastores. Permissions are granted based on the type of 
request made.

The first user created in the system is automatically an administrator.  Only other administrators can make an existing user an
administrator.  Once a user is made an administrator it cannot be removed by other administrators, but it can be reliquished by
the user themself.

* * *

Authentication
==============
Authentication will be done through the Basic HTTP Auth.
```
https://username:password@host.com/
```
Username is always required, and Password can be the users password, or a valid security token.

A *Security Token* is a cryptographically random value that may have a preset expiration when it will no
longer be valid.  Security Tokens generated by a user currently grant all the permissions the user has
when used.  If you want to grant less permissions, create another user with less access to generate  tokens
from.

If the Auth header isn't included in the request, then cookies will be checked for a valid session.
The Auth header will always override any authentication via cookie.  If a cookie is used to authenticate,
then the proper CSRF Token will need to be sent with each PUT, POST, and DELETE via the X-CSRFToken header.
More info on this under Sessions.

Authentication and Session data are stored in the core datastore, and accessed via the path
*/v1/auth/*.

### /v1/auth/user

Information on Users in the system.  Stored in the *user* collection of the core datastore.
```
{
	collection: "user",
	key: <username>,
	value: {
		password: <password>,
		name: <name>,
		email: <email>,
		homeApp: <app-name>,
		admin: <true | false>
	}
}
```

**GET**

*List all users in the system* - available to Private, Friend, and Admin
```
GET /v1/auth/user

Response (200):
{
	status: "success",
	data: [
		{
			user: "tshannon", 
			name: "Tim Shannon", 
			email: "shannon.timothy@gmail.com",
			homeApp: "core-home",
			admin: true
		},
		{
			user: "otheruser", 
			name: "Other User", 
			email: "other.user@gmail.com",
			homeApp: "core-home",
			admin: false
		}
	]
}
```

*Get a single user* - available to Private, Friend, and Admin
```
GET /v1/auth/user
{
	user: "tshannon"
}

Response (200):
{
	status: "success",
	data: {
		user: "tshannon", 
		name: "Tim Shannon", 
		email: "shannon.timothy@gmail.com",
		homeApp: "core-home",
		admin: true
	}	
}
```

**POST**

*Create a new user* - All fields are optional except user and password - Available to admins only
```
POST /v1/auth/user
{
	user: "newUser",
	password: "CorrectHorseBatteryStaple",
	name: "New User", 
	email: "new.user@gmail.com",
	homeApp: "core-home",
	admin: false
}

Response (201):
{
	status: "success"
}
```

**PUT**

*Update an existing user* - Users can only update themselves
```
PUT /v1/auth/user
{
	password: "CorrectHorseBatteryStaple",
	name: "New User", 
	email: "new.user@gmail.com",
	homeApp: "core-home",
}

Response (200):
{
	status: "success"
}
```

*Make user an Admin* - Admin Only
```
PUT /v1/auth/user
{
	user: "newuser",
	admin: true
}

Response (200):
{
	status: "success"
}
```

*Relinquish Admin* - Admin's Self Only
```
PUT /v1/auth/user
{
	admin: false
}

Response (200):
{
	status: "success"
}
```

**DELETE**

*Remove user* - Admin or Self only
```
DELETE /v1/auth/user
{
	user: "newuser"
}

Response (200):
{
	status: "success"
}

```

### /v1/auth/token

A *Security Token* is a cryptographically random value that may have a preset expiration when it will no
longer be valid.  Security Tokens generated by a user currently grant all the permissions the user has
when used.  If you want to grant less permissions, create another user with less access to generate  tokens
from.

```
{
	collection: "token",
	key: <user>_<token>,
	value: {
		expires: <expiration date>
	}
}
```

**GET**

*List all active / non-expired tokens for the current user*
```
GET /v1/auth/token

Response (200):
{
	status: "success",
	data: [
		{token: "aaaaaaaaaaaaaaaaaaaaa"},
		{token: "bbbbbbbbbbbbbbbbbbbbb", expires: "2044-04-23T18:25:43.511Z"},
		{token: "ccccccccccccccccccccc"}
	]
}
```

*Get tokens expiration date if one exists*
```
GET /v1/auth/token
{
	token: "bbbbbbbbbbbbbbbbbbbbb"
}

Response (200):
{
	status: "success",
	data: {token: "bbbbbbbbbbbbbbbbbbbbb", expires: "2044-04-23T18:25:43.511Z"}
}
```

**POST**

*Generate new token with no expiration*
```
POST /v1/auth/token

Response (200):
{
	status: "success",
	data: {token: "fffffffffffffffffffff"}
}
```

*Generate new token with expiration* - ISO8601 format (.toJSON())
```
POST /v1/auth/token
{
	expires: "2044-04-23T18:25:43.511Z"
}

Response (200):
{
	status: "success",
	data: {token: "kkkkkkkkkkkkkkkkkkkkk", expires: "2044-04-23T18:25:43.511Z"}
}
```

**PUT**

*Set expiration*
```
PUT /v1/auth/token
{
	token: "kkkkkkkkkkkkkkkkkkkkk",
	expires: "1900-04-23T18:25:43.511Z"
}

Response (200):
{
	status: "success",
}
```

*Remove Expiration*
```
PUT /v1/auth/token
{
	token: "kkkkkkkkkkkkkkkkkkkkk",
}

Response (200):
{
	status: "success",
}
```

**DELETE**
```
DELETE /v1/auth/token
{
	token: "kkkkkkkkkkkkkkkkkkkkk",
}

Response (200):
{
	status: "success",
}
```

### /v1/auth/session

A session refers to when the authentication is tracked via a cookie in the client's browser. Sessions
only support POST to create a new one and DELETE to remove or logout of the session.  

When a session is POSTed it creates a cookie with the user and unique session id in the client's browser.
If any request is GETed with a valid session (i.e. no Header Authentication), then a CSRF token is put in 
the header of that request (X-CSRFToken), and that token, must be sent with any PUT, POST, or DELETE requests
sent from the session, or they will fail.

If a user requests a new session, all previous sessions for the user are expired.  If a user logs out / deletes
a session all previous sessions are expired.  This all-for-one behavior can be changed with a Core Setting.

If a user has tries to make an unauthenticated requested, i.e. no header auth, and no valid session cookie,
they will be automatically redirected to the default home app's login screen (see settings to change this).

```
{
	collection: "session",
	key: <user>_<session-id>,
	value: {
		expires: <expiration date>,
		CSRFToken: <CSRF Token>,
		ipAddress: <ip address>
	}
}
```

**GET**

*List all sessions for the current user*
```
GET /v1/auth/session

Response (200):
{
	status: "success",
	data: [
		{session: "bbbbbbbbbbbbbbbbbbbbb", CSRFToken: "12345677", expires: "2014-04-23T18:25:43.511Z"},
		{session: "ccccccccccccccccccccc", CSRFToken: "12345677"},
		{session: "lllllllllllllllllllll", CSRFToken: "12345677", expires: "1900-00-00T00:00:00.000Z"},
		{session: "222222222222222222222", CSRFToken: "12345677", expires: "1900-00-00T00:00:00.000Z"}
	]
}
```

**POST**

*Creates a new session and writes a cookie to hold it* 

 This session expires at the end of the browser's session
```
POST /v1/auth/session

Response (201):
{
	status: "success",
}
```

 This session expires in the future. Note, it's not recommended to set session expirations out farther than 15 days.
```
POST /v1/auth/session
{
	expires: "2016-01-01T00:00:00.000Z"
}

Response (201):
{
	status: "success",
}
```

**DELETE**

*Log out of the current session* - expires the client's cookie as well
```
DELETE /v1/auth/session

Response (200):
{
	status: "success",
}
```

* * *

Core Settings
=============================
Freehold tries to have sane default settings that you can adjust as needed.  This will hopefully make the instance
easy to setup and get running, yet allow the admin to modify it's operation to their own needs.

Only Admin users can change settings, but all authenticated (non-public) users can view the current settings in
the system.

Individual user's settings should be managed on a per application basis in the given applications datastore.

### /v1/settings

```
{
	collection: "settings",
	key: <setting id>,
	value: {
		description: <setting description>,
		value: <setting value>
	}
}
```

**GET**

*List All settings* - All authenticated users
```
GET /v1/settings

Response (200):
{
	status: "success",
	data: [
		{
			setting: "public-rate-limit", 
			description: "Number of writes per minute per user for a single collection", 
			value: 5
		},
		{
			setting: "default-home-app", 
			description: "Default application used as the home app, where logins are redirected to.", 
			value: "core-home"
		},
		{
			setting: "application-allow-web-install", 
			description: "Whether or not applications can be installed from urls.", 
			value: false
		}
	]
}
```

*List a specific settings* - All authenticated users
```
GET /v1/settings
{
	setting: "public-rate-limit"
}

Response (200):
{
	status: "success",
	data: {
			setting: "public-rate-limit", 
			description: "Number of writes per minute per user for a single collection", 
			value: 5
	}
}
```

**PUT**

*Set a Setting* - Admins only
```
PUT /v1/settings
{
	setting: "public-rate-limit",
	value: 10
}

Response (200):
{
	status: "success",
}
```

**DELETE**

*Default a Setting* - Remove any user set value, and use initial defaults - Admins only
```
DELETE /v1/settings
{
	setting: "public-rate-limit",
}

Response (200):
{
	status: "success",
}
```

* * *

Applications
============
Applications are bundles of files in a zip file that only Admins can install.  Once installed
they are available to all users in the system, and possibly (depending on how the app sets it's permissions)
available to the public as well.

By default application zip files must be present on the server running the freehold instance before they can
be installed. Any .zip file in the folder *<freehold executable>/apps/available/* will be listed as an application
available to install. Remote, or web installs (installations from arbitrary urls) can be allowed by changing the
global setting *application-allow-web-install* to *true*.

The application zip file must have a file called app.json in the following format:
```
{
	id: "datastore-manager",
	name: "Datastore Manager",
	description: "Application for managing datastore files.",
	author: "Tim Shannon - shannon.timothy@gmail.com",
	root: "index.htm",
	icon: "v1/file/images/ds-icon.png"
}
```
* id - Path on which the application will be installed (`https://host/<app-id>/`). Must not match any existing installed
applications, or any paths used by the freehold instance (i.e. /settings /auth, etc). 
* name - User visable name of the application
* description - Description of what the application does
* author - Who wrote the application
* root - File to which users will be redirected to when accessing the apps root path: `https://host/<app-id>`
* icon - Image file usually used in the home app for displaying in the link to a given application

Paths to the root file and icon files are relative to the application, so 
"v1/file/images/ds-icon.png" refers to `https://host/<app-id>/v1/file/images/ds-icon.png`.

*Datastore definition of Applications* - Only stores currently installed applications.  If an application is
removed, it's deleted from the application collection.
```
{
	collection: "application",
	key: <app id>,
	value: {
		name: <name of the application>,
		description: <description>,
		author: <author>,
		root: <root file>,
		icon: <icon file>
	}
}
```

**GET**

*List All Applications* - All authenticated users
```
GET /v1/application

Response (200):
{
	status: "success",
	data: [
		{
			id: "datastore-manager",
			name: "Datastore Manager",
			description: "Application for managing datastore files.",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/ds-icon.png"
		},
		{
			id: "core-home",
			name: "Home",
			description: "Freehold Homepage",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/home.png"
		}
	]
}
```

*List a specific application* - All authenticated users
```
GET /v1/application
{
	id: "core-home"
}

Response (200):
{
	status: "success",
	data: {
			id: "core-home",
			name: "Home",
			description: "Freehold Homepage",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/home.png"
		}
}
```

*List Applications available for install* - Admins only
```
GET /v1/application/available

Response (200):
{
	status: "success",
	data: [
		{
			id: "blog",
			name: "Blog",
			description: "Software for writing and publish a blog to the public",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/blog.png"
		},
		{
			id: "gallery",
			name: "Gallery",
			description: "Application for showing image files in a gallery format",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/gallery.png"
		}
}
```

**POST**

*Install an Application* - Admins only - 
Files must be in *<freehold executable>/apps/available/* or (if web-install is enabled) a valid
url.  
```
POST /v1/application
{
	file: "blog.zip"
}

Response (200):
{
	status: "success",
	data: {
			id: "blog",
			name: "Blog",
			description: "Software for writing and publish a blog to the public",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/blog.png"
	}
}
```

**PUT**

*Upgrade an Application* - Admins only - 
Files must be in *<freehold executable>/apps/available/* or (if web-install is enabled) a valid
url. POSTing the same application that is already installed will fail.  PUTing it will replace
the existing application with the new files from the install file.
```
PUT /v1/application
{
	file: "blog.zip"
}

Response (200):
{
	status: "success",
	data: {
			id: "blog",
			name: "Blog V2",
			description: "Software for writing and publish a blog to the public",
			author: "Tim Shannon - shannon.timothy@gmail.com",
			root: "index.htm",
			icon: "v1/file/images/blog.png"
	}
}
```

**DELETE**

*Uninstall an Application* - Admins only
```
DELETE /v1/application
{
	id: "blog" 
} 

Response (200):
{
	status: "success"
}
```


* * *

Messaging 
======================
TODO: XMPP, client?  Server would be nice too.

* * *

Tasks
=====
TODO
Scheduled REST API calls. Anything you want your freehold instance to do
when you're not logged on.


