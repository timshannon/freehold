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