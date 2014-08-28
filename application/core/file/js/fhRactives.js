//Freehold ractive components 
// for things like modals, navbar, etc
window.FhRactive = (function() {
    'use strict';

    return Ractive.extend({
        component: {
            modal: modal()
        }
    });


    function modal() {
        modalTemplate = '<div class="modal fade" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title">{{title}}</h4>' +
            '</div>' +
            '<div class="modal-body">{{>content}}</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '{{#buttons}}' +
            '<button type="button" on-click="{{on-click}}"class="btn btn-primary">{{name}}</button>' +
            '{{/buttons}}' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return Ractive.extend({
            template: modalTemplate,
            data: {
                id: "myModal",
                title: "Modal Title",
				buttons: {}
            }
        });
    }
}()); //end
