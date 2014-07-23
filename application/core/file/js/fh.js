window.fh = (function() {
'use strict';
var _auth;
/*function parseResult(result) {*/
/*try {*/
/*return JSON.parse(result);*/
/*} catch (e) {*/
/*console.log("error parsing json: " + result.responseText);*/
/*return {status:"error", message:"Unable to parse response as JSON"};*/
/*}*/
/*}*/

function stdAjax(type, url, options) {
	if (!options) {options = {};}
	if (!options.type) {options.type = type;}
	if (!options.url) {options.url = url;}
	if (!options.dataType) {options.dataType = "json";}

	if ((type.toUpperCase() !== "GET") && (!options.beforeSend)) {
		options.beforeSend = function (xhr) {
			xhr.setRequestHeader ("X-CSRFToken", fh.auth().CSRFToken);
		};
	}

	return $.ajax(options)
		.then(function(data) {return data;},
		function(data) {return data.responseJSON;});
}

return {
	alert: function(target, message) {
		$(target).append('<div class="alert alert-danger fade in alert-dismissable">' +
		 '<button type="button" class="close" data-dismiss="alert" ' +
		 'aria-hidden="true">&times;</button>' + message + '</div>');
	},
	auth: function() {
		if (_auth) {
			return _auth;
		}
		$.ajax({
			type: "GET",
			url: "/v1/auth",
			dataType: "json",
			async: false,
			complete: function (xhr) {
				var result = JSON.parse(xhr.responseText);
				_auth = result.data;
				_auth.CSRFToken = xhr.getResponseHeader("X-CSRFToken");
			},
		});
		return _auth;
	},
	login: function(username, password, expires) {
		var expData, result;
		if (expires) {
			expData = {
				expires: expires
			};
		}
		return stdAjax("POST", "/v1/auth/session", {
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic "+btoa(username+":"+password));
			},
			data: JSON.stringify(expData),
		});
	},
	logout: function() {
		return stdAjax("DELETE", "/v1/auth/session");
	},
	uuid: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	application: {
		get: function(appid) {
			return stdAjax("GET", "/v1/application",{
				data: JSON.stringify({id: appid}),
			});
		},
		available: function() {
			return stdAjax("GET", "/v1/application/available");
		},
		postAvailable: function(file) {
			return stdAjax("POST","/v1/application/available", 
				{data: JSON.stringify({file: file})});
		},
		installed: function() {
			return stdAjax("GET","/v1/application");
		},
		install: function(file) {
			stdAjax("POST","/v1/application",{
				data: JSON.stringify({file: file})});
		},
		upgrade: function(file) {
			return stdAjax("PUT","/v1/application", {
				data: JSON.stringify({file: file})});

		},
		delete: function(appid) {
			return stdAjax("DELETE","/v1/application", {
				data: JSON.stringify({id: appid})});
		}
		
	}, //application
	template: {
		//ractive templates for standard freehold UI components
		// like file browser, user lists, etc
	},
};

}()); //end

