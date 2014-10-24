$(document).ready(function() {
    var timer;

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
                name: "/v1/file"
            }
        }
    });

    updateFolder(rMain.get("root.url"), "root");

    //events
    rMain.on({
        "selectFolder": function(event) {
            updateFolder(event.context.url, event.keypath);
            rMain.set("currentFolder", rMain.get(keypath));
            //rMain.set("selectKeypath", keypath);

        },
        "tree.open": function(event) {
            updateFolder(event.context.url, event.keypath);
        }
    });

    //functions
    function updateFolder(url, keypath) {
        fh.properties.get(url)
            .done(function(result) {
                mergeFolder(result.data, keypath + ".children");
            })
            .fail(function(result) {
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
                    mergeAttribute(current[index], newFiles[i]);
                }
            }
            newFiles[i] = setFileType(newFiles[i]);
        }

		rMain.set(keypath, newFiles);
    }

    function mergeAttribute(current, newval) {
        for (var a in current) {
            if (!newval.hasOwnProperty(a)) {
                newval[a] = current[a];
            }
        }
    }


    function setFileType(file) {
        if (!file.hasOwnProperty("size")) {
            file.icon = "/explorer/v1/file/image/icons/folder.png";
            file.isFolder = true;
        } else {
            file.icon = "/explorer/v1/file/image/icons/file.png";
        }

        return file;
    }

    function error(errMsg) {
        rNav.set("error", errMsg);
    }

}); //end ready
