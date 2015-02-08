/*global jQuery, Color, _, MAPJS, document, window*/
MAPJS.DOMRender = {
    svgPixel: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
    nodeCacheMark: function(idea, levelOverride) {
        'use strict';
        return {
            title: idea.title,
            icon: idea.attr && idea.attr.icon && _.pick(idea.attr.icon, 'width', 'height', 'position'),
            collapsed: idea.attr && idea.attr.collapsed,
            level: idea.level || levelOverride
        };
    },
    dummyTextBox: jQuery('<div>').addClass('mapjs-node').css({
        position: 'absolute',
        visibility: 'hidden'
    }),
    dimensionProvider: function(idea, level) {
        'use strict'; /* support multiple stages? */
        var textBox = jQuery(document).nodeWithId(idea.id),
            translateToPixel = function() {
                return MAPJS.DOMRender.svgPixel;
            },
            result;
        if (textBox && textBox.length > 0) {
            if (_.isEqual(textBox.data('nodeCacheMark'), MAPJS.DOMRender.nodeCacheMark(idea, level))) {
                return _.pick(textBox.data(), 'width', 'height');
            }
        }
        textBox = MAPJS.DOMRender.dummyTextBox;
        textBox.attr('mapjs-level', level).appendTo('body').updateNodeContent(idea, translateToPixel);
        result = {
            width: textBox.outerWidth(true),
            height: textBox.outerHeight(true)
        };
        textBox.detach();
        return result;
    },
    layoutCalculator: function(contentAggregate) {
        'use strict';
        return MAPJS.calculateLayout(contentAggregate, MAPJS.DOMRender.dimensionProvider);
    },
    fixedLayout: false
};
MAPJS.createSVG = function(tag) {
    'use strict';
    return jQuery(document.createElementNS('http://www.w3.org/2000/svg', tag || 'svg'));
};
jQuery.fn.getBox = function() {
    'use strict';
    var domShape = this && this[0];
    if (!domShape) {
        return false;
    }
    return {
        top: domShape.offsetTop,
        left: domShape.offsetLeft,
        width: domShape.offsetWidth,
        height: domShape.offsetHeight
    };
};
jQuery.fn.getDataBox = function() {
    'use strict';
    var domShapeData = this.data();
    if (domShapeData && domShapeData.width && domShapeData.height) {
        return {
            top: domShapeData.y,
            left: domShapeData.x,
            width: domShapeData.width,
            height: domShapeData.height
        };
    }
    return this.getBox();
};


jQuery.fn.animateConnectorToPosition = function(animationOptions, tolerance) {
    'use strict';
    var element = jQuery(this),
        shapeFrom = element.data('nodeFrom'),
        shapeTo = element.data('nodeTo'),
        fromBox = shapeFrom && shapeFrom.getDataBox(),
        toBox = shapeTo && shapeTo.getDataBox(),
        oldBox = {
            from: shapeFrom && shapeFrom.getBox(),
            to: shapeTo && shapeTo.getBox()
        };
    tolerance = tolerance || 1;
    if (fromBox && toBox && oldBox && oldBox.from.width === fromBox.width &&
        oldBox.to.width === toBox.width &&
        oldBox.from.height === fromBox.height &&
        oldBox.to.height === toBox.height &&
        Math.abs(oldBox.from.top - oldBox.to.top - (fromBox.top - toBox.top)) < tolerance &&
        Math.abs(oldBox.from.left - oldBox.to.left - (fromBox.left - toBox.left)) < tolerance) {

        element.animate({
            left: Math.round(Math.min(fromBox.left, toBox.left)),
            top: Math.round(Math.min(fromBox.top, toBox.top))
        }, animationOptions);
        return true;
    }
    return false;
};
jQuery.fn.queueFadeOut = function(options) {
    'use strict';
    var element = this;
    return element.fadeOut(_.extend({
        complete: function() {
            if (element.is(':focus')) {
                element.parents('[tabindex]').focus();
            }
            element.remove();
        }
    }, options));
};
jQuery.fn.queueFadeIn = function(options) {
    'use strict';
    var element = this;
    return element
        .css('opacity', 0)
        .animate({
                'opacity': 1
            },
            _.extend({
                complete: function() {
                    element.css('opacity', '');
                }
            }, options)
        );
};

jQuery.fn.updateStage = function() {
    'use strict';
    var data = this.data(),
        size = {
            'min-width': Math.round(data.width - data.offsetX),
            'min-height': Math.round(data.height - data.offsetY),
            'width': Math.round(data.width - data.offsetX),
            'height': Math.round(data.height - data.offsetY),
            'transform-origin': 'top left',
            'transform': 'translate3d(' + Math.round(data.offsetX) + 'px, ' + Math.round(data.offsetY) + 'px, 0)'
        };
    if (data.scale && data.scale !== 1) {
        size.transform = 'scale(' + data.scale + ') translate(' + Math.round(data.offsetX) + 'px, ' + Math.round(data.offsetY) + 'px)';
    }
    this.css(size);
    return this;
};

