$(document).ready(function() { 
	$("#logoutButton").click(function() {
		fh.logout();
		window.location = "/";
	});
	
	var installed = new Ractive({
		el: "#installed",
		template: "#appGrid"
	});

	var available = new Ractive({
		el: "#available",
		template: "#appGrid"
	});


	fh.application.installed()
	.always(function(result) {installed.set(result);});

	fh.application.available()
	.always(function(result) {available.set(result);});


	//TODO: figure out which available apps are already installed
	// check version numbers to see if they are upgrades
	

}); //end ready

