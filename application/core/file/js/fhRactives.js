//Freehold ractive components 
// for things like modals, navbar, etc
(function() {
    Ractive.components.modal = modal();
    Ractive.components.navbar = navbar();

    function modal() {
        modalTemplate = '<div class="modal fade" id="{{id}}" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title">{{title}}</h4>' +
            '</div>' +
            '<div class="modal-body">{{>content}}</div>' +
            '{{^customFooter}}' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '{{/customFooter}}' +
            '{{#customFooter}}' +
            '{{>modalFooter}}' +
            '{{/customFooter}}' +
            '</div>' +
            '</div>' +
            '</div>';

        return Ractive.extend({
            template: modalTemplate,
            data: {
                title: "Modal Title",
                id: "modalId"
            }
        });
    }

    function navbar() {
        navbarTemplate = '<nav class="navbar navbar-default" role="navigation">' +
            '<div class="navbar-header">' +
            '<a class="navbar-brand" href="{{url}}">{{brand}}</a>' +
            '{{#authenticated}}' +
            '<button type="button" id="logoutButton" on-click="logout" class="btn btn-default navbar-btn navbar-right">Log Out</button>' +
            '{{/authenticated}}' +
            '</div>' +
            '</nav>';

        return Ractive.extend({
            template: navbarTemplate,
            data: {
                brand: "freehold",
                url: "/",
                authenticated: (fh.auth().type != "none")
            },
            init: function() {
                this.on("logout", function(event) {
                    fh.session.logout();
                    window.location = "/";
                });
            }
        });
    }
}()); //end
