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

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive' ], factory );
	}

	// browser global
	else if ( global.Ractive ) {
		factory( global.Ractive );
	}

	else {
		throw new Error( 'Could not find Ractive! It must be loaded before the ractive-transitions-typewriter plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive ) {

	'use strict';

	var typewriter, typewriteNode, typewriteTextNode, props, defaults;

	typewriteNode = function ( node, isIntro, complete, interval ) {
		var children, next, method;

		if ( node.nodeType === 1 && isIntro ) {
			node.style.display = node._display;
			node.style.width = node._width;
			node.style.height = node._height;
		}

		if ( node.nodeType === 3 ) {
			typewriteTextNode( node, isIntro, complete, interval );
			return;
		}

		children = Array.prototype.slice.call( node.childNodes );
		method = isIntro ? 'shift' : 'pop';

		next = function () {
			if ( !children.length ) {
				if ( node.nodeType === 1 && isIntro ) {
					if ( node._style ) {
						node.setAttribute( 'style', node._style );
					} else {
						node.getAttribute( 'style' );
						node.removeAttribute( 'style' );
					}
				}

				complete();
				return;
			}

			typewriteNode( children[ method ](), isIntro, next, interval );
		};

		next();
	};

	typewriteTextNode = function ( node, isIntro, complete, interval ) {
		var str, len, loop, i, d, targetLen;

		// text node
		str = isIntro ? node._hiddenData : '' + node.data;
		len = str.length;

		if ( !len ) {
			complete();
			return;
		}

		i = isIntro ? 0 : len;
		d = isIntro ? 1 : -1;
		targetLen = isIntro ? len : 0;

		loop = setInterval( function () {
			var substr, remaining, match, remainingNonWhitespace, filler;

			substr = str.substr( 0, i );
			remaining = str.substring( i );

			match = /^\w+/.exec( remaining );
			remainingNonWhitespace = ( match ? match[0].length : 0 );

			// add some non-breaking whitespace corresponding to the remaining length of the
			// current word (only really works with monospace fonts, but better than nothing)
			filler = new Array( remainingNonWhitespace + 1 ).join( '\u00a0' );

			node.data = substr + filler;
			if ( i === targetLen ) {
				clearInterval( loop );
				delete node._hiddenData;
				complete();
			}

			i += d;
		}, interval );
	};

	props = [
		'width',
		'height',
		'visibility'
	];

	defaults = {

	};

	// TODO differentiate between intro and outro
	typewriter = function ( t, params ) {
		var interval, currentStyle, hide;

		params = t.processParams( params, defaults );

		// Find the interval between each character. Default
		// to 4 milliseconds
		interval = params.interval || (
			params.speed ? 1000 / params.speed :
				( params.duration ? t.node.textContent.length / params.duration :
					4
				)
			);

		currentStyle = t.getStyle( props );

		hide = function ( node ) {
			var children, i, computedStyle;

			if ( node.nodeType === 1 ) {
				node._style = node.getAttribute( 'style' );
				computedStyle = window.getComputedStyle( node );
				node._display = computedStyle.display;
				node._width = computedStyle.width;
				node._height = computedStyle.height;
			}

			if ( node.nodeType === 3 ) {
				node._hiddenData = '' + node.data;
				node.data = '';

				return;
			}

			children = Array.prototype.slice.call( node.childNodes );
			i = children.length;
			while ( i-- ) {
				hide( children[i] );
			}

			node.style.display = 'none';
		};

		if ( t.isIntro ) {
			hide( t.node );
		}

		setTimeout( function () {
			// make style explicit...
			t.setStyle( currentStyle );

			typewriteNode( t.node, t.isIntro, t.complete, interval );
		}, params.delay || 0 );
	};

	Ractive.transitions.typewriter = typewriter;

}));
