// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    "use strict";

    var minPassLength;

    //setup
    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        data: {
            "tokenName": "",
        }
    });

    var nav = rMain.findComponent("navbar");

    fh.application.installed()
        .done(function(result) {
            rMain.set("apps", result.data);
        })
        .fail(function(result) {
            error(result);
        });

    fh.settings.get("MinPasswordLength")
        .done(function(result) {
            minPassLength = result.data.value;
        })
        .fail(function(result) {
            error(result);
        });

    fh.settings.get("RequirePasswordToGenerateToken")
        .done(function(result) {
            rMain.set("requirePassword", result.data.value);
        })
        .fail(function(result) {
            error(result);
        });


    loadUser();
    loadSessions();

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
                    result = result.responseJSON;
                    rMain.set("errors.save", result.message);
                });
        },

        "save": function(event) {
            event.original.preventDefault();
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
                    result = result.responseJSON;
                    rMain.set("errors.save", result.message);
                });
        },
        "logout": function(event) {
            fh.session.logout(event.context.id)
                .done(function() {
                    loadSessions();
                })
                .fail(function(result) {
                    error(result);
                });

        },
        "addToken": function(event) {
            rMain.set("token", {
                username: "",
                password: "",
                name: "",
                expires: null,
                permission: "",
                resource: "",
                errors: null,
                type: "user",
            });

            $("#tokenModal").modal();
            $("#tokenModal").on("shown.bs.modal", function() {
                $("#tokenName").focus();
            });

            rMain.set("tokenStep", 1);

        },
        "clearHelp": function(event) {
            rMain.set("help", false);
        },
        "setHelp": function(event) {
            rMain.set("help", {
                title: "Security Tokens",
                text: "Tokens are unique ID's used to grant temporary access to some or all of " +
                    "the permissions of a user. For use with temporary access, or external " +
                    "applications. More info can be found in the " +
                    "<a href='/docs/#token'>documentation</a>."
            });
            loadTokens();
        },

        "tokenStep1": function(event) {
            var errors = {};

            if (!rMain.get("tokenName")) {
                errors.name = "A name is required";
            }


            if (event.context.expires) {
                var exp = new Date(event.context.expires);
                if (isNaN(exp.getTime())) {
                    errors.expires = "Invalid Date";
                }

                if (exp.getTime() < Date.now()) {
                    errors.expires = "Date must be after current date.";
                } else {
                    event.context.expires = exp.toJSON();
                }
            }


            if (Object.getOwnPropertyNames(errors).length > 0) {
                rMain.set("token.errors", errors);
                return;
            }

            rMain.set("token.errors", null);
            rMain.update("token");

            rMain.add('tokenStep', 1);
        },
        "tokenStep2": function(event) {
            if (event.context.type == "file") {
                if (!event.context.selected.url) {
                    rMain.set(event.keypath + ".errNoFile", true);
                    return;
                }
                rMain.set("token.resource", event.context.selected.url);
                if (!event.context.permission) {
                    rMain.set("token.permission", "r");
                }
            } else {
                rMain.set("token.resource", null);
            }

            rMain.set(event.keypath + ".errNoFile", false);
            rMain.add('tokenStep', 1);
        },
        "tokenStepPrevious": function(event) {
            rMain.subtract('tokenStep', 1);
            rMain.update("token");
        },
        "generateToken": function(event) {
            var errors = {};

            if (rMain.get("requirePassword")) {
                if (!event.context.username || !event.context.password) {
                    errors.username = "A username and password is required to generate a new token";
                }
            }
            if (Object.getOwnPropertyNames(errors).length > 0) {
                rMain.set("token.errors", errors);
                return;
            }

            fh.token.new({
                    name: rMain.get("tokenName"),
                    expires: event.context.expires,
                    resource: event.context.resource,
                    permission: event.context.permission,
                }, event.context.username, event.context.password)
                .done(function(result) {
                    rMain.set("token.token", result.data.token);
                    rMain.set("token.errors", null);
                    loadTokens();
                    rMain.set("tokenStep", 4);


                    if (event.context.type == "file") {
                        var url = fh.util.urlJoin(location.origin, "/v1/auth/token/");
                        url += "?user=" + fh.auth.user + "&token=" + result.data.token;
                        rMain.set("token.url", url);
                    }

                    var node = rMain.find("#tokenSelect");
                    node.select();
                })
                .fail(function(result) {
                    result = result.responseJSON;
                    rMain.set("token.errors.save", result.message);
                });

        },
        "delete": function(event) {
            fh.token.delete(event.context.id)
                .done(function() {
                    loadTokens();
                })
                .fail(function(result) {
                    error(result);
                });
        },
        "toggleRead": function() {
            var keypath = "token.permission";
            var prm = rMain.get(keypath);
            if (!prm) {
                rMain.set(keypath, "r");
                return;
            }
            var index = prm.indexOf("r");
            if (index !== -1) {
                rMain.set(keypath, prm.slice(index + 1));
                return;
            }
            rMain.set(keypath, "r" + prm);
        },
        "toggleWrite": function() {
            var keypath = "token.permission";
            var prm = rMain.get(keypath);
            if (!prm) {
                rMain.set(keypath, "w");
                return;
            }
            var index = prm.indexOf("w");
            if (index === 0) {
                rMain.set(keypath, "");
                return;
            }
            if (index === -1) {
                rMain.set(keypath, prm + "w");
                return;
            }
            rMain.set(keypath, "r");
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
                document.title = fh.auth.user + " - freehold";
            })
            .fail(function(result) {
                error(result);
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
                error(result);
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
                        tokens[i].expires = new Date(tokens[i].expires).toLocaleString();
                    }
                    tokens[i].created = new Date(tokens[i].created).toLocaleString();
                    tokens[i].permissionString = permissionString(tokens[i].permission);

                }
                rMain.set("tokens", tokens);
            })
            .fail(function(result) {
                error(result);
            });
    }


    function permissionString(permission) {
        if (permission == "r") {
            return "Read";
        }
        if (permission == "rw") {
            return "Read+Write";
        }
        if (permission == "w") {
            return "Write";
        }
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

    function error(err) {
        var msg;
        if (typeof err === "string") {
            msg = err;
        } else {
            msg = err.responseJSON.message;
        }
        nav.fire("addAlert", "danger", "", msg);
    }

});


if (!window.location.origin) {
    //for IE
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
