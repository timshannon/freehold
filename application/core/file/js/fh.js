window.fh = (function() {
'use strict';
var _auth;


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


//init Ractive events and partials

return {
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
	properties: {
		get: function(fileurl) {
			if (fileurl[0] != "/") { fileurl = "/"+fileurl;}

			var root = fileurl.slice(0, fileurl.indexOf("/",1));
			var path = fileurl.slice(fileurl.indexOf("/",1));

			var propPath = root+"/properties"+path;

			return stdAjax("GET", propPath);
		}	

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
		postAvailable: function(filename) {
			return stdAjax("POST","/v1/application/available", 
				{data: JSON.stringify({file: filename})});
		},
		installed: function() {
			return stdAjax("GET","/v1/application");
		},
		install: function(filename) {
			return stdAjax("POST","/v1/application",{
				data: JSON.stringify({file: filename})});
		},
		upgrade: function(filename) {
			return stdAjax("PUT","/v1/application", {
				data: JSON.stringify({file: filename})});

		},
		uninstall: function(appid) {
			return stdAjax("DELETE","/v1/application", {
				data: JSON.stringify({id: appid})});
		}
		
	}, //application
	Ractive: fhRactive(),
};



function fhRactive() {
	//TODO: capture bootstrap events like modal, and alerts
	// partials and components
	if ("Ractive" in window) {
		return Ractive.extend({
		});
	}
	return null;
}

}()); //end




