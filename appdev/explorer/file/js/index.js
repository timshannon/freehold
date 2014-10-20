$(document).ready(function() {
    var timer;
    var dir = fh.util.urlParm("dir") || "/v1/file/";

    var rNav = new Ractive({
        el: "#nb",
        template: "#tNav",
    });

    var rMain = new Ractive({
        el: "#pageContainer",
        template: "#tMain",
        data: {
            dir: dir,
        }
    });

    getFiles(dir);


    //events
    rMain.on({
        selectFolder: function(event) {
			//TODO: get keypath
            getFiles(event.context.url);
        }

    });

    //functions
    function getFiles(folder) {
        fh.properties.get(folder)
            .done(function(result) {
                rMain.set("files", result.data);
            })
            .fail(function(result) {
                error(result.message);
            });
    }

    function error(errMsg) {
        rNav.set("error", errMsg);
    }

}); //end ready
