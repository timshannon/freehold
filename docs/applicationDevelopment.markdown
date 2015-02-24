Application Development
=======================
Freehold applications can be built on any web technology, but this document specifically covers the libraries and tools used in the core applications that come bundled with the freehold instance.

The core applications are built in the *appdev* folder in the source directory.  Each folder folder in the appdev directory is a separate application (with the exception of the components directory, more on that later).  Also in that directory are two python scripts: `package.py` and `link.py`.   

`package.py` takes one argument which is the path to the application folder you want to package into an application file.  It moves the application folder's contents into a temporary folder, minifies / uglifies the js source, the zips it all up into the *available applications* directory for the freehold instance. If a makefile is found it will be run instead of minification.

`link.py` also takes the application folder as an argument, and creates a link between your application folder and the *installed applications* directory.  This allows you to developer your application and see immediate updates in the freehold instance without having to re-install your application.


Starting Template
=================
Below are the steps you would take to create a new application called *new-app*

* Create a folder in appdev called *new-app*.
* Create a new app.json file in that folder:
```
{
	"id": "new-app",
	"name": "New Application",
	"version": "0.1",
	"description": "Sample application for documentation purposes",
	"author": "Tim Shannon - shannon.timothy@gmail.com",
	"root": "/new-app/v1/file/index.html",
	"icon": "/new-app/v1/file/images/icon.png"
}
```
* Create a file folder inside of `appdev/new-app`.
* Create index.html inside of `appev/new-app/file/`.  This will be the entry point for the application.
* Use the following as a starting template for your *index.html* file.
```
<!DOCTYPE html>
<html>
  <head>
    <title>freehold - New App</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

		<!-- global freehold css, imports bootstrap -->
		<link href="/core/v1/file/css/freehold.css" rel="stylesheet" media="screen"> 

		<!-- app specific css -->
		<link href="/new-app/v1/file/css/index.css" rel="stylesheet" media="screen"> 
	</head>
<body>
<main>
</main>
			
<!--templates-->
<script id="tMain" type="text/ractive">
<!-- ractive template here-->
</script>
<!--end templates-->

<script src="/core/v1/file/js/jquery-2.1.1.min.js"></script>
<script src="/core/v1/file/js/bootstrap.min.js"></script>
<script src="/core/v1/file/js/ractive.min.js"></script>

<!-- freehold library -->
<script src="/core/v1/file/js/fh.js"></script>

<!-- optional reusable ractive ui components  -->
<script src="/core/v1/file/js/components.js"></script>

<!-- your application's code  -->
<script src="/new-app/v1/file/js/index.js"></script>
</body>
</html>
```

Components
===========
In the appdev/components directory is a list of [Ractive Components](https://github.com/ractivejs/component-spec), that are automatically available to all Ractive instances if you include the `/core/v1/file/js/components.js` in your application.  These components provide re-usable UI elements like, drag and drop, selecting, color picking, date picking, etc.  You'll find examples of their use all throughout the core applications.


Tips
====

* When checking if a file or datastore exists, it's faster to check it's properties then to try to download the whole file.  It'll 404 either way if it doesn't exist.
* For the most part all data should be stored in the regular folder paths (`/v1/file` and `/v1/datastore/`) instead of in the application folder paths (`/app-id/v1/file` and `/app-id/v1/datastore`).  Anything saved in the application file paths will be deleted if the application is removed.  Store user data in the proper place.
