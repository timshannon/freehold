QUnit.module("files", {
    setup: function(assert) {
        QUnit.stop();
        //upload testing file
        var form = new FormData();
        form.append("testfile.xml",
            new Blob(['<test id="1"><inner id="2"></inner></test>'], {
                type: "text/xml"
            }), "testfile.xml");

        //upload file
        fh.file.upload("/testing/v1/file/testdata/", form)
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: [{
                        name: "testfile.xml",
                        url: "/testing/v1/file/testdata/testfile.xml"
                    }]
                });
                QUnit.start();
            });

    },
    teardown: function(assert) {
        QUnit.stop();
        //delete file
        fh.file.delete("/testing/v1/file/testdata/testfile.xml")
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "testfile.xml",
                        url: "/testing/v1/file/testdata/testfile.xml"
                    }
                });
                QUnit.start();
            });
    }
});

QUnit.asyncTest("Update File", function(assert) {
    expect(3);
    var form = new FormData();
    form.append("testfile.xml",
        new Blob(['<test id="1">New data<inner id="2"></inner></test>'], {
            type: "text/xml"
        }), "testfile.xml");

    //update file
    fh.file.update("/testing/v1/file/testdata/", form)
        .always(function(result) {
            assert.deepEqual(result, {
                status: "success",
                data: [{
                    name: "testfile.xml",
                    url: "/testing/v1/file/testdata/testfile.xml"
                }]
            });
            QUnit.start();
        });
});

QUnit.asyncTest("Move File", function(assert) {
    expect(5);

    fh.file.move("/testing/v1/file/testdata/testfile.xml", "/testing/v1/file/testdata/renamed.xml")
        .always(function(result) {
            assert.deepEqual(result, {
                status: "success",
                data: {
                    name: "renamed.xml",
                    url: "/testing/v1/file/testdata/renamed.xml"
                }
            });
            fh.properties.get("/testing/v1/file/testdata/renamed.xml")
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data.name == "renamed.xml") &&
                        (result.data.permissions.owner == fh.auth.user) &&
                        (result.data.permissions.private == "rw") &&
                        (result.data.size == 42) &&
                        (result.data.url = "/testing/v1/file/testdata/renamed.xml")
                    );
                    //move file back so it can be clead up after the test
                    fh.file.move("/testing/v1/file/testdata/renamed.xml", "/testing/v1/file/testdata/testfile.xml")
                        .always(function(result) {
                            assert.deepEqual(result, {
                                status: "success",
                                data: {
                                    name: "testfile.xml",
                                    url: "/testing/v1/file/testdata/testfile.xml"
                                }
                            });
                            QUnit.start();
                        });
                });
        });
});


QUnit.asyncTest("Set Permissions", function(assert) {
    expect(3);

    var newPrm = {
        permissions: {
            owner: fh.auth.user,
            public: "",
            private: "rw",
            friend: "r"
        }
    };



    //set permissions
    fh.properties.set("/testing/v1/file/testdata/testfile.xml", newPrm)
        .always(function(result) {
            assert.deepEqual(result, {
                "data": {
                    "name": "testfile.xml",
                    "url": "/testing/v1/file/testdata/testfile.xml"
                },
                "status": "success"
            });
            QUnit.start();
        });
});

QUnit.asyncTest("Get Properties", function(assert) {
    expect(3);

    fh.properties.get("/testing/v1/file/testdata/testfile.xml")
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "testfile.xml") &&
                (result.data.permissions.owner == fh.auth.user) &&
                (result.data.permissions.private == "rw") &&
                (result.data.size == 42) &&
                (result.data.url = "/testing/v1/file/testdata/testfile.xml")
            );
            QUnit.start();
        });

});


QUnit.module("settings");
QUnit.asyncTest("Get Setting", function(assert) {
    expect(1);

    fh.settings.get("LogErrors")
        .always(function(result) {
            //returned successfully and didn't return a map of settings
            assert.ok((result.status == "success") &&
                (result.data.description === "Whether or not errors will be logged in the core/log datastore."));
            QUnit.start();
        });
});

QUnit.asyncTest("All Settings", function(assert) {
    expect(1);

    fh.settings.all()
        .always(function(result) {
            assert.ok((result.status == "success") &&
                (result.data.LogErrors.description === "Whether or not errors will be logged in the core/log datastore."));
            QUnit.start();
        });
});


QUnit.asyncTest("Set Setting", function(assert) {
    expect(1);

    fh.settings.get("LogErrors")
        .always(function(result) {
            var val = result.data.value;
            fh.settings.set("LogErrors", false)
                .always(function(result) {
                    fh.settings.get("LogErrors")
                        .always(function(result) {
                            assert.deepEqual(result.data.value, false);
                            fh.settings.set("LogErrors", val)
                                .always(function(result) {
                                    QUnit.start();
                                });
                        });
                });
        });
});

