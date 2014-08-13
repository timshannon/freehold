Freehold
=========================
*free·hold  /ˈfrēˌhōld/*

1. Permanent and absolute tenure of land or property with freedom to dispose of it at will.
2. A personal web server for containing and managing your personal data.

About
==========
Freehold is a webserver that you can host on anything from a multi-core VPS to a Rasberry Pi.  Running the webserver is as simple as starting starting up the freehold executable.  

Once running the freehold instance exposes a simple REST API for uploading files and managing them.  There is also a built-in datastore API that allows for storing any other type of data you need.

Interacting with the REST API is done through the core applications that come with your freehold instance, and other applications can be installed easily. 

Users and Permissions
=======================
Access to files and the data stored behind the REST API is managed through a simple set of permissions.  Each file or datastore has an owner, and that owner sets the permissions to *Read* or *Write* a given file or datastore entry.  The ability to read or write can be granted at one of three levels:

1. Private - Only the Owner of the item
2. Friend - Any authenticated user on the Freehold instance
3. Public - Anyone, authenticated or not

