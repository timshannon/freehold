// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

window.fh = (function() {
    'use strict';
    var _auth;
    var versions = ["v1"]; //will only show versions supported by this library
    var _runas;

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

        if (_runas) {
            var username = _runas.username;
            var password = _runas.password;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            };

            _runas = null;

        }

        if ((type != "GET") && (!options.beforeSend)) {
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", fh.auth.CSRFToken);
            };
        }

        return $.ajax(options);
    }

    function uploadFile(type, uploadPath, fileData, progress) {
        //very simple file upload, feel free to write you own or use a plugin
        //  with progress handling, polyfills, etc
        // just be sure to include the X-CSRFToken header:
        //   xhr.setRequestHeader ("X-CSRFToken", fh.auth.CSRFToken);
        var formData;
        if (fileData instanceof FormData) {
            formData = fileData;
        } else if (fileData instanceof File) {
            formData = new FormData();

            formData.append(fileData.name,
                fileData, fileData.name);
        } else {
            //not supported
            throw "FileData type not supported";
        }

        return stdAjax(type, uploadPath, {
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", progress, false);
                return xhr;
            },
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
        file: {
            upload: function(uploadPath, fileData, progress) {
                return uploadFile("POST", uploadPath, fileData, progress);
            },
            newFolder: function(fileurl) {
                return stdAjax("POST", fileurl);
            },
            update: function(uploadPath, fileData, progress) {
                return uploadFile("PUT", uploadPath, fileData, progress);
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
            update: function(userObject) {
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
            get: function(tokenID) {
                return stdAjax("GET", "/v1/auth/token/", {
                    data: JSON.stringify({
                        id: tokenID
                    }),
                });
            },
            new: function(tokenObject, username, password) { //{name:"", resource: "", expires: "", permission: ""}
                var options = {
                    data: JSON.stringify(tokenObject),
                };
                if (username && password) {
                    options.beforeSend = function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                    };
                }

                return stdAjax("POST", "/v1/auth/token/", options);
            },
            delete: function(tokenID) {
                return stdAjax("DELETE", "/v1/auth/token/", {
                    data: JSON.stringify({
                        id: tokenID
                    }),
                });
            },
        },
        datastore: {
            new: function(dsPath) {
                return stdAjax("POST", dsPath);
            },
            upload: function(dsPath, fileData, progress) {
                return uploadFile("POST", dsPath, fileData, progress);
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
        backup: function(username, password, datastores, filename) {
			var options = {
                data: JSON.stringify({
                    datastores: datastores,
                    filename: filename,
                }),
};
if (username && password) {
                    options.beforeSend = function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                    };
                }
            return stdAjax("GET", "/v1/backup/", options);
        },
        util: {
            versions: function() {
                return versions;
            },
            runNextAs: function(username, password) {
                _runas = {
                    username: username,
                    password: password
                };
            },
            uuid: function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },
            urlJoin: function() {
                var j = [].slice.call(arguments, 0).join("/");
                return j.replace(/[\/]+/g, '/')
                    .replace(/\/\?/g, '?')
                    .replace(/\/\#/g, '#')
                    .replace(/\:\//g, '://');
            },
            splitRootAndPath: function(pattern) {
                if (!pattern || typeof pattern !== "string") {
                    return null;
                }
                if (pattern[0] === "/") {
                    pattern = pattern.slice(1);
                }
                var split = pattern.split("/");
                var root = split[0];
                var path;
                if (split.length < 2) {
                    path = "/";
                } else {
                    path = "/" + split.slice(1).join("/");
                }
                return [root, path];
            },
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

        var split = fh.util.splitRootAndPath(fileurl);

        var root = split[0];
        var path = split[1];

        if (versions.indexOf(root) === -1) {
            //app path
            var app = root;
            split = fh.util.splitRootAndPath(path);
            root = split[0];
            path = split[1];
            return fh.util.urlJoin("/", app, root, "properties", path);
        }
        //non-app path
        return fh.util.urlJoin("/", root, "properties", path);
    }

}()); //end
