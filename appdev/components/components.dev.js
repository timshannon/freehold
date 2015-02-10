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

require(['rvc!fileinput'], function(FileInput) {
    Ractive.components.fileinput = FileInput;
});

require(['rvc!dropzone'], function(DropZone) {
    Ractive.components.dropzone = DropZone;
});

require(['rvc!draggable', './lib/jquery-ui/draggable'], function(Draggable, $) {
    Ractive.components.draggable = Draggable;
});

require(['rvc!droppable', './lib/jquery-ui/droppable'], function(Droppable, $) {
    Ractive.components.droppable = Droppable;
});

require(['rvc!selectable', './lib/jquery-ui/selectable'], function(Selectable, $) {
    Ractive.components.selectable = Selectable;
});

require(['rvc!filebrowse'], function(FileBrowse) {
    Ractive.components.filebrowse = FileBrowse;
});

//Transitions
require(["./lib/transitions/ractive-transitions-slide"]);
require(["./lib/transitions/Ractive-transitions-scale"]);
require(["./lib/transitions/ractive-transitions-fly"]);
require(["./lib/transitions/ractive-transitions-fade"]);
require(["./lib/transitions/Ractive-transitions-typewriter"]);
