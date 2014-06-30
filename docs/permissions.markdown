Permissions
==========
There are two types of explicit permission types that can be applied an item in a freehold instance.

* Read (**r**) - The ability to view the file data, or retrieve a record from a datastore.
* Write (**w**) - The ablity to add a new record to a datastore.

There are 4 types of users that permissions apply to in different ways.

* Public - Non-authenticated access. Visitors to the freehold instance who have not logged in with valid credentials.
* Friend - Authenticated users who are not the current owner of the file the permissions are applying to.
* Private - The authenticated Owner of a given file. 
* Admin - Admins gain access to specific administrative functions for the freehold instance as a whole, but admin rights do not grant any additional permissions to any given file stored in the instance.  Being an admin doesn't give the right to read or write to files they don't already have access to.


There are some implicit permissions that are gained by the nature of the access to a given file.  These permissions cannot be granted or removed.

* Create a file - All authenticated users can create new files
* Delete a file - Only the Private user (owner) of the file can delete a file
* Set Permissions - Only the Private user (owner) of the file can set permissions on a file
* Read Permissions - If user has rights to read a file, then they can view the permissions on a file, unless they are public. Or in other words non-authenticated users cannot ever view file permissions.
* Viewing the existence of a folder - Permissions are granted at a file level, and there is no concept of inheritance from a parent folder.  In order to prevent unwanted information to leak publicly, the existence of folders is not visible to public users.  Authenticated users can however see if a folder exists even if they do not have access to anything in the folder.


Other implicit permissions are built into freehold, and apply to the core operations of the instance.

* Posting a session - Authenticated users
* Viewing installed applications - Authenticated users
* Viewing available applications - Admins
* Installing new applications - Admins
* Posting an external application file - Admins
* Uninstalling an Application - Admins
* Upgrading an application - Admins
