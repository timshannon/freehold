//Freehold ractive components 
// for things like modals, navbar, etc
//
//	TODO: Use https://github.com/ractivejs/component-spec?
//	Thoughts: The whole concatenate everything to cut down on http requests makes a lot of sense
//	for large webservers that need to conserve bandwith.  Freehold isn't built with that in mind
//	It's a personal webserver.  However, using the 1 component = 1 html file with scripts and css
//	all in one file, is a fantastic idea for keeping app code reusable and modular.  But I don't
//	want to tie the core freehold stuff to one build path (i.e. with a bunch of require() all 
//	over, forcing all app development to use requirejs.  I could use ractive-load, but currently
//	it's all multiple async component requests, which result in a stuttering initial load even
//	when the files are loaded from browser cache.
//	The current solution is to hardcode the components with the clumsy multi-line concatenation
//	and global CSS for individual components.  Less than idea, but it keeps the apps snappy,
//	and doesn't force a build / dependency on the core library.
//
//	I could see for larger application it makes a lot of sense to use requirejs, and keep
//	everything silod into one set of html + js + css which includes all dependencies.
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
            '<div class="modal-body">{{yield}}</div>' +
            '{{^customFooter}}' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
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
            '<a class="navbar-brand" href="/" title="home">{{brand}}</a>' +
            '{{#app}}' +
            '<ul class="nav navbar-nav">' +
            '<li class="active"><a href="#" on-click="refresh">{{app}}</a></li>' +
            '</ul>{{/app}}' +
            '</div>' +
            '<div class="container-fluid">' +
            '{{#authenticated}}' +
            '<div class="btn-group navbar-right">' +
            '<button type="button" id="userButton" on-click="openUser" class="btn btn-default navbar-btn" title="User Info">' +
            '<span class="glyphicon glyphicon-user"></span></button>' +
            '<button type="button" id="logoutButton" on-click="logout" class="btn btn-default navbar-btn">Log Out</button>' +
            '</div>' +
            '{{/authenticated}}' +
            '{{yield}}' +
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
                authenticated: (fh.auth.type != "none"),
                errorLead: "An error occurred and you may need to refresh this page: ",
                error: false,
                app: false,
            },
            init: function() {
                this.on({
                    logout: function(event) {
                        var r = this;
                        fh.session.logout()
                            .done(function() {
								window.location = "/";
                            })
                            .fail(function(result) {
                                r.set("error", result.message);
                            });
                    },
                    openUser: function(event) {
                        window.location = "/home/v1/file/user/";
                    },
                    refresh: function() {
                        window.location.reload();
                    }

                });
            }
        });
    }
}()); //end
