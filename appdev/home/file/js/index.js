// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    "use strict";
    var usrSettingsDS = "/v1/datastore/" + fh.auth.user + "/homeSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);
    var appList;
    var starred = {};

    var timer;


    var r = new Ractive({
        el: "#ractives",
        template: "#tMain",
        data: {
            admin: fh.auth.admin,
        }
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
            r.set("externalApps", result.data.value);
        })
        .fail(function() {
            r.set("externalApps", false);
        });



    //Events
    r.on({
        fetchExternalOpen: function(event) {
            r.set({
                "fetchError": false,
                "url": ""
            });

            $("#externalApps").modal();
        },
        install: function(event) {
            fh.application.install(event.context.file)
                .done(function(result) {
                    var installScript = fh.util.urlJoin(result.data.id, "/v1/file/install.js");
                    $.getScript(installScript)
                        .done(function(script, textStatus) {
                            if (installApp) {
                                installApp();
                                installApp = undefined;
                            }
                        })
                        .always(function() {
                            refreshApps();
                        });
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
                .fail(function(result) {
                    error(result);
                });
        },
        remove: function(event) {
            fh.application.uninstall(event.index.i)
                .done(function() {
                    refreshApps();
                })
                .fail(function(result) {
                    error(result);
                });
        },
        star: function(event) {
            if (event.context.starred) {
                delete starred[event.context.id];
                r.set(event.keypath + ".starred", false);
            } else {
                starred[event.context.id] = true;
                r.set(event.keypath + ".starred", true);
            }
            dsSettings.put("starredApps", starred)
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
                    $("#externalApps").modal("hide");
                    refreshApps();

                })
                .fail(function(result) {
                    result = result.responseJSON;
                    r.set("fetchError", result);
                })
                .always(function() {
                    r.set("waiting", false);
                });

        },
    });

    r.observe("filterText", function(newValue, oldValue, keypath) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(filterApps, 200);
    });


    $("#allTab").on("shown.bs.tab", function() {
        $("#filterText").focus();
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
                        installed[id].installed = true;
                    }
                }

                if (!starsExist) {
                    $('#mainTabs a[href="#all"]').tab('show');
                }
                r.set("apps", installed);

                if (!fh.auth.admin) {
                    r.set({
                        failures: {},
                    });
                    filterApps();
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

                        for (id in installed) {
                            if (installed.hasOwnProperty(id)) {
                                if (!available[id]) {
                                    available[id] = installed[id];
                                }
                            }
                        }




                        r.set({
                            apps: available,
                            failures: result.failures,
                        });
                        filterApps();
                    })
                    .fail(function(result) {
                        r.set("failures", result.responseJSON.failures);
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
