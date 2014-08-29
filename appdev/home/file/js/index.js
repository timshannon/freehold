$(document).ready(function() {
    "use strict";
    /*$(".alert").alert();*/
    var usrSettingsDS = "/v1/datastore/" + fh.auth().user + "/homeSettings.ds";
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
                    //TODO: navbar error
                    refreshApps();
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
                        //TODO: navbar alert?
                    });
            }
        });

    //check if external apps can be fetched
    fh.settings.get("AllowWebAppInstall")
        .done(function(result) {
            externalApps = result.data.value;
        })
        .fail(function(result) {
            //TODO: navbar alert
        });


    //Events
    rApps.on({
        openModal: function(event) {
            rManage.set({
                "fetchError": false,
                "url": "",
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
                    //TODO: nav bar based alert
                });
        },
        upgrade: function(event) {
            fh.application.upgrade(event.context.file)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    //TODO: nav bar based alert
                });
        },
        remove: function(event) {
            fh.application.uninstall(event.context.id)
                .done(function() {
                    refreshApps();
                })
                .fail(function() {
                    //TODO: nav bar based alert
                });
        },
        star: function(event) {
            console.log("starchild");
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
                    //todo: navbar alert
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
                fh.application.available()
                    .always(function(result) {
                        var available = result.data;

                        var id;

                        for (id in installed) {
                            if (installed.hasOwnProperty(id)) {
                                if (starred[id]) {
                                    installed[id].starred = true;
                                }

                            }
                        }
                        for (id in available) {
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


                        rApps.set({
                            apps: installed
                        });

                        rManage.set({
                            apps: available,
                            admin: fh.auth().admin,
                            failures: result.failures,
                            external: externalApps
                        });
                    });
            })
            .fail(function(result) {
                //TODO: nav bar based alert
            });


    }




}); //end ready
