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
            .done(function(result) {
                var installed = rApps.get("apps");
                var appList = result.data;

                for (var id in installed) {
                    if (installed.hasOwnProperty(id)) {
						var app;
                        if (appList[id]) {
                            app = installed[id];
                            app.remove = true;
                            if (app.version != appList[id].version) {
                                app.upgrade = true;
                            }
                            appList[id] = app;

                        } else {
                            app = installed[id];
                            app.install = true;
                            appList[id] = app;
                        }
                    }
                }

                rManage.set({
                    apps: result.data,
                });
            })
            .fail(function(result) {
                //TODO: nav bar based alert
            });
    }



}); //end ready
