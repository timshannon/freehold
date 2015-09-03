// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    "use strict";

    var logPageLimit = 20;
    var defaultHome;
    var minPassLength;

    //setup
    var rNav = new Ractive({
        el: "#navHook",
        template: '<navbar app="Admin Console"></navbar>',
        data: {
            help: {
                title: "Admin Console",
                text: "This is where admins can manage <a href='/docs/#user'>users</a>, " +
                    "global freehold <a href='/docs/#settings'>settings</a> and monitor the " +
                    "<a href='/docs/#logs'>logs</a> for errors.  <a href='/docs/#backup'>Backups</a> " +
                    "of the core Datastores can also be taken here."
            }
        }
    });

    var nav = rNav.findComponent("navbar");

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
        data: {
            auth: fh.auth
        }
    });

    var rBackups = new Ractive({
        el: "#backups",
        template: "#tBackups",
        data: {
            from: function() {
                var d = new Date(Date.now());
                d.setDate(d.getDate() - 30);
                return d.toLocaleDateString();
            }(),
            backupAll: true,
            coreDS: {
                "app": {
                    description: "Stores which applications are currently installed in the freehold instance.",
                    include: false
                },
                "log": {
                    description: "Contains error logs, failures, and any other types of logs recorded by freehold.",
                    include: false
                },
                "permission": {
                    description: "Stores the permissions of files and datastores in freehold.",
                    include: false
                },
                "ratelimit": {
                    description: "Datastore for tracking rate limiting for freehold",
                    include: false
                },
                "session": {
                    description: "Contains user session data",
                    include: false
                },
                "token": {
                    description: "Stores security tokens, what access they give, and when they expire.",
                    include: false
                },
                "user": {
                    description: "Stores user information including, user password hashes used for authenticating a user.",
                    include: false
                },
                "backup": {
                    description: "Stores previous backups taken.",
                    include: false
                },
            },
        }

    });

    fh.settings.get("DefaultHomeApp")
        .done(function(result) {
            defaultHome = result.data.value;
        })
        .fail(function(result) {
            result = result.responseJSON;
            setError(result.message);
        });

    fh.settings.get("MinPasswordLength")
        .done(function(result) {
            minPassLength = result.data.value;
        })
        .fail(function(result) {
            result = result.responseJSON;
            setError(result.message);
        });

    fh.application.installed()
        .done(function(result) {
            rUsers.set("apps", result.data);
        })
        .fail(function(result) {
            result = result.responseJSON;
            setError(result.message);
        });

    loadLogs();
    loadUsers();
    loadSettings();
    loadBackups();

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
        },
        "viewJSON": function(event) {
            event.original.preventDefault();
            rLogs.set("currentBefore", event.context.before);
            rLogs.set("currentValue", event.context.linkData);
            rLogs.set("currentAfter", event.context.after);
            $("#viewJSON").modal();
        }
    });

    //users
    rUsers.on({
        "addUser": function(event) {
            rUsers.set("mode", "add");
            rUsers.set("current", null);
            rUsers.set("errors", null);

            rUsers.set("current.homeApp", defaultHome);
            rUsers.set("current.userFolder", true);
            $("#userModal").modal();
        },
        "changeUser": function(event) {
            rUsers.set("mode", "change");
            rUsers.set("changePassword", false);

            var current = rUsers.get(event.keypath);
            current.user = event.index.i;

            rUsers.set("current", current);
            rUsers.set("errors", null);

            $("#userModal").modal();
        },
        "save": function(event) {
            var mode = rUsers.get("mode");
            rUsers.set("errors", null);

            if (!validUser()) {
                return;
            }

            var current = rUsers.get("current");
            if (mode == "add") {
                //add new user
                fh.user.new(current)
                    .done(function() {
                        $("#userModal").modal("toggle");
                        if (current.userFolder) {
                            createUserFolder(current.user);
                        }
                        loadUsers();
                    })
                    .fail(function(result) {
                        result = result.responseJSON;
                        rUsers.set("errors.save", result.message);
                    });
                return;
            }
            //update user
            delete current.admin;

            fh.user.update(current)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUsers();
                })
                .fail(function(result) {
                    result = result.responseJSON;
                    rUsers.set("errors.save", result.message);
                });
        },

        "changePassword": function(event) {
            rUsers.set("changePassword", true);
        },
        "delete": function(event) {
            fh.user.delete(event.context.current.user)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUsers();
                })
                .fail(function(result) {
                    result = result.responseJSON;
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
                    result = result.responseJSON;
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
                    result = result.responseJSON;
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
                    result = result.responseJSON;
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
                    result = result.responseJSON;
                    event.context.error = result.message;
                    rSettings.set(event.keypath, event.context);
                });

        },
        "changeBoolean": function(event) {
            rSettings.toggle("settings." + event.index.i + ".value");
        }
    });


    //backups
    rBackups.on({
        "selectBackup": function(event) {
            rBackups.toggle(event.keypath + ".include");
        },
        "downloadBackupModal": function() {
            $("#backupsModal").modal();

            rBackups.set("backupPasswordError", null);
            rBackups.set("backupError", null);
            rBackups.set("backupPassword", null);
            rBackups.set("backupAll", true);
            rBackups.set("step", 1);
            rBackups.set("file.url", "/v1/file/backups/");
            rBackups.set("chooseFolder", false);
            $("#backupsModal").on("shown.bs.modal", function() {
                $("#backupPassword").focus();
            });
        },
        "generateBackup": function(event) {
            event.original.preventDefault();
            var coreDS = rBackups.get("coreDS");
            var dsList = [];


            if (!event.context.backupPassword) {
                rBackups.set("backupPasswordError", "A password is required to generate a new backup");
                return;
            }

            if (!rBackups.get("backupAll")) {
                for (var app in coreDS) {
                    if (coreDS.hasOwnProperty(app) && coreDS[app].include) {
                        dsList.push(app);
                    }
                }
            }
            rBackups.set("waiting", true);
            fh.backup.new(fh.auth.user, rBackups.get("backupPassword"), rBackups.get("file.url"), dsList)
                .done(function(result) {
                    rBackups.set("url", result.data);
                    rBackups.add("step");
                    rBackups.set("waiting", false);
                    loadBackups();
                })
                .fail(function(result) {
                    rBackups.set("waiting", false);
                    if (result.responseJSON.message == "Invalid user and / or password") {
                        rBackups.set("backupPasswordError", result.responseJSON.message);
                        rBackups.set("backupError", null);
                    } else {
                        rBackups.set("backupError", result.responseJSON.message);
                        rBackups.set("backupPasswordError", null);
                    }
                });
        },
        "datepicker.select": function(value) {
            loadBackups();
        },
        "viewDatastores": function(event) {
            event.original.preventDefault();
            rBackups.set("currentDatastores", event.context.datastores);
            $("#viewDS").modal();

        },
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
                result = result.responseJSON;
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
                result = result.responseJSON;
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
        var regEx;
        try {
            regEx = new RegExp(filter, "i");
        } catch (e) {
            regEx = new RegExp("", "i");
        }
        var filtered = [];

        for (var i = 0; i < logs.length; i++) {
            if (regEx.exec(logs[i].log) || regEx.exec(logs[i].type)) {
                filtered.push(logs[i]);

                //Format time to more readable timestamp
                logs[i].when = new Date(logs[i].when).toLocaleString();

                logs[i].jsonValue = linkJSON(logs[i].log);
            }
        }

        return filtered;
    }

    //linkJSON checks if the passed in string contains a JSON string, and if so
    function linkJSON(value) {
        //check if log contains a json string
        var res = value.match(/{.*}$|^\[.*\]$/);
        if (!res) {
            return;
        }

        return {
            before: value.slice(0, res.index),
            linkData: res[0],
            after: value.slice((res.index + res[0].length)),
        };
    }


    //settings
    function loadSettings() {
        fh.settings.all()
            .done(function(result) {
                rSettings.set("settings", result.data);
                filterSettings();
            })
            .fail(function(result) {
                result = result.responseJSON;
                setError(result.message);
            });
    }

    function filterSettings() {
        var regEx;
        try {
            regEx = new RegExp(rSettings.get("settingsFilter"), "i");
        } catch (e) {
            regEx = new RegExp("", "i");
        }
        var settings = rSettings.get("settings");


        for (var i in settings) {
            if (settings.hasOwnProperty(i)) {
                if (regEx.test(settings[i].description) || regEx.test(i)) {
                    settings[i].filtered = false;
                } else {
                    settings[i].filtered = true;
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
                result = result.responseJSON;
                setError(result.message);
            });
    }

    function validUser() {
        var current = rUsers.get("current");
        var valid = true;
        rUsers.set("errors", null);

        if (!current.user) {
            rUsers.set("errors.user", "Username is required");
            valid = false;
        }


        valid = (validPassword() && validPassword2() && valid);

        return valid;
    }

    function validPassword() {
        var mode = rUsers.get("mode");
        var pass = rUsers.get("changePassword");
        if (mode == "change" && !pass) {
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

    function createUserFolder(user) {
        var newUrl = fh.util.urlJoin("/v1/file/", user);

        fh.file.newFolder(newUrl)
            .done(function(result) {
                fh.properties.set(newUrl, {
                        permissions: {
                            owner: user,
                            private: "rw",
                            friend: "",
                            public: "",
                        }
                    })
                    .fail(function(result) {
                        result = result.responseJSON;
                        setError(result.message);
                    });
            })
            .fail(function(result) {
                result = result.responseJSON;
                setError(result.message);
            });

    }

    function loadBackups() {
        var from = new Date(rBackups.get("from"));
        fh.backup.get(from.toJSON())
            .done(function(result) {
                var backups = result.data;
                if (!backups) {
                    return;
                }
                for (var i = 0; i < backups.length; i++) {
                    backups[i].when = new Date(backups[i].when).toLocaleString();
                    backups[i].fileName = backups[i].file.split("/").pop();
                }
                backups.sort(function(a, b) {
                    if (a.when > b.when) {
                        return -1;
                    }
                    if (a.when < b.when) {
                        return 1;
                    }
                    return 0;
                });

                rBackups.set("backups", backups);
            })
            .fail(function(result) {
                result = result.responseJSON;
                setError(result.message);
            });
    }

    function setError(error) {
        if (!fh.auth.admin) {
            nav.fire("addAlert", "danger", "You do not have admin rights and cannot use this tool: ",
                '<a href="/" class="alert-link">Return to your home page</a>');
            return;
        }

        nav.fire("addAlert", "danger", "", error);
    }

}); //end ready
