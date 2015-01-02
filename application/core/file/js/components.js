;(function() {
var rvc, rvc_modal, rvc_navbar, rvc_permissions, rvc_droppable, rvc_draggable, rvc_tree, rvc_filetree, rvc_jsonviewer, rvc_jquery_ui, rvc_datepicker, lib_jquery_ui_core, lib_jquery_ui_datepicker, rvc_fileinput, rvc_dropzone, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable, lib_jquery_ui_droppable, rvc_selectable, lib_jquery_ui_selectable;
(function (ractive, jquery) {
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
  rvc_navbar = function (require, Ractive, _import_0) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              f: [
                {
                  t: 7,
                  e: 'nav',
                  a: {
                    'class': 'navbar navbar-default navbar-static-top',
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
                                      o: 'help',
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
                                    'class': 'btn btn-default btn-primary navbar-btn',
                                    title: [
                                      'User Info for ',
                                      {
                                        t: 2,
                                        r: 'user.name'
                                      }
                                    ]
                                  },
                                  v: { click: 'openUser' },
                                  f: [
                                    {
                                      t: 7,
                                      e: 'span',
                                      a: { 'class': 'glyphicon glyphicon-user' }
                                    },
                                    ' ',
                                    {
                                      t: 2,
                                      x: {
                                        r: ['user.name'],
                                        s: '_0.split(" ")[0]'
                                      }
                                    }
                                  ]
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
                          t: 4,
                          r: 'authenticated',
                          f: [{
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                id: 'loginButton',
                                'class': 'btn btn-default navbar-btn navbar-right'
                              },
                              v: { click: 'loginModal' },
                              f: ['Log in']
                            }],
                          n: 51
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
                  t: 7,
                  e: 'modal',
                  a: {
                    id: 'loginModal',
                    title: 'Log in'
                  },
                  f: [{
                      t: 7,
                      e: 'form',
                      f: [
                        {
                          t: 4,
                          r: 'loginErr',
                          f: [{
                              t: 7,
                              e: 'span',
                              a: {
                                id: 'err',
                                'class': 'label label-danger'
                              },
                              f: [{
                                  t: 2,
                                  r: 'loginErr'
                                }]
                            }]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'form-group' },
                          f: [
                            {
                              t: 7,
                              e: 'label',
                              a: {
                                'class': 'sr-only',
                                'for': 'username'
                              },
                              f: ['Username']
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'input',
                              a: {
                                'class': 'form-control',
                                id: 'username',
                                name: 'username',
                                placeholder: 'Enter username',
                                value: [{
                                    t: 2,
                                    r: 'username'
                                  }]
                              }
                            }
                          ]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'form-group' },
                          f: [
                            {
                              t: 7,
                              e: 'label',
                              a: {
                                'class': 'sr-only',
                                'for': 'password'
                              },
                              f: ['Password']
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'input',
                              a: {
                                type: 'password',
                                'class': 'form-control',
                                id: 'password',
                                name: 'password',
                                placeholder: 'Password',
                                value: [{
                                    t: 2,
                                    r: 'password'
                                  }]
                              }
                            }
                          ]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'checkbox' },
                          f: [{
                              t: 7,
                              e: 'label',
                              f: [
                                {
                                  t: 7,
                                  e: 'input',
                                  a: {
                                    type: 'checkbox',
                                    id: 'rememberMe',
                                    name: 'rememberMe',
                                    checked: [{
                                        t: 2,
                                        r: 'rememberMe'
                                      }]
                                  }
                                },
                                ' Remember me'
                              ]
                            }]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'button',
                          v: { click: 'login' },
                          a: {
                            'class': [
                              'btn btn-primary',
                              {
                                t: 4,
                                r: '.waiting',
                                f: [' disabled']
                              }
                            ]
                          },
                          f: ['Log In']
                        },
                        ' ',
                        {
                          t: 4,
                          r: '.waiting',
                          f: [{
                              t: 7,
                              e: 'span',
                              a: { 'class': 'spinnerContainer' },
                              f: [{
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'loginSpinner spinner' }
                                }]
                            }]
                        }
                      ]
                    }]
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
            }]
        },
        css: '.overlay {\nposition: fixed;\nz-index: 10000;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\nopacity: .7;\nbackground: #aaaaaa;\n}\n.loginSpinner {\nposition: absolute;\ntop: -6px;\nleft: 10px;\n}\n.spinnerContainer {\nposition: relative;\n}\n.navbar-alert {\nposition: absolute;\nz-index: 10500;\nleft: 0;\nright: 0;\nmargin-left: auto;\nmargin-right: auto;\nmin-width: 100px;\nborder-color: #777;\n}\n',
        components: { 'modal': _import_0 }
      }, component = {};
    //TODO: Notifications ds
    component.exports = {
      isolated: false,
      data: {
        brand: 'freehold',
        authenticated: fh.auth.type != 'none',
        errorLead: 'An error occurred and you may need to refresh this page: ',
        error: false,
        app: false,
        user: {}
      },
      decorators: {
        help: function (node) {
          $(node).popover({
            animation: true,
            placement: 'bottom',
            trigger: 'focus',
            html: true,
            container: 'body'
          });
          return {
            teardown: function () {
              $(node).popover('destroy');
            }
          };
        }
      },
      init: function () {
        var r = this;
        if (r.get('authenticated')) {
          fh.user.get(fh.auth.user).done(function (result) {
            if (!result.data.name) {
              result.data.name = fh.auth.user;
            }
            result.data.name = result.data.name.trim();
            r.set('user', result.data);
          }).fail(function (result) {
            result = result.responseJSON;
            r.set('error', result.message);
          });
        }
        this.on({
          logout: function (event) {
            fh.session.logout().done(function () {
              window.location = '/';
            }).fail(function (result) {
              result = result.responseJSON;
              this.set('error', result.message);
            }.bind(this));
          },
          openUser: function (event) {
            window.location = '/home/v1/file/user/';
          },
          refresh: function () {
            window.location.reload();
          },
          loginModal: function (event) {
            this.set({
              'loginErr': false,
              'username': '',
              'password': '',
              'rememberMe': false
            });
            $('#loginModal').modal();
            $('#loginModal').on('shown.bs.modal', function () {
              $('#username').focus();
            });
          },
          login: function (event) {
            this.set('waiting', true);
            this.set('loginErr', null);
            event.original.preventDefault();
            var data;
            if (event.context.rememberMe) {
              var today = new Date(Date.now());
              today.setDate(today.getDate() + 15);
              data = today;
            }
            if (event.context.username === '') {
              this.set('loginerr', 'username is required');
              this.set('waiting', false);
              return;
            }
            fh.session.login(event.context.username, event.context.password, data).done(function (result) {
              location.reload();
            }).fail(function (result) {
              result = result.responseJSON;
              this.set('loginErr', result.message);
              this.set('waiting', false);
            }.bind(this));
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
  }({}, ractive, rvc_modal);
  rvc_permissions = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [
            {
              t: 4,
              r: 'error',
              f: [{
                  t: 7,
                  e: 'div',
                  a: {
                    'class': 'alert alert-danger',
                    role: 'alert'
                  },
                  f: [{
                      t: 2,
                      r: 'error'
                    }]
                }]
            },
            {
              t: 4,
              r: 'permissions',
              f: [{
                  t: 7,
                  e: 'form',
                  a: {
                    'class': 'form-horizontal',
                    role: 'form'
                  },
                  f: [
                    {
                      t: 4,
                      r: 'showOwner',
                      f: [{
                          t: 7,
                          e: 'div',
                          a: { 'class': 'form-group' },
                          f: [
                            {
                              t: 7,
                              e: 'div',
                              a: { 'class': 'col-md-offset-1 col-sm-2' },
                              f: [{
                                  t: 7,
                                  e: 'label',
                                  a: { 'class': 'control-label' },
                                  f: ['Owner:']
                                }]
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'div',
                              a: { 'class': 'col-sm-6' },
                              f: [{
                                  t: 7,
                                  e: 'select',
                                  a: {
                                    'class': 'form-control',
                                    name: 'Owner',
                                    value: [{
                                        t: 2,
                                        r: 'owner'
                                      }]
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: [{
                                      t: 4,
                                      r: 'users',
                                      i: 'i',
                                      f: [{
                                          t: 7,
                                          e: 'option',
                                          a: {
                                            value: [{
                                                t: 2,
                                                r: 'i'
                                              }]
                                          },
                                          f: [{
                                              t: 2,
                                              x: {
                                                r: [
                                                  '.name',
                                                  'i'
                                                ],
                                                s: '_0||_1'
                                              }
                                            }]
                                        }]
                                    }]
                                }]
                            }
                          ]
                        }]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'div',
                      a: { 'class': 'form-group' },
                      f: [
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-md-offset-2 col-sm-2' },
                          f: [{
                              t: 7,
                              e: 'label',
                              a: { 'class': 'control-label' },
                              f: ['Private:']
                            }]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-sm-7' },
                          f: [{
                              t: 7,
                              e: 'div',
                              a: { 'class': 'btn-group' },
                              f: [
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['private'],
                                          s: '_0=="r"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleRead',
                                      a: ['private']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Read']
                                },
                                ' ',
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['private'],
                                          s: '_0=="w"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleWrite',
                                      a: ['private']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Write']
                                }
                              ]
                            }]
                        }
                      ]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'div',
                      a: { 'class': 'form-group' },
                      f: [
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-md-offset-2 col-sm-2' },
                          f: [{
                              t: 7,
                              e: 'label',
                              a: { 'class': 'control-label' },
                              f: ['Friend:']
                            }]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-sm-7' },
                          f: [{
                              t: 7,
                              e: 'div',
                              a: { 'class': 'btn-group' },
                              f: [
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['friend'],
                                          s: '_0=="r"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleRead',
                                      a: ['friend']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Read']
                                },
                                ' ',
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['friend'],
                                          s: '_0=="w"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleWrite',
                                      a: ['friend']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Write']
                                }
                              ]
                            }]
                        }
                      ]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'div',
                      a: { 'class': 'form-group' },
                      f: [
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-md-offset-2 col-sm-2' },
                          f: [{
                              t: 7,
                              e: 'label',
                              a: { 'class': 'control-label' },
                              f: ['Public:']
                            }]
                        },
                        ' ',
                        {
                          t: 7,
                          e: 'div',
                          a: { 'class': 'col-sm-7' },
                          f: [{
                              t: 7,
                              e: 'div',
                              a: { 'class': 'btn-group' },
                              f: [
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['public'],
                                          s: '_0=="r"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleRead',
                                      a: ['public']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Read']
                                },
                                ' ',
                                {
                                  t: 7,
                                  e: 'button',
                                  a: {
                                    type: 'button',
                                    'class': [
                                      'btn btn-sm ',
                                      {
                                        t: 2,
                                        x: {
                                          r: ['public'],
                                          s: '_0=="w"||_0=="rw"?"active btn-primary":"btn-default"'
                                        }
                                      }
                                    ]
                                  },
                                  v: {
                                    click: {
                                      n: 'toggleWrite',
                                      a: ['public']
                                    }
                                  },
                                  m: [{
                                      t: 4,
                                      r: 'readOnly',
                                      f: ['disabled']
                                    }],
                                  f: ['Write']
                                }
                              ]
                            }]
                        }
                      ]
                    }
                  ]
                }]
            }
          ]
        },
        css: ''
      }, component = {};
    component.exports = {
      data: {
        permissions: {
          owner: '',
          public: '',
          private: '',
          friend: ''
        },
        showOwner: true,
        readOnly: false
      },
      init: function () {
        var r = this;
        this._super();
        fh.user.all().done(function (result) {
          r.set('users', result.data);
        }).fail(function (result) {
          result = result.responseJSON;
          r.set('error', result.message);
        });
        this.on({
          'toggleRead': function (event, level) {
            var keypath = 'permissions.' + level;
            var prm = r.get(keypath);
            if (!prm) {
              r.set(keypath, 'r');
              return;
            }
            var index = prm.indexOf('r');
            if (index !== -1) {
              r.set(keypath, prm.slice(index + 1));
              return;
            }
            r.set(keypath, 'r' + prm);
          },
          'toggleWrite': function (event, level) {
            var keypath = 'permissions.' + level;
            var prm = r.get(keypath);
            if (!prm) {
              r.set(keypath, 'w');
              return;
            }
            var index = prm.indexOf('w');
            if (index === 0) {
              r.set(keypath, '');
              return;
            }
            if (index === -1) {
              r.set(keypath, prm + 'w');
              return;
            }
            r.set(keypath, 'r');
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
  rvc_droppable = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'span',
              a: {
                'class': [
                  'droppable ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
              o: 'droppable',
              f: [{
                  t: 2,
                  r: 'yield'
                }]
            }]
        },
        css: ''
      }, component = {};
    component.exports = {
      //defaulted options, can be overridden at component markup
      // options to be added as needed, and they should match
      // the jqueryui options
      data: {
        useParent: false,
        addClasses: false,
        disabled: false,
        greedy: false,
        tolerance: 'intersect',
        hoverClass: false,
        scope: 'default',
        dropData: null
      },
      decorators: {
        droppable: function (srcNode) {
          var r = this;
          var node;
          if (r.get('useParent')) {
            node = srcNode.parentNode;
          } else {
            node = srcNode;
          }
          $(node).droppable({
            addClasses: r.get('addClasses'),
            disabled: r.get('disabled'),
            greedy: r.get('greedy'),
            hoverClass: r.get('hoverClass'),
            tolerance: r.get('tolerance'),
            scope: r.get('scope'),
            drop: function (event, ui) {
              r.fire('drop', $(ui.draggable).data(), r.get('dropData'));
            }
          });
          return {
            teardown: function () {
              $(node).droppable('destroy');
            }
          };
        }
      },
      init: function () {
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
  rvc_draggable = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'span',
              a: {
                'class': [
                  'draggable ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
              o: 'draggable',
              f: [{
                  t: 2,
                  r: 'yield'
                }]
            }]
        },
        css: ''
      }, component = {};
    component.exports = {
      //defaulted options, can be overridden at component markup
      // options to be added as needed, and they should match
      // the jqueryui options
      data: {
        useParent: false,
        addClasses: false,
        revert: false,
        snap: false,
        containment: false,
        zIndex: false,
        opacity: false,
        scope: 'default',
        helper: 'original',
        disabled: false,
        dragData: null
      },
      decorators: {
        draggable: function (srcNode) {
          var r = this;
          var node;
          if (r.get('useParent')) {
            node = srcNode.parentNode;
          } else {
            node = srcNode;
          }
          $(node).draggable({
            addClasses: r.get('addClasses'),
            revert: r.get('revert'),
            snap: r.get('snap'),
            scope: r.get('scope'),
            containment: r.get('containment'),
            opacity: r.get('opacity'),
            zIndex: r.get('zIndex'),
            helper: r.get('helper'),
            disabled: r.get('disabled'),
            start: function (event, ui) {
              if (r.get('dragData')) {
                $(node).data(r.get('dragData'));
              }
            }
          });
          return {
            teardown: function () {
              $(node).draggable('destroy');
            }
          };
        }
      },
      init: function () {
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
  rvc_tree = function (require, Ractive, _import_0, _import_1) {
    var __options__ = {
        template: {
          v: 1,
          p: {
            children: [{
                t: 7,
                e: 'ul',
                f: [{
                    t: 4,
                    r: '.children',
                    f: [{
                        t: 4,
                        r: '.hide',
                        f: [{
                            t: 8,
                            r: 'child'
                          }],
                        n: 51
                      }]
                  }]
              }],
            child: [{
                t: 7,
                e: 'li',
                f: [
                  {
                    t: 7,
                    e: 'div',
                    a: {
                      'class': [
                        {
                          t: 4,
                          n: 50,
                          r: '.selected',
                          f: ['selected']
                        },
                        {
                          t: 4,
                          n: 51,
                          f: ['child'],
                          r: '.selected'
                        }
                      ]
                    },
                    m: [{
                        t: 4,
                        r: '.draggable',
                        f: ['onmousedown="return false"'],
                        n: 51
                      }],
                    f: [
                      {
                        t: 4,
                        n: 50,
                        r: '.draggable',
                        f: [{
                            t: 7,
                            e: 'draggable',
                            a: {
                              useParent: 'true',
                              opacity: '0.7',
                              helper: 'clone',
                              zIndex: '1000',
                              dragData: [{
                                  t: 2,
                                  r: '.'
                                }]
                            }
                          }]
                      },
                      ' ',
                      {
                        t: 4,
                        n: 50,
                        r: '.droppable',
                        f: [{
                            t: 7,
                            e: 'droppable',
                            a: {
                              useParent: 'true',
                              hoverClass: 'dropHover',
                              dropData: [{
                                  t: 2,
                                  r: '.'
                                }]
                            }
                          }]
                      },
                      ' ',
                      {
                        t: 4,
                        x: {
                          r: [
                            'tree',
                            '.'
                          ],
                          s: '_0.hasChildren(_1)'
                        },
                        f: [{
                            t: 7,
                            e: 'a',
                            a: { href: '#' },
                            v: { click: 'open' },
                            f: [{
                                t: 7,
                                e: 'span',
                                a: {
                                  'class': [
                                    'glyphicon glyphicon-',
                                    {
                                      t: 4,
                                      n: 50,
                                      r: '.open',
                                      f: ['minus']
                                    },
                                    {
                                      t: 4,
                                      n: 51,
                                      f: ['plus'],
                                      r: '.open'
                                    }
                                  ]
                                }
                              }]
                          }]
                      },
                      ' ',
                      {
                        t: 4,
                        r: '.iconClass',
                        f: [{
                            t: 7,
                            e: 'span',
                            a: {
                              'class': [
                                'icon ',
                                {
                                  t: 2,
                                  r: '.iconClass'
                                }
                              ]
                            }
                          }]
                      },
                      ' ',
                      {
                        t: 4,
                        r: '.icon',
                        f: [{
                            t: 7,
                            e: 'img',
                            a: {
                              'class': 'icon',
                              src: [{
                                  t: 2,
                                  r: '.icon'
                                }]
                            }
                          }]
                      },
                      ' ',
                      {
                        t: 4,
                        n: 50,
                        r: '.canSelect',
                        f: [{
                            t: 7,
                            e: 'a',
                            a: { href: '#' },
                            v: { click: 'select' },
                            f: [{
                                t: 2,
                                r: '.name'
                              }]
                          }]
                      },
                      {
                        t: 4,
                        n: 51,
                        f: [
                          {
                            t: 4,
                            x: {
                              r: [
                                'tree',
                                '.'
                              ],
                              s: '_0.hasChildren(_1)'
                            },
                            f: [{
                                t: 7,
                                e: 'a',
                                a: { href: '#' },
                                v: { click: 'open' },
                                f: [{
                                    t: 2,
                                    r: '.name'
                                  }]
                              }]
                          },
                          ' ',
                          {
                            t: 4,
                            x: {
                              r: [
                                'tree',
                                '.'
                              ],
                              s: '_0.hasChildren(_1)'
                            },
                            f: [{
                                t: 2,
                                r: '.name'
                              }],
                            n: 51
                          }
                        ],
                        r: '.canSelect'
                      }
                    ]
                  },
                  ' ',
                  {
                    t: 4,
                    x: {
                      r: [
                        'tree',
                        '.'
                      ],
                      s: '_0.hasChildren(_1)'
                    },
                    f: [{
                        t: 4,
                        n: 50,
                        r: '.open',
                        f: [{
                            t: 8,
                            r: 'children'
                          }]
                      }]
                  }
                ]
              }]
          },
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'tree' },
              f: [{
                  t: 4,
                  r: 'root',
                  f: [
                    {
                      t: 7,
                      e: 'div',
                      a: {
                        'class': [
                          {
                            t: 4,
                            n: 50,
                            r: '.selected',
                            f: ['selected bg-info']
                          },
                          {
                            t: 4,
                            n: 51,
                            f: ['child'],
                            r: '.selected'
                          }
                        ]
                      },
                      f: [
                        {
                          t: 4,
                          x: {
                            r: [
                              'tree',
                              '.'
                            ],
                            s: '_0.hasChildren(_1)'
                          },
                          f: [{
                              t: 7,
                              e: 'a',
                              a: { href: '#' },
                              v: { click: 'open' },
                              f: [{
                                  t: 7,
                                  e: 'span',
                                  a: {
                                    'class': [
                                      'glyphicon glyphicon-',
                                      {
                                        t: 4,
                                        n: 50,
                                        r: '.open',
                                        f: ['minus']
                                      },
                                      {
                                        t: 4,
                                        n: 51,
                                        f: ['plus'],
                                        r: '.open'
                                      }
                                    ]
                                  }
                                }]
                            }]
                        },
                        ' ',
                        {
                          t: 4,
                          r: '.iconClass',
                          f: [{
                              t: 7,
                              e: 'span',
                              a: {
                                'class': [
                                  'icon ',
                                  {
                                    t: 2,
                                    r: '.iconClass'
                                  }
                                ]
                              }
                            }]
                        },
                        ' ',
                        {
                          t: 4,
                          r: '.icon',
                          f: [{
                              t: 7,
                              e: 'img',
                              a: {
                                'class': 'icon',
                                src: [{
                                    t: 2,
                                    r: '.icon'
                                  }]
                              }
                            }]
                        },
                        ' ',
                        {
                          t: 4,
                          n: 50,
                          r: '.canSelect',
                          f: [{
                              t: 7,
                              e: 'a',
                              a: { href: '#' },
                              v: { click: 'select' },
                              f: [{
                                  t: 2,
                                  r: '.name'
                                }]
                            }]
                        },
                        {
                          t: 4,
                          n: 51,
                          f: [
                            {
                              t: 4,
                              x: {
                                r: [
                                  'tree',
                                  '.'
                                ],
                                s: '_0.hasChildren(_1)'
                              },
                              f: [{
                                  t: 7,
                                  e: 'a',
                                  a: { href: '#' },
                                  v: { click: 'open' },
                                  f: [{
                                      t: 2,
                                      r: '.name'
                                    }]
                                }]
                            },
                            ' ',
                            {
                              t: 4,
                              x: {
                                r: [
                                  'tree',
                                  '.'
                                ],
                                s: '_0.hasChildren(_1)'
                              },
                              f: [{
                                  t: 2,
                                  r: '.name'
                                }],
                              n: 51
                            }
                          ],
                          r: '.canSelect'
                        }
                      ]
                    },
                    ' ',
                    {
                      t: 4,
                      x: {
                        r: [
                          'tree',
                          '.'
                        ],
                        s: '_0.hasChildren(_1)'
                      },
                      f: [{
                          t: 4,
                          n: 50,
                          r: '.open',
                          f: [{
                              t: 8,
                              r: 'children'
                            }]
                        }]
                    }
                  ]
                }]
            }]
        },
        css: '.selected {\nborder-color: #ccc;\nborder: 0px solid transparent;\nborder-radius: 4px;\npadding: 5px;\nfont-weight:bold;\nbackground-color: #D9EDF7;\n}\n.dropHover  {\nbackground-color: #D9EDF7;\n}\n.child {\npadding: 5px;\n}\n.child:hover {\nbackground-color: #f5f5f5;\nborder: 0px solid transparent;\nborder-radius: 4px;\npadding: 5px;\n}\na:hover, a:focus {\ntext-decoration: none;\t\ncolor: #333;\n}\na {\ncolor: #333;\n}\n.tree {\ncursor: default;\noverflow: auto;\n}\nul {\nlist-style: none;\n}\nli {\nmargin-left: -22px;\n}\n.icon {\ncolor: #555;\n}\n.icon {\nmax-width: 14px;\nmax-height: 14px;\t\n}\n',
        components: {
          'droppable': _import_0,
          'draggable': _import_1
        }
      }, component = {};
    component.exports = {
      data: {
        tree: {
          hasChildren: function (child) {
            return typeof child.children !== 'undefined' && child.children.length >= 0;
          }
        },
        root: {
          name: 'Sample data that should be overwritten',
          canSelect: true,
          iconClass: 'folder-open',
          children: [
            {
              name: 'child1',
              iconClass: 'glyphicon glyphicon-file',
              canSelect: true,
              children: []
            },
            {
              name: 'child2',
              iconClass: 'glyphicon glyphicon-file',
              canSelect: true
            },
            {
              name: 'child3',
              iconClass: 'glyphicon glyphicon-folder-closed',
              children: [
                {
                  name: 'subchild1',
                  iconClass: 'glyphicon glyphicon-file',
                  canSelect: true
                },
                {
                  name: 'subchild2',
                  iconClass: 'glyphicon glyphicon-file',
                  canSelect: true,
                  hide: true
                },
                {
                  name: 'subchild3',
                  iconClass: 'glyphicon glyphicon-file',
                  canSelect: true
                },
                {
                  name: 'child3',
                  iconClass: 'glyphicon glyphicon-folder-closed',
                  children: [
                    {
                      name: 'subchild1',
                      iconClass: 'glyphicon glyphicon-file',
                      canSelect: true
                    },
                    {
                      name: 'subchild2',
                      iconClass: 'glyphicon glyphicon-file',
                      canSelect: true
                    },
                    {
                      name: 'subchild3',
                      iconClass: 'glyphicon glyphicon-file',
                      canSelect: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      init: function () {
        var r = this;
        this.on({
          'open': function (event) {
            if (event.context.open) {
              r.set(event.keypath + '.open', false);
              return;
            }
            r.set(event.keypath + '.open', true);
          },
          'select': function (event) {
            r.set('selectKeypath', event.keypath);
          }
        });
        this.observe({
          'selectKeypath': function (newvalue, oldvalue, keypath) {
            select(newvalue);
          }
        });
        function select(keypath) {
          r.set('root.selected', false);
          clearSelected(r.get('root.children'));
          r.update('root');
          r.set(keypath + '.selected', true);
          r.set('selected', r.get(keypath));
        }
        function clearSelected(children) {
          if (!children) {
            return;
          }
          for (var i = 0; i < children.length; i++) {
            children[i].selected = false;
            if (children[i].hasOwnProperty('children')) {
              clearSelected(children[i].children);
            }
          }
        }
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
  }({}, ractive, rvc_droppable, rvc_draggable);
  rvc_filetree = function (require, Ractive, _import_0) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'filetree' },
              f: [
                {
                  t: 4,
                  r: 'error',
                  f: [{
                      t: 7,
                      e: 'div',
                      a: {
                        'class': 'alert alert-danger',
                        role: 'alert'
                      },
                      f: [{
                          t: 2,
                          r: 'error'
                        }]
                    }]
                },
                ' ',
                {
                  t: 7,
                  e: 'tree',
                  a: {
                    root: [{
                        t: 2,
                        r: 'root'
                      }],
                    selected: [{
                        t: 2,
                        r: 'selected'
                      }]
                  }
                }
              ]
            }]
        },
        css: '',
        components: { 'tree': _import_0 }
      }, component = {};
    component.exports = {
      data: {
        rootDir: '/v1/file/',
        folderOnly: false,
        filterRegex: ''
      },
      init: function () {
        var r = this;
        this._super();
        this.on({
          'tree.open': function (event) {
            if (event.context.isFolder) {
              if (event.context.children.length == 0) {
                getFile(event.context.url, event.keypath);
              }
            }
          }
        });
        this.observe({
          'rootDir': function (newvalue, oldvalue, keypath) {
            r.set('root', {
              url: r.get('rootDir'),
              name: r.get('rootDir'),
              iconClass: 'glyphicon glyphicon-folder-open'
            });
            getFile(r.get('rootDir'), 'root');
          }
        });
        function getFile(file, keypath) {
          fh.properties.get(file).done(function (result) {
            r.set(keypath + '.children', prepFiles(result.data));
          }).fail(function (result) {
            result = result.responseJSON;
            r.set('error', result.message);
          });
        }
        function prepFiles(files) {
          var regEx;
          try {
            regEx = new RegExp(r.get('filterRegex'), 'i');
          } catch (e) {
            regEx = new RegExp('', 'i');
          }
          for (var i = 0; i < files.length; i++) {
            if (!files[i].isDir) {
              if (r.get('folderOnly') || !regEx.exec(files[i].name)) {
                files[i].hide = true;
              }
              files[i].canSelect = true;
              files[i].iconClass = 'glyphicon glyphicon-file';
            } else {
              if (r.get('folderOnly')) {
                files[i].canSelect = true;
              }
              files[i].isFolder = true;
              files[i].iconClass = 'glyphicon glyphicon-folder-close';
              files[i].children = [];
            }
          }
          return files;
        }
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
  }({}, ractive, rvc_tree);
  rvc_jsonviewer = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          p: {
            child: [{
                t: 7,
                e: 'ul',
                f: [{
                    t: 4,
                    r: '.children',
                    i: 'i',
                    f: [{
                        t: 8,
                        r: 'value'
                      }]
                  }]
              }],
            value: [{
                t: 4,
                n: 50,
                x: {
                  r: ['../../collapsed'],
                  s: '!_0'
                },
                f: [{
                    t: 4,
                    r: '.',
                    f: [{
                        t: 7,
                        e: 'li',
                        f: [{
                            t: 7,
                            e: 'span',
                            a: { 'class': 'json-item' },
                            f: [
                              {
                                t: 4,
                                n: 50,
                                r: '.children',
                                f: [{
                                    t: 7,
                                    e: 'a',
                                    a: { href: '#' },
                                    v: { click: 'collapse' },
                                    f: [{
                                        t: 7,
                                        e: 'span',
                                        a: {
                                          'class': [
                                            'collapser glyphicon glyphicon-',
                                            {
                                              t: 4,
                                              n: 50,
                                              r: '.collapsed',
                                              f: ['plus']
                                            },
                                            {
                                              t: 4,
                                              n: 51,
                                              f: ['minus'],
                                              r: '.collapsed'
                                            }
                                          ]
                                        }
                                      }]
                                  }]
                              },
                              ' ',
                              {
                                t: 4,
                                n: 50,
                                x: {
                                  r: ['../../type'],
                                  s: '_0!=="array"'
                                },
                                f: [
                                  {
                                    t: 2,
                                    r: '.key'
                                  },
                                  ' :'
                                ]
                              },
                              ' ',
                              {
                                t: 4,
                                n: 50,
                                x: {
                                  r: ['.type'],
                                  s: '_0==="object"'
                                },
                                f: [
                                  '{ ',
                                  {
                                    t: 8,
                                    r: 'child'
                                  },
                                  ' }'
                                ]
                              },
                              ' ',
                              {
                                t: 4,
                                n: 50,
                                x: {
                                  r: ['.type'],
                                  s: '_0==="array"'
                                },
                                f: [
                                  '[ ',
                                  {
                                    t: 8,
                                    r: 'child'
                                  },
                                  ' ]'
                                ]
                              },
                              ' ',
                              {
                                t: 4,
                                n: 50,
                                x: {
                                  r: ['.type'],
                                  s: '_0!=="object"&&_0!=="array"'
                                },
                                f: [{
                                    t: 2,
                                    r: '.value'
                                  }]
                              },
                              ' ,'
                            ]
                          }]
                      }]
                  }]
              }]
          },
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'jsonviewer' },
              f: [
                {
                  t: 4,
                  r: 'error',
                  f: [{
                      t: 7,
                      e: 'div',
                      a: {
                        'class': 'alert alert-danger',
                        role: 'alert'
                      },
                      f: [{
                          t: 2,
                          r: 'error'
                        }]
                    }]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'pull-right btn-group' },
                  f: [
                    {
                      t: 7,
                      e: 'button',
                      a: {
                        type: 'button',
                        'class': 'btn btn-success btn-xs'
                      },
                      v: { click: 'expandAll' },
                      f: [{
                          t: 7,
                          e: 'span',
                          a: {
                            'class': 'glyphicon glyphicon-plus',
                            title: 'Expand all'
                          }
                        }]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'button',
                      a: {
                        type: 'button',
                        'class': 'btn btn-danger btn-xs'
                      },
                      v: { click: 'collapseAll' },
                      f: [{
                          t: 7,
                          e: 'span',
                          a: {
                            'class': 'glyphicon glyphicon-minus',
                            title: 'Collapse all'
                          }
                        }]
                    }
                  ]
                },
                ' ',
                {
                  t: 7,
                  e: 'span',
                  a: { 'class': 'json-item' },
                  f: [
                    '{',
                    {
                      t: 7,
                      e: 'ul',
                      f: [
                        ' ',
                        {
                          t: 4,
                          r: 'root',
                          i: 'i',
                          f: [{
                              t: 8,
                              r: 'value'
                            }]
                        },
                        ' '
                      ]
                    },
                    '}'
                  ]
                }
              ]
            }]
        },
        css: 'ul {\nlist-style: none;\n}\n.json-item {\npadding: 4px;\n}\n.collapser {\ncolor: #555;\n}\n.json-item:hover {\nbackground-color: #f5f5f5;\nborder-radius: 4px;\npadding: 4px;\n}\n.jsonviewer {\ncursor: default;\n}\n'
      }, component = {};
    component.exports = {
      data: {
        root: {},
        object: {},
        startCollapsed: false
      },
      init: function () {
        var r = this;
        this.on({
          'collapse': function (event) {
            if (event.context.collapsed) {
              r.set(event.keypath + '.collapsed', false);
            } else {
              r.set(event.keypath + '.collapsed', true);
            }
            r.update(event.keypath);
          },
          'expandAll': function (event) {
            setRoot(r.get('object'), false);
          },
          'collapseAll': function (event) {
            setRoot(r.get('object'), true);
          }
        });
        this.observe('object', function (newvalue, oldvalue, keypath) {
          setRoot(newvalue, r.get('startCollapsed'));
        });
        function setRoot(object, collapsed) {
          r.set('error', null);
          r.set('root', {});
          if (typeof object === 'string') {
            try {
              r.set('root', parseObj(JSON.parse(object), collapsed));
            } catch (e) {
              r.set('error', 'invalid JSON: ' + e);
            }
          } else {
            r.set('root', parseObj(object, collapsed));
          }
        }
        function parseObj(object, collapsed) {
          var kv = [];
          for (var key in object) {
            var obj = {
              key: key,
              collapsed: collapsed
            };
            if (object.hasOwnProperty(key)) {
              obj.type = typeof object[key];
              if (object[key] instanceof Array) {
                obj.type = 'array';
              }
              if (obj.type === 'object' || obj.type === 'array') {
                obj.children = parseObj(object[key], collapsed);
              } else {
                obj.value = object[key];
              }
              kv.push(obj);
            }
          }
          return kv;
        }
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
  rvc_jquery_ui = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: []
        },
        css: '/*!\n* jQuery UI CSS Framework @VERSION\n* http://jqueryui.com\n*\n* Copyright 2014 jQuery Foundation and other contributors\n* Released under the MIT license.\n* http://jquery.org/license\n*\n* http://api.jqueryui.com/category/theming/\n*\n* To view and modify this theme, visit http://jqueryui.com/themeroller/\n*/\n/* Component containers\n----------------------------------*/\n.ui-widget {\nfont-family: Verdana,Arial,sans-serif/*{ffDefault}*/;\nfont-size: 1.1em/*{fsDefault}*/;\n}\n.ui-widget .ui-widget {\nfont-size: 1em;\n}\n.ui-widget input,\n.ui-widget select,\n.ui-widget textarea,\n.ui-widget button {\nfont-family: Verdana,Arial,sans-serif/*{ffDefault}*/;\nfont-size: 1em;\n}\n.ui-widget-content {\nborder: 1px solid #aaaaaa/*{borderColorContent}*/;\nbackground: #ffffff/*{bgColorContent}*/ url("/core/v1/file/images/ui-bg_flat_75_ffffff_40x100.png")/*{bgImgUrlContent}*/ 50%/*{bgContentXPos}*/ 50%/*{bgContentYPos}*/ repeat-x/*{bgContentRepeat}*/;\ncolor: #222222/*{fcContent}*/;\n}\n.ui-widget-content a {\ncolor: #222222/*{fcContent}*/;\n}\n.ui-widget-header {\nborder: 1px solid #aaaaaa/*{borderColorHeader}*/;\nbackground: #cccccc/*{bgColorHeader}*/ url("/core/v1/file/images/ui-bg_highlight-soft_75_cccccc_1x100.png")/*{bgImgUrlHeader}*/ 50%/*{bgHeaderXPos}*/ 50%/*{bgHeaderYPos}*/ repeat-x/*{bgHeaderRepeat}*/;\ncolor: #222222/*{fcHeader}*/;\nfont-weight: bold;\n}\n.ui-widget-header a {\ncolor: #222222/*{fcHeader}*/;\n}\n/* Interaction state\n----------------------------------*/\n.ui-state-default,\n.ui-widget-content .ui-state-default,\n.ui-widget-header .ui-state-default {\nborder: 1px solid #d3d3d3/*{borderColorDefault}*/;\nbackground: #e6e6e6/*{bgColorDefault}*/ url("/core/v1/file/images/ui-bg_glass_75_e6e6e6_1x400.png")/*{bgImgUrlDefault}*/ 50%/*{bgDefaultXPos}*/ 50%/*{bgDefaultYPos}*/ repeat-x/*{bgDefaultRepeat}*/;\nfont-weight: normal/*{fwDefault}*/;\ncolor: #555555/*{fcDefault}*/;\n}\n.ui-state-default a,\n.ui-state-default a:link,\n.ui-state-default a:visited {\ncolor: #555555/*{fcDefault}*/;\ntext-decoration: none;\n}\n.ui-state-hover,\n.ui-widget-content .ui-state-hover,\n.ui-widget-header .ui-state-hover,\n.ui-state-focus,\n.ui-widget-content .ui-state-focus,\n.ui-widget-header .ui-state-focus {\nborder: 1px solid #999999/*{borderColorHover}*/;\nbackground: #dadada/*{bgColorHover}*/ url("/core/v1/file/images/ui-bg_glass_75_dadada_1x400.png")/*{bgImgUrlHover}*/ 50%/*{bgHoverXPos}*/ 50%/*{bgHoverYPos}*/ repeat-x/*{bgHoverRepeat}*/;\nfont-weight: normal/*{fwDefault}*/;\ncolor: #212121/*{fcHover}*/;\n}\n.ui-state-hover a,\n.ui-state-hover a:hover,\n.ui-state-hover a:link,\n.ui-state-hover a:visited,\n.ui-state-focus a,\n.ui-state-focus a:hover,\n.ui-state-focus a:link,\n.ui-state-focus a:visited {\ncolor: #212121/*{fcHover}*/;\ntext-decoration: none;\n}\n.ui-state-active,\n.ui-widget-content .ui-state-active,\n.ui-widget-header .ui-state-active {\nborder: 1px solid #aaaaaa/*{borderColorActive}*/;\nbackground: #ffffff/*{bgColorActive}*/ url("/core/v1/file/images/ui-bg_glass_65_ffffff_1x400.png")/*{bgImgUrlActive}*/ 50%/*{bgActiveXPos}*/ 50%/*{bgActiveYPos}*/ repeat-x/*{bgActiveRepeat}*/;\nfont-weight: normal/*{fwDefault}*/;\ncolor: #212121/*{fcActive}*/;\n}\n.ui-state-active a,\n.ui-state-active a:link,\n.ui-state-active a:visited {\ncolor: #212121/*{fcActive}*/;\ntext-decoration: none;\n}\n/* Interaction Cues\n----------------------------------*/\n.ui-state-highlight,\n.ui-widget-content .ui-state-highlight,\n.ui-widget-header .ui-state-highlight {\nborder: 1px solid #fcefa1/*{borderColorHighlight}*/;\nbackground: #fbf9ee/*{bgColorHighlight}*/ url("/core/v1/file/images/ui-bg_glass_55_fbf9ee_1x400.png")/*{bgImgUrlHighlight}*/ 50%/*{bgHighlightXPos}*/ 50%/*{bgHighlightYPos}*/ repeat-x/*{bgHighlightRepeat}*/;\ncolor: #363636/*{fcHighlight}*/;\n}\n.ui-state-highlight a,\n.ui-widget-content .ui-state-highlight a,\n.ui-widget-header .ui-state-highlight a {\ncolor: #363636/*{fcHighlight}*/;\n}\n.ui-state-error,\n.ui-widget-content .ui-state-error,\n.ui-widget-header .ui-state-error {\nborder: 1px solid #cd0a0a/*{borderColorError}*/;\nbackground: #fef1ec/*{bgColorError}*/ url("/core/v1/file/images/ui-bg_glass_95_fef1ec_1x400.png")/*{bgImgUrlError}*/ 50%/*{bgErrorXPos}*/ 50%/*{bgErrorYPos}*/ repeat-x/*{bgErrorRepeat}*/;\ncolor: #cd0a0a/*{fcError}*/;\n}\n.ui-state-error a,\n.ui-widget-content .ui-state-error a,\n.ui-widget-header .ui-state-error a {\ncolor: #cd0a0a/*{fcError}*/;\n}\n.ui-state-error-text,\n.ui-widget-content .ui-state-error-text,\n.ui-widget-header .ui-state-error-text {\ncolor: #cd0a0a/*{fcError}*/;\n}\n.ui-priority-primary,\n.ui-widget-content .ui-priority-primary,\n.ui-widget-header .ui-priority-primary {\nfont-weight: bold;\n}\n.ui-priority-secondary,\n.ui-widget-content .ui-priority-secondary,\n.ui-widget-header .ui-priority-secondary {\nopacity: .7;\nfilter:Alpha(Opacity=70); /* support: IE8 */\nfont-weight: normal;\n}\n.ui-state-disabled,\n.ui-widget-content .ui-state-disabled,\n.ui-widget-header .ui-state-disabled {\nopacity: .35;\nfilter:Alpha(Opacity=35); /* support: IE8 */\nbackground-image: none;\n}\n.ui-state-disabled .ui-icon {\nfilter:Alpha(Opacity=35); /* support: IE8 - See #6059 */\n}\n/* Icons\n----------------------------------*/\n/* states and images */\n.ui-icon {\nwidth: 16px;\nheight: 16px;\n}\n.ui-icon,\n.ui-widget-content .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_222222_256x240.png")/*{iconsContent}*/;\n}\n.ui-widget-header .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_222222_256x240.png")/*{iconsHeader}*/;\n}\n.ui-state-default .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_888888_256x240.png")/*{iconsDefault}*/;\n}\n.ui-state-hover .ui-icon,\n.ui-state-focus .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_454545_256x240.png")/*{iconsHover}*/;\n}\n.ui-state-active .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_454545_256x240.png")/*{iconsActive}*/;\n}\n.ui-state-highlight .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_2e83ff_256x240.png")/*{iconsHighlight}*/;\n}\n.ui-state-error .ui-icon,\n.ui-state-error-text .ui-icon {\nbackground-image: url("/core/v1/file/images/ui-icons_cd0a0a_256x240.png")/*{iconsError}*/;\n}\n/* positioning */\n.ui-icon-blank { background-position: 16px 16px; }\n.ui-icon-carat-1-n { background-position: 0 0; }\n.ui-icon-carat-1-ne { background-position: -16px 0; }\n.ui-icon-carat-1-e { background-position: -32px 0; }\n.ui-icon-carat-1-se { background-position: -48px 0; }\n.ui-icon-carat-1-s { background-position: -64px 0; }\n.ui-icon-carat-1-sw { background-position: -80px 0; }\n.ui-icon-carat-1-w { background-position: -96px 0; }\n.ui-icon-carat-1-nw { background-position: -112px 0; }\n.ui-icon-carat-2-n-s { background-position: -128px 0; }\n.ui-icon-carat-2-e-w { background-position: -144px 0; }\n.ui-icon-triangle-1-n { background-position: 0 -16px; }\n.ui-icon-triangle-1-ne { background-position: -16px -16px; }\n.ui-icon-triangle-1-e { background-position: -32px -16px; }\n.ui-icon-triangle-1-se { background-position: -48px -16px; }\n.ui-icon-triangle-1-s { background-position: -64px -16px; }\n.ui-icon-triangle-1-sw { background-position: -80px -16px; }\n.ui-icon-triangle-1-w { background-position: -96px -16px; }\n.ui-icon-triangle-1-nw { background-position: -112px -16px; }\n.ui-icon-triangle-2-n-s { background-position: -128px -16px; }\n.ui-icon-triangle-2-e-w { background-position: -144px -16px; }\n.ui-icon-arrow-1-n { background-position: 0 -32px; }\n.ui-icon-arrow-1-ne { background-position: -16px -32px; }\n.ui-icon-arrow-1-e { background-position: -32px -32px; }\n.ui-icon-arrow-1-se { background-position: -48px -32px; }\n.ui-icon-arrow-1-s { background-position: -64px -32px; }\n.ui-icon-arrow-1-sw { background-position: -80px -32px; }\n.ui-icon-arrow-1-w { background-position: -96px -32px; }\n.ui-icon-arrow-1-nw { background-position: -112px -32px; }\n.ui-icon-arrow-2-n-s { background-position: -128px -32px; }\n.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }\n.ui-icon-arrow-2-e-w { background-position: -160px -32px; }\n.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }\n.ui-icon-arrowstop-1-n { background-position: -192px -32px; }\n.ui-icon-arrowstop-1-e { background-position: -208px -32px; }\n.ui-icon-arrowstop-1-s { background-position: -224px -32px; }\n.ui-icon-arrowstop-1-w { background-position: -240px -32px; }\n.ui-icon-arrowthick-1-n { background-position: 0 -48px; }\n.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }\n.ui-icon-arrowthick-1-e { background-position: -32px -48px; }\n.ui-icon-arrowthick-1-se { background-position: -48px -48px; }\n.ui-icon-arrowthick-1-s { background-position: -64px -48px; }\n.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }\n.ui-icon-arrowthick-1-w { background-position: -96px -48px; }\n.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }\n.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }\n.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }\n.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }\n.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }\n.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }\n.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }\n.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }\n.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }\n.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }\n.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }\n.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }\n.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }\n.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }\n.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }\n.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }\n.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }\n.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }\n.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }\n.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }\n.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }\n.ui-icon-arrow-4 { background-position: 0 -80px; }\n.ui-icon-arrow-4-diag { background-position: -16px -80px; }\n.ui-icon-extlink { background-position: -32px -80px; }\n.ui-icon-newwin { background-position: -48px -80px; }\n.ui-icon-refresh { background-position: -64px -80px; }\n.ui-icon-shuffle { background-position: -80px -80px; }\n.ui-icon-transfer-e-w { background-position: -96px -80px; }\n.ui-icon-transferthick-e-w { background-position: -112px -80px; }\n.ui-icon-folder-collapsed { background-position: 0 -96px; }\n.ui-icon-folder-open { background-position: -16px -96px; }\n.ui-icon-document { background-position: -32px -96px; }\n.ui-icon-document-b { background-position: -48px -96px; }\n.ui-icon-note { background-position: -64px -96px; }\n.ui-icon-mail-closed { background-position: -80px -96px; }\n.ui-icon-mail-open { background-position: -96px -96px; }\n.ui-icon-suitcase { background-position: -112px -96px; }\n.ui-icon-comment { background-position: -128px -96px; }\n.ui-icon-person { background-position: -144px -96px; }\n.ui-icon-print { background-position: -160px -96px; }\n.ui-icon-trash { background-position: -176px -96px; }\n.ui-icon-locked { background-position: -192px -96px; }\n.ui-icon-unlocked { background-position: -208px -96px; }\n.ui-icon-bookmark { background-position: -224px -96px; }\n.ui-icon-tag { background-position: -240px -96px; }\n.ui-icon-home { background-position: 0 -112px; }\n.ui-icon-flag { background-position: -16px -112px; }\n.ui-icon-calendar { background-position: -32px -112px; }\n.ui-icon-cart { background-position: -48px -112px; }\n.ui-icon-pencil { background-position: -64px -112px; }\n.ui-icon-clock { background-position: -80px -112px; }\n.ui-icon-disk { background-position: -96px -112px; }\n.ui-icon-calculator { background-position: -112px -112px; }\n.ui-icon-zoomin { background-position: -128px -112px; }\n.ui-icon-zoomout { background-position: -144px -112px; }\n.ui-icon-search { background-position: -160px -112px; }\n.ui-icon-wrench { background-position: -176px -112px; }\n.ui-icon-gear { background-position: -192px -112px; }\n.ui-icon-heart { background-position: -208px -112px; }\n.ui-icon-star { background-position: -224px -112px; }\n.ui-icon-link { background-position: -240px -112px; }\n.ui-icon-cancel { background-position: 0 -128px; }\n.ui-icon-plus { background-position: -16px -128px; }\n.ui-icon-plusthick { background-position: -32px -128px; }\n.ui-icon-minus { background-position: -48px -128px; }\n.ui-icon-minusthick { background-position: -64px -128px; }\n.ui-icon-close { background-position: -80px -128px; }\n.ui-icon-closethick { background-position: -96px -128px; }\n.ui-icon-key { background-position: -112px -128px; }\n.ui-icon-lightbulb { background-position: -128px -128px; }\n.ui-icon-scissors { background-position: -144px -128px; }\n.ui-icon-clipboard { background-position: -160px -128px; }\n.ui-icon-copy { background-position: -176px -128px; }\n.ui-icon-contact { background-position: -192px -128px; }\n.ui-icon-image { background-position: -208px -128px; }\n.ui-icon-video { background-position: -224px -128px; }\n.ui-icon-script { background-position: -240px -128px; }\n.ui-icon-alert { background-position: 0 -144px; }\n.ui-icon-info { background-position: -16px -144px; }\n.ui-icon-notice { background-position: -32px -144px; }\n.ui-icon-help { background-position: -48px -144px; }\n.ui-icon-check { background-position: -64px -144px; }\n.ui-icon-bullet { background-position: -80px -144px; }\n.ui-icon-radio-on { background-position: -96px -144px; }\n.ui-icon-radio-off { background-position: -112px -144px; }\n.ui-icon-pin-w { background-position: -128px -144px; }\n.ui-icon-pin-s { background-position: -144px -144px; }\n.ui-icon-play { background-position: 0 -160px; }\n.ui-icon-pause { background-position: -16px -160px; }\n.ui-icon-seek-next { background-position: -32px -160px; }\n.ui-icon-seek-prev { background-position: -48px -160px; }\n.ui-icon-seek-end { background-position: -64px -160px; }\n.ui-icon-seek-start { background-position: -80px -160px; }\n/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */\n.ui-icon-seek-first { background-position: -80px -160px; }\n.ui-icon-stop { background-position: -96px -160px; }\n.ui-icon-eject { background-position: -112px -160px; }\n.ui-icon-volume-off { background-position: -128px -160px; }\n.ui-icon-volume-on { background-position: -144px -160px; }\n.ui-icon-power { background-position: 0 -176px; }\n.ui-icon-signal-diag { background-position: -16px -176px; }\n.ui-icon-signal { background-position: -32px -176px; }\n.ui-icon-battery-0 { background-position: -48px -176px; }\n.ui-icon-battery-1 { background-position: -64px -176px; }\n.ui-icon-battery-2 { background-position: -80px -176px; }\n.ui-icon-battery-3 { background-position: -96px -176px; }\n.ui-icon-circle-plus { background-position: 0 -192px; }\n.ui-icon-circle-minus { background-position: -16px -192px; }\n.ui-icon-circle-close { background-position: -32px -192px; }\n.ui-icon-circle-triangle-e { background-position: -48px -192px; }\n.ui-icon-circle-triangle-s { background-position: -64px -192px; }\n.ui-icon-circle-triangle-w { background-position: -80px -192px; }\n.ui-icon-circle-triangle-n { background-position: -96px -192px; }\n.ui-icon-circle-arrow-e { background-position: -112px -192px; }\n.ui-icon-circle-arrow-s { background-position: -128px -192px; }\n.ui-icon-circle-arrow-w { background-position: -144px -192px; }\n.ui-icon-circle-arrow-n { background-position: -160px -192px; }\n.ui-icon-circle-zoomin { background-position: -176px -192px; }\n.ui-icon-circle-zoomout { background-position: -192px -192px; }\n.ui-icon-circle-check { background-position: -208px -192px; }\n.ui-icon-circlesmall-plus { background-position: 0 -208px; }\n.ui-icon-circlesmall-minus { background-position: -16px -208px; }\n.ui-icon-circlesmall-close { background-position: -32px -208px; }\n.ui-icon-squaresmall-plus { background-position: -48px -208px; }\n.ui-icon-squaresmall-minus { background-position: -64px -208px; }\n.ui-icon-squaresmall-close { background-position: -80px -208px; }\n.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }\n.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }\n.ui-icon-grip-solid-vertical { background-position: -32px -224px; }\n.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }\n.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }\n.ui-icon-grip-diagonal-se { background-position: -80px -224px; }\n/* Misc visuals\n----------------------------------*/\n/* Corner radius */\n.ui-corner-all,\n.ui-corner-top,\n.ui-corner-left,\n.ui-corner-tl {\nborder-top-left-radius: 4px/*{cornerRadius}*/;\n}\n.ui-corner-all,\n.ui-corner-top,\n.ui-corner-right,\n.ui-corner-tr {\nborder-top-right-radius: 4px/*{cornerRadius}*/;\n}\n.ui-corner-all,\n.ui-corner-bottom,\n.ui-corner-left,\n.ui-corner-bl {\nborder-bottom-left-radius: 4px/*{cornerRadius}*/;\n}\n.ui-corner-all,\n.ui-corner-bottom,\n.ui-corner-right,\n.ui-corner-br {\nborder-bottom-right-radius: 4px/*{cornerRadius}*/;\n}\n/* Overlays */\n.ui-widget-overlay {\nbackground: #aaaaaa/*{bgColorOverlay}*/ url("/core/v1/file/images/ui-bg_flat_0_aaaaaa_40x100.png")/*{bgImgUrlOverlay}*/ 50%/*{bgOverlayXPos}*/ 50%/*{bgOverlayYPos}*/ repeat-x/*{bgOverlayRepeat}*/;\nopacity: .3/*{opacityOverlay}*/;\nfilter: Alpha(Opacity=30)/*{opacityFilterOverlay}*/; /* support: IE8 */\n}\n.ui-widget-shadow {\nmargin: -8px/*{offsetTopShadow}*/ 0 0 -8px/*{offsetLeftShadow}*/;\npadding: 8px/*{thicknessShadow}*/;\nbackground: #aaaaaa/*{bgColorShadow}*/ url("/core/v1/file/images/ui-bg_flat_0_aaaaaa_40x100.png")/*{bgImgUrlShadow}*/ 50%/*{bgShadowXPos}*/ 50%/*{bgShadowYPos}*/ repeat-x/*{bgShadowRepeat}*/;\nopacity: .3/*{opacityShadow}*/;\nfilter: Alpha(Opacity=30)/*{opacityFilterShadow}*/; /* support: IE8 */\nborder-radius: 8px/*{cornerRadiusShadow}*/;\n}\n/*!\n* jQuery UI CSS Framework @VERSION\n* http://jqueryui.com\n*\n* Copyright 2014 jQuery Foundation and other contributors\n* Released under the MIT license.\n* http://jquery.org/license\n*\n* http://api.jqueryui.com/category/theming/\n*/\n/* Layout helpers\n----------------------------------*/\n.ui-helper-hidden {\ndisplay: none;\n}\n.ui-helper-hidden-accessible {\nborder: 0;\nclip: rect(0 0 0 0);\nheight: 1px;\nmargin: -1px;\noverflow: hidden;\npadding: 0;\nposition: absolute;\nwidth: 1px;\n}\n.ui-helper-reset {\nmargin: 0;\npadding: 0;\nborder: 0;\noutline: 0;\nline-height: 1.3;\ntext-decoration: none;\nfont-size: 100%;\nlist-style: none;\n}\n.ui-helper-clearfix:before,\n.ui-helper-clearfix:after {\ncontent: "";\ndisplay: table;\nborder-collapse: collapse;\n}\n.ui-helper-clearfix:after {\nclear: both;\n}\n.ui-helper-clearfix {\nmin-height: 0; /* support: IE7 */\n}\n.ui-helper-zfix {\nwidth: 100%;\nheight: 100%;\ntop: 0;\nleft: 0;\nposition: absolute;\nopacity: 0;\nfilter:Alpha(Opacity=0); /* support: IE8 */\n}\n.ui-front {\nz-index: 100;\n}\n/* Interaction Cues\n----------------------------------*/\n.ui-state-disabled {\ncursor: default !important;\n}\n/* Icons\n----------------------------------*/\n/* states and images */\n.ui-icon {\ndisplay: block;\ntext-indent: -99999px;\noverflow: hidden;\nbackground-repeat: no-repeat;\n}\n/* Misc visuals\n----------------------------------*/\n/* Overlays */\n.ui-widget-overlay {\nposition: fixed;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\n}\n'
      }, component = {};
    component.exports = { noCssTransform: true };
    if (typeof component.exports === 'object') {
      for (var __prop__ in component.exports) {
        if (component.exports.hasOwnProperty(__prop__)) {
          __options__[__prop__] = component.exports[__prop__];
        }
      }
    }
    return Ractive.extend(__options__);
  }({}, ractive);
  rvc_datepicker = function (require, Ractive, _import_0) {
    var __options__ = {
        template: {
          v: 1,
          t: [
            {
              t: 7,
              e: 'jquery-ui',
              f: []
            },
            ' ',
            {
              t: 7,
              e: 'input',
              a: {
                id: [{
                    t: 2,
                    r: 'id'
                  }],
                'class': [{
                    t: 2,
                    r: 'class'
                  }],
                placeholder: [{
                    t: 2,
                    r: 'placeholder'
                  }],
                value: [{
                    t: 2,
                    r: 'value'
                  }]
              },
              o: 'picker'
            }
          ]
        },
        css: '/*!\n* jQuery UI Datepicker @VERSION\n* http://jqueryui.com\n*\n* Copyright 2014 jQuery Foundation and other contributors\n* Released under the MIT license.\n* http://jquery.org/license\n*\n* http://api.jqueryui.com/datepicker/#theming\n*/\n.ui-datepicker {\nwidth: 17em;\npadding: .2em .2em 0;\ndisplay: none;\n}\n.ui-datepicker .ui-datepicker-header {\nposition: relative;\npadding: .2em 0;\n}\n.ui-datepicker .ui-datepicker-prev,\n.ui-datepicker .ui-datepicker-next {\nposition: absolute;\ntop: 2px;\nwidth: 1.8em;\nheight: 1.8em;\n}\n.ui-datepicker .ui-datepicker-prev-hover,\n.ui-datepicker .ui-datepicker-next-hover {\ntop: 1px;\n}\n.ui-datepicker .ui-datepicker-prev {\nleft: 2px;\n}\n.ui-datepicker .ui-datepicker-next {\nright: 2px;\n}\n.ui-datepicker .ui-datepicker-prev-hover {\nleft: 1px;\n}\n.ui-datepicker .ui-datepicker-next-hover {\nright: 1px;\n}\n.ui-datepicker .ui-datepicker-prev span,\n.ui-datepicker .ui-datepicker-next span {\ndisplay: block;\nposition: absolute;\nleft: 50%;\nmargin-left: -8px;\ntop: 50%;\nmargin-top: -8px;\n}\n.ui-datepicker .ui-datepicker-title {\nmargin: 0 2.3em;\nline-height: 1.8em;\ntext-align: center;\n}\n.ui-datepicker .ui-datepicker-title select {\nfont-size: 1em;\nmargin: 1px 0;\n}\n.ui-datepicker select.ui-datepicker-month,\n.ui-datepicker select.ui-datepicker-year {\nwidth: 45%;\n}\n.ui-datepicker table {\nwidth: 100%;\nfont-size: .9em;\nborder-collapse: collapse;\nmargin: 0 0 .4em;\n}\n.ui-datepicker th {\npadding: .7em .3em;\ntext-align: center;\nfont-weight: bold;\nborder: 0;\n}\n.ui-datepicker td {\nborder: 0;\npadding: 1px;\n}\n.ui-datepicker td span,\n.ui-datepicker td a {\ndisplay: block;\npadding: .2em;\ntext-align: right;\ntext-decoration: none;\n}\n.ui-datepicker .ui-datepicker-buttonpane {\nbackground-image: none;\nmargin: .7em 0 0 0;\npadding: 0 .2em;\nborder-left: 0;\nborder-right: 0;\nborder-bottom: 0;\n}\n.ui-datepicker .ui-datepicker-buttonpane button {\nfloat: right;\nmargin: .5em .2em .4em;\ncursor: pointer;\npadding: .2em .6em .3em .6em;\nwidth: auto;\noverflow: visible;\n}\n.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current {\nfloat: left;\n}\n/* with multiple calendars */\n.ui-datepicker.ui-datepicker-multi {\nwidth: auto;\n}\n.ui-datepicker-multi .ui-datepicker-group {\nfloat: left;\n}\n.ui-datepicker-multi .ui-datepicker-group table {\nwidth: 95%;\nmargin: 0 auto .4em;\n}\n.ui-datepicker-multi-2 .ui-datepicker-group {\nwidth: 50%;\n}\n.ui-datepicker-multi-3 .ui-datepicker-group {\nwidth: 33.3%;\n}\n.ui-datepicker-multi-4 .ui-datepicker-group {\nwidth: 25%;\n}\n.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,\n.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header {\nborder-left-width: 0;\n}\n.ui-datepicker-multi .ui-datepicker-buttonpane {\nclear: left;\n}\n.ui-datepicker-row-break {\nclear: both;\nwidth: 100%;\nfont-size: 0;\n}\n/* RTL support */\n.ui-datepicker-rtl {\ndirection: rtl;\n}\n.ui-datepicker-rtl .ui-datepicker-prev {\nright: 2px;\nleft: auto;\n}\n.ui-datepicker-rtl .ui-datepicker-next {\nleft: 2px;\nright: auto;\n}\n.ui-datepicker-rtl .ui-datepicker-prev:hover {\nright: 1px;\nleft: auto;\n}\n.ui-datepicker-rtl .ui-datepicker-next:hover {\nleft: 1px;\nright: auto;\n}\n.ui-datepicker-rtl .ui-datepicker-buttonpane {\nclear: right;\n}\n.ui-datepicker-rtl .ui-datepicker-buttonpane button {\nfloat: left;\n}\n.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current,\n.ui-datepicker-rtl .ui-datepicker-group {\nfloat: right;\n}\n.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header,\n.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header {\nborder-right-width: 0;\nborder-left-width: 1px;\n}',
        components: { 'jquery-ui': _import_0 }
      }, component = {};
    component.exports = {
      data: { value: '' },
      noCssTransform: true,
      decorators: {
        picker: function (node) {
          var r = this;
          $(node).datepicker({
            onSelect: function (value) {
              r.updateModel();
            }
          });
          return {
            teardown: function () {
              $(node).datepicker('destroy');
            }
          };
        }
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
  }({}, ractive, rvc_jquery_ui);
  /*!
   * jQuery UI Core @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_core = function (jquery) {
        return typeof factory === 'function' ? factory(jquery) : factory;
      }(jquery);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    // $.ui might exist from components with no dependencies, e.g., $.ui.position
    $.ui = $.ui || {};
    $.extend($.ui, {
      version: '@VERSION',
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    });
    // plugins
    $.fn.extend({
      scrollParent: function (includeHidden) {
        var position = this.css('position'), excludeStaticParent = position === 'absolute', overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/, scrollParent = this.parents().filter(function () {
            var parent = $(this);
            if (excludeStaticParent && parent.css('position') === 'static') {
              return false;
            }
            return overflowRegex.test(parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x'));
          }).eq(0);
        return position === 'fixed' || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
      },
      uniqueId: function () {
        var uuid = 0;
        return function () {
          return this.each(function () {
            if (!this.id) {
              this.id = 'ui-id-' + ++uuid;
            }
          });
        };
      }(),
      removeUniqueId: function () {
        return this.each(function () {
          if (/^ui-id-\d+$/.test(this.id)) {
            $(this).removeAttr('id');
          }
        });
      }
    });
    // selectors
    function focusable(element, isTabIndexNotNaN) {
      var map, mapName, img, nodeName = element.nodeName.toLowerCase();
      if ('area' === nodeName) {
        map = element.parentNode;
        mapName = map.name;
        if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
          return false;
        }
        img = $('img[usemap=\'#' + mapName + '\']')[0];
        return !!img && visible(img);
      }
      return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && // the element and all of its ancestors must be visible
      visible(element);
    }
    function visible(element) {
      return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
        return $.css(this, 'visibility') === 'hidden';
      }).length;
    }
    $.extend($.expr[':'], {
      data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
        return function (elem) {
          return !!$.data(elem, dataName);
        };
      }) : // support: jQuery <1.8
      function (elem, i, match) {
        return !!$.data(elem, match[3]);
      },
      focusable: function (element) {
        return focusable(element, !isNaN($.attr(element, 'tabindex')));
      },
      tabbable: function (element) {
        var tabIndex = $.attr(element, 'tabindex'), isTabIndexNaN = isNaN(tabIndex);
        return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
      }
    });
    // support: jQuery <1.8
    if (!$('<a>').outerWidth(1).jquery) {
      $.each([
        'Width',
        'Height'
      ], function (i, name) {
        var side = name === 'Width' ? [
            'Left',
            'Right'
          ] : [
            'Top',
            'Bottom'
          ], type = name.toLowerCase(), orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
          };
        function reduce(elem, size, border, margin) {
          $.each(side, function () {
            size -= parseFloat($.css(elem, 'padding' + this)) || 0;
            if (border) {
              size -= parseFloat($.css(elem, 'border' + this + 'Width')) || 0;
            }
            if (margin) {
              size -= parseFloat($.css(elem, 'margin' + this)) || 0;
            }
          });
          return size;
        }
        $.fn['inner' + name] = function (size) {
          if (size === undefined) {
            return orig['inner' + name].call(this);
          }
          return this.each(function () {
            $(this).css(type, reduce(this, size) + 'px');
          });
        };
        $.fn['outer' + name] = function (size, margin) {
          if (typeof size !== 'number') {
            return orig['outer' + name].call(this, size);
          }
          return this.each(function () {
            $(this).css(type, reduce(this, size, true, margin) + 'px');
          });
        };
      });
    }
    // support: jQuery <1.8
    if (!$.fn.addBack) {
      $.fn.addBack = function (selector) {
        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
      };
    }
    // support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
    if ($('<a>').data('a-b', 'a').removeData('a-b').data('a-b')) {
      $.fn.removeData = function (removeData) {
        return function (key) {
          if (arguments.length) {
            return removeData.call(this, $.camelCase(key));
          } else {
            return removeData.call(this);
          }
        };
      }($.fn.removeData);
    }
    // deprecated
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    $.fn.extend({
      focus: function (orig) {
        return function (delay, fn) {
          return typeof delay === 'number' ? this.each(function () {
            var elem = this;
            setTimeout(function () {
              $(elem).focus();
              if (fn) {
                fn.call(elem);
              }
            }, delay);
          }) : orig.apply(this, arguments);
        };
      }($.fn.focus),
      disableSelection: function () {
        var eventType = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown';
        return function () {
          return this.bind(eventType + '.ui-disableSelection', function (event) {
            event.preventDefault();
          });
        };
      }(),
      enableSelection: function () {
        return this.unbind('.ui-disableSelection');
      },
      zIndex: function (zIndex) {
        if (zIndex !== undefined) {
          return this.css('zIndex', zIndex);
        }
        if (this.length) {
          var elem = $(this[0]), position, value;
          while (elem.length && elem[0] !== document) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = elem.css('position');
            if (position === 'absolute' || position === 'relative' || position === 'fixed') {
              // IE returns 0 when zIndex is not specified
              // other browsers return a string
              // we ignore the case of nested elements with an explicit value of 0
              // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
              value = parseInt(elem.css('zIndex'), 10);
              if (!isNaN(value) && value !== 0) {
                return value;
              }
            }
            elem = elem.parent();
          }
        }
        return 0;
      }
    });
    // $.ui.plugin is deprecated. Use $.widget() extensions instead.
    $.ui.plugin = {
      add: function (module, option, set) {
        var i, proto = $.ui[module].prototype;
        for (i in set) {
          proto.plugins[i] = proto.plugins[i] || [];
          proto.plugins[i].push([
            option,
            set[i]
          ]);
        }
      },
      call: function (instance, name, args, allowDisconnected) {
        var i, set = instance.plugins[name];
        if (!set) {
          return;
        }
        if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
          return;
        }
        for (i = 0; i < set.length; i++) {
          if (instance.options[set[i][0]]) {
            set[i][1].apply(instance.element, args);
          }
        }
      }
    };
  }));
  /*!
   * jQuery UI Datepicker @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/datepicker/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_datepicker = function (jquery, lib_jquery_ui_core) {
        return typeof factory === 'function' ? factory(jquery, lib_jquery_ui_core) : factory;
      }(jquery, lib_jquery_ui_core);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    $.extend($.ui, { datepicker: { version: '@VERSION' } });
    var datepicker_instActive;
    function datepicker_getZindex(elem) {
      var position, value;
      while (elem.length && elem[0] !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        position = elem.css('position');
        if (position === 'absolute' || position === 'relative' || position === 'fixed') {
          // IE returns 0 when zIndex is not specified
          // other browsers return a string
          // we ignore the case of nested elements with an explicit value of 0
          // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt(elem.css('zIndex'), 10);
          if (!isNaN(value) && value !== 0) {
            return value;
          }
        }
        elem = elem.parent();
      }
      return 0;
    }
    /* Date picker manager.
     Use the singleton instance of this class, $.datepicker, to interact with the date picker.
     Settings for (groups of) date pickers are maintained in an instance object,
     allowing multiple different settings on the same page. */
    function Datepicker() {
      this._curInst = null;
      // The current instance in use
      this._keyEvent = false;
      // If the last event was a key event
      this._disabledInputs = [];
      // List of date picker inputs that have been disabled
      this._datepickerShowing = false;
      // True if the popup picker is showing , false if not
      this._inDialog = false;
      // True if showing within a "dialog", false if not
      this._mainDivId = 'ui-datepicker-div';
      // The ID of the main datepicker division
      this._inlineClass = 'ui-datepicker-inline';
      // The name of the inline marker class
      this._appendClass = 'ui-datepicker-append';
      // The name of the append marker class
      this._triggerClass = 'ui-datepicker-trigger';
      // The name of the trigger marker class
      this._dialogClass = 'ui-datepicker-dialog';
      // The name of the dialog marker class
      this._disableClass = 'ui-datepicker-disabled';
      // The name of the disabled covering marker class
      this._unselectableClass = 'ui-datepicker-unselectable';
      // The name of the unselectable cell marker class
      this._currentClass = 'ui-datepicker-current-day';
      // The name of the current day marker class
      this._dayOverClass = 'ui-datepicker-days-cell-over';
      // The name of the day hover marker class
      this.regional = [];
      // Available regional settings, indexed by language code
      this.regional[''] = {
        // Default regional settings
        closeText: 'Done',
        // Display text for close link
        prevText: 'Prev',
        // Display text for previous month link
        nextText: 'Next',
        // Display text for next month link
        currentText: 'Today',
        // Display text for current month link
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        // Names of months for drop-down and formatting
        monthNamesShort: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        // For formatting
        dayNames: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        // For formatting
        dayNamesShort: [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ],
        // For formatting
        dayNamesMin: [
          'Su',
          'Mo',
          'Tu',
          'We',
          'Th',
          'Fr',
          'Sa'
        ],
        // Column headings for days starting at Sunday
        weekHeader: 'Wk',
        // Column header for week of the year
        dateFormat: 'mm/dd/yy',
        // See format options on parseDate
        firstDay: 0,
        // The first day of the week, Sun = 0, Mon = 1, ...
        isRTL: false,
        // True if right-to-left language, false if left-to-right
        showMonthAfterYear: false,
        // True if the year select precedes month, false for month then year
        yearSuffix: ''  // Additional text to append to the year in the month headers
      };
      this._defaults = {
        // Global defaults for all the date picker instances
        showOn: 'focus',
        // "focus" for popup on focus,
        // "button" for trigger button, or "both" for either
        showAnim: 'fadeIn',
        // Name of jQuery animation for popup
        showOptions: {},
        // Options for enhanced animations
        defaultDate: null,
        // Used when field is blank: actual date,
        // +/-number for offset from today, null for today
        appendText: '',
        // Display text following the input box, e.g. showing the format
        buttonText: '...',
        // Text for trigger button
        buttonImage: '',
        // URL for trigger button image
        buttonImageOnly: false,
        // True if the image appears alone, false if it appears on a button
        hideIfNoPrevNext: false,
        // True to hide next/previous month links
        // if not applicable, false to just disable them
        navigationAsDateFormat: false,
        // True if date formatting applied to prev/today/next links
        gotoCurrent: false,
        // True if today link goes back to current selection instead
        changeMonth: false,
        // True if month can be selected directly, false if only prev/next
        changeYear: false,
        // True if year can be selected directly, false if only prev/next
        yearRange: 'c-10:c+10',
        // Range of years to display in drop-down,
        // either relative to today's year (-nn:+nn), relative to currently displayed year
        // (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
        showOtherMonths: false,
        // True to show dates in other months, false to leave blank
        selectOtherMonths: false,
        // True to allow selection of dates in other months, false for unselectable
        showWeek: false,
        // True to show week of the year, false to not show it
        calculateWeek: this.iso8601Week,
        // How to calculate the week of the year,
        // takes a Date and returns the number of the week for it
        shortYearCutoff: '+10',
        // Short year values < this are in the current century,
        // > this are in the previous century,
        // string value starting with "+" for current year + value
        minDate: null,
        // The earliest selectable date, or null for no limit
        maxDate: null,
        // The latest selectable date, or null for no limit
        duration: 'fast',
        // Duration of display/closure
        beforeShowDay: null,
        // Function that takes a date and returns an array with
        // [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
        // [2] = cell title (optional), e.g. $.datepicker.noWeekends
        beforeShow: null,
        // Function that takes an input field and
        // returns a set of custom settings for the date picker
        onSelect: null,
        // Define a callback function when a date is selected
        onChangeMonthYear: null,
        // Define a callback function when the month or year is changed
        onClose: null,
        // Define a callback function when the datepicker is closed
        numberOfMonths: 1,
        // Number of months to show at a time
        showCurrentAtPos: 0,
        // The position in multipe months at which to show the current month (starting at 0)
        stepMonths: 1,
        // Number of months to step back/forward
        stepBigMonths: 12,
        // Number of months to step back/forward for the big links
        altField: '',
        // Selector for an alternate field to store selected dates into
        altFormat: '',
        // The date format to use for the alternate field
        constrainInput: true,
        // The input is constrained by the current date format
        showButtonPanel: false,
        // True to show button panel, false to not show it
        autoSize: false,
        // True to size the input for the date format, false to leave as is
        disabled: false  // The initial disabled state
      };
      $.extend(this._defaults, this.regional['']);
      this.regional.en = $.extend(true, {}, this.regional['']);
      this.regional['en-US'] = $.extend(true, {}, this.regional.en);
      this.dpDiv = datepicker_bindHover($('<div id=\'' + this._mainDivId + '\' class=\'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'));
    }
    $.extend(Datepicker.prototype, {
      /* Class name added to elements to indicate already configured with a date picker. */
      markerClassName: 'hasDatepicker',
      //Keep track of the maximum number of rows displayed (see #7043)
      maxRows: 4,
      // TODO rename to "widget" when switching to widget factory
      _widgetDatepicker: function () {
        return this.dpDiv;
      },
      /* Override the default settings for all instances of the date picker.
      * @param  settings  object - the new settings to use as defaults (anonymous object)
      * @return the manager object
      */
      setDefaults: function (settings) {
        datepicker_extendRemove(this._defaults, settings || {});
        return this;
      },
      /* Attach the date picker to a jQuery selection.
      * @param  target	element - the target input field or division or span
      * @param  settings  object - the new settings to use for this date picker instance (anonymous)
      */
      _attachDatepicker: function (target, settings) {
        var nodeName, inline, inst;
        nodeName = target.nodeName.toLowerCase();
        inline = nodeName === 'div' || nodeName === 'span';
        if (!target.id) {
          this.uuid += 1;
          target.id = 'dp' + this.uuid;
        }
        inst = this._newInst($(target), inline);
        inst.settings = $.extend({}, settings || {});
        if (nodeName === 'input') {
          this._connectDatepicker(target, inst);
        } else if (inline) {
          this._inlineDatepicker(target, inst);
        }
      },
      /* Create a new instance object. */
      _newInst: function (target, inline) {
        var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, '\\\\$1');
        // escape jQuery meta chars
        return {
          id: id,
          input: target,
          // associated target
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          // current selection
          drawMonth: 0,
          drawYear: 0,
          // month being drawn
          inline: inline,
          // is datepicker inline or not
          dpDiv: !inline ? this.dpDiv : // presentation div
          datepicker_bindHover($('<div class=\'' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'))
        };
      },
      /* Attach the date picker to an input field. */
      _connectDatepicker: function (target, inst) {
        var input = $(target);
        inst.append = $([]);
        inst.trigger = $([]);
        if (input.hasClass(this.markerClassName)) {
          return;
        }
        this._attachments(input, inst);
        input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
        this._autoSize(inst);
        $.data(target, 'datepicker', inst);
        //If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
        if (inst.settings.disabled) {
          this._disableDatepicker(target);
        }
      },
      /* Make attachments based on settings. */
      _attachments: function (input, inst) {
        var showOn, buttonText, buttonImage, appendText = this._get(inst, 'appendText'), isRTL = this._get(inst, 'isRTL');
        if (inst.append) {
          inst.append.remove();
        }
        if (appendText) {
          inst.append = $('<span class=\'' + this._appendClass + '\'>' + appendText + '</span>');
          input[isRTL ? 'before' : 'after'](inst.append);
        }
        input.unbind('focus', this._showDatepicker);
        if (inst.trigger) {
          inst.trigger.remove();
        }
        showOn = this._get(inst, 'showOn');
        if (showOn === 'focus' || showOn === 'both') {
          // pop-up date picker when in the marked field
          input.focus(this._showDatepicker);
        }
        if (showOn === 'button' || showOn === 'both') {
          // pop-up date picker when button clicked
          buttonText = this._get(inst, 'buttonText');
          buttonImage = this._get(inst, 'buttonImage');
          inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
            src: buttonImage,
            alt: buttonText,
            title: buttonText
          }) : $('<button type=\'button\'></button>').addClass(this._triggerClass).html(!buttonImage ? buttonText : $('<img/>').attr({
            src: buttonImage,
            alt: buttonText,
            title: buttonText
          })));
          input[isRTL ? 'before' : 'after'](inst.trigger);
          inst.trigger.click(function () {
            if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
              $.datepicker._hideDatepicker();
            } else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
              $.datepicker._hideDatepicker();
              $.datepicker._showDatepicker(input[0]);
            } else {
              $.datepicker._showDatepicker(input[0]);
            }
            return false;
          });
        }
      },
      /* Apply the maximum length for the date format. */
      _autoSize: function (inst) {
        if (this._get(inst, 'autoSize') && !inst.inline) {
          var findMax, max, maxI, i, date = new Date(2009, 12 - 1, 20),
            // Ensure double digits
            dateFormat = this._get(inst, 'dateFormat');
          if (dateFormat.match(/[DM]/)) {
            findMax = function (names) {
              max = 0;
              maxI = 0;
              for (i = 0; i < names.length; i++) {
                if (names[i].length > max) {
                  max = names[i].length;
                  maxI = i;
                }
              }
              return maxI;
            };
            date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort')));
            date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - date.getDay());
          }
          inst.input.attr('size', this._formatDate(inst, date).length);
        }
      },
      /* Attach an inline date picker to a div. */
      _inlineDatepicker: function (target, inst) {
        var divSpan = $(target);
        if (divSpan.hasClass(this.markerClassName)) {
          return;
        }
        divSpan.addClass(this.markerClassName).append(inst.dpDiv);
        $.data(target, 'datepicker', inst);
        this._setDate(inst, this._getDefaultDate(inst), true);
        this._updateDatepicker(inst);
        this._updateAlternate(inst);
        //If disabled option is true, disable the datepicker before showing it (see ticket #5665)
        if (inst.settings.disabled) {
          this._disableDatepicker(target);
        }
        // Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
        // http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
        inst.dpDiv.css('display', 'block');
      },
      /* Pop-up the date picker in a "dialog" box.
      * @param  input element - ignored
      * @param  date	string or Date - the initial date to display
      * @param  onSelect  function - the function to call when a date is selected
      * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
      * @param  pos int[2] - coordinates for the dialog's position within the screen or
      *					event - with x/y coordinates or
      *					leave empty for default (screen centre)
      * @return the manager object
      */
      _dialogDatepicker: function (input, date, onSelect, settings, pos) {
        var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
        // internal instance
        if (!inst) {
          this.uuid += 1;
          id = 'dp' + this.uuid;
          this._dialogInput = $('<input type=\'text\' id=\'' + id + '\' style=\'position: absolute; top: -100px; width: 0px;\'/>');
          this._dialogInput.keydown(this._doKeyDown);
          $('body').append(this._dialogInput);
          inst = this._dialogInst = this._newInst(this._dialogInput, false);
          inst.settings = {};
          $.data(this._dialogInput[0], 'datepicker', inst);
        }
        datepicker_extendRemove(inst.settings, settings || {});
        date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
        this._dialogInput.val(date);
        this._pos = pos ? pos.length ? pos : [
          pos.pageX,
          pos.pageY
        ] : null;
        if (!this._pos) {
          browserWidth = document.documentElement.clientWidth;
          browserHeight = document.documentElement.clientHeight;
          scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
          scrollY = document.documentElement.scrollTop || document.body.scrollTop;
          this._pos = // should use actual width/height below
          [
            browserWidth / 2 - 100 + scrollX,
            browserHeight / 2 - 150 + scrollY
          ];
        }
        // move input on screen for focus, but hidden behind dialog
        this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px');
        inst.settings.onSelect = onSelect;
        this._inDialog = true;
        this.dpDiv.addClass(this._dialogClass);
        this._showDatepicker(this._dialogInput[0]);
        if ($.blockUI) {
          $.blockUI(this.dpDiv);
        }
        $.data(this._dialogInput[0], 'datepicker', inst);
        return this;
      },
      /* Detach a datepicker from its control.
      * @param  target	element - the target input field or division or span
      */
      _destroyDatepicker: function (target) {
        var nodeName, $target = $(target), inst = $.data(target, 'datepicker');
        if (!$target.hasClass(this.markerClassName)) {
          return;
        }
        nodeName = target.nodeName.toLowerCase();
        $.removeData(target, 'datepicker');
        if (nodeName === 'input') {
          inst.append.remove();
          inst.trigger.remove();
          $target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
        } else if (nodeName === 'div' || nodeName === 'span') {
          $target.removeClass(this.markerClassName).empty();
        }
      },
      /* Enable the date picker to a jQuery selection.
      * @param  target	element - the target input field or division or span
      */
      _enableDatepicker: function (target) {
        var nodeName, inline, $target = $(target), inst = $.data(target, 'datepicker');
        if (!$target.hasClass(this.markerClassName)) {
          return;
        }
        nodeName = target.nodeName.toLowerCase();
        if (nodeName === 'input') {
          target.disabled = false;
          inst.trigger.filter('button').each(function () {
            this.disabled = false;
          }).end().filter('img').css({
            opacity: '1.0',
            cursor: ''
          });
        } else if (nodeName === 'div' || nodeName === 'span') {
          inline = $target.children('.' + this._inlineClass);
          inline.children().removeClass('ui-state-disabled');
          inline.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', false);
        }
        this._disabledInputs = $.map(this._disabledInputs, function (value) {
          return value === target ? null : value;
        });  // delete entry
      },
      /* Disable the date picker to a jQuery selection.
      * @param  target	element - the target input field or division or span
      */
      _disableDatepicker: function (target) {
        var nodeName, inline, $target = $(target), inst = $.data(target, 'datepicker');
        if (!$target.hasClass(this.markerClassName)) {
          return;
        }
        nodeName = target.nodeName.toLowerCase();
        if (nodeName === 'input') {
          target.disabled = true;
          inst.trigger.filter('button').each(function () {
            this.disabled = true;
          }).end().filter('img').css({
            opacity: '0.5',
            cursor: 'default'
          });
        } else if (nodeName === 'div' || nodeName === 'span') {
          inline = $target.children('.' + this._inlineClass);
          inline.children().addClass('ui-state-disabled');
          inline.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', true);
        }
        this._disabledInputs = $.map(this._disabledInputs, function (value) {
          return value === target ? null : value;
        });
        // delete entry
        this._disabledInputs[this._disabledInputs.length] = target;
      },
      /* Is the first field in a jQuery collection disabled as a datepicker?
      * @param  target	element - the target input field or division or span
      * @return boolean - true if disabled, false if enabled
      */
      _isDisabledDatepicker: function (target) {
        if (!target) {
          return false;
        }
        for (var i = 0; i < this._disabledInputs.length; i++) {
          if (this._disabledInputs[i] === target) {
            return true;
          }
        }
        return false;
      },
      /* Retrieve the instance data for the target control.
      * @param  target  element - the target input field or division or span
      * @return  object - the associated instance data
      * @throws  error if a jQuery problem getting data
      */
      _getInst: function (target) {
        try {
          return $.data(target, 'datepicker');
        } catch (err) {
          throw 'Missing instance data for this datepicker';
        }
      },
      /* Update or retrieve the settings for a date picker attached to an input field or division.
      * @param  target  element - the target input field or division or span
      * @param  name	object - the new settings to update or
      *				string - the name of the setting to change or retrieve,
      *				when retrieving also "all" for all instance settings or
      *				"defaults" for all global defaults
      * @param  value   any - the new value for the setting
      *				(omit if above is an object or to retrieve a value)
      */
      _optionDatepicker: function (target, name, value) {
        var settings, date, minDate, maxDate, inst = this._getInst(target);
        if (arguments.length === 2 && typeof name === 'string') {
          return name === 'defaults' ? $.extend({}, $.datepicker._defaults) : inst ? name === 'all' ? $.extend({}, inst.settings) : this._get(inst, name) : null;
        }
        settings = name || {};
        if (typeof name === 'string') {
          settings = {};
          settings[name] = value;
        }
        if (inst) {
          if (this._curInst === inst) {
            this._hideDatepicker();
          }
          date = this._getDateDatepicker(target, true);
          minDate = this._getMinMaxDate(inst, 'min');
          maxDate = this._getMinMaxDate(inst, 'max');
          datepicker_extendRemove(inst.settings, settings);
          // reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
          if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
            inst.settings.minDate = this._formatDate(inst, minDate);
          }
          if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
            inst.settings.maxDate = this._formatDate(inst, maxDate);
          }
          if ('disabled' in settings) {
            if (settings.disabled) {
              this._disableDatepicker(target);
            } else {
              this._enableDatepicker(target);
            }
          }
          this._attachments($(target), inst);
          this._autoSize(inst);
          this._setDate(inst, date);
          this._updateAlternate(inst);
          this._updateDatepicker(inst);
        }
      },
      // change method deprecated
      _changeDatepicker: function (target, name, value) {
        this._optionDatepicker(target, name, value);
      },
      /* Redraw the date picker attached to an input field or division.
      * @param  target  element - the target input field or division or span
      */
      _refreshDatepicker: function (target) {
        var inst = this._getInst(target);
        if (inst) {
          this._updateDatepicker(inst);
        }
      },
      /* Set the dates for a jQuery selection.
      * @param  target element - the target input field or division or span
      * @param  date	Date - the new date
      */
      _setDateDatepicker: function (target, date) {
        var inst = this._getInst(target);
        if (inst) {
          this._setDate(inst, date);
          this._updateDatepicker(inst);
          this._updateAlternate(inst);
        }
      },
      /* Get the date(s) for the first entry in a jQuery selection.
      * @param  target element - the target input field or division or span
      * @param  noDefault boolean - true if no default date is to be used
      * @return Date - the current date
      */
      _getDateDatepicker: function (target, noDefault) {
        var inst = this._getInst(target);
        if (inst && !inst.inline) {
          this._setDateFromField(inst, noDefault);
        }
        return inst ? this._getDate(inst) : null;
      },
      /* Handle keystrokes. */
      _doKeyDown: function (event) {
        var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = true, isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
        inst._keyEvent = true;
        if ($.datepicker._datepickerShowing) {
          switch (event.keyCode) {
          case 9:
            $.datepicker._hideDatepicker();
            handled = false;
            break;
          // hide on tab out
          case 13:
            sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', inst.dpDiv);
            if (sel[0]) {
              $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
            }
            onSelect = $.datepicker._get(inst, 'onSelect');
            if (onSelect) {
              dateStr = $.datepicker._formatDate(inst);
              // trigger custom callback
              onSelect.apply(inst.input ? inst.input[0] : null, [
                dateStr,
                inst
              ]);
            } else {
              $.datepicker._hideDatepicker();
            }
            return false;
          // don't submit the form
          case 27:
            $.datepicker._hideDatepicker();
            break;
          // hide on escape
          case 33:
            $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths'), 'M');
            break;
          // previous month/year on page up/+ ctrl
          case 34:
            $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths'), 'M');
            break;
          // next month/year on page down/+ ctrl
          case 35:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._clearDate(event.target);
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          // clear on ctrl or command +end
          case 36:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._gotoToday(event.target);
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          // current on ctrl or command +home
          case 37:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, isRTL ? +1 : -1, 'D');
            }
            handled = event.ctrlKey || event.metaKey;
            // -1 day on ctrl or command +left
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths'), 'M');
            }
            // next month/year on alt +left on Mac
            break;
          case 38:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, -7, 'D');
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          // -1 week on ctrl or command +up
          case 39:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, isRTL ? -1 : +1, 'D');
            }
            handled = event.ctrlKey || event.metaKey;
            // +1 day on ctrl or command +right
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths'), 'M');
            }
            // next month/year on alt +right
            break;
          case 40:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, +7, 'D');
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          // +1 week on ctrl or command +down
          default:
            handled = false;
          }
        } else if (event.keyCode === 36 && event.ctrlKey) {
          // display the date picker on ctrl+home
          $.datepicker._showDatepicker(this);
        } else {
          handled = false;
        }
        if (handled) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      /* Filter entered characters - based on date format. */
      _doKeyPress: function (event) {
        var chars, chr, inst = $.datepicker._getInst(event.target);
        if ($.datepicker._get(inst, 'constrainInput')) {
          chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
          chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
          return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
        }
      },
      /* Synchronise manual entry and field/alternate field. */
      _doKeyUp: function (event) {
        var date, inst = $.datepicker._getInst(event.target);
        if (inst.input.val() !== inst.lastVal) {
          try {
            date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
            if (date) {
              // only if valid
              $.datepicker._setDateFromField(inst);
              $.datepicker._updateAlternate(inst);
              $.datepicker._updateDatepicker(inst);
            }
          } catch (err) {
          }
        }
        return true;
      },
      /* Pop-up the date picker for a given input field.
      * If false returned from beforeShow event handler do not show.
      * @param  input  element - the input field attached to the date picker or
      *					event - if triggered by focus
      */
      _showDatepicker: function (input) {
        input = input.target || input;
        if (input.nodeName.toLowerCase() !== 'input') {
          // find from button/image trigger
          input = $('input', input.parentNode)[0];
        }
        if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
          // already here
          return;
        }
        var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
        inst = $.datepicker._getInst(input);
        if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
          $.datepicker._curInst.dpDiv.stop(true, true);
          if (inst && $.datepicker._datepickerShowing) {
            $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
          }
        }
        beforeShow = $.datepicker._get(inst, 'beforeShow');
        beforeShowSettings = beforeShow ? beforeShow.apply(input, [
          input,
          inst
        ]) : {};
        if (beforeShowSettings === false) {
          return;
        }
        datepicker_extendRemove(inst.settings, beforeShowSettings);
        inst.lastVal = null;
        $.datepicker._lastInput = input;
        $.datepicker._setDateFromField(inst);
        if ($.datepicker._inDialog) {
          // hide cursor
          input.value = '';
        }
        if (!$.datepicker._pos) {
          // position below input
          $.datepicker._pos = $.datepicker._findPos(input);
          $.datepicker._pos[1] += input.offsetHeight;  // add the height
        }
        isFixed = false;
        $(input).parents().each(function () {
          isFixed |= $(this).css('position') === 'fixed';
          return !isFixed;
        });
        offset = {
          left: $.datepicker._pos[0],
          top: $.datepicker._pos[1]
        };
        $.datepicker._pos = null;
        //to avoid flashes on Firefox
        inst.dpDiv.empty();
        // determine sizing offscreen
        inst.dpDiv.css({
          position: 'absolute',
          display: 'block',
          top: '-1000px'
        });
        $.datepicker._updateDatepicker(inst);
        // fix width for dynamic number of date pickers
        // and adjust position before showing
        offset = $.datepicker._checkOffset(inst, offset, isFixed);
        inst.dpDiv.css({
          position: $.datepicker._inDialog && $.blockUI ? 'static' : isFixed ? 'fixed' : 'absolute',
          display: 'none',
          left: offset.left + 'px',
          top: offset.top + 'px'
        });
        if (!inst.inline) {
          showAnim = $.datepicker._get(inst, 'showAnim');
          duration = $.datepicker._get(inst, 'duration');
          inst.dpDiv.css('z-index', datepicker_getZindex($(input)) + 1);
          $.datepicker._datepickerShowing = true;
          if ($.effects && $.effects.effect[showAnim]) {
            inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration);
          } else {
            inst.dpDiv[showAnim || 'show'](showAnim ? duration : null);
          }
          if ($.datepicker._shouldFocusInput(inst)) {
            inst.input.focus();
          }
          $.datepicker._curInst = inst;
        }
      },
      /* Generate the date picker content. */
      _updateDatepicker: function (inst) {
        this.maxRows = 4;
        //Reset the max number of rows being displayed (see #7043)
        datepicker_instActive = inst;
        // for delegate hover events
        inst.dpDiv.empty().append(this._generateHTML(inst));
        this._attachHandlers(inst);
        var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17, activeCell = inst.dpDiv.find('.' + this._dayOverClass + ' a');
        if (activeCell.length > 0) {
          datepicker_handleMouseover.apply(activeCell.get(0));
        }
        inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
        if (cols > 1) {
          inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', width * cols + 'em');
        }
        inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi');
        inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
        if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
          inst.input.focus();
        }
        // deffered render of the years select (to avoid flashes on Firefox)
        if (inst.yearshtml) {
          origyearshtml = inst.yearshtml;
          setTimeout(function () {
            //assure that inst.yearshtml didn't change.
            if (origyearshtml === inst.yearshtml && inst.yearshtml) {
              inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
            }
            origyearshtml = inst.yearshtml = null;
          }, 0);
        }
      },
      // #6694 - don't focus the input if it's already focused
      // this breaks the change event in IE
      // Support: IE and jQuery <1.9
      _shouldFocusInput: function (inst) {
        return inst.input && inst.input.is(':visible') && !inst.input.is(':disabled') && !inst.input.is(':focus');
      },
      /* Check positioning to remain on screen. */
      _checkOffset: function (inst, offset, isFixed) {
        var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
        offset.left -= this._get(inst, 'isRTL') ? dpWidth - inputWidth : 0;
        offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
        offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;
        // now check if datepicker is showing outside window viewport - move to a better place if so.
        offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
        offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);
        return offset;
      },
      /* Find an object's position on the screen. */
      _findPos: function (obj) {
        var position, inst = this._getInst(obj), isRTL = this._get(inst, 'isRTL');
        while (obj && (obj.type === 'hidden' || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
          obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
        }
        position = $(obj).offset();
        return [
          position.left,
          position.top
        ];
      },
      /* Hide the date picker from view.
      * @param  input  element - the input field attached to the date picker
      */
      _hideDatepicker: function (input) {
        var showAnim, duration, postProcess, onClose, inst = this._curInst;
        if (!inst || input && inst !== $.data(input, 'datepicker')) {
          return;
        }
        if (this._datepickerShowing) {
          showAnim = this._get(inst, 'showAnim');
          duration = this._get(inst, 'duration');
          postProcess = function () {
            $.datepicker._tidyDialog(inst);
          };
          // DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
          if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
            inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
          } else {
            inst.dpDiv[showAnim === 'slideDown' ? 'slideUp' : showAnim === 'fadeIn' ? 'fadeOut' : 'hide'](showAnim ? duration : null, postProcess);
          }
          if (!showAnim) {
            postProcess();
          }
          this._datepickerShowing = false;
          onClose = this._get(inst, 'onClose');
          if (onClose) {
            onClose.apply(inst.input ? inst.input[0] : null, [
              inst.input ? inst.input.val() : '',
              inst
            ]);
          }
          this._lastInput = null;
          if (this._inDialog) {
            this._dialogInput.css({
              position: 'absolute',
              left: '0',
              top: '-100px'
            });
            if ($.blockUI) {
              $.unblockUI();
              $('body').append(this.dpDiv);
            }
          }
          this._inDialog = false;
        }
      },
      /* Tidy up after a dialog display. */
      _tidyDialog: function (inst) {
        inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
      },
      /* Close date picker if clicked elsewhere. */
      _checkExternalClick: function (event) {
        if (!$.datepicker._curInst) {
          return;
        }
        var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
        if ($target[0].id !== $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest('.' + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
          $.datepicker._hideDatepicker();
        }
      },
      /* Adjust one of the date sub-fields. */
      _adjustDate: function (id, offset, period) {
        var target = $(id), inst = this._getInst(target[0]);
        if (this._isDisabledDatepicker(target[0])) {
          return;
        }
        this._adjustInstDate(inst, offset + (period === 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
        period);
        this._updateDatepicker(inst);
      },
      /* Action for current link. */
      _gotoToday: function (id) {
        var date, target = $(id), inst = this._getInst(target[0]);
        if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
          inst.selectedDay = inst.currentDay;
          inst.drawMonth = inst.selectedMonth = inst.currentMonth;
          inst.drawYear = inst.selectedYear = inst.currentYear;
        } else {
          date = new Date();
          inst.selectedDay = date.getDate();
          inst.drawMonth = inst.selectedMonth = date.getMonth();
          inst.drawYear = inst.selectedYear = date.getFullYear();
        }
        this._notifyChange(inst);
        this._adjustDate(target);
      },
      /* Action for selecting a new month/year. */
      _selectMonthYear: function (id, select, period) {
        var target = $(id), inst = this._getInst(target[0]);
        inst['selected' + (period === 'M' ? 'Month' : 'Year')] = inst['draw' + (period === 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
        this._notifyChange(inst);
        this._adjustDate(target);
      },
      /* Action for selecting a day. */
      _selectDay: function (id, month, year, td) {
        var inst, target = $(id);
        if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
          return;
        }
        inst = this._getInst(target[0]);
        inst.selectedDay = inst.currentDay = $('a', td).html();
        inst.selectedMonth = inst.currentMonth = month;
        inst.selectedYear = inst.currentYear = year;
        this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
      },
      /* Erase the input field and hide the date picker. */
      _clearDate: function (id) {
        var target = $(id);
        this._selectDate(target, '');
      },
      /* Update the input field with the selected date. */
      _selectDate: function (id, dateStr) {
        var onSelect, target = $(id), inst = this._getInst(target[0]);
        dateStr = dateStr != null ? dateStr : this._formatDate(inst);
        if (inst.input) {
          inst.input.val(dateStr);
        }
        this._updateAlternate(inst);
        onSelect = this._get(inst, 'onSelect');
        if (onSelect) {
          onSelect.apply(inst.input ? inst.input[0] : null, [
            dateStr,
            inst
          ]);  // trigger custom callback
        } else if (inst.input) {
          inst.input.trigger('change');  // fire the change event
        }
        if (inst.inline) {
          this._updateDatepicker(inst);
        } else {
          this._hideDatepicker();
          this._lastInput = inst.input[0];
          if (typeof inst.input[0] !== 'object') {
            inst.input.focus();  // restore focus
          }
          this._lastInput = null;
        }
      },
      /* Update any alternate field to synchronise with the main field. */
      _updateAlternate: function (inst) {
        var altFormat, date, dateStr, altField = this._get(inst, 'altField');
        if (altField) {
          // update alternate field too
          altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
          date = this._getDate(inst);
          dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
          $(altField).each(function () {
            $(this).val(dateStr);
          });
        }
      },
      /* Set as beforeShowDay function to prevent selection of weekends.
      * @param  date  Date - the date to customise
      * @return [boolean, string] - is this date selectable?, what is its CSS class?
      */
      noWeekends: function (date) {
        var day = date.getDay();
        return [
          day > 0 && day < 6,
          ''
        ];
      },
      /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
      * @param  date  Date - the date to get the week for
      * @return  number - the number of the week within the year that contains this date
      */
      iso8601Week: function (date) {
        var time, checkDate = new Date(date.getTime());
        // Find Thursday of this week starting on Monday
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        time = checkDate.getTime();
        checkDate.setMonth(0);
        // Compare with Jan 1
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
      },
      /* Parse a string value into a date object.
      * See formatDate below for the possible formats.
      *
      * @param  format string - the expected format of the date
      * @param  value string - the date in the above format
      * @param  settings Object - attributes include:
      *					shortYearCutoff  number - the cutoff year for determining the century (optional)
      *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
      *					dayNames		string[7] - names of the days from Sunday (optional)
      *					monthNamesShort string[12] - abbreviated names of the months (optional)
      *					monthNames		string[12] - names of the months (optional)
      * @return  Date - the extracted date value or null if value is blank
      */
      parseDate: function (format, value, settings) {
        if (format == null || value == null) {
          throw 'Invalid arguments';
        }
        value = typeof value === 'object' ? value.toString() : value + '';
        if (value === '') {
          return null;
        }
        var iFormat, dim, extra, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = typeof shortYearCutoffTemp !== 'string' ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = false, date,
          // Check whether a format character is doubled
          lookAhead = function (match) {
            var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
              iFormat++;
            }
            return matches;
          },
          // Extract a number from the string value
          getNumber = function (match) {
            var isDoubled = lookAhead(match), size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2, minSize = match === 'y' ? size : 1, digits = new RegExp('^\\d{' + minSize + ',' + size + '}'), num = value.substring(iValue).match(digits);
            if (!num) {
              throw 'Missing number at position ' + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
          },
          // Extract a name from the string value and convert to an index
          getName = function (match, shortNames, longNames) {
            var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                return [[
                    k,
                    v
                  ]];
              }).sort(function (a, b) {
                return -(a[1].length - b[1].length);
              });
            $.each(names, function (i, pair) {
              var name = pair[1];
              if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                index = pair[0];
                iValue += name.length;
                return false;
              }
            });
            if (index !== -1) {
              return index + 1;
            } else {
              throw 'Unknown name at position ' + iValue;
            }
          },
          // Confirm that a literal character matches the string value
          checkLiteral = function () {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
              throw 'Unexpected literal at position ' + iValue;
            }
            iValue++;
          };
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
              literal = false;
            } else {
              checkLiteral();
            }
          } else {
            switch (format.charAt(iFormat)) {
            case 'd':
              day = getNumber('d');
              break;
            case 'D':
              getName('D', dayNamesShort, dayNames);
              break;
            case 'o':
              doy = getNumber('o');
              break;
            case 'm':
              month = getNumber('m');
              break;
            case 'M':
              month = getName('M', monthNamesShort, monthNames);
              break;
            case 'y':
              year = getNumber('y');
              break;
            case '@':
              date = new Date(getNumber('@'));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case '!':
              date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case '\'':
              if (lookAhead('\'')) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
            }
          }
        }
        if (iValue < value.length) {
          extra = value.substr(iValue);
          if (!/^\s+/.test(extra)) {
            throw 'Extra/unparsed characters found in date: ' + extra;
          }
        }
        if (year === -1) {
          year = new Date().getFullYear();
        } else if (year < 100) {
          year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
          month = 1;
          day = doy;
          do {
            dim = this._getDaysInMonth(year, month - 1);
            if (day <= dim) {
              break;
            }
            month++;
            day -= dim;
          } while (true);
        }
        date = this._daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
          throw 'Invalid date';  // E.g. 31/02/00
        }
        return date;
      },
      /* Standard date formats. */
      ATOM: 'yy-mm-dd',
      // RFC 3339 (ISO 8601)
      COOKIE: 'D, dd M yy',
      ISO_8601: 'yy-mm-dd',
      RFC_822: 'D, d M y',
      RFC_850: 'DD, dd-M-y',
      RFC_1036: 'D, d M y',
      RFC_1123: 'D, d M yy',
      RFC_2822: 'D, d M yy',
      RSS: 'D, d M y',
      // RFC 822
      TICKS: '!',
      TIMESTAMP: '@',
      W3C: 'yy-mm-dd',
      // ISO 8601
      _ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,
      /* Format a date object into a string value.
      * The format can be combinations of the following:
      * d  - day of month (no leading zero)
      * dd - day of month (two digit)
      * o  - day of year (no leading zeros)
      * oo - day of year (three digit)
      * D  - day name short
      * DD - day name long
      * m  - month of year (no leading zero)
      * mm - month of year (two digit)
      * M  - month name short
      * MM - month name long
      * y  - year (two digit)
      * yy - year (four digit)
      * @ - Unix timestamp (ms since 01/01/1970)
      * ! - Windows ticks (100ns since 01/01/0001)
      * "..." - literal text
      * '' - single quote
      *
      * @param  format string - the desired format of the date
      * @param  date Date - the date value to format
      * @param  settings Object - attributes include:
      *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
      *					dayNames		string[7] - names of the days from Sunday (optional)
      *					monthNamesShort string[12] - abbreviated names of the months (optional)
      *					monthNames		string[12] - names of the months (optional)
      * @return  string - the date in the above format
      */
      formatDate: function (format, date, settings) {
        if (!date) {
          return '';
        }
        var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
          // Check whether a format character is doubled
          lookAhead = function (match) {
            var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
              iFormat++;
            }
            return matches;
          },
          // Format a number, with leading zero if necessary
          formatNumber = function (match, value, len) {
            var num = '' + value;
            if (lookAhead(match)) {
              while (num.length < len) {
                num = '0' + num;
              }
            }
            return num;
          },
          // Format a name, short or long as requested
          formatName = function (match, value, shortNames, longNames) {
            return lookAhead(match) ? longNames[value] : shortNames[value];
          }, output = '', literal = false;
        if (date) {
          for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
              if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                literal = false;
              } else {
                output += format.charAt(iFormat);
              }
            } else {
              switch (format.charAt(iFormat)) {
              case 'd':
                output += formatNumber('d', date.getDate(), 2);
                break;
              case 'D':
                output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                break;
              case 'o':
                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;
              case 'm':
                output += formatNumber('m', date.getMonth() + 1, 2);
                break;
              case 'M':
                output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                break;
              case 'y':
                output += lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100;
                break;
              case '@':
                output += date.getTime();
                break;
              case '!':
                output += date.getTime() * 10000 + this._ticksTo1970;
                break;
              case '\'':
                if (lookAhead('\'')) {
                  output += '\'';
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
              }
            }
          }
        }
        return output;
      },
      /* Extract all possible characters from the date format. */
      _possibleChars: function (format) {
        var iFormat, chars = '', literal = false,
          // Check whether a format character is doubled
          lookAhead = function (match) {
            var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
            if (matches) {
              iFormat++;
            }
            return matches;
          };
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
              literal = false;
            } else {
              chars += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
            case 'd':
            case 'm':
            case 'y':
            case '@':
              chars += '0123456789';
              break;
            case 'D':
            case 'M':
              return null;
            // Accept anything
            case '\'':
              if (lookAhead('\'')) {
                chars += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              chars += format.charAt(iFormat);
            }
          }
        }
        return chars;
      },
      /* Get a setting value, defaulting if necessary. */
      _get: function (inst, name) {
        return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
      },
      /* Parse existing date and initialise date picker. */
      _setDateFromField: function (inst, noDefault) {
        if (inst.input.val() === inst.lastVal) {
          return;
        }
        var dateFormat = this._get(inst, 'dateFormat'), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
        try {
          date = this.parseDate(dateFormat, dates, settings) || defaultDate;
        } catch (event) {
          dates = noDefault ? '' : dates;
        }
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
        inst.currentDay = dates ? date.getDate() : 0;
        inst.currentMonth = dates ? date.getMonth() : 0;
        inst.currentYear = dates ? date.getFullYear() : 0;
        this._adjustInstDate(inst);
      },
      /* Retrieve the default date shown on opening. */
      _getDefaultDate: function (inst) {
        return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
      },
      /* A date may be specified as an exact value or a relative one. */
      _determineDate: function (inst, date, defaultDate) {
        var offsetNumeric = function (offset) {
            var date = new Date();
            date.setDate(date.getDate() + offset);
            return date;
          }, offsetString = function (offset) {
            try {
              return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst));
            } catch (e) {
            }
            var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset);
            while (matches) {
              switch (matches[2] || 'd') {
              case 'd':
              case 'D':
                day += parseInt(matches[1], 10);
                break;
              case 'w':
              case 'W':
                day += parseInt(matches[1], 10) * 7;
                break;
              case 'm':
              case 'M':
                month += parseInt(matches[1], 10);
                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                break;
              case 'y':
              case 'Y':
                year += parseInt(matches[1], 10);
                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                break;
              }
              matches = pattern.exec(offset);
            }
            return new Date(year, month, day);
          }, newDate = date == null || date === '' ? defaultDate : typeof date === 'string' ? offsetString(date) : typeof date === 'number' ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
        newDate = newDate && newDate.toString() === 'Invalid Date' ? defaultDate : newDate;
        if (newDate) {
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
        }
        return this._daylightSavingAdjust(newDate);
      },
      /* Handle switch to/from daylight saving.
      * Hours may be non-zero on daylight saving cut-over:
      * > 12 when midnight changeover, but then cannot generate
      * midnight datetime, so jump to 1AM, otherwise reset.
      * @param  date  (Date) the date to check
      * @return  (Date) the corrected date
      */
      _daylightSavingAdjust: function (date) {
        if (!date) {
          return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
      },
      /* Set the date(s) directly. */
      _setDate: function (inst, date, noChange) {
        var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
        inst.selectedDay = inst.currentDay = newDate.getDate();
        inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
        inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
        if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
          this._notifyChange(inst);
        }
        this._adjustInstDate(inst);
        if (inst.input) {
          inst.input.val(clear ? '' : this._formatDate(inst));
        }
      },
      /* Retrieve the date(s) directly. */
      _getDate: function (inst) {
        var startDate = !inst.currentYear || inst.input && inst.input.val() === '' ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
        return startDate;
      },
      /* Attach the onxxx handlers.  These are declared statically so
      * they work with static code transformers like Caja.
      */
      _attachHandlers: function (inst) {
        var stepMonths = this._get(inst, 'stepMonths'), id = '#' + inst.id.replace(/\\\\/g, '\\');
        inst.dpDiv.find('[data-handler]').map(function () {
          var handler = {
            prev: function () {
              $.datepicker._adjustDate(id, -stepMonths, 'M');
            },
            next: function () {
              $.datepicker._adjustDate(id, +stepMonths, 'M');
            },
            hide: function () {
              $.datepicker._hideDatepicker();
            },
            today: function () {
              $.datepicker._gotoToday(id);
            },
            selectDay: function () {
              $.datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
              return false;
            },
            selectMonth: function () {
              $.datepicker._selectMonthYear(id, this, 'M');
              return false;
            },
            selectYear: function () {
              $.datepicker._selectMonthYear(id, this, 'Y');
              return false;
            }
          };
          $(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
        });
      },
      /* Generate the HTML for the current state of the date picker. */
      _generateHTML: function (inst) {
        var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(), today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
          // clear time
          isRTL = this._get(inst, 'isRTL'), showButtonPanel = this._get(inst, 'showButtonPanel'), hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext'), navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat'), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, 'showCurrentAtPos'), stepMonths = this._get(inst, 'stepMonths'), isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1, currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)), minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
        if (drawMonth < 0) {
          drawMonth += 12;
          drawYear--;
        }
        if (maxDate) {
          maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
          maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
          while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
            drawMonth--;
            if (drawMonth < 0) {
              drawMonth = 11;
              drawYear--;
            }
          }
        }
        inst.drawMonth = drawMonth;
        inst.drawYear = drawYear;
        prevText = this._get(inst, 'prevText');
        prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));
        prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class=\'ui-datepicker-prev ui-corner-all\' data-handler=\'prev\' data-event=\'click\'' + ' title=\'' + prevText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '\'>' + prevText + '</span></a>' : hideIfNoPrevNext ? '' : '<a class=\'ui-datepicker-prev ui-corner-all ui-state-disabled\' title=\'' + prevText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '\'>' + prevText + '</span></a>';
        nextText = this._get(inst, 'nextText');
        nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));
        next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class=\'ui-datepicker-next ui-corner-all\' data-handler=\'next\' data-event=\'click\'' + ' title=\'' + nextText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '\'>' + nextText + '</span></a>' : hideIfNoPrevNext ? '' : '<a class=\'ui-datepicker-next ui-corner-all ui-state-disabled\' title=\'' + nextText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '\'>' + nextText + '</span></a>';
        currentText = this._get(inst, 'currentText');
        gotoDate = this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today;
        currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));
        controls = !inst.inline ? '<button type=\'button\' class=\'ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all\' data-handler=\'hide\' data-event=\'click\'>' + this._get(inst, 'closeText') + '</button>' : '';
        buttonPanel = showButtonPanel ? '<div class=\'ui-datepicker-buttonpane ui-widget-content\'>' + (isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type=\'button\' class=\'ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all\' data-handler=\'today\' data-event=\'click\'' + '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
        firstDay = parseInt(this._get(inst, 'firstDay'), 10);
        firstDay = isNaN(firstDay) ? 0 : firstDay;
        showWeek = this._get(inst, 'showWeek');
        dayNames = this._get(inst, 'dayNames');
        dayNamesMin = this._get(inst, 'dayNamesMin');
        monthNames = this._get(inst, 'monthNames');
        monthNamesShort = this._get(inst, 'monthNamesShort');
        beforeShowDay = this._get(inst, 'beforeShowDay');
        showOtherMonths = this._get(inst, 'showOtherMonths');
        selectOtherMonths = this._get(inst, 'selectOtherMonths');
        defaultDate = this._getDefaultDate(inst);
        html = '';
        dow;
        for (row = 0; row < numMonths[0]; row++) {
          group = '';
          this.maxRows = 4;
          for (col = 0; col < numMonths[1]; col++) {
            selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
            cornerClass = ' ui-corner-all';
            calender = '';
            if (isMultiMonth) {
              calender += '<div class=\'ui-datepicker-group';
              if (numMonths[1] > 1) {
                switch (col) {
                case 0:
                  calender += ' ui-datepicker-group-first';
                  cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                  break;
                case numMonths[1] - 1:
                  calender += ' ui-datepicker-group-last';
                  cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                  break;
                default:
                  calender += ' ui-datepicker-group-middle';
                  cornerClass = '';
                  break;
                }
              }
              calender += '\'>';
            }
            calender += '<div class=\'ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '\'>' + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : '') + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
            '</div><table class=\'ui-datepicker-calendar\'><thead>' + '<tr>';
            thead = showWeek ? '<th class=\'ui-datepicker-week-col\'>' + this._get(inst, 'weekHeader') + '</th>' : '';
            for (dow = 0; dow < 7; dow++) {
              // days of the week
              day = (dow + firstDay) % 7;
              thead += '<th scope=\'col\'' + ((dow + firstDay + 6) % 7 >= 5 ? ' class=\'ui-datepicker-week-end\'' : '') + '>' + '<span title=\'' + dayNames[day] + '\'>' + dayNamesMin[day] + '</span></th>';
            }
            calender += thead + '</tr></thead><tbody>';
            daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
            if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
              inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
            }
            leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
            curRows = Math.ceil((leadDays + daysInMonth) / 7);
            // calculate the number of rows to generate
            numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows;
            //If multiple months, use the higher number of rows (see #7043)
            this.maxRows = numRows;
            printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
            for (dRow = 0; dRow < numRows; dRow++) {
              // create date picker rows
              calender += '<tr>';
              tbody = !showWeek ? '' : '<td class=\'ui-datepicker-week-col\'>' + this._get(inst, 'calculateWeek')(printDate) + '</td>';
              for (dow = 0; dow < 7; dow++) {
                // create date picker days
                daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [
                  true,
                  ''
                ];
                otherMonth = printDate.getMonth() !== drawMonth;
                unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
                tbody += '<td class=\'' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (otherMonth ? ' ui-datepicker-other-month' : '') + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? // or defaultDate is current printedDate and defaultDate is selectedDate
                ' ' + this._dayOverClass : '') + (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? ' ' + this._currentClass : '') + (printDate.getTime() === today.getTime() ? ' ui-datepicker-today' : '')) + '\'' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title=\'' + daySettings[2].replace(/'/g, '&#39;') + '\'' : '') + (unselectable ? '' : ' data-handler=\'selectDay\' data-event=\'click\' data-month=\'' + printDate.getMonth() + '\' data-year=\'' + printDate.getFullYear() + '\'') + '>' + (otherMonth && !showOtherMonths ? '&#xa0;' : unselectable ? '<span class=\'ui-state-default\'>' + printDate.getDate() + '</span>' : '<a class=\'ui-state-default' + (printDate.getTime() === today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() === currentDate.getTime() ? ' ui-state-active' : '') + (otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
                '\' href=\'#\'>' + printDate.getDate() + '</a>') + '</td>';
                // display selectable date
                printDate.setDate(printDate.getDate() + 1);
                printDate = this._daylightSavingAdjust(printDate);
              }
              calender += tbody + '</tr>';
            }
            drawMonth++;
            if (drawMonth > 11) {
              drawMonth = 0;
              drawYear++;
            }
            calender += '</tbody></table>' + (isMultiMonth ? '</div>' + (numMonths[0] > 0 && col === numMonths[1] - 1 ? '<div class=\'ui-datepicker-row-break\'></div>' : '') : '');
            group += calender;
          }
          html += group;
        }
        html += buttonPanel;
        inst._keyEvent = false;
        return html;
      },
      /* Generate the month and year header. */
      _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
        var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, 'changeMonth'), changeYear = this._get(inst, 'changeYear'), showMonthAfterYear = this._get(inst, 'showMonthAfterYear'), html = '<div class=\'ui-datepicker-title\'>', monthHtml = '';
        // month selection
        if (secondary || !changeMonth) {
          monthHtml += '<span class=\'ui-datepicker-month\'>' + monthNames[drawMonth] + '</span>';
        } else {
          inMinYear = minDate && minDate.getFullYear() === drawYear;
          inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
          monthHtml += '<select class=\'ui-datepicker-month\' data-handler=\'selectMonth\' data-event=\'change\'>';
          for (month = 0; month < 12; month++) {
            if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
              monthHtml += '<option value=\'' + month + '\'' + (month === drawMonth ? ' selected=\'selected\'' : '') + '>' + monthNamesShort[month] + '</option>';
            }
          }
          monthHtml += '</select>';
        }
        if (!showMonthAfterYear) {
          html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
        }
        // year selection
        if (!inst.yearshtml) {
          inst.yearshtml = '';
          if (secondary || !changeYear) {
            html += '<span class=\'ui-datepicker-year\'>' + drawYear + '</span>';
          } else {
            // determine range of years to display
            years = this._get(inst, 'yearRange').split(':');
            thisYear = new Date().getFullYear();
            determineYear = function (value) {
              var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
              return isNaN(year) ? thisYear : year;
            };
            year = determineYear(years[0]);
            endYear = Math.max(year, determineYear(years[1] || ''));
            year = minDate ? Math.max(year, minDate.getFullYear()) : year;
            endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
            inst.yearshtml += '<select class=\'ui-datepicker-year\' data-handler=\'selectYear\' data-event=\'change\'>';
            for (; year <= endYear; year++) {
              inst.yearshtml += '<option value=\'' + year + '\'' + (year === drawYear ? ' selected=\'selected\'' : '') + '>' + year + '</option>';
            }
            inst.yearshtml += '</select>';
            html += inst.yearshtml;
            inst.yearshtml = null;
          }
        }
        html += this._get(inst, 'yearSuffix');
        if (showMonthAfterYear) {
          html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
        }
        html += '</div>';
        // Close datepicker_header
        return html;
      },
      /* Adjust one of the date sub-fields. */
      _adjustInstDate: function (inst, offset, period) {
        var year = inst.drawYear + (period === 'Y' ? offset : 0), month = inst.drawMonth + (period === 'M' ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === 'D' ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
        if (period === 'M' || period === 'Y') {
          this._notifyChange(inst);
        }
      },
      /* Ensure a date is within any min/max bounds. */
      _restrictMinMax: function (inst, date) {
        var minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), newDate = minDate && date < minDate ? minDate : date;
        return maxDate && newDate > maxDate ? maxDate : newDate;
      },
      /* Notify change of month/year. */
      _notifyChange: function (inst) {
        var onChange = this._get(inst, 'onChangeMonthYear');
        if (onChange) {
          onChange.apply(inst.input ? inst.input[0] : null, [
            inst.selectedYear,
            inst.selectedMonth + 1,
            inst
          ]);
        }
      },
      /* Determine the number of months to show. */
      _getNumberOfMonths: function (inst) {
        var numMonths = this._get(inst, 'numberOfMonths');
        return numMonths == null ? [
          1,
          1
        ] : typeof numMonths === 'number' ? [
          1,
          numMonths
        ] : numMonths;
      },
      /* Determine the current maximum date - ensure no time components are set. */
      _getMinMaxDate: function (inst, minMax) {
        return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
      },
      /* Find the number of days in a given month. */
      _getDaysInMonth: function (year, month) {
        return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
      },
      /* Find the day of the week of the first of a month. */
      _getFirstDayOfMonth: function (year, month) {
        return new Date(year, month, 1).getDay();
      },
      /* Determines if we should allow a "next/prev" month display change. */
      _canAdjustMonth: function (inst, offset, curYear, curMonth) {
        var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
        if (offset < 0) {
          date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
        }
        return this._isInRange(inst, date);
      },
      /* Is the given date in the accepted range? */
      _isInRange: function (inst, date) {
        var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), minYear = null, maxYear = null, years = this._get(inst, 'yearRange');
        if (years) {
          yearSplit = years.split(':');
          currentYear = new Date().getFullYear();
          minYear = parseInt(yearSplit[0], 10);
          maxYear = parseInt(yearSplit[1], 10);
          if (yearSplit[0].match(/[+\-].*/)) {
            minYear += currentYear;
          }
          if (yearSplit[1].match(/[+\-].*/)) {
            maxYear += currentYear;
          }
        }
        return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
      },
      /* Provide the configuration settings for formatting/parsing. */
      _getFormatConfig: function (inst) {
        var shortYearCutoff = this._get(inst, 'shortYearCutoff');
        shortYearCutoff = typeof shortYearCutoff !== 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
        return {
          shortYearCutoff: shortYearCutoff,
          dayNamesShort: this._get(inst, 'dayNamesShort'),
          dayNames: this._get(inst, 'dayNames'),
          monthNamesShort: this._get(inst, 'monthNamesShort'),
          monthNames: this._get(inst, 'monthNames')
        };
      },
      /* Format the given date for display. */
      _formatDate: function (inst, day, month, year) {
        if (!day) {
          inst.currentDay = inst.selectedDay;
          inst.currentMonth = inst.selectedMonth;
          inst.currentYear = inst.selectedYear;
        }
        var date = day ? typeof day === 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
        return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
      }
    });
    /*
     * Bind hover events for datepicker elements.
     * Done via delegate so the binding only occurs once in the lifetime of the parent div.
     * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
     */
    function datepicker_bindHover(dpDiv) {
      var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
      return dpDiv.delegate(selector, 'mouseout', function () {
        $(this).removeClass('ui-state-hover');
        if (this.className.indexOf('ui-datepicker-prev') !== -1) {
          $(this).removeClass('ui-datepicker-prev-hover');
        }
        if (this.className.indexOf('ui-datepicker-next') !== -1) {
          $(this).removeClass('ui-datepicker-next-hover');
        }
      }).delegate(selector, 'mouseover', datepicker_handleMouseover);
    }
    function datepicker_handleMouseover() {
      if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
        $(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
        $(this).addClass('ui-state-hover');
        if (this.className.indexOf('ui-datepicker-prev') !== -1) {
          $(this).addClass('ui-datepicker-prev-hover');
        }
        if (this.className.indexOf('ui-datepicker-next') !== -1) {
          $(this).addClass('ui-datepicker-next-hover');
        }
      }
    }
    /* jQuery extend now ignores nulls! */
    function datepicker_extendRemove(target, props) {
      $.extend(target, props);
      for (var name in props) {
        if (props[name] == null) {
          target[name] = props[name];
        }
      }
      return target;
    }
    /* Invoke the datepicker functionality.
     @param  options  string - a command, optionally followed by additional parameters or
    			Object - settings for attaching new datepicker functionality
     @return  jQuery object */
    $.fn.datepicker = function (options) {
      /* Verify an empty collection wasn't passed - Fixes #6976 */
      if (!this.length) {
        return this;
      }
      /* Initialise the date picker. */
      if (!$.datepicker.initialized) {
        $(document).mousedown($.datepicker._checkExternalClick);
        $.datepicker.initialized = true;
      }
      /* Append datepicker main container to body if not exist. */
      if ($('#' + $.datepicker._mainDivId).length === 0) {
        $('body').append($.datepicker.dpDiv);
      }
      var otherArgs = Array.prototype.slice.call(arguments, 1);
      if (typeof options === 'string' && (options === 'isDisabled' || options === 'getDate' || options === 'widget')) {
        return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
      }
      if (options === 'option' && arguments.length === 2 && typeof arguments[1] === 'string') {
        return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
      }
      return this.each(function () {
        typeof options === 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
      });
    };
    $.datepicker = new Datepicker();
    // singleton instance
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = '@VERSION';
    return $.datepicker;
  }));
  rvc_fileinput = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'span',
              v: { click: 'selectFiles' },
              f: [
                {
                  t: 7,
                  e: 'input',
                  a: {
                    type: 'file',
                    accept: [{
                        t: 2,
                        r: 'accept'
                      }],
                    style: 'display:none'
                  },
                  o: 'fileInput',
                  m: [{
                      t: 4,
                      r: 'multiple',
                      f: ['multiple']
                    }],
                  v: { change: 'setFiles' }
                },
                ' ',
                {
                  t: 2,
                  r: 'yield'
                }
              ]
            }]
        },
        css: ''
      }, component = {};
    component.exports = {
      data: {
        accept: '',
        files: []
      },
      decorators: {
        fileInput: function (node) {
          //this is so I don't have to resort to jquery or searching the dom to find the file input
          // and it guarentees that the file input this component is referring to is the correct one
          // ractive is awesome
          var r = this;
          r.set('inputNode', node);
          return {
            teardown: function () {
              r.set('inputNode', null);
            }
          };
        }
      },
      init: function () {
        var r = this;
        r.on({
          'selectFiles': function (event) {
            var input = r.get('inputNode');
            input.click();
          },
          'setFiles': function (event) {
            var input = r.get('inputNode');
            r.set('files', input.files);
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
  rvc_dropzone = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'dropzone' },
              o: 'dropzone',
              f: [
                {
                  t: 4,
                  n: 50,
                  x: {
                    r: ['mode'],
                    s: '_0==="dragover"'
                  },
                  f: [{
                      t: 7,
                      e: 'div',
                      a: { 'class': 'drop-overlay' },
                      f: [{
                          t: 7,
                          e: 'p',
                          a: { 'class': 'text-center drop-text' },
                          f: ['Drop files here']
                        }]
                    }]
                },
                ' ',
                {
                  t: 2,
                  r: 'yield'
                }
              ]
            }]
        },
        css: '.drop-overlay {\nz-index: 5000;\nposition: absolute;\ntop: 0;\nleft: 0;\nmax-height: 100vh;\nmax-width: 100vw;\nwidth: 100%;\nheight: 100%;\nopacity: .9;\nbackground-color: #fff;\nborder: 5px dashed #555;\nborder-radius: 4px;\n}\n.drop-text {\nfont-size: 4em;\nfont-weight: 700;\nposition: relative;\ntop: 50%;\ntransform: translateY(-50%);\n}\n'
      }, component = {};
    var timer;
    component.exports = {
      data: {
        mode: 'none',
        useParent: false
      },
      decorators: {
        dropzone: function (srcNode) {
          var r = this;
          if (r.get('useParent')) {
            node = srcNode.parentNode;
          } else {
            node = srcNode;
          }
          dragenter = function (e) {
            e.stopPropagation();
            e.preventDefault();
          };
          node.addEventListener('dragenter', dragenter, false);
          dragover = function (e) {
            r.set('mode', 'dragover');
            e.stopPropagation();
            e.preventDefault();
            window.clearTimeout(timer);
          };
          node.addEventListener('dragover', dragover, false);
          drop = function (e) {
            e.stopPropagation();
            e.preventDefault();
            r.set('mode', 'drop');
            r.set('dataTransfer', e.dataTransfer);
            var files = e.dataTransfer.files;
            var goodFiles = [];
            for (var i = 0; i < files.length; i++) {
              if (files[i].size > 0) {
                goodFiles.push(files[i]);
              }
            }
            if (goodFiles.length > 0) {
              r.set('files', goodFiles);
              r.fire('drop', goodFiles);
            }
          };
          node.addEventListener('drop', drop, false);
          var dragleave = function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (timer) {
              window.clearTimeout(timer);
            }
            timer = window.setTimeout(function () {
              r.set('mode', 'none');
            }, 200);
          };
          node.addEventListener('dragleave', dragleave, false);
          return {
            teardown: function () {
              node.removeEventListener('dragenter', dragenter, false);
              node.removeEventListener('dragover', dragover, false);
              node.removeEventListener('drop', drop, false);
              node.removeEventListener('dragleave', dragleave, false);
            }
          };
        }
      },
      init: function () {
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
  /*!
   * jQuery UI Widget @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_widget = function (jquery) {
        return typeof factory === 'function' ? factory(jquery) : factory;
      }(jquery);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    var widget_uuid = 0, widget_slice = Array.prototype.slice;
    $.cleanData = function (orig) {
      return function (elems) {
        var events, elem, i;
        for (i = 0; (elem = elems[i]) != null; i++) {
          try {
            // Only trigger remove when necessary to save time
            events = $._data(elem, 'events');
            if (events && events.remove) {
              $(elem).triggerHandler('remove');
            }  // http://bugs.jquery.com/ticket/8235
          } catch (e) {
          }
        }
        orig(elems);
      };
    }($.cleanData);
    $.widget = function (name, base, prototype) {
      var fullName, existingConstructor, constructor, basePrototype,
        // proxiedPrototype allows the provided prototype to remain unmodified
        // so that it can be used as a mixin for multiple widgets (#8876)
        proxiedPrototype = {}, namespace = name.split('.')[0];
      name = name.split('.')[1];
      fullName = namespace + '-' + name;
      if (!prototype) {
        prototype = base;
        base = $.Widget;
      }
      // create selector for plugin
      $.expr[':'][fullName.toLowerCase()] = function (elem) {
        return !!$.data(elem, fullName);
      };
      $[namespace] = $[namespace] || {};
      existingConstructor = $[namespace][name];
      constructor = $[namespace][name] = function (options, element) {
        // allow instantiation without "new" keyword
        if (!this._createWidget) {
          return new constructor(options, element);
        }
        // allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if (arguments.length) {
          this._createWidget(options, element);
        }
      };
      // extend with the existing constructor to carry over any static properties
      $.extend(constructor, existingConstructor, {
        version: prototype.version,
        // copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend({}, prototype),
        // track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
      });
      basePrototype = new base();
      // we need to make the options hash a property directly on the new instance
      // otherwise we'll modify the options hash on the prototype that we're
      // inheriting from
      basePrototype.options = $.widget.extend({}, basePrototype.options);
      $.each(prototype, function (prop, value) {
        if (!$.isFunction(value)) {
          proxiedPrototype[prop] = value;
          return;
        }
        proxiedPrototype[prop] = function () {
          var _super = function () {
              return base.prototype[prop].apply(this, arguments);
            }, _superApply = function (args) {
              return base.prototype[prop].apply(this, args);
            };
          return function () {
            var __super = this._super, __superApply = this._superApply, returnValue;
            this._super = _super;
            this._superApply = _superApply;
            returnValue = value.apply(this, arguments);
            this._super = __super;
            this._superApply = __superApply;
            return returnValue;
          };
        }();
      });
      constructor.prototype = $.widget.extend(basePrototype, {
        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
      }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      });
      // If this widget is being redefined then we need to find all widgets that
      // are inheriting from it and redefine all of them so that they inherit from
      // the new version of this widget. We're essentially trying to replace one
      // level in the prototype chain.
      if (existingConstructor) {
        $.each(existingConstructor._childConstructors, function (i, child) {
          var childPrototype = child.prototype;
          // redefine the child widget using the same prototype that was
          // originally used, but inherit from the new version of the base
          $.widget(childPrototype.namespace + '.' + childPrototype.widgetName, constructor, child._proto);
        });
        // remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
      } else {
        base._childConstructors.push(constructor);
      }
      $.widget.bridge(name, constructor);
      return constructor;
    };
    $.widget.extend = function (target) {
      var input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length, key, value;
      for (; inputIndex < inputLength; inputIndex++) {
        for (key in input[inputIndex]) {
          value = input[inputIndex][key];
          if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
            // Clone objects
            if ($.isPlainObject(value)) {
              target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : // Don't extend strings, arrays, etc. with objects
              $.widget.extend({}, value);  // Copy everything else by reference
            } else {
              target[key] = value;
            }
          }
        }
      }
      return target;
    };
    $.widget.bridge = function (name, object) {
      var fullName = object.prototype.widgetFullName || name;
      $.fn[name] = function (options) {
        var isMethodCall = typeof options === 'string', args = widget_slice.call(arguments, 1), returnValue = this;
        // allow multiple hashes to be passed on init
        options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
        if (isMethodCall) {
          this.each(function () {
            var methodValue, instance = $.data(this, fullName);
            if (options === 'instance') {
              returnValue = instance;
              return false;
            }
            if (!instance) {
              return $.error('cannot call methods on ' + name + ' prior to initialization; ' + 'attempted to call method \'' + options + '\'');
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
              return $.error('no such method \'' + options + '\' for ' + name + ' widget instance');
            }
            methodValue = instance[options].apply(instance, args);
            if (methodValue !== instance && methodValue !== undefined) {
              returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
              return false;
            }
          });
        } else {
          this.each(function () {
            var instance = $.data(this, fullName);
            if (instance) {
              instance.option(options || {});
              if (instance._init) {
                instance._init();
              }
            } else {
              $.data(this, fullName, new object(options, this));
            }
          });
        }
        return returnValue;
      };
    };
    $.Widget = function () {
    };
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
      widgetName: 'widget',
      widgetEventPrefix: '',
      defaultElement: '<div>',
      options: {
        disabled: false,
        // callbacks
        create: null
      },
      _createWidget: function (options, element) {
        element = $(element || this.defaultElement || this)[0];
        this.element = $(element);
        this.uuid = widget_uuid++;
        this.eventNamespace = '.' + this.widgetName + this.uuid;
        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();
        if (element !== this) {
          $.data(element, this.widgetFullName, this);
          this._on(true, this.element, {
            remove: function (event) {
              if (event.target === element) {
                this.destroy();
              }
            }
          });
          this.document = $(element.style ? // element within the document
          element.ownerDocument : // element is window or document
          element.document || element);
          this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
        }
        this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
        this._create();
        this._trigger('create', null, this._getCreateEventData());
        this._init();
      },
      _getCreateOptions: $.noop,
      _getCreateEventData: $.noop,
      _create: $.noop,
      _init: $.noop,
      destroy: function () {
        this._destroy();
        // we can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element.unbind(this.eventNamespace).removeData(this.widgetFullName)  // support: jquery <1.6.3
                                                                                  // http://bugs.jquery.com/ticket/9413
.removeData($.camelCase(this.widgetFullName));
        this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ' + 'ui-state-disabled');
        // clean up events and states
        this.bindings.unbind(this.eventNamespace);
        this.hoverable.removeClass('ui-state-hover');
        this.focusable.removeClass('ui-state-focus');
      },
      _destroy: $.noop,
      widget: function () {
        return this.element;
      },
      option: function (key, value) {
        var options = key, parts, curOption, i;
        if (arguments.length === 0) {
          // don't return a reference to the internal hash
          return $.widget.extend({}, this.options);
        }
        if (typeof key === 'string') {
          // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
          options = {};
          parts = key.split('.');
          key = parts.shift();
          if (parts.length) {
            curOption = options[key] = $.widget.extend({}, this.options[key]);
            for (i = 0; i < parts.length - 1; i++) {
              curOption[parts[i]] = curOption[parts[i]] || {};
              curOption = curOption[parts[i]];
            }
            key = parts.pop();
            if (arguments.length === 1) {
              return curOption[key] === undefined ? null : curOption[key];
            }
            curOption[key] = value;
          } else {
            if (arguments.length === 1) {
              return this.options[key] === undefined ? null : this.options[key];
            }
            options[key] = value;
          }
        }
        this._setOptions(options);
        return this;
      },
      _setOptions: function (options) {
        var key;
        for (key in options) {
          this._setOption(key, options[key]);
        }
        return this;
      },
      _setOption: function (key, value) {
        this.options[key] = value;
        if (key === 'disabled') {
          this.widget().toggleClass(this.widgetFullName + '-disabled', !!value);
          // If the widget is becoming disabled, then nothing is interactive
          if (value) {
            this.hoverable.removeClass('ui-state-hover');
            this.focusable.removeClass('ui-state-focus');
          }
        }
        return this;
      },
      enable: function () {
        return this._setOptions({ disabled: false });
      },
      disable: function () {
        return this._setOptions({ disabled: true });
      },
      _on: function (suppressDisabledCheck, element, handlers) {
        var delegateElement, instance = this;
        // no suppressDisabledCheck flag, shuffle arguments
        if (typeof suppressDisabledCheck !== 'boolean') {
          handlers = element;
          element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }
        // no element argument, shuffle and use this.element
        if (!handlers) {
          handlers = element;
          element = this.element;
          delegateElement = this.widget();
        } else {
          element = delegateElement = $(element);
          this.bindings = this.bindings.add(element);
        }
        $.each(handlers, function (event, handler) {
          function handlerProxy() {
            // allow widgets to customize the disabled handling
            // - disabled as an array instead of boolean
            // - disabled class as method for disabling individual parts
            if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass('ui-state-disabled'))) {
              return;
            }
            return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
          }
          // copy the guid so direct unbinding works
          if (typeof handler !== 'string') {
            handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
          }
          var match = event.match(/^([\w:-]*)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
          if (selector) {
            delegateElement.delegate(selector, eventName, handlerProxy);
          } else {
            element.bind(eventName, handlerProxy);
          }
        });
      },
      _off: function (element, eventName) {
        eventName = (eventName || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace;
        element.unbind(eventName).undelegate(eventName);
        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $(this.bindings.not(element).get());
        this.focusable = $(this.focusable.not(element).get());
        this.hoverable = $(this.hoverable.not(element).get());
      },
      _delay: function (handler, delay) {
        function handlerProxy() {
          return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
        }
        var instance = this;
        return setTimeout(handlerProxy, delay || 0);
      },
      _hoverable: function (element) {
        this.hoverable = this.hoverable.add(element);
        this._on(element, {
          mouseenter: function (event) {
            $(event.currentTarget).addClass('ui-state-hover');
          },
          mouseleave: function (event) {
            $(event.currentTarget).removeClass('ui-state-hover');
          }
        });
      },
      _focusable: function (element) {
        this.focusable = this.focusable.add(element);
        this._on(element, {
          focusin: function (event) {
            $(event.currentTarget).addClass('ui-state-focus');
          },
          focusout: function (event) {
            $(event.currentTarget).removeClass('ui-state-focus');
          }
        });
      },
      _trigger: function (type, event, data) {
        var prop, orig, callback = this.options[type];
        data = data || {};
        event = $.Event(event);
        event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
        // the original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[0];
        // copy original event properties over to the new event
        orig = event.originalEvent;
        if (orig) {
          for (prop in orig) {
            if (!(prop in event)) {
              event[prop] = orig[prop];
            }
          }
        }
        this.element.trigger(event, data);
        return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
      }
    };
    $.each({
      show: 'fadeIn',
      hide: 'fadeOut'
    }, function (method, defaultEffect) {
      $.Widget.prototype['_' + method] = function (element, options, callback) {
        if (typeof options === 'string') {
          options = { effect: options };
        }
        var hasOptions, effectName = !options ? method : options === true || typeof options === 'number' ? defaultEffect : options.effect || defaultEffect;
        options = options || {};
        if (typeof options === 'number') {
          options = { duration: options };
        }
        hasOptions = !$.isEmptyObject(options);
        options.complete = callback;
        if (options.delay) {
          element.delay(options.delay);
        }
        if (hasOptions && $.effects && $.effects.effect[effectName]) {
          element[method](options);
        } else if (effectName !== method && element[effectName]) {
          element[effectName](options.duration, options.easing, callback);
        } else {
          element.queue(function (next) {
            $(this)[method]();
            if (callback) {
              callback.call(element[0]);
            }
            next();
          });
        }
      };
    });
    return $.widget;
  }));
  /*!
   * jQuery UI Mouse @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/mouse/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_mouse = function (jquery, lib_jquery_ui_widget) {
        return typeof factory === 'function' ? factory(jquery, lib_jquery_ui_widget) : factory;
      }(jquery, lib_jquery_ui_widget);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    var mouseHandled = false;
    $(document).mouseup(function () {
      mouseHandled = false;
    });
    return $.widget('ui.mouse', {
      version: '@VERSION',
      options: {
        cancel: 'input,textarea,button,select,option',
        distance: 1,
        delay: 0
      },
      _mouseInit: function () {
        var that = this;
        this.element.bind('mousedown.' + this.widgetName, function (event) {
          return that._mouseDown(event);
        }).bind('click.' + this.widgetName, function (event) {
          if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
            $.removeData(event.target, that.widgetName + '.preventClickEvent');
            event.stopImmediatePropagation();
            return false;
          }
        });
        this.started = false;
      },
      // TODO: make sure destroying one instance of mouse doesn't mess with
      // other instances of mouse
      _mouseDestroy: function () {
        this.element.unbind('.' + this.widgetName);
        if (this._mouseMoveDelegate) {
          this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
        }
      },
      _mouseDown: function (event) {
        // don't let more than one widget handle mouseStart
        if (mouseHandled) {
          return;
        }
        this._mouseMoved = false;
        // we may have missed mouseup (out of window)
        this._mouseStarted && this._mouseUp(event);
        this._mouseDownEvent = event;
        var that = this, btnIsLeft = event.which === 1,
          // event.target.nodeName works around a bug in IE 8 with
          // disabled inputs (#7620)
          elIsCancel = typeof this.options.cancel === 'string' && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
        if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
          return true;
        }
        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
          this._mouseDelayTimer = setTimeout(function () {
            that.mouseDelayMet = true;
          }, this.options.delay);
        }
        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
          this._mouseStarted = this._mouseStart(event) !== false;
          if (!this._mouseStarted) {
            event.preventDefault();
            return true;
          }
        }
        // Click event may never have fired (Gecko & Opera)
        if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
          $.removeData(event.target, this.widgetName + '.preventClickEvent');
        }
        // these delegates are required to keep context
        this._mouseMoveDelegate = function (event) {
          return that._mouseMove(event);
        };
        this._mouseUpDelegate = function (event) {
          return that._mouseUp(event);
        };
        this.document.bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
        event.preventDefault();
        mouseHandled = true;
        return true;
      },
      _mouseMove: function (event) {
        // Only check for mouseups outside the document if you've moved inside the document
        // at least once. This prevents the firing of mouseup in the case of IE<9, which will
        // fire a mousemove event if content is placed under the cursor. See #7778
        // Support: IE <9
        if (this._mouseMoved) {
          // IE mouseup check - mouseup happened when mouse was out of window
          if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
            return this._mouseUp(event);  // Iframe mouseup check - mouseup occurred in another document
          } else if (!event.which) {
            return this._mouseUp(event);
          }
        }
        if (event.which || event.button) {
          this._mouseMoved = true;
        }
        if (this._mouseStarted) {
          this._mouseDrag(event);
          return event.preventDefault();
        }
        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
          this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false;
          this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
        }
        return !this._mouseStarted;
      },
      _mouseUp: function (event) {
        this.document.unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
        if (this._mouseStarted) {
          this._mouseStarted = false;
          if (event.target === this._mouseDownEvent.target) {
            $.data(event.target, this.widgetName + '.preventClickEvent', true);
          }
          this._mouseStop(event);
        }
        mouseHandled = false;
        return false;
      },
      _mouseDistanceMet: function (event) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      // These are placeholder methods, to be overriden by extending plugin
      _mouseStart: function () {
      },
      _mouseDrag: function () {
      },
      _mouseStop: function () {
      },
      _mouseCapture: function () {
        return true;
      }
    });
  }));
  /*!
   * jQuery UI Draggable @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/draggable/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_draggable = function (jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget) {
        return typeof factory === 'function' ? factory(jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget) : factory;
      }(jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    $.widget('ui.draggable', $.ui.mouse, {
      version: '@VERSION',
      widgetEventPrefix: 'drag',
      options: {
        addClasses: true,
        appendTo: 'parent',
        axis: false,
        connectToSortable: false,
        containment: false,
        cursor: 'auto',
        cursorAt: false,
        grid: false,
        handle: false,
        helper: 'original',
        iframeFix: false,
        opacity: false,
        refreshPositions: false,
        revert: false,
        revertDuration: 500,
        scope: 'default',
        scroll: true,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: false,
        snapMode: 'both',
        snapTolerance: 20,
        stack: false,
        zIndex: false,
        // callbacks
        drag: null,
        start: null,
        stop: null
      },
      _create: function () {
        if (this.options.helper === 'original') {
          this._setPositionRelative();
        }
        if (this.options.addClasses) {
          this.element.addClass('ui-draggable');
        }
        if (this.options.disabled) {
          this.element.addClass('ui-draggable-disabled');
        }
        this._setHandleClassName();
        this._mouseInit();
      },
      _setOption: function (key, value) {
        this._super(key, value);
        if (key === 'handle') {
          this._removeHandleClassName();
          this._setHandleClassName();
        }
      },
      _destroy: function () {
        if ((this.helper || this.element).is('.ui-draggable-dragging')) {
          this.destroyOnClear = true;
          return;
        }
        this.element.removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled');
        this._removeHandleClassName();
        this._mouseDestroy();
      },
      _mouseCapture: function (event) {
        var o = this.options;
        this._blurActiveElement(event);
        // among others, prevent a drag on a resizable-handle
        if (this.helper || o.disabled || $(event.target).closest('.ui-resizable-handle').length > 0) {
          return false;
        }
        //Quit if we're not on a valid handle
        this.handle = this._getHandle(event);
        if (!this.handle) {
          return false;
        }
        this._blockFrames(o.iframeFix === true ? 'iframe' : o.iframeFix);
        return true;
      },
      _blockFrames: function (selector) {
        this.iframeBlocks = this.document.find(selector).map(function () {
          var iframe = $(this);
          return $('<div>').css('position', 'absolute').appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
        });
      },
      _unblockFrames: function () {
        if (this.iframeBlocks) {
          this.iframeBlocks.remove();
          delete this.iframeBlocks;
        }
      },
      _blurActiveElement: function (event) {
        var document = this.document[0];
        // Only need to blur if the event occurred on the draggable itself, see #10527
        if (!this.handleElement.is(event.target)) {
          return;
        }
        // support: IE9
        // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
        try {
          // Support: IE9, IE10
          // If the <body> is blurred, IE will switch windows, see #9520
          if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body') {
            // Blur any element that currently has focus, see #4261
            $(document.activeElement).blur();
          }
        } catch (error) {
        }
      },
      _mouseStart: function (event) {
        var o = this.options;
        //Create and append the visible helper
        this.helper = this._createHelper(event);
        this.helper.addClass('ui-draggable-dragging');
        //Cache the helper size
        this._cacheHelperProportions();
        //If ddmanager is used for droppables, set the global draggable
        if ($.ui.ddmanager) {
          $.ui.ddmanager.current = this;
        }
        /*
         * - Position generation -
         * This block generates everything position related - it's the core of draggables.
         */
        //Cache the margins of the original element
        this._cacheMargins();
        //Store the helper's css position
        this.cssPosition = this.helper.css('position');
        this.scrollParent = this.helper.scrollParent(true);
        this.offsetParent = this.helper.offsetParent();
        this.hasFixedAncestor = this.helper.parents().filter(function () {
          return $(this).css('position') === 'fixed';
        }).length > 0;
        //The element's absolute position on the page minus margins
        this.positionAbs = this.element.offset();
        this._refreshOffsets(event);
        //Generate the original position
        this.originalPosition = this.position = this._generatePosition(event, false);
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;
        //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
        o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
        //Set a containment if given in the options
        this._setContainment();
        //Trigger event + callbacks
        if (this._trigger('start', event) === false) {
          this._clear();
          return false;
        }
        //Recache the helper size
        this._cacheHelperProportions();
        //Prepare the droppable offsets
        if ($.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }
        // Reset helper's right/bottom css if they're set and set explicit width/height instead
        // as this prevents resizing of elements with right/bottom set (see #7772)
        this._normalizeRightBottom();
        this._mouseDrag(event, true);
        //Execute the drag once - this causes the helper not to be visible before getting its correct position
        //If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
        if ($.ui.ddmanager) {
          $.ui.ddmanager.dragStart(this, event);
        }
        return true;
      },
      _refreshOffsets: function (event) {
        this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: false,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        };
        this.offset.click = {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        };
      },
      _mouseDrag: function (event, noPropagation) {
        // reset any necessary cached properties (see #5009)
        if (this.hasFixedAncestor) {
          this.offset.parent = this._getParentOffset();
        }
        //Compute the helpers position
        this.position = this._generatePosition(event, true);
        this.positionAbs = this._convertPositionTo('absolute');
        //Call plugins and callbacks and use the resulting position if something is returned
        if (!noPropagation) {
          var ui = this._uiHash();
          if (this._trigger('drag', event, ui) === false) {
            this._mouseUp({});
            return false;
          }
          this.position = ui.position;
        }
        this.helper[0].style.left = this.position.left + 'px';
        this.helper[0].style.top = this.position.top + 'px';
        if ($.ui.ddmanager) {
          $.ui.ddmanager.drag(this, event);
        }
        return false;
      },
      _mouseStop: function (event) {
        //If we are using droppables, inform the manager about the drop
        var that = this, dropped = false;
        if ($.ui.ddmanager && !this.options.dropBehaviour) {
          dropped = $.ui.ddmanager.drop(this, event);
        }
        //if a drop comes from outside (a sortable)
        if (this.dropped) {
          dropped = this.dropped;
          this.dropped = false;
        }
        if (this.options.revert === 'invalid' && !dropped || this.options.revert === 'valid' && dropped || this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
          $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
            if (that._trigger('stop', event) !== false) {
              that._clear();
            }
          });
        } else {
          if (this._trigger('stop', event) !== false) {
            this._clear();
          }
        }
        return false;
      },
      _mouseUp: function (event) {
        this._unblockFrames();
        //If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
        if ($.ui.ddmanager) {
          $.ui.ddmanager.dragStop(this, event);
        }
        // Only need to focus if the event occurred on the draggable itself, see #10527
        if (this.handleElement.is(event.target)) {
          // The interaction is over; whether or not the click resulted in a drag, focus the element
          this.element.focus();
        }
        return $.ui.mouse.prototype._mouseUp.call(this, event);
      },
      cancel: function () {
        if (this.helper.is('.ui-draggable-dragging')) {
          this._mouseUp({});
        } else {
          this._clear();
        }
        return this;
      },
      _getHandle: function (event) {
        return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
      },
      _setHandleClassName: function () {
        this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
        this.handleElement.addClass('ui-draggable-handle');
      },
      _removeHandleClassName: function () {
        this.handleElement.removeClass('ui-draggable-handle');
      },
      _createHelper: function (event) {
        var o = this.options, helperIsFunction = $.isFunction(o.helper), helper = helperIsFunction ? $(o.helper.apply(this.element[0], [event])) : o.helper === 'clone' ? this.element.clone().removeAttr('id') : this.element;
        if (!helper.parents('body').length) {
          helper.appendTo(o.appendTo === 'parent' ? this.element[0].parentNode : o.appendTo);
        }
        // http://bugs.jqueryui.com/ticket/9446
        // a helper function can return the original element
        // which wouldn't have been set to relative in _create
        if (helperIsFunction && helper[0] === this.element[0]) {
          this._setPositionRelative();
        }
        if (helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css('position'))) {
          helper.css('position', 'absolute');
        }
        return helper;
      },
      _setPositionRelative: function () {
        if (!/^(?:r|a|f)/.test(this.element.css('position'))) {
          this.element[0].style.position = 'relative';
        }
      },
      _adjustOffsetFromHelper: function (obj) {
        if (typeof obj === 'string') {
          obj = obj.split(' ');
        }
        if ($.isArray(obj)) {
          obj = {
            left: +obj[0],
            top: +obj[1] || 0
          };
        }
        if ('left' in obj) {
          this.offset.click.left = obj.left + this.margins.left;
        }
        if ('right' in obj) {
          this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        }
        if ('top' in obj) {
          this.offset.click.top = obj.top + this.margins.top;
        }
        if ('bottom' in obj) {
          this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        }
      },
      _isRootNode: function (element) {
        return /(html|body)/i.test(element.tagName) || element === this.document[0];
      },
      _getParentOffset: function () {
        //Get the offsetParent and cache its position
        var po = this.offsetParent.offset(), document = this.document[0];
        // This is a special case where we need to modify a offset calculated on start, since the following happened:
        // 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
        // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
        //    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
        if (this.cssPosition === 'absolute' && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
          po.left += this.scrollParent.scrollLeft();
          po.top += this.scrollParent.scrollTop();
        }
        if (this._isRootNode(this.offsetParent[0])) {
          po = {
            top: 0,
            left: 0
          };
        }
        return {
          top: po.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
          left: po.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
        };
      },
      _getRelativeOffset: function () {
        if (this.cssPosition !== 'relative') {
          return {
            top: 0,
            left: 0
          };
        }
        var p = this.element.position(), scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
        return {
          top: p.top - (parseInt(this.helper.css('top'), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
          left: p.left - (parseInt(this.helper.css('left'), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css('marginLeft'), 10) || 0,
          top: parseInt(this.element.css('marginTop'), 10) || 0,
          right: parseInt(this.element.css('marginRight'), 10) || 0,
          bottom: parseInt(this.element.css('marginBottom'), 10) || 0
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },
      _setContainment: function () {
        var isUserScrollable, c, ce, o = this.options, document = this.document[0];
        this.relativeContainer = null;
        if (!o.containment) {
          this.containment = null;
          return;
        }
        if (o.containment === 'window') {
          this.containment = [
            $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
            $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
            $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left,
            $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
          ];
          return;
        }
        if (o.containment === 'document') {
          this.containment = [
            0,
            0,
            $(document).width() - this.helperProportions.width - this.margins.left,
            ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
          ];
          return;
        }
        if (o.containment.constructor === Array) {
          this.containment = o.containment;
          return;
        }
        if (o.containment === 'parent') {
          o.containment = this.helper[0].parentNode;
        }
        c = $(o.containment);
        ce = c[0];
        if (!ce) {
          return;
        }
        isUserScrollable = /(scroll|auto)/.test(c.css('overflow'));
        this.containment = [
          (parseInt(c.css('borderLeftWidth'), 10) || 0) + (parseInt(c.css('paddingLeft'), 10) || 0),
          (parseInt(c.css('borderTopWidth'), 10) || 0) + (parseInt(c.css('paddingTop'), 10) || 0),
          (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css('borderRightWidth'), 10) || 0) - (parseInt(c.css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
          (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css('borderBottomWidth'), 10) || 0) - (parseInt(c.css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
        ];
        this.relativeContainer = c;
      },
      _convertPositionTo: function (d, pos) {
        if (!pos) {
          pos = this.position;
        }
        var mod = d === 'absolute' ? 1 : -1, scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
        return {
          top: pos.top + // The absolute mouse position
          this.offset.relative.top * mod + // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.parent.top * mod - (this.cssPosition === 'fixed' ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
          left: pos.left + // The absolute mouse position
          this.offset.relative.left * mod + // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.parent.left * mod - (this.cssPosition === 'fixed' ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
        };
      },
      _generatePosition: function (event, constrainPosition) {
        var containment, co, top, left, o = this.options, scrollIsRootNode = this._isRootNode(this.scrollParent[0]), pageX = event.pageX, pageY = event.pageY;
        // Cache the scroll
        if (!scrollIsRootNode || !this.offset.scroll) {
          this.offset.scroll = {
            top: this.scrollParent.scrollTop(),
            left: this.scrollParent.scrollLeft()
          };
        }
        /*
         * - Position constraining -
         * Constrain the position to a mix of grid, containment.
         */
        // If we are not dragging yet, we won't check for options
        if (constrainPosition) {
          if (this.containment) {
            if (this.relativeContainer) {
              co = this.relativeContainer.offset();
              containment = [
                this.containment[0] + co.left,
                this.containment[1] + co.top,
                this.containment[2] + co.left,
                this.containment[3] + co.top
              ];
            } else {
              containment = this.containment;
            }
            if (event.pageX - this.offset.click.left < containment[0]) {
              pageX = containment[0] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top < containment[1]) {
              pageY = containment[1] + this.offset.click.top;
            }
            if (event.pageX - this.offset.click.left > containment[2]) {
              pageX = containment[2] + this.offset.click.left;
            }
            if (event.pageY - this.offset.click.top > containment[3]) {
              pageY = containment[3] + this.offset.click.top;
            }
          }
          if (o.grid) {
            //Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
            top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
            pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top;
            left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
            pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
          }
          if (o.axis === 'y') {
            pageX = this.originalPageX;
          }
          if (o.axis === 'x') {
            pageY = this.originalPageY;
          }
        }
        return {
          top: pageY - // The absolute mouse position
          this.offset.click.top - // Click offset (relative to the element)
          this.offset.relative.top - // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.parent.top + (this.cssPosition === 'fixed' ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
          left: pageX - // The absolute mouse position
          this.offset.click.left - // Click offset (relative to the element)
          this.offset.relative.left - // Only for relative positioned nodes: Relative offset from element to offset parent
          this.offset.parent.left + (this.cssPosition === 'fixed' ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
        };
      },
      _clear: function () {
        this.helper.removeClass('ui-draggable-dragging');
        if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
          this.helper.remove();
        }
        this.helper = null;
        this.cancelHelperRemoval = false;
        if (this.destroyOnClear) {
          this.destroy();
        }
      },
      _normalizeRightBottom: function () {
        if (this.options.axis !== 'y' && this.helper.css('right') !== 'auto') {
          this.helper.width(this.helper.width());
          this.helper.css('right', 'auto');
        }
        if (this.options.axis !== 'x' && this.helper.css('bottom') !== 'auto') {
          this.helper.height(this.helper.height());
          this.helper.css('bottom', 'auto');
        }
      },
      // From now on bulk stuff - mainly helpers
      _trigger: function (type, event, ui) {
        ui = ui || this._uiHash();
        $.ui.plugin.call(this, type, [
          event,
          ui,
          this
        ], true);
        // Absolute position and offset (see #6884 ) have to be recalculated after plugins
        if (/^(drag|start|stop)/.test(type)) {
          this.positionAbs = this._convertPositionTo('absolute');
          ui.offset = this.positionAbs;
        }
        return $.Widget.prototype._trigger.call(this, type, event, ui);
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs
        };
      }
    });
    $.ui.plugin.add('draggable', 'connectToSortable', {
      start: function (event, ui, draggable) {
        var uiSortable = $.extend({}, ui, { item: draggable.element });
        draggable.sortables = [];
        $(draggable.options.connectToSortable).each(function () {
          var sortable = $(this).sortable('instance');
          if (sortable && !sortable.options.disabled) {
            draggable.sortables.push(sortable);
            // refreshPositions is called at drag start to refresh the containerCache
            // which is used in drag. This ensures it's initialized and synchronized
            // with any changes that might have happened on the page since initialization.
            sortable.refreshPositions();
            sortable._trigger('activate', event, uiSortable);
          }
        });
      },
      stop: function (event, ui, draggable) {
        var uiSortable = $.extend({}, ui, { item: draggable.element });
        draggable.cancelHelperRemoval = false;
        $.each(draggable.sortables, function () {
          var sortable = this;
          if (sortable.isOver) {
            sortable.isOver = 0;
            // Allow this sortable to handle removing the helper
            draggable.cancelHelperRemoval = true;
            sortable.cancelHelperRemoval = false;
            // Use _storedCSS To restore properties in the sortable,
            // as this also handles revert (#9675) since the draggable
            // may have modified them in unexpected ways (#8809)
            sortable._storedCSS = {
              position: sortable.placeholder.css('position'),
              top: sortable.placeholder.css('top'),
              left: sortable.placeholder.css('left')
            };
            sortable._mouseStop(event);
            // Once drag has ended, the sortable should return to using
            // its original helper, not the shared helper from draggable
            sortable.options.helper = sortable.options._helper;
          } else {
            // Prevent this Sortable from removing the helper.
            // However, don't set the draggable to remove the helper
            // either as another connected Sortable may yet handle the removal.
            sortable.cancelHelperRemoval = true;
            sortable._trigger('deactivate', event, uiSortable);
          }
        });
      },
      drag: function (event, ui, draggable) {
        $.each(draggable.sortables, function () {
          var innermostIntersecting = false, sortable = this;
          // Copy over variables that sortable's _intersectsWith uses
          sortable.positionAbs = draggable.positionAbs;
          sortable.helperProportions = draggable.helperProportions;
          sortable.offset.click = draggable.offset.click;
          if (sortable._intersectsWith(sortable.containerCache)) {
            innermostIntersecting = true;
            $.each(draggable.sortables, function () {
              // Copy over variables that sortable's _intersectsWith uses
              this.positionAbs = draggable.positionAbs;
              this.helperProportions = draggable.helperProportions;
              this.offset.click = draggable.offset.click;
              if (this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0])) {
                innermostIntersecting = false;
              }
              return innermostIntersecting;
            });
          }
          if (innermostIntersecting) {
            // If it intersects, we use a little isOver variable and set it once,
            // so that the move-in stuff gets fired only once.
            if (!sortable.isOver) {
              sortable.isOver = 1;
              sortable.currentItem = ui.helper.appendTo(sortable.element).data('ui-sortable-item', true);
              // Store helper option to later restore it
              sortable.options._helper = sortable.options.helper;
              sortable.options.helper = function () {
                return ui.helper[0];
              };
              // Fire the start events of the sortable with our passed browser event,
              // and our own helper (so it doesn't create a new one)
              event.target = sortable.currentItem[0];
              sortable._mouseCapture(event, true);
              sortable._mouseStart(event, true, true);
              // Because the browser event is way off the new appended portlet,
              // modify necessary variables to reflect the changes
              sortable.offset.click.top = draggable.offset.click.top;
              sortable.offset.click.left = draggable.offset.click.left;
              sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;
              sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;
              draggable._trigger('toSortable', event);
              // Inform draggable that the helper is in a valid drop zone,
              // used solely in the revert option to handle "valid/invalid".
              draggable.dropped = sortable.element;
              // Need to refreshPositions of all sortables in the case that
              // adding to one sortable changes the location of the other sortables (#9675)
              $.each(draggable.sortables, function () {
                this.refreshPositions();
              });
              // hack so receive/update callbacks work (mostly)
              draggable.currentItem = draggable.element;
              sortable.fromOutside = draggable;
            }
            if (sortable.currentItem) {
              sortable._mouseDrag(event);
              // Copy the sortable's position because the draggable's can potentially reflect
              // a relative position, while sortable is always absolute, which the dragged
              // element has now become. (#8809)
              ui.position = sortable.position;
            }
          } else {
            // If it doesn't intersect with the sortable, and it intersected before,
            // we fake the drag stop of the sortable, but make sure it doesn't remove
            // the helper by using cancelHelperRemoval.
            if (sortable.isOver) {
              sortable.isOver = 0;
              sortable.cancelHelperRemoval = true;
              // Calling sortable's mouseStop would trigger a revert,
              // so revert must be temporarily false until after mouseStop is called.
              sortable.options._revert = sortable.options.revert;
              sortable.options.revert = false;
              sortable._trigger('out', event, sortable._uiHash(sortable));
              sortable._mouseStop(event, true);
              // restore sortable behaviors that were modfied
              // when the draggable entered the sortable area (#9481)
              sortable.options.revert = sortable.options._revert;
              sortable.options.helper = sortable.options._helper;
              if (sortable.placeholder) {
                sortable.placeholder.remove();
              }
              // Recalculate the draggable's offset considering the sortable
              // may have modified them in unexpected ways (#8809)
              draggable._refreshOffsets(event);
              ui.position = draggable._generatePosition(event, true);
              draggable._trigger('fromSortable', event);
              // Inform draggable that the helper is no longer in a valid drop zone
              draggable.dropped = false;
              // Need to refreshPositions of all sortables just in case removing
              // from one sortable changes the location of other sortables (#9675)
              $.each(draggable.sortables, function () {
                this.refreshPositions();
              });
            }
          }
        });
      }
    });
    $.ui.plugin.add('draggable', 'cursor', {
      start: function (event, ui, instance) {
        var t = $('body'), o = instance.options;
        if (t.css('cursor')) {
          o._cursor = t.css('cursor');
        }
        t.css('cursor', o.cursor);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;
        if (o._cursor) {
          $('body').css('cursor', o._cursor);
        }
      }
    });
    $.ui.plugin.add('draggable', 'opacity', {
      start: function (event, ui, instance) {
        var t = $(ui.helper), o = instance.options;
        if (t.css('opacity')) {
          o._opacity = t.css('opacity');
        }
        t.css('opacity', o.opacity);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;
        if (o._opacity) {
          $(ui.helper).css('opacity', o._opacity);
        }
      }
    });
    $.ui.plugin.add('draggable', 'scroll', {
      start: function (event, ui, i) {
        if (!i.scrollParentNotHidden) {
          i.scrollParentNotHidden = i.helper.scrollParent(false);
        }
        if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== 'HTML') {
          i.overflowOffset = i.scrollParentNotHidden.offset();
        }
      },
      drag: function (event, ui, i) {
        var o = i.options, scrolled = false, scrollParent = i.scrollParentNotHidden[0], document = i.document[0];
        if (scrollParent !== document && scrollParent.tagName !== 'HTML') {
          if (!o.axis || o.axis !== 'x') {
            if (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity) {
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
            } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
            }
          }
          if (!o.axis || o.axis !== 'y') {
            if (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity) {
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
            } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
            }
          }
        } else {
          if (!o.axis || o.axis !== 'x') {
            if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
              scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
            } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
              scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
            }
          }
          if (!o.axis || o.axis !== 'y') {
            if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
              scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
            } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
              scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
            }
          }
        }
        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(i, event);
        }
      }
    });
    $.ui.plugin.add('draggable', 'snap', {
      start: function (event, ui, i) {
        var o = i.options;
        i.snapElements = [];
        $(o.snap.constructor !== String ? o.snap.items || ':data(ui-draggable)' : o.snap).each(function () {
          var $t = $(this), $o = $t.offset();
          if (this !== i.element[0]) {
            i.snapElements.push({
              item: this,
              width: $t.outerWidth(),
              height: $t.outerHeight(),
              top: $o.top,
              left: $o.left
            });
          }
        });
      },
      drag: function (event, ui, inst) {
        var ts, bs, ls, rs, l, r, t, b, i, first, o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
        for (i = inst.snapElements.length - 1; i >= 0; i--) {
          l = inst.snapElements[i].left - inst.margins.left;
          r = l + inst.snapElements[i].width;
          t = inst.snapElements[i].top - inst.margins.top;
          b = t + inst.snapElements[i].height;
          if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
            if (inst.snapElements[i].snapping) {
              inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item }));
            }
            inst.snapElements[i].snapping = false;
            continue;
          }
          if (o.snapMode !== 'inner') {
            ts = Math.abs(t - y2) <= d;
            bs = Math.abs(b - y1) <= d;
            ls = Math.abs(l - x2) <= d;
            rs = Math.abs(r - x1) <= d;
            if (ts) {
              ui.position.top = inst._convertPositionTo('relative', {
                top: t - inst.helperProportions.height,
                left: 0
              }).top;
            }
            if (bs) {
              ui.position.top = inst._convertPositionTo('relative', {
                top: b,
                left: 0
              }).top;
            }
            if (ls) {
              ui.position.left = inst._convertPositionTo('relative', {
                top: 0,
                left: l - inst.helperProportions.width
              }).left;
            }
            if (rs) {
              ui.position.left = inst._convertPositionTo('relative', {
                top: 0,
                left: r
              }).left;
            }
          }
          first = ts || bs || ls || rs;
          if (o.snapMode !== 'outer') {
            ts = Math.abs(t - y1) <= d;
            bs = Math.abs(b - y2) <= d;
            ls = Math.abs(l - x1) <= d;
            rs = Math.abs(r - x2) <= d;
            if (ts) {
              ui.position.top = inst._convertPositionTo('relative', {
                top: t,
                left: 0
              }).top;
            }
            if (bs) {
              ui.position.top = inst._convertPositionTo('relative', {
                top: b - inst.helperProportions.height,
                left: 0
              }).top;
            }
            if (ls) {
              ui.position.left = inst._convertPositionTo('relative', {
                top: 0,
                left: l
              }).left;
            }
            if (rs) {
              ui.position.left = inst._convertPositionTo('relative', {
                top: 0,
                left: r - inst.helperProportions.width
              }).left;
            }
          }
          if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
            inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item }));
          }
          inst.snapElements[i].snapping = ts || bs || ls || rs || first;
        }
      }
    });
    $.ui.plugin.add('draggable', 'stack', {
      start: function (event, ui, instance) {
        var min, o = instance.options, group = $.makeArray($(o.stack)).sort(function (a, b) {
            return (parseInt($(a).css('zIndex'), 10) || 0) - (parseInt($(b).css('zIndex'), 10) || 0);
          });
        if (!group.length) {
          return;
        }
        min = parseInt($(group[0]).css('zIndex'), 10) || 0;
        $(group).each(function (i) {
          $(this).css('zIndex', min + i);
        });
        this.css('zIndex', min + group.length);
      }
    });
    $.ui.plugin.add('draggable', 'zIndex', {
      start: function (event, ui, instance) {
        var t = $(ui.helper), o = instance.options;
        if (t.css('zIndex')) {
          o._zIndex = t.css('zIndex');
        }
        t.css('zIndex', o.zIndex);
      },
      stop: function (event, ui, instance) {
        var o = instance.options;
        if (o._zIndex) {
          $(ui.helper).css('zIndex', o._zIndex);
        }
      }
    });
    return $.ui.draggable;
  }));
  /*!
   * jQuery UI Droppable @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/droppable/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_droppable = function (jquery, lib_jquery_ui_core, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable) {
        return typeof factory === 'function' ? factory(jquery, lib_jquery_ui_core, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable) : factory;
      }(jquery, lib_jquery_ui_core, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    $.widget('ui.droppable', {
      version: '@VERSION',
      widgetEventPrefix: 'drop',
      options: {
        accept: '*',
        activeClass: false,
        addClasses: true,
        greedy: false,
        hoverClass: false,
        scope: 'default',
        tolerance: 'intersect',
        // callbacks
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null
      },
      _create: function () {
        var proportions, o = this.options, accept = o.accept;
        this.isover = false;
        this.isout = true;
        this.accept = $.isFunction(accept) ? accept : function (d) {
          return d.is(accept);
        };
        this.proportions = function () {
          if (arguments.length) {
            // Store the droppable's proportions
            proportions = arguments[0];
          } else {
            // Retrieve or derive the droppable's proportions
            return proportions ? proportions : proportions = {
              width: this.element[0].offsetWidth,
              height: this.element[0].offsetHeight
            };
          }
        };
        this._addToManager(o.scope);
        o.addClasses && this.element.addClass('ui-droppable');
      },
      _addToManager: function (scope) {
        // Add the reference and positions to the manager
        $.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
        $.ui.ddmanager.droppables[scope].push(this);
      },
      _splice: function (drop) {
        var i = 0;
        for (; i < drop.length; i++) {
          if (drop[i] === this) {
            drop.splice(i, 1);
          }
        }
      },
      _destroy: function () {
        var drop = $.ui.ddmanager.droppables[this.options.scope];
        this._splice(drop);
        this.element.removeClass('ui-droppable ui-droppable-disabled');
      },
      _setOption: function (key, value) {
        if (key === 'accept') {
          this.accept = $.isFunction(value) ? value : function (d) {
            return d.is(value);
          };
        } else if (key === 'scope') {
          var drop = $.ui.ddmanager.droppables[this.options.scope];
          this._splice(drop);
          this._addToManager(value);
        }
        this._super(key, value);
      },
      _activate: function (event) {
        var draggable = $.ui.ddmanager.current;
        if (this.options.activeClass) {
          this.element.addClass(this.options.activeClass);
        }
        if (draggable) {
          this._trigger('activate', event, this.ui(draggable));
        }
      },
      _deactivate: function (event) {
        var draggable = $.ui.ddmanager.current;
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
        if (draggable) {
          this._trigger('deactivate', event, this.ui(draggable));
        }
      },
      _over: function (event) {
        var draggable = $.ui.ddmanager.current;
        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return;
        }
        if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
          if (this.options.hoverClass) {
            this.element.addClass(this.options.hoverClass);
          }
          this._trigger('over', event, this.ui(draggable));
        }
      },
      _out: function (event) {
        var draggable = $.ui.ddmanager.current;
        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return;
        }
        if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
          if (this.options.hoverClass) {
            this.element.removeClass(this.options.hoverClass);
          }
          this._trigger('out', event, this.ui(draggable));
        }
      },
      _drop: function (event, custom) {
        var draggable = custom || $.ui.ddmanager.current, childrenIntersection = false;
        // Bail if draggable and droppable are same element
        if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
          return false;
        }
        this.element.find(':data(ui-droppable)').not('.ui-draggable-dragging').each(function () {
          var inst = $(this).droppable('instance');
          if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance, event)) {
            childrenIntersection = true;
            return false;
          }
        });
        if (childrenIntersection) {
          return false;
        }
        if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
          if (this.options.activeClass) {
            this.element.removeClass(this.options.activeClass);
          }
          if (this.options.hoverClass) {
            this.element.removeClass(this.options.hoverClass);
          }
          this._trigger('drop', event, this.ui(draggable));
          return this.element;
        }
        return false;
      },
      ui: function (c) {
        return {
          draggable: c.currentItem || c.element,
          helper: c.helper,
          position: c.position,
          offset: c.positionAbs
        };
      }
    });
    $.ui.intersect = function () {
      function isOverAxis(x, reference, size) {
        return x >= reference && x < reference + size;
      }
      return function (draggable, droppable, toleranceMode, event) {
        if (!droppable.offset) {
          return false;
        }
        var x1 = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left, y1 = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top, x2 = x1 + draggable.helperProportions.width, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, t = droppable.offset.top, r = l + droppable.proportions().width, b = t + droppable.proportions().height;
        switch (toleranceMode) {
        case 'fit':
          return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
        case 'intersect':
          return l < x1 + draggable.helperProportions.width / 2 && // Right Half
          x2 - draggable.helperProportions.width / 2 < r && // Left Half
          t < y1 + draggable.helperProportions.height / 2 && // Bottom Half
          y2 - draggable.helperProportions.height / 2 < b;
        // Top Half
        case 'pointer':
          return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
        case 'touch':
          return (y1 >= t && y1 <= b || y2 >= t && y2 <= b || y1 < t && y2 > b)  // Surrounded vertically
&& (x1 >= l && x1 <= r || x2 >= l && x2 <= r || x1 < l && x2 > r)  // Surrounded horizontally
;
        default:
          return false;
        }
      };
    }();
    /*
    	This manager tracks offsets of draggables and droppables
    */
    $.ui.ddmanager = {
      current: null,
      droppables: { 'default': [] },
      prepareOffsets: function (t, event) {
        var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type : null,
          // workaround for #2317
          list = (t.currentItem || t.element).find(':data(ui-droppable)').addBack();
        droppablesLoop:
          for (i = 0; i < m.length; i++) {
            // No disabled and non-accepted
            if (m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element)) {
              continue;
            }
            // Filter out elements in the current dragged item
            for (j = 0; j < list.length; j++) {
              if (list[j] === m[i].element[0]) {
                m[i].proportions().height = 0;
                continue droppablesLoop;
              }
            }
            m[i].visible = m[i].element.css('display') !== 'none';
            if (!m[i].visible) {
              continue;
            }
            // Activate the droppable if used directly from draggables
            if (type === 'mousedown') {
              m[i]._activate.call(m[i], event);
            }
            m[i].offset = m[i].element.offset();
            m[i].proportions({
              width: m[i].element[0].offsetWidth,
              height: m[i].element[0].offsetHeight
            });
          }
      },
      drop: function (draggable, event) {
        var dropped = false;
        // Create a copy of the droppables in case the list changes during the drop (#9116)
        $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function () {
          if (!this.options) {
            return;
          }
          if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance, event)) {
            dropped = this._drop.call(this, event) || dropped;
          }
          if (!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
            this.isout = true;
            this.isover = false;
            this._deactivate.call(this, event);
          }
        });
        return dropped;
      },
      dragStart: function (draggable, event) {
        // Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
        draggable.element.parentsUntil('body').bind('scroll.droppable', function () {
          if (!draggable.options.refreshPositions) {
            $.ui.ddmanager.prepareOffsets(draggable, event);
          }
        });
      },
      drag: function (draggable, event) {
        // If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
        if (draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }
        // Run through all droppables and check their positions based on specific tolerance options
        $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function () {
          if (this.options.disabled || this.greedyChild || !this.visible) {
            return;
          }
          var parentInstance, scope, parent, intersects = $.ui.intersect(draggable, this, this.options.tolerance, event), c = !intersects && this.isover ? 'isout' : intersects && !this.isover ? 'isover' : null;
          if (!c) {
            return;
          }
          if (this.options.greedy) {
            // find droppable parents with same scope
            scope = this.options.scope;
            parent = this.element.parents(':data(ui-droppable)').filter(function () {
              return $(this).droppable('instance').options.scope === scope;
            });
            if (parent.length) {
              parentInstance = $(parent[0]).droppable('instance');
              parentInstance.greedyChild = c === 'isover';
            }
          }
          // we just moved into a greedy child
          if (parentInstance && c === 'isover') {
            parentInstance.isover = false;
            parentInstance.isout = true;
            parentInstance._out.call(parentInstance, event);
          }
          this[c] = true;
          this[c === 'isout' ? 'isover' : 'isout'] = false;
          this[c === 'isover' ? '_over' : '_out'].call(this, event);
          // we just moved out of a greedy child
          if (parentInstance && c === 'isout') {
            parentInstance.isout = false;
            parentInstance.isover = true;
            parentInstance._over.call(parentInstance, event);
          }
        });
      },
      dragStop: function (draggable, event) {
        draggable.element.parentsUntil('body').unbind('scroll.droppable');
        // Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
        if (!draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }
      }
    };
    return $.ui.droppable;
  }));
  rvc_selectable = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'span',
              a: {
                'class': [
                  'selectable ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
              o: 'selectable',
              f: [{
                  t: 2,
                  r: 'yield'
                }]
            }]
        },
        css: ''
      }, component = {};
    component.exports = {
      //defaulted options, can be overridden at component markup
      // options to be added as needed, and they should match
      // the jqueryui options
      data: {
        useParent: false,
        disabled: false
      },
      decorators: {
        selectable: function (srcNode) {
          var r = this;
          var node;
          if (r.get('useParent')) {
            node = srcNode.parentNode;
          } else {
            node = srcNode;
          }
          $(node).selectable({ disabled: r.get('disabled') });
          return {
            teardown: function () {
              $(node).selectable('destroy');
            }
          };
        }
      },
      init: function () {
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
  /*!
   * jQuery UI Selectable @VERSION
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/selectable/
   */
  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      lib_jquery_ui_selectable = function (jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget) {
        return typeof factory === 'function' ? factory(jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget) : factory;
      }(jquery, lib_jquery_ui_core, lib_jquery_ui_mouse, lib_jquery_ui_widget);
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    return $.widget('ui.selectable', $.ui.mouse, {
      version: '@VERSION',
      options: {
        appendTo: 'body',
        autoRefresh: true,
        distance: 0,
        filter: '*',
        tolerance: 'touch',
        // callbacks
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null
      },
      _create: function () {
        var selectees, that = this;
        this.element.addClass('ui-selectable');
        this.dragged = false;
        // cache selectee children based on filter
        this.refresh = function () {
          selectees = $(that.options.filter, that.element[0]);
          selectees.addClass('ui-selectee');
          selectees.each(function () {
            var $this = $(this), pos = $this.offset();
            $.data(this, 'selectable-item', {
              element: this,
              $element: $this,
              left: pos.left,
              top: pos.top,
              right: pos.left + $this.outerWidth(),
              bottom: pos.top + $this.outerHeight(),
              startselected: false,
              selected: $this.hasClass('ui-selected'),
              selecting: $this.hasClass('ui-selecting'),
              unselecting: $this.hasClass('ui-unselecting')
            });
          });
        };
        this.refresh();
        this.selectees = selectees.addClass('ui-selectee');
        this._mouseInit();
        this.helper = $('<div class=\'ui-selectable-helper\'></div>');
      },
      _destroy: function () {
        this.selectees.removeClass('ui-selectee').removeData('selectable-item');
        this.element.removeClass('ui-selectable ui-selectable-disabled');
        this._mouseDestroy();
      },
      _mouseStart: function (event) {
        var that = this, options = this.options;
        this.opos = [
          event.pageX,
          event.pageY
        ];
        if (this.options.disabled) {
          return;
        }
        this.selectees = $(options.filter, this.element[0]);
        this._trigger('start', event);
        $(options.appendTo).append(this.helper);
        // position helper (lasso)
        this.helper.css({
          'left': event.pageX,
          'top': event.pageY,
          'width': 0,
          'height': 0
        });
        if (options.autoRefresh) {
          this.refresh();
        }
        this.selectees.filter('.ui-selected').each(function () {
          var selectee = $.data(this, 'selectable-item');
          selectee.startselected = true;
          if (!event.metaKey && !event.ctrlKey) {
            selectee.$element.removeClass('ui-selected');
            selectee.selected = false;
            selectee.$element.addClass('ui-unselecting');
            selectee.unselecting = true;
            // selectable UNSELECTING callback
            that._trigger('unselecting', event, { unselecting: selectee.element });
          }
        });
        $(event.target).parents().addBack().each(function () {
          var doSelect, selectee = $.data(this, 'selectable-item');
          if (selectee) {
            doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass('ui-selected');
            selectee.$element.removeClass(doSelect ? 'ui-unselecting' : 'ui-selected').addClass(doSelect ? 'ui-selecting' : 'ui-unselecting');
            selectee.unselecting = !doSelect;
            selectee.selecting = doSelect;
            selectee.selected = doSelect;
            // selectable (UN)SELECTING callback
            if (doSelect) {
              that._trigger('selecting', event, { selecting: selectee.element });
            } else {
              that._trigger('unselecting', event, { unselecting: selectee.element });
            }
            return false;
          }
        });
      },
      _mouseDrag: function (event) {
        this.dragged = true;
        if (this.options.disabled) {
          return;
        }
        var tmp, that = this, options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
        if (x1 > x2) {
          tmp = x2;
          x2 = x1;
          x1 = tmp;
        }
        if (y1 > y2) {
          tmp = y2;
          y2 = y1;
          y1 = tmp;
        }
        this.helper.css({
          left: x1,
          top: y1,
          width: x2 - x1,
          height: y2 - y1
        });
        this.selectees.each(function () {
          var selectee = $.data(this, 'selectable-item'), hit = false;
          //prevent helper from being selected if appendTo: selectable
          if (!selectee || selectee.element === that.element[0]) {
            return;
          }
          if (options.tolerance === 'touch') {
            hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1);
          } else if (options.tolerance === 'fit') {
            hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2;
          }
          if (hit) {
            // SELECT
            if (selectee.selected) {
              selectee.$element.removeClass('ui-selected');
              selectee.selected = false;
            }
            if (selectee.unselecting) {
              selectee.$element.removeClass('ui-unselecting');
              selectee.unselecting = false;
            }
            if (!selectee.selecting) {
              selectee.$element.addClass('ui-selecting');
              selectee.selecting = true;
              // selectable SELECTING callback
              that._trigger('selecting', event, { selecting: selectee.element });
            }
          } else {
            // UNSELECT
            if (selectee.selecting) {
              if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
                selectee.$element.removeClass('ui-selecting');
                selectee.selecting = false;
                selectee.$element.addClass('ui-selected');
                selectee.selected = true;
              } else {
                selectee.$element.removeClass('ui-selecting');
                selectee.selecting = false;
                if (selectee.startselected) {
                  selectee.$element.addClass('ui-unselecting');
                  selectee.unselecting = true;
                }
                // selectable UNSELECTING callback
                that._trigger('unselecting', event, { unselecting: selectee.element });
              }
            }
            if (selectee.selected) {
              if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
                selectee.$element.removeClass('ui-selected');
                selectee.selected = false;
                selectee.$element.addClass('ui-unselecting');
                selectee.unselecting = true;
                // selectable UNSELECTING callback
                that._trigger('unselecting', event, { unselecting: selectee.element });
              }
            }
          }
        });
        return false;
      },
      _mouseStop: function (event) {
        var that = this;
        this.dragged = false;
        $('.ui-unselecting', this.element[0]).each(function () {
          var selectee = $.data(this, 'selectable-item');
          selectee.$element.removeClass('ui-unselecting');
          selectee.unselecting = false;
          selectee.startselected = false;
          that._trigger('unselected', event, { unselected: selectee.element });
        });
        $('.ui-selecting', this.element[0]).each(function () {
          var selectee = $.data(this, 'selectable-item');
          selectee.$element.removeClass('ui-selecting').addClass('ui-selected');
          selectee.selecting = false;
          selectee.selected = true;
          selectee.startselected = true;
          that._trigger('selected', event, { selected: selectee.element });
        });
        this._trigger('stop', event);
        this.helper.remove();
        return false;
      }
    });
  }));
  // Copyright 2014 Tim Shannon. All rights reserved.
  // Use of this source code is governed by the MIT license
  // that can be found in the LICENSE file.
  //
  //Freehold ractive components 
  // for things like modals, navbar, file browser, etc
  (function (Modal) {
    Ractive.components.modal = Modal;
  }(rvc_modal));
  (function (Navbar) {
    Ractive.components.navbar = Navbar;
  }(rvc_navbar));
  (function (Permissions) {
    Ractive.components.permissions = Permissions;
  }(rvc_permissions));
  (function (Tree) {
    Ractive.components.tree = Tree;
  }(rvc_tree));
  (function (Filetree) {
    Ractive.components.filetree = Filetree;
  }(rvc_filetree));
  (function (JsonViewer) {
    Ractive.components.jsonviewer = JsonViewer;
  }(rvc_jsonviewer));
  (function (DatePicker, $) {
    Ractive.components.datepicker = DatePicker;
  }(rvc_datepicker, lib_jquery_ui_datepicker));
  (function (FileInput) {
    Ractive.components.fileinput = FileInput;
  }(rvc_fileinput));
  (function (DropZone) {
    Ractive.components.dropzone = DropZone;
  }(rvc_dropzone));
  (function (Draggable, $) {
    Ractive.components.draggable = Draggable;
  }(rvc_draggable, lib_jquery_ui_draggable));
  (function (Droppable, $) {
    Ractive.components.droppable = Droppable;
  }(rvc_droppable, lib_jquery_ui_droppable));
  (function (Selectable, $) {
    Ractive.components.selectable = Selectable;
  }(rvc_selectable, lib_jquery_ui_selectable));
}(Ractive, $));
}());