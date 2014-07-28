QUnit.asyncTest("Properties", function(assert) {
	expect(1);
	var valid = {
		status:"success",
		data: ""
	};

	fh.properties.get("/testing/v1/properties/file/data/testfile.txt")
	.always(function(result) {
		assert.deepEqual(result, valid);
		QUnit.start();
	});
});