MAPJS.DOMRender.curvedPath = function(parent, child) {
    'use strict';
    var horizontalConnector = function(parentX, parentY, parentWidth, parentHeight,
            childX, childY, childWidth, childHeight) {
            var childHorizontalOffset = parentX < childX ? 0.1 : 0.9,
                parentHorizontalOffset = 1 - childHorizontalOffset;
            return {
                from: {
                    x: parentX + parentHorizontalOffset * parentWidth,
                    y: parentY + 0.5 * parentHeight
                },
                to: {
                    x: childX + childHorizontalOffset * childWidth,
                    y: childY + 0.5 * childHeight
                },
                controlPointOffset: 0
            };
        },
        calculateConnector = function(parent, child) {
            var tolerance = 10,
                childHorizontalOffset,
                childMid = child.top + child.height * 0.5,
                parentMid = parent.top + parent.height * 0.5;
            if (Math.abs(parentMid - childMid) + tolerance < Math.max(child.height, parent.height * 0.75)) {
                return horizontalConnector(parent.left, parent.top, parent.width, parent.height, child.left, child.top, child.width, child.height);
            }
            childHorizontalOffset = parent.left < child.left ? 0 : 1;
            return {
                from: {
                    x: parent.left + 0.5 * parent.width,
                    y: parent.top + 0.5 * parent.height
                },
                to: {
                    x: child.left + childHorizontalOffset * child.width,
                    y: child.top + 0.5 * child.height
                },
                controlPointOffset: 0.75
            };
        },
        position = {
            left: Math.min(parent.left, child.left),
            top: Math.min(parent.top, child.top)
        },
        calculatedConnector, offset, maxOffset;
    position.width = Math.max(parent.left + parent.width, child.left + child.width, position.left + 1) - position.left;
    position.height = Math.max(parent.top + parent.height, child.top + child.height, position.top + 1) - position.top;

    calculatedConnector = calculateConnector(parent, child);
    offset = calculatedConnector.controlPointOffset * (calculatedConnector.from.y - calculatedConnector.to.y);
    maxOffset = Math.min(child.height, parent.height) * 1.5;
    offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    return {
        'd': 'M' + Math.round(calculatedConnector.from.x - position.left) + ',' + Math.round(calculatedConnector.from.y - position.top) +
            'Q' + Math.round(calculatedConnector.from.x - position.left) + ',' + Math.round(calculatedConnector.to.y - offset - position.top) + ' ' + Math.round(calculatedConnector.to.x - position.left) + ',' + Math.round(calculatedConnector.to.y - position.top),
        // 'conn': calculatedConnector,
        'position': position
    };
};
MAPJS.DOMRender.straightPath = function(parent, child) {
    'use strict';
    var calculateConnector = function(parent, child) {
            var parentPoints = [{
                    x: parent.left + 0.5 * parent.width,
                    y: parent.top
                }, {
                    x: parent.left + parent.width,
                    y: parent.top + 0.5 * parent.height
                }, {
                    x: parent.left + 0.5 * parent.width,
                    y: parent.top + parent.height
                }, {
                    x: parent.left,
                    y: parent.top + 0.5 * parent.height
                }],
                childPoints = [{
                    x: child.left + 0.5 * child.width,
                    y: child.top
                }, {
                    x: child.left + child.width,
                    y: child.top + 0.5 * child.height
                }, {
                    x: child.left + 0.5 * child.width,
                    y: child.top + child.height
                }, {
                    x: child.left,
                    y: child.top + 0.5 * child.height
                }],
                i, j, min = Infinity,
                bestParent, bestChild, dx, dy, current;
            for (i = 0; i < parentPoints.length; i += 1) {
                for (j = 0; j < childPoints.length; j += 1) {
                    dx = parentPoints[i].x - childPoints[j].x;
                    dy = parentPoints[i].y - childPoints[j].y;
                    current = dx * dx + dy * dy;
                    if (current < min) {
                        bestParent = i;
                        bestChild = j;
                        min = current;
                    }
                }
            }
            return {
                from: parentPoints[bestParent],
                to: childPoints[bestChild]
            };
        },
        position = {
            left: Math.min(parent.left, child.left),
            top: Math.min(parent.top, child.top)
        },
        conn = calculateConnector(parent, child);
    position.width = Math.max(parent.left + parent.width, child.left + child.width, position.left + 1) - position.left;
    position.height = Math.max(parent.top + parent.height, child.top + child.height, position.top + 1) - position.top;

    return {
        'd': 'M' + Math.round(conn.from.x - position.left) + ',' + Math.round(conn.from.y - position.top) + 'L' + Math.round(conn.to.x - position.left) + ',' + Math.round(conn.to.y - position.top),
        'conn': conn,
        'position': position
    };
};

MAPJS.DOMRender.nodeConnectorPath = MAPJS.DOMRender.curvedPath;
MAPJS.DOMRender.linkConnectorPath = MAPJS.DOMRender.straightPath;

jQuery.fn.updateConnector = function(canUseData) {
    'use strict';
    return jQuery.each(this, function() {
        var element = jQuery(this),
            shapeFrom = element.data('nodeFrom'),
            shapeTo = element.data('nodeTo'),
            connection, pathElement, fromBox, toBox, changeCheck;
        if (!shapeFrom || !shapeTo || shapeFrom.length === 0 || shapeTo.length === 0) {
            element.hide();
            return;
        }
        if (canUseData) {
            fromBox = shapeFrom.getDataBox();
            toBox = shapeTo.getDataBox();
        } else {
            fromBox = shapeFrom.getBox();
            toBox = shapeTo.getBox();
        }
        changeCheck = {
            from: fromBox,
            to: toBox
        };
        if (_.isEqual(changeCheck, element.data('changeCheck'))) {
            return;
        }

        element.data('changeCheck', changeCheck);
        connection = MAPJS.DOMRender.nodeConnectorPath(fromBox, toBox);
        pathElement = element.find('path');
        element.css(connection.position);
        if (pathElement.length === 0) {
            pathElement = MAPJS.createSVG('path').attr('class', 'mapjs-connector').appendTo(element);
        }
        // if only the relative position changed, do not re-update the curve!!!!
        pathElement.attr('d',
            connection.d
        );
    });
};

