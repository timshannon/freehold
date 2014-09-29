;(function() {
var rvc, rvc_modal, rvc_navbar;
(function (ractive) {
  rvc = {
    load: function (id) {
      throw new Error('Dynamic load not allowed: ' + id);
    }
  };
  rvc_modal = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              a: {
                'class': 'modal fade',
                id: [{
                    t: 2,
                    r: 'id'
                  }],
                tabindex: '-1',
                role: 'dialog',
                'aria-hidden': 'true'
              },
              f: [{
                  t: 7,
                  e: 'div',
                  a: { 'class': 'modal-dialog' },
                  f: [{
                      t: 7,
                      e: 'div',
                      a: { 'class': 'modal-content' },
                      f: [
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'modal-header' },
                          f: [
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                'class': 'close',
                                'data-dismiss': 'modal'
                              },
                              f: [
                                {
                                  t: 7,
                                  e: 'span',
                                  a: { 'aria-hidden': 'true' },
                                  f: ['&times;']
                                },
                                ' ',
                                {
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'sr-only' },
                                  f: ['Close']
                                }
                              ]
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'h4',
                              a: { 'class': 'modal-title' },
                              f: [{
                                  t: 2,
                                  r: 'title'
                                }]
                            }
                          ]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'modal-body' },
                          f: [{
                              t: 2,
                              r: 'yield'
                            }]
                        },
                        ' ',
                        {
                          t: 4,
                          r: 'customFooter',
                          f: [{
                              t: 7,
                              e: 'div',
                              a: { 'class': 'modal-footer' },
                              f: [{
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': 'btn btn-default',
                                    'data-dismiss': 'modal'
                                  },
                                  f: ['Close']
                                }]
                            }],
                          n: 51
                        }
                      ]
                    }]
                }]
            }]
        }
      }, component = {};
    component.exports = {
      data: {
        title: 'Modal Title',
        id: 'modalId',
        customFooter: false
      }
    };
    if (typeof component.exports === 'object') {
      for (var __prop__ in component.exports) {
        if (component.exports.hasOwnProperty(__prop__)) {
          __options__[__prop__] = component.exports[__prop__];
        }
      }
    }
    return Ractive.extend(__options__);
  }({}, ractive);
  rvc_navbar = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [
            {
              t: 7,
              e: 'nav',
              a: {
                'class': 'navbar navbar-default',
                role: 'navigation'
              },
              f: [
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'navbar-header' },
                  f: [
                    {
                      t: 7,
                      e: 'a',
                      a: {
                        'class': 'navbar-brand',
                        href: '/',
                        title: 'home'
                      },
                      f: [{
                          t: 2,
                          r: 'brand'
                        }]
                    },
                    ' ',
                    {
                      t: 4,
                      r: 'app',
                      f: [{
                          t: 7,
                          e: 'ul',
                          a: { 'class': 'nav navbar-nav' },
                          f: [{
                              t: 7,
                              e: 'li',
                              a: { 'class': 'active' },
                              f: [{
                                  t: 7,
                                  e: 'a',
                                  a: { href: '#' },
                                  v: { click: 'refresh' },
                                  f: [{
                                      t: 2,
                                      r: 'app'
                                    }]
                                }]
                            }]
                        }]
                    },
                    ' ',
                    {
                      t: 4,
                      r: 'help',
                      f: [{
                          t: 7,
                          e: 'ul',
                          a: { 'class': 'nav navbar-nav' },
                          f: [{
                              t: 7,
                              e: 'li',
                              f: [{
                                  t: 7,
                                  e: 'a',
                                  a: {
                                    href: '#',
                                    id: 'navHelp',
                                    tabindex: '0',
                                    title: [{
                                        t: 2,
                                        r: 'title'
                                      }],
                                    'data-content': [{
                                        t: 2,
                                        r: 'text'
                                      }]
                                  },
                                  v: { click: 'help' },
                                  f: [{
                                      t: 7,
                                      e: 'span',
                                      a: { 'class': 'glyphicon glyphicon-question-sign' }
                                    }]
                                }]
                            }]
                        }]
                    }
                  ]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'container-fluid' },
                  f: [
                    {
                      t: 4,
                      r: 'authenticated',
                      f: [{
                          t: 7,
                          e: 'div',
                          a: { 'class': 'btn-group navbar-right' },
                          f: [
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                id: 'userButton',
                                'class': 'btn btn-default navbar-btn',
                                title: 'User Info'
                              },
                              v: { click: 'openUser' },
                              f: [{
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'glyphicon glyphicon-user' }
                                }]
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                id: 'logoutButton',
                                'class': 'btn btn-default navbar-btn'
                              },
                              v: { click: 'logout' },
                              f: ['Log Out']
                            }
                          ]
                        }]
                    },
                    ' ',
                    {
                      t: 2,
                      r: 'yield'
                    }
                  ]
                }
              ]
            },
            ' ',
            {
              t: 4,
              r: 'error',
              f: [
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'overlay' }
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: {
                    'class': 'navbar-alert alert alert-danger container',
                    role: 'alert'
                  },
                  f: [
                    {
                      t: 7,
                      e: 'strong',
                      f: [{
                          t: 2,
                          r: 'errorLead'
                        }]
                    },
                    ' ',
                    {
                      t: 3,
                      r: 'error'
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'a',
                      a: { href: '#' },
                      v: { click: 'refresh' },
                      f: [
                        {
                          t: 7,
                          e: 'span',
                          a: { 'class': 'close glyphicon glyphicon-refresh' }
                        },
                        {
                          t: 7,
                          e: 'span',
                          a: { 'class': 'sr-only' },
                          f: ['Refresh']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        css: '.overlay {\nposition: fixed;\nz-index: 10000;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\nopacity: .7;\nbackground: #aaaaaa;\n}\n.navbar-alert {\nposition: absolute;\nz-index: 10500;\nleft: 0;\nright: 0;\nmargin-left: auto;\nmargin-right: auto;\nmin-width: 100px;\nborder-color: #777;\n}\n'
      }, component = {};
    //TODO: Notifications ds
    component.exports = {
      isolated: false,
      data: {
        brand: 'freehold',
        authenticated: fh.auth.type != 'none',
        errorLead: 'An error occurred and you may need to refresh this page: ',
        error: false,
        app: false
      },
      init: function () {
        this.on({
          logout: function (event) {
            var r = this;
            fh.session.logout().done(function () {
              window.location = '/';
            }).fail(function (result) {
              r.set('error', result.message);
            });
          },
          openUser: function (event) {
            window.location = '/home/v1/file/user/';
          },
          refresh: function () {
            window.location.reload();
          },
          help: function () {
            $('#navHelp').popover({
              animation: true,
              placement: 'bottom',
              trigger: 'manual',
              html: true,
              container: 'body'
            });
            $('#navHelp').popover('toggle');
          }
        });
        this.observe('help', function (newValue, oldValue, keypath) {
          if (!newValue) {
            $('#navHelp').popover('destroy');
          }
        });
      }
    };
    if (typeof component.exports === 'object') {
      for (var __prop__ in component.exports) {
        if (component.exports.hasOwnProperty(__prop__)) {
          __options__[__prop__] = component.exports[__prop__];
        }
      }
    }
    return Ractive.extend(__options__);
  }({}, ractive);
  //Freehold ractive components 
  // for things like modals, navbar, etc
  //TODO: filetree
  //TODO: permissions
  (function (Modal) {
    Ractive.components.modal = Modal;
  }(rvc_modal));
  (function (Navbar) {
    Ractive.components.navbar = Navbar;
  }(rvc_navbar));
}(Ractive));
}());