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
New Files or Datastores can only be created by the current authenticated user

Authenticated access is granted either by having an active cookie with proper session credentials
or including an AuthToken field with the proper token in the request

Application Specific Storage paths will be prefixed with the given applications identifier
<appID>/v1/file/<path to file>
<appID>/v1/datastore/<path to file>
File
----
### /v1/file/<path to file>

GET - Works just like you think it should. 
```
GET /v1/file/important-stuff/spreadsheet1.ods
GET /v1/file/static/header.jpg
GET /v1/file/blog/index.html
```

GET at a directory returns a list of its contents with absolute rooted urls to the items
```
GET /v1/file/family-pictures/

Response (200):
{
	status: "success",
	data: [
			{
				name: "IMG01.jpg",
				url: "/v1/file/family-pictures/IMG01.jpg"	
			},
			{
				name: "IMG02.jpg",
				url: "/v1/file/family-pictures/IMG02.jpg"	
			},
			{
				name: "IMG03.jpg",
				url: "/v1/file/family-pictures/IMG03.jpg"	
			}
	]
}
	
```

POST - Add a new file.  Any non existent folders in the path will be automatically created.
multipart/formdata are accepted.

This example will create a new directory and put profile.jpg in it
```
POST "/v1/file/new-directory/"
------WebKitFormBoundary
Content-Disposition: form-data; name="files[]"; filename="profile.jpg"
Content-Type: image/jpeg
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

PUT

DELETE


DataStore
---------
### /v1/datastore/<path to datastore>/

* GET
* POST
* PUT
* DELETE

* * *

Application
===========

* * *

Tasks
=====

* * *
Authentication
==============
OATH2 if cookie does not eixst?

* * *

Core - Core / Global settings
=============================

Messaging 
======================
XMPP?

