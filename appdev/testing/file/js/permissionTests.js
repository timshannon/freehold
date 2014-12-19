function login(user) {
	fh.util.runNextAs(user.user, user.password);
}

function readFolder(assert, folder, expected) {
    var done = assert.async();

    fh.properties.get(folder)
        .done(function(result) {
            assert.matchExisting(result, expected, "read folder");
            done();
        }).fail(function(result) {
            result = result.responseJSON;
            assert.matchExisting(result, expected, "read folder");
            done();
        });

    return 1;
}

function newFolder(assert, newfolder, status) {
    var done = assert.async();

    fh.file.newFolder(newfolder)
        .done(function(result) {
            assert.equal(result.status, status, "New folder: " + result.message);
            done();
        })
        .fail(function(result) {
            result = result.responseJSON;
            assert.equal(result.status, status, "New folder: " + result.message);
            done();
        });

    return 1;
}

function moveFolder(assert, from, to, status) {
    var done = assert.async();

    fh.file.move(from, to)
        .always(function(result) {
            if (result.status === "success") {
                assert.equal(result.status, status, "Move Folder: " + result.message);
                //moveback
                fh.file.move(to, from)
                    .always(function() {
                        done();
                    });
            } else {
                result = result.responseJSON;
                assert.equal(result.status, status, "Move Folder: " + result.message);
                done();
            }

        });

    return 1;
}


function deleteFolder(assert, folder, status) {
    var done = assert.async();

    fh.file.delete(folder)
        .always(function(result) {
            if (result.status === "success") {
                assert.equal(result.status, status, "Delete Folder: " + result.message);
                //re-add
                fh.file.newFolder(folder)
                    .always(function(result) {
                        done();
                    });
            } else {
                result = result.responseJSON;
                assert.equal(result.status, status, "Delete Folder: " + result.message);
                done();
            }
        });

    return 1;
}

/*************************
 * Tests Start
 *************************/

QUnit.module("Implicit Permissions", {
    beforeEach: function(assert) {
        this.userA = {
            user: "quinitTestUserAdmin",
            password: "qunitTestPassword",
            name: "QUnit Test User Admin",
            admin: true,
        };

        var done1 = assert.async();
        var done2 = assert.async();

        //Create test user A
        fh.user.new(this.userA)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done1();
            });

        this.userB = {
            user: "quinitTestUserB",
            password: "qunitTestPassword",
            name: "QUnit Test User Normal"
        };

        //Create test user B
        fh.user.new(this.userB)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done2();
            });

    },
    afterEach: function(assert) {
        var done1 = assert.async();
        var done2 = assert.async();


        //delete test users
        fh.user.delete(this.userA.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done1();
            });
        fh.user.delete(this.userB.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done2();
            });
    }
});

QUnit.test("Root Folder Create Permissions", function(assert) {
    //Admins should be able to write to the root file dir
    // regular users should not

    assert.expect(6);

    var doneA = assert.async();
    var doneB = assert.async();

    var a = this.userA;
    var b = this.userB;

    login(a);

    fh.file.newFolder("/v1/file/qunitTestingFolderA")
        .done(function(result) {
            assert.equal(result.status, "success", "User A Folder Created at root");

            login(a);
            fh.file.delete("/v1/file/qunitTestingFolderA")
                .always(function(result) {
                    doneA();
                });
        })
        .fail(function(result) {
            result = result.responseJSON;
            assert.ok(false, result.message);

            login(a);
            fh.file.delete("/v1/file/qunitTestingFolderA")
                .always(function(result) {
                    doneA();
                });
        });


    login(b);

    fh.file.newFolder("/v1/file/qunitTestingFolderB")
        .fail(function(result) {
            result = result.responseJSON;
            assert.equal(result.status, "fail", "Success: " + result.message);
            doneB();
        })
        .done(function(result) {
            assert.ok(false, "User should not be able to create a folder at root");
            login(b);
            fh.file.delete("/v1/file/qunitTestingFolderB")
                .always(function(result) {
                    doneB();
                });

        });
});


