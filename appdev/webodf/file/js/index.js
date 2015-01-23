// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {

    var rNav = new Ractive({
        el: "#nb",
        template: "#tNav",
    });

    var nav = rNav.findComponent("navbar");

    //TODO: https://github.com/kogmbh/Wodo.TextEditor_release/blob/master/HOWTO.md
    function error(err) {
        var msg;
        if (typeof err === "string") {
            msg = err;
        } else {
            msg = err.responseJSON.message;
        }
        nav.fire("addAlert", "danger", "", msg);
    }

});
