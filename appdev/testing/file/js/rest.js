$(document).ready(function() { 

if (fh.auth().type != "none") {
	$(".public").addClass("hidden");
	$(".authenticated").removeClass("hidden");
} else {
	$(".authenticated").addClass("hidden");
	$(".public").removeClass("hidden");
}					


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

	fh.session.login($("#username").val(),$("#password").val(),data)
	.done(function() {
		location.reload();
	})
	.fail(function(result) {
		err(result.data.message);
	});
});

$("#logoutButton").click(function() {
	fh.session.logout()
	.done(function() {
		location.reload();
	})
	.fail(function() {
		alert(JSON.stringify(result));
	});
});


//testing
$( "#resttest" ).submit(function( event ) {
	event.preventDefault();
	stdAjax( $("#method").val(), $("#url").val(), {
		data: $("#request").val()})
		.done(function (result) {
			$("#result").val(JSON.stringify(result));
		})
		.fail(function(result) {
			alert("error: "+JSON.stringify(result));
		});
});
	

}); //end document ready

function err(msg) {
	$("#err").removeClass("hidden").text(msg);
}

function clearErr() {
	$("#err").addClass("hidden").text("");
}

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
