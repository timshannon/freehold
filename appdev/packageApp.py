#!/usr/bin/env python
import sys
import subprocess
import os

def zip(app):
    print "zipping " + app
    subprocess.call(["zip", "-r", "../application/available/"+app+".zip", app])


if len(sys.argv) > 1:
    #zip passed in app
    zip(sys.argv[1])
else:
    #zip all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        zip(app)
