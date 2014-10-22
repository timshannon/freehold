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
            rootDir: "/v1/file",
        }
    });

    getFiles(rMain.get("rootDir"));


    //events
    rMain.on({
        "selectFolder": function(event) {
            buildBreadcrumbs(event.keypath);
            getFiles(event.context.url);
        },
        "crumb": function(event) {
            rMain.set("fileKeypath", event.context.keypath);
            buildBreadcrumbs(event.context.keypath);
            getFiles(rMain.get("selected.url"));
        },
    });

    //functions
    function getFiles(url) {
        fh.properties.get(url)
            .done(function(result) {
                rMain.set("files", result.data);
            })
            .fail(function(result) {
                error(result.message);
            });
    }

    function buildBreadcrumbs(keypath) {
        var crumbs = [];
        var comp = rMain.findComponent("filetree");
        while (keypath.lastIndexOf(".files") > 0) {
            keypath = keypath.slice(0, keypath.lastIndexOf(".files"));
            crumbs.push({
                keypath: keypath,
                file: comp.get(keypath)
            });
        }
        crumbs.reverse();
        rMain.set("breadcrumbs", crumbs);
    }

    function error(errMsg) {
        rNav.set("error", errMsg);
    }

}); //end ready
