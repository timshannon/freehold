window.fh = (function() {
'use strict';
var auth;

	

return {
	alert: function(target, result) {
		$(target).append('<div class="alert alert-danger fade in alert-dismissable">\
		 <button type="button" class="close" data-dismiss="alert" \
		 aria-hidden="true">&times;</button>' + result + '</div>');
	},
	auth: function() {
		if (auth != null) {
			return auth
		}
		$.ajax({
			type: "GET",
			url: "/v1/auth",
			dataType: "json",
			async: false,
			complete: function (xhr) {
				var result = JSON.parse(xhr.responseText);
				auth = result.data
				auth.CSRFToken = xhr.getResponseHeader("X-CSRFToken");
			},
		});

		return auth;
	},
	login: function(username, password, expires) {
		var expData, result;
		if (expires != null) {
			expData = {
				expires: expires
			}
		}
		$.ajax({
			type: "POST",
			url: "/v1/auth/session",
			async: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic "+btoa(username+":"+password));
			},
			dataType: "json",
			data: JSON.stringify(expData),
			complete: function (xhr) {
				result = JSON.parse(xhr.responseText);
				console.log(result);
			},
		});
		return result;
	},
	logout: function() {
		var result;
		$.ajax({
			type: "DELETE",
			url: "/v1/auth/session",
			dataType: "json",
			async: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("X-CSRFToken", fh.auth().CSRFToken);
			},
			complete: function (xhr) {
				result = JSON.parse(xhr.responseText);
			},
		});
		return result;
	},
	uuid: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	application: {
		get: function(appid) {

		},
		available: function() {

		},
		installed: function() {

		},
		install: function(file) {

		},
		upgrade: function(file) {

		},
		delete: function(appid) {

		}
		
	} //application
}
}());

