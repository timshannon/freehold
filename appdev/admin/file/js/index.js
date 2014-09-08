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
        template: "#tLogs",
        data: {
            iter: {
                order: "dsc",
                limit: 5,
                skip: 0
            }
        }
    });

    var rSettings = new Ractive({
        el: "#settings",
        template: "#tSettings"
    });

    var rUsers = new Ractive({
        el: "#users",
        template: "#tUsers"
    });


    if (!fh.auth.admin) {
        rNav.set({
            "errorLead": "You do not have admin rights and cannot use this tool: ",
            "error": '<a href="/" class="alert-link">Return to your home page</a>'
        });
    }

    loadLogs();
    loadUsers();
    loadSettings();

    //events
    rLogs.observe("filterText", function(newValue, oldValue, keypath) {
        setLogFilter(newValue);
    });
    rLogs.on({
        "submit": function(event) {
            event.original.preventDefault();
        },
        "sort": function(event) {
            if (event.context.sortAsc) {
                event.context.iter.order = "dsc";
            } else {
                event.context.iter.order = "asc";
            }

            loadLogs();

        },
        "filterAll": function(event) {
            event.context.iter.type = "";
            event.context.iter.skip = 0;

            loadLogs();
        },
        "filterError": function(event) {
            event.context.iter.type = "error";
            event.context.iter.skip = 0;
            loadLogs();
        },
        "filterFail": function(event) {
            event.context.iter.type = "fail";
            event.context.iter.skip = 0;
            loadLogs();

        },
        "filterAuth": function(event) {
            event.context.iter.type = "authentication";
            event.context.iter.skip = 0;
            loadLogs();
        },
        "next": function(event) {
            event.context.iter.skip += event.context.iter.limit;
            loadLogs();
        },
        "prev": function(event) {
            event.context.iter.skip -= event.context.iter.limit;
            loadLogs();
        }
    });

    //functions
    function loadLogs() {
        var iter = rLogs.get("iter");
        fh.logs(iter)
            .done(function(result) {

                if (iter.order == "asc") {
                    rLogs.set("sortAsc", true);
                } else {
                    rLogs.set("sortAsc", false);
                }

                rLogs.set("iter", iter);
                rLogs.set("logs", result.data);
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });

    }

    function setLogFilter(filter) {
        var logs = rLogs.get("logs");
        var iter = rLogs.get("iter");

        //reset iterator to first page
        iter.skip = 0;

		//TODO: start here
        while (logs.length <= iter.limit) {
            filterLogs(logs, filter, limit);

        }

    }

    function filterLogs(logs, filter, limit) {
        if (!filter) {
            return;
        }
        var regEx = new RegExp(filter, "i");
        var filtered = [];

        for (var i = 0; i < logs.length; i++) {
            if (regEx.exec(logs[i].log)) {
                filter.push(logs[i]);
            }
            if (filter.length >= limit) {
                break;
            }
        }

        logs = filter;
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
