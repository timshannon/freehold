// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

QUnit.module("files", {
    beforeEach: function(assert) {
        var done = assert.async();
        //upload testing file
        var form = new FormData();
        form.append("testfile.xml",
            new Blob(['<test id="1"><inner id="2"></inner></test>'], {
                type: "text/xml"
            }), "testfile.xml");

        //upload file
        fh.file.newFolder("/testing/v1/file/testdata/")
            .always(function() {
                fh.file.upload("/testing/v1/file/testdata/", form)
                    .always(function(result) {
                        assert.deepEqual(result, {
                            status: "success",
                            data: [{
                                name: "testfile.xml",
                                url: "/testing/v1/file/testdata/testfile.xml"
                            }]
                        });
                        done();
                    });
            });

    },
    afterEach: function(assert) {
        var done = assert.async();
        //delete folder
        fh.file.delete("/testing/v1/file/testdata/")
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "testdata",
                        url: "/testing/v1/file/testdata/"
                    }
                });
                done();
            });
    }
});

QUnit.test("Update File", function(assert) {
    assert.expect(3);

    var done = assert.async();
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
            done();
        });
});

QUnit.test("Move File", function(assert) {
    assert.expect(5);
    var done = assert.async();

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
                            done();
                        });
                });
        });
});


QUnit.test("Set Permissions", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });
});

QUnit.test("Get Properties", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });
});


QUnit.module("settings");
QUnit.test("Get Setting", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.settings.get("LogErrors")
        .always(function(result) {
            //returned successfully and didn't return a map of settings
            assert.ok((result.status == "success") &&
                (result.data.description === "Whether or not errors will be logged in the core/log datastore."));
            done();
        });
});

QUnit.test("All Settings", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.settings.all()
        .always(function(result) {
            assert.ok((result.status == "success") &&
                (result.data.LogErrors.description === "Whether or not errors will be logged in the core/log datastore."));
            done();
        });
});


QUnit.test("Set Setting", function(assert) {
    assert.expect(1);
    var done = assert.async();

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
                                    done();
                                });
                        });
                });
        });
});

QUnit.test("Default Setting", function(assert) {
    assert.expect(1);
    var done = assert.async();

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
                                    done();
                                });
                        });
                });
        });
});


QUnit.module("Users", {
    beforeEach: function(assert) {
        var done = assert.async();
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
                done();
            });
    },
    afterEach: function(assert) {
        var done = assert.async();
        //delete test user
        fh.user.delete("quinitTestUser")
            .always(function(result) {
                assert.ok((result.status == "success"));
                done();
            });
    }
});


QUnit.test("Get User", function(assert) {
    assert.expect(3);
    var done = assert.async();

    fh.user.get("quinitTestUser")
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "QUnit Test User")
            );
            done();
        });
});

QUnit.test("Get All Users", function(assert) {
    assert.expect(3);
    var done = assert.async();

    fh.user.all()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.quinitTestUser.name == "QUnit Test User")
            );
            done();
        });
});

QUnit.test("Update User", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
                    done();
                });
        });
});


QUnit.module("Application");
QUnit.test("Get Application", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.application.get("testing")
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.name == "Testing")
            );
            done();
        });
});

QUnit.test("Get Installed Applications", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.application.installed()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.testing.name == "Testing")
            );
            done();
        });
});

QUnit.test("Get Available Applications", function(assert) {
    assert.expect(1);

    var done = assert.async();
    fh.application.available()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.testing.name == "Testing")
            );
            done();
        });
});


QUnit.module("Session");
QUnit.test("Get Session", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.session.get()
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length >= 1)
            );
            done();
        });
});


QUnit.module("Token");
QUnit.test("New, Get and Delete Token", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
                            done();
                        });
                });
        });
});

