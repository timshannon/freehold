$(document).ready(function() { 
"use strict";
$(".alert").alert();
$("#logoutButton").click(function() {
	fh.session.logout();
	window.location = "/";
});

var modal = new Ractive({
	el: "#modalHook",
	template: "#tAppModal"
});

var installed = new Ractive({
	el: "#installed",
	template: "#tAppGrid"
});

var available = new Ractive({
	el: "#available",
	template: "#tAppGrid"
});


fh.application.installed()
.always(function(result) {
	installed.set(result);
});

fh.application.available()
.always(function(result) {
	result.available = true;
	available.set(result);
});

available.on({
	openModal: function(event) {
		var app = event.context;
		var inApps = installed.data.data;

		app.action = "install";
		if (inApps[app.id]) {
			app.action = "re-install";
			if (app.version != inApps[app.id].version) {
				app.action = "upgrade";
			}
		}
		if (app.id == "home") {
			app.action = null;
		}

		//open modal and set ractive data to the current app
		modal.set(event.context);
		$("#appModal").modal("show");
	}
});

modal.on({
	install: function(event) {
		if ((event.context.action  == "re-install") || 
			(event.context.action == "upgrade")) {
			fh.application.upgrade(event.context.file)
			.done(function(result) {
				location.reload();
			})
			.fail(function(result) {
				event.context.error = result.data;
				modal.set(event.context);
			});
		} else {
			//install
			fh.application.install(event.context.file)
			.done(function(result) {
				location.reload();
			})
			.fail(function(result) {
				event.context.error = result.data;
				modal.set(event.context);
			});
		}
	},
	uninstall: function(event) {
		fh.application.uninstall(event.context.id)
		.done(function(result) {
			location.reload();
		})
		.fail(function(result) {
			event.context.error = result.data;
			modal.set(event.context);

		});

	}
});

}); //end ready




