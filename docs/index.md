Storage
=======
You can store data either in files directly or in a key / value DataStore.
Each File / Datastore / Folder can have Read or Write permissions applied at one of three
levels. 

* Private - Applies to the owner of the current file
* Public - Applies to everyone
* Friend - Applies to everyone with a valid login to this freehold instance

Default permissions are Private R/W only

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
Example:

GET /v1/file/important-stuff/spreadsheet1.ods
GET /v1/file/static/header.jpg
GET /v1/file/blog/index.html
```
GET at a directory returns a list of its contents
```
GET /v1/file/family-pictures/

Result:
[
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

```

POST - Add a new file.

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

