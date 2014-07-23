$(document).ready(function() { 

$("#logoutButton").click(function() {
	fh.logout();
	window.location = "/";
});

var available = new Ractive({
	template: "#appModal"
});

var installed = new Ractive({
	el: "#installed",
	template: "#appGrid"
});

var modal = new Ractive({
	el: "#available",
	template: "#appGrid"
});


fh.application.installed()
.always(function(result) {
	installed.set(result);
});

fh.application.available()
.always(function(result) {
	result.modal = true;
	available.set(result);
});

//TODO: figure out which available apps are already installed
// check version numbers to see if they are upgrades

available.on({
	openModal: function(event) {
		//open modal and set ractive data to the current app
		console.log(event);
	}
});

}); //end ready