QUnit.asyncTest("Default Setting", function(assert) {
    expect(1);

    fh.settings.get("LogErrors")
        .always(function(result) {
            var val = result.data.value;
            fh.settings.default("LogErrors")
                .always(function(result) {
                    fh.settings.get("LogErrors")
                        .always(function(result) {
                            assert.deepEqual(result.data.value, true);

                            fh.settings.set("LogErrors", val)
                                .always(function(result) {
                                    QUnit.start();
                                });
                        });
                });
        });
});


QUnit.module("Users", {
    setup: function(assert) {
        QUnit.stop();
        //Create test user
        fh.user.new({
                user: "quinitTestUser",
                password: "qunitTestPassword",
                name: "QUnit Test User"
            })
            .always(function(result) {
                assert.ok(
                    (result.status == "success") &&
                    (result.data.name == "QUnit Test User")
                );
                QUnit.start();
            });
    },
    teardown: function(assert) {
        QUnit.stop();
        //delete test user
        fh.user.delete("quinitTestUser")
            .always(function(result) {
                assert.ok((result.status == "success"));
                QUnit.start();
            });
    }
});


QUnit.asyncTest("Get User", function(assert) {
    expect(3);

    fh.user.get("quinitTestUser")
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "QUnit Test User")
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Get All Users", function(assert) {
    expect(3);

    fh.user.all()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.quinitTestUser.name == "QUnit Test User")
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Update User", function(assert) {
    expect(4);

    fh.user.update({
            user: "quinitTestUser",
            name: "Bob QUnit Test User"
        })
        .always(function(result) {
            //Users can only update themselves
            assert.ok(
                (result.status == "fail")
            );
            QUnit.start();
        });

    QUnit.stop();
    $.ajax({
            type: "PUT",
            url: "/v1/auth/user/",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("quinitTestUser:qunitTestPassword"));
            },
            data: JSON.stringify({
                name: "Bob QUnit Test User"
            })
        })
        .always(function(result) {
            fh.user.get("quinitTestUser")
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data.name == "Bob QUnit Test User")
                    );
                    QUnit.start();
                });
        });

});


QUnit.module("Application");
QUnit.asyncTest("Get Application", function(assert) {
    expect(1);

    fh.application.get("testing")
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "Testing")
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Get Installed Applications", function(assert) {
    expect(1);

    fh.application.installed()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.testing.name == "Testing")
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Get Available Applications", function(assert) {
    expect(1);

    fh.application.available()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.testing.name == "Testing")
            );
            QUnit.start();
        });
});


QUnit.module("Session");
QUnit.asyncTest("Get Session", function(assert) {
    expect(1);

    fh.session.get()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length >= 1)
            );
            QUnit.start();
        });
});


QUnit.module("Token");
QUnit.asyncTest("New, Get and Delete Token", function(assert) {
    expect(3);

    fh.token.new({
            name: "test token"
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "test token")
            );
            var token = result.data.token;

            fh.token.get(token)
                .always(function(getResult) {
                    assert.ok(
                        (getResult.status == "success") &&
                        (getResult.data.name == "test token")
                    );
                    fh.token.delete(token)
                        .always(function(deleteResult) {
                            assert.ok(
                                (deleteResult.status == "success")
                            );
                            QUnit.start();
                        });
                });
        });
});

QUnit.module("Datastore", {
    setup: function(assert) {
        QUnit.stop();
        fh.datastore.new("/testing/v1/datastore/testdata/test.ds")
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "test.ds",
                        url: "/testing/v1/datastore/testdata/test.ds"
                    }
                });
                QUnit.start();
            });

    },
    teardown: function(assert) {
        QUnit.stop();
        //delete file
        var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

        ds.drop()
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "test.ds",
                        url: "/testing/v1/datastore/testdata/test.ds"
                    }
                });
                QUnit.start();
            });
    }
});
QUnit.asyncTest("Get, Put and Delete Data in datastore", function(assert) {
    expect(6);

    var testVal = "testvalue";

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");
    ds.put(10, testVal)
        .always(function(result) {
            assert.ok(
                (result.status == "success")
            );
            ds.get(10)
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data == testVal)
                    );
                    ds.delete(10)
                        .always(function(result) {
                            console.log("delete record");
                            assert.ok(
                                (result.status == "success")
                            );
                            ds.get(10)
                                .always(function(result) {
                                    console.log("2nd get");
                                    assert.ok(
                                        (result.status == "fail") //should not be found
                                    );
                                    QUnit.start();
                                });
                        });
                });

        });
});

QUnit.asyncTest("Max Key", function(assert) {
    expect(3);
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    for (var i = 0; i < 100; i++) {
        $.when(ds.put(i, fh.uuid()))
            .then();
    }

    ds.max().always(function(result) {
        assert.ok(
            (result.status == "success") &&
            (result.data.key == 99)
        );
        QUnit.start();
    });

});