QUnit.test("Core Permissions - Application", function(assert) {
    //Non-admins shouldn't be able write application info, but should be able to 
    // see installed applications

    assert.expect(11);

    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();
    var done5 = assert.async();
    var done6 = assert.async();
    var done7 = assert.async();

    var user = this.userB;

    login(user);



    fh.application.postAvailable("invalidfilename.zip")
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "Resource not found",
                data: "/v1/application/available/",
            });
            done1();
        });

    fh.application.available()
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "Resource not found",
                data: "/v1/application/available/",
            });
            done2();
        });

    fh.application.install("invalidfilename.zip")
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permission to write to this resource.",
                data: "/v1/application/",
            });
            done3();
        });

    fh.application.upgrade("invalidfilename.zip")
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permission to write to this resource.",
                data: "/v1/application/",
            });
            done4();
        });

    fh.application.uninstall("invalidfilename.zip")
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permission to write to this resource.",
                data: "/v1/application/",
            });
            done5();
        });

    fh.application.get("testing")
        .always(function(result) {
            assert.equal(result.status, "success");
            done6();
        });

    fh.application.installed()
        .always(function(result) {
            assert.equal(result.status, "success");
            done7();
        });
});


QUnit.test("Core Permissions - Settings", function(assert) {
    //Non-admins shouldn't be able to update settings, but can read them

    assert.expect(8);

    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();

    var user = this.userB;

    login(user);

    fh.settings.all()
        .always(function(result) {
            assert.equal(result.status, "success");
            done1();
        });

    fh.settings.get("LogErrors")
        .always(function(result) {
            assert.equal(result.status, "success");
            var val = result.data;
            done2();

            fh.settings.set("LogErrors", val)
                .always(function(result) {
                    result = result.responseJSON;
                    assert.deepEqual(result, {
                        status: "fail",
                        message: "You do not have permissions to update settings.  Admin rights are required.",
                    });
                    done3();
                });
            fh.settings.default("LogErrors")
                .fail(function(result) {
                    result = result.responseJSON;
                    assert.deepEqual(result, {
                        status: "fail",
                        message: "You do not have permissions to update settings.  Admin rights are required.",
                    });
                    done4();
                })
                .done(function(result) {
                    fh.settings.set("LogErrors", val)
                        .always(function(result) {
                            done4();
                        });

                });
        });
});


QUnit.test("Core Permissions - User", function(assert) {
    //Non-admins shouldn't be able to add new users, or make users admins

    assert.expect(15);

    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();
    var done5 = assert.async();
    var done6 = assert.async();
    var done7 = assert.async();
    var done8 = assert.async();
    var done9 = assert.async();
    var done10 = assert.async();
    var done11 = assert.async();


    login(this.userB);

    fh.user.all()
        .always(function(result) {
            assert.equal(result.status, "success");
            done1();
        });

    fh.user.get(this.userB.user)
        .always(function(result) {
            assert.equal(result.status, "success");
            done2();
        });

    fh.user.new({
            name: "invaliduser"
        })
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permissions to post a new user",
            });
            done3();
        });

    //update other user
    fh.user.update(this.userA)
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permissions to update this user.",
                data: this.userA,
            });
            done4();
        }.bind(this));

    //update self
    fh.user.update(this.userB)
        .always(function(result) {
            assert.equal(result.status, "success");
            done5();
        });

    fh.user.makeAdmin(this.userB.user)
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "Invalid permissions.  Admin is required to make a new admin user.",
                data: {
                    "admin": true,
                    "user": this.userB.user,
                },
            });
            done6();
        }.bind(this));

    //removeAdmin: 

    fh.user.delete(this.userA.user)
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permissions to delete this user.",
                data: {
                    user: this.userA.user,
                },
            });
            done8();
        }.bind(this));


    //login as admin
    login(this.userA);

    fh.user.makeAdmin(this.userB.user)
        .always(function(result) {
            assert.equal(result.status, "success");
            done10();
        });


    //admin - remove admin of other user
    var data = {
        user: this.userB.user,
        admin: false
    };
    fh.user.update(data)
        .always(function(result) {
            result = result.responseJSON;
            assert.deepEqual(result, {
                status: "fail",
                message: "You do not have permissions to remove admin rights.",
                data: data,
            });
            done11();
        });


    login(this.userB);
    fh.user.removeAdmin()
        .always(function(result) {
            assert.equal(result.status, "success");
            done7();
        }.bind(this));


    //non-admin delete self
    fh.user.delete(this.userB.user)
        .always(function(result) {
            assert.equal(result.status, "success");
            done9();
        }.bind(this));

});