jQuery.fn.updateLink = function() {
    'use strict';
    return jQuery.each(this, function() {
        var element = jQuery(this),
            shapeFrom = element.data('nodeFrom'),
            shapeTo = element.data('nodeTo'),
            connection,
            pathElement = element.find('path.mapjs-link'),
            hitElement = element.find('path.mapjs-link-hit'),
            arrowElement = element.find('path.mapjs-arrow'),
            n = Math.tan(Math.PI / 9),
            dashes = {
                dashed: '8, 8',
                solid: ''
            },
            attrs = _.pick(element.data(), 'lineStyle', 'arrow', 'color'),
            fromBox, toBox, changeCheck,
            a1x, a1y, a2x, a2y, len, iy, m, dx, dy;
        if (!shapeFrom || !shapeTo || shapeFrom.length === 0 || shapeTo.length === 0) {
            element.hide();
            return;
        }
        fromBox = shapeFrom.getBox();
        toBox = shapeTo.getBox();

        changeCheck = {
            from: fromBox,
            to: toBox,
            attrs: attrs
        };
        if (_.isEqual(changeCheck, element.data('changeCheck'))) {
            return;
        }

        element.data('changeCheck', changeCheck);

        connection = MAPJS.DOMRender.linkConnectorPath(fromBox, toBox);
        element.css(connection.position);

        if (pathElement.length === 0) {
            pathElement = MAPJS.createSVG('path').attr('class', 'mapjs-link').appendTo(element);
        }
        pathElement.attr({
            'd': connection.d,
            'stroke-dasharray': dashes[attrs.lineStyle]
        }).css('stroke', attrs.color);

        if (hitElement.length === 0) {
            hitElement = MAPJS.createSVG('path').attr('class', 'mapjs-link-hit').appendTo(element);
        }
        hitElement.attr({
            'd': connection.d
        });

        if (attrs.arrow) {
            if (arrowElement.length === 0) {
                arrowElement = MAPJS.createSVG('path').attr('class', 'mapjs-arrow').appendTo(element);
            }
            len = 14;
            dx = connection.conn.to.x - connection.conn.from.x;
            dy = connection.conn.to.y - connection.conn.from.y;
            if (dx === 0) {
                iy = dy < 0 ? -1 : 1;
                a1x = connection.conn.to.x + len * Math.sin(n) * iy;
                a2x = connection.conn.to.x - len * Math.sin(n) * iy;
                a1y = connection.conn.to.y - len * Math.cos(n) * iy;
                a2y = connection.conn.to.y - len * Math.cos(n) * iy;
            } else {
                m = dy / dx;
                if (connection.conn.from.x < connection.conn.to.x) {
                    len = -len;
                }
                a1x = connection.conn.to.x + (1 - m * n) * len / Math.sqrt((1 + m * m) * (1 + n * n));
                a1y = connection.conn.to.y + (m + n) * len / Math.sqrt((1 + m * m) * (1 + n * n));
                a2x = connection.conn.to.x + (1 + m * n) * len / Math.sqrt((1 + m * m) * (1 + n * n));
                a2y = connection.conn.to.y + (m - n) * len / Math.sqrt((1 + m * m) * (1 + n * n));
            }
            arrowElement.attr('d',
                    'M' + Math.round(a1x - connection.position.left) + ',' + Math.round(a1y - connection.position.top) +
                    'L' + Math.round(connection.conn.to.x - connection.position.left) + ',' + Math.round(connection.conn.to.y - connection.position.top) +
                    'L' + Math.round(a2x - connection.position.left) + ',' + Math.round(a2y - connection.position.top) +
                    'Z')
                .css('fill', attrs.color)
                .show();
        } else {
            arrowElement.hide();
        }

    });
};

jQuery.fn.addNodeCacheMark = function(idea) {
    'use strict';
    this.data('nodeCacheMark', MAPJS.DOMRender.nodeCacheMark(idea));
};

