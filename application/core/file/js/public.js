$(document).ready(function() {
    //setup

    console.log(Ractive.components.navbar);
    var rMain = new Ractive({
        el: "#mainHook",
        template: "#tMain",
    });


    //Events
    rMain.on({
        loginModal: function(event) {
            rMain.set({
                "loginErr": false,
                "username": "",
                "password": "",
                "rememberMe": false
            });

            $("#loginModal").modal();
            $("#loginModal").on("shown.bs.modal", function() {
                $("#username").focus();
            });

        },
        login: function(event) {
            event.original.preventDefault();
            var data;

            if (event.context.rememberMe) {
                var today = new Date(Date.now());
                today.setDate(today.getDate() + 15);
                data = today;
            }
            if (event.context.username === "") {
                rMain.set("loginerr", "username is required");
                return;
            }

            fh.session.login(event.context.username, event.context.password, data)
                .done(function(result) {
                    location.reload();
                })
                .fail(function(result) {
                    rMain.set("loginErr", result.message);
                });
        },
    });


});
