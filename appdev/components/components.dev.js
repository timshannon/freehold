//Freehold ractive components 
// for things like modals, navbar, etc
//TODO: filetree
//TODO: permissions

require(['rvc!modal'], function(Modal) {
    Ractive.components.modal = Modal;
});


require(['rvc!navbar'], function(Navbar) {
    Ractive.components.navbar = Navbar;
});

require(['rvc!permissions'], function(Permissions) {
    Ractive.components.permissions = Permissions;
});


require(["rvc!datepicker", "./lib/jquery-ui/datepicker"], function(DatePicker, $) {
    Ractive.components.datepicker = DatePicker;
});
