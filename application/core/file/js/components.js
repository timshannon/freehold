;(function() {
var rvc, rvc_modal, rvc_navbar, rvc_permissions, rvc_droppable, rvc_draggable, rvc_tree, rvc_filetree, rvc_jsonviewer, rvc_jquery_ui, rvc_datepicker, lib_jquery_ui_core, lib_jquery_ui_datepicker, rvc_fileinput, rvc_dropzone, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable, lib_jquery_ui_droppable, rvc_selectable, lib_jquery_ui_selectable, rvc_filebrowse, rvc_commonMarkEditor, lib_commonmark, lib_transitions_ractive_transitions_slide, lib_transitions_Ractive_transitions_scale, lib_transitions_ractive_transitions_fly, lib_transitions_ractive_transitions_fade, lib_transitions_Ractive_transitions_typewriter, _node_, _common_, _blocks_, _html_;
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
                                  f: ['\xD7']
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
          t: [
            {
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
                              a: { 'class': 'nav navbar-nav hidden-xs' },
                              f: [{
                                  t: 7,
                                  e: 'li',
                                  a: { 'class': 'active' },
                                  f: [{
                                      t: 7,
                                      e: 'a',
                                      a: { href: 'javascript:void(0)' },
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
                                        href: 'javascript:void(0)',
                                        id: 'navHelp',
                                        tabindex: '0',
                                        title: [{
                                            t: 2,
                                            r: 'title'
                                          }],
                                        role: 'button',
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
                      a: { 'class': 'nav-rightmost' },
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
                }
              ]
            },
            ' ',
            {
              t: 4,
              n: 50,
              x: {
                r: ['alerts.length'],
                s: '_0>0'
              },
              f: [
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'nav-alert-container' },
                  f: [{
                      t: 4,
                      r: 'alerts',
                      i: 'i',
                      f: [{
                          t: 7,
                          e: 'div',
                          a: {
                            'class': [
                              'navbar-alert alert alert-',
                              {
                                t: 2,
                                x: {
                                  r: ['.type'],
                                  s: '_0||"danger"'
                                }
                              },
                              ' alert-dismissible'
                            ],
                            role: 'alert'
                          },
                          f: [
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                'class': 'close',
                                'aria-label': 'Close'
                              },
                              v: { click: 'dismissAlert' },
                              f: [{
                                  t: 7,
                                  e: 'span',
                                  a: { 'aria-hidden': 'true' },
                                  f: ['\xD7']
                                }]
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'strong',
                              f: [{
                                  t: 2,
                                  r: 'lead'
                                }]
                            },
                            ' ',
                            {
                              t: 3,
                              r: 'detail'
                            }
                          ]
                        }]
                    }]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'modal-backdrop fade in' },
                  f: []
                }
              ]
            }
          ]
        },
        css: '.nav-rightmost {\nmargin-right: 30px;\n}\n.loginSpinner {\nposition: absolute;\ntop: -6px;\nleft: 10px;\n}\n.spinnerContainer {\nposition: relative;\n}\n.nav-alert-container {\nposition: fixed;\nz-index: 10500;\nwidth: 100%;\nheight: 100%;\n}\n.navbar-alert {\nleft: 0;\nright: 0;\nmargin-left: auto;\nmargin-right: auto;\nmargin-top: 20px;\nmin-width: 100px;\nmax-width: 50%;\n}\n',
        components: { 'modal': _import_0 }
      }, component = {};
    //TODO: Notifications
    component.exports = {
      isolated: false,
      data: {
        brand: 'freehold',
        authenticated: fh.auth.type != 'none',
        app: false,
        user: {},
        alerts: []
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
      onrender: function () {
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
          refresh: function (event) {
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
            event.original.preventDefault();
            this.set('waiting', true);
            this.set('loginErr', null);
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
          },
          'addAlert': function (type, lead, detail) {
            if (!type) {
              type = 'danger';
            }
            if (!lead) {
              lead = 'An error occurred!';
            }
            r.push('alerts', {
              type: type,
              lead: lead,
              detail: detail
            });
          },
          'dismissAlert': function (event) {
            r.splice(event.keypath.split('.')[0], event.index.i, 1);
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
      onrender: function () {
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
              r.fire('permissionsChange', r.get('permissions'));
              return;
            }
            var index = prm.indexOf('r');
            if (index !== -1) {
              r.set(keypath, prm.slice(index + 1));
              r.fire('permissionsChange', r.get('permissions'));
              return;
            }
            r.set(keypath, 'r' + prm);
            r.fire('permissionsChange', r.get('permissions'));
          },
          'toggleWrite': function (event, level) {
            var keypath = 'permissions.' + level;
            var prm = r.get(keypath);
            if (!prm) {
              r.set(keypath, 'w');
              r.fire('permissionsChange', r.get('permissions'));
              return;
            }
            var index = prm.indexOf('w');
            if (index === 0) {
              r.set(keypath, '');
              r.fire('permissionsChange', r.get('permissions'));
              return;
            }
            if (index === -1) {
              r.set(keypath, prm + 'w');
              r.fire('permissionsChange', r.get('permissions'));
              return;
            }
            r.set(keypath, 'r');
            r.fire('permissionsChange', r.get('permissions'));
          }
        });
        this.observe({
          'permissions.owner': function (newValue, oldValue, keypath) {
            if (newValue && oldValue) {
              r.fire('permissionsChange', r.get('permissions'));
            }
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
              m: [{
                  t: 4,
                  r: '.useParent',
                  f: ['style="display:none;"']
                }],
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
        addClasses: true,
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
            greedy: r.get('greedy'),
            hoverClass: r.get('hoverClass'),
            tolerance: r.get('tolerance'),
            scope: r.get('scope'),
            drop: function (event, ui) {
              r.fire('drop', $(ui.draggable).data('dragData'), r.get('dropData'));
            }
          });
          return {
            teardown: function () {
              $(node).droppable('destroy');
            }
          };
        }
      },
      onrender: function () {
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
                id: [{
                    t: 2,
                    r: 'id'
                  }],
                'class': [
                  'draggable ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
              o: 'draggable',
              m: [{
                  t: 4,
                  r: '.useParent',
                  f: ['style="display:none;"']
                }],
              f: [{
                  t: 2,
                  r: 'yield'
                }]
            }]
        },
        css: '.drag-nametag {\nfont-size: 1.3em; \ncolor: #fff;\nbackground-color: #337ab7;\nborder-radius: 4px;\npadding: 5px 10px; \nmax-width: 300px;\noverflow: hidden;\ntext-overflow: ellipsis;\nword-wrap: break-word;\nwhite-space: nowrap;\n}\n.drag-nametag>.badge {\nposition: relative;\ncolor: #337ab7;\nbackground-color: #fff;\nmargin-left: 5px;\ntop: -2px;\n}\n'
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
        scroll: true,
        containment: false,
        zIndex: false,
        opacity: false,
        scope: 'default',
        helper: 'original',
        cursor: false,
        cursorAt: false,
        appendTo: false,
        dragData: null,
        name: null,
        count: null
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
          var helper = r.get('helper');
          if (r.get('helper') == 'nametag') {
            if (!r.get('cursorAt')) {
              r.set('cursorAt', {
                top: 5,
                left: 10
              });
            }
            helper = function () {
              //Ractive is so freaking fast
              var helpNode = new Ractive({
                template: '<div data-rvcguid=\'{{guid}}\' class=\'drag-nametag\'><span class=\'{{iconClass}}\'></span>  {{name}}' + '{{#count}}<span class=\'badge\'>{{count}}</span>{{/}}</div>',
                data: {
                  name: r.get('name'),
                  count: r.get('count'),
                  iconClass: r.get('iconClass'),
                  guid: $(srcNode).attr('data-rvcguid')
                }
              });
              return $(helpNode.toHTML());
            };
          }
          $(node).draggable({
            addClasses: r.get('addClasses'),
            revert: r.get('revert'),
            snap: r.get('snap'),
            scroll: r.get('scroll'),
            appendTo: r.get('appendTo'),
            scope: r.get('scope'),
            containment: r.get('containment'),
            opacity: r.get('opacity'),
            zIndex: r.get('zIndex'),
            helper: helper,
            cursor: r.get('cursor'),
            cursorAt: r.get('cursorAt'),
            start: function (event, ui) {
              if (r.get('dragData')) {
                $(node).data('dragData', r.get('dragData'));
              }
              r.fire('start', r.get('dragData'));
            }
          });
          return {
            teardown: function () {
              $(node).draggable('destroy');
            }
          };
        }
      },
      onrender: function () {
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
                          r: '.selected',
                          f: ['selected']
                        },
                        ' child'
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
                              hoverClass: 'drop-over',
                              tolerance: 'pointer',
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
                            a: { href: 'javascript:void(0)' },
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
                            a: { href: 'javascript:void(0)' },
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
                                a: { href: 'javascript:void(0)' },
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
                            r: '.selected',
                            f: ['selected bg-info']
                          },
                          ' child'
                        ]
                      },
                      f: [
                        {
                          t: 4,
                          n: 50,
                          r: '.droppable',
                          f: [{
                              t: 7,
                              e: 'droppable',
                              a: {
                                useParent: 'true',
                                hoverClass: 'drop-over',
                                tolerance: 'pointer',
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
                              a: { href: 'javascript:void(0)' },
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
                              a: { href: 'javascript:void(0)' },
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
                                  a: { href: 'javascript:void(0)' },
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
        css: '.child.selected, .child.selected:hover {\nborder-color: #ccc;\nborder-radius: 4px;\nfont-weight:bold;\nbackground-color: #D9EDF7;\n}\n.child.drop-over  {\nbackground-color: #D9EDF7;\nborder: 3px solid #337ab7;\nborder-radius: 4px;\npadding: 4px;\n}\n.child {\npadding: 7px;\n}\n.child:hover {\nbackground-color: #f5f5f5;\nborder: 0px solid transparent;\nborder-radius: 4px;\npadding: 7px;\n}\na:hover, a:focus {\ntext-decoration: none;\t\ncolor: #333;\n}\na {\ncolor: #333;\n}\n.tree {\ncursor: default;\noverflow: auto;\n}\nul {\nlist-style: none;\n}\nli {\nmargin-left: -22px;\n}\n.icon {\ncolor: #555;\n}\n.icon {\nmax-width: 14px;\nmax-height: 14px;\t\n}\n',
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
      onrender: function () {
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
      onrender: function () {
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
            if (result.status !== 404) {
              result = result.responseJSON;
              r.set('error', result.message);
            }
          });
        }
        function prepFiles(files) {
          var regEx;
          try {
            regEx = new RegExp(r.get('filterRegex'), 'i');
          } catch (e) {
            console.log('invalid regxex: ' + e.message);
            regEx = new RegExp('', 'i');
          }
          sort(files);
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
        function sort(files) {
          if (!files) {
            return;
          }
          files.sort(function (a, b) {
            if (a.isDir && !b.isDir) {
              return -1;
            }
            if (b.isDir && !a.isDir) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
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
                                    a: { href: 'javascript:void(0)' },
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
      onrender: function () {
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
      onrender: function () {
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
              a: {
                'class': [
                  'dropzone ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
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
                      t1: 'scale',
                      t2: 'scale',
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
        css: '.drop-overlay {\nz-index: 5000;\nposition: absolute;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\nopacity: .9;\nbackground-color: #fff;\nborder: 5px dashed #555;\nborder-radius: 4px;\n}\n.drop-text {\nfont-size: 4em;\nfont-weight: 700;\nposition: relative;\ntop: 50%;\ntransform: translateY(-50%);\n}\n'
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
            //TODO: Figure out how to only show dropzone on files and not anything else
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
      onrender: function () {
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
              e: 'div',
              a: {
                'class': [{
                    t: 2,
                    r: 'class'
                  }]
              },
              o: 'selectable',
              m: [{
                  t: 4,
                  r: '.useParent',
                  f: ['style="display:none;"']
                }],
              f: [{
                  t: 2,
                  r: 'yield'
                }]
            }]
        },
        css: '.ui-selectable-helper { \nposition: absolute; z-index: 500; border:1px dotted black; \n}\t\n'
      }, component = {};
    component.exports = {
      //defaulted options, can be overridden at component markup
      // options to be added as needed, and they should match
      // the jqueryui options
      data: {
        useParent: false,
        filter: '*',
        delay: 0,
        cancel: null,
        selected: []
      },
      noCssTransform: true,
      decorators: {
        selectable: function (srcNode) {
          var r = this;
          var node;
          if (r.get('useParent')) {
            node = srcNode.parentNode;
          } else {
            node = srcNode;
          }
          $(node).selectable({
            filter: r.get('filter'),
            cancel: r.get('cancel'),
            delay: r.get('delay'),
            selected: function (event, ui) {
              r.fire('selected', ui.selected);
            },
            unselected: function (event, ui) {
              r.fire('unselected', ui.unselected);
            },
            start: function () {
              r.fire('start');
            },
            stop: function () {
              var selected = [];
              $('.ui-selected').each(function () {
                selected.push(this);
              });
              r.fire('stop', selected);
            }
          });
          return {
            teardown: function () {
              $(node).selectable('destroy');
            }
          };
        }
      },
      onrender: function () {
        var r = this;
        r.on({
          'reset': function () {
            $('.ui-selected').each(function () {
              $(this).removeClass('ui-selected');
              r.fire('unselected', this);
            });
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
  rvc_filebrowse = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'filebrowse' },
              f: [
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'row' },
                  f: [{
                      t: 7,
                      e: 'div',
                      a: { 'class': 'col-sm-12 root' },
                      f: [{
                          t: 7,
                          e: 'div',
                          a: {
                            'class': 'btn-group btn-group-sm',
                            role: 'group'
                          },
                          f: [
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                'class': 'btn btn-sm btn-default',
                                tile: 'Up to parent'
                              },
                              v: { click: 'openParent' },
                              f: [
                                {
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'icon glyphicon glyphicon-circle-arrow-up' }
                                },
                                ' ',
                                {
                                  t: 2,
                                  r: '.currentFolder.parent.name'
                                }
                              ]
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'button',
                              a: {
                                type: 'button',
                                'class': 'btn btn-sm btn-primary active',
                                style: 'cursor: default;'
                              },
                              f: [
                                {
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'glyphicon glyphicon-folder-open' }
                                },
                                {
                                  t: 7,
                                  e: 'span',
                                  a: { 'class': 'rootName' },
                                  f: [
                                    ' ',
                                    {
                                      t: 2,
                                      r: '.currentFolder.name'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }]
                    }]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'row' },
                  f: [{
                      t: 7,
                      e: 'div',
                      a: { 'class': 'col-sm-12' },
                      f: [
                        {
                          t: 4,
                          n: 50,
                          r: 'error',
                          f: [{
                              t: 7,
                              e: 'div',
                              a: { 'class': 'bg-danger' },
                              f: [{
                                  t: 2,
                                  r: 'error'
                                }]
                            }]
                        },
                        {
                          t: 4,
                          n: 51,
                          f: [{
                              t: 7,
                              e: 'ul',
                              a: { 'class': 'files' },
                              f: [{
                                  t: 4,
                                  r: 'files',
                                  i: 'i',
                                  f: [{
                                      t: 4,
                                      n: 50,
                                      x: {
                                        r: ['.hide'],
                                        s: '!_0'
                                      },
                                      f: [
                                        {
                                          t: 4,
                                          n: 50,
                                          r: '.isDir',
                                          f: [{
                                              t: 7,
                                              e: 'li',
                                              a: { 'class': 'file' },
                                              f: [{
                                                  t: 7,
                                                  e: 'a',
                                                  a: { href: 'javascript:void(0)' },
                                                  v: { click: 'openFolder' },
                                                  f: [
                                                    {
                                                      t: 7,
                                                      e: 'span',
                                                      a: { 'class': 'icon glyphicon glyphicon-folder-close' }
                                                    },
                                                    ' ',
                                                    {
                                                      t: 2,
                                                      r: '.name'
                                                    }
                                                  ]
                                                }]
                                            }]
                                        },
                                        {
                                          t: 4,
                                          n: 51,
                                          f: [{
                                              t: 7,
                                              e: 'li',
                                              a: {
                                                'class': [
                                                  'file ',
                                                  {
                                                    t: 4,
                                                    n: 50,
                                                    x: {
                                                      r: [
                                                        'selected.url',
                                                        '.url'
                                                      ],
                                                      s: '_0===_1'
                                                    },
                                                    f: ['selected']
                                                  }
                                                ]
                                              },
                                              v: { click: 'selectFile' },
                                              f: [
                                                {
                                                  t: 7,
                                                  e: 'span',
                                                  a: { 'class': 'icon glyphicon glyphicon-file' }
                                                },
                                                ' ',
                                                {
                                                  t: 2,
                                                  r: '.name'
                                                }
                                              ]
                                            }],
                                          r: '.isDir'
                                        }
                                      ]
                                    }]
                                }]
                            }],
                          r: 'error'
                        }
                      ]
                    }]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'row' },
                  f: [{
                      t: 7,
                      e: 'div',
                      a: { 'class': 'col-sm-12' },
                      f: [{
                          t: 7,
                          e: 'div',
                          a: { 'class': 'input-group' },
                          f: [
                            {
                              t: 7,
                              e: 'span',
                              a: {
                                'class': 'input-group-addon',
                                id: 'fileName'
                              },
                              f: ['File Name']
                            },
                            ' ',
                            {
                              t: 7,
                              e: 'input',
                              a: {
                                type: 'text',
                                'class': 'form-control',
                                placeholder: [{
                                    t: 2,
                                    r: 'filenamePlaceholder'
                                  }],
                                value: [{
                                    t: 2,
                                    r: 'filename'
                                  }],
                                'aria-describedby': 'fileName'
                              }
                            }
                          ]
                        }]
                    }]
                }
              ]
            }]
        },
        css: '.rootName {\nmargin-left: 5px;\nfont-weight:bold;\n}\n.files {\ncursor: default;\noverflow-x: auto;\nmax-height: 50vh;\nmin-height: 200px;\nmargin-top: 15px;\nborder-top: 1px solid #E5E5E5;\n}\n.file {\npadding: 5px;\n}\n.file:hover {\nbackground-color: #f5f5f5;\nborder: 0px solid transparent;\nborder-radius: 4px;\npadding: 5px;\n}\n.file.selected, .file.selected:hover {\nborder-color: #ccc;\nborder-radius: 4px;\nfont-weight:bold;\nbackground-color: #D9EDF7;\n}\na:hover, a:focus {\ntext-decoration: none;\t\ncolor: #333;\n}\na {\ncolor: #333;\n}\nul {\nlist-style: none;\n}\nli {\nmargin-left: -22px;\n}\n.icon {\ncolor: #555;\n}\n'
      }, component = {};
    component.exports = {
      data: {
        rootDir: null,
        filterRegex: '',
        fileExists: false
      },
      onrender: function () {
        var r = this;
        if (!r.get('rootDir')) {
          setRoot();
        } else {
          loadDir(r.get('rootDir'));
        }
        r.on({
          'openParent': function (event) {
            loadDir(event.context.currentFolder.parent.url);
          },
          'openFolder': function (event) {
            loadDir(event.context.url);
          },
          'selectFile': function (event) {
            r.set('selected', event.context);
            r.set('filename', event.context.name);
          }
        });
        r.observe({
          'filename': function (newValue, oldValue, keypath) {
            if (newValue) {
              r.set('fileExists', false);
              var files = r.get('files');
              for (var i = 0; i < files.length; i++) {
                if (newValue === files[i].name) {
                  r.set('fileExists', true);
                  return;
                }
              }
            }
          }
        });
        function loadDir(url) {
          setCurrent(url);
          fh.properties.get(url).done(function (result) {
            var regEx;
            var files = result.data;
            try {
              regEx = new RegExp(r.get('filterRegex'), 'i');
            } catch (e) {
              console.log('invalid regxex: ' + e.message);
              regEx = new RegExp('', 'i');
            }
            sort(files);
            for (var i = 0; i < files.length; i++) {
              if (!files[i].isDir && !regEx.exec(files[i].name)) {
                files[i].hide = true;
              } else {
                files[i].hide = false;
              }
            }
            r.set('files', files);
          }).fail(function (result) {
            loadDir(r.get('currentFolder.parent.url'));
          });
        }
        function setRoot() {
          var userFolder = fh.util.urlJoin('/v1/file/', fh.auth.user, '/');
          fh.properties.get(userFolder).fail(function () {
            r.set('rootDir', '/v1/file/');
            loadDir(r.get('rootDir'));
          }).done(function () {
            //folder exists
            r.set('rootDir', userFolder);
            loadDir(r.get('rootDir'));
          });
        }
        function setCurrent(url) {
          //trim trailing slash
          r.set('currentFolder.url', url);
          if (url.lastIndexOf('/') === url.length - 1) {
            url = url.slice(0, url.length - 1);
          }
          if (url == '/v1/file') {
            r.set('currentFolder.name', 'file');
            r.set('currentFolder.parent.url', '/v1/file/');
            r.set('currentFolder.parent.name', '.');
            return;
          }
          if (url == '/v1/datastore') {
            r.set('currentFolder.name', 'datastore');
            r.set('currentFolder.parent.url', '/v1/datastore/');
            r.set('currentFolder.parent.name', '.');
            return;
          }
          url = url.split('/');
          r.set('currentFolder.name', url.pop());
          var parentUrl = url.join('/') + '/';
          r.set('currentFolder.parent.url', parentUrl);
          r.set('currentFolder.parent.name', url.pop());
        }
        function sort(files) {
          if (!files) {
            return;
          }
          files.sort(function (a, b) {
            if (a.isDir && !b.isDir) {
              return -1;
            }
            if (b.isDir && !a.isDir) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
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
  rvc_commonMarkEditor = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'div',
              a: { 'class': 'cm-editor' },
              f: [
                ' ',
                {
                  t: 7,
                  e: 'ul',
                  a: {
                    'class': 'nav nav-tabs',
                    role: 'tablist'
                  },
                  f: [
                    {
                      t: 7,
                      e: 'li',
                      a: {
                        role: 'presentation',
                        'class': [{
                            t: 4,
                            r: 'viewFirst',
                            f: ['active'],
                            n: 51
                          }],
                        title: 'Edit markdown'
                      },
                      f: [{
                          t: 7,
                          e: 'a',
                          a: {
                            href: '#edit',
                            'aria-controls': 'edit',
                            role: 'tab',
                            'data-toggle': 'tab'
                          },
                          f: [{
                              t: 7,
                              e: 'span',
                              a: { 'class': 'glyphicon glyphicon-pencil' }
                            }]
                        }]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'li',
                      a: {
                        role: 'presentation',
                        'class': [{
                            t: 4,
                            r: 'viewFirst',
                            f: ['active']
                          }],
                        title: 'View'
                      },
                      v: { click: 'parse' },
                      f: [{
                          t: 7,
                          e: 'a',
                          a: {
                            href: '#view',
                            'aria-controls': 'view',
                            role: 'tab',
                            'data-toggle': 'tab'
                          },
                          f: [{
                              t: 7,
                              e: 'span',
                              a: { 'class': 'glyphicon glyphicon-eye-open' }
                            }]
                        }]
                    }
                  ]
                },
                ' ',
                {
                  t: 7,
                  e: 'div',
                  a: { 'class': 'tab-content' },
                  f: [
                    {
                      t: 7,
                      e: 'div',
                      a: {
                        role: 'tabpanel',
                        'class': 'tab-pane active',
                        id: 'edit'
                      },
                      f: [{
                          t: 7,
                          e: 'textarea',
                          a: {
                            'class': 'form-control',
                            value: [{
                                t: 2,
                                r: 'markdown'
                              }],
                            placeholder: 'Enter markdown here'
                          }
                        }]
                    },
                    ' ',
                    {
                      t: 7,
                      e: 'div',
                      a: {
                        role: 'tabpanel',
                        'class': 'tab-pane',
                        id: 'view'
                      },
                      f: [{
                          t: 3,
                          r: 'parsed'
                        }]
                    }
                  ]
                }
              ]
            }]
        },
        css: '.tab-content, #edit, #edit>textarea {\nheight: 100%;\n}\n#edit>textarea {\nborder-top-left-radius: 0px;\nborder-top-right-radius: 0px;\nborder-top-width: 0px;\nbox-shadow: 0px 0px 0px; \n}\n.cm-editor {\nmin-height: 100px;\n}\n'
      }, component = {};
    component.exports = {
      data: { viewFirst: false },
      onrender: function () {
        var reader = new commonmark.Parser();
        var writer = new commonmark.HtmlRenderer();
        var r = this;
        r.on({
          'parse': function (event) {
            var parsed = reader.parse(r.get('markdown'));
            r.set('parsed', writer.render(parsed));
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
  !function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module)
      module.exports = e();
    else if (true)
      lib_commonmark = function () {
        return typeof e === 'function' ? e() : e;
      }();
    else {
      var o;
      'undefined' != typeof window ? o = window : 'undefined' != typeof global ? o = global : 'undefined' != typeof self && (o = self), o.commonmark = e();
    }
  }(function () {
    var define, module, exports;
    return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == 'function' && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error('Cannot find module \'' + o + '\'');
            throw f.code = 'MODULE_NOT_FOUND', f;
          }
          var l = n[o] = { exports: {} };
          t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == 'function' && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    }({
      1: [
        function (require, module, exports) {
          
          var Node = _node_;
          var unescapeString = _common_.unescapeString;
          var CODE_INDENT = 4;
          var C_NEWLINE = 10;
          var C_GREATERTHAN = 62;
          var C_SPACE = 32;
          var C_OPEN_BRACKET = 91;
          var InlineParser = inlines;
          var BLOCKTAGNAME = '(?:article|header|aside|hgroup|iframe|blockquote|hr|body|li|map|button|object|canvas|ol|caption|output|col|p|colgroup|pre|dd|progress|div|section|dl|table|td|dt|tbody|embed|textarea|fieldset|tfoot|figcaption|th|figure|thead|footer|footer|tr|form|ul|h1|h2|h3|h4|h5|h6|video|script|style)';
          var HTMLBLOCKOPEN = '<(?:' + BLOCKTAGNAME + '[\\s/>]' + '|' + '/' + BLOCKTAGNAME + '[\\s>]' + '|' + '[?!])';
          var reHtmlBlockOpen = new RegExp('^' + HTMLBLOCKOPEN, 'i');
          var reHrule = /^(?:(?:\* *){3,}|(?:_ *){3,}|(?:- *){3,}) *$/;
          var reMaybeSpecial = /^[#`~*+_=<>0-9-]/;
          var reNonSpace = /[^ \t\n]/;
          var reBulletListMarker = /^[*+-]( +|$)/;
          var reOrderedListMarker = /^(\d+)([.)])( +|$)/;
          var reATXHeaderMarker = /^#{1,6}(?: +|$)/;
          var reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;
          var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;
          var reSetextHeaderLine = /^(?:=+|-+) *$/;
          var reLineEnding = /\r\n|\n|\r/;
          // Returns true if string contains only space characters.
          var isBlank = function (s) {
            return !reNonSpace.test(s);
          };
          var tabSpaces = [
            '    ',
            '   ',
            '  ',
            ' '
          ];
          // Convert tabs to spaces on each line using a 4-space tab stop.
          var detabLine = function (text) {
            var start = 0;
            var offset;
            var lastStop = 0;
            while ((offset = text.indexOf('\t', start)) !== -1) {
              var numspaces = (offset - lastStop) % 4;
              var spaces = tabSpaces[numspaces];
              text = text.slice(0, offset) + spaces + text.slice(offset + 1);
              lastStop = offset + numspaces;
              start = lastStop;
            }
            return text;
          };
          var peek = function (ln, pos) {
            if (pos < ln.length) {
              return ln.charCodeAt(pos);
            } else {
              return -1;
            }
          };
          // DOC PARSER
          // These are methods of a Parser object, defined below.
          // Returns true if block ends with a blank line, descending if needed
          // into lists and sublists.
          var endsWithBlankLine = function (block) {
            while (block) {
              if (block._lastLineBlank) {
                return true;
              }
              var t = block.type;
              if (t === 'List' || t === 'Item') {
                block = block._lastChild;
              } else {
                break;
              }
            }
            return false;
          };
          // Break out of all containing lists, resetting the tip of the
          // document to the parent of the highest list, and finalizing
          // all the lists.  (This is used to implement the "two blank lines
          // break of of all lists" feature.)
          var breakOutOfLists = function (block) {
            var b = block;
            var last_list = null;
            do {
              if (b.type === 'List') {
                last_list = b;
              }
              b = b._parent;
            } while (b);
            if (last_list) {
              while (block !== last_list) {
                this.finalize(block, this.lineNumber);
                block = block._parent;
              }
              this.finalize(last_list, this.lineNumber);
              this.tip = last_list._parent;
            }
          };
          // Add a line to the block at the tip.  We assume the tip
          // can accept lines -- that check should be done before calling this.
          var addLine = function () {
            this.tip._string_content += this.currentLine.slice(this.offset) + '\n';
          };
          // Add block of type tag as a child of the tip.  If the tip can't
          // accept children, close and finalize it and try its parent,
          // and so on til we find a block that can accept children.
          var addChild = function (tag, offset) {
            while (!this.blocks[this.tip.type].canContain(tag)) {
              this.finalize(this.tip, this.lineNumber - 1);
            }
            var column_number = offset + 1;
            // offset 0 = column 1
            var newBlock = new Node(tag, [
              [
                this.lineNumber,
                column_number
              ],
              [
                0,
                0
              ]
            ]);
            newBlock._string_content = '';
            this.tip.appendChild(newBlock);
            this.tip = newBlock;
            return newBlock;
          };
          // Parse a list marker and return data on the marker (type,
          // start, delimiter, bullet character, padding) or null.
          var parseListMarker = function (ln, offset, indent) {
            var rest = ln.slice(offset);
            var match;
            var spaces_after_marker;
            var data = {
              type: null,
              tight: true,
              // lists are tight by default
              bulletChar: null,
              start: null,
              delimiter: null,
              padding: null,
              markerOffset: indent
            };
            if (rest.match(reHrule)) {
              return null;
            }
            if (match = rest.match(reBulletListMarker)) {
              spaces_after_marker = match[1].length;
              data.type = 'Bullet';
              data.bulletChar = match[0][0];
            } else if (match = rest.match(reOrderedListMarker)) {
              spaces_after_marker = match[3].length;
              data.type = 'Ordered';
              data.start = parseInt(match[1]);
              data.delimiter = match[2];
            } else {
              return null;
            }
            var blank_item = match[0].length === rest.length;
            if (spaces_after_marker >= 5 || spaces_after_marker < 1 || blank_item) {
              data.padding = match[0].length - spaces_after_marker + 1;
            } else {
              data.padding = match[0].length;
            }
            return data;
          };
          // Returns true if the two list items are of the same type,
          // with the same delimiter and bullet character.  This is used
          // in agglomerating list items into lists.
          var listsMatch = function (list_data, item_data) {
            return list_data.type === item_data.type && list_data.delimiter === item_data.delimiter && list_data.bulletChar === item_data.bulletChar;
          };
          // Finalize and close any unmatched blocks. Returns true.
          var closeUnmatchedBlocks = function () {
            if (!this.allClosed) {
              // finalize any blocks not matched
              while (this.oldtip !== this.lastMatchedContainer) {
                var parent = this.oldtip._parent;
                this.finalize(this.oldtip, this.lineNumber - 1);
                this.oldtip = parent;
              }
              this.allClosed = true;
            }
          };
          // 'finalize' is run when the block is closed.
          // 'continue' is run to check whether the block is continuing
          // at a certain line and offset (e.g. whether a block quote
          // contains a `>`.  It returns 0 for matched, 1 for not matched,
          // and 2 for "we've dealt with this line completely, go to next."
          var blocks = {
            Document: {
              continue: function () {
                return 0;
              },
              finalize: function () {
                return;
              },
              canContain: function (t) {
                return t !== 'Item';
              },
              acceptsLines: false
            },
            List: {
              continue: function () {
                return 0;
              },
              finalize: function (parser, block) {
                var item = block._firstChild;
                while (item) {
                  // check for non-final list item ending with blank line:
                  if (endsWithBlankLine(item) && item._next) {
                    block._listData.tight = false;
                    break;
                  }
                  // recurse into children of list item, to see if there are
                  // spaces between any of them:
                  var subitem = item._firstChild;
                  while (subitem) {
                    if (endsWithBlankLine(subitem) && (item._next || subitem._next)) {
                      block._listData.tight = false;
                      break;
                    }
                    subitem = subitem._next;
                  }
                  item = item._next;
                }
              },
              canContain: function (t) {
                return t === 'Item';
              },
              acceptsLines: false
            },
            BlockQuote: {
              continue: function (parser) {
                var ln = parser.currentLine;
                if (parser.indent <= 3 && peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
                  parser.offset = parser.nextNonspace + 1;
                  if (peek(ln, parser.offset) === C_SPACE) {
                    parser.offset++;
                  }
                } else {
                  return 1;
                }
                return 0;
              },
              finalize: function () {
                return;
              },
              canContain: function (t) {
                return t !== 'Item';
              },
              acceptsLines: false
            },
            Item: {
              continue: function (parser, container) {
                if (parser.blank) {
                  parser.offset = parser.nextNonspace;
                } else if (parser.indent >= container._listData.markerOffset + container._listData.padding) {
                  parser.offset += container._listData.markerOffset + container._listData.padding;
                } else {
                  return 1;
                }
                return 0;
              },
              finalize: function () {
                return;
              },
              canContain: function (t) {
                return t !== 'Item';
              },
              acceptsLines: false
            },
            Header: {
              continue: function () {
                // a header can never container > 1 line, so fail to match:
                return 1;
              },
              finalize: function () {
                return;
              },
              canContain: function () {
                return false;
              },
              acceptsLines: false
            },
            HorizontalRule: {
              continue: function () {
                // an hrule can never container > 1 line, so fail to match:
                return 1;
              },
              finalize: function () {
                return;
              },
              canContain: function () {
                return false;
              },
              acceptsLines: false
            },
            CodeBlock: {
              continue: function (parser, container) {
                var ln = parser.currentLine;
                var indent = parser.indent;
                if (container._isFenced) {
                  // fenced
                  var match = indent <= 3 && ln.charAt(parser.nextNonspace) === container._fenceChar && ln.slice(parser.nextNonspace).match(reClosingCodeFence);
                  if (match && match[0].length >= container._fenceLength) {
                    // closing fence - we're at end of line, so we can return
                    parser.finalize(container, parser.lineNumber);
                    return 2;
                  } else {
                    // skip optional spaces of fence offset
                    var i = container._fenceOffset;
                    while (i > 0 && peek(ln, parser.offset) === C_SPACE) {
                      parser.offset++;
                      i--;
                    }
                  }
                } else {
                  // indented
                  if (indent >= CODE_INDENT) {
                    parser.offset += CODE_INDENT;
                  } else if (parser.blank) {
                    parser.offset = parser.nextNonspace;
                  } else {
                    return 1;
                  }
                }
                return 0;
              },
              finalize: function (parser, block) {
                if (block._isFenced) {
                  // fenced
                  // first line becomes info string
                  var content = block._string_content;
                  var newlinePos = content.indexOf('\n');
                  var firstLine = content.slice(0, newlinePos);
                  var rest = content.slice(newlinePos + 1);
                  block.info = unescapeString(firstLine.trim());
                  block._literal = rest;
                } else {
                  // indented
                  block._literal = block._string_content.replace(/(\n *)+$/, '\n');
                }
                block._string_content = null;  // allow GC
              },
              canContain: function () {
                return false;
              },
              acceptsLines: true
            },
            HtmlBlock: {
              continue: function (parser) {
                return parser.blank ? 1 : 0;
              },
              finalize: function (parser, block) {
                block._literal = block._string_content.replace(/(\n *)+$/, '');
                block._string_content = null;  // allow GC
              },
              canContain: function () {
                return false;
              },
              acceptsLines: true
            },
            Paragraph: {
              continue: function (parser) {
                return parser.blank ? 1 : 0;
              },
              finalize: function (parser, block) {
                var pos;
                var hasReferenceDefs = false;
                // try parsing the beginning as link reference definitions:
                while (peek(block._string_content, 0) === C_OPEN_BRACKET && (pos = parser.inlineParser.parseReference(block._string_content, parser.refmap))) {
                  block._string_content = block._string_content.slice(pos);
                  hasReferenceDefs = true;
                }
                if (hasReferenceDefs && isBlank(block._string_content)) {
                  block.unlink();
                }
              },
              canContain: function () {
                return false;
              },
              acceptsLines: true
            }
          };
          // block start functions.  Return values:
          // 0 = no match
          // 1 = matched container, keep going
          // 2 = matched leaf, no more block starts
          var blockStarts = [
            // indented code block
            function (parser) {
              if (parser.indent >= CODE_INDENT) {
                if (parser.tip.type !== 'Paragraph' && !parser.blank) {
                  // indented code
                  parser.offset += CODE_INDENT;
                  parser.closeUnmatchedBlocks();
                  parser.addChild('CodeBlock', parser.offset);
                } else {
                  // lazy paragraph continuation
                  parser.offset = parser.nextNonspace;
                }
                return 2;
              } else {
                return 0;
              }
            },
            // block quote
            function (parser) {
              if (peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
                parser.offset = parser.nextNonspace + 1;
                // optional following space
                if (peek(parser.currentLine, parser.offset) === C_SPACE) {
                  parser.offset++;
                }
                parser.closeUnmatchedBlocks();
                parser.addChild('BlockQuote', parser.nextNonspace);
                return 1;
              } else {
                return 0;
              }
            },
            // ATX header
            function (parser) {
              var match;
              if (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeaderMarker)) {
                parser.offset = parser.nextNonspace + match[0].length;
                parser.closeUnmatchedBlocks();
                var container = parser.addChild('Header', parser.nextNonspace);
                container.level = match[0].trim().length;
                // number of #s
                // remove trailing ###s:
                container._string_content = parser.currentLine.slice(parser.offset).replace(/^ *#+ *$/, '').replace(/ +#+ *$/, '');
                parser.offset = parser.currentLine.length;
                return 2;
              } else {
                return 0;
              }
            },
            // Fenced code block
            function (parser) {
              var match;
              if (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence)) {
                var fenceLength = match[0].length;
                parser.closeUnmatchedBlocks();
                var container = parser.addChild('CodeBlock', parser.nextNonspace);
                container._isFenced = true;
                container._fenceLength = fenceLength;
                container._fenceChar = match[0][0];
                container._fenceOffset = parser.indent;
                parser.offset = parser.nextNonspace + fenceLength;
                return 2;
              } else {
                return 0;
              }
            },
            // HTML block
            function (parser) {
              if (reHtmlBlockOpen.test(parser.currentLine.slice(parser.nextNonspace))) {
                parser.closeUnmatchedBlocks();
                parser.addChild('HtmlBlock', parser.offset);
                // don't adjust parser.offset; spaces are part of block
                return 2;
              } else {
                return 0;
              }
            },
            // Setext header
            function (parser, container) {
              var match;
              if (container.type === 'Paragraph' && container._string_content.indexOf('\n') === container._string_content.length - 1 && (match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeaderLine))) {
                parser.closeUnmatchedBlocks();
                var header = new Node('Header', container.sourcepos);
                header.level = match[0][0] === '=' ? 1 : 2;
                header._string_content = container._string_content;
                container.insertAfter(header);
                container.unlink();
                parser.tip = header;
                parser.offset = parser.currentLine.length;
                return 2;
              } else {
                return 0;
              }
            },
            // hrule
            function (parser) {
              if (reHrule.test(parser.currentLine.slice(parser.nextNonspace))) {
                parser.closeUnmatchedBlocks();
                parser.addChild('HorizontalRule', parser.nextNonspace);
                parser.offset = parser.currentLine.length;
                return 2;
              } else {
                return 0;
              }
            },
            // list item
            function (parser, container) {
              var data;
              if (data = parseListMarker(parser.currentLine, parser.nextNonspace, parser.indent)) {
                parser.closeUnmatchedBlocks();
                parser.offset = parser.nextNonspace + data.padding;
                // add the list if needed
                if (parser.tip.type !== 'List' || !listsMatch(container._listData, data)) {
                  container = parser.addChild('List', parser.nextNonspace);
                  container._listData = data;
                }
                // add the list item
                container = parser.addChild('Item', parser.nextNonspace);
                container._listData = data;
                return 1;
              } else {
                return 0;
              }
            }
          ];
          var findNextNonspace = function () {
            var currentLine = this.currentLine;
            var match = currentLine.slice(this.offset).match(reNonSpace);
            if (match === null) {
              this.nextNonspace = currentLine.length;
              this.blank = true;
            } else {
              this.nextNonspace = this.offset + match.index;
              this.blank = false;
            }
            this.indent = this.nextNonspace - this.offset;
          };
          // Analyze a line of text and update the document appropriately.
          // We parse markdown text by calling this on each line of input,
          // then finalizing the document.
          var incorporateLine = function (ln) {
            var all_matched = true;
            var t;
            var container = this.doc;
            this.oldtip = this.tip;
            this.offset = 0;
            this.lineNumber += 1;
            // replace NUL characters for security
            if (ln.indexOf('\0') !== -1) {
              ln = ln.replace(/\0/g, '\uFFFD');
            }
            // Convert tabs to spaces:
            ln = detabLine(ln);
            this.currentLine = ln;
            // For each containing block, try to parse the associated line start.
            // Bail out on failure: container will point to the last matching block.
            // Set all_matched to false if not all containers match.
            var lastChild;
            while ((lastChild = container._lastChild) && lastChild._open) {
              container = lastChild;
              this.findNextNonspace();
              switch (this.blocks[container.type].continue(this, container)) {
              case 0:
                // we've matched, keep going
                break;
              case 1:
                // we've failed to match a block
                all_matched = false;
                break;
              case 2:
                // we've hit end of line for fenced code close and can return
                this.lastLineLength = ln.length;
                return;
              default:
                throw 'continue returned illegal value, must be 0, 1, or 2';
              }
              if (!all_matched) {
                container = container._parent;
                // back up to last matching block
                break;
              }
            }
            this.allClosed = container === this.oldtip;
            this.lastMatchedContainer = container;
            // Check to see if we've hit 2nd blank line; if so break out of list:
            if (this.blank && container._lastLineBlank) {
              this.breakOutOfLists(container);
            }
            var matchedLeaf = container.type !== 'Paragraph' && blocks[container.type].acceptsLines;
            var starts = this.blockStarts;
            var startsLen = starts.length;
            // Unless last matched container is a code block, try new container starts,
            // adding children to the last matched container:
            while (!matchedLeaf) {
              this.findNextNonspace();
              // this is a little performance optimization:
              if (this.indent < CODE_INDENT && !reMaybeSpecial.test(ln.slice(this.nextNonspace))) {
                this.offset = this.nextNonspace;
                break;
              }
              var i = 0;
              while (i < startsLen) {
                var res = starts[i](this, container);
                if (res === 1) {
                  container = this.tip;
                  break;
                } else if (res === 2) {
                  container = this.tip;
                  matchedLeaf = true;
                  break;
                } else {
                  i++;
                }
              }
              if (i === startsLen) {
                // nothing matched
                this.offset = this.nextNonspace;
                break;
              }
            }
            // What remains at the offset is a text line.  Add the text to the
            // appropriate container.
            // First check for a lazy paragraph continuation:
            if (!this.allClosed && !this.blank && this.tip.type === 'Paragraph') {
              // lazy paragraph continuation
              this.addLine();
            } else {
              // not a lazy continuation
              // finalize any blocks not matched
              this.closeUnmatchedBlocks();
              if (this.blank && container.lastChild) {
                container.lastChild._lastLineBlank = true;
              }
              t = container.type;
              // Block quote lines are never blank as they start with >
              // and we don't count blanks in fenced code for purposes of tight/loose
              // lists or breaking out of lists.  We also don't set _lastLineBlank
              // on an empty list item, or if we just closed a fenced block.
              var lastLineBlank = this.blank && !(t === 'BlockQuote' || t === 'CodeBlock' && container._isFenced || t === 'Item' && !container._firstChild && container.sourcepos[0][0] === this.lineNumber);
              // propagate lastLineBlank up through parents:
              var cont = container;
              while (cont) {
                cont._lastLineBlank = lastLineBlank;
                cont = cont._parent;
              }
              if (this.blocks[t].acceptsLines) {
                this.addLine();
              } else if (this.offset < ln.length && !this.blank) {
                // create paragraph container for line
                container = this.addChild('Paragraph', this.offset);
                this.offset = this.nextNonspace;
                this.addLine();
              }
            }
            this.lastLineLength = ln.length;
          };
          // Finalize a block.  Close it and do any necessary postprocessing,
          // e.g. creating string_content from strings, setting the 'tight'
          // or 'loose' status of a list, and parsing the beginnings
          // of paragraphs for reference definitions.  Reset the tip to the
          // parent of the closed block.
          var finalize = function (block, lineNumber) {
            var above = block._parent || this.top;
            block._open = false;
            block.sourcepos[1] = [
              lineNumber,
              this.lastLineLength
            ];
            this.blocks[block.type].finalize(this, block);
            this.tip = above;
          };
          // Walk through a block & children recursively, parsing string content
          // into inline content where appropriate.  Returns new object.
          var processInlines = function (block) {
            var node, event, t;
            var walker = block.walker();
            this.inlineParser.refmap = this.refmap;
            while (event = walker.next()) {
              node = event.node;
              t = node.type;
              if (!event.entering && (t === 'Paragraph' || t === 'Header')) {
                this.inlineParser.parse(node);
              }
            }
          };
          var Document = function () {
            var doc = new Node('Document', [
              [
                1,
                1
              ],
              [
                0,
                0
              ]
            ]);
            return doc;
          };
          // The main parsing function.  Returns a parsed document AST.
          var parse = function (input) {
            this.doc = new Document();
            this.tip = this.doc;
            this.refmap = {};
            this.lineNumber = 0;
            this.lastLineLength = 0;
            this.offset = 0;
            this.lastMatchedContainer = this.doc;
            this.currentLine = '';
            if (this.options.time) {
              console.time('preparing input');
            }
            var lines = input.split(reLineEnding);
            var len = lines.length;
            if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
              // ignore last blank line created by final newline
              len -= 1;
            }
            if (this.options.time) {
              console.timeEnd('preparing input');
            }
            if (this.options.time) {
              console.time('block parsing');
            }
            for (var i = 0; i < len; i++) {
              this.incorporateLine(lines[i]);
            }
            while (this.tip) {
              this.finalize(this.tip, len);
            }
            if (this.options.time) {
              console.timeEnd('block parsing');
            }
            if (this.options.time) {
              console.time('inline parsing');
            }
            this.processInlines(this.doc);
            if (this.options.time) {
              console.timeEnd('inline parsing');
            }
            return this.doc;
          };
          // The Parser object.
          function Parser(options) {
            return {
              doc: new Document(),
              blocks: blocks,
              blockStarts: blockStarts,
              tip: this.doc,
              oldtip: this.doc,
              currentLine: '',
              lineNumber: 0,
              offset: 0,
              nextNonspace: 0,
              indent: 0,
              blank: false,
              allClosed: true,
              lastMatchedContainer: this.doc,
              refmap: {},
              lastLineLength: 0,
              inlineParser: new InlineParser(),
              findNextNonspace: findNextNonspace,
              breakOutOfLists: breakOutOfLists,
              addLine: addLine,
              addChild: addChild,
              incorporateLine: incorporateLine,
              finalize: finalize,
              processInlines: processInlines,
              closeUnmatchedBlocks: closeUnmatchedBlocks,
              parse: parse,
              options: options || {}
            };
          }
          module.exports = Parser;
          return exports;
        },
        {
          './common': 2,
          './inlines': 7,
          './node': 8
        }
      ],
      2: [
        function (require, module, exports) {
          
          var C_BACKSLASH = 92;
          var entityToChar = html5_entitiesjs.entityToChar;
          var ENTITY = '&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});';
          var reBackslashOrAmp = /[\\&]/;
          var ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
          var reEntityOrEscapedChar = new RegExp('\\\\' + ESCAPABLE + '|' + ENTITY, 'gi');
          var XMLSPECIAL = '[&<>"]';
          var reXmlSpecial = new RegExp(XMLSPECIAL, 'g');
          var reXmlSpecialOrEntity = new RegExp(ENTITY + '|' + XMLSPECIAL, 'gi');
          var unescapeChar = function (s) {
            if (s.charCodeAt(0) === C_BACKSLASH) {
              return s.charAt(1);
            } else {
              return entityToChar(s);
            }
          };
          // Replace entities and backslash escapes with literal characters.
          var unescapeString = function (s) {
            if (reBackslashOrAmp.test(s)) {
              return s.replace(reEntityOrEscapedChar, unescapeChar);
            } else {
              return s;
            }
          };
          var normalizeURI = function (uri) {
            try {
              return encodeURI(decodeURI(uri));
            } catch (err) {
              return uri;
            }
          };
          var replaceUnsafeChar = function (s) {
            switch (s) {
            case '&':
              return '&amp;';
            case '<':
              return '&lt;';
            case '>':
              return '&gt;';
            case '"':
              return '&quot;';
            default:
              return s;
            }
          };
          var escapeXml = function (s, preserve_entities) {
            if (reXmlSpecial.test(s)) {
              if (preserve_entities) {
                return s.replace(reXmlSpecialOrEntity, replaceUnsafeChar);
              } else {
                return s.replace(reXmlSpecial, replaceUnsafeChar);
              }
            } else {
              return s;
            }
          };
          module.exports = {
            unescapeString: unescapeString,
            normalizeURI: normalizeURI,
            escapeXml: escapeXml
          };
          return exports;
        },
        { './html5-entities.js': 5 }
      ],
      3: [
        function (require, module, exports) {
          
          // derived from https://github.com/mathiasbynens/String.fromCodePoint
          /*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
          if (String.fromCodePoint) {
            module.exports = function (_) {
              try {
                return String.fromCodePoint(_);
              } catch (e) {
                if (e instanceof RangeError) {
                  return String.fromCharCode(65533);
                }
                throw e;
              }
            };
          } else {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            var fromCodePoint = function () {
              var MAX_SIZE = 16384;
              var codeUnits = [];
              var highSurrogate;
              var lowSurrogate;
              var index = -1;
              var length = arguments.length;
              if (!length) {
                return '';
              }
              var result = '';
              while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                  codePoint < 0 || // not a valid Unicode code point
                  codePoint > 1114111 || // not a valid Unicode code point
                  floor(codePoint) !== codePoint  // not an integer
) {
                  return String.fromCharCode(65533);
                }
                if (codePoint <= 65535) {
                  // BMP code point
                  codeUnits.push(codePoint);
                } else {
                  // Astral code point; split in surrogate halves
                  // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                  codePoint -= 65536;
                  highSurrogate = (codePoint >> 10) + 55296;
                  lowSurrogate = codePoint % 1024 + 56320;
                  codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                  result += stringFromCharCode.apply(null, codeUnits);
                  codeUnits.length = 0;
                }
              }
              return result;
            };
            module.exports = fromCodePoint;
          }
          return exports;
        },
        {}
      ],
      4: [
        function (require, module, exports) {
          
          var escapeXml = _common_.escapeXml;
          // Helper function to produce an HTML tag.
          var tag = function (name, attrs, selfclosing) {
            var result = '<' + name;
            if (attrs && attrs.length > 0) {
              var i = 0;
              var attrib;
              while ((attrib = attrs[i]) !== undefined) {
                result += ' ' + attrib[0] + '="' + attrib[1] + '"';
                i++;
              }
            }
            if (selfclosing) {
              result += ' /';
            }
            result += '>';
            return result;
          };
          var reHtmlTag = /\<[^>]*\>/;
          var renderNodes = function (block) {
            var attrs;
            var info_words;
            var tagname;
            var walker = block.walker();
            var event, node, entering;
            var buffer = '';
            var lastOut = '\n';
            var disableTags = 0;
            var grandparent;
            var out = function (s) {
              if (disableTags > 0) {
                buffer += s.replace(reHtmlTag, '');
              } else {
                buffer += s;
              }
              lastOut = s;
            };
            var esc = this.escape;
            var cr = function () {
              if (lastOut !== '\n') {
                buffer += '\n';
                lastOut = '\n';
              }
            };
            var options = this.options;
            if (options.time) {
              console.time('rendering');
            }
            while (event = walker.next()) {
              entering = event.entering;
              node = event.node;
              attrs = [];
              if (options.sourcepos) {
                var pos = node.sourcepos;
                if (pos) {
                  attrs.push([
                    'data-sourcepos',
                    String(pos[0][0]) + ':' + String(pos[0][1]) + '-' + String(pos[1][0]) + ':' + String(pos[1][1])
                  ]);
                }
              }
              switch (node.type) {
              case 'Text':
                out(esc(node.literal, false));
                break;
              case 'Softbreak':
                out(this.softbreak);
                break;
              case 'Hardbreak':
                out(tag('br', [], true));
                cr();
                break;
              case 'Emph':
                out(tag(entering ? 'em' : '/em'));
                break;
              case 'Strong':
                out(tag(entering ? 'strong' : '/strong'));
                break;
              case 'Html':
                out(node.literal);
                break;
              case 'Link':
                if (entering) {
                  attrs.push([
                    'href',
                    esc(node.destination, true)
                  ]);
                  if (node.title) {
                    attrs.push([
                      'title',
                      esc(node.title, true)
                    ]);
                  }
                  out(tag('a', attrs));
                } else {
                  out(tag('/a'));
                }
                break;
              case 'Image':
                if (entering) {
                  if (disableTags === 0) {
                    out('<img src="' + esc(node.destination, true) + '" alt="');
                  }
                  disableTags += 1;
                } else {
                  disableTags -= 1;
                  if (disableTags === 0) {
                    if (node.title) {
                      out('" title="' + esc(node.title, true));
                    }
                    out('" />');
                  }
                }
                break;
              case 'Code':
                out(tag('code') + esc(node.literal, false) + tag('/code'));
                break;
              case 'Document':
                break;
              case 'Paragraph':
                grandparent = node.parent.parent;
                if (grandparent !== null && grandparent.type === 'List') {
                  if (grandparent.listTight) {
                    break;
                  }
                }
                if (entering) {
                  cr();
                  out(tag('p', attrs));
                } else {
                  out(tag('/p'));
                  cr();
                }
                break;
              case 'BlockQuote':
                if (entering) {
                  cr();
                  out(tag('blockquote', attrs));
                  cr();
                } else {
                  cr();
                  out(tag('/blockquote'));
                  cr();
                }
                break;
              case 'Item':
                if (entering) {
                  out(tag('li', attrs));
                } else {
                  out(tag('/li'));
                  cr();
                }
                break;
              case 'List':
                tagname = node.listType === 'Bullet' ? 'ul' : 'ol';
                if (entering) {
                  var start = node.listStart;
                  if (start && start > 1) {
                    attrs.push([
                      'start',
                      start.toString()
                    ]);
                  }
                  cr();
                  out(tag(tagname, attrs));
                  cr();
                } else {
                  cr();
                  out(tag('/' + tagname));
                  cr();
                }
                break;
              case 'Header':
                tagname = 'h' + node.level;
                if (entering) {
                  cr();
                  out(tag(tagname, attrs));
                } else {
                  out(tag('/' + tagname));
                  cr();
                }
                break;
              case 'CodeBlock':
                info_words = node.info ? node.info.split(/ +/) : [];
                if (info_words.length > 0 && info_words[0].length > 0) {
                  attrs.push([
                    'class',
                    'language-' + esc(info_words[0], true)
                  ]);
                }
                cr();
                out(tag('pre') + tag('code', attrs));
                out(esc(node.literal, false));
                out(tag('/code') + tag('/pre'));
                cr();
                break;
              case 'HtmlBlock':
                cr();
                out(node.literal);
                cr();
                break;
              case 'HorizontalRule':
                cr();
                out(tag('hr', attrs, true));
                cr();
                break;
              default:
                throw 'Unknown node type ' + node.type;
              }
            }
            if (options.time) {
              console.timeEnd('rendering');
            }
            return buffer;
          };
          // The HtmlRenderer object.
          function HtmlRenderer(options) {
            return {
              // default options:
              softbreak: '\n',
              // by default, soft breaks are rendered as newlines in HTML
              // set to "<br />" to make them hard breaks
              // set to " " if you want to ignore line wrapping in source
              escape: escapeXml,
              options: options || {},
              render: renderNodes
            };
          }
          module.exports = HtmlRenderer;
          return exports;
        },
        { './common': 2 }
      ],
      5: [
        function (require, module, exports) {
          
          var fromCodePoint = from_code_point;
          var entities = {
            AAacute: 193,
            aacute: 225,
            Abreve: 258,
            abreve: 259,
            ac: 8766,
            acd: 8767,
            acE: 8766,
            Acirc: 194,
            acirc: 226,
            acute: 180,
            Acy: 1040,
            acy: 1072,
            AElig: 198,
            aelig: 230,
            af: 8289,
            Afr: 55349,
            afr: 55349,
            Agrave: 192,
            agrave: 224,
            alefsym: 8501,
            aleph: 8501,
            Alpha: 913,
            alpha: 945,
            Amacr: 256,
            amacr: 257,
            amalg: 10815,
            amp: 38,
            AMP: 38,
            andand: 10837,
            And: 10835,
            and: 8743,
            andd: 10844,
            andslope: 10840,
            andv: 10842,
            ang: 8736,
            ange: 10660,
            angle: 8736,
            angmsdaa: 10664,
            angmsdab: 10665,
            angmsdac: 10666,
            angmsdad: 10667,
            angmsdae: 10668,
            angmsdaf: 10669,
            angmsdag: 10670,
            angmsdah: 10671,
            angmsd: 8737,
            angrt: 8735,
            angrtvb: 8894,
            angrtvbd: 10653,
            angsph: 8738,
            angst: 197,
            angzarr: 9084,
            Aogon: 260,
            aogon: 261,
            Aopf: 55349,
            aopf: 55349,
            apacir: 10863,
            ap: 8776,
            apE: 10864,
            ape: 8778,
            apid: 8779,
            apos: 39,
            ApplyFunction: 8289,
            approx: 8776,
            approxeq: 8778,
            Aring: 197,
            aring: 229,
            Ascr: 55349,
            ascr: 55349,
            Assign: 8788,
            ast: 42,
            asymp: 8776,
            asympeq: 8781,
            Atilde: 195,
            atilde: 227,
            Auml: 196,
            auml: 228,
            awconint: 8755,
            awint: 10769,
            backcong: 8780,
            backepsilon: 1014,
            backprime: 8245,
            backsim: 8765,
            backsimeq: 8909,
            Backslash: 8726,
            Barv: 10983,
            barvee: 8893,
            barwed: 8965,
            Barwed: 8966,
            barwedge: 8965,
            bbrk: 9141,
            bbrktbrk: 9142,
            bcong: 8780,
            Bcy: 1041,
            bcy: 1073,
            bdquo: 8222,
            becaus: 8757,
            because: 8757,
            Because: 8757,
            bemptyv: 10672,
            bepsi: 1014,
            bernou: 8492,
            Bernoullis: 8492,
            Beta: 914,
            beta: 946,
            beth: 8502,
            between: 8812,
            Bfr: 55349,
            bfr: 55349,
            bigcap: 8898,
            bigcirc: 9711,
            bigcup: 8899,
            bigodot: 10752,
            bigoplus: 10753,
            bigotimes: 10754,
            bigsqcup: 10758,
            bigstar: 9733,
            bigtriangledown: 9661,
            bigtriangleup: 9651,
            biguplus: 10756,
            bigvee: 8897,
            bigwedge: 8896,
            bkarow: 10509,
            blacklozenge: 10731,
            blacksquare: 9642,
            blacktriangle: 9652,
            blacktriangledown: 9662,
            blacktriangleleft: 9666,
            blacktriangleright: 9656,
            blank: 9251,
            blk12: 9618,
            blk14: 9617,
            blk34: 9619,
            block: 9608,
            bne: 61,
            bnequiv: 8801,
            bNot: 10989,
            bnot: 8976,
            Bopf: 55349,
            bopf: 55349,
            bot: 8869,
            bottom: 8869,
            bowtie: 8904,
            boxbox: 10697,
            boxdl: 9488,
            boxdL: 9557,
            boxDl: 9558,
            boxDL: 9559,
            boxdr: 9484,
            boxdR: 9554,
            boxDr: 9555,
            boxDR: 9556,
            boxh: 9472,
            boxH: 9552,
            boxhd: 9516,
            boxHd: 9572,
            boxhD: 9573,
            boxHD: 9574,
            boxhu: 9524,
            boxHu: 9575,
            boxhU: 9576,
            boxHU: 9577,
            boxminus: 8863,
            boxplus: 8862,
            boxtimes: 8864,
            boxul: 9496,
            boxuL: 9563,
            boxUl: 9564,
            boxUL: 9565,
            boxur: 9492,
            boxuR: 9560,
            boxUr: 9561,
            boxUR: 9562,
            boxv: 9474,
            boxV: 9553,
            boxvh: 9532,
            boxvH: 9578,
            boxVh: 9579,
            boxVH: 9580,
            boxvl: 9508,
            boxvL: 9569,
            boxVl: 9570,
            boxVL: 9571,
            boxvr: 9500,
            boxvR: 9566,
            boxVr: 9567,
            boxVR: 9568,
            bprime: 8245,
            breve: 728,
            Breve: 728,
            brvbar: 166,
            bscr: 55349,
            Bscr: 8492,
            bsemi: 8271,
            bsim: 8765,
            bsime: 8909,
            bsolb: 10693,
            bsol: 92,
            bsolhsub: 10184,
            bull: 8226,
            bullet: 8226,
            bump: 8782,
            bumpE: 10926,
            bumpe: 8783,
            Bumpeq: 8782,
            bumpeq: 8783,
            Cacute: 262,
            cacute: 263,
            capand: 10820,
            capbrcup: 10825,
            capcap: 10827,
            cap: 8745,
            Cap: 8914,
            capcup: 10823,
            capdot: 10816,
            CapitalDifferentialD: 8517,
            caps: 8745,
            caret: 8257,
            caron: 711,
            Cayleys: 8493,
            ccaps: 10829,
            Ccaron: 268,
            ccaron: 269,
            Ccedil: 199,
            ccedil: 231,
            Ccirc: 264,
            ccirc: 265,
            Cconint: 8752,
            ccups: 10828,
            ccupssm: 10832,
            Cdot: 266,
            cdot: 267,
            cedil: 184,
            Cedilla: 184,
            cemptyv: 10674,
            cent: 162,
            centerdot: 183,
            CenterDot: 183,
            cfr: 55349,
            Cfr: 8493,
            CHcy: 1063,
            chcy: 1095,
            check: 10003,
            checkmark: 10003,
            Chi: 935,
            chi: 967,
            circ: 710,
            circeq: 8791,
            circlearrowleft: 8634,
            circlearrowright: 8635,
            circledast: 8859,
            circledcirc: 8858,
            circleddash: 8861,
            CircleDot: 8857,
            circledR: 174,
            circledS: 9416,
            CircleMinus: 8854,
            CirclePlus: 8853,
            CircleTimes: 8855,
            cir: 9675,
            cirE: 10691,
            cire: 8791,
            cirfnint: 10768,
            cirmid: 10991,
            cirscir: 10690,
            ClockwiseContourIntegral: 8754,
            CloseCurlyDoubleQuote: 8221,
            CloseCurlyQuote: 8217,
            clubs: 9827,
            clubsuit: 9827,
            colon: 58,
            Colon: 8759,
            Colone: 10868,
            colone: 8788,
            coloneq: 8788,
            comma: 44,
            commat: 64,
            comp: 8705,
            compfn: 8728,
            complement: 8705,
            complexes: 8450,
            cong: 8773,
            congdot: 10861,
            Congruent: 8801,
            conint: 8750,
            Conint: 8751,
            ContourIntegral: 8750,
            copf: 55349,
            Copf: 8450,
            coprod: 8720,
            Coproduct: 8720,
            copy: 169,
            COPY: 169,
            copysr: 8471,
            CounterClockwiseContourIntegral: 8755,
            crarr: 8629,
            cross: 10007,
            Cross: 10799,
            Cscr: 55349,
            cscr: 55349,
            csub: 10959,
            csube: 10961,
            csup: 10960,
            csupe: 10962,
            ctdot: 8943,
            cudarrl: 10552,
            cudarrr: 10549,
            cuepr: 8926,
            cuesc: 8927,
            cularr: 8630,
            cularrp: 10557,
            cupbrcap: 10824,
            cupcap: 10822,
            CupCap: 8781,
            cup: 8746,
            Cup: 8915,
            cupcup: 10826,
            cupdot: 8845,
            cupor: 10821,
            cups: 8746,
            curarr: 8631,
            curarrm: 10556,
            curlyeqprec: 8926,
            curlyeqsucc: 8927,
            curlyvee: 8910,
            curlywedge: 8911,
            curren: 164,
            curvearrowleft: 8630,
            curvearrowright: 8631,
            cuvee: 8910,
            cuwed: 8911,
            cwconint: 8754,
            cwint: 8753,
            cylcty: 9005,
            dagger: 8224,
            Dagger: 8225,
            daleth: 8504,
            darr: 8595,
            Darr: 8609,
            dArr: 8659,
            dash: 8208,
            Dashv: 10980,
            dashv: 8867,
            dbkarow: 10511,
            dblac: 733,
            Dcaron: 270,
            dcaron: 271,
            Dcy: 1044,
            dcy: 1076,
            ddagger: 8225,
            ddarr: 8650,
            DD: 8517,
            dd: 8518,
            DDotrahd: 10513,
            ddotseq: 10871,
            deg: 176,
            Del: 8711,
            Delta: 916,
            delta: 948,
            demptyv: 10673,
            dfisht: 10623,
            Dfr: 55349,
            dfr: 55349,
            dHar: 10597,
            dharl: 8643,
            dharr: 8642,
            DiacriticalAcute: 180,
            DiacriticalDot: 729,
            DiacriticalDoubleAcute: 733,
            DiacriticalGrave: 96,
            DiacriticalTilde: 732,
            diam: 8900,
            diamond: 8900,
            Diamond: 8900,
            diamondsuit: 9830,
            diams: 9830,
            die: 168,
            DifferentialD: 8518,
            digamma: 989,
            disin: 8946,
            div: 247,
            divide: 247,
            divideontimes: 8903,
            divonx: 8903,
            DJcy: 1026,
            djcy: 1106,
            dlcorn: 8990,
            dlcrop: 8973,
            dollar: 36,
            Dopf: 55349,
            dopf: 55349,
            Dot: 168,
            dot: 729,
            DotDot: 8412,
            doteq: 8784,
            doteqdot: 8785,
            DotEqual: 8784,
            dotminus: 8760,
            dotplus: 8724,
            dotsquare: 8865,
            doublebarwedge: 8966,
            DoubleContourIntegral: 8751,
            DoubleDot: 168,
            DoubleDownArrow: 8659,
            DoubleLeftArrow: 8656,
            DoubleLeftRightArrow: 8660,
            DoubleLeftTee: 10980,
            DoubleLongLeftArrow: 10232,
            DoubleLongLeftRightArrow: 10234,
            DoubleLongRightArrow: 10233,
            DoubleRightArrow: 8658,
            DoubleRightTee: 8872,
            DoubleUpArrow: 8657,
            DoubleUpDownArrow: 8661,
            DoubleVerticalBar: 8741,
            DownArrowBar: 10515,
            downarrow: 8595,
            DownArrow: 8595,
            Downarrow: 8659,
            DownArrowUpArrow: 8693,
            DownBreve: 785,
            downdownarrows: 8650,
            downharpoonleft: 8643,
            downharpoonright: 8642,
            DownLeftRightVector: 10576,
            DownLeftTeeVector: 10590,
            DownLeftVectorBar: 10582,
            DownLeftVector: 8637,
            DownRightTeeVector: 10591,
            DownRightVectorBar: 10583,
            DownRightVector: 8641,
            DownTeeArrow: 8615,
            DownTee: 8868,
            drbkarow: 10512,
            drcorn: 8991,
            drcrop: 8972,
            Dscr: 55349,
            dscr: 55349,
            DScy: 1029,
            dscy: 1109,
            dsol: 10742,
            Dstrok: 272,
            dstrok: 273,
            dtdot: 8945,
            dtri: 9663,
            dtrif: 9662,
            duarr: 8693,
            duhar: 10607,
            dwangle: 10662,
            DZcy: 1039,
            dzcy: 1119,
            dzigrarr: 10239,
            Eacute: 201,
            eacute: 233,
            easter: 10862,
            Ecaron: 282,
            ecaron: 283,
            Ecirc: 202,
            ecirc: 234,
            ecir: 8790,
            ecolon: 8789,
            Ecy: 1069,
            ecy: 1101,
            eDDot: 10871,
            Edot: 278,
            edot: 279,
            eDot: 8785,
            ee: 8519,
            efDot: 8786,
            Efr: 55349,
            efr: 55349,
            eg: 10906,
            Egrave: 200,
            egrave: 232,
            egs: 10902,
            egsdot: 10904,
            el: 10905,
            Element: 8712,
            elinters: 9191,
            ell: 8467,
            els: 10901,
            elsdot: 10903,
            Emacr: 274,
            emacr: 275,
            empty: 8709,
            emptyset: 8709,
            EmptySmallSquare: 9723,
            emptyv: 8709,
            EmptyVerySmallSquare: 9643,
            emsp13: 8196,
            emsp14: 8197,
            emsp: 8195,
            ENG: 330,
            eng: 331,
            ensp: 8194,
            Eogon: 280,
            eogon: 281,
            Eopf: 55349,
            eopf: 55349,
            epar: 8917,
            eparsl: 10723,
            eplus: 10865,
            epsi: 949,
            Epsilon: 917,
            epsilon: 949,
            epsiv: 1013,
            eqcirc: 8790,
            eqcolon: 8789,
            eqsim: 8770,
            eqslantgtr: 10902,
            eqslantless: 10901,
            Equal: 10869,
            equals: 61,
            EqualTilde: 8770,
            equest: 8799,
            Equilibrium: 8652,
            equiv: 8801,
            equivDD: 10872,
            eqvparsl: 10725,
            erarr: 10609,
            erDot: 8787,
            escr: 8495,
            Escr: 8496,
            esdot: 8784,
            Esim: 10867,
            esim: 8770,
            Eta: 919,
            eta: 951,
            ETH: 208,
            eth: 240,
            Euml: 203,
            euml: 235,
            euro: 8364,
            excl: 33,
            exist: 8707,
            Exists: 8707,
            expectation: 8496,
            exponentiale: 8519,
            ExponentialE: 8519,
            fallingdotseq: 8786,
            Fcy: 1060,
            fcy: 1092,
            female: 9792,
            ffilig: 64259,
            fflig: 64256,
            ffllig: 64260,
            Ffr: 55349,
            ffr: 55349,
            filig: 64257,
            FilledSmallSquare: 9724,
            FilledVerySmallSquare: 9642,
            fjlig: 102,
            flat: 9837,
            fllig: 64258,
            fltns: 9649,
            fnof: 402,
            Fopf: 55349,
            fopf: 55349,
            forall: 8704,
            ForAll: 8704,
            fork: 8916,
            forkv: 10969,
            Fouriertrf: 8497,
            fpartint: 10765,
            frac12: 189,
            frac13: 8531,
            frac14: 188,
            frac15: 8533,
            frac16: 8537,
            frac18: 8539,
            frac23: 8532,
            frac25: 8534,
            frac34: 190,
            frac35: 8535,
            frac38: 8540,
            frac45: 8536,
            frac56: 8538,
            frac58: 8541,
            frac78: 8542,
            frasl: 8260,
            frown: 8994,
            fscr: 55349,
            Fscr: 8497,
            gacute: 501,
            Gamma: 915,
            gamma: 947,
            Gammad: 988,
            gammad: 989,
            gap: 10886,
            Gbreve: 286,
            gbreve: 287,
            Gcedil: 290,
            Gcirc: 284,
            gcirc: 285,
            Gcy: 1043,
            gcy: 1075,
            Gdot: 288,
            gdot: 289,
            ge: 8805,
            gE: 8807,
            gEl: 10892,
            gel: 8923,
            geq: 8805,
            geqq: 8807,
            geqslant: 10878,
            gescc: 10921,
            ges: 10878,
            gesdot: 10880,
            gesdoto: 10882,
            gesdotol: 10884,
            gesl: 8923,
            gesles: 10900,
            Gfr: 55349,
            gfr: 55349,
            gg: 8811,
            Gg: 8921,
            ggg: 8921,
            gimel: 8503,
            GJcy: 1027,
            gjcy: 1107,
            gla: 10917,
            gl: 8823,
            glE: 10898,
            glj: 10916,
            gnap: 10890,
            gnapprox: 10890,
            gne: 10888,
            gnE: 8809,
            gneq: 10888,
            gneqq: 8809,
            gnsim: 8935,
            Gopf: 55349,
            gopf: 55349,
            grave: 96,
            GreaterEqual: 8805,
            GreaterEqualLess: 8923,
            GreaterFullEqual: 8807,
            GreaterGreater: 10914,
            GreaterLess: 8823,
            GreaterSlantEqual: 10878,
            GreaterTilde: 8819,
            Gscr: 55349,
            gscr: 8458,
            gsim: 8819,
            gsime: 10894,
            gsiml: 10896,
            gtcc: 10919,
            gtcir: 10874,
            gt: 62,
            GT: 62,
            Gt: 8811,
            gtdot: 8919,
            gtlPar: 10645,
            gtquest: 10876,
            gtrapprox: 10886,
            gtrarr: 10616,
            gtrdot: 8919,
            gtreqless: 8923,
            gtreqqless: 10892,
            gtrless: 8823,
            gtrsim: 8819,
            gvertneqq: 8809,
            gvnE: 8809,
            Hacek: 711,
            hairsp: 8202,
            half: 189,
            hamilt: 8459,
            HARDcy: 1066,
            hardcy: 1098,
            harrcir: 10568,
            harr: 8596,
            hArr: 8660,
            harrw: 8621,
            Hat: 94,
            hbar: 8463,
            Hcirc: 292,
            hcirc: 293,
            hearts: 9829,
            heartsuit: 9829,
            hellip: 8230,
            hercon: 8889,
            hfr: 55349,
            Hfr: 8460,
            HilbertSpace: 8459,
            hksearow: 10533,
            hkswarow: 10534,
            hoarr: 8703,
            homtht: 8763,
            hookleftarrow: 8617,
            hookrightarrow: 8618,
            hopf: 55349,
            Hopf: 8461,
            horbar: 8213,
            HorizontalLine: 9472,
            hscr: 55349,
            Hscr: 8459,
            hslash: 8463,
            Hstrok: 294,
            hstrok: 295,
            HumpDownHump: 8782,
            HumpEqual: 8783,
            hybull: 8259,
            hyphen: 8208,
            Iacute: 205,
            iacute: 237,
            ic: 8291,
            Icirc: 206,
            icirc: 238,
            Icy: 1048,
            icy: 1080,
            Idot: 304,
            IEcy: 1045,
            iecy: 1077,
            iexcl: 161,
            iff: 8660,
            ifr: 55349,
            Ifr: 8465,
            Igrave: 204,
            igrave: 236,
            ii: 8520,
            iiiint: 10764,
            iiint: 8749,
            iinfin: 10716,
            iiota: 8489,
            IJlig: 306,
            ijlig: 307,
            Imacr: 298,
            imacr: 299,
            image: 8465,
            ImaginaryI: 8520,
            imagline: 8464,
            imagpart: 8465,
            imath: 305,
            Im: 8465,
            imof: 8887,
            imped: 437,
            Implies: 8658,
            incare: 8453,
            'in': 8712,
            infin: 8734,
            infintie: 10717,
            inodot: 305,
            intcal: 8890,
            int: 8747,
            Int: 8748,
            integers: 8484,
            Integral: 8747,
            intercal: 8890,
            Intersection: 8898,
            intlarhk: 10775,
            intprod: 10812,
            InvisibleComma: 8291,
            InvisibleTimes: 8290,
            IOcy: 1025,
            iocy: 1105,
            Iogon: 302,
            iogon: 303,
            Iopf: 55349,
            iopf: 55349,
            Iota: 921,
            iota: 953,
            iprod: 10812,
            iquest: 191,
            iscr: 55349,
            Iscr: 8464,
            isin: 8712,
            isindot: 8949,
            isinE: 8953,
            isins: 8948,
            isinsv: 8947,
            isinv: 8712,
            it: 8290,
            Itilde: 296,
            itilde: 297,
            Iukcy: 1030,
            iukcy: 1110,
            Iuml: 207,
            iuml: 239,
            Jcirc: 308,
            jcirc: 309,
            Jcy: 1049,
            jcy: 1081,
            Jfr: 55349,
            jfr: 55349,
            jmath: 567,
            Jopf: 55349,
            jopf: 55349,
            Jscr: 55349,
            jscr: 55349,
            Jsercy: 1032,
            jsercy: 1112,
            Jukcy: 1028,
            jukcy: 1108,
            Kappa: 922,
            kappa: 954,
            kappav: 1008,
            Kcedil: 310,
            kcedil: 311,
            Kcy: 1050,
            kcy: 1082,
            Kfr: 55349,
            kfr: 55349,
            kgreen: 312,
            KHcy: 1061,
            khcy: 1093,
            KJcy: 1036,
            kjcy: 1116,
            Kopf: 55349,
            kopf: 55349,
            Kscr: 55349,
            kscr: 55349,
            lAarr: 8666,
            Lacute: 313,
            lacute: 314,
            laemptyv: 10676,
            lagran: 8466,
            Lambda: 923,
            lambda: 955,
            lang: 10216,
            Lang: 10218,
            langd: 10641,
            langle: 10216,
            lap: 10885,
            Laplacetrf: 8466,
            laquo: 171,
            larrb: 8676,
            larrbfs: 10527,
            larr: 8592,
            Larr: 8606,
            lArr: 8656,
            larrfs: 10525,
            larrhk: 8617,
            larrlp: 8619,
            larrpl: 10553,
            larrsim: 10611,
            larrtl: 8610,
            latail: 10521,
            lAtail: 10523,
            lat: 10923,
            late: 10925,
            lates: 10925,
            lbarr: 10508,
            lBarr: 10510,
            lbbrk: 10098,
            lbrace: 123,
            lbrack: 91,
            lbrke: 10635,
            lbrksld: 10639,
            lbrkslu: 10637,
            Lcaron: 317,
            lcaron: 318,
            Lcedil: 315,
            lcedil: 316,
            lceil: 8968,
            lcub: 123,
            Lcy: 1051,
            lcy: 1083,
            ldca: 10550,
            ldquo: 8220,
            ldquor: 8222,
            ldrdhar: 10599,
            ldrushar: 10571,
            ldsh: 8626,
            le: 8804,
            lE: 8806,
            LeftAngleBracket: 10216,
            LeftArrowBar: 8676,
            leftarrow: 8592,
            LeftArrow: 8592,
            Leftarrow: 8656,
            LeftArrowRightArrow: 8646,
            leftarrowtail: 8610,
            LeftCeiling: 8968,
            LeftDoubleBracket: 10214,
            LeftDownTeeVector: 10593,
            LeftDownVectorBar: 10585,
            LeftDownVector: 8643,
            LeftFloor: 8970,
            leftharpoondown: 8637,
            leftharpoonup: 8636,
            leftleftarrows: 8647,
            leftrightarrow: 8596,
            LeftRightArrow: 8596,
            Leftrightarrow: 8660,
            leftrightarrows: 8646,
            leftrightharpoons: 8651,
            leftrightsquigarrow: 8621,
            LeftRightVector: 10574,
            LeftTeeArrow: 8612,
            LeftTee: 8867,
            LeftTeeVector: 10586,
            leftthreetimes: 8907,
            LeftTriangleBar: 10703,
            LeftTriangle: 8882,
            LeftTriangleEqual: 8884,
            LeftUpDownVector: 10577,
            LeftUpTeeVector: 10592,
            LeftUpVectorBar: 10584,
            LeftUpVector: 8639,
            LeftVectorBar: 10578,
            LeftVector: 8636,
            lEg: 10891,
            leg: 8922,
            leq: 8804,
            leqq: 8806,
            leqslant: 10877,
            lescc: 10920,
            les: 10877,
            lesdot: 10879,
            lesdoto: 10881,
            lesdotor: 10883,
            lesg: 8922,
            lesges: 10899,
            lessapprox: 10885,
            lessdot: 8918,
            lesseqgtr: 8922,
            lesseqqgtr: 10891,
            LessEqualGreater: 8922,
            LessFullEqual: 8806,
            LessGreater: 8822,
            lessgtr: 8822,
            LessLess: 10913,
            lesssim: 8818,
            LessSlantEqual: 10877,
            LessTilde: 8818,
            lfisht: 10620,
            lfloor: 8970,
            Lfr: 55349,
            lfr: 55349,
            lg: 8822,
            lgE: 10897,
            lHar: 10594,
            lhard: 8637,
            lharu: 8636,
            lharul: 10602,
            lhblk: 9604,
            LJcy: 1033,
            ljcy: 1113,
            llarr: 8647,
            ll: 8810,
            Ll: 8920,
            llcorner: 8990,
            Lleftarrow: 8666,
            llhard: 10603,
            lltri: 9722,
            Lmidot: 319,
            lmidot: 320,
            lmoustache: 9136,
            lmoust: 9136,
            lnap: 10889,
            lnapprox: 10889,
            lne: 10887,
            lnE: 8808,
            lneq: 10887,
            lneqq: 8808,
            lnsim: 8934,
            loang: 10220,
            loarr: 8701,
            lobrk: 10214,
            longleftarrow: 10229,
            LongLeftArrow: 10229,
            Longleftarrow: 10232,
            longleftrightarrow: 10231,
            LongLeftRightArrow: 10231,
            Longleftrightarrow: 10234,
            longmapsto: 10236,
            longrightarrow: 10230,
            LongRightArrow: 10230,
            Longrightarrow: 10233,
            looparrowleft: 8619,
            looparrowright: 8620,
            lopar: 10629,
            Lopf: 55349,
            lopf: 55349,
            loplus: 10797,
            lotimes: 10804,
            lowast: 8727,
            lowbar: 95,
            LowerLeftArrow: 8601,
            LowerRightArrow: 8600,
            loz: 9674,
            lozenge: 9674,
            lozf: 10731,
            lpar: 40,
            lparlt: 10643,
            lrarr: 8646,
            lrcorner: 8991,
            lrhar: 8651,
            lrhard: 10605,
            lrm: 8206,
            lrtri: 8895,
            lsaquo: 8249,
            lscr: 55349,
            Lscr: 8466,
            lsh: 8624,
            Lsh: 8624,
            lsim: 8818,
            lsime: 10893,
            lsimg: 10895,
            lsqb: 91,
            lsquo: 8216,
            lsquor: 8218,
            Lstrok: 321,
            lstrok: 322,
            ltcc: 10918,
            ltcir: 10873,
            lt: 60,
            LT: 60,
            Lt: 8810,
            ltdot: 8918,
            lthree: 8907,
            ltimes: 8905,
            ltlarr: 10614,
            ltquest: 10875,
            ltri: 9667,
            ltrie: 8884,
            ltrif: 9666,
            ltrPar: 10646,
            lurdshar: 10570,
            luruhar: 10598,
            lvertneqq: 8808,
            lvnE: 8808,
            macr: 175,
            male: 9794,
            malt: 10016,
            maltese: 10016,
            Map: 10501,
            map: 8614,
            mapsto: 8614,
            mapstodown: 8615,
            mapstoleft: 8612,
            mapstoup: 8613,
            marker: 9646,
            mcomma: 10793,
            Mcy: 1052,
            mcy: 1084,
            mdash: 8212,
            mDDot: 8762,
            measuredangle: 8737,
            MediumSpace: 8287,
            Mellintrf: 8499,
            Mfr: 55349,
            mfr: 55349,
            mho: 8487,
            micro: 181,
            midast: 42,
            midcir: 10992,
            mid: 8739,
            middot: 183,
            minusb: 8863,
            minus: 8722,
            minusd: 8760,
            minusdu: 10794,
            MinusPlus: 8723,
            mlcp: 10971,
            mldr: 8230,
            mnplus: 8723,
            models: 8871,
            Mopf: 55349,
            mopf: 55349,
            mp: 8723,
            mscr: 55349,
            Mscr: 8499,
            mstpos: 8766,
            Mu: 924,
            mu: 956,
            multimap: 8888,
            mumap: 8888,
            nabla: 8711,
            Nacute: 323,
            nacute: 324,
            nang: 8736,
            nap: 8777,
            napE: 10864,
            napid: 8779,
            napos: 329,
            napprox: 8777,
            natural: 9838,
            naturals: 8469,
            natur: 9838,
            nbsp: 160,
            nbump: 8782,
            nbumpe: 8783,
            ncap: 10819,
            Ncaron: 327,
            ncaron: 328,
            Ncedil: 325,
            ncedil: 326,
            ncong: 8775,
            ncongdot: 10861,
            ncup: 10818,
            Ncy: 1053,
            ncy: 1085,
            ndash: 8211,
            nearhk: 10532,
            nearr: 8599,
            neArr: 8663,
            nearrow: 8599,
            ne: 8800,
            nedot: 8784,
            NegativeMediumSpace: 8203,
            NegativeThickSpace: 8203,
            NegativeThinSpace: 8203,
            NegativeVeryThinSpace: 8203,
            nequiv: 8802,
            nesear: 10536,
            nesim: 8770,
            NestedGreaterGreater: 8811,
            NestedLessLess: 8810,
            NewLine: 10,
            nexist: 8708,
            nexists: 8708,
            Nfr: 55349,
            nfr: 55349,
            ngE: 8807,
            nge: 8817,
            ngeq: 8817,
            ngeqq: 8807,
            ngeqslant: 10878,
            nges: 10878,
            nGg: 8921,
            ngsim: 8821,
            nGt: 8811,
            ngt: 8815,
            ngtr: 8815,
            nGtv: 8811,
            nharr: 8622,
            nhArr: 8654,
            nhpar: 10994,
            ni: 8715,
            nis: 8956,
            nisd: 8954,
            niv: 8715,
            NJcy: 1034,
            njcy: 1114,
            nlarr: 8602,
            nlArr: 8653,
            nldr: 8229,
            nlE: 8806,
            nle: 8816,
            nleftarrow: 8602,
            nLeftarrow: 8653,
            nleftrightarrow: 8622,
            nLeftrightarrow: 8654,
            nleq: 8816,
            nleqq: 8806,
            nleqslant: 10877,
            nles: 10877,
            nless: 8814,
            nLl: 8920,
            nlsim: 8820,
            nLt: 8810,
            nlt: 8814,
            nltri: 8938,
            nltrie: 8940,
            nLtv: 8810,
            nmid: 8740,
            NoBreak: 8288,
            NonBreakingSpace: 160,
            nopf: 55349,
            Nopf: 8469,
            Not: 10988,
            not: 172,
            NotCongruent: 8802,
            NotCupCap: 8813,
            NotDoubleVerticalBar: 8742,
            NotElement: 8713,
            NotEqual: 8800,
            NotEqualTilde: 8770,
            NotExists: 8708,
            NotGreater: 8815,
            NotGreaterEqual: 8817,
            NotGreaterFullEqual: 8807,
            NotGreaterGreater: 8811,
            NotGreaterLess: 8825,
            NotGreaterSlantEqual: 10878,
            NotGreaterTilde: 8821,
            NotHumpDownHump: 8782,
            NotHumpEqual: 8783,
            notin: 8713,
            notindot: 8949,
            notinE: 8953,
            notinva: 8713,
            notinvb: 8951,
            notinvc: 8950,
            NotLeftTriangleBar: 10703,
            NotLeftTriangle: 8938,
            NotLeftTriangleEqual: 8940,
            NotLess: 8814,
            NotLessEqual: 8816,
            NotLessGreater: 8824,
            NotLessLess: 8810,
            NotLessSlantEqual: 10877,
            NotLessTilde: 8820,
            NotNestedGreaterGreater: 10914,
            NotNestedLessLess: 10913,
            notni: 8716,
            notniva: 8716,
            notnivb: 8958,
            notnivc: 8957,
            NotPrecedes: 8832,
            NotPrecedesEqual: 10927,
            NotPrecedesSlantEqual: 8928,
            NotReverseElement: 8716,
            NotRightTriangleBar: 10704,
            NotRightTriangle: 8939,
            NotRightTriangleEqual: 8941,
            NotSquareSubset: 8847,
            NotSquareSubsetEqual: 8930,
            NotSquareSuperset: 8848,
            NotSquareSupersetEqual: 8931,
            NotSubset: 8834,
            NotSubsetEqual: 8840,
            NotSucceeds: 8833,
            NotSucceedsEqual: 10928,
            NotSucceedsSlantEqual: 8929,
            NotSucceedsTilde: 8831,
            NotSuperset: 8835,
            NotSupersetEqual: 8841,
            NotTilde: 8769,
            NotTildeEqual: 8772,
            NotTildeFullEqual: 8775,
            NotTildeTilde: 8777,
            NotVerticalBar: 8740,
            nparallel: 8742,
            npar: 8742,
            nparsl: 11005,
            npart: 8706,
            npolint: 10772,
            npr: 8832,
            nprcue: 8928,
            nprec: 8832,
            npreceq: 10927,
            npre: 10927,
            nrarrc: 10547,
            nrarr: 8603,
            nrArr: 8655,
            nrarrw: 8605,
            nrightarrow: 8603,
            nRightarrow: 8655,
            nrtri: 8939,
            nrtrie: 8941,
            nsc: 8833,
            nsccue: 8929,
            nsce: 10928,
            Nscr: 55349,
            nscr: 55349,
            nshortmid: 8740,
            nshortparallel: 8742,
            nsim: 8769,
            nsime: 8772,
            nsimeq: 8772,
            nsmid: 8740,
            nspar: 8742,
            nsqsube: 8930,
            nsqsupe: 8931,
            nsub: 8836,
            nsubE: 10949,
            nsube: 8840,
            nsubset: 8834,
            nsubseteq: 8840,
            nsubseteqq: 10949,
            nsucc: 8833,
            nsucceq: 10928,
            nsup: 8837,
            nsupE: 10950,
            nsupe: 8841,
            nsupset: 8835,
            nsupseteq: 8841,
            nsupseteqq: 10950,
            ntgl: 8825,
            Ntilde: 209,
            ntilde: 241,
            ntlg: 8824,
            ntriangleleft: 8938,
            ntrianglelefteq: 8940,
            ntriangleright: 8939,
            ntrianglerighteq: 8941,
            Nu: 925,
            nu: 957,
            num: 35,
            numero: 8470,
            numsp: 8199,
            nvap: 8781,
            nvdash: 8876,
            nvDash: 8877,
            nVdash: 8878,
            nVDash: 8879,
            nvge: 8805,
            nvgt: 62,
            nvHarr: 10500,
            nvinfin: 10718,
            nvlArr: 10498,
            nvle: 8804,
            nvlt: 62,
            nvltrie: 8884,
            nvrArr: 10499,
            nvrtrie: 8885,
            nvsim: 8764,
            nwarhk: 10531,
            nwarr: 8598,
            nwArr: 8662,
            nwarrow: 8598,
            nwnear: 10535,
            Oacute: 211,
            oacute: 243,
            oast: 8859,
            Ocirc: 212,
            ocirc: 244,
            ocir: 8858,
            Ocy: 1054,
            ocy: 1086,
            odash: 8861,
            Odblac: 336,
            odblac: 337,
            odiv: 10808,
            odot: 8857,
            odsold: 10684,
            OElig: 338,
            oelig: 339,
            ofcir: 10687,
            Ofr: 55349,
            ofr: 55349,
            ogon: 731,
            Ograve: 210,
            ograve: 242,
            ogt: 10689,
            ohbar: 10677,
            ohm: 937,
            oint: 8750,
            olarr: 8634,
            olcir: 10686,
            olcross: 10683,
            oline: 8254,
            olt: 10688,
            Omacr: 332,
            omacr: 333,
            Omega: 937,
            omega: 969,
            Omicron: 927,
            omicron: 959,
            omid: 10678,
            ominus: 8854,
            Oopf: 55349,
            oopf: 55349,
            opar: 10679,
            OpenCurlyDoubleQuote: 8220,
            OpenCurlyQuote: 8216,
            operp: 10681,
            oplus: 8853,
            orarr: 8635,
            Or: 10836,
            or: 8744,
            ord: 10845,
            order: 8500,
            orderof: 8500,
            ordf: 170,
            ordm: 186,
            origof: 8886,
            oror: 10838,
            orslope: 10839,
            orv: 10843,
            oS: 9416,
            Oscr: 55349,
            oscr: 8500,
            Oslash: 216,
            oslash: 248,
            osol: 8856,
            Otilde: 213,
            otilde: 245,
            otimesas: 10806,
            Otimes: 10807,
            otimes: 8855,
            Ouml: 214,
            ouml: 246,
            ovbar: 9021,
            OverBar: 8254,
            OverBrace: 9182,
            OverBracket: 9140,
            OverParenthesis: 9180,
            para: 182,
            parallel: 8741,
            par: 8741,
            parsim: 10995,
            parsl: 11005,
            part: 8706,
            PartialD: 8706,
            Pcy: 1055,
            pcy: 1087,
            percnt: 37,
            period: 46,
            permil: 8240,
            perp: 8869,
            pertenk: 8241,
            Pfr: 55349,
            pfr: 55349,
            Phi: 934,
            phi: 966,
            phiv: 981,
            phmmat: 8499,
            phone: 9742,
            Pi: 928,
            pi: 960,
            pitchfork: 8916,
            piv: 982,
            planck: 8463,
            planckh: 8462,
            plankv: 8463,
            plusacir: 10787,
            plusb: 8862,
            pluscir: 10786,
            plus: 43,
            plusdo: 8724,
            plusdu: 10789,
            pluse: 10866,
            PlusMinus: 177,
            plusmn: 177,
            plussim: 10790,
            plustwo: 10791,
            pm: 177,
            Poincareplane: 8460,
            pointint: 10773,
            popf: 55349,
            Popf: 8473,
            pound: 163,
            prap: 10935,
            Pr: 10939,
            pr: 8826,
            prcue: 8828,
            precapprox: 10935,
            prec: 8826,
            preccurlyeq: 8828,
            Precedes: 8826,
            PrecedesEqual: 10927,
            PrecedesSlantEqual: 8828,
            PrecedesTilde: 8830,
            preceq: 10927,
            precnapprox: 10937,
            precneqq: 10933,
            precnsim: 8936,
            pre: 10927,
            prE: 10931,
            precsim: 8830,
            prime: 8242,
            Prime: 8243,
            primes: 8473,
            prnap: 10937,
            prnE: 10933,
            prnsim: 8936,
            prod: 8719,
            Product: 8719,
            profalar: 9006,
            profline: 8978,
            profsurf: 8979,
            prop: 8733,
            Proportional: 8733,
            Proportion: 8759,
            propto: 8733,
            prsim: 8830,
            prurel: 8880,
            Pscr: 55349,
            pscr: 55349,
            Psi: 936,
            psi: 968,
            puncsp: 8200,
            Qfr: 55349,
            qfr: 55349,
            qint: 10764,
            qopf: 55349,
            Qopf: 8474,
            qprime: 8279,
            Qscr: 55349,
            qscr: 55349,
            quaternions: 8461,
            quatint: 10774,
            quest: 63,
            questeq: 8799,
            quot: 34,
            QUOT: 34,
            rAarr: 8667,
            race: 8765,
            Racute: 340,
            racute: 341,
            radic: 8730,
            raemptyv: 10675,
            rang: 10217,
            Rang: 10219,
            rangd: 10642,
            range: 10661,
            rangle: 10217,
            raquo: 187,
            rarrap: 10613,
            rarrb: 8677,
            rarrbfs: 10528,
            rarrc: 10547,
            rarr: 8594,
            Rarr: 8608,
            rArr: 8658,
            rarrfs: 10526,
            rarrhk: 8618,
            rarrlp: 8620,
            rarrpl: 10565,
            rarrsim: 10612,
            Rarrtl: 10518,
            rarrtl: 8611,
            rarrw: 8605,
            ratail: 10522,
            rAtail: 10524,
            ratio: 8758,
            rationals: 8474,
            rbarr: 10509,
            rBarr: 10511,
            RBarr: 10512,
            rbbrk: 10099,
            rbrace: 125,
            rbrack: 93,
            rbrke: 10636,
            rbrksld: 10638,
            rbrkslu: 10640,
            Rcaron: 344,
            rcaron: 345,
            Rcedil: 342,
            rcedil: 343,
            rceil: 8969,
            rcub: 125,
            Rcy: 1056,
            rcy: 1088,
            rdca: 10551,
            rdldhar: 10601,
            rdquo: 8221,
            rdquor: 8221,
            rdsh: 8627,
            real: 8476,
            realine: 8475,
            realpart: 8476,
            reals: 8477,
            Re: 8476,
            rect: 9645,
            reg: 174,
            REG: 174,
            ReverseElement: 8715,
            ReverseEquilibrium: 8651,
            ReverseUpEquilibrium: 10607,
            rfisht: 10621,
            rfloor: 8971,
            rfr: 55349,
            Rfr: 8476,
            rHar: 10596,
            rhard: 8641,
            rharu: 8640,
            rharul: 10604,
            Rho: 929,
            rho: 961,
            rhov: 1009,
            RightAngleBracket: 10217,
            RightArrowBar: 8677,
            rightarrow: 8594,
            RightArrow: 8594,
            Rightarrow: 8658,
            RightArrowLeftArrow: 8644,
            rightarrowtail: 8611,
            RightCeiling: 8969,
            RightDoubleBracket: 10215,
            RightDownTeeVector: 10589,
            RightDownVectorBar: 10581,
            RightDownVector: 8642,
            RightFloor: 8971,
            rightharpoondown: 8641,
            rightharpoonup: 8640,
            rightleftarrows: 8644,
            rightleftharpoons: 8652,
            rightrightarrows: 8649,
            rightsquigarrow: 8605,
            RightTeeArrow: 8614,
            RightTee: 8866,
            RightTeeVector: 10587,
            rightthreetimes: 8908,
            RightTriangleBar: 10704,
            RightTriangle: 8883,
            RightTriangleEqual: 8885,
            RightUpDownVector: 10575,
            RightUpTeeVector: 10588,
            RightUpVectorBar: 10580,
            RightUpVector: 8638,
            RightVectorBar: 10579,
            RightVector: 8640,
            ring: 730,
            risingdotseq: 8787,
            rlarr: 8644,
            rlhar: 8652,
            rlm: 8207,
            rmoustache: 9137,
            rmoust: 9137,
            rnmid: 10990,
            roang: 10221,
            roarr: 8702,
            robrk: 10215,
            ropar: 10630,
            ropf: 55349,
            Ropf: 8477,
            roplus: 10798,
            rotimes: 10805,
            RoundImplies: 10608,
            rpar: 41,
            rpargt: 10644,
            rppolint: 10770,
            rrarr: 8649,
            Rrightarrow: 8667,
            rsaquo: 8250,
            rscr: 55349,
            Rscr: 8475,
            rsh: 8625,
            Rsh: 8625,
            rsqb: 93,
            rsquo: 8217,
            rsquor: 8217,
            rthree: 8908,
            rtimes: 8906,
            rtri: 9657,
            rtrie: 8885,
            rtrif: 9656,
            rtriltri: 10702,
            RuleDelayed: 10740,
            ruluhar: 10600,
            rx: 8478,
            Sacute: 346,
            sacute: 347,
            sbquo: 8218,
            scap: 10936,
            Scaron: 352,
            scaron: 353,
            Sc: 10940,
            sc: 8827,
            sccue: 8829,
            sce: 10928,
            scE: 10932,
            Scedil: 350,
            scedil: 351,
            Scirc: 348,
            scirc: 349,
            scnap: 10938,
            scnE: 10934,
            scnsim: 8937,
            scpolint: 10771,
            scsim: 8831,
            Scy: 1057,
            scy: 1089,
            sdotb: 8865,
            sdot: 8901,
            sdote: 10854,
            searhk: 10533,
            searr: 8600,
            seArr: 8664,
            searrow: 8600,
            sect: 167,
            semi: 59,
            seswar: 10537,
            setminus: 8726,
            setmn: 8726,
            sext: 10038,
            Sfr: 55349,
            sfr: 55349,
            sfrown: 8994,
            sharp: 9839,
            SHCHcy: 1065,
            shchcy: 1097,
            SHcy: 1064,
            shcy: 1096,
            ShortDownArrow: 8595,
            ShortLeftArrow: 8592,
            shortmid: 8739,
            shortparallel: 8741,
            ShortRightArrow: 8594,
            ShortUpArrow: 8593,
            shy: 173,
            Sigma: 931,
            sigma: 963,
            sigmaf: 962,
            sigmav: 962,
            sim: 8764,
            simdot: 10858,
            sime: 8771,
            simeq: 8771,
            simg: 10910,
            simgE: 10912,
            siml: 10909,
            simlE: 10911,
            simne: 8774,
            simplus: 10788,
            simrarr: 10610,
            slarr: 8592,
            SmallCircle: 8728,
            smallsetminus: 8726,
            smashp: 10803,
            smeparsl: 10724,
            smid: 8739,
            smile: 8995,
            smt: 10922,
            smte: 10924,
            smtes: 10924,
            SOFTcy: 1068,
            softcy: 1100,
            solbar: 9023,
            solb: 10692,
            sol: 47,
            Sopf: 55349,
            sopf: 55349,
            spades: 9824,
            spadesuit: 9824,
            spar: 8741,
            sqcap: 8851,
            sqcaps: 8851,
            sqcup: 8852,
            sqcups: 8852,
            Sqrt: 8730,
            sqsub: 8847,
            sqsube: 8849,
            sqsubset: 8847,
            sqsubseteq: 8849,
            sqsup: 8848,
            sqsupe: 8850,
            sqsupset: 8848,
            sqsupseteq: 8850,
            square: 9633,
            Square: 9633,
            SquareIntersection: 8851,
            SquareSubset: 8847,
            SquareSubsetEqual: 8849,
            SquareSuperset: 8848,
            SquareSupersetEqual: 8850,
            SquareUnion: 8852,
            squarf: 9642,
            squ: 9633,
            squf: 9642,
            srarr: 8594,
            Sscr: 55349,
            sscr: 55349,
            ssetmn: 8726,
            ssmile: 8995,
            sstarf: 8902,
            Star: 8902,
            star: 9734,
            starf: 9733,
            straightepsilon: 1013,
            straightphi: 981,
            strns: 175,
            sub: 8834,
            Sub: 8912,
            subdot: 10941,
            subE: 10949,
            sube: 8838,
            subedot: 10947,
            submult: 10945,
            subnE: 10955,
            subne: 8842,
            subplus: 10943,
            subrarr: 10617,
            subset: 8834,
            Subset: 8912,
            subseteq: 8838,
            subseteqq: 10949,
            SubsetEqual: 8838,
            subsetneq: 8842,
            subsetneqq: 10955,
            subsim: 10951,
            subsub: 10965,
            subsup: 10963,
            succapprox: 10936,
            succ: 8827,
            succcurlyeq: 8829,
            Succeeds: 8827,
            SucceedsEqual: 10928,
            SucceedsSlantEqual: 8829,
            SucceedsTilde: 8831,
            succeq: 10928,
            succnapprox: 10938,
            succneqq: 10934,
            succnsim: 8937,
            succsim: 8831,
            SuchThat: 8715,
            sum: 8721,
            Sum: 8721,
            sung: 9834,
            sup1: 185,
            sup2: 178,
            sup3: 179,
            sup: 8835,
            Sup: 8913,
            supdot: 10942,
            supdsub: 10968,
            supE: 10950,
            supe: 8839,
            supedot: 10948,
            Superset: 8835,
            SupersetEqual: 8839,
            suphsol: 10185,
            suphsub: 10967,
            suplarr: 10619,
            supmult: 10946,
            supnE: 10956,
            supne: 8843,
            supplus: 10944,
            supset: 8835,
            Supset: 8913,
            supseteq: 8839,
            supseteqq: 10950,
            supsetneq: 8843,
            supsetneqq: 10956,
            supsim: 10952,
            supsub: 10964,
            supsup: 10966,
            swarhk: 10534,
            swarr: 8601,
            swArr: 8665,
            swarrow: 8601,
            swnwar: 10538,
            szlig: 223,
            Tab: NaN,
            target: 8982,
            Tau: 932,
            tau: 964,
            tbrk: 9140,
            Tcaron: 356,
            tcaron: 357,
            Tcedil: 354,
            tcedil: 355,
            Tcy: 1058,
            tcy: 1090,
            tdot: 8411,
            telrec: 8981,
            Tfr: 55349,
            tfr: 55349,
            there4: 8756,
            therefore: 8756,
            Therefore: 8756,
            Theta: 920,
            theta: 952,
            thetasym: 977,
            thetav: 977,
            thickapprox: 8776,
            thicksim: 8764,
            ThickSpace: 8287,
            ThinSpace: 8201,
            thinsp: 8201,
            thkap: 8776,
            thksim: 8764,
            THORN: 222,
            thorn: 254,
            tilde: 732,
            Tilde: 8764,
            TildeEqual: 8771,
            TildeFullEqual: 8773,
            TildeTilde: 8776,
            timesbar: 10801,
            timesb: 8864,
            times: 215,
            timesd: 10800,
            tint: 8749,
            toea: 10536,
            topbot: 9014,
            topcir: 10993,
            top: 8868,
            Topf: 55349,
            topf: 55349,
            topfork: 10970,
            tosa: 10537,
            tprime: 8244,
            trade: 8482,
            TRADE: 8482,
            triangle: 9653,
            triangledown: 9663,
            triangleleft: 9667,
            trianglelefteq: 8884,
            triangleq: 8796,
            triangleright: 9657,
            trianglerighteq: 8885,
            tridot: 9708,
            trie: 8796,
            triminus: 10810,
            TripleDot: 8411,
            triplus: 10809,
            trisb: 10701,
            tritime: 10811,
            trpezium: 9186,
            Tscr: 55349,
            tscr: 55349,
            TScy: 1062,
            tscy: 1094,
            TSHcy: 1035,
            tshcy: 1115,
            Tstrok: 358,
            tstrok: 359,
            twixt: 8812,
            twoheadleftarrow: 8606,
            twoheadrightarrow: 8608,
            Uacute: 218,
            uacute: 250,
            uarr: 8593,
            Uarr: 8607,
            uArr: 8657,
            Uarrocir: 10569,
            Ubrcy: 1038,
            ubrcy: 1118,
            Ubreve: 364,
            ubreve: 365,
            Ucirc: 219,
            ucirc: 251,
            Ucy: 1059,
            ucy: 1091,
            udarr: 8645,
            Udblac: 368,
            udblac: 369,
            udhar: 10606,
            ufisht: 10622,
            Ufr: 55349,
            ufr: 55349,
            Ugrave: 217,
            ugrave: 249,
            uHar: 10595,
            uharl: 8639,
            uharr: 8638,
            uhblk: 9600,
            ulcorn: 8988,
            ulcorner: 8988,
            ulcrop: 8975,
            ultri: 9720,
            Umacr: 362,
            umacr: 363,
            uml: 168,
            UnderBar: 95,
            UnderBrace: 9183,
            UnderBracket: 9141,
            UnderParenthesis: 9181,
            Union: 8899,
            UnionPlus: 8846,
            Uogon: 370,
            uogon: 371,
            Uopf: 55349,
            uopf: 55349,
            UpArrowBar: 10514,
            uparrow: 8593,
            UpArrow: 8593,
            Uparrow: 8657,
            UpArrowDownArrow: 8645,
            updownarrow: 8597,
            UpDownArrow: 8597,
            Updownarrow: 8661,
            UpEquilibrium: 10606,
            upharpoonleft: 8639,
            upharpoonright: 8638,
            uplus: 8846,
            UpperLeftArrow: 8598,
            UpperRightArrow: 8599,
            upsi: 965,
            Upsi: 978,
            upsih: 978,
            Upsilon: 933,
            upsilon: 965,
            UpTeeArrow: 8613,
            UpTee: 8869,
            upuparrows: 8648,
            urcorn: 8989,
            urcorner: 8989,
            urcrop: 8974,
            Uring: 366,
            uring: 367,
            urtri: 9721,
            Uscr: 55349,
            uscr: 55349,
            utdot: 8944,
            Utilde: 360,
            utilde: 361,
            utri: 9653,
            utrif: 9652,
            uuarr: 8648,
            Uuml: 220,
            uuml: 252,
            uwangle: 10663,
            vangrt: 10652,
            varepsilon: 1013,
            varkappa: 1008,
            varnothing: 8709,
            varphi: 981,
            varpi: 982,
            varpropto: 8733,
            varr: 8597,
            vArr: 8661,
            varrho: 1009,
            varsigma: 962,
            varsubsetneq: 8842,
            varsubsetneqq: 10955,
            varsupsetneq: 8843,
            varsupsetneqq: 10956,
            vartheta: 977,
            vartriangleleft: 8882,
            vartriangleright: 8883,
            vBar: 10984,
            Vbar: 10987,
            vBarv: 10985,
            Vcy: 1042,
            vcy: 1074,
            vdash: 8866,
            vDash: 8872,
            Vdash: 8873,
            VDash: 8875,
            Vdashl: 10982,
            veebar: 8891,
            vee: 8744,
            Vee: 8897,
            veeeq: 8794,
            vellip: 8942,
            verbar: 124,
            Verbar: 8214,
            vert: 124,
            Vert: 8214,
            VerticalBar: 8739,
            VerticalLine: 124,
            VerticalSeparator: 10072,
            VerticalTilde: 8768,
            VeryThinSpace: 8202,
            Vfr: 55349,
            vfr: 55349,
            vltri: 8882,
            vnsub: 8834,
            vnsup: 8835,
            Vopf: 55349,
            vopf: 55349,
            vprop: 8733,
            vrtri: 8883,
            Vscr: 55349,
            vscr: 55349,
            vsubnE: 10955,
            vsubne: 8842,
            vsupnE: 10956,
            vsupne: 8843,
            Vvdash: 8874,
            vzigzag: 10650,
            Wcirc: 372,
            wcirc: 373,
            wedbar: 10847,
            wedge: 8743,
            Wedge: 8896,
            wedgeq: 8793,
            weierp: 8472,
            Wfr: 55349,
            wfr: 55349,
            Wopf: 55349,
            wopf: 55349,
            wp: 8472,
            wr: 8768,
            wreath: 8768,
            Wscr: 55349,
            wscr: 55349,
            xcap: 8898,
            xcirc: 9711,
            xcup: 8899,
            xdtri: 9661,
            Xfr: 55349,
            xfr: 55349,
            xharr: 10231,
            xhArr: 10234,
            Xi: 926,
            xi: 958,
            xlarr: 10229,
            xlArr: 10232,
            xmap: 10236,
            xnis: 8955,
            xodot: 10752,
            Xopf: 55349,
            xopf: 55349,
            xoplus: 10753,
            xotime: 10754,
            xrarr: 10230,
            xrArr: 10233,
            Xscr: 55349,
            xscr: 55349,
            xsqcup: 10758,
            xuplus: 10756,
            xutri: 9651,
            xvee: 8897,
            xwedge: 8896,
            Yacute: 221,
            yacute: 253,
            YAcy: 1071,
            yacy: 1103,
            Ycirc: 374,
            ycirc: 375,
            Ycy: 1067,
            ycy: 1099,
            yen: 165,
            Yfr: 55349,
            yfr: 55349,
            YIcy: 1031,
            yicy: 1111,
            Yopf: 55349,
            yopf: 55349,
            Yscr: 55349,
            yscr: 55349,
            YUcy: 1070,
            yucy: 1102,
            yuml: 255,
            Yuml: 376,
            Zacute: 377,
            zacute: 378,
            Zcaron: 381,
            zcaron: 382,
            Zcy: 1047,
            zcy: 1079,
            Zdot: 379,
            zdot: 380,
            zeetrf: 8488,
            ZeroWidthSpace: 8203,
            Zeta: 918,
            zeta: 950,
            zfr: 55349,
            Zfr: 8488,
            ZHcy: 1046,
            zhcy: 1078,
            zigrarr: 8669,
            zopf: 55349,
            Zopf: 8484,
            Zscr: 55349,
            zscr: 55349,
            zwj: 8205,
            zwnj: 8204
          };
          var entityToChar = function (m) {
            var isNumeric = m.slice(0, 2) === '&#';
            var c;
            var isHex = isNumeric && (c = m.slice(2, 3)) && (c === 'X' || c === 'x');
            var uchar;
            var ucode;
            if (isNumeric) {
              var num;
              if (isHex) {
                num = parseInt(m.slice(3, m.length - 1), 16);
              } else {
                num = parseInt(m.slice(2, m.length - 1), 10);
              }
              uchar = fromCodePoint(num);
            } else {
              ucode = entities[m.slice(1, m.length - 1)];
              if (ucode) {
                uchar = fromCodePoint(entities[m.slice(1, m.length - 1)]);
              }
            }
            return uchar || m;
          };
          module.exports.entityToChar = entityToChar;
          return exports;
        },
        { './from-code-point': 3 }
      ],
      6: [
        function (require, module, exports) {
          
          // commonmark.js - CommomMark in JavaScript
          // Copyright (C) 2014 John MacFarlane
          // License: BSD3.
          // Basic usage:
          //
          // var commonmark = require('commonmark');
          // var parser = new commonmark.Parser();
          // var renderer = new commonmark.HtmlRenderer();
          // console.log(renderer.render(parser.parse('Hello *world*')));
          module.exports.Node = _node_;
          module.exports.Parser = _blocks_;
          module.exports.HtmlRenderer = _html_;
          module.exports.XmlRenderer = xml;
          return exports;
        },
        {
          './blocks': 1,
          './html': 4,
          './node': 8,
          './xml': 10
        }
      ],
      7: [
        function (require, module, exports) {
          
          var Node = _node_;
          var common = _common_;
          var normalizeReference = normalize_reference;
          var normalizeURI = common.normalizeURI;
          var unescapeString = common.unescapeString;
          var fromCodePoint = from_code_pointjs;
          var entityToChar = html5_entitiesjs.entityToChar;
          // Constants for character codes:
          var C_NEWLINE = 10;
          var C_ASTERISK = 42;
          var C_UNDERSCORE = 95;
          var C_BACKTICK = 96;
          var C_OPEN_BRACKET = 91;
          var C_CLOSE_BRACKET = 93;
          var C_LESSTHAN = 60;
          var C_BANG = 33;
          var C_BACKSLASH = 92;
          var C_AMPERSAND = 38;
          var C_OPEN_PAREN = 40;
          var C_CLOSE_PAREN = 41;
          var C_COLON = 58;
          // Some regexps used in inline parser:
          var ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
          var ESCAPED_CHAR = '\\\\' + ESCAPABLE;
          var REG_CHAR = '[^\\\\()\\x00-\\x20]';
          var IN_PARENS_NOSP = '\\((' + REG_CHAR + '|' + ESCAPED_CHAR + ')*\\)';
          var TAGNAME = '[A-Za-z][A-Za-z0-9]*';
          var ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
          var UNQUOTEDVALUE = '[^"\'=<>`\\x00-\\x20]+';
          var SINGLEQUOTEDVALUE = '\'[^\']*\'';
          var DOUBLEQUOTEDVALUE = '"[^"]*"';
          var ATTRIBUTEVALUE = '(?:' + UNQUOTEDVALUE + '|' + SINGLEQUOTEDVALUE + '|' + DOUBLEQUOTEDVALUE + ')';
          var ATTRIBUTEVALUESPEC = '(?:' + '\\s*=' + '\\s*' + ATTRIBUTEVALUE + ')';
          var ATTRIBUTE = '(?:' + '\\s+' + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + '?)';
          var OPENTAG = '<' + TAGNAME + ATTRIBUTE + '*' + '\\s*/?>';
          var CLOSETAG = '</' + TAGNAME + '\\s*[>]';
          var HTMLCOMMENT = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
          var PROCESSINGINSTRUCTION = '[<][?].*?[?][>]';
          var DECLARATION = '<![A-Z]+' + '\\s+[^>]*>';
          var CDATA = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
          var HTMLTAG = '(?:' + OPENTAG + '|' + CLOSETAG + '|' + HTMLCOMMENT + '|' + PROCESSINGINSTRUCTION + '|' + DECLARATION + '|' + CDATA + ')';
          var ENTITY = '&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});';
          var rePunctuation = new RegExp(/^[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/);
          var reHtmlTag = new RegExp('^' + HTMLTAG, 'i');
          var reLinkTitle = new RegExp('^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' + '|' + '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' + '|' + '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');
          var reLinkDestinationBraces = new RegExp('^(?:[<](?:[^<>\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');
          var reLinkDestination = new RegExp('^(?:' + REG_CHAR + '+|' + ESCAPED_CHAR + '|' + IN_PARENS_NOSP + ')*');
          var reEscapable = new RegExp('^' + ESCAPABLE);
          var reEntityHere = new RegExp('^' + ENTITY, 'i');
          var reTicks = /`+/;
          var reTicksHere = /^`+/;
          var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
          var reAutolink = /^<(?:coap|doi|javascript|aaa|aaas|about|acap|cap|cid|crid|data|dav|dict|dns|file|ftp|geo|go|gopher|h323|http|https|iax|icap|im|imap|info|ipp|iris|iris.beep|iris.xpc|iris.xpcs|iris.lwz|ldap|mailto|mid|msrp|msrps|mtqp|mupdate|news|nfs|ni|nih|nntp|opaquelocktoken|pop|pres|rtsp|service|session|shttp|sieve|sip|sips|sms|snmp|soap.beep|soap.beeps|tag|tel|telnet|tftp|thismessage|tn3270|tip|tv|urn|vemmi|ws|wss|xcon|xcon-userid|xmlrpc.beep|xmlrpc.beeps|xmpp|z39.50r|z39.50s|adiumxtra|afp|afs|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|chrome|chrome-extension|com-eventbrite-attendee|content|cvs|dlna-playsingle|dlna-playcontainer|dtn|dvb|ed2k|facetime|feed|finger|fish|gg|git|gizmoproject|gtalk|hcp|icon|ipn|irc|irc6|ircs|itms|jar|jms|keyparc|lastfm|ldaps|magnet|maps|market|message|mms|ms-help|msnim|mumble|mvn|notes|oid|palm|paparazzi|platform|proxy|psyc|query|res|resource|rmi|rsync|rtmp|secondlife|sftp|sgn|skype|smb|soldat|spotify|ssh|steam|svn|teamspeak|things|udp|unreal|ut2004|ventrilo|view-source|webcal|wtai|wyciwyg|xfire|xri|ymsgr):[^<>\x00-\x20]*>/i;
          var reSpnl = /^ *(?:\n *)?/;
          var reWhitespaceChar = /^\s/;
          var reWhitespace = /\s+/g;
          var reFinalSpace = / *$/;
          var reInitialSpace = /^ */;
          var reLinkLabel = /^\[(?:[^\\\[\]]|\\[\[\]]){0,1000}\]/;
          // Matches a string of non-special characters.
          var reMain = /^[^\n`\[\]\\!<&*_]+/m;
          var text = function (s) {
            var node = new Node('Text');
            node._literal = s;
            return node;
          };
          // INLINE PARSER
          // These are methods of an InlineParser object, defined below.
          // An InlineParser keeps track of a subject (a string to be
          // parsed) and a position in that subject.
          // If re matches at current position in the subject, advance
          // position in subject and return the match; otherwise return null.
          var match = function (re) {
            var m = re.exec(this.subject.slice(this.pos));
            if (m === null) {
              return null;
            } else {
              this.pos += m.index + m[0].length;
              return m[0];
            }
          };
          // Returns the code for the character at the current subject position, or -1
          // there are no more characters.
          var peek = function () {
            if (this.pos < this.subject.length) {
              return this.subject.charCodeAt(this.pos);
            } else {
              return -1;
            }
          };
          // Parse zero or more space characters, including at most one newline
          var spnl = function () {
            this.match(reSpnl);
            return 1;
          };
          // All of the parsers below try to match something at the current position
          // in the subject.  If they succeed in matching anything, they
          // return the inline matched, advancing the subject.
          // Attempt to parse backticks, adding either a backtick code span or a
          // literal sequence of backticks.
          var parseBackticks = function (block) {
            var ticks = this.match(reTicksHere);
            if (ticks === null) {
              return 0;
            }
            var afterOpenTicks = this.pos;
            var matched;
            var node;
            while ((matched = this.match(reTicks)) !== null) {
              if (matched === ticks) {
                node = new Node('Code');
                node._literal = this.subject.slice(afterOpenTicks, this.pos - ticks.length).trim().replace(reWhitespace, ' ');
                block.appendChild(node);
                return true;
              }
            }
            // If we got here, we didn't match a closing backtick sequence.
            this.pos = afterOpenTicks;
            block.appendChild(text(ticks));
            return true;
          };
          // Parse a backslash-escaped special character, adding either the escaped
          // character, a hard line break (if the backslash is followed by a newline),
          // or a literal backslash to the block's children.  Assumes current character
          // is a backslash.
          var parseBackslash = function (block) {
            var subj = this.subject;
            var node;
            this.pos += 1;
            if (this.peek() === C_NEWLINE) {
              this.pos += 1;
              node = new Node('Hardbreak');
              block.appendChild(node);
            } else if (reEscapable.test(subj.charAt(this.pos))) {
              block.appendChild(text(subj.charAt(this.pos)));
              this.pos += 1;
            } else {
              block.appendChild(text('\\'));
            }
            return true;
          };
          // Attempt to parse an autolink (URL or email in pointy brackets).
          var parseAutolink = function (block) {
            var m;
            var dest;
            var node;
            if (m = this.match(reEmailAutolink)) {
              dest = m.slice(1, m.length - 1);
              node = new Node('Link');
              node._destination = normalizeURI('mailto:' + dest);
              node._title = '';
              node.appendChild(text(dest));
              block.appendChild(node);
              return true;
            } else if (m = this.match(reAutolink)) {
              dest = m.slice(1, m.length - 1);
              node = new Node('Link');
              node._destination = normalizeURI(dest);
              node._title = '';
              node.appendChild(text(dest));
              block.appendChild(node);
              return true;
            } else {
              return false;
            }
          };
          // Attempt to parse a raw HTML tag.
          var parseHtmlTag = function (block) {
            var m = this.match(reHtmlTag);
            if (m === null) {
              return false;
            } else {
              var node = new Node('Html');
              node._literal = m;
              block.appendChild(node);
              return true;
            }
          };
          // Scan a sequence of characters with code cc, and return information about
          // the number of delimiters and whether they are positioned such that
          // they can open and/or close emphasis or strong emphasis.  A utility
          // function for strong/emph parsing.
          var scanDelims = function (cc) {
            var numdelims = 0;
            var char_before, char_after, cc_after;
            var startpos = this.pos;
            var left_flanking, right_flanking, can_open, can_close;
            char_before = this.pos === 0 ? '\n' : this.subject.charAt(this.pos - 1);
            while (this.peek() === cc) {
              numdelims++;
              this.pos++;
            }
            cc_after = this.peek();
            if (cc_after === -1) {
              char_after = '\n';
            } else {
              char_after = fromCodePoint(cc_after);
            }
            left_flanking = numdelims > 0 && !reWhitespaceChar.test(char_after) && !(rePunctuation.test(char_after) && !reWhitespaceChar.test(char_before) && !rePunctuation.test(char_before));
            right_flanking = numdelims > 0 && !reWhitespaceChar.test(char_before) && !(rePunctuation.test(char_before) && !reWhitespaceChar.test(char_after) && !rePunctuation.test(char_after));
            if (cc === C_UNDERSCORE) {
              can_open = left_flanking && !right_flanking;
              can_close = right_flanking && !left_flanking;
            } else {
              can_open = left_flanking;
              can_close = right_flanking;
            }
            this.pos = startpos;
            return {
              numdelims: numdelims,
              can_open: can_open,
              can_close: can_close
            };
          };
          // Attempt to parse emphasis or strong emphasis.
          var parseEmphasis = function (cc, block) {
            var res = this.scanDelims(cc);
            var numdelims = res.numdelims;
            var startpos = this.pos;
            if (numdelims === 0) {
              return false;
            }
            this.pos += numdelims;
            var node = text(this.subject.slice(startpos, this.pos));
            block.appendChild(node);
            // Add entry to stack for this opener
            this.delimiters = {
              cc: cc,
              numdelims: numdelims,
              node: node,
              previous: this.delimiters,
              next: null,
              can_open: res.can_open,
              can_close: res.can_close,
              active: true
            };
            if (this.delimiters.previous !== null) {
              this.delimiters.previous.next = this.delimiters;
            }
            return true;
          };
          var removeDelimiter = function (delim) {
            if (delim.previous !== null) {
              delim.previous.next = delim.next;
            }
            if (delim.next === null) {
              // top of stack
              this.delimiters = delim.previous;
            } else {
              delim.next.previous = delim.previous;
            }
          };
          var processEmphasis = function (block, stack_bottom) {
            var opener, closer;
            var opener_inl, closer_inl;
            var nextstack, tempstack;
            var use_delims;
            var tmp, next;
            // find first closer above stack_bottom:
            closer = this.delimiters;
            while (closer !== null && closer.previous !== stack_bottom) {
              closer = closer.previous;
            }
            // move forward, looking for closers, and handling each
            while (closer !== null) {
              if (closer.can_close && (closer.cc === C_UNDERSCORE || closer.cc === C_ASTERISK)) {
                // found emphasis closer. now look back for first matching opener:
                opener = closer.previous;
                while (opener !== null && opener !== stack_bottom) {
                  if (opener.cc === closer.cc && opener.can_open) {
                    break;
                  }
                  opener = opener.previous;
                }
                if (opener !== null && opener !== stack_bottom) {
                  // calculate actual number of delimiters used from this closer
                  if (closer.numdelims < 3 || opener.numdelims < 3) {
                    use_delims = closer.numdelims <= opener.numdelims ? closer.numdelims : opener.numdelims;
                  } else {
                    use_delims = closer.numdelims % 2 === 0 ? 2 : 1;
                  }
                  opener_inl = opener.node;
                  closer_inl = closer.node;
                  // remove used delimiters from stack elts and inlines
                  opener.numdelims -= use_delims;
                  closer.numdelims -= use_delims;
                  opener_inl._literal = opener_inl._literal.slice(0, opener_inl._literal.length - use_delims);
                  closer_inl._literal = closer_inl._literal.slice(0, closer_inl._literal.length - use_delims);
                  // build contents for new emph element
                  var emph = new Node(use_delims === 1 ? 'Emph' : 'Strong');
                  tmp = opener_inl._next;
                  while (tmp && tmp !== closer_inl) {
                    next = tmp._next;
                    tmp.unlink();
                    emph.appendChild(tmp);
                    tmp = next;
                  }
                  opener_inl.insertAfter(emph);
                  // remove elts btw opener and closer in delimiters stack
                  tempstack = closer.previous;
                  while (tempstack !== null && tempstack !== opener) {
                    nextstack = tempstack.previous;
                    this.removeDelimiter(tempstack);
                    tempstack = nextstack;
                  }
                  // if opener has 0 delims, remove it and the inline
                  if (opener.numdelims === 0) {
                    opener_inl.unlink();
                    this.removeDelimiter(opener);
                  }
                  if (closer.numdelims === 0) {
                    closer_inl.unlink();
                    tempstack = closer.next;
                    this.removeDelimiter(closer);
                    closer = tempstack;
                  }
                } else {
                  closer = closer.next;
                }
              } else {
                closer = closer.next;
              }
            }
            // remove all delimiters
            while (this.delimiters !== stack_bottom) {
              this.removeDelimiter(this.delimiters);
            }
          };
          // Attempt to parse link title (sans quotes), returning the string
          // or null if no match.
          var parseLinkTitle = function () {
            var title = this.match(reLinkTitle);
            if (title === null) {
              return null;
            } else {
              // chop off quotes from title and unescape:
              return unescapeString(title.substr(1, title.length - 2));
            }
          };
          // Attempt to parse link destination, returning the string or
          // null if no match.
          var parseLinkDestination = function () {
            var res = this.match(reLinkDestinationBraces);
            if (res === null) {
              res = this.match(reLinkDestination);
              if (res === null) {
                return null;
              } else {
                return normalizeURI(unescapeString(res));
              }
            } else {
              // chop off surrounding <..>:
              return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
            }
          };
          // Attempt to parse a link label, returning number of characters parsed.
          var parseLinkLabel = function () {
            var m = this.match(reLinkLabel);
            return m === null ? 0 : m.length;
          };
          // Add open bracket to delimiter stack and add a text node to block's children.
          var parseOpenBracket = function (block) {
            var startpos = this.pos;
            this.pos += 1;
            var node = text('[');
            block.appendChild(node);
            // Add entry to stack for this opener
            this.delimiters = {
              cc: C_OPEN_BRACKET,
              numdelims: 1,
              node: node,
              previous: this.delimiters,
              next: null,
              can_open: true,
              can_close: false,
              index: startpos,
              active: true
            };
            if (this.delimiters.previous !== null) {
              this.delimiters.previous.next = this.delimiters;
            }
            return true;
          };
          // IF next character is [, and ! delimiter to delimiter stack and
          // add a text node to block's children.  Otherwise just add a text node.
          var parseBang = function (block) {
            var startpos = this.pos;
            this.pos += 1;
            if (this.peek() === C_OPEN_BRACKET) {
              this.pos += 1;
              var node = text('![');
              block.appendChild(node);
              // Add entry to stack for this opener
              this.delimiters = {
                cc: C_BANG,
                numdelims: 1,
                node: node,
                previous: this.delimiters,
                next: null,
                can_open: true,
                can_close: false,
                index: startpos + 1,
                active: true
              };
              if (this.delimiters.previous !== null) {
                this.delimiters.previous.next = this.delimiters;
              }
            } else {
              block.appendChild(text('!'));
            }
            return true;
          };
          // Try to match close bracket against an opening in the delimiter
          // stack.  Add either a link or image, or a plain [ character,
          // to block's children.  If there is a matching delimiter,
          // remove it from the delimiter stack.
          var parseCloseBracket = function (block) {
            var startpos;
            var is_image;
            var dest;
            var title;
            var matched = false;
            var reflabel;
            var opener;
            this.pos += 1;
            startpos = this.pos;
            // look through stack of delimiters for a [ or ![
            opener = this.delimiters;
            while (opener !== null) {
              if (opener.cc === C_OPEN_BRACKET || opener.cc === C_BANG) {
                break;
              }
              opener = opener.previous;
            }
            if (opener === null) {
              // no matched opener, just return a literal
              block.appendChild(text(']'));
              return true;
            }
            if (!opener.active) {
              // no matched opener, just return a literal
              block.appendChild(text(']'));
              // take opener off emphasis stack
              this.removeDelimiter(opener);
              return true;
            }
            // If we got here, open is a potential opener
            is_image = opener.cc === C_BANG;
            // Check to see if we have a link/image
            // Inline link?
            if (this.peek() === C_OPEN_PAREN) {
              this.pos++;
              if (this.spnl() && (dest = this.parseLinkDestination()) !== null && this.spnl() && (reWhitespaceChar.test(this.subject.charAt(this.pos - 1)) && (title = this.parseLinkTitle()) || true) && this.spnl() && this.peek() === C_CLOSE_PAREN) {
                this.pos += 1;
                matched = true;
              }
            } else {
              // Next, see if there's a link label
              var savepos = this.pos;
              this.spnl();
              var beforelabel = this.pos;
              var n = this.parseLinkLabel();
              if (n === 0 || n === 2) {
                // empty or missing second label
                reflabel = this.subject.slice(opener.index, startpos);
              } else {
                reflabel = this.subject.slice(beforelabel, beforelabel + n);
              }
              if (n === 0) {
                // If shortcut reference link, rewind before spaces we skipped.
                this.pos = savepos;
              }
              // lookup rawlabel in refmap
              var link = this.refmap[normalizeReference(reflabel)];
              if (link) {
                dest = link.destination;
                title = link.title;
                matched = true;
              }
            }
            if (matched) {
              var node = new Node(is_image ? 'Image' : 'Link');
              node._destination = dest;
              node._title = title || '';
              var tmp, next;
              tmp = opener.node._next;
              while (tmp) {
                next = tmp._next;
                tmp.unlink();
                node.appendChild(tmp);
                tmp = next;
              }
              block.appendChild(node);
              this.processEmphasis(node, opener.previous);
              opener.node.unlink();
              // processEmphasis will remove this and later delimiters.
              // Now, for a link, we also deactivate earlier link openers.
              // (no links in links)
              if (!is_image) {
                opener = this.delimiters;
                while (opener !== null) {
                  if (opener.cc === C_OPEN_BRACKET) {
                    opener.active = false;  // deactivate this opener
                  }
                  opener = opener.previous;
                }
              }
              return true;
            } else {
              // no match
              this.removeDelimiter(opener);
              // remove this opener from stack
              this.pos = startpos;
              block.appendChild(text(']'));
              return true;
            }
          };
          // Attempt to parse an entity, return Entity object if successful.
          var parseEntity = function (block) {
            var m;
            if (m = this.match(reEntityHere)) {
              block.appendChild(text(entityToChar(m)));
              return true;
            } else {
              return false;
            }
          };
          // Parse a run of ordinary characters, or a single character with
          // a special meaning in markdown, as a plain string.
          var parseString = function (block) {
            var m;
            if (m = this.match(reMain)) {
              block.appendChild(text(m));
              return true;
            } else {
              return false;
            }
          };
          // Parse a newline.  If it was preceded by two spaces, return a hard
          // line break; otherwise a soft line break.
          var parseNewline = function (block) {
            this.pos += 1;
            // assume we're at a \n
            // check previous node for trailing spaces
            var lastc = block._lastChild;
            if (lastc && lastc.type === 'Text') {
              var sps = reFinalSpace.exec(lastc._literal)[0].length;
              if (sps > 0) {
                lastc._literal = lastc._literal.replace(reFinalSpace, '');
              }
              block.appendChild(new Node(sps >= 2 ? 'Hardbreak' : 'Softbreak'));
            } else {
              block.appendChild(new Node('Softbreak'));
            }
            this.match(reInitialSpace);
            // gobble leading spaces in next line
            return true;
          };
          // Attempt to parse a link reference, modifying refmap.
          var parseReference = function (s, refmap) {
            this.subject = s;
            this.pos = 0;
            var rawlabel;
            var dest;
            var title;
            var matchChars;
            var startpos = this.pos;
            // label:
            matchChars = this.parseLinkLabel();
            if (matchChars === 0) {
              return 0;
            } else {
              rawlabel = this.subject.substr(0, matchChars);
            }
            // colon:
            if (this.peek() === C_COLON) {
              this.pos++;
            } else {
              this.pos = startpos;
              return 0;
            }
            //  link url
            this.spnl();
            dest = this.parseLinkDestination();
            if (dest === null || dest.length === 0) {
              this.pos = startpos;
              return 0;
            }
            var beforetitle = this.pos;
            this.spnl();
            title = this.parseLinkTitle();
            if (title === null) {
              title = '';
              // rewind before spaces
              this.pos = beforetitle;
            }
            // make sure we're at line end:
            if (this.match(/^ *(?:\n|$)/) === null) {
              this.pos = startpos;
              return 0;
            }
            var normlabel = normalizeReference(rawlabel);
            if (!refmap[normlabel]) {
              refmap[normlabel] = {
                destination: dest,
                title: title
              };
            }
            return this.pos - startpos;
          };
          // Parse the next inline element in subject, advancing subject position.
          // On success, add the result to block's children and return true.
          // On failure, return false.
          var parseInline = function (block) {
            var res = false;
            var c = this.peek();
            if (c === -1) {
              return false;
            }
            switch (c) {
            case C_NEWLINE:
              res = this.parseNewline(block);
              break;
            case C_BACKSLASH:
              res = this.parseBackslash(block);
              break;
            case C_BACKTICK:
              res = this.parseBackticks(block);
              break;
            case C_ASTERISK:
            case C_UNDERSCORE:
              res = this.parseEmphasis(c, block);
              break;
            case C_OPEN_BRACKET:
              res = this.parseOpenBracket(block);
              break;
            case C_BANG:
              res = this.parseBang(block);
              break;
            case C_CLOSE_BRACKET:
              res = this.parseCloseBracket(block);
              break;
            case C_LESSTHAN:
              res = this.parseAutolink(block) || this.parseHtmlTag(block);
              break;
            case C_AMPERSAND:
              res = this.parseEntity(block);
              break;
            default:
              res = this.parseString(block);
              break;
            }
            if (!res) {
              this.pos += 1;
              block.appendChild(text(fromCodePoint(c)));
            }
            return true;
          };
          // Parse string content in block into inline children,
          // using refmap to resolve references.
          var parseInlines = function (block) {
            this.subject = block._string_content.trim();
            this.pos = 0;
            this.delimiters = null;
            while (this.parseInline(block)) {
            }
            block._string_content = null;
            // allow raw string to be garbage collected
            this.processEmphasis(block, null);
          };
          // The InlineParser object.
          function InlineParser() {
            return {
              subject: '',
              delimiters: null,
              // used by parseEmphasis method
              pos: 0,
              refmap: {},
              match: match,
              peek: peek,
              spnl: spnl,
              parseBackticks: parseBackticks,
              parseBackslash: parseBackslash,
              parseAutolink: parseAutolink,
              parseHtmlTag: parseHtmlTag,
              scanDelims: scanDelims,
              parseEmphasis: parseEmphasis,
              parseLinkTitle: parseLinkTitle,
              parseLinkDestination: parseLinkDestination,
              parseLinkLabel: parseLinkLabel,
              parseOpenBracket: parseOpenBracket,
              parseCloseBracket: parseCloseBracket,
              parseBang: parseBang,
              parseEntity: parseEntity,
              parseString: parseString,
              parseNewline: parseNewline,
              parseReference: parseReference,
              parseInline: parseInline,
              processEmphasis: processEmphasis,
              removeDelimiter: removeDelimiter,
              parse: parseInlines
            };
          }
          module.exports = InlineParser;
          return exports;
        },
        {
          './common': 2,
          './from-code-point.js': 3,
          './html5-entities.js': 5,
          './node': 8,
          './normalize-reference': 9
        }
      ],
      8: [
        function (require, module, exports) {
          
          function isContainer(node) {
            switch (node._type) {
            case 'Document':
            case 'BlockQuote':
            case 'List':
            case 'Item':
            case 'Paragraph':
            case 'Header':
            case 'Emph':
            case 'Strong':
            case 'Link':
            case 'Image':
              return true;
            default:
              return false;
            }
          }
          var resumeAt = function (node, entering) {
            this.current = node;
            this.entering = entering === true;
          };
          var next = function () {
            var cur = this.current;
            var entering = this.entering;
            if (cur === null) {
              return null;
            }
            var container = isContainer(cur);
            if (entering && container) {
              if (cur._firstChild) {
                this.current = cur._firstChild;
                this.entering = true;
              } else {
                // stay on node but exit
                this.entering = false;
              }
            } else if (cur._next === null) {
              this.current = cur._parent;
              this.entering = false;
            } else {
              this.current = cur._next;
              this.entering = true;
            }
            return {
              entering: entering,
              node: cur
            };
          };
          var NodeWalker = function (root) {
            return {
              current: root,
              root: root,
              entering: true,
              next: next,
              resumeAt: resumeAt
            };
          };
          var Node = function (nodeType, sourcepos) {
            this._type = nodeType;
            this._parent = null;
            this._firstChild = null;
            this._lastChild = null;
            this._prev = null;
            this._next = null;
            this._sourcepos = sourcepos;
            this._lastLineBlank = false;
            this._open = true;
            this._string_content = null;
            this._literal = null;
            this._listData = null;
            this._info = null;
            this._destination = null;
            this._title = null;
            this._isFenced = false;
            this._fenceChar = null;
            this._fenceLength = 0;
            this._fenceOffset = null;
            this._level = null;
          };
          var proto = Node.prototype;
          Node.prototype.isContainer = function () {
            return isContainer(this);
          };
          Object.defineProperty(proto, 'type', {
            get: function () {
              return this._type;
            }
          });
          Object.defineProperty(proto, 'firstChild', {
            get: function () {
              return this._firstChild;
            }
          });
          Object.defineProperty(proto, 'lastChild', {
            get: function () {
              return this._lastChild;
            }
          });
          Object.defineProperty(proto, 'next', {
            get: function () {
              return this._next;
            }
          });
          Object.defineProperty(proto, 'prev', {
            get: function () {
              return this._prev;
            }
          });
          Object.defineProperty(proto, 'parent', {
            get: function () {
              return this._parent;
            }
          });
          Object.defineProperty(proto, 'sourcepos', {
            get: function () {
              return this._sourcepos;
            }
          });
          Object.defineProperty(proto, 'literal', {
            get: function () {
              return this._literal;
            },
            set: function (s) {
              this._literal = s;
            }
          });
          Object.defineProperty(proto, 'destination', {
            get: function () {
              return this._destination;
            },
            set: function (s) {
              this._destination = s;
            }
          });
          Object.defineProperty(proto, 'title', {
            get: function () {
              return this._title;
            },
            set: function (s) {
              this._title = s;
            }
          });
          Object.defineProperty(proto, 'info', {
            get: function () {
              return this._info;
            },
            set: function (s) {
              this._info = s;
            }
          });
          Object.defineProperty(proto, 'level', {
            get: function () {
              return this._level;
            },
            set: function (s) {
              this._level = s;
            }
          });
          Object.defineProperty(proto, 'listType', {
            get: function () {
              return this._listData.type;
            },
            set: function (t) {
              this._listData.type = t;
            }
          });
          Object.defineProperty(proto, 'listTight', {
            get: function () {
              return this._listData.tight;
            },
            set: function (t) {
              this._listData.tight = t;
            }
          });
          Object.defineProperty(proto, 'listStart', {
            get: function () {
              return this._listData.start;
            },
            set: function (n) {
              this._listData.start = n;
            }
          });
          Object.defineProperty(proto, 'listDelimiter', {
            get: function () {
              return this._listData.delimiter;
            },
            set: function (delim) {
              this._listData.delimiter = delim;
            }
          });
          Node.prototype.appendChild = function (child) {
            child.unlink();
            child._parent = this;
            if (this._lastChild) {
              this._lastChild._next = child;
              child._prev = this._lastChild;
              this._lastChild = child;
            } else {
              this._firstChild = child;
              this._lastChild = child;
            }
          };
          Node.prototype.prependChild = function (child) {
            child.unlink();
            child._parent = this;
            if (this._firstChild) {
              this._firstChild._prev = child;
              child._next = this._firstChild;
              this._firstChild = child;
            } else {
              this._firstChild = child;
              this._lastChild = child;
            }
          };
          Node.prototype.unlink = function () {
            if (this._prev) {
              this._prev._next = this._next;
            } else if (this._parent) {
              this._parent._firstChild = this._next;
            }
            if (this._next) {
              this._next._prev = this._prev;
            } else if (this._parent) {
              this._parent._lastChild = this._prev;
            }
            this._parent = null;
            this._next = null;
            this._prev = null;
          };
          Node.prototype.insertAfter = function (sibling) {
            sibling.unlink();
            sibling._next = this._next;
            if (sibling._next) {
              sibling._next._prev = sibling;
            }
            sibling._prev = this;
            this._next = sibling;
            sibling._parent = this._parent;
            if (!sibling._next) {
              sibling._parent._lastChild = sibling;
            }
          };
          Node.prototype.insertBefore = function (sibling) {
            sibling.unlink();
            sibling._prev = this._prev;
            if (sibling._prev) {
              sibling._prev._next = sibling;
            }
            sibling._next = this;
            this._prev = sibling;
            sibling._parent = this._parent;
            if (!sibling._prev) {
              sibling._parent._firstChild = sibling;
            }
          };
          Node.prototype.walker = function () {
            var walker = new NodeWalker(this);
            return walker;
          };
          module.exports = Node;  /* Example of use of walker:
                                  
                                   var walker = w.walker();
                                   var event;
                                  
                                   while (event = walker.next()) {
                                   console.log(event.entering, event.node.type());
                                   }
                                  
                                   */
          return exports;
        },
        {}
      ],
      9: [
        function (require, module, exports) {
          
          /* The bulk of this code derives from https://github.com/dmoscrop/fold-case
          But in addition to case-folding, we also normalize whitespace.
          
          fold-case is Copyright Mathias Bynens <https://mathiasbynens.be/>
          
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
          
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          */
          /*eslint-disable  key-spacing, comma-spacing */
          var regex = /[ \t\r\n]+|[A-Z\xB5\xC0-\xD6\xD8-\xDF\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u0149\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u017F\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C5\u01C7\u01C8\u01CA\u01CB\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F0-\u01F2\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0345\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03AB\u03B0\u03C2\u03CF-\u03D1\u03D5\u03D6\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F0\u03F1\u03F4\u03F5\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u0587\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E96-\u1E9B\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F50\u1F52\u1F54\u1F56\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1F80-\u1FAF\u1FB2-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD2\u1FD3\u1FD6-\u1FDB\u1FE2-\u1FE4\u1FE6-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A\u212B\u2132\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0\uA7B1\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27]|\uD806[\uDCA0-\uDCBF]/g;
          var map = {
            'A': 'a',
            'B': 'b',
            'C': 'c',
            'D': 'd',
            'E': 'e',
            'F': 'f',
            'G': 'g',
            'H': 'h',
            'I': 'i',
            'J': 'j',
            'K': 'k',
            'L': 'l',
            'M': 'm',
            'N': 'n',
            'O': 'o',
            'P': 'p',
            'Q': 'q',
            'R': 'r',
            'S': 's',
            'T': 't',
            'U': 'u',
            'V': 'v',
            'W': 'w',
            'X': 'x',
            'Y': 'y',
            'Z': 'z',
            '\xB5': '\u03BC',
            '\xC0': '\xE0',
            '\xC1': '\xE1',
            '\xC2': '\xE2',
            '\xC3': '\xE3',
            '\xC4': '\xE4',
            '\xC5': '\xE5',
            '\xC6': '\xE6',
            '\xC7': '\xE7',
            '\xC8': '\xE8',
            '\xC9': '\xE9',
            '\xCA': '\xEA',
            '\xCB': '\xEB',
            '\xCC': '\xEC',
            '\xCD': '\xED',
            '\xCE': '\xEE',
            '\xCF': '\xEF',
            '\xD0': '\xF0',
            '\xD1': '\xF1',
            '\xD2': '\xF2',
            '\xD3': '\xF3',
            '\xD4': '\xF4',
            '\xD5': '\xF5',
            '\xD6': '\xF6',
            '\xD8': '\xF8',
            '\xD9': '\xF9',
            '\xDA': '\xFA',
            '\xDB': '\xFB',
            '\xDC': '\xFC',
            '\xDD': '\xFD',
            '\xDE': '\xFE',
            '\u0100': '\u0101',
            '\u0102': '\u0103',
            '\u0104': '\u0105',
            '\u0106': '\u0107',
            '\u0108': '\u0109',
            '\u010A': '\u010B',
            '\u010C': '\u010D',
            '\u010E': '\u010F',
            '\u0110': '\u0111',
            '\u0112': '\u0113',
            '\u0114': '\u0115',
            '\u0116': '\u0117',
            '\u0118': '\u0119',
            '\u011A': '\u011B',
            '\u011C': '\u011D',
            '\u011E': '\u011F',
            '\u0120': '\u0121',
            '\u0122': '\u0123',
            '\u0124': '\u0125',
            '\u0126': '\u0127',
            '\u0128': '\u0129',
            '\u012A': '\u012B',
            '\u012C': '\u012D',
            '\u012E': '\u012F',
            '\u0132': '\u0133',
            '\u0134': '\u0135',
            '\u0136': '\u0137',
            '\u0139': '\u013A',
            '\u013B': '\u013C',
            '\u013D': '\u013E',
            '\u013F': '\u0140',
            '\u0141': '\u0142',
            '\u0143': '\u0144',
            '\u0145': '\u0146',
            '\u0147': '\u0148',
            '\u014A': '\u014B',
            '\u014C': '\u014D',
            '\u014E': '\u014F',
            '\u0150': '\u0151',
            '\u0152': '\u0153',
            '\u0154': '\u0155',
            '\u0156': '\u0157',
            '\u0158': '\u0159',
            '\u015A': '\u015B',
            '\u015C': '\u015D',
            '\u015E': '\u015F',
            '\u0160': '\u0161',
            '\u0162': '\u0163',
            '\u0164': '\u0165',
            '\u0166': '\u0167',
            '\u0168': '\u0169',
            '\u016A': '\u016B',
            '\u016C': '\u016D',
            '\u016E': '\u016F',
            '\u0170': '\u0171',
            '\u0172': '\u0173',
            '\u0174': '\u0175',
            '\u0176': '\u0177',
            '\u0178': '\xFF',
            '\u0179': '\u017A',
            '\u017B': '\u017C',
            '\u017D': '\u017E',
            '\u017F': 's',
            '\u0181': '\u0253',
            '\u0182': '\u0183',
            '\u0184': '\u0185',
            '\u0186': '\u0254',
            '\u0187': '\u0188',
            '\u0189': '\u0256',
            '\u018A': '\u0257',
            '\u018B': '\u018C',
            '\u018E': '\u01DD',
            '\u018F': '\u0259',
            '\u0190': '\u025B',
            '\u0191': '\u0192',
            '\u0193': '\u0260',
            '\u0194': '\u0263',
            '\u0196': '\u0269',
            '\u0197': '\u0268',
            '\u0198': '\u0199',
            '\u019C': '\u026F',
            '\u019D': '\u0272',
            '\u019F': '\u0275',
            '\u01A0': '\u01A1',
            '\u01A2': '\u01A3',
            '\u01A4': '\u01A5',
            '\u01A6': '\u0280',
            '\u01A7': '\u01A8',
            '\u01A9': '\u0283',
            '\u01AC': '\u01AD',
            '\u01AE': '\u0288',
            '\u01AF': '\u01B0',
            '\u01B1': '\u028A',
            '\u01B2': '\u028B',
            '\u01B3': '\u01B4',
            '\u01B5': '\u01B6',
            '\u01B7': '\u0292',
            '\u01B8': '\u01B9',
            '\u01BC': '\u01BD',
            '\u01C4': '\u01C6',
            '\u01C5': '\u01C6',
            '\u01C7': '\u01C9',
            '\u01C8': '\u01C9',
            '\u01CA': '\u01CC',
            '\u01CB': '\u01CC',
            '\u01CD': '\u01CE',
            '\u01CF': '\u01D0',
            '\u01D1': '\u01D2',
            '\u01D3': '\u01D4',
            '\u01D5': '\u01D6',
            '\u01D7': '\u01D8',
            '\u01D9': '\u01DA',
            '\u01DB': '\u01DC',
            '\u01DE': '\u01DF',
            '\u01E0': '\u01E1',
            '\u01E2': '\u01E3',
            '\u01E4': '\u01E5',
            '\u01E6': '\u01E7',
            '\u01E8': '\u01E9',
            '\u01EA': '\u01EB',
            '\u01EC': '\u01ED',
            '\u01EE': '\u01EF',
            '\u01F1': '\u01F3',
            '\u01F2': '\u01F3',
            '\u01F4': '\u01F5',
            '\u01F6': '\u0195',
            '\u01F7': '\u01BF',
            '\u01F8': '\u01F9',
            '\u01FA': '\u01FB',
            '\u01FC': '\u01FD',
            '\u01FE': '\u01FF',
            '\u0200': '\u0201',
            '\u0202': '\u0203',
            '\u0204': '\u0205',
            '\u0206': '\u0207',
            '\u0208': '\u0209',
            '\u020A': '\u020B',
            '\u020C': '\u020D',
            '\u020E': '\u020F',
            '\u0210': '\u0211',
            '\u0212': '\u0213',
            '\u0214': '\u0215',
            '\u0216': '\u0217',
            '\u0218': '\u0219',
            '\u021A': '\u021B',
            '\u021C': '\u021D',
            '\u021E': '\u021F',
            '\u0220': '\u019E',
            '\u0222': '\u0223',
            '\u0224': '\u0225',
            '\u0226': '\u0227',
            '\u0228': '\u0229',
            '\u022A': '\u022B',
            '\u022C': '\u022D',
            '\u022E': '\u022F',
            '\u0230': '\u0231',
            '\u0232': '\u0233',
            '\u023A': '\u2C65',
            '\u023B': '\u023C',
            '\u023D': '\u019A',
            '\u023E': '\u2C66',
            '\u0241': '\u0242',
            '\u0243': '\u0180',
            '\u0244': '\u0289',
            '\u0245': '\u028C',
            '\u0246': '\u0247',
            '\u0248': '\u0249',
            '\u024A': '\u024B',
            '\u024C': '\u024D',
            '\u024E': '\u024F',
            '\u0345': '\u03B9',
            '\u0370': '\u0371',
            '\u0372': '\u0373',
            '\u0376': '\u0377',
            '\u037F': '\u03F3',
            '\u0386': '\u03AC',
            '\u0388': '\u03AD',
            '\u0389': '\u03AE',
            '\u038A': '\u03AF',
            '\u038C': '\u03CC',
            '\u038E': '\u03CD',
            '\u038F': '\u03CE',
            '\u0391': '\u03B1',
            '\u0392': '\u03B2',
            '\u0393': '\u03B3',
            '\u0394': '\u03B4',
            '\u0395': '\u03B5',
            '\u0396': '\u03B6',
            '\u0397': '\u03B7',
            '\u0398': '\u03B8',
            '\u0399': '\u03B9',
            '\u039A': '\u03BA',
            '\u039B': '\u03BB',
            '\u039C': '\u03BC',
            '\u039D': '\u03BD',
            '\u039E': '\u03BE',
            '\u039F': '\u03BF',
            '\u03A0': '\u03C0',
            '\u03A1': '\u03C1',
            '\u03A3': '\u03C3',
            '\u03A4': '\u03C4',
            '\u03A5': '\u03C5',
            '\u03A6': '\u03C6',
            '\u03A7': '\u03C7',
            '\u03A8': '\u03C8',
            '\u03A9': '\u03C9',
            '\u03AA': '\u03CA',
            '\u03AB': '\u03CB',
            '\u03C2': '\u03C3',
            '\u03CF': '\u03D7',
            '\u03D0': '\u03B2',
            '\u03D1': '\u03B8',
            '\u03D5': '\u03C6',
            '\u03D6': '\u03C0',
            '\u03D8': '\u03D9',
            '\u03DA': '\u03DB',
            '\u03DC': '\u03DD',
            '\u03DE': '\u03DF',
            '\u03E0': '\u03E1',
            '\u03E2': '\u03E3',
            '\u03E4': '\u03E5',
            '\u03E6': '\u03E7',
            '\u03E8': '\u03E9',
            '\u03EA': '\u03EB',
            '\u03EC': '\u03ED',
            '\u03EE': '\u03EF',
            '\u03F0': '\u03BA',
            '\u03F1': '\u03C1',
            '\u03F4': '\u03B8',
            '\u03F5': '\u03B5',
            '\u03F7': '\u03F8',
            '\u03F9': '\u03F2',
            '\u03FA': '\u03FB',
            '\u03FD': '\u037B',
            '\u03FE': '\u037C',
            '\u03FF': '\u037D',
            '\u0400': '\u0450',
            '\u0401': '\u0451',
            '\u0402': '\u0452',
            '\u0403': '\u0453',
            '\u0404': '\u0454',
            '\u0405': '\u0455',
            '\u0406': '\u0456',
            '\u0407': '\u0457',
            '\u0408': '\u0458',
            '\u0409': '\u0459',
            '\u040A': '\u045A',
            '\u040B': '\u045B',
            '\u040C': '\u045C',
            '\u040D': '\u045D',
            '\u040E': '\u045E',
            '\u040F': '\u045F',
            '\u0410': '\u0430',
            '\u0411': '\u0431',
            '\u0412': '\u0432',
            '\u0413': '\u0433',
            '\u0414': '\u0434',
            '\u0415': '\u0435',
            '\u0416': '\u0436',
            '\u0417': '\u0437',
            '\u0418': '\u0438',
            '\u0419': '\u0439',
            '\u041A': '\u043A',
            '\u041B': '\u043B',
            '\u041C': '\u043C',
            '\u041D': '\u043D',
            '\u041E': '\u043E',
            '\u041F': '\u043F',
            '\u0420': '\u0440',
            '\u0421': '\u0441',
            '\u0422': '\u0442',
            '\u0423': '\u0443',
            '\u0424': '\u0444',
            '\u0425': '\u0445',
            '\u0426': '\u0446',
            '\u0427': '\u0447',
            '\u0428': '\u0448',
            '\u0429': '\u0449',
            '\u042A': '\u044A',
            '\u042B': '\u044B',
            '\u042C': '\u044C',
            '\u042D': '\u044D',
            '\u042E': '\u044E',
            '\u042F': '\u044F',
            '\u0460': '\u0461',
            '\u0462': '\u0463',
            '\u0464': '\u0465',
            '\u0466': '\u0467',
            '\u0468': '\u0469',
            '\u046A': '\u046B',
            '\u046C': '\u046D',
            '\u046E': '\u046F',
            '\u0470': '\u0471',
            '\u0472': '\u0473',
            '\u0474': '\u0475',
            '\u0476': '\u0477',
            '\u0478': '\u0479',
            '\u047A': '\u047B',
            '\u047C': '\u047D',
            '\u047E': '\u047F',
            '\u0480': '\u0481',
            '\u048A': '\u048B',
            '\u048C': '\u048D',
            '\u048E': '\u048F',
            '\u0490': '\u0491',
            '\u0492': '\u0493',
            '\u0494': '\u0495',
            '\u0496': '\u0497',
            '\u0498': '\u0499',
            '\u049A': '\u049B',
            '\u049C': '\u049D',
            '\u049E': '\u049F',
            '\u04A0': '\u04A1',
            '\u04A2': '\u04A3',
            '\u04A4': '\u04A5',
            '\u04A6': '\u04A7',
            '\u04A8': '\u04A9',
            '\u04AA': '\u04AB',
            '\u04AC': '\u04AD',
            '\u04AE': '\u04AF',
            '\u04B0': '\u04B1',
            '\u04B2': '\u04B3',
            '\u04B4': '\u04B5',
            '\u04B6': '\u04B7',
            '\u04B8': '\u04B9',
            '\u04BA': '\u04BB',
            '\u04BC': '\u04BD',
            '\u04BE': '\u04BF',
            '\u04C0': '\u04CF',
            '\u04C1': '\u04C2',
            '\u04C3': '\u04C4',
            '\u04C5': '\u04C6',
            '\u04C7': '\u04C8',
            '\u04C9': '\u04CA',
            '\u04CB': '\u04CC',
            '\u04CD': '\u04CE',
            '\u04D0': '\u04D1',
            '\u04D2': '\u04D3',
            '\u04D4': '\u04D5',
            '\u04D6': '\u04D7',
            '\u04D8': '\u04D9',
            '\u04DA': '\u04DB',
            '\u04DC': '\u04DD',
            '\u04DE': '\u04DF',
            '\u04E0': '\u04E1',
            '\u04E2': '\u04E3',
            '\u04E4': '\u04E5',
            '\u04E6': '\u04E7',
            '\u04E8': '\u04E9',
            '\u04EA': '\u04EB',
            '\u04EC': '\u04ED',
            '\u04EE': '\u04EF',
            '\u04F0': '\u04F1',
            '\u04F2': '\u04F3',
            '\u04F4': '\u04F5',
            '\u04F6': '\u04F7',
            '\u04F8': '\u04F9',
            '\u04FA': '\u04FB',
            '\u04FC': '\u04FD',
            '\u04FE': '\u04FF',
            '\u0500': '\u0501',
            '\u0502': '\u0503',
            '\u0504': '\u0505',
            '\u0506': '\u0507',
            '\u0508': '\u0509',
            '\u050A': '\u050B',
            '\u050C': '\u050D',
            '\u050E': '\u050F',
            '\u0510': '\u0511',
            '\u0512': '\u0513',
            '\u0514': '\u0515',
            '\u0516': '\u0517',
            '\u0518': '\u0519',
            '\u051A': '\u051B',
            '\u051C': '\u051D',
            '\u051E': '\u051F',
            '\u0520': '\u0521',
            '\u0522': '\u0523',
            '\u0524': '\u0525',
            '\u0526': '\u0527',
            '\u0528': '\u0529',
            '\u052A': '\u052B',
            '\u052C': '\u052D',
            '\u052E': '\u052F',
            '\u0531': '\u0561',
            '\u0532': '\u0562',
            '\u0533': '\u0563',
            '\u0534': '\u0564',
            '\u0535': '\u0565',
            '\u0536': '\u0566',
            '\u0537': '\u0567',
            '\u0538': '\u0568',
            '\u0539': '\u0569',
            '\u053A': '\u056A',
            '\u053B': '\u056B',
            '\u053C': '\u056C',
            '\u053D': '\u056D',
            '\u053E': '\u056E',
            '\u053F': '\u056F',
            '\u0540': '\u0570',
            '\u0541': '\u0571',
            '\u0542': '\u0572',
            '\u0543': '\u0573',
            '\u0544': '\u0574',
            '\u0545': '\u0575',
            '\u0546': '\u0576',
            '\u0547': '\u0577',
            '\u0548': '\u0578',
            '\u0549': '\u0579',
            '\u054A': '\u057A',
            '\u054B': '\u057B',
            '\u054C': '\u057C',
            '\u054D': '\u057D',
            '\u054E': '\u057E',
            '\u054F': '\u057F',
            '\u0550': '\u0580',
            '\u0551': '\u0581',
            '\u0552': '\u0582',
            '\u0553': '\u0583',
            '\u0554': '\u0584',
            '\u0555': '\u0585',
            '\u0556': '\u0586',
            '\u10A0': '\u2D00',
            '\u10A1': '\u2D01',
            '\u10A2': '\u2D02',
            '\u10A3': '\u2D03',
            '\u10A4': '\u2D04',
            '\u10A5': '\u2D05',
            '\u10A6': '\u2D06',
            '\u10A7': '\u2D07',
            '\u10A8': '\u2D08',
            '\u10A9': '\u2D09',
            '\u10AA': '\u2D0A',
            '\u10AB': '\u2D0B',
            '\u10AC': '\u2D0C',
            '\u10AD': '\u2D0D',
            '\u10AE': '\u2D0E',
            '\u10AF': '\u2D0F',
            '\u10B0': '\u2D10',
            '\u10B1': '\u2D11',
            '\u10B2': '\u2D12',
            '\u10B3': '\u2D13',
            '\u10B4': '\u2D14',
            '\u10B5': '\u2D15',
            '\u10B6': '\u2D16',
            '\u10B7': '\u2D17',
            '\u10B8': '\u2D18',
            '\u10B9': '\u2D19',
            '\u10BA': '\u2D1A',
            '\u10BB': '\u2D1B',
            '\u10BC': '\u2D1C',
            '\u10BD': '\u2D1D',
            '\u10BE': '\u2D1E',
            '\u10BF': '\u2D1F',
            '\u10C0': '\u2D20',
            '\u10C1': '\u2D21',
            '\u10C2': '\u2D22',
            '\u10C3': '\u2D23',
            '\u10C4': '\u2D24',
            '\u10C5': '\u2D25',
            '\u10C7': '\u2D27',
            '\u10CD': '\u2D2D',
            '\u1E00': '\u1E01',
            '\u1E02': '\u1E03',
            '\u1E04': '\u1E05',
            '\u1E06': '\u1E07',
            '\u1E08': '\u1E09',
            '\u1E0A': '\u1E0B',
            '\u1E0C': '\u1E0D',
            '\u1E0E': '\u1E0F',
            '\u1E10': '\u1E11',
            '\u1E12': '\u1E13',
            '\u1E14': '\u1E15',
            '\u1E16': '\u1E17',
            '\u1E18': '\u1E19',
            '\u1E1A': '\u1E1B',
            '\u1E1C': '\u1E1D',
            '\u1E1E': '\u1E1F',
            '\u1E20': '\u1E21',
            '\u1E22': '\u1E23',
            '\u1E24': '\u1E25',
            '\u1E26': '\u1E27',
            '\u1E28': '\u1E29',
            '\u1E2A': '\u1E2B',
            '\u1E2C': '\u1E2D',
            '\u1E2E': '\u1E2F',
            '\u1E30': '\u1E31',
            '\u1E32': '\u1E33',
            '\u1E34': '\u1E35',
            '\u1E36': '\u1E37',
            '\u1E38': '\u1E39',
            '\u1E3A': '\u1E3B',
            '\u1E3C': '\u1E3D',
            '\u1E3E': '\u1E3F',
            '\u1E40': '\u1E41',
            '\u1E42': '\u1E43',
            '\u1E44': '\u1E45',
            '\u1E46': '\u1E47',
            '\u1E48': '\u1E49',
            '\u1E4A': '\u1E4B',
            '\u1E4C': '\u1E4D',
            '\u1E4E': '\u1E4F',
            '\u1E50': '\u1E51',
            '\u1E52': '\u1E53',
            '\u1E54': '\u1E55',
            '\u1E56': '\u1E57',
            '\u1E58': '\u1E59',
            '\u1E5A': '\u1E5B',
            '\u1E5C': '\u1E5D',
            '\u1E5E': '\u1E5F',
            '\u1E60': '\u1E61',
            '\u1E62': '\u1E63',
            '\u1E64': '\u1E65',
            '\u1E66': '\u1E67',
            '\u1E68': '\u1E69',
            '\u1E6A': '\u1E6B',
            '\u1E6C': '\u1E6D',
            '\u1E6E': '\u1E6F',
            '\u1E70': '\u1E71',
            '\u1E72': '\u1E73',
            '\u1E74': '\u1E75',
            '\u1E76': '\u1E77',
            '\u1E78': '\u1E79',
            '\u1E7A': '\u1E7B',
            '\u1E7C': '\u1E7D',
            '\u1E7E': '\u1E7F',
            '\u1E80': '\u1E81',
            '\u1E82': '\u1E83',
            '\u1E84': '\u1E85',
            '\u1E86': '\u1E87',
            '\u1E88': '\u1E89',
            '\u1E8A': '\u1E8B',
            '\u1E8C': '\u1E8D',
            '\u1E8E': '\u1E8F',
            '\u1E90': '\u1E91',
            '\u1E92': '\u1E93',
            '\u1E94': '\u1E95',
            '\u1E9B': '\u1E61',
            '\u1EA0': '\u1EA1',
            '\u1EA2': '\u1EA3',
            '\u1EA4': '\u1EA5',
            '\u1EA6': '\u1EA7',
            '\u1EA8': '\u1EA9',
            '\u1EAA': '\u1EAB',
            '\u1EAC': '\u1EAD',
            '\u1EAE': '\u1EAF',
            '\u1EB0': '\u1EB1',
            '\u1EB2': '\u1EB3',
            '\u1EB4': '\u1EB5',
            '\u1EB6': '\u1EB7',
            '\u1EB8': '\u1EB9',
            '\u1EBA': '\u1EBB',
            '\u1EBC': '\u1EBD',
            '\u1EBE': '\u1EBF',
            '\u1EC0': '\u1EC1',
            '\u1EC2': '\u1EC3',
            '\u1EC4': '\u1EC5',
            '\u1EC6': '\u1EC7',
            '\u1EC8': '\u1EC9',
            '\u1ECA': '\u1ECB',
            '\u1ECC': '\u1ECD',
            '\u1ECE': '\u1ECF',
            '\u1ED0': '\u1ED1',
            '\u1ED2': '\u1ED3',
            '\u1ED4': '\u1ED5',
            '\u1ED6': '\u1ED7',
            '\u1ED8': '\u1ED9',
            '\u1EDA': '\u1EDB',
            '\u1EDC': '\u1EDD',
            '\u1EDE': '\u1EDF',
            '\u1EE0': '\u1EE1',
            '\u1EE2': '\u1EE3',
            '\u1EE4': '\u1EE5',
            '\u1EE6': '\u1EE7',
            '\u1EE8': '\u1EE9',
            '\u1EEA': '\u1EEB',
            '\u1EEC': '\u1EED',
            '\u1EEE': '\u1EEF',
            '\u1EF0': '\u1EF1',
            '\u1EF2': '\u1EF3',
            '\u1EF4': '\u1EF5',
            '\u1EF6': '\u1EF7',
            '\u1EF8': '\u1EF9',
            '\u1EFA': '\u1EFB',
            '\u1EFC': '\u1EFD',
            '\u1EFE': '\u1EFF',
            '\u1F08': '\u1F00',
            '\u1F09': '\u1F01',
            '\u1F0A': '\u1F02',
            '\u1F0B': '\u1F03',
            '\u1F0C': '\u1F04',
            '\u1F0D': '\u1F05',
            '\u1F0E': '\u1F06',
            '\u1F0F': '\u1F07',
            '\u1F18': '\u1F10',
            '\u1F19': '\u1F11',
            '\u1F1A': '\u1F12',
            '\u1F1B': '\u1F13',
            '\u1F1C': '\u1F14',
            '\u1F1D': '\u1F15',
            '\u1F28': '\u1F20',
            '\u1F29': '\u1F21',
            '\u1F2A': '\u1F22',
            '\u1F2B': '\u1F23',
            '\u1F2C': '\u1F24',
            '\u1F2D': '\u1F25',
            '\u1F2E': '\u1F26',
            '\u1F2F': '\u1F27',
            '\u1F38': '\u1F30',
            '\u1F39': '\u1F31',
            '\u1F3A': '\u1F32',
            '\u1F3B': '\u1F33',
            '\u1F3C': '\u1F34',
            '\u1F3D': '\u1F35',
            '\u1F3E': '\u1F36',
            '\u1F3F': '\u1F37',
            '\u1F48': '\u1F40',
            '\u1F49': '\u1F41',
            '\u1F4A': '\u1F42',
            '\u1F4B': '\u1F43',
            '\u1F4C': '\u1F44',
            '\u1F4D': '\u1F45',
            '\u1F59': '\u1F51',
            '\u1F5B': '\u1F53',
            '\u1F5D': '\u1F55',
            '\u1F5F': '\u1F57',
            '\u1F68': '\u1F60',
            '\u1F69': '\u1F61',
            '\u1F6A': '\u1F62',
            '\u1F6B': '\u1F63',
            '\u1F6C': '\u1F64',
            '\u1F6D': '\u1F65',
            '\u1F6E': '\u1F66',
            '\u1F6F': '\u1F67',
            '\u1FB8': '\u1FB0',
            '\u1FB9': '\u1FB1',
            '\u1FBA': '\u1F70',
            '\u1FBB': '\u1F71',
            '\u1FBE': '\u03B9',
            '\u1FC8': '\u1F72',
            '\u1FC9': '\u1F73',
            '\u1FCA': '\u1F74',
            '\u1FCB': '\u1F75',
            '\u1FD8': '\u1FD0',
            '\u1FD9': '\u1FD1',
            '\u1FDA': '\u1F76',
            '\u1FDB': '\u1F77',
            '\u1FE8': '\u1FE0',
            '\u1FE9': '\u1FE1',
            '\u1FEA': '\u1F7A',
            '\u1FEB': '\u1F7B',
            '\u1FEC': '\u1FE5',
            '\u1FF8': '\u1F78',
            '\u1FF9': '\u1F79',
            '\u1FFA': '\u1F7C',
            '\u1FFB': '\u1F7D',
            '\u2126': '\u03C9',
            '\u212A': 'k',
            '\u212B': '\xE5',
            '\u2132': '\u214E',
            '\u2160': '\u2170',
            '\u2161': '\u2171',
            '\u2162': '\u2172',
            '\u2163': '\u2173',
            '\u2164': '\u2174',
            '\u2165': '\u2175',
            '\u2166': '\u2176',
            '\u2167': '\u2177',
            '\u2168': '\u2178',
            '\u2169': '\u2179',
            '\u216A': '\u217A',
            '\u216B': '\u217B',
            '\u216C': '\u217C',
            '\u216D': '\u217D',
            '\u216E': '\u217E',
            '\u216F': '\u217F',
            '\u2183': '\u2184',
            '\u24B6': '\u24D0',
            '\u24B7': '\u24D1',
            '\u24B8': '\u24D2',
            '\u24B9': '\u24D3',
            '\u24BA': '\u24D4',
            '\u24BB': '\u24D5',
            '\u24BC': '\u24D6',
            '\u24BD': '\u24D7',
            '\u24BE': '\u24D8',
            '\u24BF': '\u24D9',
            '\u24C0': '\u24DA',
            '\u24C1': '\u24DB',
            '\u24C2': '\u24DC',
            '\u24C3': '\u24DD',
            '\u24C4': '\u24DE',
            '\u24C5': '\u24DF',
            '\u24C6': '\u24E0',
            '\u24C7': '\u24E1',
            '\u24C8': '\u24E2',
            '\u24C9': '\u24E3',
            '\u24CA': '\u24E4',
            '\u24CB': '\u24E5',
            '\u24CC': '\u24E6',
            '\u24CD': '\u24E7',
            '\u24CE': '\u24E8',
            '\u24CF': '\u24E9',
            '\u2C00': '\u2C30',
            '\u2C01': '\u2C31',
            '\u2C02': '\u2C32',
            '\u2C03': '\u2C33',
            '\u2C04': '\u2C34',
            '\u2C05': '\u2C35',
            '\u2C06': '\u2C36',
            '\u2C07': '\u2C37',
            '\u2C08': '\u2C38',
            '\u2C09': '\u2C39',
            '\u2C0A': '\u2C3A',
            '\u2C0B': '\u2C3B',
            '\u2C0C': '\u2C3C',
            '\u2C0D': '\u2C3D',
            '\u2C0E': '\u2C3E',
            '\u2C0F': '\u2C3F',
            '\u2C10': '\u2C40',
            '\u2C11': '\u2C41',
            '\u2C12': '\u2C42',
            '\u2C13': '\u2C43',
            '\u2C14': '\u2C44',
            '\u2C15': '\u2C45',
            '\u2C16': '\u2C46',
            '\u2C17': '\u2C47',
            '\u2C18': '\u2C48',
            '\u2C19': '\u2C49',
            '\u2C1A': '\u2C4A',
            '\u2C1B': '\u2C4B',
            '\u2C1C': '\u2C4C',
            '\u2C1D': '\u2C4D',
            '\u2C1E': '\u2C4E',
            '\u2C1F': '\u2C4F',
            '\u2C20': '\u2C50',
            '\u2C21': '\u2C51',
            '\u2C22': '\u2C52',
            '\u2C23': '\u2C53',
            '\u2C24': '\u2C54',
            '\u2C25': '\u2C55',
            '\u2C26': '\u2C56',
            '\u2C27': '\u2C57',
            '\u2C28': '\u2C58',
            '\u2C29': '\u2C59',
            '\u2C2A': '\u2C5A',
            '\u2C2B': '\u2C5B',
            '\u2C2C': '\u2C5C',
            '\u2C2D': '\u2C5D',
            '\u2C2E': '\u2C5E',
            '\u2C60': '\u2C61',
            '\u2C62': '\u026B',
            '\u2C63': '\u1D7D',
            '\u2C64': '\u027D',
            '\u2C67': '\u2C68',
            '\u2C69': '\u2C6A',
            '\u2C6B': '\u2C6C',
            '\u2C6D': '\u0251',
            '\u2C6E': '\u0271',
            '\u2C6F': '\u0250',
            '\u2C70': '\u0252',
            '\u2C72': '\u2C73',
            '\u2C75': '\u2C76',
            '\u2C7E': '\u023F',
            '\u2C7F': '\u0240',
            '\u2C80': '\u2C81',
            '\u2C82': '\u2C83',
            '\u2C84': '\u2C85',
            '\u2C86': '\u2C87',
            '\u2C88': '\u2C89',
            '\u2C8A': '\u2C8B',
            '\u2C8C': '\u2C8D',
            '\u2C8E': '\u2C8F',
            '\u2C90': '\u2C91',
            '\u2C92': '\u2C93',
            '\u2C94': '\u2C95',
            '\u2C96': '\u2C97',
            '\u2C98': '\u2C99',
            '\u2C9A': '\u2C9B',
            '\u2C9C': '\u2C9D',
            '\u2C9E': '\u2C9F',
            '\u2CA0': '\u2CA1',
            '\u2CA2': '\u2CA3',
            '\u2CA4': '\u2CA5',
            '\u2CA6': '\u2CA7',
            '\u2CA8': '\u2CA9',
            '\u2CAA': '\u2CAB',
            '\u2CAC': '\u2CAD',
            '\u2CAE': '\u2CAF',
            '\u2CB0': '\u2CB1',
            '\u2CB2': '\u2CB3',
            '\u2CB4': '\u2CB5',
            '\u2CB6': '\u2CB7',
            '\u2CB8': '\u2CB9',
            '\u2CBA': '\u2CBB',
            '\u2CBC': '\u2CBD',
            '\u2CBE': '\u2CBF',
            '\u2CC0': '\u2CC1',
            '\u2CC2': '\u2CC3',
            '\u2CC4': '\u2CC5',
            '\u2CC6': '\u2CC7',
            '\u2CC8': '\u2CC9',
            '\u2CCA': '\u2CCB',
            '\u2CCC': '\u2CCD',
            '\u2CCE': '\u2CCF',
            '\u2CD0': '\u2CD1',
            '\u2CD2': '\u2CD3',
            '\u2CD4': '\u2CD5',
            '\u2CD6': '\u2CD7',
            '\u2CD8': '\u2CD9',
            '\u2CDA': '\u2CDB',
            '\u2CDC': '\u2CDD',
            '\u2CDE': '\u2CDF',
            '\u2CE0': '\u2CE1',
            '\u2CE2': '\u2CE3',
            '\u2CEB': '\u2CEC',
            '\u2CED': '\u2CEE',
            '\u2CF2': '\u2CF3',
            '\uA640': '\uA641',
            '\uA642': '\uA643',
            '\uA644': '\uA645',
            '\uA646': '\uA647',
            '\uA648': '\uA649',
            '\uA64A': '\uA64B',
            '\uA64C': '\uA64D',
            '\uA64E': '\uA64F',
            '\uA650': '\uA651',
            '\uA652': '\uA653',
            '\uA654': '\uA655',
            '\uA656': '\uA657',
            '\uA658': '\uA659',
            '\uA65A': '\uA65B',
            '\uA65C': '\uA65D',
            '\uA65E': '\uA65F',
            '\uA660': '\uA661',
            '\uA662': '\uA663',
            '\uA664': '\uA665',
            '\uA666': '\uA667',
            '\uA668': '\uA669',
            '\uA66A': '\uA66B',
            '\uA66C': '\uA66D',
            '\uA680': '\uA681',
            '\uA682': '\uA683',
            '\uA684': '\uA685',
            '\uA686': '\uA687',
            '\uA688': '\uA689',
            '\uA68A': '\uA68B',
            '\uA68C': '\uA68D',
            '\uA68E': '\uA68F',
            '\uA690': '\uA691',
            '\uA692': '\uA693',
            '\uA694': '\uA695',
            '\uA696': '\uA697',
            '\uA698': '\uA699',
            '\uA69A': '\uA69B',
            '\uA722': '\uA723',
            '\uA724': '\uA725',
            '\uA726': '\uA727',
            '\uA728': '\uA729',
            '\uA72A': '\uA72B',
            '\uA72C': '\uA72D',
            '\uA72E': '\uA72F',
            '\uA732': '\uA733',
            '\uA734': '\uA735',
            '\uA736': '\uA737',
            '\uA738': '\uA739',
            '\uA73A': '\uA73B',
            '\uA73C': '\uA73D',
            '\uA73E': '\uA73F',
            '\uA740': '\uA741',
            '\uA742': '\uA743',
            '\uA744': '\uA745',
            '\uA746': '\uA747',
            '\uA748': '\uA749',
            '\uA74A': '\uA74B',
            '\uA74C': '\uA74D',
            '\uA74E': '\uA74F',
            '\uA750': '\uA751',
            '\uA752': '\uA753',
            '\uA754': '\uA755',
            '\uA756': '\uA757',
            '\uA758': '\uA759',
            '\uA75A': '\uA75B',
            '\uA75C': '\uA75D',
            '\uA75E': '\uA75F',
            '\uA760': '\uA761',
            '\uA762': '\uA763',
            '\uA764': '\uA765',
            '\uA766': '\uA767',
            '\uA768': '\uA769',
            '\uA76A': '\uA76B',
            '\uA76C': '\uA76D',
            '\uA76E': '\uA76F',
            '\uA779': '\uA77A',
            '\uA77B': '\uA77C',
            '\uA77D': '\u1D79',
            '\uA77E': '\uA77F',
            '\uA780': '\uA781',
            '\uA782': '\uA783',
            '\uA784': '\uA785',
            '\uA786': '\uA787',
            '\uA78B': '\uA78C',
            '\uA78D': '\u0265',
            '\uA790': '\uA791',
            '\uA792': '\uA793',
            '\uA796': '\uA797',
            '\uA798': '\uA799',
            '\uA79A': '\uA79B',
            '\uA79C': '\uA79D',
            '\uA79E': '\uA79F',
            '\uA7A0': '\uA7A1',
            '\uA7A2': '\uA7A3',
            '\uA7A4': '\uA7A5',
            '\uA7A6': '\uA7A7',
            '\uA7A8': '\uA7A9',
            '\uA7AA': '\u0266',
            '\uA7AB': '\u025C',
            '\uA7AC': '\u0261',
            '\uA7AD': '\u026C',
            '\uA7B0': '\u029E',
            '\uA7B1': '\u0287',
            '\uFF21': '\uFF41',
            '\uFF22': '\uFF42',
            '\uFF23': '\uFF43',
            '\uFF24': '\uFF44',
            '\uFF25': '\uFF45',
            '\uFF26': '\uFF46',
            '\uFF27': '\uFF47',
            '\uFF28': '\uFF48',
            '\uFF29': '\uFF49',
            '\uFF2A': '\uFF4A',
            '\uFF2B': '\uFF4B',
            '\uFF2C': '\uFF4C',
            '\uFF2D': '\uFF4D',
            '\uFF2E': '\uFF4E',
            '\uFF2F': '\uFF4F',
            '\uFF30': '\uFF50',
            '\uFF31': '\uFF51',
            '\uFF32': '\uFF52',
            '\uFF33': '\uFF53',
            '\uFF34': '\uFF54',
            '\uFF35': '\uFF55',
            '\uFF36': '\uFF56',
            '\uFF37': '\uFF57',
            '\uFF38': '\uFF58',
            '\uFF39': '\uFF59',
            '\uFF3A': '\uFF5A',
            '\uD801\uDC00': '\uD801\uDC28',
            '\uD801\uDC01': '\uD801\uDC29',
            '\uD801\uDC02': '\uD801\uDC2A',
            '\uD801\uDC03': '\uD801\uDC2B',
            '\uD801\uDC04': '\uD801\uDC2C',
            '\uD801\uDC05': '\uD801\uDC2D',
            '\uD801\uDC06': '\uD801\uDC2E',
            '\uD801\uDC07': '\uD801\uDC2F',
            '\uD801\uDC08': '\uD801\uDC30',
            '\uD801\uDC09': '\uD801\uDC31',
            '\uD801\uDC0A': '\uD801\uDC32',
            '\uD801\uDC0B': '\uD801\uDC33',
            '\uD801\uDC0C': '\uD801\uDC34',
            '\uD801\uDC0D': '\uD801\uDC35',
            '\uD801\uDC0E': '\uD801\uDC36',
            '\uD801\uDC0F': '\uD801\uDC37',
            '\uD801\uDC10': '\uD801\uDC38',
            '\uD801\uDC11': '\uD801\uDC39',
            '\uD801\uDC12': '\uD801\uDC3A',
            '\uD801\uDC13': '\uD801\uDC3B',
            '\uD801\uDC14': '\uD801\uDC3C',
            '\uD801\uDC15': '\uD801\uDC3D',
            '\uD801\uDC16': '\uD801\uDC3E',
            '\uD801\uDC17': '\uD801\uDC3F',
            '\uD801\uDC18': '\uD801\uDC40',
            '\uD801\uDC19': '\uD801\uDC41',
            '\uD801\uDC1A': '\uD801\uDC42',
            '\uD801\uDC1B': '\uD801\uDC43',
            '\uD801\uDC1C': '\uD801\uDC44',
            '\uD801\uDC1D': '\uD801\uDC45',
            '\uD801\uDC1E': '\uD801\uDC46',
            '\uD801\uDC1F': '\uD801\uDC47',
            '\uD801\uDC20': '\uD801\uDC48',
            '\uD801\uDC21': '\uD801\uDC49',
            '\uD801\uDC22': '\uD801\uDC4A',
            '\uD801\uDC23': '\uD801\uDC4B',
            '\uD801\uDC24': '\uD801\uDC4C',
            '\uD801\uDC25': '\uD801\uDC4D',
            '\uD801\uDC26': '\uD801\uDC4E',
            '\uD801\uDC27': '\uD801\uDC4F',
            '\uD806\uDCA0': '\uD806\uDCC0',
            '\uD806\uDCA1': '\uD806\uDCC1',
            '\uD806\uDCA2': '\uD806\uDCC2',
            '\uD806\uDCA3': '\uD806\uDCC3',
            '\uD806\uDCA4': '\uD806\uDCC4',
            '\uD806\uDCA5': '\uD806\uDCC5',
            '\uD806\uDCA6': '\uD806\uDCC6',
            '\uD806\uDCA7': '\uD806\uDCC7',
            '\uD806\uDCA8': '\uD806\uDCC8',
            '\uD806\uDCA9': '\uD806\uDCC9',
            '\uD806\uDCAA': '\uD806\uDCCA',
            '\uD806\uDCAB': '\uD806\uDCCB',
            '\uD806\uDCAC': '\uD806\uDCCC',
            '\uD806\uDCAD': '\uD806\uDCCD',
            '\uD806\uDCAE': '\uD806\uDCCE',
            '\uD806\uDCAF': '\uD806\uDCCF',
            '\uD806\uDCB0': '\uD806\uDCD0',
            '\uD806\uDCB1': '\uD806\uDCD1',
            '\uD806\uDCB2': '\uD806\uDCD2',
            '\uD806\uDCB3': '\uD806\uDCD3',
            '\uD806\uDCB4': '\uD806\uDCD4',
            '\uD806\uDCB5': '\uD806\uDCD5',
            '\uD806\uDCB6': '\uD806\uDCD6',
            '\uD806\uDCB7': '\uD806\uDCD7',
            '\uD806\uDCB8': '\uD806\uDCD8',
            '\uD806\uDCB9': '\uD806\uDCD9',
            '\uD806\uDCBA': '\uD806\uDCDA',
            '\uD806\uDCBB': '\uD806\uDCDB',
            '\uD806\uDCBC': '\uD806\uDCDC',
            '\uD806\uDCBD': '\uD806\uDCDD',
            '\uD806\uDCBE': '\uD806\uDCDE',
            '\uD806\uDCBF': '\uD806\uDCDF',
            '\xDF': 'ss',
            '\u0130': 'i\u0307',
            '\u0149': '\u02BCn',
            '\u01F0': 'j\u030C',
            '\u0390': '\u03B9\u0308\u0301',
            '\u03B0': '\u03C5\u0308\u0301',
            '\u0587': '\u0565\u0582',
            '\u1E96': 'h\u0331',
            '\u1E97': 't\u0308',
            '\u1E98': 'w\u030A',
            '\u1E99': 'y\u030A',
            '\u1E9A': 'a\u02BE',
            '\u1E9E': 'ss',
            '\u1F50': '\u03C5\u0313',
            '\u1F52': '\u03C5\u0313\u0300',
            '\u1F54': '\u03C5\u0313\u0301',
            '\u1F56': '\u03C5\u0313\u0342',
            '\u1F80': '\u1F00\u03B9',
            '\u1F81': '\u1F01\u03B9',
            '\u1F82': '\u1F02\u03B9',
            '\u1F83': '\u1F03\u03B9',
            '\u1F84': '\u1F04\u03B9',
            '\u1F85': '\u1F05\u03B9',
            '\u1F86': '\u1F06\u03B9',
            '\u1F87': '\u1F07\u03B9',
            '\u1F88': '\u1F00\u03B9',
            '\u1F89': '\u1F01\u03B9',
            '\u1F8A': '\u1F02\u03B9',
            '\u1F8B': '\u1F03\u03B9',
            '\u1F8C': '\u1F04\u03B9',
            '\u1F8D': '\u1F05\u03B9',
            '\u1F8E': '\u1F06\u03B9',
            '\u1F8F': '\u1F07\u03B9',
            '\u1F90': '\u1F20\u03B9',
            '\u1F91': '\u1F21\u03B9',
            '\u1F92': '\u1F22\u03B9',
            '\u1F93': '\u1F23\u03B9',
            '\u1F94': '\u1F24\u03B9',
            '\u1F95': '\u1F25\u03B9',
            '\u1F96': '\u1F26\u03B9',
            '\u1F97': '\u1F27\u03B9',
            '\u1F98': '\u1F20\u03B9',
            '\u1F99': '\u1F21\u03B9',
            '\u1F9A': '\u1F22\u03B9',
            '\u1F9B': '\u1F23\u03B9',
            '\u1F9C': '\u1F24\u03B9',
            '\u1F9D': '\u1F25\u03B9',
            '\u1F9E': '\u1F26\u03B9',
            '\u1F9F': '\u1F27\u03B9',
            '\u1FA0': '\u1F60\u03B9',
            '\u1FA1': '\u1F61\u03B9',
            '\u1FA2': '\u1F62\u03B9',
            '\u1FA3': '\u1F63\u03B9',
            '\u1FA4': '\u1F64\u03B9',
            '\u1FA5': '\u1F65\u03B9',
            '\u1FA6': '\u1F66\u03B9',
            '\u1FA7': '\u1F67\u03B9',
            '\u1FA8': '\u1F60\u03B9',
            '\u1FA9': '\u1F61\u03B9',
            '\u1FAA': '\u1F62\u03B9',
            '\u1FAB': '\u1F63\u03B9',
            '\u1FAC': '\u1F64\u03B9',
            '\u1FAD': '\u1F65\u03B9',
            '\u1FAE': '\u1F66\u03B9',
            '\u1FAF': '\u1F67\u03B9',
            '\u1FB2': '\u1F70\u03B9',
            '\u1FB3': '\u03B1\u03B9',
            '\u1FB4': '\u03AC\u03B9',
            '\u1FB6': '\u03B1\u0342',
            '\u1FB7': '\u03B1\u0342\u03B9',
            '\u1FBC': '\u03B1\u03B9',
            '\u1FC2': '\u1F74\u03B9',
            '\u1FC3': '\u03B7\u03B9',
            '\u1FC4': '\u03AE\u03B9',
            '\u1FC6': '\u03B7\u0342',
            '\u1FC7': '\u03B7\u0342\u03B9',
            '\u1FCC': '\u03B7\u03B9',
            '\u1FD2': '\u03B9\u0308\u0300',
            '\u1FD3': '\u03B9\u0308\u0301',
            '\u1FD6': '\u03B9\u0342',
            '\u1FD7': '\u03B9\u0308\u0342',
            '\u1FE2': '\u03C5\u0308\u0300',
            '\u1FE3': '\u03C5\u0308\u0301',
            '\u1FE4': '\u03C1\u0313',
            '\u1FE6': '\u03C5\u0342',
            '\u1FE7': '\u03C5\u0308\u0342',
            '\u1FF2': '\u1F7C\u03B9',
            '\u1FF3': '\u03C9\u03B9',
            '\u1FF4': '\u03CE\u03B9',
            '\u1FF6': '\u03C9\u0342',
            '\u1FF7': '\u03C9\u0342\u03B9',
            '\u1FFC': '\u03C9\u03B9',
            '\uFB00': 'ff',
            '\uFB01': 'fi',
            '\uFB02': 'fl',
            '\uFB03': 'ffi',
            '\uFB04': 'ffl',
            '\uFB05': 'st',
            '\uFB06': 'st',
            '\uFB13': '\u0574\u0576',
            '\uFB14': '\u0574\u0565',
            '\uFB15': '\u0574\u056B',
            '\uFB16': '\u057E\u0576',
            '\uFB17': '\u0574\u056D'
          };
          // Normalize reference label: collapse internal whitespace
          // to single space, remove leading/trailing whitespace, case fold.
          module.exports = function (string) {
            return string.trim().replace(regex, function ($0) {
              // Note: there is no need to check `hasOwnProperty($0)` here.
              // If character not found in lookup table, it must be whitespace.
              return map[$0] || ' ';
            });
          };
          return exports;
        },
        {}
      ],
      10: [
        function (require, module, exports) {
          
          var escapeXml = _common_.escapeXml;
          // Helper function to produce an XML tag.
          var tag = function (name, attrs, selfclosing) {
            var result = '<' + name;
            if (attrs && attrs.length > 0) {
              var i = 0;
              var attrib;
              while ((attrib = attrs[i]) !== undefined) {
                result += ' ' + attrib[0] + '="' + attrib[1] + '"';
                i++;
              }
            }
            if (selfclosing) {
              result += ' /';
            }
            result += '>';
            return result;
          };
          var reXMLTag = /\<[^>]*\>/;
          var toTagName = function (s) {
            return s.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
          };
          var renderNodes = function (block) {
            var attrs;
            var tagname;
            var walker = block.walker();
            var event, node, entering;
            var buffer = '';
            var lastOut = '\n';
            var disableTags = 0;
            var indentLevel = 0;
            var indent = '  ';
            var unescapedContents;
            var container;
            var selfClosing;
            var nodetype;
            var out = function (s) {
              if (disableTags > 0) {
                buffer += s.replace(reXMLTag, '');
              } else {
                buffer += s;
              }
              lastOut = s;
            };
            var esc = this.escape;
            var cr = function () {
              if (lastOut !== '\n') {
                buffer += '\n';
                lastOut = '\n';
                for (var i = indentLevel; i--;) {
                  buffer += indent;
                }
              }
            };
            var options = this.options;
            if (options.time) {
              console.time('rendering');
            }
            buffer += '<?xml version="1.0" encoding="UTF-8"?>\n';
            buffer += '<!DOCTYPE CommonMark SYSTEM "CommonMark.dtd">\n';
            while (event = walker.next()) {
              entering = event.entering;
              node = event.node;
              nodetype = node.type;
              container = node.isContainer();
              selfClosing = nodetype === 'HorizontalRule' || nodetype === 'Hardbreak' || nodetype === 'Softbreak' || nodetype === 'Image';
              unescapedContents = nodetype === 'Html' || nodetype === 'HtmlInline';
              tagname = toTagName(nodetype);
              if (entering) {
                attrs = [];
                switch (nodetype) {
                case 'List':
                  if (node.listType !== null) {
                    attrs.push([
                      'type',
                      node.listType.toLowerCase()
                    ]);
                  }
                  if (node.listStart !== null) {
                    attrs.push([
                      'start',
                      String(node.listStart)
                    ]);
                  }
                  if (node.listTight !== null) {
                    attrs.push([
                      'tight',
                      node.listTight ? 'true' : 'false'
                    ]);
                  }
                  var delim = node.listDelimiter;
                  if (delim !== null) {
                    var delimword = '';
                    if (delim === '.') {
                      delimword = 'period';
                    } else {
                      delimword = 'paren';
                    }
                    attrs.push([
                      'delimiter',
                      delimword
                    ]);
                  }
                  break;
                case 'CodeBlock':
                  if (node.info) {
                    attrs.push([
                      'info',
                      node.info
                    ]);
                  }
                  break;
                case 'Header':
                  attrs.push([
                    'level',
                    String(node.level)
                  ]);
                  break;
                case 'Link':
                case 'Image':
                  attrs.push([
                    'destination',
                    node.destination
                  ]);
                  attrs.push([
                    'title',
                    node.title
                  ]);
                  break;
                default:
                  break;
                }
                if (options.sourcepos) {
                  var pos = node.sourcepos;
                  if (pos) {
                    attrs.push([
                      'sourcepos',
                      String(pos[0][0]) + ':' + String(pos[0][1]) + '-' + String(pos[1][0]) + ':' + String(pos[1][1])
                    ]);
                  }
                }
                cr();
                out(tag(tagname, attrs, selfClosing));
                if (container) {
                  indentLevel += 1;
                } else if (!container && !selfClosing) {
                  var lit = node.literal;
                  if (lit) {
                    out(unescapedContents ? lit : esc(lit));
                  }
                  out(tag('/' + tagname));
                }
              } else {
                indentLevel -= 1;
                cr();
                out(tag('/' + tagname));
              }
            }
            if (options.time) {
              console.timeEnd('rendering');
            }
            buffer += '\n';
            return buffer;
          };
          // The XmlRenderer object.
          function XmlRenderer(options) {
            return {
              // default options:
              softbreak: '\n',
              // by default, soft breaks are rendered as newlines in HTML
              // set to "<br />" to make them hard breaks
              // set to " " if you want to ignore line wrapping in source
              escape: escapeXml,
              options: options || {},
              render: renderNodes
            };
          }
          module.exports = XmlRenderer;
          return exports;
        },
        { './common': 2 }
      ]
    }, {}, [6])(6);
  });
  /*
  
  	ractive-transitions-slide
  	=========================
  
  	Version 0.1.2.
  
  	This transition slides an element in and out of view,
  	using CSS transitions where possible.
  
  	==========================
  
  	Troubleshooting: If you're using a module system in your app (AMD or
  	something more nodey) then you may need to change the paths below,
  	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.
  
  	==========================
  
  	Usage: Include this file on your page below Ractive, e.g:
  
  	    <script src='lib/ractive.js'></script>
  	    <script src='lib/ractive-transitions-slide.js'></script>
  
  	Or, if you're using a module loader, require this module:
  
  	    // requiring the plugin will 'activate' it - no need to use
  	    // the return value
  	    require( 'ractive-transitions-slide' );
  
  	You can specify the `delay`, `duration` and `easing` properties
  	using the conventional syntax:
  
  	    <div intro='slide:{"delay":500,"easing":"ease-out"}'>content</div>
  
  	Both `delay` and `duration` are in milliseconds. The `easing` value
  	must be a valid CSS easing function (see http://cubic-bezier.com/).
  
  */
  (function (global, factory) {
    
    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
      factory(ractive);
    }  // AMD?
    else if (true) {
      lib_transitions_ractive_transitions_slide = function (ractive) {
        return typeof factory === 'function' ? factory(ractive) : factory;
      }(ractive);
    } else if (global.Ractive) {
      factory(global.Ractive);
    } else {
      throw new Error('Could not find Ractive! It must be loaded before the ractive-transitions-slide plugin');
    }
  }(typeof window !== 'undefined' ? window : this, function (Ractive) {
    
    var slide, props, collapsed, defaults;
    defaults = {
      duration: 300,
      easing: 'easeInOut'
    };
    props = [
      'height',
      'borderTopWidth',
      'borderBottomWidth',
      'paddingTop',
      'paddingBottom',
      'marginTop',
      'marginBottom'
    ];
    collapsed = {
      height: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0
    };
    slide = function (t, params) {
      var targetStyle;
      params = t.processParams(params, defaults);
      if (t.isIntro) {
        targetStyle = t.getStyle(props);
        t.setStyle(collapsed);
      } else {
        // make style explicit, so we're not transitioning to 'auto'
        t.setStyle(t.getStyle(props));
        targetStyle = collapsed;
      }
      t.setStyle('overflowY', 'hidden');
      t.animateStyle(targetStyle, params).then(t.complete);
    };
    Ractive.transitions.slide = slide;
  }));
  /*
  
  	Ractive-transitions-scale
  	========================
  
  	Version 0.1.0.
  
  	This plugin does exactly what it says on the tin - it scales elements
  	in and out, using CSS transitions. You can control the following
  	properties: `duration`, `delay` and `easing` (which must be a valid
  	CSS transition timing function, and defaults to `linear`).
  
  	The `duration` property is in milliseconds, and defaults to 250 (you
  	can also use `fast` or `slow` instead of a millisecond value, which
  	equate to 200 and 600 respectively). As a shorthand, you can use
  	`intro='scale:500'` instead of `intro='scale:{"duration":500}'` - this
  	applies to many other transition plugins as well.
  
  	If an element has an opacity other than 1 (whether directly, because
  	of an inline style, or indirectly because of a CSS rule), it will be
  	respected. You can override the target opacity of an intro fade by
  	specifying a `to` property between 0 and 1.
  
  	==========================
  
  	Troubleshooting: If you're using a module system in your app (AMD or
  	something more nodey) then you may need to change the paths below,
  	where it says `require( 'ractive' )` or `define([ 'Ractive' ]...)`.
  
  	==========================
  
  	Usage: Include this file on your page below Ractive, e.g:
  
  	    <script src='lib/Ractive.js'></script>
  	    <script src='lib/Ractive-transitions-scale.js'></script>
  
  	Or, if you're using a module loader, require this module:
  
  	    // requiring the plugin will 'activate' it - no need to use
  	    // the return value
  	    require( 'Ractive-transitions-scale' );
  
  	Add a fade transition like so:
  
  	    <div intro='scale'>this will scale in</div>
  
  */
  (function (global, factory) {
    
    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
      factory(ractive);
    }  // AMD?
    else if (true) {
      lib_transitions_Ractive_transitions_scale = function (ractive) {
        return typeof factory === 'function' ? factory(ractive) : factory;
      }(ractive);
    } else if (global.Ractive) {
      factory(global.Ractive);
    } else {
      throw new Error('Could not find Ractive! It must be loaded before the Ractive-transitions-scale plugin');
    }
  }(typeof window !== 'undefined' ? window : this, function (Ractive) {
    
    var scale, defaults;
    defaults = {
      duration: 250,
      easing: 'ease-out',
      fade: true,
      from: 0.3,
      to: 1
    };
    scale = function (t, params) {
      params = t.processParams(params, defaults);
      var scaleTo = 'scale(' + params.to + ')', scaleFrom = 'scale(' + params.from + ')', targetOpacity, anim = {};
      if (t.isIntro) {
        t.setStyle('transform', scaleFrom);
        if (t.fade !== false) {
          targetOpacity = t.getStyle('opacity');
          t.setStyle('opacity', 0);
        }
      }
      // set defaults
      anim.opacity = t.isIntro ? targetOpacity : 0;
      if (t.fade !== false)
        anim.transform = t.isIntro ? scaleTo : scaleFrom;
      t.animateStyle(anim, params).then(t.complete);  // as of 0.4.0 transitions return a promise and transition authors should do t.anymateStyle(params).then(action)
    };
    Ractive.transitions.scale = scale;
  }));
  /*
  
  	ractive-transitions-fly
  	=======================
  
  	Version 0.1.3.
  
  	This transition uses CSS transforms to 'fly' elements to their
  	natural location on the page, fading in from transparent as they go.
  	By default, they will fly in from left.
  
  	==========================
  
  	Troubleshooting: If you're using a module system in your app (AMD or
  	something more nodey) then you may need to change the paths below,
  	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.
  
  	==========================
  
  	Usage: Include this file on your page below Ractive, e.g:
  
  	    <script src='lib/ractive.js'></script>
  	    <script src='lib/ractive-transitions-fly.js'></script>
  
  	Or, if you're using a module loader, require this module:
  
  	    // requiring the plugin will 'activate' it - no need to use
  	    // the return value
  	    require( 'ractive-transitions-fly' );
  
  	You can adjust the following parameters: `x`, `y`, `duration`,
  	`delay` and `easing`.
  
  */
  (function (global, factory) {
    
    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
      factory(ractive);
    }  // AMD?
    else if (true) {
      lib_transitions_ractive_transitions_fly = function (ractive) {
        return typeof factory === 'function' ? factory(ractive) : factory;
      }(ractive);
    } else if (global.Ractive) {
      factory(global.Ractive);
    } else {
      throw new Error('Could not find Ractive! It must be loaded before the ractive-transitions-fly plugin');
    }
  }(typeof window !== 'undefined' ? window : this, function (Ractive) {
    
    var fly, addPx, defaults;
    defaults = {
      duration: 400,
      easing: 'easeOut',
      opacity: 0,
      x: -500,
      y: 0
    };
    addPx = function (num) {
      if (num === 0 || typeof num === 'string') {
        return num;
      }
      return num + 'px';
    };
    fly = function (t, params) {
      var x, y, offscreen, target;
      params = t.processParams(params, defaults);
      x = addPx(params.x);
      y = addPx(params.y);
      offscreen = {
        transform: 'translate(' + x + ',' + y + ')',
        opacity: 0
      };
      if (t.isIntro) {
        // animate to the current style
        target = t.getStyle([
          'opacity',
          'transform'
        ]);
        // set offscreen style
        t.setStyle(offscreen);
      } else {
        target = offscreen;
      }
      t.animateStyle(target, params).then(t.complete);
    };
    Ractive.transitions.fly = fly;
  }));
  /*
  
  	ractive-transitions-fade
  	========================
  
  	Version 0.1.2.
  
  	This plugin does exactly what it says on the tin - it fades elements
  	in and out, using CSS transitions. You can control the following
  	properties: `duration`, `delay` and `easing` (which must be a valid
  	CSS transition timing function, and defaults to `linear`).
  
  	The `duration` property is in milliseconds, and defaults to 300 (you
  	can also use `fast` or `slow` instead of a millisecond value, which
  	equate to 200 and 600 respectively). As a shorthand, you can use
  	`intro='fade:500'` instead of `intro='fade:{"duration":500}'` - this
  	applies to many other transition plugins as well.
  
  	If an element has an opacity other than 1 (whether directly, because
  	of an inline style, or indirectly because of a CSS rule), it will be
  	respected. You can override the target opacity of an intro fade by
  	specifying a `to` property between 0 and 1.
  
  	==========================
  
  	Troubleshooting: If you're using a module system in your app (AMD or
  	something more nodey) then you may need to change the paths below,
  	where it says `require( 'Ractive' )` or `define([ 'Ractive' ]...)`.
  
  	==========================
  
  	Usage: Include this file on your page below Ractive, e.g:
  
  	    <script src='lib/ractive.js'></script>
  	    <script src='lib/ractive-transitions-fade.js'></script>
  
  	Or, if you're using a module loader, require this module:
  
  	    // requiring the plugin will 'activate' it - no need to use
  	    // the return value
  	    require( 'ractive-transitions-fade' );
  
  	Add a fade transition like so:
  
  	    <div intro='fade'>this will fade in</div>
  
  */
  (function (global, factory) {
    
    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
      factory(ractive);
    }  // AMD?
    else if (true) {
      lib_transitions_ractive_transitions_fade = function (ractive) {
        return typeof factory === 'function' ? factory(ractive) : factory;
      }(ractive);
    } else if (global.Ractive) {
      factory(global.Ractive);
    } else {
      throw new Error('Could not find Ractive! It must be loaded before the ractive-transitions-fade plugin');
    }
  }(typeof window !== 'undefined' ? window : this, function (Ractive) {
    
    var fade, defaults;
    defaults = {
      delay: 0,
      duration: 300,
      easing: 'linear'
    };
    fade = function (t, params) {
      var targetOpacity;
      params = t.processParams(params, defaults);
      if (t.isIntro) {
        targetOpacity = t.getStyle('opacity');
        t.setStyle('opacity', 0);
      } else {
        targetOpacity = 0;
      }
      t.animateStyle('opacity', targetOpacity, params).then(t.complete);
    };
    Ractive.transitions.fade = fade;
  }));
  /*
  
  	ractive-transitions-typewriter
  	==============================
  
  	Version 0.1.1.
  
  	This transition 'writes' characters onto the page one at a time,
  	hiding and showing child elements as necessary.
  
  	==========================
  
  	Troubleshooting: If you're using a module system in your app (AMD or
  	something more nodey) then you may need to change the paths below,
  	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.
  
  	==========================
  
  	Usage: Include this file on your page below Ractive, e.g:
  
  	    <script src='lib/ractive.js'></script>
  	    <script src='lib/ractive-transitions-typewriter.js'></script>
  
  	Or, if you're using a module loader, require this module:
  
  	    // requiring the plugin will 'activate' it - no need to use
  	    // the return value
  	    require( 'ractive-transitions-typewriter' );
  
  	To control the speed at which the typewriting happens, you have
  	three options - you can adjust the `interval`, `speed` or `duration`.
  	The `interval` is the gap between characters in milliseconds, `speed`
  	is the number of characters per second, and `duration` is the number
  	of milliseconds for the entire job. (These should be treated as
  	targets - in all likelihood, the browser will be slightly out.)
  
  	    <p intro='typewriter:{"speed":200}'>some text</p>
  
  */
  (function (global, factory) {
    
    // Common JS (i.e. browserify) environment
    if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
      factory(ractive);
    }  // AMD?
    else if (true) {
      lib_transitions_Ractive_transitions_typewriter = function (ractive) {
        return typeof factory === 'function' ? factory(ractive) : factory;
      }(ractive);
    } else if (global.Ractive) {
      factory(global.Ractive);
    } else {
      throw new Error('Could not find Ractive! It must be loaded before the ractive-transitions-typewriter plugin');
    }
  }(typeof window !== 'undefined' ? window : this, function (Ractive) {
    
    var typewriter, typewriteNode, typewriteTextNode, props, defaults;
    typewriteNode = function (node, isIntro, complete, interval) {
      var children, next, method;
      if (node.nodeType === 1 && isIntro) {
        node.style.display = node._display;
        node.style.width = node._width;
        node.style.height = node._height;
      }
      if (node.nodeType === 3) {
        typewriteTextNode(node, isIntro, complete, interval);
        return;
      }
      children = Array.prototype.slice.call(node.childNodes);
      method = isIntro ? 'shift' : 'pop';
      next = function () {
        if (!children.length) {
          if (node.nodeType === 1 && isIntro) {
            if (node._style) {
              node.setAttribute('style', node._style);
            } else {
              node.getAttribute('style');
              node.removeAttribute('style');
            }
          }
          complete();
          return;
        }
        typewriteNode(children[method](), isIntro, next, interval);
      };
      next();
    };
    typewriteTextNode = function (node, isIntro, complete, interval) {
      var str, len, loop, i, d, targetLen;
      // text node
      str = isIntro ? node._hiddenData : '' + node.data;
      len = str.length;
      if (!len) {
        complete();
        return;
      }
      i = isIntro ? 0 : len;
      d = isIntro ? 1 : -1;
      targetLen = isIntro ? len : 0;
      loop = setInterval(function () {
        var substr, remaining, match, remainingNonWhitespace, filler;
        substr = str.substr(0, i);
        remaining = str.substring(i);
        match = /^\w+/.exec(remaining);
        remainingNonWhitespace = match ? match[0].length : 0;
        // add some non-breaking whitespace corresponding to the remaining length of the
        // current word (only really works with monospace fonts, but better than nothing)
        filler = new Array(remainingNonWhitespace + 1).join('\xA0');
        node.data = substr + filler;
        if (i === targetLen) {
          clearInterval(loop);
          delete node._hiddenData;
          complete();
        }
        i += d;
      }, interval);
    };
    props = [
      'width',
      'height',
      'visibility'
    ];
    defaults = {};
    // TODO differentiate between intro and outro
    typewriter = function (t, params) {
      var interval, currentStyle, hide;
      params = t.processParams(params, defaults);
      // Find the interval between each character. Default
      // to 4 milliseconds
      interval = params.interval || (params.speed ? 1000 / params.speed : params.duration ? t.node.textContent.length / params.duration : 4);
      currentStyle = t.getStyle(props);
      hide = function (node) {
        var children, i, computedStyle;
        if (node.nodeType === 1) {
          node._style = node.getAttribute('style');
          computedStyle = window.getComputedStyle(node);
          node._display = computedStyle.display;
          node._width = computedStyle.width;
          node._height = computedStyle.height;
        }
        if (node.nodeType === 3) {
          node._hiddenData = '' + node.data;
          node.data = '';
          return;
        }
        children = Array.prototype.slice.call(node.childNodes);
        i = children.length;
        while (i--) {
          hide(children[i]);
        }
        node.style.display = 'none';
      };
      if (t.isIntro) {
        hide(t.node);
      }
      setTimeout(function () {
        // make style explicit...
        t.setStyle(currentStyle);
        typewriteNode(t.node, t.isIntro, t.complete, interval);
      }, params.delay || 0);
    };
    Ractive.transitions.typewriter = typewriter;
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
  (function (FileBrowse) {
    Ractive.components.filebrowse = FileBrowse;
  }(rvc_filebrowse));
  (function (CommonMarkEditor, commonmark) {
    Ractive.components.commonMarkEditor = CommonMarkEditor;
  }  //Transitions
(rvc_commonMarkEditor, lib_commonmark));
}(Ractive, $));
}());