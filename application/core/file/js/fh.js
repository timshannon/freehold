window.fh = (function() {
    'use strict';
    var _auth;
    var versions = ["v1"];

    function stdAjax(type, url, options) {
        if (!options) {
            options = {};
        }
        if (!options.type) {
            options.type = type;
        }
        if (!options.url) {
            options.url = url;
        }
        if (!options.dataType) {
            options.dataType = "json";
        }

        if ((type.toUpperCase() !== "GET") && (!options.beforeSend)) {
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", fh.auth.CSRFToken);
            };
        }

        return $.ajax(options)
            .then(function(data) {
                    return data;
                },
                function(data) {
                    if (data.responseJSON) {
                        return data.responseJSON;
                    }
                    if (data.status == 404) {
                        return {
                            status: "fail",
                            message: "Resource not found"
                        };
                    } else {
                        return {
                            status: "error",
                            message: "An error occurred: Status (" + data.status + ")",
                        };
                    }
                });
    }

    return {
        auth: function() {
            if (_auth) {
                return _auth;
            }
            $.ajax({
                type: "GET",
                url: "/v1/auth/",
                dataType: "json",
                async: false,
                complete: function(xhr) {
                    var result = JSON.parse(xhr.responseText);
                    _auth = result.data;
                    _auth.CSRFToken = xhr.getResponseHeader("X-CSRFToken");
                },
            });
            return _auth;
        }(),
        uuid: function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        file: {
            upload: function(fileurl, formData) {
                //very simple file upload, feel free to write you own or use a plugin
                //  with progress handling, polyfills, etc
                // just be sure to include the X-CSRFToken header:
                //   xhr.setRequestHeader ("X-CSRFToken", fh.auth.CSRFToken);
                return stdAjax("POST", fileurl, {
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false
                });
            },
            update: function(fileurl, formData) {
                return stdAjax("PUT", fileurl, {
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false
                });
            },
            move: function(from, to) {
                return stdAjax("PUT", from, {
                    data: JSON.stringify({
                        move: to
                    }),
                });
            },
            delete: function(fileurl) {
                return stdAjax("DELETE", fileurl);
            }
        },
        properties: {
            get: function(fileurl) {
                return stdAjax("GET", propPath(fileurl));
            },
            set: function(fileurl, properties) {
                return stdAjax("PUT", propPath(fileurl), {
                    data: JSON.stringify(properties)
                });
            }
        },
        application: {
            get: function(appid) {
                return stdAjax("GET", "/v1/application/", {
                    data: JSON.stringify({
                        id: appid
                    }),
                });
            },
            available: function() {
                return stdAjax("GET", "/v1/application/available/");
            },
            postAvailable: function(filename) {
                return stdAjax("POST", "/v1/application/available/", {
                    data: JSON.stringify({
                        file: filename
                    })
                });
            },
            installed: function() {
                return stdAjax("GET", "/v1/application/");
            },
            install: function(filename) {
                return stdAjax("POST", "/v1/application/", {
                    data: JSON.stringify({
                        file: filename
                    })
                });
            },
            upgrade: function(filename) {
                return stdAjax("PUT", "/v1/application/", {
                    data: JSON.stringify({
                        file: filename
                    })
                });

            },
            uninstall: function(appid) {
                return stdAjax("DELETE", "/v1/application/", {
                    data: JSON.stringify({
                        id: appid
                    })
                });
            }

        }, //application
        settings: {
            all: function() {
                return stdAjax("GET", "/v1/settings/");
            },
            get: function(setting) {
                return stdAjax("GET", "/v1/settings/", {
                    data: JSON.stringify({
                        setting: setting
                    })
                });
            },
            set: function(setting, value) {
                return stdAjax("PUT", "/v1/settings/", {
                    data: JSON.stringify({
                        setting: setting,
                        value: value
                    })
                });

            },
            default: function(setting) {
                return stdAjax("DELETE", "/v1/settings/", {
                    data: JSON.stringify({
                        setting: setting
                    })
                });
            }
        },
        user: {
            all: function() {
                return stdAjax("GET", "/v1/auth/user/");
            },
            get: function(username) {
                return stdAjax("GET", "/v1/auth/user/", {
                    data: JSON.stringify({
                        user: username
                    })
                });
            },
            new: function(userObject) {
                return stdAjax("POST", "/v1/auth/user/", {
                    data: JSON.stringify(userObject)
                });
            },
            update: function(userObject) { //Current user
                return stdAjax("PUT", "/v1/auth/user/", {
                    data: JSON.stringify(userObject)
                });

            },
            makeAdmin: function(username) {
                return stdAjax("PUT", "/v1/auth/user/", {
                    data: JSON.stringify({
                        user: username,
                        admin: true,
                    })
                });
            },
            removeAdmin: function() { //current user 
                return stdAjax("PUT", "/v1/auth/user/", {
                    data: JSON.stringify({
                        admin: false,
                    })
                });

            },
            delete: function(username) {
                return stdAjax("DELETE", "/v1/auth/user/", {
                    data: JSON.stringify({
                        user: username
                    })
                });
            }
        },
        session: {
            get: function() {
                return stdAjax("GET", "/v1/auth/session/");
            },
            login: function(username, password, expires) {
                var expData, result;
                if (expires) {
                    expData = {
                        expires: expires
                    };
                }
                return stdAjax("POST", "/v1/auth/session/", {
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                    },
                    data: JSON.stringify(expData),
                });
            },
            logout: function(session) {
                if (!session) {
                    return stdAjax("DELETE", "/v1/auth/session/");
                }
                return stdAjax("DELETE", "/v1/auth/session/", {
                    data: JSON.stringify({
                        id: session
                    }),
                });

            },
        },
        token: {
            all: function() {
                return stdAjax("GET", "/v1/auth/token/");
            },
            get: function(token) {
                return stdAjax("GET", "/v1/auth/token/", {
                    data: JSON.stringify({
                        token: token
                    }),
                });
            },
            new: function(tokenObject) { //{name:"", resource: "", expires: "", permission: ""}
                return stdAjax("POST", "/v1/auth/token/", {
                    data: JSON.stringify(tokenObject),
                });
            },
            delete: function(token) {
                return stdAjax("DELETE", "/v1/auth/token/", {
                    data: JSON.stringify({
                        token: token
                    }),
                });
            },
        },
        datastore: {
            new: function(dsPath) {
                return stdAjax("POST", dsPath);
            },
            upload: function(dsPath, formData) {
                return stdAjax("POST", dsPath, {
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false
                });
            },
                    },
        Datastore: function(dsPath) {
            this.path = dsPath;
            this.get = function(key) {
                return stdAjax("GET", this.path, {
                    data: JSON.stringify({
                        key: key
                    }),
                });
            };
            this.max = function() {
                return stdAjax("GET", this.path, {
                    data: JSON.stringify({
                        max: {}
                    }),
                });
            };
            this.min = function() {
                return stdAjax("GET", this.path, {
                    data: JSON.stringify({
                        min: {}
                    }),
                });
            };
            this.count = function(iterObject) {
                return stdAjax("GET", this.path, {
                    data: JSON.stringify({
                        count: {},
                        iter: iterObject
                    }),
                });

            };
            this.iter = function(iterObject) {
                return stdAjax("GET", this.path, {
                    data: JSON.stringify({
                        iter: iterObject
                    }),
                });
            };
            this.putObj = function(data) {
                return stdAjax("PUT", this.path, {
                    data: JSON.stringify(data),
                });

            };
            this.put = function(key, value) {
                return stdAjax("PUT", this.path, {
                    data: JSON.stringify({
                        key: key,
                        value: value
                    }),
                });

            };

            this.drop = function() {
                return stdAjax("DELETE", this.path);
            };
            this.delete = function(key) {
                return stdAjax("DELETE", dsPath, {
                    data: JSON.stringify({
                        key: key
                    }),
                });
            };
        },
        logs: function(iter) {
            return stdAjax("GET", "/v1/log/", {
                data: JSON.stringify({
                    iter: iter
                }),
            });
        },
        util: {
            urlParm: function(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return sParameterName[1];
                    }
                }
            }
        }
    };




    function propPath(fileurl) {
        if (!fileurl || typeof fileurl !== "string") {
            return "";
        }

        var split = fileurl.split("/");

        if (split[0] === "") {
            split = split.slice(1);
        }

        var slc1, slc2;

        if (versions.indexOf(split[0]) != -1) {
            slc1 = split.slice(0, 1);
            slc2 = split.slice(1);
        } else {
            slc1 = split.slice(0, 2);
            slc2 = split.slice(2);
        }

        var prop = slc1.concat("properties", slc2);
        return "/" + prop.join("/");
    }

}()); //end