//TODO: Currently errors when multiple threads try to drop and 
// create test.ds.  Rewrite so it only gets created once
//  or move all tests into one large test
QUnit.module("Datastore", {
    beforeEach: function(assert) {
        var done = assert.async();
        fh.datastore.new("/testing/v1/datastore/testdata/test.ds")
            .always(function(result) {
                assert.deepEqual(result, {
                    status: "success",
                    data: {
                        name: "test.ds",
                        url: "/testing/v1/datastore/testdata/test.ds"
                    }
                });
                done();
            });

    },
    afterEach: function(assert) {
        var done = assert.async();
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
                done();
            });
    }
});
QUnit.test("Get, Put and Delete Data in datastore", function(assert) {
    assert.expect(6);

    var done = assert.async();
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
                            assert.ok(
                                (result.status == "success")
                            );
                            ds.get(10)
                                .always(function(result) {
                                    assert.ok(
                                        (result.status == "fail") //should not be found
                                    );
                                    done();
                                });
                        });
                });

        });
});

QUnit.test("Max Key", function(assert) {
    assert.expect(3);
    var done = assert.async();
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    for (var i = 0; i < 100; i++) {
        $.when(ds.put(i, fh.util.uuid()))
            .then();
    }

    ds.max().always(function(result) {
        assert.ok(
            (result.status == "success") &&
            (result.data.key == 99)
        );
        done();
    });

});

QUnit.test("Min Key", function(assert) {
    assert.expect(3);
    var done = assert.async();
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    for (var i = 0; i < 100; i++) {
        $.when(ds.put(i, fh.util.uuid()))
            .then();
    }

    ds.min().always(function(result) {
        assert.ok(
            (result.status == "success") &&
            (result.data.key === 0)
        );
        done();
    });

});

QUnit.test("Datastore Properties", function(assert) {
    assert.expect(3);
    var done = assert.async();

    fh.properties.get("/testing/v1/datastore/testdata/test.ds")
        .always(function(result) {
            assert.ok(
                (result.data.name == "test.ds") &&
                (result.data.permissions.owner == fh.auth.user) &&
                (result.data.permissions.private == "rw") &&
                (result.data.url == "/testing/v1/datastore/testdata/test.ds")
            );
            done();
        });
});


QUnit.test("Iterate through data", function(assert) {
    assert.expect(4);
    var done = assert.async();
    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        data[i] = fh.util.uuid();
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

                    done();
                });

        });

});


QUnit.test("Regex test", function(assert) {
    assert.expect(4);
    var done = assert.async();

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        if (i < 10) {
            data["regextest" + i] = fh.util.uuid();
        } else {
            data[i] = fh.util.uuid();
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
                    done();
                });
        });



});

QUnit.test("Count + Regex", function(assert) {
    assert.expect(4);
    var done = assert.async();

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    var data = {};
    for (var i = 0; i <= 100; i++) {
        if (i < 10) {
            data["regextest" + i] = fh.util.uuid();
        } else {
            data[i] = fh.util.uuid();
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
                    done();
                });
        });
});



QUnit.module("Datastore Iter", {
    beforeEach: function(assert) {
        var done = assert.async();
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
                    $.when(ds.put(i, fh.util.uuid()))
                        .then();
                }

                done();
            });

    },
    afterEach: function(assert) {
        var done = assert.async();
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
                done();
            });
    }
});

QUnit.test("Test From and To", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });

});

QUnit.test("Test Reverse From and To", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });

});

QUnit.test("Test Reverse From and To with forced asc order", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });
});

QUnit.test("Test Full Range", function(assert) {
    assert.expect(5);
    var done = assert.async();

    var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");

    ds.iter({})
        .always(function(result) {
            assert.equal(result.status, "success",  result.message);
            assert.equal(result.data.length, 100);
            assert.ok(
                (result.data[0].key === 0) &&
                (result.data[5].key == 5) &&
                (result.data[99].key == 99)
            );
            done();
        });
});

QUnit.test("Test Reverse Full Range", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });
});



QUnit.test("Iterate through reverse order non-string keys with limit", function(assert) {
    assert.expect(3);
    var done = assert.async();

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
            done();
        });

});


QUnit.module("Logs", {}); // There needs to be at least on log entry 

QUnit.test("Log", function(assert) {
    assert.expect(1);
    var done = assert.async();

    fh.logs({
            limit: 1
        })
        .always(function(result) {
            assert.ok(
                (result.status == "success") &&
                (result.data.length == 1)
            );
            done();
        });

});

QUnit.test("Log Type", function(assert) {
    assert.expect(1);
    var done = assert.async();

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
            done();
        });

});
