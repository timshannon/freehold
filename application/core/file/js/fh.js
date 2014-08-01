window.fh = (function() {
'use strict';
var _auth;
var versions = ["v1"];

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
			url: "/v1/auth/",
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
	uuid: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	file: {
		upload: function(fileurl, formData) {
			//very simple file upload, feel free to write you own or use a plugin
			//  with progress handling, polyfills, etc
			// just be sure to include the X-CSRFToken header:
			//   xhr.setRequestHeader ("X-CSRFToken", fh.auth().CSRFToken);
			return stdAjax("POST", fileurl, {
				data: formData,
				cache: false,
				processData: false,
				contentType: false
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
			return stdAjax("GET", "/v1/application/",{
				data: JSON.stringify({id: appid}),
			});
		},
		available: function() {
			return stdAjax("GET", "/v1/application/available/");
		},
		postAvailable: function(filename) {
			return stdAjax("POST","/v1/application/available/", 
				{data: JSON.stringify({file: filename})});
		},
		installed: function() {
			return stdAjax("GET","/v1/application/");
		},
		install: function(filename) {
			return stdAjax("POST","/v1/application/",{
				data: JSON.stringify({file: filename})});
		},
		upgrade: function(filename) {
			return stdAjax("PUT","/v1/application/", {
				data: JSON.stringify({file: filename})});

		},
		uninstall: function(appid) {
			return stdAjax("DELETE","/v1/application/", {
				data: JSON.stringify({id: appid})});
		}
		
	}, //application
	settings: {
		all: function() {
			return stdAjax("GET", "/v1/settings/");
		},
		get: function(setting) {
			return stdAjax("GET", "/v1/settings/", {
				data: JSON.stringify({setting: setting})
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
				data: JSON.stringify({setting: setting})
			});
		}
	},
	user: {
		all: function() {
			return stdAjax("GET", "/v1/auth/user/");
		},
		get: function(username) {
			return stdAjax("GET", "/v1/auth/user/", {
				data: JSON.stringify({user: username})
			});
		},
		new: function(userObject) {
			return stdAjax("POST", "/v1/auth/user/", {
				data: JSON.stringify(userObject)
			});
		},
		update: function(userObject) { //Current user
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
		relinquishAdmin: function() { //current user 
			return stdAjax("PUT", "/v1/auth/user/", {
				data: JSON.stringify({
					admin: false,
				})
			});

		},
		delete: function(username) {
			return stdAjax("DELETE", "/v1/auth/user/", {
				data: JSON.stringify({user: username})
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
				beforeSend: function (xhr) {
					xhr.setRequestHeader ("Authorization", "Basic "+btoa(username+":"+password));
				},
				data: JSON.stringify(expData),
			});
		},
		logout: function() {
			return stdAjax("DELETE", "/v1/auth/session/");
		},
	},
	token: {
		all: function() {
			return stdAjax("GET", "/v1/auth/token/");
		},
		get: function(token) {
			return stdAjax("GET", "/v1/auth/token/", {
				data: JSON.stringify({token: token}),
			});
		},
		new: function(tokenObject) { //{name:"", resource: "", expires: "", permission: ""}
			return stdAjax("POST", "/v1/auth/token/", {
				data: JSON.stringify(tokenObject),
			});
		},
		update: function(tokenObject) {
			return stdAjax("PUT", "/v1/auth/token/", {
				data: JSON.stringify(tokenObject),
			});
		},
		delete: function(token) {
			return stdAjax("GET", "/v1/auth/token/", {
				data: JSON.stringify({token: token}),
			});
		},
	},
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

function propPath(fileurl) {
	var split = fileurl.split("/");

	if (split[0] === "") {
	  split = split.slice(1);  
	}

	var slc1, slc2;

	if (versions.indexOf(split[0]) != -1) {
	   slc1 = split.slice(0,1);
	   slc2 = split.slice(1);
	} else {
	  slc1 = split.slice(0, 2);
	  slc2 = split.slice(2);
	}

	var prop = slc1.concat("properties",slc2);
	return "/"+prop.join("/");
}

}()); //end




