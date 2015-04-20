// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var fileUrl = fh.util.urlParm("file");
    var cmRead = new commonmark.Parser();
    var cmWrite = new commonmark.HtmlRenderer();

    var r = new Ractive({
        el: "#ractives",
        template: "#tMain",
    });

    var nav = r.findComponent("navbar");
    var colorpicker = r.findComponent("colorpicker");

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
        imgControl = new MAPJS.ImageInsertController(),
        idea;

    r.set("waiting", true);

    container.domMapWidget(console, mapModel, false, imgControl);
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

            if (ext != "mup" && ext != "mmap") {
                newMapName += ".mup";
            }

            r.set("file", {
                name: newMapName,
                url: fh.util.urlJoin(r.get("newMapParent.url"), newMapName),
            });

            save(!r.get("newFileExists"), function() {
                window.location = "/mindmap?file=" + r.get("file.url");
            });
        },
        "save": function() {
            var filename = r.get("file.name");
            if (!filename) {
                r.fire("saveAs");
                return;
            }
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
                window.location = "/mindmap?file=" + r.get("selected.url");
            }
        },
        "about": function() {
            $("#about").modal();
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
        "pasteStyle": function() {
            mapModel.pasteStyle();
        },
        "toggleCollapse": function() {
            mapModel.toggleCollapse();
        },
        "addAttachment": function() {
            r.set("markdown", "");
            r.set("parsed", "");
            $('#cmEditorTabs a[href="#edit"]').tab('show');
            $("#attachment").modal();

            $("#attachment").on("shown.bs.modal", function() {
                $("#mdInput").focus();
            });
        },
        "deleteAttachment": function() {
            mapModel.setAttachment("freehold", mapModel.getCurrentlySelectedIdeaId(), {});
            $("#attachment").modal("hide");

        },
        "saveAttachment": function() {
            mapModel.setAttachment("freehold", mapModel.getCurrentlySelectedIdeaId(), {
                content: r.get("markdown"),
            });
            $("#attachment").modal("hide");
        },
        "parse": function() {
            r.set("parsed", cmWrite.render(cmRead.parse(r.get("markdown"))));
        },
        "setColor": function(event) {
            event.original.preventDefault();
            var coor = $(event.node).offset();
            coor.left += $(event.node.parentNode).width();
            showColorPicker(coor);
            return false;
        },
        "colorpicker.select": function(color) {
            mapModel.updateStyle("freehold", "background", color);
            $("#contextMenu").removeClass("open");
        },
    });

    mapModel.addEventListener("attachmentOpened", function(nodeId, attachment) {
        $('#cmEditorTabs a[href="#view"]').tab('show');
        r.set("markdown", attachment.content);
        r.fire("parse");
        $("#attachment").modal();
    });

    mapModel.addEventListener("imageLoadStarted", function() {
        r.set("waiting", true);
    });

    mapModel.addEventListener("imageInserted", function() {
        r.set("waiting", false);
    });
    mapModel.addEventListener("layoutChangeComplete", function() {
        r.set("waiting", false);
    });
    mapModel.addEventListener("contextMenuRequested", function(currentlySelectedIdeaId, eventPointX, eventPointY) {
        $(colorpicker.get("node")).spectrum("hide");
        $("#contextMenu").addClass("open");
        $("#contextMenu").offset({
            left: eventPointX,
            top: eventPointY
        });
    });


    $("#editMenuDropDown").on("show.bs.dropdown", function() {
        $("#contextMenu").removeClass("open");
    });
    $("#editMenuDropDown").on("hidden.bs.dropdown", function() {
        $(colorpicker.get("node")).spectrum("hide");
    });

    $(document).bind("click", function(e) {
        if (e.button !== 2) {
            $("#contextMenu").removeClass("open");
        }
    });



    //functions
    function loadFile(fileUrl) {
        if (!fileUrl) {
            idea = MAPJS.content({
                "id": 1,
                "title": "start here"
            });
            mapModel.setIdea(idea);
            r.set("waiting", false);
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

        r.set("waiting", true);
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
                    r.set("waiting", false);
                })
                .fail(function(result) {
                    error(result);
                    r.set("waiting", false);
                });
        } else {
            fh.file.update(uploadUrl, form)
                .done(function() {
                    if (post) {
                        post();
                    }
                    r.set("waiting", false);
                })
                .fail(function(result) {
                    error(result);
                    r.set("waiting", false);
                });

        }


    }

    function showColorPicker(coordinates) {
        r.set("colorPickerCoordinates", coordinates);
        var color = mapModel.getSelectedStyle("background");
        var node = colorpicker.get("node");
        var container = $(node).spectrum("container");
        $(node).spectrum("set", color);
        $(node).spectrum("show");
        if (coordinates) {
            $(container).offset(coordinates);
        }
    }

    $(colorpicker.get("node")).on("reflow.spectrum", function(e) {
        var container = $(e.target).spectrum("container");
        var coordinates = r.get("colorPickerCoordinates");
        if (coordinates) {
            $(container).offset(coordinates);
        }
    });


    //hotkeys
    $(document).bind("keydown", "ctrl+s", function(e) {
        e.preventDefault();
        r.fire("save");
    });
    $(document).bind("keydown", "ctrl+n", function(e) {
        e.preventDefault();
        $("#newFile").modal();
    });
    $(document).bind("keydown", "ctrl+o", function(e) {
        e.preventDefault();
        $("#fileBrowse").modal();
    });
    $(document).bind("keydown", "ctrl+shift+s", function(e) {
        e.preventDefault();
        r.fire("saveAs");
    });
    $(document).bind("keydown", "ctrl+a", function(e) {
        e.preventDefault();
        r.fire("addAttachment");
    });
    $(document).bind("keydown", "ctrl+r", function(e) {
        e.preventDefault();

        $("#contextMenu").removeClass("open");
        showColorPicker(selectedNodePos());
    });


    function selectedNodePos() {
        var node = $(".mapjs-node.selected");
        var coor = node.offset();
        coor.left += node.width();
        coor.top += node.height();

        return coor;
    }


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
