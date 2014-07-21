$(document).ready(function() { 
	$("#logoutButton").click(function() {
		fh.logout();
		window.location = "/";
	});

}); //end ready
