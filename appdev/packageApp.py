#!/usr/bin/env python
import sys
import subprocess
import os
import shutil

def package(app):
    print "packaging " + app
    tmpDir = "."+app+"_tmp"

    #copy to temp folder
    shutil.copytree(app, tmpDir)

    os.chdir(tmpDir)
    #minify
    minifyFolder("./")
    #zip
    subprocess.call(["zip", "-r", "../../application/available/"+app+".zip", ".", "-x", ".*"])
    os.chdir("..")
    #cleanup temp folder
    shutil.rmtree(tmpDir)

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
    package(sys.argv[1])
else:
    #package all apps in appdev dir
    apps = [f for f in os.listdir("./") if not os.path.isfile(f)]

    for app in apps:
        package(app)


