//Freehold ractive components 
// for things like modals, navbar, etc
(function() {
    fh.components = {
        modal: modal(),
        navbar: navbar()
    };

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
                id: "modalId",
                customFooter: false
            }
        });
    }

    function navbar() {
        navbarTemplate = '<nav class="navbar navbar-default" role="navigation">' +
            '<div class="navbar-header">' +
            '<a class="navbar-brand" href="{{homeUrl}}">{{brand}}</a>' +
            '{{#authenticated}}' +
            '<button type="button" id="logoutButton" on-click="logout" class="btn btn-default navbar-btn navbar-right">Log Out</button>' +
            '{{/authenticated}}' +
            '{{>content}}' +
            '</div>' +
            '</nav>' +
            '{{#error}}' +
            '<div class="overlay"></div>' +
            '<div class="navbar-alert alert alert-danger container" role="alert">' +
            '<strong>{{errorLead}}</strong> ' +
            '{{{error}}}' +
            '<a href="#" on-click="refresh">' +
            '<span class="close glyphicon glyphicon-refresh"></span><span class="sr-only">Refresh</span></a>' +
            '</div>' +
            '{{/error}}';

        //TODO: Notifications ds
        return Ractive.extend({
            template: navbarTemplate,
            isolated: false,
            data: {
                brand: "freehold",
                homeUrl: "/",
                authenticated: (fh.auth.type != "none"),
                errorLead: "An error occurred and you may need to refresh this page: ",
                error: false
            },
            init: function() {
                this.on({
                    logout: function(event) {
                        fh.session.logout()
                            .done(function() {
                                window.location = "/";
                            })
                            .fail(function(result) {
                                this.set("error", result.message);
                            });
                    },
                    refresh: function() {
                        window.location.reload();
                    }

                });
            }
        });
    }
}()); //end
