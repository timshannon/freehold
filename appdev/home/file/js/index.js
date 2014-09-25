$(document).ready(function() {
    "use strict";
    var usrSettingsDS = "/v1/datastore/" + fh.auth.user + "/homeSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);
    var appList;
    var starred = {};
    var externalApps = false;



    var rApps = new Ractive({
        el: "#appList",
        template: "#tApps",
    });

    var rManage = new Ractive({
        el: "#modalHook",
        template: "#tManageApps",
    });

    //Get User's setting DS if exists
    fh.properties.get(usrSettingsDS)
        .done(function() {
            dsSettings.get("starredApps")
                .done(function(result) {
                    starred = result.data;
                    refreshApps();
                })
                .fail(function(result) {
                    if (result.status == "error") {
                        rManage.set("error", result.message);
                    } else {
                        dsSettings.put("starredApps", {})
                            .done(function() {
                                refreshApps();
                            })
                            .fail(function(result) {
                                rManage.set("error", result.message);
                            });

                    }
                });
        })
        .fail(function(result) {
            // if not exists, create it
            if (result.message == "Resource not found") {
                fh.datastore.new(usrSettingsDS)
                    .done(function() {
                        refreshApps();
                    })
                    .fail(function(result) {
                        rManage.set("error", result.message);
                    });
            }
        });

    //check if external apps can be fetched
    fh.settings.get("AllowWebAppInstall")
        .done(function(result) {
            externalApps = result.data.value;
        })
        .fail(function(result) {
            externalApps = false;
        });



    //Events
    rApps.on({
        openModal: function(event) {
            rManage.set({
                "fetchError": false,
                "url": ""
            });

            $("#manageAppsModal").modal();
            $("#externalAdd").collapse("hide");
        }
    });

    rManage.on({
        install: function(event) {
            fh.application.install(event.context.file)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    rManage.set("error", result.message);
                });
        },
        upgrade: function(event) {
            fh.application.upgrade(event.context.file)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    rManage.set("error", result.message);
                });
        },
        remove: function(event) {
            fh.application.uninstall(event.context.id)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    rManage.set("error", result.message);
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
                    rManage.set("error", result.message);
                });
        },
        fetchExternal: function(event) {
            var url = event.context.url;
            rManage.set("fetchError", false);

            if (!url.match("https?://+")) {
                rManage.set("fetchError", {
                    message: "Invalid url"
                });
                return;
            }

            rManage.set("waiting", true);
            fh.application.postAvailable(url)
                .done(function(result) {
                    rManage.set("url", "");
                    $("#externalAdd").collapse("hide");
                    refreshApps();

                })
                .fail(function(result) {
                    rManage.set("fetchError", result);
                })
                .always(function() {
                    rManage.set("waiting", false);
                });

        }
    });


    //Functions

    function refreshApps() {
        fh.application.installed()
            .done(function(result) {
                var installed = result.data;

                for (var id in installed) {
                    if (installed.hasOwnProperty(id)) {
                        if (starred[id]) {
                            installed[id].starred = true;
                        }
                    }
                }
                rApps.set({
                    apps: installed
                });

                if (!fh.auth.admin) {
                    rManage.set({
                        apps: installed,
                        admin: fh.auth.admin,
                        failures: false,
                        external: false,
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



                        rManage.set({
                            apps: available,
                            admin: fh.auth.admin,
                            failures: result.failures,
                            external: externalApps
                        });
                    })
                    .fail(function(result) {

                        rManage.set("error", result.message);
                    });
            })
            .fail(function(result) {
                rManage.set("error", result.message);
            });


    }




}); //end ready
