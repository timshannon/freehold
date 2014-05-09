Storage
=======
You can store data either in files directly or in a key / value DataStore.
Each File / Datastore can have Read or Write permissions applied at one of three
levels. 

* Private - Applies to the owner of the current file
* Public - Applies to everyone
* Friend - Applies to everyone with a valid login to this freehold instance

File
----
### /v1/file/<path to file>

* GET - Works just like you think it should. MIME Type is guessed unless otherwise specified
	in the post.
	~~~~
	Example:
	GET /v1/file/important_stuff/spreadsheet1.ods
	~~~~

* POST
* PUT
* DELETE


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

Tasks
=====

Authentication
==============
OATH2 if cookie does not eixst?

Core - Core / Global settings
=============================

Messaging 
======================
XMPP?

