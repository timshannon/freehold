#!/usr/bin/env python
import sys
import subprocess
import os

def update(app):
    print "updating " + app
    os.chdir(app)
#fixme
    subprocess.call(["cp", "-r"," ./*", "../../application/"+app+"/"])
    os.chdir("..")


if len(sys.argv) > 1:
    #update passed in app
    update(sys.argv[1])
else:
    #update all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        update(app)
