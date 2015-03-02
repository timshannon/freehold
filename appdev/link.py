#!/usr/bin/env python
import sys
import subprocess
import os
import shutil

def link(app):
    if not isApp(app):
        return
 
    print "linking " + app
    os.chdir("../application")
    if os.path.islink(app):
        os.remove(app)
    elif os.path.isdir(app):
        shutil.rmtree(app)

    subprocess.call(["ln", "-s", "../appdev/"+app, app])
    os.chdir("../appdev")

def isApp(folder):
    for path, _, files in os.walk(folder):
        for f in files:
            if f == "app.json":
                return True

    return False

if len(sys.argv) > 1:
    #link passed in app
    app = sys.argv[1]
    if app.endswith("/"):
        app = app.rstrip("/")
    link(app)
else:
    #link all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        link(app)


