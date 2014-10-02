$(document).ready(function() {
	var urlDS = urlParam("file") || urlParam("ds");
	var ds;

	if (urlDS) {
     ds = new fh.Datastore(usrSettingsDS);
	}

    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        data: {}
    });





    function urlParm(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

}); //end ready
