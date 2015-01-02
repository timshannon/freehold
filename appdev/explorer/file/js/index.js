// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var timer;
    var defaultIcons = buildDefaultIcons();
    var defaultApps = buildDefaultApps();
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
            user: fh.auth.user,
            icons: buildIconList(),
        },
    });

    getApps();
    getUsers();

    settings.load(function() {
        rMain.set("sorting", settings.get("sorting", {
            by: "name",
            asc: true
        }));
        rMain.set("newWindow", settings.get("newWindow", true));
        rMain.set("folderSort", settings.get("folderSort", true));
        rMain.set("hideSidebar", settings.get("hideSidebar", false));
        rMain.set("listView", settings.get("listView", false));

        setRoot();
        selectUserFolder();
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
                    refresh();
                    $("#newFolder").modal("hide");
                })
                .fail(function(result) {
                    result = result.responseJSON;
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
                setRoot(event.index.i, true);
            } else {
                setRoot();
                selectUserFolder();
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
            rMain.set("folderRename", event.context.name);
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

            moveFile(oldUrl, newUrl)
                .done(function() {
                    $("#renameFolder").modal("hide");
                    openUrl(newUrl);
                })
                .fail(function(result) {
                    result = result.responseJSON;
                    rMain.set("renameFolderError", result.message);
                });
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

            moveFile(oldUrl, newUrl)
                .done(function() {
                    rMain.set("currentFile.rename", false);

                    getFile(newUrl, function(file) {
                        rMain.set("currentFile", setFileType(file));
                    }, function(result) {
                        rMain.set("currentFile.renameError", result.message);
                        return;
                    });
                    if (event.context.isDir) {
                        openUrl(newUrl);
                    } else {
                        refresh();
                    }

                })
                .fail(function(result) {
                    result = result.responseJSON;
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
            $('#propTabs a:first').tab('show');
            rMain.set("currentFile", null);

            getFile(url, function(file) {
                file.starred = settings.stars.isStar(url);
                file.url = trimSlash(url);
                if (file.permissions.owner) {
                    file.showOwner = true;
                } else {
                    file.showOwner = false;
                }
                rMain.set("currentFile", setFileType(file));
            }, function(result) {
                if (result.message === "Resource not found") {
                    result.data.propError = "You do not have permissions to view the properties of this file.";
                }
                rMain.set("currentFile", result.data);
            });
        },
        "deleteFromProperties": function(event) {
            fh.file.delete(event.context.url)
                .done(function() {

                    var keypath = rMain.get("currentKeypath");
                    if (event.context.isDir) {
                        keypath = parentKeypath(keypath);
                    }
                    selectFolder(keypath);
                    settings.stars.remove(event.context.url);

                    $("#properties").modal("hide");
                })
                .fail(function(result) {
                    result = result.responseJSON;
                    rMain.set("currentFile.propError", result.message);
                });
        },
        "defaultFileBehavior": function(event) {
            var file = rMain.get("currentFile");
            settings.fileType.default(settings.fileType.ext(file.name));
            rMain.set("currentFile", setFileType(file));
        },
        "fileinput.setFiles": function(event) {
            var files = event.context.files;

            for (var i = 0; i < files.length; i++) {
                uploadFile(files[i]);
            }
        },
        "replaceUpload": function(event) {
            var file = event.context;
            file.error = false;
            file.exists = false;
            uploadFile(file, true);
        },
        "cancelUpload": function(event) {
            if (!event.context.error && event.context.xhr) {
                event.context.xhr.abort();
            } else {
                removeUpload(event.context.id);
            }
        },
        "dropzone.drop": function(files) {
            for (var i = 0; i < files.length; i++) {
                uploadFile(files[i]);
            }
        },
        "droppable.drop": function(source, dest) {
            if (source.url === dest.url) {
                return;
            }
            var newUrl = fh.util.urlJoin(dest.url, trimSlash(source.url).split("/").pop());
            if (trimSlash(source.url) == newUrl) {
                return;
            }

            moveFile(source.url, newUrl)
                .done(function() {
                    refresh();
                })
                .fail(function(result) {
                    //TODO: Better error handling.  Replace option?
                    error(result);
                });
        },

    });

    rMain.observe({
        "newWindow": function(newValue, oldValue, keypath) {
            if (newValue !== undefined) {
                settings.put("newWindow", newValue);
                refresh();
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
        "currentFile.permissions": function(newValue, oldValue, keypath) {
            if (newValue && oldValue) {
                if (newValue.owner === oldValue.owner &&
                    newValue.private === oldValue.private &&
                    newValue.public === oldValue.public &&
                    newValue.friend === oldValue.friend) {
                    //no change
                    return;
                }

                fh.properties.set(rMain.get("currentFile.url"), {
                        permissions: newValue
                    })
                    .fail(function(result) {
                        error(result);
                    });
            }
        },
        "currentFile.behavior": function(newValue, oldValue, keypath) {
            if (newValue && oldValue) {
                //FIXME:  Change seems to be happening due to different keypaths
                settings.fileType.set(rMain.get("currentFile"));
                refresh();
            }
        },
        "currentFile.explorerIcon": function(newValue, oldValue, keypath) {
            if (newValue && oldValue) {

                var file = rMain.get("currentFile");
                file.icon = file.explorerIcon;

                settings.fileType.set(file);
                refresh();
            }
        },
    });

    //functions
    function selectFolder(keypath) {
        var folder = rMain.get(keypath);
        document.title = folder.name + " - Explorer - freehold";

        var prevKeypath = rMain.get("currentKeypath");

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
        }, function() {
            //failed to update
            selectFolder(prevKeypath);
        });

    }

    function updateFolder(url, keypath, postUpdate, postFail) {
        fh.properties.get(url)
            .done(function(result) {
                mergeFolder(result.data, keypath + ".children");
                if (postUpdate) {
                    postUpdate();
                }
            })
            .fail(function(result) {
                if (postFail) {
                    result = result.responseJSON;
                    postFail(result);
                }
            });
    }

    function setRoot(app, selectRootFolder) {
        rMain.set("app", app);
        rMain.set("files", {
            url: fh.util.urlJoin("/", app, "/v1/file/"),
            name: "files",
            canSelect: true,
            selected: true,
            iconClass: "fa fa-folder-open",
            children: [],
        });
        rMain.set("datastores", {
            url: fh.util.urlJoin("/", app, "/v1/datastore/"),
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
        if (selectRootFolder) {
            selectFolder("files");
        }
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

        if (fh.util.versions().indexOf(urlParts[1]) === -1) {
            app = urlParts[1];
            rootPlace = 3;
        }

        setRoot(app);
        rMain.set("loading", true);

        updateFilesTo(urlParts[rootPlace] === "file" ? "files" : "datastores", url);
    }

    function isDS(url) {
		var s = fh.util.splitRootAndPath(url);

		if(fh.util.versions().indexOf(s[0]) !== -1) {
		}
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
                error("Invalid URL: " + result.responseJSON.message);
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
        if (file.modified) {
            file.modifiedDate = new Date(file.modified).toLocaleString();
            file.canRead = true;
        } else {
            file.canRead = false;
        }

        if (file.isDir) {
            file.explorerIcon = "folder";
            if (file.canRead) {
                file.canSelect = true;
                file.droppable = true;
            } else {
                file.open = false;
            }

            if (file.open) {
                file.iconClass = "fa fa-folder-open";
            } else {
                file.iconClass = "fa fa-folder";
            }
            if (!file.hasOwnProperty("children")) {
                file.children = [];
            }

        } else {
            var ext = settings.fileType.ext(file.name);

            file.explorerIcon = settings.fileType.icon(ext);
            file.behavior = settings.fileType.behavior(ext);
            if (file.behavior.app) {
                file.explorerUrl = fh.util.urlJoin(file.behavior.appID, "?file=", file.url);
            } else {
                file.explorerUrl = file.url;
            }

            file.hide = true; //hide from treeview
            if (file.size) {
                file.humanSize = filesize(file.size); //thanks Jason Mulligan (https://github.com/avoidwork/filesize.js)
            }
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
                if (a.isDir && !b.isDir) {
                    return -1;
                }

                if (b.isDir && !a.isDir) {
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
                    isDir: true,
                });
                continue;
            }

            if (list[i] === "/v1/datastore/") {
                fileAdd({
                    name: "datastores",
                    explorerIcon: "fa fa-database",
                    url: list[i],
                    isDir: true,
                });
                continue;
            }

            getFile(list[i], fileAdd);
        }
    }

    function trimSlash(url) {
        if (url.lastIndexOf("/") === url.length - 1) {
            return url.slice(0, url.length - 1);
        }
        return url;
    }

    function getFile(url, postGet, failGet) {
        var fileurl = trimSlash(url);

        fh.properties.get(fileurl)
            .then(function(result) {
                var file = result.data;

                if (!file.hasOwnProperty("url")) {
                    file.url = url;
                }
                if (!file.hasOwnProperty("name")) {
                    file.name = fileurl.split("/").pop();
                }
                file = setFileType(file);
                if (postGet) {
                    postGet(file);
                }
            })
            .fail(function(result) {
                result = result.responseJSON;
                if (failGet) {
                    result.data = {
                        name: fileurl.split("/").pop(),
                        url: url,
                        isDir: false,
                        size: 0,
                        permissions: {},
                    };
                    failGet(result);
                }
            });
    }

    function refresh() {
        var keypath = rMain.get("currentKeypath");
        if (keypath) {
            selectFolder(keypath);
        }
    }

    function moveFile(from, to) {
        return fh.file.move(from, to)
            .done(function() {
                if (settings.stars.isStar(from)) {
                    settings.stars.remove(from);
                    settings.stars.add(to);
                }
            });
    }

    function error(err) {
        if (err instanceof String) {
            rNav.set("error", err);
        } else {
            rNav.set("error", err.responseJSON.message);
        }
    }


    function getApps() {
        fh.application.installed()
            .done(function(result) {
                rMain.set("apps", result.data);
            })
            .fail(function(result) {
                error(result);
            });
    }

    function getUsers() {
        fh.user.all()
            .done(function(result) {
                //add empty row for empty user
                rMain.set("users", result.data);
            })
            .fail(function(result) {
                error(result);
            });
    }


    function selectUserFolder() {
        //open user folder if one exists
        var userFolder = fh.util.urlJoin("/v1/file/", fh.auth.user);
        fh.properties.get(userFolder)
            .fail(function() {
                selectFolder("files");
            })
            .done(function() {
                updateFilesTo("files", userFolder);
            });
    }

    function uploadFile(file, replace) {
        var uploadFunc;

        if (!replace) {
            uploadFunc = fh.file.upload;
        } else {
            uploadFunc = fh.file.update;
        }
        uploadPath = rMain.get("currentFolder.url");
        file = setFileType(file);

        var id = file.name.split(".").join("_"); //ractive doesn't like object ids with "." in them
        file.id = id;

        rMain.set("uploads." + id, file);

        if (!replace && fileExists(file)) {
            rMain.set("uploads." + id + ".exists", true);
            rMain.set("uploads." + id + ".error", "File already exists!");
            return;
        }

        file.xhr = uploadFunc(uploadPath, file, function(evt) {
                if (evt.lengthComputable) {
                    rMain.set("uploads." + id + ".progress", ((evt.loaded / evt.total) * 100).toFixed(1));
                }
            })
            .done(function(result) {
                removeUpload(id);
                refresh();
            })
            .fail(function(result) {
                if (result.status === 0) {
                    rMain.set("uploads." + id + ".error", "Upload Canceled");
                } else {
                    var errMsg;
                    if (result.responseJSON.failures) {
                        errMsg = result.responseJSON.failures[0].message;
                    } else {
                        errMsg = result.responseJSON.message;
                    }
                    rMain.set("uploads." + id + ".error", errMsg);
                }
            });

    }

    function fileExists(file) {
        var files = rMain.get("currentFolder.children");

        for (var i = 0; i < files.length; i++) {
            if (files[i].name === file.name) {
                return true;
            }
        }
        return false;
    }

    function removeUpload(id) {
        var uploads = rMain.get("uploads");
        delete uploads[id];
        if (Object.getOwnPropertyNames(uploads) < 1) {
            rMain.set("uploads", null);
        } else {
            rMain.set("uploads", uploads);
        }

    }

    //Settings

    function Stars() {
        return {
            add: function(url) {
                var stars = settings.get("starred", {});
                stars[trimSlash(url)] = {};
                settings.put("starred", stars);
            },
            remove: function(url) {
                var stars = settings.get("starred", {});
                delete stars[trimSlash(url)];
                settings.put("starred", stars);
            },
            isStar: function(url) {
                var stars = settings.get("starred", {});
                if (stars.hasOwnProperty(trimSlash(url))) {
                    return true;
                }
                return false;
            },
        };
    }

    function FileTypeSettings() {
        function get(filetype) {
            var file = settings.get("files", {})[filetype];
            if (!file) {
                file = {
                    behavior: {
                        download: false,
                        appID: defaultApps[filetype],
                        app: (defaultApps[filetype] !== undefined),
                        browser: (!defaultApps[filetype]),
                    },
                    icon: defaultIcons[filetype] || "file-o",
                };
            }
            return file;

        }
        return {
            ext: function(name) {
                return name.slice(name.lastIndexOf(".") + 1);
            },
            icon: function(filetype) {
                return get(filetype).icon;
            },
            behavior: function(filetype) {
                var file = get(filetype);

                var apps = rMain.get("apps");
                if (file.behavior.app && !apps[file.behavior.appID]) {
                    file.behavior.app = false;
                    file.behavior.browser = true;
                }

                return file.behavior;
            },
            set: function(file) {
                var files = settings.get("files", {});
                var ext = this.ext(file.name);

                if (!files[ext]) {
                    files[ext] = get(ext);
                }
                if (file.behavior) {
                    files[ext].behavior = file.behavior;
                }
                if (file.icon) {
                    files[ext].icon = file.icon;
                }

                settings.put("files", files);
            },
            default: function(filetype) {
                var files = settings.get("files", {});

                delete files[filetype];
                settings.put("files", files);
            },
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
                                error(result);
                            });
                    }.bind(this))
                    .fail(function(result) {
                        // if not exists, create it
                        if (result.status === 404) {
                            fh.datastore.new(url)
                                .done(function() {
                                    this.ds.iter({})
                                        .done(function(result) {
                                            this.settings = kvToObj(result.data);
                                            postLoad();
                                        }.bind(this))
                                        .fail(function(result) {
                                            error(result);
                                        });
                                }.bind(this))
                                .fail(function(result) {
                                    error(result);
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
                        error(result);
                    });
            };

        } //Settings

    function buildDefaultApps() {
        return {
            "ds": "datastore",
            "odf": "webodf",
            "ods": "webodf",
            "odt": "webodf",
        };
    }


}); //end ready
