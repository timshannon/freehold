#!/usr/bin/env python
import sys
import subprocess
import os
import shutil

def package(app):

    if app == "components":
        print "packaging components file" 
        os.chdir("./"+app)
        subprocess.call(["make"])
        os.chdir("..")
        return

    print "packaging " + app
    tmpDir = "."+app+"_tmp"

    #copy to temp folder
    shutil.copytree(app, tmpDir)

    os.chdir(tmpDir)
    if not makeFolder("./"):
        #minify
        minifyFolder("./")
    #zip
    subprocess.call(["zip", "-r", "../../application/available/"+app+".zip", ".", "-x", ".*"])
    os.chdir("..")
    #cleanup temp folder
    shutil.rmtree(tmpDir)

def makeFolder(folder):
    for path, _, files in os.walk(folder):
        for f in files:
            if f == "makefile":
                subprocess.call(["make"])
                return True

def minifyFolder(folder):
    for path, _, files in os.walk(folder):
        for f in files:
            _, ext = os.path.splitext(f)
            if ext == ".js":
                minify(os.path.join(path, f))
    
            
def minify(filename):
    print "minify file " + filename
    subprocess.call(["uglifyjs", filename, "-c", "-o", filename])



if len(sys.argv) > 1:
    #package passed in app
    app = sys.argv[1]
    if app.endswith("/"):
        app = app.rstrip("/")
    package(app)
else:
    #package all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        package(app)


