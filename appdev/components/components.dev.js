// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.
//
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

require(['rvc!tree'], function(Tree) {
    Ractive.components.tree = Tree;
});

require(['rvc!filetree'], function(Filetree) {
    Ractive.components.filetree = Filetree;
});

require(['rvc!jsonviewer'], function(JsonViewer) {
    Ractive.components.jsonviewer = JsonViewer;
});

require(["rvc!datepicker", "./lib/jquery-ui/datepicker"], function(DatePicker, $) {
    Ractive.components.datepicker = DatePicker;
});
