/*

	rvc.js - v0.2.3 - 2014-08-02
	==========================================================

	https://github.com/ractivejs/rvc
	MIT licensed.

*/

define( [ 'ractive' ], function( Ractive ) {

	'use strict';

	var loader = function() {
		// precompiled can be true indicating all resources have been compiled
		// or it can be an array of paths prefixes which are precompiled
		var precompiled;
		var loader = function( pluginId, ext, allowExts, compile ) {
			if ( arguments.length == 3 ) {
				compile = allowExts;
				allowExts = undefined;
			} else if ( arguments.length == 2 ) {
				compile = ext;
				ext = allowExts = undefined;
			}
			return {
				buildCache: {},
				load: function( name, req, load, config ) {
					var path = req.toUrl( name );
					var queryString = '';
					if ( path.indexOf( '?' ) != -1 ) {
						queryString = path.substr( path.indexOf( '?' ) );
						path = path.substr( 0, path.length - queryString.length );
					}
					// precompiled -> load from .ext.js extension
					if ( config.precompiled instanceof Array ) {
						for ( var i = 0; i < config.precompiled.length; i++ )
							if ( path.substr( 0, config.precompiled[ i ].length ) == config.precompiled[ i ] )
								return require( [ path + '.' + pluginId + '.js' + queryString ], load, load.error );
					} else if ( config.precompiled === true )
						return require( [ path + '.' + pluginId + '.js' + queryString ], load, load.error );
					// only add extension if a moduleID not a path
					if ( ext && name.substr( 0, 1 ) != '/' && !name.match( /:\/\// ) ) {
						var validExt = false;
						if ( allowExts ) {
							for ( var i = 0; i < allowExts.length; i++ ) {
								if ( name.substr( name.length - allowExts[ i ].length - 1 ) == '.' + allowExts[ i ] )
									validExt = true;
							}
						}
						if ( !validExt )
							path += '.' + ext + queryString;
						else
							path += queryString;
					} else {
						path += queryString;
					}
					var self = this;
					loader.fetch( path, function( source ) {
						compile( name, source, req, function( compiled ) {
							if ( typeof compiled == 'string' ) {
								if ( config.isBuild )
									self.buildCache[ name ] = compiled;
								load.fromText( compiled );
							} else
								load( compiled );
						}, load.error, config );
					}, load.error );
				},
				write: function( pluginName, moduleName, write ) {
					var compiled = this.buildCache[ moduleName ];
					if ( compiled )
						write.asModule( pluginName + '!' + moduleName, compiled );
				},
				writeFile: function( pluginName, name, req, write ) {
					write.asModule( pluginName + '!' + name, req.toUrl( name + '.' + pluginId + '.js' ), this.buildCache[ name ] );
				}
			};
		};
		//loader.load = function(name, req, load, config) {
		//  load(loader);
		//}
		if ( typeof window != 'undefined' ) {
			var progIds = [
				'Msxml2.XMLHTTP',
				'Microsoft.XMLHTTP',
				'Msxml2.XMLHTTP.4.0'
			];
			var getXhr = function( path ) {
				// check if same domain
				var sameDomain = true,
					domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec( path );
				if ( typeof window != 'undefined' && domainCheck ) {
					sameDomain = domainCheck[ 2 ] === window.location.host;
					if ( domainCheck[ 1 ] )
						sameDomain &= domainCheck[ 1 ] === window.location.protocol;
				}
				// create xhr
				var xhr;
				if ( typeof XMLHttpRequest !== 'undefined' )
					xhr = new XMLHttpRequest();
				else {
					var progId;
					for ( var i = 0; i < 3; i += 1 ) {
						progId = progIds[ i ];
						try {
							xhr = new ActiveXObject( progId );
						} catch ( e ) {}
						if ( xhr ) {
							progIds = [ progId ];
							// so faster next time
							break;
						}
					}
				}
				// use cors if necessary
				if ( !sameDomain ) {
					if ( typeof XDomainRequest != 'undefined' )
						xhr = new XDomainRequest();
					else if ( !( 'withCredentials' in xhr ) )
						throw new Error( 'getXhr(): Cross Origin XHR not supported.' );
				}
				if ( !xhr )
					throw new Error( 'getXhr(): XMLHttpRequest not available' );
				return xhr;
			};
			loader.fetch = function( url, callback, errback ) {
				// get the xhr with CORS enabled if cross domain
				var xhr = getXhr( url );
				xhr.open( 'GET', url, !requirejs.inlineRequire );
				xhr.onreadystatechange = function( evt ) {
					var status, err;
					//Do not explicitly handle errors, those should be
					//visible via console output in the browser.
					if ( xhr.readyState === 4 ) {
						status = xhr.status;
						if ( status > 399 && status < 600 ) {
							err = new Error( url + ' HTTP status: ' + status );
							err.xhr = xhr;
							if ( errback )
								errback( err );
						} else {
							if ( xhr.responseText == '' )
								return errback( new Error( url + ' empty response' ) );
							callback( xhr.responseText );
						}
					}
				};
				xhr.send( null );
			};
		} else if ( typeof process !== 'undefined' && process.versions && !!process.versions.node ) {
			var fs = requirejs.nodeRequire( 'fs' );
			loader.fetch = function( path, callback, errback ) {
				try {
					callback( fs.readFileSync( path, 'utf8' ) );
				} catch ( err ) {
					errback( err );
				}
			};
		} else if ( typeof Packages !== 'undefined' ) {
			loader.fetch = function( path, callback, errback ) {
				var stringBuffer, line, encoding = 'utf-8',
					file = new java.io.File( path ),
					lineSeparator = java.lang.System.getProperty( 'line.separator' ),
					input = new java.io.BufferedReader( new java.io.InputStreamReader( new java.io.FileInputStream( file ), encoding ) ),
					content = '';
				try {
					stringBuffer = new java.lang.StringBuffer();
					line = input.readLine();
					// Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
					// http://www.unicode.org/faq/utf_bom.html
					// Note that when we use utf-8, the BOM should appear as 'EF BB BF', but it doesn't due to this bug in the JDK:
					// http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
					if ( line && line.length() && line.charAt( 0 ) === 65279 ) {
						// Eat the BOM, since we've already found the encoding on this file,
						// and we plan to concatenating this buffer with others; the BOM should
						// only appear at the top of a file.
						line = line.substring( 1 );
					}
					stringBuffer.append( line );
					while ( ( line = input.readLine() ) !== null ) {
						stringBuffer.append( lineSeparator );
						stringBuffer.append( line );
					}
					//Make sure we return a JavaScript string and not a Java string.
					content = String( stringBuffer.toString() );
				} catch ( err ) {
					if ( errback )
						errback( err );
				} finally {
					input.close();
				}
				callback( content );
			};
		} else {
			loader.fetch = function() {
				throw new Error( 'Environment unsupported.' );
			};
		}
		return loader;
	}();

	/*

	rcu (Ractive component utils) - 0.2.0 - 2014-08-02
	==============================================================

	Copyright 2014 Rich Harris and contributors
	Released under the MIT license.

*/
	var rcu = function() {

		var Ractive;
		var getName = function getName( path ) {
			var pathParts, filename, lastIndex;
			pathParts = path.split( '/' );
			filename = pathParts.pop();
			lastIndex = filename.lastIndexOf( '.' );
			if ( lastIndex !== -1 ) {
				filename = filename.substr( 0, lastIndex );
			}
			return filename;
		};
		var parse = function( getName ) {
			var requirePattern = /require\s*\(\s*(?:"([^"]+)"|'([^']+)')\s*\)/g;
			return function parse( source ) {
				var parsed, template, links, imports, scripts, script, styles, match, modules, i, item;
				parsed = Ractive.parse( source, {
					noStringify: true,
					interpolate: {
						script: false,
						style: false
					}
				} );
				if ( parsed.v !== 1 ) {
					throw new Error( 'Mismatched template version! Please ensure you are using the latest version of Ractive.js in your build process as well as in your app' );
				}
				links = [];
				scripts = [];
				styles = [];
				modules = [];
				// Extract certain top-level nodes from the template. We work backwards
				// so that we can easily splice them out as we go
				template = parsed.t;
				i = template.length;
				while ( i-- ) {
					item = template[ i ];
					if ( item && item.t === 7 ) {
						if ( item.e === 'link' && ( item.a && item.a.rel === 'ractive' ) ) {
							links.push( template.splice( i, 1 )[ 0 ] );
						}
						if ( item.e === 'script' && ( !item.a || !item.a.type || item.a.type === 'text/javascript' ) ) {
							scripts.push( template.splice( i, 1 )[ 0 ] );
						}
						if ( item.e === 'style' && ( !item.a || !item.a.type || item.a.type === 'text/css' ) ) {
							styles.push( template.splice( i, 1 )[ 0 ] );
						}
					}
				}
				// Clean up template - trim whitespace left over from the removal
				// of <link>, <style> and <script> tags from start...
				while ( /^\s*$/.test( template[ 0 ] ) ) {
					template.shift();
				}
				// ...and end
				while ( /^\s*$/.test( template[ template.length - 1 ] ) ) {
					template.pop();
				}
				// Extract names from links
				imports = links.map( function( link ) {
					var href, name;
					href = link.a.href;
					name = link.a.name || getName( href );
					if ( typeof name !== 'string' ) {
						throw new Error( 'Error parsing link tag' );
					}
					return {
						name: name,
						href: href
					};
				} );
				script = scripts.map( extractFragment ).join( ';' );
				while ( match = requirePattern.exec( script ) ) {
					modules.push( match[ 1 ] || match[ 2 ] );
				}
				// TODO glue together text nodes, where applicable
				return {
					template: parsed,
					imports: imports,
					script: script,
					css: styles.map( extractFragment ).join( ' ' ),
					modules: modules
				};
			};

			function extractFragment( item ) {
				return item.f;
			}
		}( getName );
		/*
        
        	eval2.js - 0.1.5 - 2014-06-02
        	==============================================================
        
        	Copyright 2014 Rich Harris
        	Released under the MIT license.
        
        */
		var eval2 = function() {
			var _eval, isBrowser, isNode, head, Module;
			// This causes code to be eval'd in the global scope
			_eval = eval;
			if ( typeof document !== 'undefined' ) {
				isBrowser = true;
				head = document.getElementsByTagName( 'head' )[ 0 ];
			} else if ( typeof process !== 'undefined' ) {
				isNode = true;
				Module = ( require.nodeRequire || require )( 'module' );
			}

			function eval2( script, options ) {
				options = typeof options === 'function' ? {
					callback: options
				} : options || {};
				if ( options.sourceURL ) {
					script += '\n//# sourceURL=' + options.sourceURL;
				}
				try {
					return _eval( script );
				} catch ( err ) {
					if ( isNode ) {
						locateErrorUsingModule( script, options.sourceURL || '' );
						return;
					} else if ( isBrowser && err.name === 'SyntaxError' ) {
						locateErrorUsingDataUri( script );
					}
					throw err;
				}
			}
			eval2.Function = function() {
				var i, args = [],
					body, wrapped;
				i = arguments.length;
				while ( i-- ) {
					args[ i ] = arguments[ i ];
				}
				body = args.pop();
				wrapped = '(function (' + args.join( ', ' ) + ') {\n' + body + '\n})';
				return eval2( wrapped );
			};

			function locateErrorUsingDataUri( code ) {
				var dataURI, scriptElement;
				dataURI = 'data:text/javascript;charset=utf-8,' + encodeURIComponent( code );
				scriptElement = document.createElement( 'script' );
				scriptElement.src = dataURI;
				scriptElement.onload = function() {
					head.removeChild( scriptElement );
				};
				head.appendChild( scriptElement );
			}

			function locateErrorUsingModule( code, url ) {
				var m = new Module();
				try {
					m._compile( 'module.exports = function () {\n' + code + '\n};', url );
				} catch ( err ) {
					console.error( err );
					return;
				}
				m.exports();
			}
			return eval2;
		}();
		var make = function( parse, eval2 ) {
			return function make( source, config, callback, errback ) {
				var definition, url, createComponent, loadImport, imports, loadModule, modules, remainingDependencies, onloaded, ready;
				config = config || {};
				// Implementation-specific config
				url = config.url || '';
				loadImport = config.loadImport;
				loadModule = config.loadModule;
				definition = parse( source );
				createComponent = function() {
					var options, Component, script, factory, component, exports, prop;
					options = {
						template: definition.template,
						partials: definition.partials,
						css: definition.css,
						components: imports
					};
					if ( definition.script ) {
						try {
							script = definition.script + '\n//# sourceURL=' + url.substr( url.lastIndexOf( '/' ) + 1 ) + '.js';
							factory = new eval2.Function( 'component', 'require', 'Ractive', definition.script );
							component = {};
							factory( component, config.require, Ractive );
							exports = component.exports;
							if ( typeof exports === 'object' ) {
								for ( prop in exports ) {
									if ( exports.hasOwnProperty( prop ) ) {
										options[ prop ] = exports[ prop ];
									}
								}
							}
							Component = Ractive.extend( options );
						} catch ( err ) {
							errback( err );
							return;
						}
						callback( Component );
					} else {
						Component = Ractive.extend( options );
						callback( Component );
					}
				};
				// If the definition includes sub-components e.g.
				//     <link rel='ractive' href='foo.html'>
				//
				// ...then we need to load them first, using the loadImport method
				// specified by the implementation.
				//
				// In some environments (e.g. AMD) the same goes for modules, which
				// most be loaded before the script can execute
				remainingDependencies = definition.imports.length + ( loadModule ? definition.modules.length : 0 );
				if ( remainingDependencies ) {
					onloaded = function() {
						if ( !--remainingDependencies ) {
							if ( ready ) {
								createComponent();
							} else {
								setTimeout( createComponent, 0 );
							}
						}
					};
					if ( definition.imports.length ) {
						if ( !loadImport ) {
							throw new Error( 'Component definition includes imports (e.g. `<link rel="ractive" href="' + definition.imports[ 0 ].href + '">`) but no loadImport method was passed to rcu.make()' );
						}
						imports = {};
						definition.imports.forEach( function( toImport ) {
							loadImport( toImport.name, toImport.href, url, function( Component ) {
								imports[ toImport.name ] = Component;
								onloaded();
							} );
						} );
					}
					if ( loadModule && definition.modules.length ) {
						modules = {};
						definition.modules.forEach( function( name ) {
							loadModule( name, name, url, function( Component ) {
								modules[ name ] = Component;
								onloaded();
							} );
						} );
					}
				} else {
					setTimeout( createComponent, 0 );
				}
				ready = true;
			};
		}( parse, eval2 );
		var resolve = function resolvePath( relativePath, base ) {
			var pathParts, relativePathParts, part;
			// If we've got an absolute path, or base is '', return
			// relativePath
			if ( !base || relativePath.charAt( 0 ) === '/' ) {
				return relativePath;
			}
			// 'foo/bar/baz.html' -> ['foo', 'bar', 'baz.html']
			pathParts = ( base || '' ).split( '/' );
			relativePathParts = relativePath.split( '/' );
			// ['foo', 'bar', 'baz.html'] -> ['foo', 'bar']
			pathParts.pop();
			while ( part = relativePathParts.shift() ) {
				if ( part === '..' ) {
					pathParts.pop();
				} else if ( part !== '.' ) {
					pathParts.push( part );
				}
			}
			return pathParts.join( '/' );
		};
		var rcu = function( parse, make, resolve, getName ) {
			return {
				init: function( copy ) {
					Ractive = copy;
				},
				parse: parse,
				make: make,
				resolve: resolve,
				getName: getName
			};
		}( parse, make, resolve, getName );
		return rcu;
	}();

	var load = function( rcu ) {

		rcu.init( Ractive );
		return function load( base, req, source, callback, errback ) {
			rcu.make( source, {
				url: base + '.html',
				loadImport: function( name, path, baseUrl, callback ) {
					path = rcu.resolve( path, base );
					req( [ 'rvc!' + path.replace( /\.html$/, '' ) ], callback );
				},
				loadModule: function( name, path, baseUrl, callback ) {
					req( [ path ], callback );
				},
				require: function( name ) {
					return req( name );
				}
			}, callback, errback );
		};
	}( rcu );

	/* toSource by Marcello Bastea-Forte - zlib license */
	/* altered to export as AMD module */
	var tosource = function() {

		var KEYWORD_REGEXP = /^(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with)$/;
		return function( object, filter, indent, startingIndent ) {
			var seen = [];
			return walk( object, filter, indent === undefined ? '  ' : indent || '', startingIndent || '' );

			function walk( object, filter, indent, currentIndent ) {
				var nextIndent = currentIndent + indent;
				object = filter ? filter( object ) : object;
				switch ( typeof object ) {
					case 'string':
						return JSON.stringify( object );
					case 'boolean':
					case 'number':
					case 'function':
					case 'undefined':
						return '' + object;
				}
				if ( object === null )
					return 'null';
				if ( object instanceof RegExp )
					return object.toString();
				if ( object instanceof Date )
					return 'new Date(' + object.getTime() + ')';
				if ( seen.indexOf( object ) >= 0 )
					return '{$circularReference:1}';
				seen.push( object );

				function join( elements ) {
					return indent.slice( 1 ) + elements.join( ',' + ( indent && '\n' ) + nextIndent ) + ( indent ? ' ' : '' );
				}
				if ( Array.isArray( object ) ) {
					return '[' + join( object.map( function( element ) {
						return walk( element, filter, indent, nextIndent );
					} ) ) + ']';
				}
				var keys = Object.keys( object );
				return keys.length ? '{' + join( keys.map( function( key ) {
					return ( legalKey( key ) ? key : JSON.stringify( key ) ) + ':' + walk( object[ key ], filter, indent, nextIndent );
				} ) ) + '}' : '{}';
			}
		};

		function legalKey( string ) {
			return /^[a-z_$][0-9a-z_$]*$/gi.test( string ) && !KEYWORD_REGEXP.test( string );
		}
	}();

	var minifycss = function( css ) {
		return css.replace( /^\s+/gm, '' );
	};

	var build = function( rcu, toSource, minifycss ) {

		return function( name, source, callback ) {
			var definition, dependencies = [
					'require',
					'ractive'
				],
				dependencyArgs = [
					'require',
					'Ractive'
				],
				importMap = [],
				builtModule;
			definition = rcu.parse( source );
			// Add dependencies from <link> tags, i.e. sub-components
			definition.imports.forEach( function( toImport, i ) {
				var href, name, argumentName;
				href = toImport.href;
				name = toImport.name;
				argumentName = '_import_' + i;
				dependencies.push( 'rvc!' + href.replace( /\.html$/, '' ) );
				dependencyArgs.push( argumentName );
				importMap.push( '"' + name + '":' + argumentName );
			} );
			// Add dependencies from inline require() calls
			dependencies = dependencies.concat( definition.modules );
			builtModule = '' + 'define("rvc!' + name + '",' + JSON.stringify( dependencies ) + ',function(' + dependencyArgs.join( ',' ) + '){\n' + '  var __options__={\n    template:' + toSource( definition.template, null, '', '' ) + ',\n' + ( definition.css ? '    css:' + JSON.stringify( minifycss( definition.css ) ) + ',\n' : '' ) + ( definition.imports.length ? '    components:{' + importMap.join( ',' ) + '}\n' : '' ) + '  },\n' + '  component={};';
			if ( definition.script ) {
				builtModule += '\n' + definition.script + '\n' + '  if ( typeof component.exports === "object" ) {\n    ' + 'for ( var __prop__ in component.exports ) {\n      ' + 'if ( component.exports.hasOwnProperty(__prop__) ) {\n        ' + '__options__[__prop__] = component.exports[__prop__];\n      ' + '}\n    ' + '}\n  ' + '}\n\n  ';
			}
			builtModule += 'return Ractive.extend(__options__);\n});';
			callback( builtModule );
		};
	}( rcu, tosource, minifycss );

	var rvc = function( amdLoader, rcu, load, build ) {

		rcu.init( Ractive );
		return amdLoader( 'rvc', 'html', function( name, source, req, callback, errback, config ) {
			if ( config.isBuild ) {
				build( name, source, callback, errback );
			} else {
				load( name, req, source, callback, errback );
			}
		} );
	}( loader, rcu, load, build );

	return rvc;

} );
