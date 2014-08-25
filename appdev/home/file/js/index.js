$(document).ready(function() {
    "use strict";
    /*$(".alert").alert();*/
    var usrSettingsDS = "/v1/datastore/" + fh.auth().user + "/homeSettings.ds";
    var dsSettings = new fh.Datastore(usrSettingsDS);
    var appList;
    var starred = {};


    $("#logoutButton").click(function() {
        fh.session.logout();
        window.location = "/";
    });

    var rApps = new Ractive({
        el: "#appList",
        template: "#tApps",
    });

    var rManage = new Ractive({
        el: "#modalHook",
        template: "#tManageApps"
    });


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



    //Events
    rApps.on({
        openModal: function(event) {
            $("#manageAppsModal").modal();
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

                        for (var id in installed) {
                            if (installed.hasOwnProperty(id)) {
                                var app = installed[id];
                                app.installed = true;

                                if (available[id]) {
                                    if (id != "home") {
                                        app.remove = true;
                                    }
                                    if (app.version != available[id].version) {
                                        app.upgrade = true;
                                    }
                                } else {
                                    app = installed[id];
                                }
                                if (starred[id]) {
                                    app.starred = true;
                                }

                                available[id] = app;
                            }
                        }
                        rApps.set({
                            apps: installed
                        });

                        rManage.set({
                            apps: available,
                            admin: fh.auth().admin,
                            failures: result.failures
                        });
                    });
            })
            .fail(function(result) {
                //TODO: nav bar based alert
            });


    }




}); //end ready
