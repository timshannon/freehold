$(document).ready(function() {
    var timer;
    var defaultIcons = buildDefaultIcons();
    var usrSettingsDS = "/v1/datastore/" + fh.auth.user + "/explorerSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);

    var rNav = new Ractive({
        el: "#nb",
        template: "#tNav",
    });

    var rMain = new Ractive({
        el: "#pageContainer",
        template: "#tMain",
    });

    getSettings();
    getApps();
    setRoot();


    //events
    rMain.on({
        "fileTreeSelect": function(event) {
            selectFolder(keypathFromTree(event.keypath, false));
        },
        "dsTreeSelect": function(event) {
            selectFolder(keypathFromTree(event.keypath, true));
        },
        "explorerSelect": function(event) {
            selectFolder(event.keypath.replace("currentFolder", rMain.get("currentKeypath")));
        },
        "crumbSelect": function(event) {
            selectFolder(event.context.keypath);
        },
        "dsOpen": function(event) {
            updateFolder(event.context.url, keypathFromTree(event.keypath, true));
        },
        "fileOpen": function(event) {
            updateFolder(event.context.url, keypathFromTree(event.keypath));
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
        "selectApp": function(event) {
            setRoot(event.index.i);
        },
        "selectBase": function(event) {
            setRoot();
        }
    });

    //functions
    function selectFolder(keypath) {
        var folder = rMain.get(keypath);

        rMain.set("currentFolder", folder);
        rMain.set("currentKeypath", keypath);
        rMain.set(keypath + ".open", true);
        if (keypath !== "datastores" && keypath !== "files" && keypath !== "stars") {
            folder.iconClass = "fa fa-folder-open";
        }
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
            });
    }

    function setRoot(app) {
        rMain.set("app", app);
        rMain.set("files", {
            url: fh.util.urlJoin(app, "/v1/file/"),
            name: "files",
            canSelect: true,
            iconClass: "fa fa-folder-open",
            children: [],
        });
        rMain.set("datastores", {
            url: fh.util.urlJoin(app, "/v1/datastore/"),
            name: "datastores",
            canSelect: true,
            iconClass: "fa fa-database",
            children: [],
        });

        selectFolder("files");
    }

    function keypathFromTree(keypath, ds) {
        if (ds) {
            return keypath.replace("root", "datastores");
        }
        return keypath.replace("root", "files");
    }

    function openUrl(url) {
        var urlParts = url.split("/");
        var app;
        var rootPlace = 2;

        if (urlParts[1] !== "v1") {
            app = urlParts[1];
            rootPlace = 3;
        }

        setRoot(app);

        if (url.lastIndexOf("/") === url.length - 1) {
            url = url.slice(0, url.length - 1);
        }

        updateFilesTo(urlParts[rootPlace], url);

    }


    //updateFilesTo recursively updates the filetree to the destination url
    // used for url parms and bookmarks
    function updateFilesTo(fromKeypath, to) {
        var newUrl = rMain.get(fromKeypath + ".url");

        fh.properties.get(newUrl)
            .done(function(result) {
                var newKeypath = fromKeypath + ".children";
                mergeFolder(result.data, newKeypath);
                rMain.set(fromKeypath + ".open", true);
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
                error("Bookmark may be invalid: " + result.message);
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
            file.explorerIcon = icon(file.name);
            file.hide = true;
        }

        return file;
    }

    function icon(file) {
        var ext = file.slice(file.lastIndexOf(".") + 1);

        return rMain.get("settings.files." + ext + ".icons.") || defaultIcons[ext] || "file-o";
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
                getStarred();
                getFileSettings();
            })
            .fail(function(result) {
                // if not exists, create it
                if (result.message == "Resource not found") {
                    fh.datastore.new(usrSettingsDS)
                        .done(function() {
                            getStarred();
                            getFileSettings();
                        })
                        .fail(function(result) {
                            error(result.message);
                        });
                }
            });
    }

    function getStarred() {
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
                        .done(function() {
                            rMain.set("starred", {});
                        })
                        .fail(function(result) {
                            error(result.message);
                        });
                }
            });

    }

    function getFileSettings() {
        dsSettings.get("files")
            .done(function(result) {
                rMain.set("settings.files", result.data);
            })
            .fail(function(result) {
                if (result.status == "error") {
                    error(result.message);
                } else {
                    dsSettings.put("files", {})
                        .done(function() {
                            rMain.set("files", {});
                        })
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



    function buildDefaultIcons() {
        return {
            "ds": "database",
            "xls": "file-excel-o",
            "ods": "file-excel-o",
            "xlsx": "file-excel-o",
            "pdf": "file-pdf-o",
            "wav": "file-audio-o",
            "ogg": "music",
            "mp3": "music",
            "flac": "music",
            "odt": "file-word-o",
            "doc": "file-word-o",
            "docx": "file-word-o",
            "zip": "file-archive-o",
            "gz": "file-archive-o",
            "7z": "file-archive-o",
            "rar": "file-archive-o",
            "png": "file-image-o",
            "jpg": "file-image-o",
            "jpeg": "file-image-o",
            "gif": "file-image-o",
            "bmp": "file-image-o",
            "mov": "file-movie-o",
            "mpg": "file-movie-o",
            "mpeg": "file-movie-o",
            "mkv": "file-movie-o",
            "ogv": "file-movie-o",
            "avi": "file-movie-o",
            "txt": "file-text-o",
            "xml": "file-code-o",
            "html": "file-code-o",
            "js": "file-code-o",
            "css": "file-code-o",
            "sh": "file-code-o",
            "epub": "book",
            "mobi": "book",
            "azw3": "book",
            "azw": "book",
            "kf8": "book",
            "torrent": "share-alt",
        };

    }
}); //end ready
