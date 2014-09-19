$(document).ready(function() {
    "use strict";


    //setup
    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        components: fh.components,
    });


    loadUser();
    loadSessions();

    //events




    //functions
    function loadUser() {
        rMain.set("user", fh.auth);
    }

    function loadSessions() {
        fh.session.get()
            .done(function(result) {
                var sessions = result.data;
                for (var i=0; i < sessions.length; i++) {
                    sessions[i].created = new Date(sessions[i].created).toLocaleString();
                    sessions[i].expires = new Date(sessions[i].expires).toLocaleString();
                }
                rMain.set("sessions", sessions);
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });
    }
});