QUnit.test("Core Permissions - Log", function(assert) {
    //Non-admins shouldn't be able to view the log

    assert.expect(6);

    var done = assert.async();


    login(this.userB);

    fh.logs()
        .always(function(result) {
            result = result.responseJSON;
            assert.equal(result.status, "fail");
            assert.equal(result.message, "Resource not found");
            done();
        });
});



function prepFileTests(assert, permissions) {
    this.user = {
        user: "quinitTestUser",
        password: "qunitTestPassword",
        name: "QUnit Test User",
    };

    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();

    //Create test user 
    fh.user.new(this.user)
        .always(function(result) {
            assert.equal(result.status, "success", result.message);
            done1();
            //Create testing folder
            this.folder = "/v1/file/qunitTestingFolder";
            this.childFolder = "/v1/file/qunitTestingFolder/child";

            permissions.owner = this.user.user;
            fh.file.newFolder(this.folder)
                .always(function(result) {
                    assert.equal(result.status, "success", result.message);
                    fh.properties.set(this.folder, {
                            permissions: permissions,
                        })
                        .always(function(result) {
                            assert.equal(result.status, "success", result.message);
                            done3();
                            login(this.user);
                            fh.file.newFolder(this.childFolder)
                                .always(function(result) {
                                    done4();
                                });
                        }.bind(this));
                }.bind(this));
        }.bind(this));

    this.friend = {
        user: "quinitTestUserFriend",
        password: "qunitTestPassword",
        name: "QUnit Test User B"
    };

    //Create test user friend
    fh.user.new(this.friend)
        .always(function(result) {
            assert.equal(result.status, "success", result.message);
            done2();
        });

}



QUnit.module("Private File Permissions", {
    beforeEach: function(assert) {
        prepFileTests.call(this, assert, {
            private: "rw",
            friend: "",
            public: "",
        });
    },
    afterEach: function(assert) {
        var done1 = assert.async();
        var done2 = assert.async();


        fh.file.delete(this.folder);

        //delete test users
        fh.user.delete(this.user.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done1();
            });
        fh.user.delete(this.friend.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done2();
            });
    }
});


QUnit.test("Read Private Folder Properties", function(assert) {
    var expect = 6;

    //Folder Read
    login(this.user);
    expect += readFolder(assert, this.folder, {
        status: "success",
        data: {
            permissions: {
                owner: this.user.user,
                private: "rw",
            }
        }
    });

    login(this.friend);
    expect += readFolder(assert, this.folder, {
        status: "fail"
    });

    assert.expect(expect);
});


QUnit.test("List Private Folder Contents", function(assert) {
    var expect = 6;

    //Folder Read Contents
    //A created a folder, can friend read it in the contents?
    login(this.friend);
    expect += readFolder(assert, this.folder + "/", {
        status: "fail"
    });

    login(this.user);
    expect += readFolder(assert, this.folder + "/", {
        status: "success",
        data: [{
            url: this.childFolder + "/"
        }, ]
    });


    assert.expect(expect);
});

QUnit.test("Write Private Folder Contents", function(assert) {
    var expect = 6;

    var createFolder = fh.util.urlJoin(this.folder, "userfolder");
    //Folder Write
    //	new
    login(this.friend);
    expect += newFolder(assert, createFolder, "fail");

    login(this.user);
    expect += newFolder(assert, createFolder, "success");

    assert.expect(expect);
});


QUnit.module("Friend Read File Permissions", {
    beforeEach: function(assert) {
        prepFileTests.call(this, assert, {
            private: "rw",
            friend: "r",
            public: "",
        });
    },
    afterEach: function(assert) {
        var done1 = assert.async();
        var done2 = assert.async();


        fh.file.delete(this.folder);

        //delete test users
        fh.user.delete(this.user.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done1();
            });
        fh.user.delete(this.friend.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done2();
            });
    }
});


