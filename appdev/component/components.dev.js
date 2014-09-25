//Freehold ractive components 
// for things like modals, navbar, etc
//

//TODO: Just register than with Ractive global

require(['rvc!modal'], function(Modal) {
    Ractive.components.modal = Modal;
});

require(['rvc!navbar'], function(Navbar) {
    console.log("navbar");
    Ractive.components.navbar = Navbar;
});



//TODO: filetree
//TODO: permissions
