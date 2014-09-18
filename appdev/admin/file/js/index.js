$(document).ready(function() {
    "use strict";

    var logPageLimit = 20;
    var defaultHome;
    var minPassLength;
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //I hate this

    //setup
    var rNav = new Ractive({
        el: "#navHook",
        template: '<navbar errorLead="{{errorLead}}" error="{{error}}"></navbar>',
        components: {
            navbar: fh.components.navbar
        }
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
        template: "#tSettings",
        data: {
            mode: "change",
        }
    });

    var rUsers = new Ractive({
        el: "#users",
        template: "#tUsers",
        components: {
            modal: fh.components.modal
        },
        data: {
            auth: fh.auth
        }
    });

    fh.settings.get("DefaultHomeApp")
        .done(function(result) {
            defaultHome = result.data.value;
        })
        .fail(function(result) {
            setError(result.message);
        });

    fh.settings.get("MinPasswordLength")
        .done(function(result) {
            minPassLength = result.data.value;
        })
        .fail(function(result) {
            setError(result.message);
        });

    fh.application.installed()
        .done(function(result) {
            rUsers.set("apps", result.data);
        })
        .fail(function(result) {
            setError(result.message);
        });

    loadLogs();
    loadUsers();
    loadSettings();

    //events
    var timer;
    //Logs
    rLogs.observe("filterText", function(newValue, oldValue, keypath) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(loadLogs, 200);
    });
    rLogs.on({
        "sortLog": function(event) {
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
            rLogs.set("iter.type", "failure");
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

    //users
    rUsers.on({
        "addUser": function(event) {
            rUsers.set("mode", "add");
            rUsers.set("current", null);
            rUsers.set("errors", null);

            rUsers.set("current.homeApp", defaultHome);
            $("#userModal").modal();
        },
        "changeUser": function(event) {
            rUsers.set("mode", "change");
            var user = {
                user: event.index.i,
                homeApp: event.context.homeApp,
                name: event.context.name,
                admin: event.context.admin
            };
            rUsers.set("current", user);
            rUsers.set("errors", null);

            $("#userModal").modal();
        },
        "save": function(event) {
            var mode = rUsers.get("mode");
            rUsers.set("errors", null);

            if (!validUser(mode)) {
                return;
            }

            var current = rUsers.get("current");
            if (mode == "add") {
                console.log(current);
                fh.user.new(current)
                    .done(function() {
                        $("#userModal").modal("toggle");
                        loadUsers();
                    })
                    .fail(function(result) {
                        rUsers.set("errors.save", result.message);
                    });
                return;
            }
            console.log("update existing user");
            $("#userModal").modal("toggle");
        },

        "delete": function(event) {
            fh.user.delete(event.context.current.user)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUsers();
                })
                .fail(function(result) {
                    rUsers.set("errors.save", result.message);
                });
        },
        "makeAdmin": function(event) {
            fh.user.makeAdmin(event.context.current.user)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUsers();
                })
                .fail(function(result) {
                    rUsers.set("errors.save", result.message);
                });
        },
        "removeAdmin": function(event) {
            fh.user.removeAdmin(event.context.current.user)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUsers();
                })
                .fail(function(result) {
                    rUsers.set("errors.save", result.message);
                });
        },
    });
    rUsers.observe({
        "current.*": function(newValue, oldValue, keypath) {
            if (!newValue) {
                return;
            }
            if (timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(function() {
                switch (keypath) {
                    case "current.email":
                        validEmail();
                        break;
                    case "current.password":
                        validPassword();
                        break;
                    case "current.password2":
                        validPassword2();
                        break;
                }
            }, 200);
        }
    });


    //settings
    rSettings.observe("settingsFilter", function(newValue, oldValue, keypath) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(filterSettings, 200);
    });
    rSettings.on({
        "changeMode": function(event) {
            event.context.error = false;
            if (event.context.change === undefined) {
                event.context.change = true;
            } else {
                event.context.change = !event.context.change;
            }


            if (event.context.change) {
                //change
                rSettings.set(event.keypath, event.context);
                return;
            }
            //save
            fh.settings.set(event.index.i, event.context.value)
                .done(function() {
                    loadSettings();
                })
                .fail(function(result) {
                    event.context.error = result.message;
                    rSettings.set(event.keypath, event.context);
                });

        },
        "setDefault": function(event) {
            fh.settings.default(event.index.i)
                .done(function() {
                    loadSettings();
                })
                .fail(function(result) {
                    event.context.error = result.message;
                    rSettings.set(event.keypath, event.context);
                });

        },
        "changeBoolean": function(event) {
            event.context.value = !event.context.value;
            rSettings.set(event.keypath, event.context);
        }
    });


    //functions

    //logs
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
                setError(result.message);
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
                setError(result.message);
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
        var regEx = new RegExp(filter, "i");
        var filtered = [];

        for (var i = 0; i < logs.length; i++) {
            if (regEx.exec(logs[i].log)) {
                filtered.push(logs[i]);
                //Format time to more readable timestamp
                logs[i].when = new Date(logs[i].when).toLocaleString();
            }
        }

        return filtered;
    }


    //settings
    function loadSettings() {
        fh.settings.all()
            .done(function(result) {
                rSettings.set("settings", result.data);
                filterSettings();
            })
            .fail(function(result) {
                setError(result.message);
            });
    }

    function filterSettings() {
        var regEx = new RegExp(rSettings.get("settingsFilter"), "i");
        var settings = rSettings.get("settings");


        for (var i in settings) {
            if (settings.hasOwnProperty(i)) {
                if (!regEx.exec(settings[i].description) && !regEx.exec(settings[i].name)) {
                    settings[i].filtered = true;
                } else {
                    settings[i].filtered = false;
                }
                settings[i].type = typeof settings[i].value;
            }
        }

        rSettings.set("settings", settings);
    }


    //users
    function loadUsers() {
        fh.user.all()
            .done(function(result) {
                rUsers.set("users", result.data);
            })
            .fail(function(result) {
                setError(result.message);
            });
    }

    function validUser(mode) {
        var current = rUsers.get("current");
        var valid = true;
        rUsers.set("errors", null);

        if (!current.user) {
            rUsers.set("errors.user", "Username is required");
            valid = false;
        }


        valid = (validEmail() && validPassword(mode) && validPassword2() && valid);

        return valid;
    }

    function validEmail() {
        var current = rUsers.get("current");
        if (current.email && !emailRegex.test(current.email)) {
            rUsers.set("errors.email", "Invalid email address format");
            return false;
        }

        rUsers.set("errors.email", null);
        return true;
    }

    function validPassword(mode) {
        if (mode == "change") {
            return true;
        }

        var current = rUsers.get("current");
        if (!current.password) {
            rUsers.set("errors.password", "Password is required");
            return false;
        }

        if (current.password.length < minPassLength) {
            rUsers.set("errors.password", "Password isn't long enough");
            return false;
        }
        rUsers.set("errors.password", null);
        return true;
    }

    function validPassword2() {
        var current = rUsers.get("current");

        if (current.password !== current.password2) {
            rUsers.set("errors.password2", "Passwords don't match");
            return false;
        }

        rUsers.set("errors.password2", null);
        return true;

    }

    function setError(error) {
        if (!fh.auth.admin) {
            rNav.set({
                "errorLead": "You do not have admin rights and cannot use this tool: ",
                "error": '<a href="/" class="alert-link">Return to your home page</a>'
            });
            return;
        }

        rNav.set("error", error);
    }

}); //end ready