jQuery.fn.updateNodeContent = function(nodeContent, resourceTranslator) {
    'use strict';
    var MAX_URL_LENGTH = 25,
        self = jQuery(this),
        textSpan = function() {
            var span = self.find('[data-mapjs-role=title]');
            if (span.length === 0) {
                span = jQuery('<span>').attr('data-mapjs-role', 'title').appendTo(self);
            }
            return span;
        },
        applyLinkUrl = function(title) {
            var url = MAPJS.URLHelper.getLink(title),
                element = self.find('a.mapjs-hyperlink');
            if (!url) {
                element.hide();
                return;
            }
            if (element.length === 0) {
                element = jQuery('<a target="_blank" class="mapjs-hyperlink"></a>').appendTo(self);
            }
            element.attr('href', url).show();
        },
        applyLabel = function(label) {
            var element = self.find('.mapjs-label');
            if (!label && label !== 0) {
                element.hide();
                return;
            }
            if (element.length === 0) {
                element = jQuery('<span class="mapjs-label"></span>').appendTo(self);
            }
            element.text(label).show();
        },
        applyAttachment = function() {
            var attachment = nodeContent.attr && nodeContent.attr.attachment,
                element = self.find('a.mapjs-attachment');
            if (!attachment) {
                element.hide();
                return;
            }
            if (element.length === 0) {
                element = jQuery('<a href="#" class="mapjs-attachment"></a>').appendTo(self).click(function() {
                    self.trigger('attachment-click');
                });
            }
            element.show();
        },
        updateText = function(title) {
            var text = MAPJS.URLHelper.stripLink(title) ||
                (title.length < MAX_URL_LENGTH ? title : (title.substring(0, MAX_URL_LENGTH) + '...')),
                nodeTextPadding = MAPJS.DOMRender.nodeTextPadding || 11,
                element = textSpan(),
                domElement = element[0],
                height;

            element.text(text.trim());
            self.data('title', title);
            element.css({
                'max-width': '',
                'min-width': ''
            });
            if ((domElement.scrollWidth - nodeTextPadding) > domElement.offsetWidth) {
                element.css('max-width', domElement.scrollWidth + 'px');
            } else {
                height = domElement.offsetHeight;
                element.css('min-width', element.css('max-width'));
                if (domElement.offsetHeight === height) {
                    element.css('min-width', '');
                }
            }
        },
        setCollapseClass = function() {
            if (nodeContent.attr && nodeContent.attr.collapsed) {
                self.addClass('collapsed');
            } else {
                self.removeClass('collapsed');
            }
        },
        foregroundClass = function(backgroundColor) {
            /*jslint newcap:true*/
            var luminosity = Color(backgroundColor).mix(Color('#EEEEEE')).luminosity();
            if (luminosity < 0.5) {
                return 'mapjs-node-dark';
            } else if (luminosity < 0.9) {
                return 'mapjs-node-light';
            }
            return 'mapjs-node-white';
        },
        setColors = function() {
            var fromStyle = nodeContent.attr && nodeContent.attr.style && nodeContent.attr.style.background;
            if (fromStyle === 'false' || fromStyle === 'transparent') {
                fromStyle = false;
            }
            self.removeClass('mapjs-node-dark mapjs-node-white mapjs-node-light');
            if (fromStyle) {
                self.css('background-color', fromStyle);
                self.addClass(foregroundClass(fromStyle));
            } else {
                self.css('background-color', '');
            }
        },
        setIcon = function(icon) {
            var textBox = textSpan(),
                textHeight,
                textWidth,
                maxTextWidth,
                padding,
                selfProps = {
                    'min-height': '',
                    'min-width': '',
                    'background-image': '',
                    'background-repeat': '',
                    'background-size': '',
                    'background-position': ''
                },
                textProps = {
                    'margin-top': '',
                    'margin-left': ''
                };
            self.css({
                padding: ''
            });
            if (icon) {
                padding = parseInt(self.css('padding-left'), 10);
                textHeight = textBox.outerHeight();
                textWidth = textBox.outerWidth();
                maxTextWidth = parseInt(textBox.css('max-width'), 10);
                _.extend(selfProps, {
                    'background-image': 'url("' + (resourceTranslator ? resourceTranslator(icon.url) : icon.url) + '")',
                    'background-repeat': 'no-repeat',
                    'background-size': icon.width + 'px ' + icon.height + 'px',
                    'background-position': 'center center'
                });
                if (icon.position === 'top' || icon.position === 'bottom') {
                    if (icon.position === 'top') {
                        selfProps['background-position'] = 'center ' + padding + 'px';
                    } else if (MAPJS.DOMRender.fixedLayout) {
                        selfProps['background-position'] = 'center ' + (padding + textHeight) + 'px';
                    } else {
                        selfProps['background-position'] = 'center ' + icon.position + ' ' + padding + 'px';
                    }

                    selfProps['padding-' + icon.position] = icon.height + (padding * 2);
                    selfProps['min-width'] = icon.width;
                    if (icon.width > maxTextWidth) {
                        textProps['margin-left'] = (icon.width - maxTextWidth) / 2;
                    }
                } else if (icon.position === 'left' || icon.position === 'right') {
                    if (icon.position === 'left') {
                        selfProps['background-position'] = padding + 'px center';
                    } else if (MAPJS.DOMRender.fixedLayout) {
                        selfProps['background-position'] = (textWidth + (2 * padding)) + 'px center ';
                    } else {
                        selfProps['background-position'] = icon.position + ' ' + padding + 'px center';
                    }

                    selfProps['padding-' + icon.position] = icon.width + (padding * 2);
                    if (icon.height > textHeight) {
                        textProps['margin-top'] = (icon.height - textHeight) / 2;
                        selfProps['min-height'] = icon.height;
                    }
                } else {
                    if (icon.height > textHeight) {
                        textProps['margin-top'] = (icon.height - textHeight) / 2;
                        selfProps['min-height'] = icon.height;
                    }
                    selfProps['min-width'] = icon.width;
                    if (icon.width > maxTextWidth) {
                        textProps['margin-left'] = (icon.width - maxTextWidth) / 2;
                    }
                }
            }
            self.css(selfProps);
            textBox.css(textProps);
        };
    self.attr('mapjs-level', nodeContent.level);
    updateText(nodeContent.title);
    applyLinkUrl(nodeContent.title);
    applyLabel(nodeContent.label);
    applyAttachment();
    self.data({
            'x': Math.round(nodeContent.x),
            'y': Math.round(nodeContent.y),
            'width': Math.round(nodeContent.width),
            'height': Math.round(nodeContent.height),
            'nodeId': nodeContent.id
        })
        .addNodeCacheMark(nodeContent);
    setColors();
    setIcon(nodeContent.attr && nodeContent.attr.icon);
    setCollapseClass();
    return self;
};
jQuery.fn.placeCaretAtEnd = function() {
    'use strict';
    var el = this[0],
        range, sel, textRange;
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
};
jQuery.fn.selectAll = function() {
    'use strict';
    var el = this[0],
        range, sel, textRange;
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.selectNodeContents(el);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
};
jQuery.fn.innerText = function() {
    'use strict';
    var htmlContent = this.html(),
        containsBr = /<br\/?>/.test(htmlContent);
    if (!containsBr) {
        return this.text();
    }
    return htmlContent.replace(/<br\/?>/gi, '\n').replace(/(<([^>]+)>)/gi, '');
};
jQuery.fn.editNode = function(shouldSelectAll) {
    'use strict';
    var node = this,
        textBox = this.find('[data-mapjs-role=title]'),
        unformattedText = this.data('title'),
        originalText = textBox.text(),
        result = jQuery.Deferred(),
        clear = function() {
            detachListeners();
            textBox.css('word-break', '');
            textBox.removeAttr('contenteditable');
            node.shadowDraggable();
        },
        finishEditing = function() {
            var content = textBox.innerText();
            if (content === unformattedText) {
                return cancelEditing();
            }
            clear();
            result.resolve(content);
        },
        cancelEditing = function() {
            clear();
            textBox.text(originalText);
            result.reject();
        },
        keyboardEvents = function(e) {
            var ENTER_KEY_CODE = 13,
                ESC_KEY_CODE = 27,
                TAB_KEY_CODE = 9,
                S_KEY_CODE = 83,
                Z_KEY_CODE = 90;
            if (e.shiftKey && e.which === ENTER_KEY_CODE) {
                return; // allow shift+enter to break lines
            } else if (e.which === ENTER_KEY_CODE) {
                finishEditing();
                e.stopPropagation();
            } else if (e.which === ESC_KEY_CODE) {
                cancelEditing();
                e.stopPropagation();
            } else if (e.which === TAB_KEY_CODE || (e.which === S_KEY_CODE && (e.metaKey || e.ctrlKey) && !e.altKey)) {
                finishEditing();
                e.preventDefault(); /* stop focus on another object */
            } else if (!e.shiftKey && e.which === Z_KEY_CODE && (e.metaKey || e.ctrlKey) && !e.altKey) { /* undo node edit on ctrl+z if text was not changed */
                if (textBox.text() === unformattedText) {
                    cancelEditing();
                }
                e.stopPropagation();
            }
        },
        attachListeners = function() {
            textBox.on('blur', finishEditing).on('keydown', keyboardEvents);
        },
        detachListeners = function() {
            textBox.off('blur', finishEditing).off('keydown', keyboardEvents);
        };
    attachListeners();
    if (unformattedText !== originalText) { /* links or some other potential formatting issues */
        textBox.css('word-break', 'break-all');
    }
    textBox.text(unformattedText).attr('contenteditable', true).focus();
    if (shouldSelectAll) {
        textBox.selectAll();
    } else if (unformattedText) {
        textBox.placeCaretAtEnd();
    }
    node.shadowDraggable({
        disable: true
    });
    return result.promise();
};
jQuery.fn.updateReorderBounds = function(border, box) {
    'use strict';
    var element = this;
    if (!border) {
        element.hide();
        return;
    }
    element.show();
    element.attr('mapjs-edge', border.edge);
    element.css({
        top: box.y + box.height / 2 - element.height() / 2,
        left: border.x - (border.edge === 'left' ? element.width() : 0)
    });

};

