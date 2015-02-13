;(function() {
var rvc, rvc_modal, rvc_navbar, rvc_permissions, rvc_droppable, rvc_draggable, rvc_tree, rvc_filetree, rvc_jsonviewer, rvc_jquery_ui, rvc_datepicker, lib_jquery_ui_core, lib_jquery_ui_datepicker, rvc_fileinput, rvc_dropzone, lib_jquery_ui_widget, lib_jquery_ui_mouse, lib_jquery_ui_draggable, lib_jquery_ui_droppable, rvc_selectable, lib_jquery_ui_selectable, rvc_filebrowse, rvc_colorpicker, lib_spectrumjs, lib_transitions_ractive_transitions_slide, lib_transitions_Ractive_transitions_scale, lib_transitions_ractive_transitions_fly, lib_transitions_ractive_transitions_fade, lib_transitions_Ractive_transitions_typewriter;
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
                  a: {
                    'class': [
                      'modal-dialog',
                      {
                        t: 4,
                        r: 'large',
                        f: [' modal-lg']
                      },
                      {
                        t: 4,
                        r: 'small',
                        f: [' modal-sm']
                      }
                    ]
                  },
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
        customFooter: false,
        large: false,
        small: false
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
  rvc_colorpicker = function (require, Ractive) {
    var __options__ = {
        template: {
          v: 1,
          t: [{
              t: 7,
              e: 'span',
              a: {
                'class': [
                  'colorpicker ',
                  {
                    t: 2,
                    r: 'class'
                  }
                ]
              },
              f: [{
                  t: 7,
                  e: 'input',
                  a: {
                    type: 'text',
                    value: [{
                        t: 2,
                        r: 'value'
                      }]
                  },
                  o: 'colorpicker'
                }]
            }]
        },
        css: '.colorpicker {\n}\n/***\nSpectrum Colorpicker v1.6.0\nhttps://github.com/bgrins/spectrum\nAuthor: Brian Grinstead\nLicense: MIT\n***/\n.sp-container {\nposition:absolute;\ntop:0;\nleft:0;\ndisplay:inline-block;\n*display: inline;\n*zoom: 1;\n/* https://github.com/bgrins/spectrum/issues/40 */\nz-index: 9999994;\noverflow: hidden;\n}\n.sp-container.sp-flat {\nposition: relative;\n}\n/* Fix for * { box-sizing: border-box; } */\n.sp-container,\n.sp-container * {\n-webkit-box-sizing: content-box;\n-moz-box-sizing: content-box;\nbox-sizing: content-box;\n}\n/* http://ansciath.tumblr.com/post/7347495869/css-aspect-ratio */\n.sp-top {\nposition:relative;\nwidth: 100%;\ndisplay:inline-block;\n}\n.sp-top-inner {\nposition:absolute;\ntop:0;\nleft:0;\nbottom:0;\nright:0;\n}\n.sp-color {\nposition: absolute;\ntop:0;\nleft:0;\nbottom:0;\nright:20%;\n}\n.sp-hue {\nposition: absolute;\ntop:0;\nright:0;\nbottom:0;\nleft:84%;\nheight: 100%;\n}\n.sp-clear-enabled .sp-hue {\ntop:33px;\nheight: 77.5%;\n}\n.sp-fill {\npadding-top: 80%;\n}\n.sp-sat, .sp-val {\nposition: absolute;\ntop:0;\nleft:0;\nright:0;\nbottom:0;\n}\n.sp-alpha-enabled .sp-top {\nmargin-bottom: 18px;\n}\n.sp-alpha-enabled .sp-alpha {\ndisplay: block;\n}\n.sp-alpha-handle {\nposition:absolute;\ntop:-4px;\nbottom: -4px;\nwidth: 6px;\nleft: 50%;\ncursor: pointer;\nborder: 1px solid black;\nbackground: white;\nopacity: .8;\n}\n.sp-alpha {\ndisplay: none;\nposition: absolute;\nbottom: -14px;\nright: 0;\nleft: 0;\nheight: 8px;\n}\n.sp-alpha-inner {\nborder: solid 1px #333;\n}\n.sp-clear {\ndisplay: none;\n}\n.sp-clear.sp-clear-display {\nbackground-position: center;\n}\n.sp-clear-enabled .sp-clear {\ndisplay: block;\nposition:absolute;\ntop:0px;\nright:0;\nbottom:0;\nleft:84%;\nheight: 28px;\n}\n/* Don\'t allow text selection */\n.sp-container, .sp-replacer, .sp-preview, .sp-dragger, .sp-slider, .sp-alpha, .sp-clear, .sp-alpha-handle, .sp-container.sp-dragging .sp-input, .sp-container button  {\n-webkit-user-select:none;\n-moz-user-select: -moz-none;\n-o-user-select:none;\nuser-select: none;\n}\n.sp-container.sp-input-disabled .sp-input-container {\ndisplay: none;\n}\n.sp-container.sp-buttons-disabled .sp-button-container {\ndisplay: none;\n}\n.sp-container.sp-palette-buttons-disabled .sp-palette-button-container {\ndisplay: none;\n}\n.sp-palette-only .sp-picker-container {\ndisplay: none;\n}\n.sp-palette-disabled .sp-palette-container {\ndisplay: none;\n}\n.sp-initial-disabled .sp-initial {\ndisplay: none;\n}\n/* Gradients for hue, saturation and value instead of images.  Not pretty... but it works */\n.sp-sat {\nbackground-image: -webkit-gradient(linear,  0 0, 100% 0, from(#FFF), to(rgba(204, 154, 129, 0)));\nbackground-image: -webkit-linear-gradient(left, #FFF, rgba(204, 154, 129, 0));\nbackground-image: -moz-linear-gradient(left, #fff, rgba(204, 154, 129, 0));\nbackground-image: -o-linear-gradient(left, #fff, rgba(204, 154, 129, 0));\nbackground-image: -ms-linear-gradient(left, #fff, rgba(204, 154, 129, 0));\nbackground-image: linear-gradient(to right, #fff, rgba(204, 154, 129, 0));\n-ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=#FFFFFFFF, endColorstr=#00CC9A81)";\nfilter : progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=\'#FFFFFFFF\', endColorstr=\'#00CC9A81\');\n}\n.sp-val {\nbackground-image: -webkit-gradient(linear, 0 100%, 0 0, from(#000000), to(rgba(204, 154, 129, 0)));\nbackground-image: -webkit-linear-gradient(bottom, #000000, rgba(204, 154, 129, 0));\nbackground-image: -moz-linear-gradient(bottom, #000, rgba(204, 154, 129, 0));\nbackground-image: -o-linear-gradient(bottom, #000, rgba(204, 154, 129, 0));\nbackground-image: -ms-linear-gradient(bottom, #000, rgba(204, 154, 129, 0));\nbackground-image: linear-gradient(to top, #000, rgba(204, 154, 129, 0));\n-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)";\nfilter : progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00CC9A81\', endColorstr=\'#FF000000\');\n}\n.sp-hue {\nbackground: -moz-linear-gradient(top, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);\nbackground: -ms-linear-gradient(top, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);\nbackground: -o-linear-gradient(top, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);\nbackground: -webkit-gradient(linear, left top, left bottom, from(#ff0000), color-stop(0.17, #ffff00), color-stop(0.33, #00ff00), color-stop(0.5, #00ffff), color-stop(0.67, #0000ff), color-stop(0.83, #ff00ff), to(#ff0000));\nbackground: -webkit-linear-gradient(top, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);\nbackground: linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);\n}\n/* IE filters do not support multiple color stops.\nGenerate 6 divs, line them up, and do two color gradients for each.\nYes, really.\n*/\n.sp-1 {\nheight:17%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff0000\', endColorstr=\'#ffff00\');\n}\n.sp-2 {\nheight:16%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffff00\', endColorstr=\'#00ff00\');\n}\n.sp-3 {\nheight:17%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00ff00\', endColorstr=\'#00ffff\');\n}\n.sp-4 {\nheight:17%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00ffff\', endColorstr=\'#0000ff\');\n}\n.sp-5 {\nheight:16%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#0000ff\', endColorstr=\'#ff00ff\');\n}\n.sp-6 {\nheight:17%;\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff00ff\', endColorstr=\'#ff0000\');\n}\n.sp-hidden {\ndisplay: none !important;\n}\n/* Clearfix hack */\n.sp-cf:before, .sp-cf:after { content: ""; display: table; }\n.sp-cf:after { clear: both; }\n.sp-cf { *zoom: 1; }\n/* Mobile devices, make hue slider bigger so it is easier to slide */\n@media (max-device-width: 480px) {\n.sp-color { right: 40%; }\n.sp-hue { left: 63%; }\n.sp-fill { padding-top: 60%; }\n}\n.sp-dragger {\nborder-radius: 5px;\nheight: 5px;\nwidth: 5px;\nborder: 1px solid #fff;\nbackground: #000;\ncursor: pointer;\nposition:absolute;\ntop:0;\nleft: 0;\n}\n.sp-slider {\nposition: absolute;\ntop:0;\ncursor:pointer;\nheight: 3px;\nleft: -1px;\nright: -1px;\nborder: 1px solid #000;\nbackground: white;\nopacity: .8;\n}\n.sp-container {\nbackground-color: #ECECEC;\npadding: 0;\nbackground-clip: padding-box;\nborder: 1px solid rgba(0, 0, 0, 0.2);\nborder-radius: 6px;\noutline: 0px none;\nbox-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);\nmargin-right: -32px;\n}\n.sp-container, .sp-container button, .sp-container input, .sp-color, .sp-hue, .sp-clear {\nfont: normal 12px "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;\n-webkit-box-sizing: border-box;\n-moz-box-sizing: border-box;\n-ms-box-sizing: border-box;\nbox-sizing: border-box;\n}\n.sp-top {\nmargin-bottom: 3px;\n}\n.sp-color, .sp-hue, .sp-clear {\nborder: solid 1px #666;\n}\n/* Input */\n.sp-input-container {\nfloat:right;\nwidth: 100px;\nmargin-bottom: 4px;\n}\n.sp-initial-disabled  .sp-input-container {\nwidth: 100%;\n}\n.sp-input {\nfont-size: 12px !important;\nborder: 1px inset;\npadding: 4px 5px;\nmargin: 0;\nwidth: 100%;\nbackground:transparent;\nborder-radius: 3px;\ncolor: #222;\n}\n.sp-input:focus  {\nborder: 1px solid orange;\n}\n.sp-input.sp-validation-error {\nborder: 1px solid red;\nbackground: #fdd;\n}\n.sp-picker-container , .sp-palette-container {\nfloat:left;\nposition: relative;\npadding: 10px;\npadding-bottom: 300px;\nmargin-bottom: -290px;\n}\n.sp-picker-container {\nwidth: 172px;\nborder-left: solid 1px #fff;\n}\n/* Palettes */\n.sp-palette-container {\nborder-right: solid 1px #ccc;\n}\n.sp-palette-only .sp-palette-container {\nborder: 0;\n}\n.sp-palette .sp-thumb-el {\ndisplay: block;\nposition:relative;\nfloat:left;\nwidth: 24px;\nheight: 15px;\nmargin: 3px;\ncursor: pointer;\nborder:solid 2px transparent;\n}\n.sp-palette .sp-thumb-el:hover, .sp-palette .sp-thumb-el.sp-thumb-active {\nborder-color: orange;\n}\n.sp-thumb-el {\nposition:relative;\n}\n/* Initial */\n.sp-initial {\nfloat: left;\nborder: solid 1px #333;\n}\n.sp-initial span {\nwidth: 30px;\nheight: 25px;\nborder:none;\ndisplay:block;\nfloat:left;\nmargin:0;\n}\n.sp-initial .sp-clear-display {\nbackground-position: center;\n}\n/* Buttons */\n.sp-palette-button-container,\n.sp-button-container {\nfloat: right;\n}\n/* Replacer (the little preview div that shows up instead of the <input>) */\n.sp-replacer {\nheight: 34px;\nwidth: 54px;\npadding: 6px 6px;\nfont-size: 14px;\nline-height: 1.42857;\ncolor: #555;\nbackground-color: #FFF;\nbackground-image: none;\nborder: 1px solid #CCC;\nborder-radius: 4px;\nbox-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset;\ntransition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;\n}\n.sp-replacer:hover, .sp-replacer.sp-active {\nborder-color: #F0C49B;\ncolor: #111;\n}\n.sp-replacer.sp-disabled {\ncursor:default;\nborder-color: silver;\ncolor: silver;\n}\n.sp-dd {\npadding: 2px 0;\nheight: 16px;\nline-height: 16px;\nfloat:left;\nfont-size:10px;\n}\n.sp-preview {\nposition:relative;\nwidth:25px;\nheight: 20px;\nborder: solid 1px #222;\nmargin-right: 5px;\nfloat:left;\nz-index: 0;\n}\n.sp-palette {\n*width: 220px;\nmax-width: 220px;\n}\n.sp-palette .sp-thumb-el {\nwidth:16px;\nheight: 16px;\nmargin:2px 1px;\nborder: solid 1px #d0d0d0;\n}\n.sp-container {\npadding-bottom:0;\n}\n/* Buttons: http://hellohappy.org/css3-buttons/ */\n.sp-container button {\nbackground-color: #eeeeee;\nbackground-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);\nbackground-image: -moz-linear-gradient(top, #eeeeee, #cccccc);\nbackground-image: -ms-linear-gradient(top, #eeeeee, #cccccc);\nbackground-image: -o-linear-gradient(top, #eeeeee, #cccccc);\nbackground-image: linear-gradient(to bottom, #eeeeee, #cccccc);\nborder: 1px solid #ccc;\nborder-bottom: 1px solid #bbb;\nborder-radius: 3px;\ncolor: #333;\nfont-size: 14px;\nline-height: 1;\npadding: 5px 4px;\ntext-align: center;\ntext-shadow: 0 1px 0 #eee;\nvertical-align: middle;\n}\n.sp-container button:hover {\nbackground-color: #dddddd;\nbackground-image: -webkit-linear-gradient(top, #dddddd, #bbbbbb);\nbackground-image: -moz-linear-gradient(top, #dddddd, #bbbbbb);\nbackground-image: -ms-linear-gradient(top, #dddddd, #bbbbbb);\nbackground-image: -o-linear-gradient(top, #dddddd, #bbbbbb);\nbackground-image: linear-gradient(to bottom, #dddddd, #bbbbbb);\nborder: 1px solid #bbb;\nborder-bottom: 1px solid #999;\ncursor: pointer;\ntext-shadow: 0 1px 0 #ddd;\n}\n.sp-container button:active {\nborder: 1px solid #aaa;\nborder-bottom: 1px solid #888;\n-webkit-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee;\n-moz-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee;\n-ms-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee;\n-o-box-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee;\nbox-shadow: inset 0 0 5px 2px #aaaaaa, 0 1px 0 0 #eeeeee;\n}\n.sp-cancel {\nfont-size: 11px;\ncolor: #d93f3f !important;\nmargin:0;\npadding:2px;\nmargin-right: 5px;\nvertical-align: middle;\ntext-decoration:none;\n}\n.sp-cancel:hover {\ncolor: #d93f3f !important;\ntext-decoration: underline;\n}\n.sp-palette span:hover, .sp-palette span.sp-thumb-active {\nborder-color: #000;\n}\n.sp-preview, .sp-alpha, .sp-thumb-el {\nposition:relative;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);\n}\n.sp-preview-inner, .sp-alpha-inner, .sp-thumb-inner {\ndisplay:block;\nposition:absolute;\ntop:0;left:0;bottom:0;right:0;\n}\n.sp-palette .sp-thumb-inner {\nbackground-position: 50% 50%;\nbackground-repeat: no-repeat;\n}\n.sp-palette .sp-thumb-light.sp-thumb-active .sp-thumb-inner {\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYBhsgJFMffxAXABlN5JruT4Q3wfi/0DsT64h8UD8HmpIPCWG/KemIfOJCUB+Aoacx6EGBZyHBqI+WsDCwuQ9mhxeg2A210Ntfo8klk9sOMijaURm7yc1UP2RNCMbKE9ODK1HM6iegYLkfx8pligC9lCD7KmRof0ZhjQACDAAceovrtpVBRkAAAAASUVORK5CYII=);\n}\n.sp-palette .sp-thumb-dark.sp-thumb-active .sp-thumb-inner {\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAMdJREFUOE+tkgsNwzAMRMugEAahEAahEAZhEAqlEAZhEAohEAYh81X2dIm8fKpEspLGvudPOsUYpxE2BIJCroJmEW9qJ+MKaBFhEMNabSy9oIcIPwrB+afvAUFoK4H0tMaQ3XtlrggDhOVVMuT4E5MMG0FBbCEYzjYT7OxLEvIHQLY2zWwQ3D+9luyOQTfKDiFD3iUIfPk8VqrKjgAiSfGFPecrg6HN6m/iBcwiDAo7WiBeawa+Kwh7tZoSCGLMqwlSAzVDhoK+6vH4G0P5wdkAAAAASUVORK5CYII=);\n}\n.sp-clear-display {\nbackground-repeat:no-repeat;\nbackground-position: center;\nbackground-image: url(data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAJmZmZ2dnZ6enqKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq/Hx8fLy8vT09PX19ff39/j4+Pn5+fr6+vv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAUABQAAAihAP9FoPCvoMGDBy08+EdhQAIJCCMybCDAAYUEARBAlFiQQoMABQhKUJBxY0SPICEYHBnggEmDKAuoPMjS5cGYMxHW3IiT478JJA8M/CjTZ0GgLRekNGpwAsYABHIypcAgQMsITDtWJYBR6NSqMico9cqR6tKfY7GeBCuVwlipDNmefAtTrkSzB1RaIAoXodsABiZAEFB06gIBWC1mLVgBa0AAOw==);\n}\n'
      }, component = {};
    component.exports = {
      data: { appendTo: false },
      decorators: {
        colorpicker: function (node) {
          var r = this;
          var parent = $(node.parentNode);
          r.set('node', node);
          if (r.get('showPalette')) {
            var palette = r.get('palette');
            if (!palette) {
              palette = [
                [
                  '#d9534f',
                  '#f0ad4e',
                  '#FFD700',
                  '#5cb85c'
                ],
                [
                  '#5cb8a2',
                  '#5bc0de',
                  '#337ab7',
                  '#6F5499'
                ],
                [
                  '#222',
                  '#333',
                  '#555',
                  '#777'
                ],
                [undefined]
              ];
            }
            change = function (color) {
              if (color) {
                r.set('value', color.toHexString());
                r.fire('change', color.toHexString());
              } else {
                r.fire('change');
              }
            };
            $(node).spectrum({
              color: r.get('value'),
              appendTo: parent,
              change: change,
              showPaletteOnly: true,
              togglePaletteOnly: true,
              togglePaletteMoreText: 'more',
              togglePaletteLessText: 'less',
              allowEmpty: true,
              hideAfterPaletteSelect: true,
              maxSelectionSize: 4,
              palette: palette
            });
          } else {
            $(node).spectrum({
              color: r.get('value'),
              appendTo: parent,
              allowEmpty: true,
              change: change
            });
          }
          return {
            teardown: function () {
              $(node).spectrum('destroy');
            }
          };
        }
      },
      onrender: function () {
        var r = this;
        r.on({
          'show': function () {
            $(r.get('node')).spectrum('show');
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
  // Spectrum Colorpicker v1.6.0
  // https://github.com/bgrins/spectrum
  // Author: Brian Grinstead
  // License: MIT
  (function (factory) {
    
    if (true) {
      // AMD
      lib_spectrumjs = function (jquery) {
        return typeof factory === 'function' ? factory(jquery) : factory;
      }(jquery);
    } else if (typeof exports == 'object' && typeof module == 'object') {
      // CommonJS
      module.exports = factory;
    } else {
      // Browser
      factory(jQuery);
    }
  }(function ($, undefined) {
    
    var defaultOpts = {
        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,
        // Options
        color: false,
        flat: false,
        showInput: false,
        allowEmpty: false,
        showButtons: true,
        clickoutFiresChange: false,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: 'body',
        maxSelectionSize: 7,
        cancelText: 'cancel',
        chooseText: 'choose',
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
        clearText: 'Clear Color Selection',
        noColorSelectedText: 'No Color Selected',
        preferredFormat: false,
        className: '',
        // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: '',
        replacerClassName: '',
        showAlpha: false,
        theme: 'sp-light',
        palette: [[
            '#ffffff',
            '#000000',
            '#ff0000',
            '#ff8000',
            '#ffff00',
            '#008000',
            '#0000ff',
            '#4b0082',
            '#9400d3'
          ]],
        selectionPalette: [],
        disabled: false,
        offset: null
      }, spectrums = [], IE = !!/msie/i.exec(window.navigator.userAgent), rgbaSupport = function () {
        function contains(str, substr) {
          return !!~('' + str).indexOf(substr);
        }
        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
      }(), inputTypeColorSupport = function () {
        var colorInput = $('<input type=\'color\' value=\'!\' />')[0];
        return colorInput.type === 'color' && colorInput.value !== '!';
      }(), replaceInput = [
        '<div class=\'sp-replacer\'>',
        '<div class=\'sp-preview\'><div class=\'sp-preview-inner\'></div></div>',
        '<div class=\'sp-dd\'>&#9660;</div>',
        '</div>'
      ].join(''), markup = function () {
        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = '';
        if (IE) {
          for (var i = 1; i <= 6; i++) {
            gradientFix += '<div class=\'sp-' + i + '\'></div>';
          }
        }
        return [
          '<div class=\'sp-container sp-hidden\'>',
          '<div class=\'sp-palette-container\'>',
          '<div class=\'sp-palette sp-thumb sp-cf\'></div>',
          '<div class=\'sp-palette-button-container sp-cf\'>',
          '<button type=\'button\' class=\'sp-palette-toggle\'></button>',
          '</div>',
          '</div>',
          '<div class=\'sp-picker-container\'>',
          '<div class=\'sp-top sp-cf\'>',
          '<div class=\'sp-fill\'></div>',
          '<div class=\'sp-top-inner\'>',
          '<div class=\'sp-color\'>',
          '<div class=\'sp-sat\'>',
          '<div class=\'sp-val\'>',
          '<div class=\'sp-dragger\'></div>',
          '</div>',
          '</div>',
          '</div>',
          '<div class=\'sp-clear sp-clear-display\'>',
          '</div>',
          '<div class=\'sp-hue\'>',
          '<div class=\'sp-slider\'></div>',
          gradientFix,
          '</div>',
          '</div>',
          '<div class=\'sp-alpha\'><div class=\'sp-alpha-inner\'><div class=\'sp-alpha-handle\'></div></div></div>',
          '</div>',
          '<div class=\'sp-input-container sp-cf\'>',
          '<input class=\'sp-input\' type=\'text\' spellcheck=\'false\'  />',
          '</div>',
          '<div class=\'sp-initial sp-thumb sp-cf\'></div>',
          '<div class=\'sp-button-container sp-cf\'>',
          '<a class=\'sp-cancel\' href=\'#\'></a>',
          '<button type=\'button\' class=\'sp-choose\'></button>',
          '</div>',
          '</div>',
          '</div>'
        ].join('');
      }();
    function paletteTemplate(p, color, className, opts) {
      var html = [];
      for (var i = 0; i < p.length; i++) {
        var current = p[i];
        if (current) {
          var tiny = tinycolor(current);
          var c = tiny.toHsl().l < 0.5 ? 'sp-thumb-el sp-thumb-dark' : 'sp-thumb-el sp-thumb-light';
          c += tinycolor.equals(color, current) ? ' sp-thumb-active' : '';
          var formattedString = tiny.toString(opts.preferredFormat || 'rgb');
          var swatchStyle = rgbaSupport ? 'background-color:' + tiny.toRgbString() : 'filter:' + tiny.toFilter();
          html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
        } else {
          var cls = 'sp-clear-display';
          html.push($('<div />').append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>').attr('title', opts.noColorSelectedText)).html());
        }
      }
      return '<div class=\'sp-cf ' + className + '\'>' + html.join('') + '</div>';
    }
    function hideAll() {
      for (var i = 0; i < spectrums.length; i++) {
        if (spectrums[i]) {
          spectrums[i].hide();
        }
      }
    }
    function instanceOptions(o, callbackContext) {
      var opts = $.extend({}, defaultOpts, o);
      opts.callbacks = {
        'move': bind(opts.move, callbackContext),
        'change': bind(opts.change, callbackContext),
        'show': bind(opts.show, callbackContext),
        'hide': bind(opts.hide, callbackContext),
        'beforeShow': bind(opts.beforeShow, callbackContext)
      };
      return opts;
    }
    function spectrum(element, o) {
      var opts = instanceOptions(o, element), flat = opts.flat, showSelectionPalette = opts.showSelectionPalette, localStorageKey = opts.localStorageKey, theme = opts.theme, callbacks = opts.callbacks, resize = throttle(reflow, 10), visible = false, dragWidth = 0, dragHeight = 0, dragHelperHeight = 0, slideHeight = 0, slideWidth = 0, alphaWidth = 0, alphaSlideHelperWidth = 0, slideHelperHeight = 0, currentHue = 0, currentSaturation = 0, currentValue = 0, currentAlpha = 1, palette = [], paletteArray = [], paletteLookup = {}, selectionPalette = opts.selectionPalette.slice(0), maxSelectionSize = opts.maxSelectionSize, draggingClass = 'sp-dragging', shiftMovementDirection = null;
      var doc = element.ownerDocument, body = doc.body, boundElement = $(element), disabled = false, container = $(markup, doc).addClass(theme), pickerContainer = container.find('.sp-picker-container'), dragger = container.find('.sp-color'), dragHelper = container.find('.sp-dragger'), slider = container.find('.sp-hue'), slideHelper = container.find('.sp-slider'), alphaSliderInner = container.find('.sp-alpha-inner'), alphaSlider = container.find('.sp-alpha'), alphaSlideHelper = container.find('.sp-alpha-handle'), textInput = container.find('.sp-input'), paletteContainer = container.find('.sp-palette'), initialColorContainer = container.find('.sp-initial'), cancelButton = container.find('.sp-cancel'), clearButton = container.find('.sp-clear'), chooseButton = container.find('.sp-choose'), toggleButton = container.find('.sp-palette-toggle'), isInput = boundElement.is('input'), isInputTypeColor = isInput && inputTypeColorSupport && boundElement.attr('type') === 'color', shouldReplace = isInput && !flat, replacer = shouldReplace ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]), offsetElement = shouldReplace ? replacer : boundElement, previewElement = replacer.find('.sp-preview-inner'), initialColor = opts.color || isInput && boundElement.val(), colorOnShow = false, preferredFormat = opts.preferredFormat, currentPreferredFormat = preferredFormat, clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange, isEmpty = !initialColor, allowEmpty = opts.allowEmpty && !isInputTypeColor;
      function applyOptions() {
        if (opts.showPaletteOnly) {
          opts.showPalette = true;
        }
        toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
        if (opts.palette) {
          palette = opts.palette.slice(0);
          paletteArray = $.isArray(palette[0]) ? palette : [palette];
          paletteLookup = {};
          for (var i = 0; i < paletteArray.length; i++) {
            for (var j = 0; j < paletteArray[i].length; j++) {
              var rgb = tinycolor(paletteArray[i][j]).toRgbString();
              paletteLookup[rgb] = true;
            }
          }
        }
        container.toggleClass('sp-flat', flat);
        container.toggleClass('sp-input-disabled', !opts.showInput);
        container.toggleClass('sp-alpha-enabled', opts.showAlpha);
        container.toggleClass('sp-clear-enabled', allowEmpty);
        container.toggleClass('sp-buttons-disabled', !opts.showButtons);
        container.toggleClass('sp-palette-buttons-disabled', !opts.togglePaletteOnly);
        container.toggleClass('sp-palette-disabled', !opts.showPalette);
        container.toggleClass('sp-palette-only', opts.showPaletteOnly);
        container.toggleClass('sp-initial-disabled', !opts.showInitial);
        container.addClass(opts.className).addClass(opts.containerClassName);
        reflow();
      }
      function initialize() {
        if (IE) {
          container.find('*:not(input)').attr('unselectable', 'on');
        }
        applyOptions();
        if (shouldReplace) {
          boundElement.after(replacer).hide();
        }
        if (!allowEmpty) {
          clearButton.hide();
        }
        if (flat) {
          boundElement.after(container).hide();
        } else {
          var appendTo = opts.appendTo === 'parent' ? boundElement.parent() : $(opts.appendTo);
          if (appendTo.length !== 1) {
            appendTo = $('body');
          }
          appendTo.append(container);
        }
        updateSelectionPaletteFromStorage();
        offsetElement.bind('click.spectrum touchstart.spectrum', function (e) {
          if (!disabled) {
            toggle();
          }
          e.stopPropagation();
          if (!$(e.target).is('input')) {
            e.preventDefault();
          }
        });
        if (boundElement.is(':disabled') || opts.disabled === true) {
          disable();
        }
        // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
        container.click(stopPropagation);
        // Handle user typed input
        textInput.change(setFromTextInput);
        textInput.bind('paste', function () {
          setTimeout(setFromTextInput, 1);
        });
        textInput.keydown(function (e) {
          if (e.keyCode == 13) {
            setFromTextInput();
          }
        });
        cancelButton.text(opts.cancelText);
        cancelButton.bind('click.spectrum', function (e) {
          e.stopPropagation();
          e.preventDefault();
          revert();
          hide();
        });
        clearButton.attr('title', opts.clearText);
        clearButton.bind('click.spectrum', function (e) {
          e.stopPropagation();
          e.preventDefault();
          isEmpty = true;
          move();
          if (flat) {
            //for the flat style, this is a change event
            updateOriginalInput(true);
          }
        });
        chooseButton.text(opts.chooseText);
        chooseButton.bind('click.spectrum', function (e) {
          e.stopPropagation();
          e.preventDefault();
          if (isValid()) {
            updateOriginalInput(true);
            hide();
          }
        });
        toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
        toggleButton.bind('click.spectrum', function (e) {
          e.stopPropagation();
          e.preventDefault();
          opts.showPaletteOnly = !opts.showPaletteOnly;
          // To make sure the Picker area is drawn on the right, next to the
          // Palette area (and not below the palette), first move the Palette
          // to the left to make space for the picker, plus 5px extra.
          // The 'applyOptions' function puts the whole container back into place
          // and takes care of the button-text and the sp-palette-only CSS class.
          if (!opts.showPaletteOnly && !flat) {
            container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
          }
          applyOptions();
        });
        draggable(alphaSlider, function (dragX, dragY, e) {
          currentAlpha = dragX / alphaWidth;
          isEmpty = false;
          if (e.shiftKey) {
            currentAlpha = Math.round(currentAlpha * 10) / 10;
          }
          move();
        }, dragStart, dragStop);
        draggable(slider, function (dragX, dragY) {
          currentHue = parseFloat(dragY / slideHeight);
          isEmpty = false;
          if (!opts.showAlpha) {
            currentAlpha = 1;
          }
          move();
        }, dragStart, dragStop);
        draggable(dragger, function (dragX, dragY, e) {
          // shift+drag should snap the movement to either the x or y axis.
          if (!e.shiftKey) {
            shiftMovementDirection = null;
          } else if (!shiftMovementDirection) {
            var oldDragX = currentSaturation * dragWidth;
            var oldDragY = dragHeight - currentValue * dragHeight;
            var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);
            shiftMovementDirection = furtherFromX ? 'x' : 'y';
          }
          var setSaturation = !shiftMovementDirection || shiftMovementDirection === 'x';
          var setValue = !shiftMovementDirection || shiftMovementDirection === 'y';
          if (setSaturation) {
            currentSaturation = parseFloat(dragX / dragWidth);
          }
          if (setValue) {
            currentValue = parseFloat((dragHeight - dragY) / dragHeight);
          }
          isEmpty = false;
          if (!opts.showAlpha) {
            currentAlpha = 1;
          }
          move();
        }, dragStart, dragStop);
        if (!!initialColor) {
          set(initialColor);
          // In case color was black - update the preview UI and set the format
          // since the set function will not run (default color is black).
          updateUI();
          currentPreferredFormat = preferredFormat || tinycolor(initialColor).format;
          addColorToSelectionPalette(initialColor);
        } else {
          updateUI();
        }
        if (flat) {
          show();
        }
        function paletteElementClick(e) {
          if (e.data && e.data.ignore) {
            set($(e.target).closest('.sp-thumb-el').data('color'));
            move();
          } else {
            set($(e.target).closest('.sp-thumb-el').data('color'));
            move();
            updateOriginalInput(true);
            if (opts.hideAfterPaletteSelect) {
              hide();
            }
          }
          return false;
        }
        var paletteEvent = IE ? 'mousedown.spectrum' : 'click.spectrum touchstart.spectrum';
        paletteContainer.delegate('.sp-thumb-el', paletteEvent, paletteElementClick);
        initialColorContainer.delegate('.sp-thumb-el:nth-child(1)', paletteEvent, { ignore: true }, paletteElementClick);
      }
      function updateSelectionPaletteFromStorage() {
        if (localStorageKey && window.localStorage) {
          // Migrate old palettes over to new format.  May want to remove this eventually.
          try {
            var oldPalette = window.localStorage[localStorageKey].split(',#');
            if (oldPalette.length > 1) {
              delete window.localStorage[localStorageKey];
              $.each(oldPalette, function (i, c) {
                addColorToSelectionPalette(c);
              });
            }
          } catch (e) {
          }
          try {
            selectionPalette = window.localStorage[localStorageKey].split(';');
          } catch (e) {
          }
        }
      }
      function addColorToSelectionPalette(color) {
        if (showSelectionPalette) {
          var rgb = tinycolor(color).toRgbString();
          if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
            selectionPalette.push(rgb);
            while (selectionPalette.length > maxSelectionSize) {
              selectionPalette.shift();
            }
          }
          if (localStorageKey && window.localStorage) {
            try {
              window.localStorage[localStorageKey] = selectionPalette.join(';');
            } catch (e) {
            }
          }
        }
      }
      function getUniqueSelectionPalette() {
        var unique = [];
        if (opts.showPalette) {
          for (var i = 0; i < selectionPalette.length; i++) {
            var rgb = tinycolor(selectionPalette[i]).toRgbString();
            if (!paletteLookup[rgb]) {
              unique.push(selectionPalette[i]);
            }
          }
        }
        return unique.reverse().slice(0, opts.maxSelectionSize);
      }
      function drawPalette() {
        var currentColor = get();
        var html = $.map(paletteArray, function (palette, i) {
          return paletteTemplate(palette, currentColor, 'sp-palette-row sp-palette-row-' + i, opts);
        });
        updateSelectionPaletteFromStorage();
        if (selectionPalette) {
          html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, 'sp-palette-row sp-palette-row-selection', opts));
        }
        paletteContainer.html(html.join(''));
      }
      function drawInitial() {
        if (opts.showInitial) {
          var initial = colorOnShow;
          var current = get();
          initialColorContainer.html(paletteTemplate([
            initial,
            current
          ], current, 'sp-palette-row-initial', opts));
        }
      }
      function dragStart() {
        if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
          reflow();
        }
        container.addClass(draggingClass);
        shiftMovementDirection = null;
        boundElement.trigger('dragstart.spectrum', [get()]);
      }
      function dragStop() {
        container.removeClass(draggingClass);
        boundElement.trigger('dragstop.spectrum', [get()]);
      }
      function setFromTextInput() {
        var value = textInput.val();
        if ((value === null || value === '') && allowEmpty) {
          set(null);
          updateOriginalInput(true);
        } else {
          var tiny = tinycolor(value);
          if (tiny.isValid()) {
            set(tiny);
            updateOriginalInput(true);
          } else {
            textInput.addClass('sp-validation-error');
          }
        }
      }
      function toggle() {
        if (visible) {
          hide();
        } else {
          show();
        }
      }
      function show() {
        var event = $.Event('beforeShow.spectrum');
        if (visible) {
          reflow();
          return;
        }
        boundElement.trigger(event, [get()]);
        if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
          return;
        }
        hideAll();
        visible = true;
        $(doc).bind('click.spectrum', clickout);
        $(window).bind('resize.spectrum', resize);
        replacer.addClass('sp-active');
        container.removeClass('sp-hidden');
        reflow();
        updateUI();
        colorOnShow = get();
        drawInitial();
        callbacks.show(colorOnShow);
        boundElement.trigger('show.spectrum', [colorOnShow]);
      }
      function clickout(e) {
        // Return on right click.
        if (e.button == 2) {
          return;
        }
        if (clickoutFiresChange) {
          updateOriginalInput(true);
        } else {
          revert();
        }
        hide();
      }
      function hide() {
        // Return if hiding is unnecessary
        if (!visible || flat) {
          return;
        }
        visible = false;
        $(doc).unbind('click.spectrum', clickout);
        $(window).unbind('resize.spectrum', resize);
        replacer.removeClass('sp-active');
        container.addClass('sp-hidden');
        callbacks.hide(get());
        boundElement.trigger('hide.spectrum', [get()]);
      }
      function revert() {
        set(colorOnShow, true);
      }
      function set(color, ignoreFormatChange) {
        if (tinycolor.equals(color, get())) {
          // Update UI just in case a validation error needs
          // to be cleared.
          updateUI();
          return;
        }
        var newColor, newHsv;
        if (!color && allowEmpty) {
          isEmpty = true;
        } else {
          isEmpty = false;
          newColor = tinycolor(color);
          newHsv = newColor.toHsv();
          currentHue = newHsv.h % 360 / 360;
          currentSaturation = newHsv.s;
          currentValue = newHsv.v;
          currentAlpha = newHsv.a;
        }
        updateUI();
        if (newColor && newColor.isValid() && !ignoreFormatChange) {
          currentPreferredFormat = preferredFormat || newColor.getFormat();
        }
      }
      function get(opts) {
        opts = opts || {};
        if (allowEmpty && isEmpty) {
          return null;
        }
        return tinycolor.fromRatio({
          h: currentHue,
          s: currentSaturation,
          v: currentValue,
          a: Math.round(currentAlpha * 100) / 100
        }, { format: opts.format || currentPreferredFormat });
      }
      function isValid() {
        return !textInput.hasClass('sp-validation-error');
      }
      function move() {
        updateUI();
        callbacks.move(get());
        boundElement.trigger('move.spectrum', [get()]);
      }
      function updateUI() {
        textInput.removeClass('sp-validation-error');
        updateHelperLocations();
        // Update dragger background color (gradients take care of saturation and value).
        var flatColor = tinycolor.fromRatio({
          h: currentHue,
          s: 1,
          v: 1
        });
        dragger.css('background-color', flatColor.toHexString());
        // Get a format that alpha will be included in (hex and names ignore alpha)
        var format = currentPreferredFormat;
        if (currentAlpha < 1 && !(currentAlpha === 0 && format === 'name')) {
          if (format === 'hex' || format === 'hex3' || format === 'hex6' || format === 'name') {
            format = 'rgb';
          }
        }
        var realColor = get({ format: format }), displayColor = '';
        //reset background info for preview element
        previewElement.removeClass('sp-clear-display');
        previewElement.css('background-color', 'transparent');
        if (!realColor && allowEmpty) {
          // Update the replaced elements background with icon indicating no color selection
          previewElement.addClass('sp-clear-display');
        } else {
          var realHex = realColor.toHexString(), realRgb = realColor.toRgbString();
          // Update the replaced elements background color (with actual selected color)
          if (rgbaSupport || realColor.alpha === 1) {
            previewElement.css('background-color', realRgb);
          } else {
            previewElement.css('background-color', 'transparent');
            previewElement.css('filter', realColor.toFilter());
          }
          if (opts.showAlpha) {
            var rgb = realColor.toRgb();
            rgb.a = 0;
            var realAlpha = tinycolor(rgb).toRgbString();
            var gradient = 'linear-gradient(left, ' + realAlpha + ', ' + realHex + ')';
            if (IE) {
              alphaSliderInner.css('filter', tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
            } else {
              alphaSliderInner.css('background', '-webkit-' + gradient);
              alphaSliderInner.css('background', '-moz-' + gradient);
              alphaSliderInner.css('background', '-ms-' + gradient);
              // Use current syntax gradient on unprefixed property.
              alphaSliderInner.css('background', 'linear-gradient(to right, ' + realAlpha + ', ' + realHex + ')');
            }
          }
          displayColor = realColor.toString(format);
        }
        // Update the text entry input as it changes happen
        if (opts.showInput) {
          textInput.val(displayColor);
        }
        if (opts.showPalette) {
          drawPalette();
        }
        drawInitial();
      }
      function updateHelperLocations() {
        var s = currentSaturation;
        var v = currentValue;
        if (allowEmpty && isEmpty) {
          //if selected color is empty, hide the helpers
          alphaSlideHelper.hide();
          slideHelper.hide();
          dragHelper.hide();
        } else {
          //make sure helpers are visible
          alphaSlideHelper.show();
          slideHelper.show();
          dragHelper.show();
          // Where to show the little circle in that displays your current selected color
          var dragX = s * dragWidth;
          var dragY = dragHeight - v * dragHeight;
          dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
          dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
          dragHelper.css({
            'top': dragY + 'px',
            'left': dragX + 'px'
          });
          var alphaX = currentAlpha * alphaWidth;
          alphaSlideHelper.css({ 'left': alphaX - alphaSlideHelperWidth / 2 + 'px' });
          // Where to show the bar that displays your current selected hue
          var slideY = currentHue * slideHeight;
          slideHelper.css({ 'top': slideY - slideHelperHeight + 'px' });
        }
      }
      function updateOriginalInput(fireCallback) {
        var color = get(), displayColor = '', hasChanged = !tinycolor.equals(color, colorOnShow);
        if (color) {
          displayColor = color.toString(currentPreferredFormat);
          // Update the selection palette with the current color
          addColorToSelectionPalette(color);
        }
        if (isInput) {
          boundElement.val(displayColor);
        }
        if (fireCallback && hasChanged) {
          callbacks.change(color);
          boundElement.trigger('change', [color]);
        }
      }
      function reflow() {
        dragWidth = dragger.width();
        dragHeight = dragger.height();
        dragHelperHeight = dragHelper.height();
        slideWidth = slider.width();
        slideHeight = slider.height();
        slideHelperHeight = slideHelper.height();
        alphaWidth = alphaSlider.width();
        alphaSlideHelperWidth = alphaSlideHelper.width();
        if (!flat) {
          container.css('position', 'absolute');
          if (opts.offset) {
            container.offset(opts.offset);
          } else {
            container.offset(getOffset(container, offsetElement));
          }
        }
        updateHelperLocations();
        if (opts.showPalette) {
          drawPalette();
        }
        boundElement.trigger('reflow.spectrum');
      }
      function destroy() {
        boundElement.show();
        offsetElement.unbind('click.spectrum touchstart.spectrum');
        container.remove();
        replacer.remove();
        spectrums[spect.id] = null;
      }
      function option(optionName, optionValue) {
        if (optionName === undefined) {
          return $.extend({}, opts);
        }
        if (optionValue === undefined) {
          return opts[optionName];
        }
        opts[optionName] = optionValue;
        applyOptions();
      }
      function enable() {
        disabled = false;
        boundElement.attr('disabled', false);
        offsetElement.removeClass('sp-disabled');
      }
      function disable() {
        hide();
        disabled = true;
        boundElement.attr('disabled', true);
        offsetElement.addClass('sp-disabled');
      }
      function setOffset(coord) {
        opts.offset = coord;
        reflow();
      }
      initialize();
      var spect = {
        show: show,
        hide: hide,
        toggle: toggle,
        reflow: reflow,
        option: option,
        enable: enable,
        disable: disable,
        offset: setOffset,
        set: function (c) {
          set(c);
          updateOriginalInput();
        },
        get: get,
        destroy: destroy,
        container: container
      };
      spect.id = spectrums.push(spect) - 1;
      return spect;
    }
    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
      var extraY = 0;
      var dpWidth = picker.outerWidth();
      var dpHeight = picker.outerHeight();
      var inputHeight = input.outerHeight();
      var doc = picker[0].ownerDocument;
      var docElem = doc.documentElement;
      var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
      var viewHeight = docElem.clientHeight + $(doc).scrollTop();
      var offset = input.offset();
      offset.top += inputHeight;
      offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
      offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight - extraY) : extraY);
      return offset;
    }
    /**
    * noop - do nothing
    */
    function noop() {
    }
    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
      e.stopPropagation();
    }
    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 2);
      return function () {
        return func.apply(obj, args.concat(slice.call(arguments)));
      };
    }
    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
      onmove = onmove || function () {
      };
      onstart = onstart || function () {
      };
      onstop = onstop || function () {
      };
      var doc = document;
      var dragging = false;
      var offset = {};
      var maxHeight = 0;
      var maxWidth = 0;
      var hasTouch = 'ontouchstart' in window;
      var duringDragEvents = {};
      duringDragEvents['selectstart'] = prevent;
      duringDragEvents['dragstart'] = prevent;
      duringDragEvents['touchmove mousemove'] = move;
      duringDragEvents['touchend mouseup'] = stop;
      function prevent(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.returnValue = false;
      }
      function move(e) {
        if (dragging) {
          // Mouseup happened outside of window
          if (IE && doc.documentMode < 9 && !e.button) {
            return stop();
          }
          var touches = e.originalEvent && e.originalEvent.touches;
          var pageX = touches ? touches[0].pageX : e.pageX;
          var pageY = touches ? touches[0].pageY : e.pageY;
          var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
          var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));
          if (hasTouch) {
            // Stop scrolling in iOS
            prevent(e);
          }
          onmove.apply(element, [
            dragX,
            dragY,
            e
          ]);
        }
      }
      function start(e) {
        var rightclick = e.which ? e.which == 3 : e.button == 2;
        if (!rightclick && !dragging) {
          if (onstart.apply(element, arguments) !== false) {
            dragging = true;
            maxHeight = $(element).height();
            maxWidth = $(element).width();
            offset = $(element).offset();
            $(doc).bind(duringDragEvents);
            $(doc.body).addClass('sp-dragging');
            if (!hasTouch) {
              move(e);
            }
            prevent(e);
          }
        }
      }
      function stop() {
        if (dragging) {
          $(doc).unbind(duringDragEvents);
          $(doc.body).removeClass('sp-dragging');
          onstop.apply(element, arguments);
        }
        dragging = false;
      }
      $(element).bind('touchstart mousedown', start);
    }
    function throttle(func, wait, debounce) {
      var timeout;
      return function () {
        var context = this, args = arguments;
        var throttler = function () {
          timeout = null;
          func.apply(context, args);
        };
        if (debounce)
          clearTimeout(timeout);
        if (debounce || !timeout)
          timeout = setTimeout(throttler, wait);
      };
    }
    /**
    * Define a jQuery plugin
    */
    var dataID = 'spectrum.id';
    $.fn.spectrum = function (opts, extra) {
      if (typeof opts == 'string') {
        var returnValue = this;
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function () {
          var spect = spectrums[$(this).data(dataID)];
          if (spect) {
            var method = spect[opts];
            if (!method) {
              throw new Error('Spectrum: no such method: \'' + opts + '\'');
            }
            if (opts == 'get') {
              returnValue = spect.get();
            } else if (opts == 'container') {
              returnValue = spect.container;
            } else if (opts == 'option') {
              returnValue = spect.option.apply(spect, args);
            } else if (opts == 'destroy') {
              spect.destroy();
              $(this).removeData(dataID);
            } else {
              method.apply(spect, args);
            }
          }
        });
        return returnValue;
      }
      // Initializing a new instance of spectrum
      return this.spectrum('destroy').each(function () {
        var options = $.extend({}, opts, $(this).data());
        var spect = spectrum(this, options);
        $(this).data(dataID, spect.id);
      });
    };
    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.spectrum = {};
    $.spectrum.localization = {};
    $.spectrum.palettes = {};
    $.fn.spectrum.processNativeColorInputs = function () {
      if (!inputTypeColorSupport) {
        $('input[type=color]').spectrum({ preferredFormat: 'hex6' });
      }
    };
    // TinyColor v1.1.1
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License
    (function () {
      var trimLeft = /^[\s,#]+/, trimRight = /\s+$/, tinyCounter = 0, math = Math, mathRound = math.round, mathMin = math.min, mathMax = math.max, mathRandom = math.random;
      var tinycolor = function tinycolor(color, opts) {
        color = color ? color : '';
        opts = opts || {};
        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
          return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
        }
        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) {
          this._r = mathRound(this._r);
        }
        if (this._g < 1) {
          this._g = mathRound(this._g);
        }
        if (this._b < 1) {
          this._b = mathRound(this._b);
        }
        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
      };
      tinycolor.prototype = {
        isDark: function () {
          return this.getBrightness() < 128;
        },
        isLight: function () {
          return !this.isDark();
        },
        isValid: function () {
          return this._ok;
        },
        getOriginalInput: function () {
          return this._originalInput;
        },
        getFormat: function () {
          return this._format;
        },
        getAlpha: function () {
          return this._a;
        },
        getBrightness: function () {
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        setAlpha: function (value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100 * this._a) / 100;
          return this;
        },
        toHsv: function () {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return {
            h: hsv.h * 360,
            s: hsv.s,
            v: hsv.v,
            a: this._a
          };
        },
        toHsvString: function () {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
          return this._a == 1 ? 'hsv(' + h + ', ' + s + '%, ' + v + '%)' : 'hsva(' + h + ', ' + s + '%, ' + v + '%, ' + this._roundA + ')';
        },
        toHsl: function () {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return {
            h: hsl.h * 360,
            s: hsl.s,
            l: hsl.l,
            a: this._a
          };
        },
        toHslString: function () {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
          return this._a == 1 ? 'hsl(' + h + ', ' + s + '%, ' + l + '%)' : 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + this._roundA + ')';
        },
        toHex: function (allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function (allow3Char) {
          return '#' + this.toHex(allow3Char);
        },
        toHex8: function () {
          return rgbaToHex(this._r, this._g, this._b, this._a);
        },
        toHex8String: function () {
          return '#' + this.toHex8();
        },
        toRgb: function () {
          return {
            r: mathRound(this._r),
            g: mathRound(this._g),
            b: mathRound(this._b),
            a: this._a
          };
        },
        toRgbString: function () {
          return this._a == 1 ? 'rgb(' + mathRound(this._r) + ', ' + mathRound(this._g) + ', ' + mathRound(this._b) + ')' : 'rgba(' + mathRound(this._r) + ', ' + mathRound(this._g) + ', ' + mathRound(this._b) + ', ' + this._roundA + ')';
        },
        toPercentageRgb: function () {
          return {
            r: mathRound(bound01(this._r, 255) * 100) + '%',
            g: mathRound(bound01(this._g, 255) * 100) + '%',
            b: mathRound(bound01(this._b, 255) * 100) + '%',
            a: this._a
          };
        },
        toPercentageRgbString: function () {
          return this._a == 1 ? 'rgb(' + mathRound(bound01(this._r, 255) * 100) + '%, ' + mathRound(bound01(this._g, 255) * 100) + '%, ' + mathRound(bound01(this._b, 255) * 100) + '%)' : 'rgba(' + mathRound(bound01(this._r, 255) * 100) + '%, ' + mathRound(bound01(this._g, 255) * 100) + '%, ' + mathRound(bound01(this._b, 255) * 100) + '%, ' + this._roundA + ')';
        },
        toName: function () {
          if (this._a === 0) {
            return 'transparent';
          }
          if (this._a < 1) {
            return false;
          }
          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function (secondColor) {
          var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? 'GradientType = 1, ' : '';
          if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = s.toHex8String();
          }
          return 'progid:DXImageTransform.Microsoft.gradient(' + gradientType + 'startColorstr=' + hex8String + ',endColorstr=' + secondHex8String + ')';
        },
        toString: function (format) {
          var formatSet = !!format;
          format = format || this._format;
          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === 'hex' || format === 'hex6' || format === 'hex3' || format === 'name');
          if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this._a === 0) {
              return this.toName();
            }
            return this.toRgbString();
          }
          if (format === 'rgb') {
            formattedString = this.toRgbString();
          }
          if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
          }
          if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
          }
          if (format === 'hex3') {
            formattedString = this.toHexString(true);
          }
          if (format === 'hex8') {
            formattedString = this.toHex8String();
          }
          if (format === 'name') {
            formattedString = this.toName();
          }
          if (format === 'hsl') {
            formattedString = this.toHslString();
          }
          if (format === 'hsv') {
            formattedString = this.toHsvString();
          }
          return formattedString || this.toHexString();
        },
        _applyModification: function (fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
        },
        lighten: function () {
          return this._applyModification(lighten, arguments);
        },
        brighten: function () {
          return this._applyModification(brighten, arguments);
        },
        darken: function () {
          return this._applyModification(darken, arguments);
        },
        desaturate: function () {
          return this._applyModification(desaturate, arguments);
        },
        saturate: function () {
          return this._applyModification(saturate, arguments);
        },
        greyscale: function () {
          return this._applyModification(greyscale, arguments);
        },
        spin: function () {
          return this._applyModification(spin, arguments);
        },
        _applyCombination: function (fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function () {
          return this._applyCombination(analogous, arguments);
        },
        complement: function () {
          return this._applyCombination(complement, arguments);
        },
        monochromatic: function () {
          return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function () {
          return this._applyCombination(splitcomplement, arguments);
        },
        triad: function () {
          return this._applyCombination(triad, arguments);
        },
        tetrad: function () {
          return this._applyCombination(tetrad, arguments);
        }
      };
      // If input is an object, force 1 into "1.0" to handle ratios properly
      // String input requires "1.0" as input, so 1 will be treated as 1
      tinycolor.fromRatio = function (color, opts) {
        if (typeof color == 'object') {
          var newColor = {};
          for (var i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === 'a') {
                newColor[i] = color[i];
              } else {
                newColor[i] = convertToPercentage(color[i]);
              }
            }
          }
          color = newColor;
        }
        return tinycolor(color, opts);
      };
      // Given a string or object, convert that input to RGB
      // Possible string inputs:
      //
      //     "red"
      //     "#f00" or "f00"
      //     "#ff0000" or "ff0000"
      //     "#ff000000" or "ff000000"
      //     "rgb 255 0 0" or "rgb (255, 0, 0)"
      //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
      //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
      //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
      //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
      //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
      //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
      //
      function inputToRGB(color) {
        var rgb = {
          r: 0,
          g: 0,
          b: 0
        };
        var a = 1;
        var ok = false;
        var format = false;
        if (typeof color == 'string') {
          color = stringInputToObject(color);
        }
        if (typeof color == 'object') {
          if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
          } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
            color.s = convertToPercentage(color.s);
            color.v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, color.s, color.v);
            ok = true;
            format = 'hsv';
          } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
            color.s = convertToPercentage(color.s);
            color.l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, color.s, color.l);
            ok = true;
            format = 'hsl';
          }
          if (color.hasOwnProperty('a')) {
            a = color.a;
          }
        }
        a = boundAlpha(a);
        return {
          ok: ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a: a
        };
      }
      // Conversion Functions
      // --------------------
      // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
      // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
      // `rgbToRgb`
      // Handle bounds / percentage checking to conform to CSS color spec
      // <http://www.w3.org/TR/css3-color/>
      // *Assumes:* r, g, b in [0, 255] or [0, 1]
      // *Returns:* { r, g, b } in [0, 255]
      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }
      // `rgbToHsl`
      // Converts an RGB color value to HSL.
      // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
      // *Returns:* { h, s, l } in [0,1]
      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0;  // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          }
          h /= 6;
        }
        return {
          h: h,
          s: s,
          l: l
        };
      }
      // `hslToRgb`
      // Converts an HSL color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      function hslToRgb(h, s, l) {
        var r, g, b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        function hue2rgb(p, q, t) {
          if (t < 0)
            t += 1;
          if (t > 1)
            t -= 1;
          if (t < 1 / 6)
            return p + (q - p) * 6 * t;
          if (t < 1 / 2)
            return q;
          if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }
        if (s === 0) {
          r = g = b = l;  // achromatic
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
      // `rgbToHsv`
      // Converts an RGB color value to HSV
      // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
      // *Returns:* { h, s, v } in [0,1]
      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max == min) {
          h = 0;  // achromatic
        } else {
          switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          }
          h /= 6;
        }
        return {
          h: h,
          s: s,
          v: v
        };
      }
      // `hsvToRgb`
      // Converts an HSV color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [
            v,
            q,
            p,
            p,
            t,
            v
          ][mod], g = [
            t,
            v,
            v,
            q,
            p,
            p
          ][mod], b = [
            p,
            p,
            t,
            v,
            v,
            q
          ][mod];
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
      // `rgbToHex`
      // Converts an RGB color to hex
      // Assumes r, g, and b are contained in the set [0, 255]
      // Returns a 3 or 6 character hex
      function rgbToHex(r, g, b, allow3Char) {
        var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join('');
      }
      // `rgbaToHex`
      // Converts an RGBA color plus alpha transparency to hex
      // Assumes r, g, b and a are contained in the set [0, 255]
      // Returns an 8 character hex
      function rgbaToHex(r, g, b, a) {
        var hex = [
          pad2(convertDecimalToHex(a)),
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        return hex.join('');
      }
      // `equals`
      // Can be called with any tinycolor input
      tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
          return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
      };
      tinycolor.random = function () {
        return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
        });
      };
      // Modification Functions
      // ----------------------
      // Thanks to less.js for some of the basics here
      // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>
      function desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function greyscale(color) {
        return tinycolor(color).desaturate(100);
      }
      function lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      function brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
      }
      function darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
      // Values outside of this range will be wrapped into this range.
      function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (mathRound(hsl.h) + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
      }
      // Combination Functions
      // ---------------------
      // Thanks to jQuery xColor for some of the ideas behind these
      // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>
      function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
      }
      function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({
            h: (h + 120) % 360,
            s: hsl.s,
            l: hsl.l
          }),
          tinycolor({
            h: (h + 240) % 360,
            s: hsl.s,
            l: hsl.l
          })
        ];
      }
      function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({
            h: (h + 90) % 360,
            s: hsl.s,
            l: hsl.l
          }),
          tinycolor({
            h: (h + 180) % 360,
            s: hsl.s,
            l: hsl.l
          }),
          tinycolor({
            h: (h + 270) % 360,
            s: hsl.s,
            l: hsl.l
          })
        ];
      }
      function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({
            h: (h + 72) % 360,
            s: hsl.s,
            l: hsl.l
          }),
          tinycolor({
            h: (h + 216) % 360,
            s: hsl.s,
            l: hsl.l
          })
        ];
      }
      function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;
        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];
        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
        }
        return ret;
      }
      function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;
        while (results--) {
          ret.push(tinycolor({
            h: h,
            s: s,
            v: v
          }));
          v = (v + modification) % 1;
        }
        return ret;
      }
      // Utility Functions
      // ---------------------
      tinycolor.mix = function (color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;
        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();
        var p = amount / 100;
        var w = p * 2 - 1;
        var a = rgb2.a - rgb1.a;
        var w1;
        if (w * a == -1) {
          w1 = w;
        } else {
          w1 = (w + a) / (1 + w * a);
        }
        w1 = (w1 + 1) / 2;
        var w2 = 1 - w1;
        var rgba = {
          r: rgb2.r * w1 + rgb1.r * w2,
          g: rgb2.g * w1 + rgb1.g * w2,
          b: rgb2.b * w1 + rgb1.b * w2,
          a: rgb2.a * p + rgb1.a * (1 - p)
        };
        return tinycolor(rgba);
      };
      // Readability Functions
      // ---------------------
      // <http://www.w3.org/TR/AERT#color-contrast>
      // `readability`
      // Analyze the 2 colors and returns an object with the following properties:
      //    `brightness`: difference in brightness between the two colors
      //    `color`: difference in color/hue between the two colors
      tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        var rgb1 = c1.toRgb();
        var rgb2 = c2.toRgb();
        var brightnessA = c1.getBrightness();
        var brightnessB = c2.getBrightness();
        var colorDiff = Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) + Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) + Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b);
        return {
          brightness: Math.abs(brightnessA - brightnessB),
          color: colorDiff
        };
      };
      // `readable`
      // http://www.w3.org/TR/AERT#color-contrast
      // Ensure that foreground and background color combinations provide sufficient contrast.
      // *Example*
      //    tinycolor.isReadable("#000", "#111") => false
      tinycolor.isReadable = function (color1, color2) {
        var readability = tinycolor.readability(color1, color2);
        return readability.brightness > 125 && readability.color > 500;
      };
      // `mostReadable`
      // Given a base color and a list of possible foreground or background
      // colors for that base, returns the most readable color.
      // *Example*
      //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
      tinycolor.mostReadable = function (baseColor, colorList) {
        var bestColor = null;
        var bestScore = 0;
        var bestIsReadable = false;
        for (var i = 0; i < colorList.length; i++) {
          // We normalize both around the "acceptable" breaking point,
          // but rank brightness constrast higher than hue.
          var readability = tinycolor.readability(baseColor, colorList[i]);
          var readable = readability.brightness > 125 && readability.color > 500;
          var score = 3 * (readability.brightness / 125) + readability.color / 500;
          if (readable && !bestIsReadable || readable && bestIsReadable && score > bestScore || !readable && !bestIsReadable && score > bestScore) {
            bestIsReadable = readable;
            bestScore = score;
            bestColor = tinycolor(colorList[i]);
          }
        }
        return bestColor;
      };
      // Big List of Colors
      // ------------------
      // <http://www.w3.org/TR/css3-color/#svg-color>
      var names = tinycolor.names = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '0ff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000',
        blanchedalmond: 'ffebcd',
        blue: '00f',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        burntsienna: 'ea7e5d',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '0ff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkgrey: 'a9a9a9',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkslategrey: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dimgrey: '696969',
        dodgerblue: '1e90ff',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'f0f',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        grey: '808080',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgray: 'd3d3d3',
        lightgreen: '90ee90',
        lightgrey: 'd3d3d3',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslategray: '789',
        lightslategrey: '789',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '0f0',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'f0f',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370db',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'db7093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '663399',
        red: 'f00',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        slategrey: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        wheat: 'f5deb3',
        white: 'fff',
        whitesmoke: 'f5f5f5',
        yellow: 'ff0',
        yellowgreen: '9acd32'
      };
      // Make it easy to access colors via `hexNames[hex]`
      var hexNames = tinycolor.hexNames = flip(names);
      // Utilities
      // ---------
      // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
      function flip(o) {
        var flipped = {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }
        return flipped;
      }
      // Return a valid alpha value [0,1] with all invalid values being set to 1
      function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }
        return a;
      }
      // Take input from [0, n] and return it as [0, 1]
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = '100%';
        }
        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));
        // Automatically convert percentage into number
        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }
        // Handle floating point rounding errors
        if (math.abs(n - max) < 0.000001) {
          return 1;
        }
        // Convert into [0, 1] range if it isn't already
        return n % max / parseFloat(max);
      }
      // Force a number between 0 and 1
      function clamp01(val) {
        return mathMin(1, mathMax(0, val));
      }
      // Parse a base-16 hex value into a base-10 integer
      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }
      // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
      // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
      function isOnePointZero(n) {
        return typeof n == 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1;
      }
      // Check to see if string passed in is a percentage
      function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') != -1;
      }
      // Force a hex value to have 2 characters
      function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
      }
      // Replace a decimal with it's percentage value
      function convertToPercentage(n) {
        if (n <= 1) {
          n = n * 100 + '%';
        }
        return n;
      }
      // Converts a decimal to a hex value
      function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      }
      // Converts a hex value to a decimal
      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }
      var matchers = function () {
        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = '[-\\+]?\\d+%?';
        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')';
        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
        var PERMISSIVE_MATCH4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
        return {
          rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
          rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
          hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
          hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
          hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
          hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
          hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
      }();
      // `stringInputToObject`
      // Permissive string parsing.  Take in a number of formats, and output an object
      // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
      function stringInputToObject(color) {
        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color == 'transparent') {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: 'name'
          };
        }
        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if (match = matchers.rgb.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3]
          };
        }
        if (match = matchers.rgba.exec(color)) {
          return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
          };
        }
        if (match = matchers.hsl.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3]
          };
        }
        if (match = matchers.hsla.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
          };
        }
        if (match = matchers.hsv.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3]
          };
        }
        if (match = matchers.hsva.exec(color)) {
          return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
          };
        }
        if (match = matchers.hex8.exec(color)) {
          return {
            a: convertHexToDecimal(match[1]),
            r: parseIntFromHex(match[2]),
            g: parseIntFromHex(match[3]),
            b: parseIntFromHex(match[4]),
            format: named ? 'name' : 'hex8'
          };
        }
        if (match = matchers.hex6.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex'
          };
        }
        if (match = matchers.hex3.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? 'name' : 'hex'
          };
        }
        return false;
      }
      window.tinycolor = tinycolor;
    }());
    $(function () {
      if ($.fn.spectrum.load) {
        $.fn.spectrum.processNativeColorInputs();
      }
    });
  }));
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
  (function (ColorPicker) {
    Ractive.components.colorpicker = ColorPicker;
  }  //Transitions
(rvc_colorpicker));
}(Ractive, $));
}());