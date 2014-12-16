Permissions
==========
There are two types of explicit permission types that can be applied an item in a freehold instance.

* **Read** (**r**) - The ability to view the file data, properties of the file (size, permissions, etc), or retrieve a record from a datastore file.  In the case of a folder, Read permissions refers to the ability to read the listing of the contents of the folder.
* **Write** (**w**) - The ablity to add a new record to a datastore, or write new data to an existing file.  In the case of a folder, Write permissions refers to the ability to write to the contents of the folder (e.g. create, move, or delete files in that folder).

There are 4 types of users that permissions apply to.

* **Public** - Non-authenticated access. Visitors to the freehold instance who have not logged in with valid credentials.
* **Friend** - Authenticated users who are not the current owner of the file the permissions are applying to.
* **Private** - The authenticated Owner of a given file. 
* **Admin** - Admins gain access to specific administrative functions for the freehold instance as a whole, but admin rights do not grant any additional permissions to any given file stored in the instance.  Being an admin doesn't give the right to read or write to files they don't already have access to, but it does grant several implicit permissions detailed below.

Permissions can only be set by the *Owner* of a file.  If you have Read permissions on a file, you can view the current permissions on that file as well, unless you are a Public user.

Implicit Permissions
============================
There are some implicit permissions that are gained by the nature of the access to a given process.  These permissions cannot be granted or removed.

Other implicit permissions are built into freehold, and apply to the core operations of the instance.

Files and Folders
-----------------------
* Root File Folders - The root file folder (```/v1/file/``` or ```/app/v1/file/```) can only be written to by an Admin.  A non-admin user will not be able to upload or create any files unless an admin creates a folder with the appropriate permissions for them.  The core Admin application has a checkbox that will automatically create a User Folder (a folder in which the non-admin user has Write permissions) when creating a new user.  Non-admin users can read the contents of the Root File folder, but cannot write to it.
* Datastore Folders - Datastores handle folders differently from Files, in that they aren't treated as folders, but more like simple paths.  Users don't have to manually request a Datastore folder to be created, instead they will simply be created as needed, and removed when empty.  All authenticted users have the ability to view the contents of a Datastore folder.

Sessions
------------
* Posting a session - Authenticated users
*	Viewing Existing Sessions - Authenticated users can only view their own sessions
* Log off / Delete a Session - Authenticated users can only delete their own sessions

Applications
-------------
* Viewing installed applications - Authenticated users
* Viewing applications available for install - Admins
* Installing new applications - Admins
* Posting an external application file - Admins
* Uninstalling an Application - Admins
* Upgrading an application - Admins

Docs
------
* Docs are visible to the public

Settings
------------
* View Settings - Authenticated users
* Update Settings - Admin Only

Users
--------

Tokens
-----------


Log
-----------
*View Log - Admin Only
