// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var fileUrl = fh.util.urlParm("file");

    var r = new Ractive({
        el: "#ractives",
        template: "#tMain",
    });

    var nav = r.findComponent("navbar");

    MAPJS.DOMRender.stageVisibilityMargin = {
        top: 50,
        left: 10,
        bottom: 20,
        right: 20
    };
    MAPJS.DOMRender.stageMargin = {
        top: 50,
        left: 50,
        bottom: 50,
        right: 50
    };
    var container = $('#container'),
        mapModel = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, ["start here"]),
        idea;

    container.domMapWidget(console, mapModel, false);
    window.mapModel = mapModel;

    if (!fileUrl) {
        loadFile();
    } else {
        fh.properties.get(fileUrl)
            .done(function(result) {
                document.title = result.data.name + " - Mind Map - freehold";
                r.set("file", result.data);
                loadFile(result.data.url);
            })
            .fail(function(result) {
                error(result);
            });

    }

    //events
    r.on({
        "new": function() {
            r.set("saveAs", false);
            $("#newFile").modal();
        },
        "newMap": function() {
            if (!r.get("newMapName")) {
                return;
            }

            if (!r.get("saveAs")) {
                loadFile();
            }

            var newMapName = r.get("newMapName");
            var ext = newMapName.slice(newMapName.lastIndexOf(".") + 1);
            if (ext != "mup" || ext != "mmap") {
                newMapName += ".mup";
            }

            r.set("file", {
                name: newMapName,
                url: fh.util.urlJoin(r.get("newMapParent"), newMapName),
            });

            save(!r.get("newFileExists"), function() {
                window.location = "/mindmap?file=" + r.get("file.url");
            });
        },
        "save": function() {
            save();
        },
        "saveAs": function() {
            r.set("saveAs", true);
            $("#newFile").modal();
        },
        "load": function() {
            $("#fileBrowse").modal();
        },
        "loadFile": function() {
            if (r.get("selected")) {
                window.location = "/mindmap?file=" + r.get("selected");
            }
        },
        "about": function() {
            $("#about").modal();
            console.log(mapModel);
            console.log(idea);
        },
        "undo": function() {
            mapModel.undo();
        },
        "redo": function() {
            mapModel.redo();
        },
        "cut": function() {
            mapModel.cut();
        },
        "copy": function() {
            mapModel.copy();
        },
        "paste": function() {
            mapModel.paste();
        },
        "toggleCollapse": function() {
            mapModel.toggleCollapse();
        },
        "addAttachment": function() {
			$("#attachment").modal();
        },
        "saveAttachment": function() {
            //TODO:
            mapModel.setAttachment("freehold", mapModel.getCurrentlySelectedIdeaId(), {
                content: "<span class='glyphicon glyphicon-folder-open'></span>"
            });
        },
    });


    //function
    function loadFile(fileUrl) {
        if (!fileUrl) {
            idea = MAPJS.content({
                "id": 1,
                "title": "start here"
            });
            mapModel.setIdea(idea);
            return;
        }

        $.get(fileUrl, function(data) {
            idea = MAPJS.content(data);
            mapModel.setIdea(idea);
        }, "json");
    }

    function save(newFile, post) {
        var filename = r.get("file.name");
        if (!filename) {
            return;
        }

        var uploadUrl = r.get("file.url").split("/");
        uploadUrl.pop();
        uploadUrl = uploadUrl.join("/");
        var form = new FormData();

        form.append(filename,
            blob = new Blob([JSON.stringify(mapModel.getIdea())], {
                type: "application/json",
            }), filename);

        if (newFile) {
            fh.file.upload(uploadUrl, form)
                .done(function() {
                    if (post) {
                        post();
                    }
                })
                .fail(function(result) {
                    error(result);
                });
        } else {
            fh.file.update(uploadUrl, form)
                .done(function() {
                    if (post) {
                        post();
                    }
                })
                .fail(function(result) {
                    error(result);
                });
        }


    }


    //hotkeys
    $(document).bind("keypress", "ctrl+s", function(e) {
        e.preventDefault();
        save();
    });
    $(document).bind("keypress", "ctrl+n", function(e) {
        e.preventDefault();
        $("#newFile").modal();
    });
    $(document).bind("keypress", "ctrl+o", function(e) {
        e.preventDefault();
        $("#fileBrowse").modal();
    });
    $(document).bind("keypress", "ctrl+shift+s", function(e) {
        e.preventDefault();
        r.fire("saveAs");
    });



    function error(err) {
        if (typeof err === "string") {
            nav.fire("addAlert", "danger", "", err);
            return;
        } else {
            err = err.responseJSON;
            if (err.hasOwnProperty("failures")) {
                for (var i = 0; i < err.failures.length; i++) {
                    nav.fire("addAlert", "danger", "", err.failures[i].message);
                }
            } else {
                nav.fire("addAlert", "danger", "", err.message);
            }
        }
    }



}); //end ready