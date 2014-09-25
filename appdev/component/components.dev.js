//Freehold ractive components 
// for things like modals, navbar, etc

fh.components = {};
//TODO: Just register than with Ractive global

require(['rvc!modal'], function(Modal) {
    fh.components.modal = Modal;
});

require(['rvc!navbar'], function(Navbar) {
    console.log("navbar");
    fh.components.navbar = Navbar;
});

//TODO: filetree
//TODO: permissions