(function() {
    'use strict';
    var cleanDOMId = function(s) {
            return s.replace(/\./g, '_');
        },
        connectorKey = function(connectorObj) {
            return cleanDOMId('connector_' + connectorObj.from + '_' + connectorObj.to);
        },
        linkKey = function(linkObj) {
            return cleanDOMId('link_' + linkObj.ideaIdFrom + '_' + linkObj.ideaIdTo);
        },
        nodeKey = function(id) {
            return cleanDOMId('node_' + id);
        };

    jQuery.fn.createNode = function(node) {
        return jQuery('<div>')
            .attr({
                'id': nodeKey(node.id),
                'tabindex': 0,
                'data-mapjs-role': 'node'
            })
            .css({
                display: 'block',
                position: 'absolute'
            })
            .addClass('mapjs-node')
            .appendTo(this);
    };
    jQuery.fn.createConnector = function(connector) {
        return MAPJS.createSVG()
            .attr({
                'id': connectorKey(connector),
                'data-mapjs-role': 'connector',
                'class': 'mapjs-draw-container'
            })
            .data({
                'nodeFrom': this.nodeWithId(connector.from),
                'nodeTo': this.nodeWithId(connector.to)
            })
            .appendTo(this);
    };
    jQuery.fn.createLink = function(l) {
        var defaults = _.extend({
            color: 'red',
            lineStyle: 'dashed'
        }, l.attr && l.attr.style);
        return MAPJS.createSVG()
            .attr({
                'id': linkKey(l),
                'data-mapjs-role': 'link',
                'class': 'mapjs-draw-container'
            })
            .data({
                'nodeFrom': this.nodeWithId(l.ideaIdFrom),
                'nodeTo': this.nodeWithId(l.ideaIdTo)
            })
            .data(defaults)
            .appendTo(this);
    };
    jQuery.fn.nodeWithId = function(id) {
        return this.find('#' + nodeKey(id));
    };
    jQuery.fn.findConnector = function(connectorObj) {
        return this.find('#' + connectorKey(connectorObj));
    };
    jQuery.fn.findLink = function(linkObj) {
        return this.find('#' + linkKey(linkObj));
    };
    jQuery.fn.createReorderBounds = function() {
        var result = jQuery('<div>').attr({
            'data-mapjs-role': 'reorder-bounds',
            'class': 'mapjs-reorder-bounds'
        }).hide().css('position', 'absolute').appendTo(this);
        return result;
    };
})();

