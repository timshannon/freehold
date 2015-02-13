// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    "use strict";
    var usrSettingsDS = "/v1/datastore/" + fh.auth.user + "/homeSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);
    var appList;
    var starred = {};
    var externalApps = false;

    var timer;


    var r = new Ractive({
        el: "#ractives",
        template: "#tMain",
    });


    var nav = r.findComponent("navbar");

    //Get User's setting DS if exists
    fh.properties.get(usrSettingsDS)
        .done(function() {
            dsSettings.get("starredApps")
                .done(function(result) {
                    starred = result.data;
                    refreshApps();
                })
                .fail(function(xhr) {
                    var result = xhr.responseJSON;
                    if (result.status == "error") {
                        error(result);
                    } else {
                        dsSettings.put("starredApps", {})
                            .done(function() {
                                refreshApps();
                            })
                            .fail(function(xhr) {
                                error(xhr);
                            });

                    }
                });
        })
        .fail(function(xhr) {
            var result = xhr.responseJSON;
            // if not exists, create it
            if (result.message == "Resource not found") {
                fh.datastore.new(usrSettingsDS)
                    .done(function() {
                        refreshApps();
                    })
                    .fail(function(xhr) {
                        error(result);
                    });
            }
        });

    //check if external apps can be fetched
    fh.settings.get("AllowWebAppInstall")
        .done(function(result) {
            externalApps = result.data.value;
        })
        .fail(function() {
            externalApps = false;
        });



    //Events
    r.on({
        "fetchExternalOpen": function(event) {
            r.set({
                "fetchError": false,
                "url": ""
            });

            $("#manageAppsModal").modal();
        },
        install: function(event) {
            fh.application.install(event.context.file)
                .done(function() {
                    refreshApps();
                })
                .fail(function(result) {
                    error(result);
                });
        },
        upgrade: function(event) {
            fh.application.upgrade(event.context.file)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    error(result);
                });
        },
        remove: function(event) {
            fh.application.uninstall(event.context.id)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    error(result);
                });
        },
        star: function(event) {
            if (event.context.starred) {
                delete starred[event.context.id];
            } else {
                starred[event.context.id] = true;
            }
            dsSettings.put("starredApps", starred)
                .done(function() {
                    refreshApps();
                })
                .fail(function(result) {
                    error(result);
                });
        },
        fetchExternal: function(event) {
            var url = event.context.url;
            r.set("fetchError", false);

            if (!url.match("https?://+")) {
                r.set("fetchError", {
                    message: "Invalid url"
                });
                return;
            }

            r.set("waiting", true);
            fh.application.postAvailable(url)
                .done(function(result) {
                    r.set("url", "");
                    $("#externalAdd").collapse("hide");
                    refreshApps();

                })
                .fail(function(result) {
                    result = result.responseJSON;
                    r.set("fetchError", result);
                })
                .always(function() {
                    r.set("waiting", false);
                });

        }
    });

    r.observe("filterText", function(newValue, oldValue, keypath) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(filterApps, 200);
    });

    //Functions

    function refreshApps() {
        fh.application.installed()
            .done(function(result) {
                var installed = result.data;
                var starsExist = false;

                for (var id in installed) {
                    if (installed.hasOwnProperty(id)) {
                        if (starred[id]) {
                            installed[id].starred = true;
                            starsExist = true;
                        }
                    }
                }

                r.set("starsExist", starsExist);
                r.set("apps", installed);

                if (!fh.auth.admin) {
                    r.set({
                        admin: fh.auth.admin,
                        failures: {},
                        external: externalApps
                    });
                    return;
                }

                fh.application.available()
                    .done(function(result) {
                        var available = result.data;

                        for (var id in available) {
                            if (available.hasOwnProperty(id)) {

                                if (installed[id]) {
                                    available[id].installed = true;
                                    if (id != "home") {
                                        available[id].remove = true;
                                    }
                                    if (installed[id].version != available[id].version) {
                                        available[id].upgrade = true;
                                    }
                                }
                                if (starred[id]) {
                                    available[id].starred = true;
                                }
                            }
                        }
                        //FIXME: Installed app that isn't available?
                        // Make sure it shows up



                        r.set({
                            apps: available,
                            admin: fh.auth.admin,
                            failures: result.failures,
                            external: externalApps
                        });
                    })
                    .fail(function(result) {
                        error(result);
                    });
            })
            .fail(function(result) {
                error(result);
            });


    }


    function filterApps() {
        var regEx;
        try {
            regEx = new RegExp(r.get("filterText"), "i");
        } catch (e) {
            regEx = new RegExp("", "i");
        }
        var apps = r.get("apps");


        for (var i in apps) {
            if (apps.hasOwnProperty(i)) {
                if (regEx.test(apps[i].description) || regEx.test(apps[i].description)) {
                    apps[i].filtered = false;
                } else {
                    apps[i].filtered = true;
                }
            }
        }

        r.set("apps", apps);
    }

    function error(err) {
        if (typeof err === "string") {
            nav.fire("addAlert", "danger", "", err);
            return;
        } else {
            err = err.responseJSON;
            if (err.hasOwnProperty("failures")) {
                for (var i = 0; i < err.failures.length; i++) {
                    nav.fire("addAlert", "danger", "", err.failures[i].message);
                }
            } else {
                nav.fire("addAlert", "danger", "", err.message);
            }
        }
    }
}); //end ready
