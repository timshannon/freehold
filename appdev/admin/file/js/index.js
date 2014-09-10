$(document).ready(function() {
    "use strict";

    var logPageLimit = 20;

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
                limit: logPageLimit
            },
            page: {
                start: 0,
                end: logPageLimit,
            }
        },
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
    var timer;
    rLogs.observe("filterText", function(newValue, oldValue, keypath) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(loadLogs, 200);
    });
    rLogs.on({
        "sort": function(event) {
            if (event.context.iter.order == "asc") {
                rLogs.set("iter.order", "dsc");
            } else {
                rLogs.set("iter.order", "asc");
            }

            loadLogs();

        },
        "filterAll": function(event) {
            rLogs.set("iter.type", "");
            loadLogs();
        },
        "filterError": function(event) {
            rLogs.set("iter.type", "error");
            loadLogs();
        },
        "filterFail": function(event) {
            rLogs.set("iter.type", "fail");
            loadLogs();

        },
        "filterAuth": function(event) {
            rLogs.set("iter.type", "authentication");
            loadLogs();
        },
        "next": function(event) {
            var page = rLogs.get("page");
            var iter = rLogs.get("iter");
            var logs = rLogs.get("logs");
            var last = rLogs.get("last");

            page.start += iter.limit;
            page.end += iter.limit;

            rLogs.set("page", page);
            if (!last) {
                if (logs.length < page.end) {
                    loadNextLogs(page.start);
                }
            }

        },
        "prev": function(event) {
            var page = rLogs.get("page");
            var iter = rLogs.get("iter");
            if (page.start === 0) {
                return;
            }
            page.start -= iter.limit;
            page.end -= iter.limit;

            rLogs.set("page", page);
        }
    });

    //functions
    function loadLogs() {
        rLogs.set("filterWaiting", true);
        var iter = rLogs.get("iter");
        rLogs.set("page.start", 0);
        rLogs.set("page.end", iter.limit);
        iter.skip = 0;

        fh.logs(iter)
            .done(function(result) {
                var logs = result.data;
                rLogs.set("last", logs.length < iter.limit);
                rLogs.set("iter", iter);
                rLogs.set("logs", logs);

                setFilter(rLogs.get("filterText"));
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });

    }

    function loadNextLogs(skip) {
        var iter = rLogs.get("iter");
        iter.skip = skip;

        fh.logs(iter)
            .done(function(result) {
                var newLogs = result.data;
                var logs = rLogs.get("logs");
                if (!logs) {
                    logs = [];
                }
                var last = newLogs.length < iter.limit;
                rLogs.set("last", last);
                rLogs.set("iter", iter);

                logs = logs.concat(newLogs);
                rLogs.set("logs", logs);
                setFilter(rLogs.get("filterText"));
            })
            .fail(function(result) {
                rNav.set("error", result.message);
            });
    }

    function setFilter(filter) {
        var logs = rLogs.get("logs");
        var iter = rLogs.get("iter");
        var last = rLogs.get("last");
        logs = filterLogs(logs, filter);
        rLogs.set("logs", logs);

        if (logs.length < iter.limit && !last) {
            loadNextLogs(iter.skip + iter.limit);
            return;
        }
        rLogs.set("filterWaiting", false);
    }

    function filterLogs(logs, filter) {
        if (!filter) {
            return logs;
        }
        var regEx = new RegExp(filter, "i");
        var filtered = [];

        for (var i = 0; i < logs.length; i++) {
            if (regEx.exec(logs[i].log)) {
                filtered.push(logs[i]);
            }
        }

        return filtered;
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
