//Freehold ractive components 
// for things like modals, navbar, file browser, etc

require(['rvc!modal'], function(Modal) {
    Ractive.components.modal = Modal;
});


require(['rvc!navbar'], function(Navbar) {
    Ractive.components.navbar = Navbar;
});

require(['rvc!permissions'], function(Permissions) {
    Ractive.components.permissions = Permissions;
});

require(['rvc!filetree'], function(Filetree) {
    Ractive.components.filetree = Filetree;
});



require(["rvc!datepicker", "./lib/jquery-ui/datepicker"], function(DatePicker, $) {
    Ractive.components.datepicker = DatePicker;
});
