// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var timer;
    var defaultIcons = buildDefaultIcons();
    var settings = new Settings();
    settings.stars = new Stars();
    settings.fileType = new FileTypeSettings();

    var rNav = new Ractive({
        el: "#nb",
        template: "#tNav",
    });

    var rMain = new Ractive({
        el: "#pageContainer",
        template: "#tMain",
        data: {
            files: {},
            datastores: {},
            stars: {},
        },
    });

    getApps();

    settings.load(function() {
        rMain.set("sorting", settings.get("sorting", {
            by: "name",
            asc: true
        }));
        rMain.set("newWindow", settings.get("newWindow", true));
        rMain.set("folderSort", settings.get("folderSort", true));
        rMain.set("hideSidebar", settings.get("hideSidebar", false));
        setRoot();
    });

    //events
    rMain.on({
        "fileTreeSelect": function(event) {
            selectFolder(keypathFromTree(event.keypath, false));
        },
        "dsTreeSelect": function(event) {
            selectFolder(keypathFromTree(event.keypath, true));
        },
        "explorerSelect": function(event) {
            if (rMain.get("currentKeypath") === "stars") {
                openUrl(event.context.url);
                return;
            }
            selectFolder(event.context.treepath);
        },
        "crumbSelect": function(event) {
            selectFolder(event.context.keypath);
        },
        "dsOpen": function(event) {
            var keypath = keypathFromTree(event.keypath, true);
            rMain.set(keypath, setFileType(rMain.get(keypath)));
            updateFolder(event.context.url, keypath);
        },
        "tree.open": function(event) {
            var keypath = keypathFromTree(event.keypath, event.component.data.dsTree);
            updateFolder(event.context.url, keypath);
            if (event.keypath !== "root") {
                rMain.set(keypath, setFileType(rMain.get(keypath)));
            }
        },
        "star": function(event) {
            var url = event.context.url;
            if (settings.stars.isStar(url)) {
                settings.stars.remove(url);
                rMain.set(event.keypath + ".starred", false);
            } else {
                settings.stars.add(url);
                rMain.set(event.keypath + ".starred", true);
            }

        },
        "viewStarred": function(event) {
            selectFolder("stars");
        },
        "refresh": function(event) {
            openUrl(rMain.get("currentFolder.url"));
        },
        "newFolder": function(event) {
            rMain.set("newFolderName", null);
            rMain.set("newFolderError", null);
            $("#newFolder").modal();

            $("#newFolder").on("shown.bs.modal", function() {
                $("#folderName").focus();
            });
        },
        "newFolderSave": function(event) {
            if (!event.context.newFolderName) {
                rMain.set("newFolderError", "You must specify a folder name.");
                return;
            }
            event.original.preventDefault();
            var newUrl = fh.util.urlJoin(event.context.currentFolder.url, event.context.newFolderName);

            fh.file.newFolder(newUrl)
                .done(function() {
                    selectFolder(event.context.currentKeypath);
                    $("#newFolder").modal("hide");
                })
                .fail(function(result) {
                    rMain.set("newFolderError", result.message);
                });
        },
        "removeStar": function(event) {
            var stars = rMain.get("currentFolder.files");
            settings.stars.remove(event.context.url);
            stars.splice(event.index.i, 1);
        },
        "selectApp": function(event) {
            if (event.index) {
                setRoot(event.index.i);
            } else {
                setRoot();
            }
        },
        "changeView": function(event) {
            if (rMain.get("listView")) {
                rMain.set("listView", false);
                settings.put("listView", false);
            } else {
                rMain.set("listView", true);
                settings.put("listView", true);
            }
        },
        "renameFolder": function(event) {
            rMain.set("folderRename", null);
            rMain.set("renameFolderError", null);
            $("#renameFolder").modal();

            $("#renameFolder").on("shown.bs.modal", function() {
                $("#folderRename").focus();
            });
        },
        "renameFolderSave": function(event) {
            if (!event.context.folderRename) {
                rMain.set("renameFolderError", "You must specify a folder name.");
                return;
            }
            event.original.preventDefault();
            var newUrl = fh.util.urlJoin(rMain.get(parentKeypath(event.context.currentKeypath) + ".url"), event.context.folderRename);
            var oldUrl = event.context.currentFolder.url;

            fh.file.move(oldUrl, newUrl)
                .done(function() {
                    $("#renameFolder").modal("hide");
                    openUrl(newUrl);
                })
                .fail(function(result) {
                    rMain.set("renameFolderError", result.message);
                });
            if (settings.stars.isStar(oldUrl)) {
                settings.stars.remove(oldUrl);
                settings.stars.add(newUrl);
            }
        },
        "renameFile": function(event) {
            if (!event.context.name) {
                rMain.set("currentFile.renameError", "You must specify a name.");
                return;
            }
            var newUrl = event.context.url.split("/");
            newUrl.pop();
            newUrl = fh.util.urlJoin(newUrl.join("/"), event.context.name);
            var oldUrl = event.context.url;

            if (newUrl == oldUrl) {
                rMain.set("currentFile.rename", false);
                return;
            }

            fh.file.move(oldUrl, newUrl)
                .done(function() {
                    rMain.set("currentFile.rename", false);
                    if (settings.stars.isStar(oldUrl)) {
                        settings.stars.remove(oldUrl);
                        settings.stars.add(newUrl);
                    }
                    getFile(newUrl, function(file) {
                        rMain.set("currentFile", setFileType(file));
                    });
                    selectFolder(rMain.get("currentKeypath"));

                })
                .fail(function(result) {
                    rMain.set("currentFile.renameError", result.message);
                });

        },
        "deleteFolder": function(event) {
            fh.file.delete(event.context.url);
            selectFolder(parentKeypath(rMain.get("currentKeypath")));
            settings.stars.remove(event.context.url);
        },
        "sortBy": function(event, by) {
            if (rMain.get("sorting.by") === by) {
                rMain.toggle("sorting.asc");
            } else {
                rMain.set("sorting.by", by);
            }

            sortCurrent();
            settings.put("sorting", rMain.get("sorting"));
        },
        "openSettings": function(event) {
            $("#settings").modal();
        },
        "properties": function(event, url) {
            $("#properties").modal();

            getFile(url, function(file) {
                file.starred = settings.stars.isStar(url);
                rMain.set("currentFile", setFileType(file));
            });
        },
        "deleteFromProperties": function(event) {
            fh.file.delete(event.context.url);
            var keypath = rMain.get("currentKeypath");
            if (event.context.isFolder) {
                keypath = parentKeypath(keypath);
            }
            selectFolder(keypath);
            settings.stars.remove(event.context.url);

            $("#properties").modal("hide");
        },

    });

    rMain.observe({
        "newWindow": function(newValue, oldValue, keypath) {
            if (newValue !== undefined) {
                settings.put("newWindow", newValue);
                selectFolder(rMain.get("currentKeypath"));
            }
        },
        "folderSort": function(newValue, oldValue, keypath) {
            if (newValue !== undefined) {
                settings.put("folderSort", newValue);
                sortCurrent();
            }
        },
        "hideSidebar": function(newValue, oldValue, keypath) {
            if (newValue !== undefined) {
                settings.put("hideSidebar", newValue);
            }
        },
    });

    //functions
    function selectFolder(keypath) {
        var folder = rMain.get(keypath);
        document.title = folder.name + " - Explorer - freehold";

        rMain.set("currentKeypath", keypath);
        if (keypath === "stars") {
            updateStarFolder();
            return;
        }

        updateFolder(folder.url, keypath, function() {

            folder = rMain.get(keypath);
            openParent(keypath);
            buildBreadcrumbs(keypath);

            folder.files = [];

            for (var i = 0; i < folder.children.length; i++) {
                folder.files.push(folder.children[i]);
                folder.files[i].treepath = keypath + ".children." + i;
            }

            rMain.set("currentFolder", folder);
            sortCurrent();

            rMain.set("currentFolder.starred", settings.stars.isStar(folder.url));
        });

    }

    function updateFolder(url, keypath, postUpdate) {
        fh.properties.get(url)
            .done(function(result) {
                mergeFolder(result.data, keypath + ".children");
                if (postUpdate) {
                    postUpdate();
                }
            });
    }

    function setRoot(app) {
        rMain.set("app", app);
        rMain.set("files", {
            url: fh.util.urlJoin(app, "/v1/file/"),
            name: "files",
            canSelect: true,
            selected: true,
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
        rMain.set("stars", {
            name: "Starred",
            canSelect: true,
            iconClass: "glyphicon glyphicon-star",
        });
        rMain.set("listView", settings.get("listView", false));
        selectFolder("files");
    }

    function keypathFromTree(keypath, ds) {
        if (ds) {
            return keypath.replace("root", "datastores");
        }
        return keypath.replace("root", "files");
    }

    function parentKeypath(keypath) {
        var last = keypath.lastIndexOf(".children");
        if (last === -1) {
            return -1;
        }
        return keypath.slice(0, last);

    }

    function openParent(keypath) {
        keypath = parentKeypath(keypath);

        if (!rMain.get(keypath + ".open")) {
            rMain.set(keypath + ".open", true);
            rMain.set(keypath + ".iconClass", "fa fa-folder-open");
        }
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
        rMain.set("loading", true);

        updateFilesTo(urlParts[rootPlace] === "file" ? "files" : "datastores", url);
    }


    //updateFilesTo recursively updates the filetree to the destination url
    // used for url parms and bookmarks
    function updateFilesTo(fromKeypath, to) {
        var newUrl = rMain.get(fromKeypath + ".url");

        fh.properties.get(newUrl)
            .done(function(result) {
                var newKeypath = fromKeypath + ".children";
                mergeFolder(result.data, newKeypath);
                openParent(fromKeypath);
                if (newUrl.indexOf(to) !== -1) {
                    selectFolder(fromKeypath);
                    rMain.set("loading", false);
                    return;
                }


                var nextUrl = fh.util.urlJoin(newUrl, to.slice(newUrl.length).split("/")[0], "/");

                for (var i = 0; i < result.data.length; i++) {
                    if (nextUrl == result.data[i].url) {
                        updateFilesTo(newKeypath + "." + i, to);
                    }
                }
            })
            .fail(function(result) {
                error("Invalid URL: " + result.message);
            });
    }

    function mergeFolder(newFiles, keypath) {
        var current = rMain.get(keypath);

        //merge the current data with the new data so that
        // tree attributes like open and selected aren't lost
        for (var i = 0; i < newFiles.length; i++) {
            if (current) {
                var index = -1;
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
        sort(rMain.get(keypath), {
            by: "name",
            asc: true
        });
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
            var ext = file.name.slice(file.name.lastIndexOf(".") + 1);

            file.explorerIcon = settings.fileType.icon(ext) || defaultIcons[ext] || "file-o";
            file.download = settings.fileType.download(ext);
            file.hide = true; //hide from treeview
            file.humanSize = filesize(file.size); //thanks Jason Mulligan (https://github.com/avoidwork/filesize.js)
        }

        if (file.modified) {
            file.modifiedDate = new Date(file.modified).toLocaleString();
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

    function sortCurrent() {
        var sorting = rMain.get("sorting");
        var files = rMain.get("currentFolder.files");
        sort(files, sorting);
    }

    function sort(files, sorting) {
        if (!files) {
            return;
        }

        files.sort(function(a, b) {
            var sa, sb;

            if (sorting.by === "owner") {
                if (a.permissions) {
                    sa = a.permissions.owner;
                }
                if (b.permissions) {
                    sb = b.permissions.owner;
                }
            } else {
                sa = a[sorting.by];
                sb = b[sorting.by];
            }

            if (!sorting.asc) {
                var tmp = sa;
                sa = sb;
                sb = tmp;
            }

            if (settings.get("folderSort", true)) {
                if (a.isFolder && !b.isFolder) {
                    return -1;
                }

                if (b.isFolder && !a.isFolder) {
                    return 1;
                }
            }

            if (sorting.by === "modified") {
                if (sa) {
                    sa = Date.parse(sa);
                }
                if (sb) {
                    sb = Date.parse(sb);
                }
            }


            if (sa !== undefined && sb !== undefined) {
                if (sa > sb) {
                    return 1;
                }
                if (sa < sb) {
                    return -1;
                }
                return 0;
            }
            if (sa !== undefined) {
                return 1;
            }

            if (sb !== undefined) {
                return -1;
            }
            return 0;
        });

    }

    function updateStarFolder() {
        var stars = settings.get("starred", {});
        var list = Object.getOwnPropertyNames(stars);
        var folder = rMain.set("currentFolder", {
            "name": "stars",
            "files": [],
        });

        var files = rMain.get("currentFolder.files");

        var fileAdd = function(file) {
            files.push(file);
            sortCurrent();
        };

        for (var i = 0; i < list.length; i++) {
            if (list[i] === "/v1/file/") {
                fileAdd({
                    name: "files",
                    explorerIcon: "fa fa-folder-open",
                    url: list[i],
                    isFolder: true,
                });
                continue;
            }

            if (list[i] === "/v1/datastore/") {
                fileAdd({
                    name: "datastores",
                    explorerIcon: "fa fa-database",
                    url: list[i],
                    isFolder: true,
                });
                continue;
            }

            getFile(list[i], fileAdd);
        }
    }

    function getFile(url, postGet) {
        var fileurl;
        if (url.lastIndexOf("/") === url.length - 1) {
            fileurl = url.slice(0, url.length - 1);
        } else {
            fileurl = url;
        }

        fh.properties.get(fileurl)
            .done(function(result) {
                var file = result.data;

                if (!file.hasOwnProperty("url")) {
                    file.url = url;
                }
                if (!file.hasOwnProperty("name")) {
                    file.name = fileurl.split("/").pop();
                }
                file = setFileType(file);
                postGet(file);
            })
            .fail(function(result) {
                postGet({
                    name: "Error Loading File " + fileurl.split("/").pop() + ": " + result.message,
                    explorerIcon: "exclamation-triangle",
                    url: url,
                });
            });
    }

    function error(errMsg) {
        rNav.set("error", errMsg);
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


    function Stars() {
        return {
            add: function(url) {
                var stars = settings.get("starred", {});
                stars[url] = {};
                settings.put("starred", stars);
            },
            remove: function(url) {
                var stars = settings.get("starred", {});
                delete stars[url];
                settings.put("starred", stars);
            },
            isStar: function(url) {
                var stars = settings.get("starred", {});
                if (stars.hasOwnProperty(url)) {
                    return true;
                }
                return false;
            },
        };
    }

    function FileTypeSettings() {
        return {
            icon: function(filetype) {
                var file = settings.get("files", {})[filetype];
                if (file) {
                    return file.icon;
                }
                return;
            },
            app: function(filetype) {
                var file = settings.get("files", {})[filetype];
                if (file) {
                    return file.app;
                }
                return;
            },
            download: function(filetype) {
                var file = settings.get("files", {})[filetype];
                if (file) {
                    return file.download;
                }
                return false;

            }
        };

    }

    function Settings() {
            var url = "/v1/datastore/" + fh.auth.user + "/explorerSettings.ds";
            this.ds = new fh.Datastore(url);
            this.settings = {};

            function kvToObj(array) {
                var obj = {};
                for (var i = 0; i < array.length; i++) {
                    obj[array[i].key] = array[i].value;
                }
                return obj;
            }

            //Load All Settings
            this.load = function(postLoad) {
                fh.properties.get(url)
                    .done(function() {
                        this.ds.iter({})
                            .done(function(result) {
                                this.settings = kvToObj(result.data);
                                postLoad();
                            }.bind(this))
                            .fail(function(result) {
                                error(result.message);
                            });
                    }.bind(this))
                    .fail(function(result) {
                        // if not exists, create it
                        if (result.message == "Resource not found") {
                            fh.datastore.new(url)
                                .done(function() {
                                    this.ds.iter({})
                                        .done(function(result) {
                                            this.settings = kvToObj(result.data);
                                            postLoad();
                                        }.bind(this))
                                        .fail(function(result) {
                                            error(result.message);
                                        });
                                }.bind(this))
                                .fail(function(result) {
                                    error(result.message);
                                });
                        }
                    }.bind(this));
            };
            this.get = function(setting, defaultValue) {
                if (this.settings.hasOwnProperty(setting)) {
                    return this.settings[setting];
                } else {
                    return defaultValue;
                }
            };
            this.put = function(setting, value) {
                this.settings[setting] = value; //make sure setting takes effect immediately
                this.ds.put(setting, value)
                    .done(function() {
                        this.settings[setting] = value;
                    }.bind(this))
                    .fail(function(result) {
                        error(result.message);
                    });
            };

        } //Settings

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
