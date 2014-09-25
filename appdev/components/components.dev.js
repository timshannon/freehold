//Freehold ractive components 
// for things like modals, navbar, etc

//FIXME: ForceSync?  Everyone else seems to wrap start and end fragments
// this seems to work fine for now

require.config({
    paths: {
        ractive: "../../application/core/file/js/ractive.min",
		rvc: "./rvc"
    }
});


require(['rvc!modal'], function(Modal) {
    Ractive.components.modal = Modal;
}, null, true);



require(['rvc!navbar'], function(Navbar) {
    Ractive.components.navbar = Navbar;
}, null, true);



//TODO: filetree
//TODO: permissions
