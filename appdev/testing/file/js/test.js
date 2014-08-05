QUnit.module("files", {
	setup: function(assert) {
		QUnit.stop();
		//upload testing file
		var form = new FormData();
		form.append("testfile.xml", 
			new Blob(['<test id="1"><inner id="2"></inner></test>'], 
			{type: "text/xml"}), "testfile.xml");

		//upload file
		fh.file.upload("/testing/v1/file/testdata/", form)
		.always(function(result) {
			assert.deepEqual(result, {
				status: "success",
				data: [
					{
						name: "testfile.xml",
						url: "/testing/v1/file/testdata/testfile.xml"
					}
				]
			});
			QUnit.start();
		});

	},
	teardown: function(assert) {
		QUnit.stop();
		//delete file
		fh.file.delete("/testing/v1/file/testdata/testfile.xml")
		.always(function(result) {
			assert.deepEqual(result,  {
				status: "success",
				data: 
				{
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
		new Blob(['<test id="1">New data<inner id="2"></inner></test>'], 
		{type: "text/xml"}), "testfile.xml");

	//update file
	fh.file.update("/testing/v1/file/testdata/", form)
	.always(function(result) {
		assert.deepEqual(result, {
			status: "success",
			data: [
				{
					name: "testfile.xml",
					url: "/testing/v1/file/testdata/testfile.xml"
				}
			]
		});
		QUnit.start();
	});
});

QUnit.asyncTest("Set Permissions", function(assert) {
	expect(3);

	var newPrm = {
		permissions: {
			owner: fh.auth().user,
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
		assert.deepEqual(result, {
			"data": {
				"name": "testfile.xml",
				permissions: {
					owner: fh.auth().user,
					private: "rw",
				},
				"size": 42,
				"url": "/testing/v1/file/testdata/testfile.xml"
			},
			"status": "success"
		});
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
		dataType:  "json",
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic "+btoa("quinitTestUser:qunitTestPassword"));
		},
		data: JSON.stringify({name: "Bob QUnit Test User"})
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

	fh.token.new({name: "test token"})
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
			assert.deepEqual(result,  {
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
QUnit.asyncTest("Get and put Data in datastore", function(assert) {
	expect(4);

	var data = {};
	for (var i = 0; i <= 100; i++) {
		data[i] = fh.uuid();
	}

	var testVal = data[10];

	var ds = new fh.Datastore("/testing/v1/datastore/testdata/test.ds");
	ds.put(data)
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
		});

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

	ds.put(data)
	.always(function(result) {
		assert.ok(
			(result.status == "success")
		);
		ds.iter({
			from: 10,
			to: 50,
			skip: 10,
			limit: 5
		})
		.always(function(result) {
			assert.ok(
				(result.status == "success") &&
				(Object.keys(result.data).length == 5)
			);
		});

		QUnit.start();
	});

});
