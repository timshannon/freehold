QUnit.module("Permissions", {
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

        //Reset logins
        $.ajaxPrefilter(function(options) {
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", fh.auth.CSRFToken);
            };
        });

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

function login(user) {
    $.ajaxPrefilter(function(options) {
        options.beforeSend = function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(user.user + ":" + user.password));
        };
    });
}

QUnit.test("Root Permissions", function(assert) {
    assert.expect(6);

    var doneA = assert.async();
    var doneB = assert.async();

    var a = this.userA;
    var b = this.userB;
    //Admins should be able to write to the root file dir
    // regular users should not

    login(a);

    fh.file.newFolder("/v1/file/qunitTestingFolderA")
        .done(function(result) {
            assert.equal(result.status, "success", "User A Folder Created at root");

            login(a);
            fh.file.delete("/v1/file/qunitTestingFolderA")
                .always(function(result) {
                    console.log(result);
                    doneA();
                });
        })
        .fail(function(result) {
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
