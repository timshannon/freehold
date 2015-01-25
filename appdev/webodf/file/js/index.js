// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var docUrl = fh.util.urlParm("file");
    var editor;
    var mimetype = "application/vnd.oasis.opendocument.text";

    var r = new Ractive({
        el: "#ractives",
        template: "#tMain",
    });

    var nav = r.findComponent("navbar");

    //TODO: Only create editor if file is odt
    // use viewerjs?

    Wodo.createTextEditor("editorContainer", {
            allFeaturesEnabled: true,
            userData: {
                fullName: fh.auth.user,
            },
            loadCallback: load,
            saveCallback: save,
        },
        function(err, e) {
            if (err) {
                error(err);
                return;
            }
            editor = e;

            loadFile(docUrl);
        });

    function loadFile(url) {
        fh.properties.get(url)
            .done(function(result) {
                document.title = result.data.name + " - Web ODF - freehold";
                r.set("file", result.data);
            })
            .fail(function(result) {
                error(result);
            });

        editor.openDocumentFromUrl(url, function(err) {
            if (err) {
                error("There was an error on opening the document: " + err);
            }
        });


    }

    r.on({
        "selectFile": function(event) {
            if (r.get("selected")) {

                editor.closeDocument(function() {
                    loadFile(r.get("selected"));
                    $("#fileBrowse").modal("hide");
                });
            }
        },
    });


    function load() {
        $("#fileBrowse").modal();
    }

    function save() {
        function updateFile(err, data) {
            if (err) {
                error(err);
                return;
            }

            //update file
            var filename = r.get("file.name");
            var uploadUrl = r.get("file.url").split("/");
            uploadUrl.pop();
            uploadUrl = uploadUrl.join("/");
            var form = new FormData();

            form.append(filename,
                blob = new Blob([data.buffer], {
                    type: mimetype
                }), filename);

            fh.file.update(uploadUrl, form)
                .fail(function(result) {
                    error(result);
                });
        }
        editor.getDocumentAsByteArray(updateFile);
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

});