QUnit.asyncTest("Min Key", function(assert) {
    expect(3);
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    for (var i = 0; i < 100; i++) {
        $.when(ds.put(i, fh.uuid()))
            .then();
    }

    ds.min().always(function(result) {
        assert.ok(
            (result.status == "success") &&
            (result.data.key === 0)
        );
        QUnit.start();
    });

});

QUnit.asyncTest("Datastore Properties", function(assert) {
    expect(3);

    fh.properties.get("/testing/v1/datastore/testdata/test.ds")
        .always(function(result) {
            assert.ok(
                (result.data.name == "test.ds") &&
                (result.data.permissions.owner == fh.auth.user) &&
                (result.data.permissions.private == "rw") &&
                (result.data.url == "/testing/v1/datastore/testdata/test.ds")
            );
            QUnit.start();
        });
});


QUnit.asyncTest("Iterate through data", function(assert) {
    expect(4);
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        data[i] = fh.uuid();
    }

    ds.putObj(data)
        .always(function(result) {
            assert.ok(
                (result.status == "success")
            );
            ds.iter({
                    from: "10",
                    to: "50",
                    skip: 10,
                    limit: 5
                })
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data.length == 5)
                    );
                });

            QUnit.start();
        });

});


QUnit.asyncTest("Regex test", function(assert) {
    expect(4);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        if (i < 10) {
            data["regextest" + i] = fh.uuid();
        } else {
            data[i] = fh.uuid();
        }
    }

    ds.putObj(data)
        .always(function(result) {
            assert.ok(
                (result.status == "success")
            );
            ds.iter({
                    regexp: "regextest"
                })
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data.length == 10)
                    );
                    QUnit.start();
                });
        });



});

QUnit.asyncTest("Count + Regex", function(assert) {
    expect(4);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        if (i < 10) {
            data["regextest" + i] = fh.uuid();
        } else {
            data[i] = fh.uuid();
        }
    }

    ds.putObj(data)
        .always(function(result) {
            assert.ok(
                (result.status == "success")
            );
            ds.count({
                    regexp: "regextest"
                })
                .always(function(result) {
                    assert.ok(
                        (result.status == "success") &&
                        (result.data == 10)
                    );
                    QUnit.start();
                });
        });



});



QUnit.module("Datastore Iter", {
    setup: function(assert) {
        QUnit.stop();
        fh.datastore.new("/testing/v1/datastore/testdata/test.ds")
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "test.ds",
                        url: "/testing/v1/datastore/testdata/test.ds"
                    }
                });
                var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

                for (var i = 0; i < 100; i++) {
                    $.when(ds.put(i, fh.uuid()))
                        .then();
                }

                QUnit.start();
            });

    },
    teardown: function(assert) {
        QUnit.stop();
        //delete file
        var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

        ds.drop()
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "test.ds",
                        url: "/testing/v1/datastore/testdata/test.ds"
                    }
                });
                QUnit.start();
            });
    }
});

QUnit.asyncTest("Test From and To", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({
            from: 5,
            to: 10
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 6) &&
                (result.data[0].key == 5) &&
                (result.data[5].key == 10)
            );
            QUnit.start();
        });

});

QUnit.asyncTest("Test Reverse From and To", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({
            from: 10,
            to: 5
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 6) &&
                (result.data[0].key == 10) &&
                (result.data[5].key == 5)
            );
            QUnit.start();
        });

});

QUnit.asyncTest("Test Reverse From and To with forced asc order", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({
            from: 10,
            to: 5,
            order: "asc"

        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 6) &&
                (result.data[0].key == 5) &&
                (result.data[5].key == 10)
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Test Full Range", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({})
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 100) &&
                (result.data[0].key === 0) &&
                (result.data[5].key == 5) &&
                (result.data[99].key == 99)
            );
            QUnit.start();
        });
});

QUnit.asyncTest("Test Reverse Full Range", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({
            order: "dsc"
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 100) &&
                (result.data[0].key === 99) &&
                (result.data[99].key === 0)
            );
            QUnit.start();
        });
});



QUnit.asyncTest("Iterate through reverse order non-string keys with limit", function(assert) {
    expect(3);

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({
            from: 50,
            to: 10,
            skip: 10,
            limit: 5,
            order: "dsc"
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 5) &&
                (result.data[0].key == 40) &&
                (result.data[4].key == 36)
            );
            QUnit.start();
        });

});


QUnit.module("Logs", {}); // There should be at least on log entry for the firstadmin

QUnit.asyncTest("Log", function(assert) {
    expect(1);

    fh.logs({
            limit: 1
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 1)
            );
            QUnit.start();
        });

});

QUnit.asyncTest("Log Type", function(assert) {
    expect(1);

    fh.logs({
            type: "authentication"
        })
        .always(function(result) {
            var notAuth;

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].type != "authentication") {
                    notAuth = true;
                    break;
                }
            }
            assert.ok(
                (result.status == "success") &&
                (!notAuth)
            );
            QUnit.start();
        });

});
