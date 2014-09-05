$(document).ready(function() {
    "use strict";
    //setup

    var rNav = new Ractive({
        el: "#navHook",
        template: '<navbar errorLead="{{errorLead}}" error="{{error}}"></navbar>',
        components: fh.components
    });

    var rLogs = new Ractive({
        el: "#logs",
        template: "#tLogs"
    });

    var rSettings = new Ractive({
        el: "#settings",
        template: "#tSettings"
    });

    var rUsers = new Ractive({
        el: "#users",
        template: "#tUsers"
    });


    if (!fh.auth().admin) {
        rNav.set({
            "errorLead": "You do not have admin rights and cannot use this tool: ",
            "error": '<a href="/" class="alert-link">Return to your home page</a>'
        });
    }


    loadLogs({
        order: "dsc"
    });
    loadUsers();
    loadSettings();

    //events



    //functions
    function loadLogs(iter) {
        fh.logs(iter)
            .done(function(result) {
                rLogs.set("logs", result.data);
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });

    }

    function loadSettings() {
        fh.settings.all()
            .done(function(result) {
                rSettings.set("settings", result.data);
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });
    }

    function loadUsers() {
        fh.user.all()
            .done(function(result) {
                rUsers.set("users", result.data);
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });
    }

}); //end ready
