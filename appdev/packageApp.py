#!/usr/bin/env python
import sys
import subprocess
import os

def package(app):
    print "packaging " + app
    os.chdir(app)
    subprocess.call(["zip", "-r", "../../application/available/"+app+".zip", ".", "-x", ".*"])
    os.chdir("..")


if len(sys.argv) > 1:
    #package passed in app
    package(sys.argv[1])
else:
    #package all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        package(app)


