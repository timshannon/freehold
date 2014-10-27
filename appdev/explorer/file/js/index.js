$(document).ready(function() {
    var timer;
    var file = fh.util.urlParm("file");

    var usrSettingsDS = "/v1/datastore/" + fh.auth.user + "/explorerSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);

    var rNav = new Ractive({
        el: "#nb",
        template: "#tNav",
    });

    var rMain = new Ractive({
        el: "#pageContainer",
        template: "#tMain",
        data: {
            root: {
                url: "/v1/file",
                name: "/v1/file",
                canSelect: true,
                glyphicon: "folder-open"
            }
        }
    });

    getSettings();


    if (file) {
        openUrl(file);
    } else {
        selectFolder("root");
    }

    //events
    rMain.on({
        "treeSelect": function(event) {
            selectFolder(event.keypath);
        },
        "explorerSelect": function(event) {
            selectFolder(event.keypath.replace("currentFolder", rMain.get("currentKeypath")));
        },
        "crumbSelect": function(event) {
            selectFolder(event.context.keypath);
        },
        "tree.open": function(event) {
            updateFolder(event.context.url, event.keypath);
        }
    });

    //functions
    function selectFolder(keypath) {
        var folder = rMain.get(keypath);
        rMain.set("currentFolder", folder);
        rMain.set("currentKeypath", keypath);
        rMain.set(keypath + ".open", true);
        updateFolder(folder.url, keypath);
        buildBreadcrumbs(keypath);
        rMain.set("selectKeypath", keypath);
    }

    function updateFolder(url, keypath) {
        fh.properties.get(url)
            .done(function(result) {
                mergeFolder(result.data, keypath + ".children");
            })
            .fail(function(result) {
                error(result.message);
            });
    }


    function openUrl(url) {
        if (url.lastIndexOf("/v1/datastore/") === -1 && url.lastIndexOf("/v1/file/") === -1) {
            error("Invalid URL parameter specified.  File must start wtih /v1/datastore/ or /v1/file/");
            return;
        }

        if (url.lastIndexOf("/") === url.length - 1) {
            url = url.slice(0, url.length - 1);
        }

        updateFilesTo("root", url);

    }


	//updateFilesTo recursively updates the filetree to the destination url
	// used for url parms and bookmarks
    function updateFilesTo(fromKeypath, to) {
        var newUrl = rMain.get(fromKeypath + ".url");

        fh.properties.get(newUrl)
            .done(function(result) {
                var newKeypath = fromKeypath + ".children";
                mergeFolder(result.data, newKeypath);
                if (newUrl.indexOf(to) !== -1) {
                    selectFolder(fromKeypath);
                    return;
                }

                var kparts = newUrl.split("/");
                var uparts = to.split("/");

                kparts.push(uparts[kparts.length]);

                var nextUrl = kparts.join("/");
                for (var i = 0; i < result.data.length; i++) {
                    if (nextUrl == result.data[i].url) {
                        updateFilesTo(newKeypath + "." + i, to);
                    }
                }
            })
            .fail(function(result) {
                //TODO: Proper Invalid file error
                error(result.message);
            });
    }

    function mergeFolder(newFiles, keypath) {
        var current = rMain.get(keypath);
        var index = -1;

        //merge the current data with the new data so that
        // tree attributes like open and selected aren't lost
        for (var i = 0; i < newFiles.length; i++) {
            if (current) {
                for (var j = 0; j < current.length; j++) {
                    if (newFiles[i].url === current[j].url) {
                        index = j;
                        break;
                    }
                }
                if (index >= 0) {
                    mergeAttributes(current[index], newFiles[i]);
                }
            }
            newFiles[i] = setFileType(newFiles[i]);
        }

        rMain.set(keypath, newFiles);
        rMain.update("currentFolder"); //update currentFolder so view reflects new data
    }

    function mergeAttributes(current, newval) {
        for (var a in current) {
            if (!newval.hasOwnProperty(a)) {
                newval[a] = current[a];
            }
            if (a === "children") {
                //don't overwrite existing children
                newval[a] = current[a];
            }
        }
    }


    function setFileType(file) {
        if (!file.hasOwnProperty("size")) {
            file.explorerIcon = "/explorer/v1/file/image/icons/folder.png";
            file.isFolder = true;
            file.canSelect = true;
            file.glyphicon = "folder-close";
            if (!file.hasOwnProperty("children")) {
                file.children = [];
            }
        } else {
            file.explorerIcon = "/explorer/v1/file/image/icons/file.png";
            file.hide = true;
        }

        return file;
    }

    function buildBreadcrumbs(keypath) {
        var crumbs = [];
        while (keypath.lastIndexOf(".children") > 0) {
            keypath = keypath.slice(0, keypath.lastIndexOf(".children"));
            crumbs.push({
                keypath: keypath,
                file: rMain.get(keypath)
            });
        }
        crumbs.reverse();
        rMain.set("breadcrumbs", crumbs);
    }

    function error(errMsg) {
        rNav.set("error", errMsg);
    }

    function getSettings() {
        //Get User's setting DS if exists
        fh.properties.get(usrSettingsDS)
            .done(function() {
                dsSettings.get("starred")
                    .done(function(result) {
                        starred = result.data;
                        //TODO
                    })
                    .fail(function(result) {
                        if (result.status == "error") {
                            error(result.message);
                        } else {
                            dsSettings.put("starred", {})
                                .done(function() {
                                    //TODO
                                })
                                .fail(function(result) {
                                    error(result.message);
                                });

                        }
                    });
            })
            .fail(function(result) {
                // if not exists, create it
                if (result.message == "Resource not found") {
                    fh.datastore.new(usrSettingsDS)
                        .done(function() {
                            //TODO
                        })
                        .fail(function(result) {
                            error(result.message);
                        });
                }
            });

    }

}); //end ready
