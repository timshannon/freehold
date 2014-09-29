#!/usr/bin/env python
import sys
import subprocess
import os
import shutil

def link(app):
    if app == "components":
        return

    print "linking " + app
    os.chdir("../application")
    if os.path.islink(app):
        os.remove(app)
    elif os.path.isdir(app):
        shutil.rmtree(app)

    subprocess.call(["ln", "-s", "../appdev/"+app, app])
    os.chdir("../appdev")

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