MAPJS.DOMRender.viewController = function(mapModel, stageElement, touchEnabled, imageInsertController, resourceTranslator, options) {
    'use strict';
    var viewPort = stageElement.parent(),
        connectorsForAnimation = jQuery(),
        linksForAnimation = jQuery(),
        nodeAnimOptions = {
            duration: 400,
            queue: 'nodeQueue',
            easing: 'linear'
        },
        reorderBounds = mapModel.isEditingEnabled() ? stageElement.createReorderBounds() : jQuery('<div>'),
        getViewPortDimensions = function() {
            if (viewPortDimensions) {
                return viewPortDimensions;
            }
            viewPortDimensions = {
                left: viewPort.scrollLeft(),
                top: viewPort.scrollTop(),
                innerWidth: viewPort.innerWidth(),
                innerHeight: viewPort.innerHeight()
            };
            return viewPortDimensions;
        },
        stageToViewCoordinates = function(x, y) {
            var stage = stageElement.data(),
                scrollPosition = getViewPortDimensions();
            return {
                x: stage.scale * (x + stage.offsetX) - scrollPosition.left,
                y: stage.scale * (y + stage.offsetY) - scrollPosition.top
            };
        },
        viewToStageCoordinates = function(x, y) {
            var stage = stageElement.data(),
                scrollPosition = getViewPortDimensions();
            return {
                x: (scrollPosition.left + x) / stage.scale - stage.offsetX,
                y: (scrollPosition.top + y) / stage.scale - stage.offsetY
            };
        },
        updateScreenCoordinates = function() {
            var element = jQuery(this);
            element.css({
                'left': element.data('x'),
                'top': element.data('y')
            }).trigger('mapjs:move');
        },
        animateToPositionCoordinates = function() {
            var element = jQuery(this);
            element.clearQueue(nodeAnimOptions.queue).animate({
                'left': element.data('x'),
                'top': element.data('y'),
                'opacity': 1 /* previous animation can be cancelled with clearqueue, so ensure it gets visible */
            }, _.extend({
                complete: function() {
                    element.css('opacity', '');
                    element.each(updateScreenCoordinates);
                }
            }, nodeAnimOptions)).trigger('mapjs:animatemove');
        },
        ensureSpaceForPoint = function(x, y) { /* in stage coordinates */
            var stage = stageElement.data(),
                dirty = false;
            if (x < -1 * stage.offsetX) {
                stage.width = stage.width - stage.offsetX - x;
                stage.offsetX = -1 * x;
                dirty = true;
            }
            if (y < -1 * stage.offsetY) {
                stage.height = stage.height - stage.offsetY - y;
                stage.offsetY = -1 * y;
                dirty = true;
            }
            if (x > stage.width - stage.offsetX) {
                stage.width = stage.offsetX + x;
                dirty = true;
            }
            if (y > stage.height - stage.offsetY) {
                stage.height = stage.offsetY + y;
                dirty = true;
            }
            if (dirty) {
                stageElement.updateStage();
            }
        },
        ensureSpaceForNode = function() {
            return jQuery(this).each(function() {
                var node = jQuery(this).data(),
                    margin = MAPJS.DOMRender.stageMargin || {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    };
                /* sequence of calculations is important because maxX and maxY take into consideration the new offsetX snd offsetY */
                ensureSpaceForPoint(node.x - margin.left, node.y - margin.top);
                ensureSpaceForPoint(node.x + node.width + margin.right, node.y + node.height + margin.bottom);
            });
        },
        centerViewOn = function(x, y, animate) { /*in the stage coordinate system*/
            var stage = stageElement.data(),
                viewPortCenter = {
                    x: viewPort.innerWidth() / 2,
                    y: viewPort.innerHeight() / 2
                },
                newLeftScroll, newTopScroll,
                margin = MAPJS.DOMRender.stageVisibilityMargin || {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                };
            ensureSpaceForPoint(x - viewPortCenter.x / stage.scale, y - viewPortCenter.y / stage.scale);
            ensureSpaceForPoint(x + viewPortCenter.x / stage.scale - margin.left, y + viewPortCenter.y / stage.scale - margin.top);

            newLeftScroll = stage.scale * (x + stage.offsetX) - viewPortCenter.x;
            newTopScroll = stage.scale * (y + stage.offsetY) - viewPortCenter.y;
            viewPort.finish();
            if (animate) {
                viewPort.animate({
                    scrollLeft: newLeftScroll,
                    scrollTop: newTopScroll
                }, {
                    duration: 400
                });
            } else {
                viewPort.scrollLeft(newLeftScroll);
                viewPort.scrollTop(newTopScroll);
            }
        },
        stagePointAtViewportCenter = function() {
            return viewToStageCoordinates(viewPort.innerWidth() / 2, viewPort.innerHeight() / 2);
        },
        ensureNodeVisible = function(domElement) {
            if (!domElement || domElement.length === 0) {
                return;
            }
            viewPort.finish();
            var node = domElement.data(),
                nodeTopLeft = stageToViewCoordinates(node.x, node.y),
                nodeBottomRight = stageToViewCoordinates(node.x + node.width, node.y + node.height),
                animation = {},
                margin = MAPJS.DOMRender.stageVisibilityMargin || {
                    top: 10,
                    left: 10,
                    bottom: 10,
                    right: 10
                };
            if ((nodeTopLeft.x - margin.left) < 0) {
                animation.scrollLeft = viewPort.scrollLeft() + nodeTopLeft.x - margin.left;
            } else if ((nodeBottomRight.x + margin.right) > viewPort.innerWidth()) {
                animation.scrollLeft = viewPort.scrollLeft() + nodeBottomRight.x - viewPort.innerWidth() + margin.right;
            }
            if ((nodeTopLeft.y - margin.top) < 0) {
                animation.scrollTop = viewPort.scrollTop() + nodeTopLeft.y - margin.top;
            } else if ((nodeBottomRight.y + margin.bottom) > viewPort.innerHeight()) {
                animation.scrollTop = viewPort.scrollTop() + nodeBottomRight.y - viewPort.innerHeight() + margin.bottom;
            }
            if (!_.isEmpty(animation)) {
                viewPort.animate(animation, {
                    duration: 100
                });
            }
        },
        viewportCoordinatesForPointEvent = function(evt) {
            var dropPosition = (evt && evt.gesture && evt.gesture.center) || evt,
                vpOffset = viewPort.offset(),
                result;
            if (dropPosition) {
                result = {
                    x: dropPosition.pageX - vpOffset.left,
                    y: dropPosition.pageY - vpOffset.top
                };
                if (result.x >= 0 && result.x <= viewPort.innerWidth() && result.y >= 0 && result.y <= viewPort.innerHeight()) {
                    return result;
                }
            }
        },
        stagePositionForPointEvent = function(evt) {
            var viewportDropCoordinates = viewportCoordinatesForPointEvent(evt);
            if (viewportDropCoordinates) {
                return viewToStageCoordinates(viewportDropCoordinates.x, viewportDropCoordinates.y);
            }
        },
        clearCurrentDroppable = function() {
            if (currentDroppable || currentDroppable === false) {
                jQuery('.mapjs-node').removeClass('droppable');
                currentDroppable = undefined;
            }
        },
        showDroppable = function(nodeId) {
            stageElement.nodeWithId(nodeId).addClass('droppable');
            currentDroppable = nodeId;
        },
        currentDroppable = false,
        viewPortDimensions,
        withinReorderBoundary = function(boundaries, box) {
            if (_.isEmpty(boundaries)) {
                return false;
            }
            if (!box) {
                return false;
            }
            var closeTo = function(reorderBoundary) {
                var nodeX = box.x;
                if (reorderBoundary.edge === 'right') {
                    nodeX += box.width;
                }
                return Math.abs(nodeX - reorderBoundary.x) < reorderBoundary.margin * 2 &&
                    box.y < reorderBoundary.maxY &&
                    box.y > reorderBoundary.minY;
            };
            return _.find(boundaries, closeTo);
        };


    viewPort.on('scroll', function() {
        viewPortDimensions = undefined;
    });
    if (imageInsertController) {
        imageInsertController.addEventListener('imageInserted', function(dataUrl, imgWidth, imgHeight, evt) {
            var point = stagePositionForPointEvent(evt);
            mapModel.dropImage(dataUrl, imgWidth, imgHeight, point && point.x, point && point.y);
        });
    }
    mapModel.addEventListener('nodeCreated', function(node) {
        var currentReorderBoundary,
            element = stageElement.createNode(node)
            .queueFadeIn(nodeAnimOptions)
            .updateNodeContent(node, resourceTranslator)
            .on('tap', function(evt) {

                var realEvent = (evt.gesture && evt.gesture.srcEvent) || evt;
                if (realEvent.button && realEvent.button !== -1) {
                    return;
                }
                mapModel.clickNode(node.id, realEvent);
                if (evt) {
                    evt.stopPropagation();
                }
                if (evt && evt.gesture) {
                    evt.gesture.stopPropagation();
                }

            })
            .on('doubletap', function(event) {
                if (event) {
                    event.stopPropagation();
                    if (event.gesture) {
                        event.gesture.stopPropagation();
                    }
                }
                if (!mapModel.isEditingEnabled()) {
                    mapModel.toggleCollapse('mouse');
                    return;
                }
                mapModel.editNode('mouse');
            })
            .on('attachment-click', function() {
                mapModel.openAttachment('mouse', node.id);
            })
            .each(ensureSpaceForNode)
            .each(updateScreenCoordinates)
            .on('mm:start-dragging mm:start-dragging-shadow', function() {
                mapModel.selectNode(node.id);
                currentReorderBoundary = mapModel.getReorderBoundary(node.id);
                element.addClass('dragging');
            })
            .on('mm:drag', function(evt) {
                var dropCoords = stagePositionForPointEvent(evt),
                    currentPosition = evt.currentPosition && stagePositionForPointEvent({
                        pageX: evt.currentPosition.left,
                        pageY: evt.currentPosition.top
                    }),
                    nodeId,
                    hasShift = evt && evt.gesture && evt.gesture.srcEvent && evt.gesture.srcEvent.shiftKey,
                    border;
                if (!dropCoords) {
                    clearCurrentDroppable();
                    return;
                }

                nodeId = mapModel.getNodeIdAtPosition(dropCoords.x, dropCoords.y);
                if (!hasShift && !nodeId && currentPosition) {
                    currentPosition.width = element.outerWidth();
                    currentPosition.height = element.outerHeight();
                    border = withinReorderBoundary(currentReorderBoundary, currentPosition);
                    reorderBounds.updateReorderBounds(border, currentPosition);
                } else {
                    reorderBounds.hide();
                }
                if (!nodeId || nodeId === node.id) {
                    clearCurrentDroppable();
                } else if (nodeId !== currentDroppable) {
                    clearCurrentDroppable();
                    if (nodeId) {
                        showDroppable(nodeId);
                    }
                }
            })
            .on('contextmenu', function(event) {
                mapModel.selectNode(node.id);
                if (mapModel.requestContextMenu(event.pageX, event.pageY)) {
                    event.preventDefault();
                    return false;
                }
            })
            .on('mm:stop-dragging', function(evt) {
                element.removeClass('dragging');
                reorderBounds.hide();
                var isShift = evt && evt.gesture && evt.gesture.srcEvent && evt.gesture.srcEvent.shiftKey,
                    stageDropCoordinates = stagePositionForPointEvent(evt),
                    nodeAtDrop, finalPosition, dropResult, manualPosition, vpCenter;
                clearCurrentDroppable();
                if (!stageDropCoordinates) {
                    return;
                }
                nodeAtDrop = mapModel.getNodeIdAtPosition(stageDropCoordinates.x, stageDropCoordinates.y);
                finalPosition = stagePositionForPointEvent({
                    pageX: evt.finalPosition.left,
                    pageY: evt.finalPosition.top
                });
                if (nodeAtDrop && nodeAtDrop !== node.id) {
                    dropResult = mapModel.dropNode(node.id, nodeAtDrop, !!isShift);
                } else if (node.level > 1) {
                    finalPosition.width = element.outerWidth();
                    finalPosition.height = element.outerHeight();
                    manualPosition = (!!isShift) || !withinReorderBoundary(currentReorderBoundary, finalPosition);
                    dropResult = mapModel.positionNodeAt(node.id, finalPosition.x, finalPosition.y, manualPosition);
                } else if (node.level === 1 && evt.gesture) {
                    vpCenter = stagePointAtViewportCenter();
                    vpCenter.x -= evt.gesture.deltaX || 0;
                    vpCenter.y -= evt.gesture.deltaY || 0;
                    centerViewOn(vpCenter.x, vpCenter.y, true);
                    dropResult = true;
                } else {
                    dropResult = false;
                }
                return dropResult;
            })
            .on('mm:cancel-dragging', function() {
                clearCurrentDroppable();
                element.removeClass('dragging');
                reorderBounds.hide();
            });
        if (touchEnabled) {
            element.on('hold', function(evt) {
                var realEvent = (evt.gesture && evt.gesture.srcEvent) || evt;
                mapModel.clickNode(node.id, realEvent);
                if (mapModel.requestContextMenu(evt.gesture.center.pageX, evt.gesture.center.pageY)) {
                    evt.preventDefault();
                    if (evt.gesture) {
                        evt.gesture.preventDefault();
                        evt.gesture.stopPropagation();
                    }
                    return false;
                }
            });
        }
        element.css('min-width', element.css('width'));
        if (mapModel.isEditingEnabled()) {
            element.shadowDraggable();
        }
    });
    mapModel.addEventListener('nodeSelectionChanged', function(ideaId, isSelected) {
        var node = stageElement.nodeWithId(ideaId);
        if (isSelected) {
            node.addClass('selected');
            ensureNodeVisible(node);
        } else {
            node.removeClass('selected');
        }
    });
    mapModel.addEventListener('nodeRemoved', function(node) {
        stageElement.nodeWithId(node.id).queueFadeOut(nodeAnimOptions);
    });
    mapModel.addEventListener('nodeMoved', function(node /*, reason*/ ) {
        var currentViewPortDimensions = getViewPortDimensions(),
            nodeDom = stageElement.nodeWithId(node.id).data({
                'x': Math.round(node.x),
                'y': Math.round(node.y)
            }).each(ensureSpaceForNode),
            screenTopLeft = stageToViewCoordinates(Math.round(node.x), Math.round(node.y)),
            screenBottomRight = stageToViewCoordinates(Math.round(node.x + node.width), Math.round(node.y + node.height));
        if (screenBottomRight.x < 0 || screenBottomRight.y < 0 || screenTopLeft.x > currentViewPortDimensions.innerWidth || screenTopLeft.y > currentViewPortDimensions.innerHeight) {
            nodeDom.each(updateScreenCoordinates);
        } else {
            nodeDom.each(animateToPositionCoordinates);
        }
    });
    mapModel.addEventListener('nodeTitleChanged nodeAttrChanged nodeLabelChanged', function(n) {
        stageElement.nodeWithId(n.id).updateNodeContent(n, resourceTranslator);
    });
    mapModel.addEventListener('connectorCreated', function(connector) {
        var element = stageElement.createConnector(connector).queueFadeIn(nodeAnimOptions).updateConnector(true);
        stageElement.nodeWithId(connector.from).add(stageElement.nodeWithId(connector.to))
            .on('mapjs:move', function() {
                element.updateConnector(true);
            })
            .on('mm:drag', function() {
                element.updateConnector();
            })
            .on('mapjs:animatemove', function() {
                connectorsForAnimation = connectorsForAnimation.add(element);
            });
    });
    mapModel.addEventListener('connectorRemoved', function(connector) {
        stageElement.findConnector(connector).queueFadeOut(nodeAnimOptions);
    });
    mapModel.addEventListener('linkCreated', function(l) {
        var link = stageElement.createLink(l).queueFadeIn(nodeAnimOptions).updateLink();
        link.find('.mapjs-link-hit').on('tap', function(event) {
            mapModel.selectLink('mouse', l, {
                x: event.gesture.center.pageX,
                y: event.gesture.center.pageY
            });
            event.stopPropagation();
            event.gesture.stopPropagation();
        });
        stageElement.nodeWithId(l.ideaIdFrom).add(stageElement.nodeWithId(l.ideaIdTo))
            .on('mapjs:move mm:drag', function() {
                link.updateLink();
            })
            .on('mapjs:animatemove', function() {
                linksForAnimation = linksForAnimation.add(link);
            });

    });
    mapModel.addEventListener('linkRemoved', function(l) {
        stageElement.findLink(l).queueFadeOut(nodeAnimOptions);
    });
    mapModel.addEventListener('mapScaleChanged', function(scaleMultiplier /*, zoomPoint */ ) {
        var currentScale = stageElement.data('scale'),
            targetScale = Math.max(Math.min(currentScale * scaleMultiplier, 5), 0.2),
            currentCenter = stagePointAtViewportCenter();
        if (currentScale === targetScale) {
            return;
        }
        stageElement.data('scale', targetScale).updateStage();
        centerViewOn(currentCenter.x, currentCenter.y);
    });
    mapModel.addEventListener('nodeVisibilityRequested', function(ideaId) {
        var id = ideaId || mapModel.getCurrentlySelectedIdeaId(),
            node = stageElement.nodeWithId(id);
        if (node) {
            ensureNodeVisible(node);
            viewPort.finish();
        }

    });
    mapModel.addEventListener('nodeFocusRequested', function(ideaId) {
        var node = stageElement.nodeWithId(ideaId).data(),
            nodeCenterX = node.x + node.width / 2,
            nodeCenterY = node.y + node.height / 2;
        if (stageElement.data('scale') !== 1) {
            stageElement.data('scale', 1).updateStage();
        }
        centerViewOn(nodeCenterX, nodeCenterY, true);
    });
    mapModel.addEventListener('mapViewResetRequested', function() {
        stageElement.data({
            'scale': 1,
            'height': 0,
            'width': 0,
            'offsetX': 0,
            'offsetY': 0
        }).updateStage();
        stageElement.children().andSelf().finish(nodeAnimOptions.queue);
        jQuery(stageElement).find('.mapjs-node').each(ensureSpaceForNode);
        jQuery(stageElement).find('[data-mapjs-role=connector]').updateConnector(true);
        jQuery(stageElement).find('[data-mapjs-role=link]').updateLink();
        centerViewOn(0, 0);
        viewPort.focus();
    });
    mapModel.addEventListener('layoutChangeStarting', function() {
        viewPortDimensions = undefined;
        stageElement.children().finish(nodeAnimOptions.queue);
        stageElement.finish(nodeAnimOptions.queue);
    });
    mapModel.addEventListener('layoutChangeComplete', function() {
        var connectorGroupClone = jQuery(),
            linkGroupClone = jQuery();

        connectorsForAnimation.each(function() {
            if (!jQuery(this).animateConnectorToPosition(nodeAnimOptions, 2)) {
                connectorGroupClone = connectorGroupClone.add(this);
            }
        });
        linksForAnimation.each(function() {
            if (!jQuery(this).animateConnectorToPosition(nodeAnimOptions, 2)) {
                linkGroupClone = linkGroupClone.add(this);
            }
        });
        connectorsForAnimation = jQuery();
        linksForAnimation = jQuery();
        stageElement.animate({
            'opacity': 1
        }, _.extend({
            progress: function() {
                connectorGroupClone.updateConnector();
                linkGroupClone.updateLink();
            }
        }, nodeAnimOptions));
        ensureNodeVisible(stageElement.nodeWithId(mapModel.getCurrentlySelectedIdeaId()));
        stageElement.children().dequeue(nodeAnimOptions.queue);
        stageElement.dequeue(nodeAnimOptions.queue);
    });

    /* editing */
    if (!options || !options.inlineEditingDisabled) {
        mapModel.addEventListener('nodeEditRequested', function(nodeId, shouldSelectAll, editingNew) {
            var editingElement = stageElement.nodeWithId(nodeId);
            mapModel.setInputEnabled(false);
            viewPort.finish(); /* close any pending animations */
            editingElement.editNode(shouldSelectAll).done(
                function(newText) {
                    mapModel.setInputEnabled(true);
                    mapModel.updateTitle(nodeId, newText, editingNew);
                    editingElement.focus();

                }).fail(function() {
                mapModel.setInputEnabled(true);
                if (editingNew) {
                    mapModel.undo('internal');
                }
                editingElement.focus();
            });
        });
    }
    mapModel.addEventListener('addLinkModeToggled', function(isOn) {
        if (isOn) {
            stageElement.addClass('mapjs-add-link');
        } else {
            stageElement.removeClass('mapjs-add-link');
        }
    });
    mapModel.addEventListener('linkAttrChanged', function(l) {
        var attr = _.extend({
            arrow: false
        }, l.attr && l.attr.style);
        stageElement.findLink(l).data(attr).updateLink();
    });

    mapModel.addEventListener('activatedNodesChanged', function(activatedNodes, deactivatedNodes) {
        _.each(activatedNodes, function(nodeId) {
            stageElement.nodeWithId(nodeId).addClass('activated');
        });
        _.each(deactivatedNodes, function(nodeId) {
            stageElement.nodeWithId(nodeId).removeClass('activated');
        });
    });
};
