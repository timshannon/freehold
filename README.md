Freehold
=========================
*free·hold  /ˈfrēˌhōld/*

1. Permanent and absolute tenure of land or property with freedom to dispose of it at will.
2. A personal web server for containing and managing your personal data.

About
==========
Freehold is a webserver that you can host on anything from a multi-core VPS to a Rasberry Pi.  Running the webserver is as simple as starting starting up the freehold executable.  

Once running the freehold instance exposes a simple REST API for uploading files and managing them.  There is also a built-in datastore API that allows for storing any other type of data you need.

Interacting with the REST API is done through the core applications that come with your freehold instance, and other applications can be installed easily.   The documentation on how to use the RESTAPI comes built in with every instance of freehold at ` https://instance-url/docs/ `

Here is a quick screencast that gives you an overview of what comes with freehold out of the box: [https://www.youtube.com/watch?v=gXYrb3ChSLs](https://www.youtube.com/watch?v=gXYrb3ChSLs)

Getting Started
==================
Freehold is made to be easy to setup and get running.  If you have the executable on your system, then you simply need to run it and open up a web browser to http://localhost.  It will then prompt you to setup your first user before taking you to your *Home* screen.  

That's it.  

There are a few more steps if you want to customize how you are hosting your instance, however. You may need to run the executable with elevated rights in order to host on the default port 80.  If you want to change which port the freehold instance runs on, you can edit the settings.json file which should get created automatically when you first run Freehold.  The location of that settings file will be printed when you run freehold, along with other possible settings file locations. That file should look something like this:

```
{
    "address": "",
    "certificateFile": "",
    "keyFile": "",
    "port": "",
    "dataDir": "./"
}
```

Simply update the port to whatever you want and restart the freehold instance.

SSL
-----------
You'll also notice that you can specify a Certificate and Key file if you want to host your instance on SSL, which is definitely recommended.

If you are hosting your freehold instance on a local network and want to take advantage of SSL encryption, you can (hopefully as a last resort) generate a [self-signed certificate](http://en.wikipedia.org/wiki/Self-signed_certificate) and key file and host using that with the *selfsign* flag `freehold -selfsign`

You can also specify where you want freehold to store your data.  By default it is the running directory of the executable.

Debian
-------------
If you are running on a Debian based system like [Raspbian](http://www.raspbian.org) or [Ubuntu](http://www.ubuntu.com) then there are pre-built deb files in the downloads section.  When installed they will automatically setup a Freehold service and a freehold user to run it.  Your data will be stored in `/var/lib/freehold` and your settings.json file will be in `/etc/freehold/settings.json`.  After installing it you can change your settings.json file to use your own ssl certs (or generate self signed ones), then run `sudo /etc/init.d/freehold start` to start up your instance.

Building From Source
======================
If you wish to build freehold from source, you'll need to first install Go.
http://golang.org/doc/install

Grab the code
```
hg clone https://bitbucket.org/tshannon/freehold
```

Change to the source directory
```
cd freehold
```

Then simply run `go install` to install to system, or `go build` to build and run it out of the source directory.

If you have your [$GOPATH environment variable](http://golang.org/doc/code.html#GOPATH) setup already, then a simple `go get bitbucket.org/tshannon/freehold` will work.

Note that if you build from source, and you change your dataDir value in the Settings file, make sure to copy the `application` and `docs` folders to your new dataDir directory, so freehold can find the core applications, available applications and documentation when it starts up.


Users and Permissions
=======================
Access to files and the data stored behind the REST API is managed through a simple set of permissions.  Each file or datastore has an owner, and that owner sets the permissions to *Read* or *Write* a given file or datastore entry.  The ability to read or write can be granted at one of three levels:

1. Private - Only the Owner of the item
2. Friend - Any authenticated user on the Freehold instance
3. Public - Anyone, authenticated or not

For example permissions on a page you want every user in the freehold instance to see, but not edit would look like this:
```
{
	owner: "your username",
	private: "rw",
	public: "",
	friend: "r"
}
```
See the documentation for more details.


Types of Data
====================
You can store any type of file you like, which can later be downloaded or viewed in the browser depending on the MIME type.  You can also store data in a Key / Value store called a *datastore*. Usually used by applications, one can GET, PUT, or DELETE any JSON describable data in the datastore.

Markdown files are automatically recognized and displayed as HTML when retrieved.

Applications
==============
Applications are just zip files of HTML, CSS, and javascript.  When you first log into your Freehold instance, you are taken to the Core Home application.  This application isn't any different from any other application, and can be completely replaced with a different Home application.  Each user in the system can choose their own Home application as well.

Authenticating External Applications
====================================
Freehold is designed to work well with more than just browser based applications. You may want to synchronize files and data with your desktop or mobile phone. 

In those cases, it's usually not a good idea to be storing your username and passwords on your phone or your desktop.  Instead you can generate *Security Tokens* that can be limited in their scope of permissions, and be set to expire. You can use these Tokens to run external applications such as might be found on your phone or your desktop.


See the built-in documentation (/docs) for more detailed information.


See CHANGELOG.md for recent changes.
