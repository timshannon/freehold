$(document).ready(function() {
    //setup

    var rMain = new Ractive({
        el: "#mainHook",
        template: "#tMain",
        components: fh.components
    });


    //Events
    rMain.on({
        loginModal: function(event) {
            rMain.set({
                "username": "empty",
                "password": "empty",
                "rememberMe": false,
                "loginErr": false
            });

            $("#loginModal").modal();
            $("#loginModal").on("shown.bs.modal", function() {
                $("#username").focus();
            });

        },
        login: function(event) {
            var data = {};

            console.log(event);

            if (event.context.rememberMe) {
                var today = new date(date.now());
                today.setdate(today.getdate() + 15);
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