QUnit.test("Read Folder Properties", function(assert) {
    var expect = 6;

    //Folder Read
    login(this.user);
    expect += readFolder(assert, this.folder, {
        status: "success",
        data: {
            permissions: {
                owner: this.user.user,
                private: "rw",
                friend: "r",
            }
        }
    });

    login(this.friend);
    expect += readFolder(assert, this.folder, {
        status: "success",
        data: {
            permissions: {
                owner: this.user.user,
                private: "rw",
                friend: "r",
            }
        }
    });
    assert.expect(expect);
});


QUnit.test("List Folder Contents", function(assert) {
    var expect = 6;

    //Folder Read Contents
    //A created a folder, can friend read it in the contents?
    login(this.friend);
    expect += readFolder(assert, this.folder + "/", {
        status: "success",
        data: [{
            url: this.childFolder + "/"
        }, ]
    });


    login(this.user);
    expect += readFolder(assert, this.folder + "/", {
        status: "success",
        data: [{
            url: this.childFolder + "/"
        }, ]
    });


    assert.expect(expect);
});

QUnit.test("Write Folder Contents", function(assert) {
    var expect = 6;

    var createFolder = fh.util.urlJoin(this.folder, "userfolder");
    //Folder Write
    //	new
    login(this.friend);
    expect += newFolder(assert, createFolder, "fail");

    login(this.user);
    expect += newFolder(assert, createFolder, "success");

    assert.expect(expect);
});


QUnit.module("Friend Write File Permissions", {
    beforeEach: function(assert) {
        prepFileTests.call(this, assert, {
            private: "rw",
            friend: "rw",
            public: "",
        });
    },
    afterEach: function(assert) {
        var done1 = assert.async();
        var done2 = assert.async();


        fh.file.delete(this.folder);

        //delete test users
        fh.user.delete(this.user.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done1();
            });
        fh.user.delete(this.friend.user)
            .always(function(result) {
                assert.equal(result.status, "success", result.message);
                done2();
            });
    }
});


QUnit.test("Read Folder Properties", function(assert) {
    var expect = 6;

    //Folder Read
    login(this.user);
    expect += readFolder(assert, this.folder, {
        status: "success",
        data: {
            permissions: {
                owner: this.user.user,
                private: "rw",
                friend: "rw",
            }
        }
    });

    login(this.friend);
    expect += readFolder(assert, this.folder, {
        status: "success",
        data: {
            permissions: {
                owner: this.user.user,
                private: "rw",
                friend: "rw",
            }
        }
    });
    assert.expect(expect);
});


QUnit.test("List Folder Contents", function(assert) {
    var expect = 6;

    //Folder Read Contents
    //A created a folder, can friend read it in the contents?
    login(this.friend);
    expect += readFolder(assert, this.folder + "/", {
        status: "success",
        data: [{
            url: this.childFolder + "/"
        }, ]
    });


    login(this.user);
    expect += readFolder(assert, this.folder + "/", {
        status: "success",
        data: [{
            url: this.childFolder + "/"
        }, ]
    });


    assert.expect(expect);
});

QUnit.test("Write Folder Contents", function(assert) {
    var expect = 6;

    var createFolder = fh.util.urlJoin(this.folder, "userfolder");
    //Folder Write
    //	new
    login(this.friend);
    expect += newFolder(assert, createFolder, "success");

    assert.expect(expect);
});

QUnit.test("Root Move Folder Permissions", function(assert) {
    var expect = 6;

    var rename = this.folder + "_rename";

    login(this.user);
    expect += moveFolder(assert, this.folder, rename, "fail");

    expect += moveFolder(assert, this.folder, rename, "success");


    assert.expect(expect);
});

QUnit.test("Root Delete Folder Permissions", function(assert) {
    var expect = 6;

    login(this.user);
    expect += deleteFolder(assert, this.folder, "fail");

    expect += deleteFolder(assert, this.folder, "success");


    assert.expect(expect);
});
