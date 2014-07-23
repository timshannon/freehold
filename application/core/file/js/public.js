$(document).ready(function() { 

$("#loginButton").click(function() {
		clearErr();
		$("#loginModal").modal();			
});



$( "#login" ).submit(function( event ) {
	clearErr();
	event.preventDefault();
	var data = {};

	if ($("#rememberMe").prop("checked")) {
		var today = new Date(Date.now());
		today.setDate(today.getDate() + 15); 	
			data = today;
	}
	if ($("#username").val() === "") { 
		err("Username is required");
		return;
	}

	fh.login($("#username").val(),$("#password").val(),data)
	.done(function(result) {
		location.reload();
	})
	.fail(function(result) {
		err(result.data.message);
	});
});

});

function err(msg) {
	$("#err").removeClass("hidden").text(msg);
}

function clearErr() {
	$("#err").addClass("hidden").text("");
}
