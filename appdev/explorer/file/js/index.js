$(document).ready(function() {
    var timer;

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
            sidebar: {
                view: "files",
            }
        }
    });

    getSettings();
    getApps();
    setRoot();


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
            rMain.set(event.keypath, setFileType(event.context));
            updateFolder(event.context.url, event.keypath);
        },
        "star": function(event) {
            var starred = rMain.get("starred");
            var url = event.context.url;
            if (starred[url]) {
                delete starred[url];
                rMain.set("currentFolder.starred", false);
            } else {
                starred[url] = event.context.name;
                rMain.set("currentFolder.starred", true);
            }
            rMain.set("starred", starred);
            dsSettings.put("starred", starred)
                .fail(function(result) {
                    error(result.message);
                });
        },
        "bookmarkSelect": function(event) {
            openUrl(event.index.i);
        },
        "newFolder": function(event) {
            rMain.set("newFolderName", null);
            $("#newFolder").modal();
        },
        "newFolderSave": function(event) {
            $("#newFolder").modal("hide");
            event.original.preventDefault();
            var newUrl = fh.util.urlJoin(event.context.currentFolder.url, event.context.newFolderName);
            fh.file.newFolder(newUrl)
                .done(function() {
                    updateFolder(event.context.currentFolder.url, event.context.currentKeypath);
                })
                .fail(function(result) {
                    error(result.message);
                });
        },
        "removeBookmark": function(event) {
            var starred = rMain.get("starred");
            var url = event.index.i;
            delete starred[url];
            rMain.set("currentFolder.starred", false);
            rMain.set("starred", starred);
            dsSettings.put("starred", starred)
                .fail(function(result) {
                    error(result.message);
                });

        },
        "showFiles": function(event) {
            rMain.set("sidebar.view", "files");
            setRoot(rMain.get("root.app"));
        },
        "showDS": function(event) {
            rMain.set("sidebar.view", "DS");
            setRoot(rMain.get("root.app"), true);
        },
        "showStarred": function(event) {
            rMain.set("sidebar.view", "starred");
        },
        "selectApp": function(event) {
            setRoot(event.index.i, rMain.get("sidebar.view") === "DS");
        },
        "selectBase": function(event) {
            setRoot("", rMain.get("sidebar.view") === "DS");
        }
    });

    //functions
    function selectFolder(keypath) {
        var folder = rMain.get(keypath);
        rMain.set("currentFolder", folder);
        rMain.set("currentKeypath", keypath);
        rMain.set(keypath + ".open", true);
        folder.iconClass = "fa fa-folder-open";
        updateFolder(folder.url, keypath);
        buildBreadcrumbs(keypath);
        rMain.set("selectKeypath", keypath);

        var starred = rMain.get("starred") || {};

        if (starred.hasOwnProperty(folder.url)) {
            rMain.set("currentFolder.starred", true);
        }
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

    function setRoot(app, datastore) {
        var root = datastore ? "/v1/datastore" : "/v1/file";

        rMain.set("root", {
            app: app,
            url: fh.util.urlJoin(app, root),
            name: root,
            canSelect: true,
            iconClass: "fa fa-folder-open",
        });

        selectFolder("root");
    }

    function openUrl(url) {
        var urlParts = url.split("/");
        var app;
        var rootPlace = 2;

        if (urlParts[1] !== "v1") {
            app = urlParts[1];
            rootPlace = 3;
        }

        if (urlParts[rootPlace] === "datastore") {
            setRoot(app, true);
        } else {
            setRoot(app, false);
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
            file.explorerIcon = "folder";
            file.isFolder = true;
            file.canSelect = true;
            if (file.open) {
                file.iconClass = "fa fa-folder-open";
            } else {
                file.iconClass = "fa fa-folder";
            }
            if (!file.hasOwnProperty("children")) {
                file.children = [];
            }
        } else {
            file.explorerIcon = "file-o";
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
                        var starred = result.data;
                        rMain.set("starred", result.data);
                        if (starred[rMain.get("currentFolder.url")]) {
                            rMain.set("currentFolder.starred", true);
                        }
                    })
                    .fail(function(result) {
                        if (result.status == "error") {
                            error(result.message);
                        } else {
                            dsSettings.put("starred", {})
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
                        .fail(function(result) {
                            error(result.message);
                        });
                }
            });
    }

    function getApps() {
        fh.application.installed()
            .done(function(result) {
                rMain.set("apps", result.data);
            })
            .fail(function(result) {
                error(result.message);
            });
    }

}); //end ready
