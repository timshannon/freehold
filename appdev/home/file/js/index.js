$(document).ready(function() {
    "use strict";
    $(".alert").alert();

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

    updateApplications();

    //Events
    rApps.on({
        openModal: function(event) {
            updateManageList();
            $("#manageAppsModal").modal();
        }
    });

    rManage.on({
        install: function(event) {
            fh.application.install(event.context.file)
                .done(function() {
                    updateApplications();
                    updateManageList();
                })
                .fail(function() {
                    //TODO: nav bar based alert
                });
        },
        upgrade: function(event) {
            fh.application.upgrade(event.context.file)
                .done(function() {
                    updateApplications();
                    updateManageList();
                })
                .fail(function() {
                    //TODO: nav bar based alert
                });
        },
        remove: function(event) {
            fh.application.uninstall(event.context.id)
                .done(function() {
                    updateApplications();
                    updateManageList();
                })
                .fail(function() {
                    //TODO: nav bar based alert
                });
        }

    });


    //Functions
    function updateApplications() {
        fh.application.installed()
            .done(function(result) {
                rApps.set({
                    apps: result.data,
                    admin: fh.auth().admin
                });
            })
            .fail(function(result) {
                //TODO: nav bar based alert
            });
    }

    function updateManageList() {
        fh.application.available()
            .always(function(result) {
                var installed = rApps.get("apps");
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
                            available[id] = app;
                        } else {
                            app = installed[id];
                            available[id] = app;
                        }
                    }
                }

                rManage.set({
                    apps: available,
                    failures: result.failures
                });
            });
    }



}); //end ready
