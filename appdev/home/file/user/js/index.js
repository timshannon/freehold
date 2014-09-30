$(document).ready(function() {
    "use strict";

    var minPassLength;


    //setup
    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        data: {}
    });

    fh.application.installed()
        .done(function(result) {
            rMain.set("apps", result.data);
        })
        .fail(function(result) {
            rMain.set("error", result.message);
        });

    fh.settings.get("MinPasswordLength")
        .done(function(result) {
            minPassLength = result.data.value;
        })
        .fail(function(result) {
            rMain.set("error", result.message);
        });

    loadUser();
    loadSessions();
    loadTokens();

    var timer;

    //events
    rMain.on({
        "changeUser": function(event) {
            rMain.set("changePassword", false);
            var user = {
                user: event.context.user,
                homeApp: event.context.homeApp,
                name: event.context.name,
                admin: event.context.admin
            };
            rMain.set("current", user);
            rMain.set("errors", null);

            $("#userModal").modal();
        },
        "changePassword": function(event) {
            rMain.set("changePassword", true);
        },
        "removeAdmin": function(event) {
            fh.user.removeAdmin(event.context.user)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUser();
                })
                .fail(function(result) {
                    rMain.set("errors.save", result.message);
                });
        },

        "save": function(event) {
            rMain.set("errors", null);
            var pass = rMain.get("changePassword");

            if (pass && !validUser()) {
                return;
            }

            var current = rMain.get("current");
            //update user
            delete current.admin;

            fh.user.update(current)
                .done(function() {
                    $("#userModal").modal("toggle");
                    loadUser();
                })
                .fail(function(result) {
                    rMain.set("errors.save", result.message);
                });
        },
        "logout": function(event) {
            fh.session.logout(event.context.id)
                .done(function() {
                    loadSessions();
                })
                .fail(function(result) {
                    rMain.set("error", result.message);
                });

        },
        "addToken": function(event) {
            rMain.set("token", {
                name: "",
                expires: null,
				permission: {
					private: "rw",
					friend: "r",
					public: ""
				},
                errors: null
            });

            $("#tokenModal").modal();
        },
        "clearHelp": function(event) {
            rMain.set("help", false);
        },
        "setHelp": function(event) {
            rMain.set("help", {
                title: "Security Tokens",
                text: "Tokens are unique ID's used to grant temporary access to some or all of " +
                    "the permissions of a user. For use with temporary access, or external " +
                    "applications. More info in the <a href='/docs/#token'>documentation</a>."
            });
        },
        "saveToken": function(event) {
            var errors = {};

            if (!event.context.name) {
                errors.name = "A name is required";
            }

            if (event.context.expires) {
                var exp = new Date(event.context.expires);
                if (isNaN(exp.getTime())) {
                    errors.expires = "Invalid Date";
                } else {
                    exp.setHours(0); //set to midnight of local timezone
                    event.context.expires = exp.toJSON();
                }
            }


            if (Object.getOwnPropertyNames(errors).length > 0) {
                rMain.set("token.errors", errors);
                return;
            }

            fh.token.new({
                    name: event.context.name,
                    expires: event.context.expires
                })
                .done(function() {
                    loadTokens();
                    $("#tokenModal").modal("hide");
                })
                .fail(function(result) {
                    rMain.set("token.errors.save", result.message);
                });

        },
        "delete": function(event) {
            fh.token.delete(event.context.token)
                .done(function() {
                    loadTokens();
                })
                .fail(function(result) {
                    rMain.set("error", result.message);
                });
        }
    });

    rMain.observe({
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




    //functions
    function loadUser() {
        fh.user.get(fh.auth.user)
            .done(function(result) {
                result.data.user = fh.auth.user;
                rMain.set("user", result.data);
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });
    }

    function loadSessions() {
        fh.session.get()
            .done(function(result) {
                var sessions = result.data;
                for (var i = 0; i < sessions.length; i++) {
                    sessions[i].created = new Date(sessions[i].created).toLocaleString();
                    if (!sessions[i].expires) {
                        //Expires at end of session, set to created date
                        sessions[i].expires = new Date(sessions[i].created).toLocaleString();
                    } else {
                        sessions[i].expires = new Date(sessions[i].expires).toLocaleString();
                    }
                }
                rMain.set("sessions", sessions);
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });
    }

    function loadTokens() {
        fh.token.get()
            .done(function(result) {
                var tokens = result.data;
                for (var i = 0; i < tokens.length; i++) {
                    if (!tokens[i].expires) {
                        tokens[i].expires = "No expiration";
                    } else {
                        tokens[i].expires = new Date(tokens[i].expires).toLocaleDateString();
                    }
                }
                rMain.set("tokens", tokens);
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });
    }




    function validUser() {
        var current = rMain.get("current");
        var valid = true;
        rMain.set("errors", null);

        if (!current.user) {
            rMain.set("errors.user", "Username is required");
            valid = false;
        }


        valid = (validPassword() && validPassword2() && valid);

        return valid;
    }

    function validPassword() {
        var current = rMain.get("current");

        if (!current.password) {
            rMain.set("errors.password", "Password is required");
            return false;
        }

        if (current.password.length < minPassLength) {
            rMain.set("errors.password", "Password isn't long enough");
            return false;
        }
        rMain.set("errors.password", null);
        return true;
    }

    function validPassword2() {
        var current = rMain.get("current");

        if (current.password !== current.password2) {
            rMain.set("errors.password2", "Passwords don't match");
            return false;
        }

        rMain.set("errors.password2", null);
        return true;

    }

});
