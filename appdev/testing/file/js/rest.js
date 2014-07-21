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

	var result = fh.login($("#username").val(),$("#password").val(),data);
	if (result.status == "success") {
		location.reload();
	} else {
		err(result.data.message);
	}
});

$("#logoutButton").click(function() {
	var result = fh.logout();
	if (result.status == "success") {
		location.reload();
	} else {
		alert(JSON.stringify(result));
	}
});


//testing
$( "#resttest" ).submit(function( event ) {
	event.preventDefault();
	$.ajax({
			type: $("#method").val(),
			url: $("#url").val(),
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("X-CSRFToken", fh.auth().CSRFToken);
			},
			dataType: "json",
			data: $("#request").val(),
			complete: function (xhr) {
				$("#result").val(xhr.responseText);
			},
	});


});
	

}); //end document ready

function err(msg) {
	$("#err").removeClass("hidden").text(msg);
}

function clearErr() {
	$("#err").addClass("hidden").text("");
}

