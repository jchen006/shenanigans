/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _WordCloud = __webpack_require__(499);
	
	var _WordCloud2 = _interopRequireDefault(_WordCloud);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class WordCloudWidget extends _react2.default.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {
	      ingredients: []
	    };
	  }
	
	  componentWillMount() {
	    fetch("/api/word_cloud_json/100").then(response => response.json()).then(data => {
	      this.setState({
	        ingredients: data
	      });
	    });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'word-cloud-widget-container' },
	      _react2.default.createElement(_WordCloud2.default, {
	        width: 1500,
	        height: 1000,
	        data: this.state.ingredients,
	        padding: 0
	      })
	    );
	  }
	
	}
	
	ReactDOM.render(_react2.default.createElement(WordCloudWidget, null), document.getElementById('word_cloud'));

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(3);
	} else {
	  module.exports = __webpack_require__(7);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.2.0
	 * react.production.min.js
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';var m=__webpack_require__(4),n=__webpack_require__(5),p=__webpack_require__(6),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
	var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
	function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
	function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
	function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
	f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
	function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
	var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
	d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
	isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyObject = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
	 * react.development.js
	 *
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	
	
	if (process.env.NODE_ENV !== "production") {
	  (function() {
	'use strict';
	
	var _assign = __webpack_require__(4);
	var emptyObject = __webpack_require__(5);
	var invariant = __webpack_require__(8);
	var warning = __webpack_require__(9);
	var emptyFunction = __webpack_require__(6);
	var checkPropTypes = __webpack_require__(10);
	
	// TODO: this is special because it gets imported during build.
	
	var ReactVersion = '16.2.0';
	
	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
	
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
	var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
	var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
	
	var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
	    return null;
	  }
	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }
	  return null;
	}
	
	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */
	
	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var lowPriorityWarning = function () {};
	
	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	var lowPriorityWarning$1 = lowPriorityWarning;
	
	var didWarnStateUpdateForUnmountedComponent = {};
	
	function warnNoop(publicInstance, callerName) {
	  {
	    var constructor = publicInstance.constructor;
	    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
	    var warningKey = componentName + '.' + callerName;
	    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
	      return;
	    }
	    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
	    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
	  }
	}
	
	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance, callback, callerName) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
	    warnNoop(publicInstance, 'replaceState');
	  },
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
	    warnNoop(publicInstance, 'setState');
	  }
	};
	
	/**
	 * Base class helpers for the updating state of a component.
	 */
	function Component(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	Component.prototype.isReactComponent = {};
	
	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	Component.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
	  this.updater.enqueueSetState(this, partialState, callback, 'setState');
	};
	
	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	Component.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
	};
	
	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	{
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    Object.defineProperty(Component.prototype, methodName, {
	      get: function () {
	        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
	        return undefined;
	      }
	    });
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}
	
	/**
	 * Base class helpers for the updating state of a component.
	 */
	function PureComponent(props, context, updater) {
	  // Duplicated from Component.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;
	
	function AsyncComponent(props, context, updater) {
	  // Duplicated from Component.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
	asyncComponentPrototype.constructor = AsyncComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(asyncComponentPrototype, Component.prototype);
	asyncComponentPrototype.unstable_isAsyncReactComponent = true;
	asyncComponentPrototype.render = function () {
	  return this.props.children;
	};
	
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;
	
	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}
	
	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}
	
	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}
	
	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}
	
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };
	
	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};
	
	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    });
	    // self and source are DEV only properties.
	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    });
	    // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.
	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }
	
	  return element;
	};
	
	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://reactjs.org/docs/react-api.html#createelement
	 */
	function createElement(type, config, children) {
	  var propName;
	
	  // Reserved names are extracted
	  var props = {};
	
	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;
	
	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }
	
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }
	
	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	}
	
	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://reactjs.org/docs/react-api.html#createfactory
	 */
	
	
	function cloneAndReplaceKey(oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
	
	  return newElement;
	}
	
	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://reactjs.org/docs/react-api.html#cloneelement
	 */
	function cloneElement(element, config, children) {
	  var propName;
	
	  // Original props are copied
	  var props = _assign({}, element.props);
	
	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;
	
	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;
	
	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }
	
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }
	
	  return ReactElement(element.type, key, ref, self, source, owner, props);
	}
	
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	function isValidElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	
	var ReactDebugCurrentFrame = {};
	
	{
	  // Component that is being worked on
	  ReactDebugCurrentFrame.getCurrentStack = null;
	
	  ReactDebugCurrentFrame.getStackAddendum = function () {
	    var impl = ReactDebugCurrentFrame.getCurrentStack;
	    if (impl) {
	      return impl();
	    }
	    return null;
	  };
	}
	
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */
	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	
	  return '$' + escapedString;
	}
	
	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */
	
	var didWarnAboutMaps = false;
	
	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}
	
	var POOL_SIZE = 10;
	var traverseContextPool = [];
	function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
	  if (traverseContextPool.length) {
	    var traverseContext = traverseContextPool.pop();
	    traverseContext.result = mapResult;
	    traverseContext.keyPrefix = keyPrefix;
	    traverseContext.func = mapFunction;
	    traverseContext.context = mapContext;
	    traverseContext.count = 0;
	    return traverseContext;
	  } else {
	    return {
	      result: mapResult,
	      keyPrefix: keyPrefix,
	      func: mapFunction,
	      context: mapContext,
	      count: 0
	    };
	  }
	}
	
	function releaseTraverseContext(traverseContext) {
	  traverseContext.result = null;
	  traverseContext.keyPrefix = null;
	  traverseContext.func = null;
	  traverseContext.context = null;
	  traverseContext.count = 0;
	  if (traverseContextPool.length < POOL_SIZE) {
	    traverseContextPool.push(traverseContext);
	  }
	}
	
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;
	
	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }
	
	  var invokeCallback = false;
	
	  if (children === null) {
	    invokeCallback = true;
	  } else {
	    switch (type) {
	      case 'string':
	      case 'number':
	        invokeCallback = true;
	        break;
	      case 'object':
	        switch (children.$$typeof) {
	          case REACT_ELEMENT_TYPE:
	          case REACT_CALL_TYPE:
	          case REACT_RETURN_TYPE:
	          case REACT_PORTAL_TYPE:
	            invokeCallback = true;
	        }
	    }
	  }
	
	  if (invokeCallback) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }
	
	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
	
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (typeof iteratorFn === 'function') {
	      {
	        // Warn about using Maps as children
	        if (iteratorFn === children.entries) {
	          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
	          didWarnAboutMaps = true;
	        }
	      }
	
	      var iterator = iteratorFn.call(children);
	      var step;
	      var ii = 0;
	      while (!(step = iterator.next()).done) {
	        child = step.value;
	        nextName = nextNamePrefix + getComponentKey(child, ii++);
	        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
	      }
	      var childrenString = '' + children;
	      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
	    }
	  }
	
	  return subtreeCount;
	}
	
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}
	
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (typeof component === 'object' && component !== null && component.key != null) {
	    // Explicit key
	    return escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;
	
	  func.call(context, child, bookKeeping.count++);
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  releaseTraverseContext(traverseContext);
	}
	
	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;
	
	
	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (isValidElement(mappedChild)) {
	      mappedChild = cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}
	
	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  releaseTraverseContext(traverseContext);
	}
	
	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}
	
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
	}
	
	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}
	
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://reactjs.org/docs/react-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
	  return children;
	}
	
	var describeComponentFrame = function (name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	};
	
	function getComponentName(fiber) {
	  var type = fiber.type;
	
	  if (typeof type === 'string') {
	    return type;
	  }
	  if (typeof type === 'function') {
	    return type.displayName || type.name;
	  }
	  return null;
	}
	
	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */
	
	{
	  var currentlyValidatingElement = null;
	
	  var propTypesMisspellWarningShown = false;
	
	  var getDisplayName = function (element) {
	    if (element == null) {
	      return '#empty';
	    } else if (typeof element === 'string' || typeof element === 'number') {
	      return '#text';
	    } else if (typeof element.type === 'string') {
	      return element.type;
	    } else if (element.type === REACT_FRAGMENT_TYPE) {
	      return 'React.Fragment';
	    } else {
	      return element.type.displayName || element.type.name || 'Unknown';
	    }
	  };
	
	  var getStackAddendum = function () {
	    var stack = '';
	    if (currentlyValidatingElement) {
	      var name = getDisplayName(currentlyValidatingElement);
	      var owner = currentlyValidatingElement._owner;
	      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
	    }
	    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
	    return stack;
	  };
	
	  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
	}
	
	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = getComponentName(ReactCurrentOwner.current);
	    if (name) {
	      return '\n\nCheck the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	function getSourceInfoErrorAddendum(elementProps) {
	  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
	    var source = elementProps.__source;
	    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	    var lineNumber = source.lineNumber;
	    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	  }
	  return '';
	}
	
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};
	
	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();
	
	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}
	
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;
	
	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	    return;
	  }
	  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
	
	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
	  }
	
	  currentlyValidatingElement = element;
	  {
	    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
	  }
	  currentlyValidatingElement = null;
	}
	
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    if (typeof iteratorFn === 'function') {
	      // Entry iterators used to provide implicit keys,
	      // but now we print a separate warning for them later.
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  var propTypes = componentClass.propTypes;
	  if (propTypes) {
	    currentlyValidatingElement = element;
	    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
	    currentlyValidatingElement = null;
	  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	    propTypesMisspellWarningShown = true;
	    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	  }
	}
	
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */
	function validateFragmentProps(fragment) {
	  currentlyValidatingElement = fragment;
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var key = _step.value;
	
	      if (!VALID_FRAGMENT_PROPS.has(key)) {
	        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
	        break;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator['return']) {
	        _iterator['return']();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  if (fragment.ref !== null) {
	    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
	  }
	
	  currentlyValidatingElement = null;
	}
	
	function createElementWithValidation(type, props, children) {
	  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
	  // We warn in this case but don't throw. We expect the element creation to
	  // succeed and there will likely be errors in render.
	  if (!validType) {
	    var info = '';
	    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	    }
	
	    var sourceInfo = getSourceInfoErrorAddendum(props);
	    if (sourceInfo) {
	      info += sourceInfo;
	    } else {
	      info += getDeclarationErrorAddendum();
	    }
	
	    info += getStackAddendum() || '';
	
	    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
	  }
	
	  var element = createElement.apply(this, arguments);
	
	  // The result can be nullish if a mock or a custom function is used.
	  // TODO: Drop this when these are no longer allowed as the type argument.
	  if (element == null) {
	    return element;
	  }
	
	  // Skip key warning if the type isn't valid since our key validation logic
	  // doesn't expect a non-string/function type and can throw confusing errors.
	  // We don't want exception behavior to differ between dev and prod.
	  // (Rendering will throw with a helpful message and as soon as the type is
	  // fixed, the key warnings will appear.)
	  if (validType) {
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], type);
	    }
	  }
	
	  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
	    validateFragmentProps(element);
	  } else {
	    validatePropTypes(element);
	  }
	
	  return element;
	}
	
	function createFactoryWithValidation(type) {
	  var validatedFactory = createElementWithValidation.bind(null, type);
	  // Legacy hook TODO: Warn if this is accessed
	  validatedFactory.type = type;
	
	  {
	    Object.defineProperty(validatedFactory, 'type', {
	      enumerable: false,
	      get: function () {
	        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
	        Object.defineProperty(this, 'type', {
	          value: type
	        });
	        return type;
	      }
	    });
	  }
	
	  return validatedFactory;
	}
	
	function cloneElementWithValidation(element, props, children) {
	  var newElement = cloneElement.apply(this, arguments);
	  for (var i = 2; i < arguments.length; i++) {
	    validateChildKeys(arguments[i], newElement.type);
	  }
	  validatePropTypes(newElement);
	  return newElement;
	}
	
	var React = {
	  Children: {
	    map: mapChildren,
	    forEach: forEachChildren,
	    count: countChildren,
	    toArray: toArray,
	    only: onlyChild
	  },
	
	  Component: Component,
	  PureComponent: PureComponent,
	  unstable_AsyncComponent: AsyncComponent,
	
	  Fragment: REACT_FRAGMENT_TYPE,
	
	  createElement: createElementWithValidation,
	  cloneElement: cloneElementWithValidation,
	  createFactory: createFactoryWithValidation,
	  isValidElement: isValidElement,
	
	  version: ReactVersion,
	
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    ReactCurrentOwner: ReactCurrentOwner,
	    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
	    assign: _assign
	  }
	};
	
	{
	  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
	    // These should not be included in production.
	    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
	    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
	    // TODO: remove in React 17.0.
	    ReactComponentTreeHook: {}
	  });
	}
	
	
	
	var React$2 = Object.freeze({
		default: React
	});
	
	var React$3 = ( React$2 && React ) || React$2;
	
	// TODO: decide on the top-level export form.
	// This is hacky but makes it work with both Rollup and Jest.
	var react = React$3['default'] ? React$3['default'] : React$3;
	
	module.exports = react;
	  })();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(6);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(8);
	  var warning = __webpack_require__(9);
	  var ReactPropTypesSecret = __webpack_require__(11);
	  var loggedTypeFailures = {};
	}
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	
	          var stack = getStack ? getStack() : '';
	
	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}
	
	module.exports = checkPropTypes;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-array/ Version 1.2.1. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var ascending = function(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	};
	
	var bisector = function(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	};
	
	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}
	
	var ascendingBisect = bisector(ascending);
	var bisectRight = ascendingBisect.right;
	var bisectLeft = ascendingBisect.left;
	
	var pairs = function(array, f) {
	  if (f == null) f = pair;
	  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
	  while (i < n) pairs[i] = f(p, p = array[++i]);
	  return pairs;
	};
	
	function pair(a, b) {
	  return [a, b];
	}
	
	var cross = function(values0, values1, reduce) {
	  var n0 = values0.length,
	      n1 = values1.length,
	      values = new Array(n0 * n1),
	      i0,
	      i1,
	      i,
	      value0;
	
	  if (reduce == null) reduce = pair;
	
	  for (i0 = i = 0; i0 < n0; ++i0) {
	    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
	      values[i] = reduce(value0, values1[i1]);
	    }
	  }
	
	  return values;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var number = function(x) {
	  return x === null ? NaN : +x;
	};
	
	var variance = function(values, valueof) {
	  var n = values.length,
	      m = 0,
	      i = -1,
	      mean = 0,
	      value,
	      delta,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) {
	        delta = value - mean;
	        mean += delta / ++m;
	        sum += delta * (value - mean);
	      }
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) {
	        delta = value - mean;
	        mean += delta / ++m;
	        sum += delta * (value - mean);
	      }
	    }
	  }
	
	  if (m > 1) return sum / (m - 1);
	};
	
	var deviation = function(array, f) {
	  var v = variance(array, f);
	  return v ? Math.sqrt(v) : v;
	};
	
	var extent = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      min,
	      max;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        min = max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null) {
	            if (min > value) min = value;
	            if (max < value) max = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        min = max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null) {
	            if (min > value) min = value;
	            if (max < value) max = value;
	          }
	        }
	      }
	    }
	  }
	
	  return [min, max];
	};
	
	var array = Array.prototype;
	
	var slice = array.slice;
	var map = array.map;
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var identity = function(x) {
	  return x;
	};
	
	var range = function(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
	
	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);
	
	  while (++i < n) {
	    range[i] = start + i * step;
	  }
	
	  return range;
	};
	
	var e10 = Math.sqrt(50);
	var e5 = Math.sqrt(10);
	var e2 = Math.sqrt(2);
	
	var ticks = function(start, stop, count) {
	  var reverse,
	      i = -1,
	      n,
	      ticks,
	      step;
	
	  stop = +stop, start = +start, count = +count;
	  if (start === stop && count > 0) return [start];
	  if (reverse = stop < start) n = start, start = stop, stop = n;
	  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
	
	  if (step > 0) {
	    start = Math.ceil(start / step);
	    stop = Math.floor(stop / step);
	    ticks = new Array(n = Math.ceil(stop - start + 1));
	    while (++i < n) ticks[i] = (start + i) * step;
	  } else {
	    start = Math.floor(start * step);
	    stop = Math.ceil(stop * step);
	    ticks = new Array(n = Math.ceil(start - stop + 1));
	    while (++i < n) ticks[i] = (start - i) / step;
	  }
	
	  if (reverse) ticks.reverse();
	
	  return ticks;
	};
	
	function tickIncrement(start, stop, count) {
	  var step = (stop - start) / Math.max(0, count),
	      power = Math.floor(Math.log(step) / Math.LN10),
	      error = step / Math.pow(10, power);
	  return power >= 0
	      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
	      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	}
	
	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}
	
	var sturges = function(values) {
	  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
	};
	
	var histogram = function() {
	  var value = identity,
	      domain = extent,
	      threshold = sturges;
	
	  function histogram(data) {
	    var i,
	        n = data.length,
	        x,
	        values = new Array(n);
	
	    for (i = 0; i < n; ++i) {
	      values[i] = value(data[i], i, data);
	    }
	
	    var xz = domain(values),
	        x0 = xz[0],
	        x1 = xz[1],
	        tz = threshold(values, x0, x1);
	
	    // Convert number of thresholds into uniform thresholds.
	    if (!Array.isArray(tz)) {
	      tz = tickStep(x0, x1, tz);
	      tz = range(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
	    }
	
	    // Remove any thresholds outside the domain.
	    var m = tz.length;
	    while (tz[0] <= x0) tz.shift(), --m;
	    while (tz[m - 1] > x1) tz.pop(), --m;
	
	    var bins = new Array(m + 1),
	        bin;
	
	    // Initialize bins.
	    for (i = 0; i <= m; ++i) {
	      bin = bins[i] = [];
	      bin.x0 = i > 0 ? tz[i - 1] : x0;
	      bin.x1 = i < m ? tz[i] : x1;
	    }
	
	    // Assign data to bins by value, ignoring any outside the domain.
	    for (i = 0; i < n; ++i) {
	      x = values[i];
	      if (x0 <= x && x <= x1) {
	        bins[bisectRight(tz, x, 0, m)].push(data[i]);
	      }
	    }
	
	    return bins;
	  }
	
	  histogram.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
	  };
	
	  histogram.domain = function(_) {
	    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
	  };
	
	  histogram.thresholds = function(_) {
	    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
	  };
	
	  return histogram;
	};
	
	var quantile = function(values, p, valueof) {
	  if (valueof == null) valueof = number;
	  if (!(n = values.length)) return;
	  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
	  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	  var n,
	      i = (n - 1) * p,
	      i0 = Math.floor(i),
	      value0 = +valueof(values[i0], i0, values),
	      value1 = +valueof(values[i0 + 1], i0 + 1, values);
	  return value0 + (value1 - value0) * (i - i0);
	};
	
	var freedmanDiaconis = function(values, min, max) {
	  values = map.call(values, number).sort(ascending);
	  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
	};
	
	var scott = function(values, min, max) {
	  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
	};
	
	var max = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      max;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null && value > max) {
	            max = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        max = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null && value > max) {
	            max = value;
	          }
	        }
	      }
	    }
	  }
	
	  return max;
	};
	
	var mean = function(values, valueof) {
	  var n = values.length,
	      m = n,
	      i = -1,
	      value,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) sum += value;
	      else --m;
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
	      else --m;
	    }
	  }
	
	  if (m) return sum / m;
	};
	
	var median = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      numbers = [];
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (!isNaN(value = number(values[i]))) {
	        numbers.push(value);
	      }
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (!isNaN(value = number(valueof(values[i], i, values)))) {
	        numbers.push(value);
	      }
	    }
	  }
	
	  return quantile(numbers.sort(ascending), 0.5);
	};
	
	var merge = function(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;
	
	  while (++i < n) j += arrays[i].length;
	  merged = new Array(j);
	
	  while (--n >= 0) {
	    array = arrays[n];
	    m = array.length;
	    while (--m >= 0) {
	      merged[--j] = array[m];
	    }
	  }
	
	  return merged;
	};
	
	var min = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      min;
	
	  if (valueof == null) {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = values[i]) != null && value >= value) {
	        min = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = values[i]) != null && min > value) {
	            min = value;
	          }
	        }
	      }
	    }
	  }
	
	  else {
	    while (++i < n) { // Find the first comparable value.
	      if ((value = valueof(values[i], i, values)) != null && value >= value) {
	        min = value;
	        while (++i < n) { // Compare the remaining values.
	          if ((value = valueof(values[i], i, values)) != null && min > value) {
	            min = value;
	          }
	        }
	      }
	    }
	  }
	
	  return min;
	};
	
	var permute = function(array, indexes) {
	  var i = indexes.length, permutes = new Array(i);
	  while (i--) permutes[i] = array[indexes[i]];
	  return permutes;
	};
	
	var scan = function(values, compare) {
	  if (!(n = values.length)) return;
	  var n,
	      i = 0,
	      j = 0,
	      xi,
	      xj = values[j];
	
	  if (compare == null) compare = ascending;
	
	  while (++i < n) {
	    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
	      xj = xi, j = i;
	    }
	  }
	
	  if (compare(xj, xj) === 0) return j;
	};
	
	var shuffle = function(array, i0, i1) {
	  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
	      t,
	      i;
	
	  while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m + i0];
	    array[m + i0] = array[i + i0];
	    array[i + i0] = t;
	  }
	
	  return array;
	};
	
	var sum = function(values, valueof) {
	  var n = values.length,
	      i = -1,
	      value,
	      sum = 0;
	
	  if (valueof == null) {
	    while (++i < n) {
	      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
	    }
	  }
	
	  else {
	    while (++i < n) {
	      if (value = +valueof(values[i], i, values)) sum += value;
	    }
	  }
	
	  return sum;
	};
	
	var transpose = function(matrix) {
	  if (!(n = matrix.length)) return [];
	  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	      row[j] = matrix[j][i];
	    }
	  }
	  return transpose;
	};
	
	function length(d) {
	  return d.length;
	}
	
	var zip = function() {
	  return transpose(arguments);
	};
	
	exports.bisect = bisectRight;
	exports.bisectRight = bisectRight;
	exports.bisectLeft = bisectLeft;
	exports.ascending = ascending;
	exports.bisector = bisector;
	exports.cross = cross;
	exports.descending = descending;
	exports.deviation = deviation;
	exports.extent = extent;
	exports.histogram = histogram;
	exports.thresholdFreedmanDiaconis = freedmanDiaconis;
	exports.thresholdScott = scott;
	exports.thresholdSturges = sturges;
	exports.max = max;
	exports.mean = mean;
	exports.median = median;
	exports.merge = merge;
	exports.min = min;
	exports.pairs = pairs;
	exports.permute = permute;
	exports.quantile = quantile;
	exports.range = range;
	exports.scan = scan;
	exports.shuffle = shuffle;
	exports.sum = sum;
	exports.ticks = ticks;
	exports.tickIncrement = tickIncrement;
	exports.tickStep = tickStep;
	exports.transpose = transpose;
	exports.variance = variance;
	exports.zip = zip;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-selection/ Version 1.2.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var xhtml = "http://www.w3.org/1999/xhtml";
	
	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};
	
	var namespace = function(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	};
	
	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}
	
	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}
	
	var creator = function(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	};
	
	var nextId = 0;
	
	function local() {
	  return new Local;
	}
	
	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}
	
	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};
	
	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}
	
	var matcher$1 = matcher;
	
	var filterEvents = {};
	
	exports.event = null;
	
	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}
	
	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}
	
	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = exports.event; // Events can be reentrant (e.g., focus).
	    exports.event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      exports.event = event0;
	    }
	  };
	}
	
	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}
	
	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}
	
	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}
	
	var selection_on = function(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
	
	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }
	
	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	};
	
	function customEvent(event1, listener, that, args) {
	  var event0 = exports.event;
	  event1.sourceEvent = exports.event;
	  exports.event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    exports.event = event0;
	  }
	}
	
	var sourceEvent = function() {
	  var current = exports.event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	};
	
	var point = function(node, event) {
	  var svg = node.ownerSVGElement || node;
	
	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }
	
	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	};
	
	var mouse = function(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	};
	
	function none() {}
	
	var selector = function(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	};
	
	var selection_select = function(select) {
	  if (typeof select !== "function") select = selector(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	function empty() {
	  return [];
	}
	
	var selectorAll = function(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	};
	
	var selection_selectAll = function(select) {
	  if (typeof select !== "function") select = selectorAll(select);
	
	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, parents);
	};
	
	var selection_filter = function(match) {
	  if (typeof match !== "function") match = matcher$1(match);
	
	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }
	
	  return new Selection(subgroups, this._parents);
	};
	
	var sparse = function(update) {
	  return new Array(update.length);
	};
	
	var selection_enter = function() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	};
	
	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}
	
	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var keyPrefix = "$"; // Protect against keys like “__proto__”.
	
	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;
	
	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}
	
	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;
	
	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }
	
	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }
	
	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}
	
	var selection_data = function(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }
	
	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;
	
	  if (typeof value !== "function") value = constant(value);
	
	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);
	
	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
	
	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }
	
	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	};
	
	var selection_exit = function() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	};
	
	var selection_merge = function(selection) {
	
	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }
	
	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }
	
	  return new Selection(merges, this._parents);
	};
	
	var selection_order = function() {
	
	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }
	
	  return this;
	};
	
	var selection_sort = function(compare) {
	  if (!compare) compare = ascending;
	
	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }
	
	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }
	
	  return new Selection(sortgroups, this._parents).order();
	};
	
	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}
	
	var selection_call = function() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	};
	
	var selection_nodes = function() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	};
	
	var selection_node = function() {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }
	
	  return null;
	};
	
	var selection_size = function() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	};
	
	var selection_empty = function() {
	  return !this.node();
	};
	
	var selection_each = function(callback) {
	
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }
	
	  return this;
	};
	
	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}
	
	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}
	
	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}
	
	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}
	
	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}
	
	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}
	
	var selection_attr = function(name, value) {
	  var fullname = namespace(name);
	
	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }
	
	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	};
	
	var defaultView = function(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	};
	
	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}
	
	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}
	
	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}
	
	var selection_style = function(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	};
	
	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}
	
	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}
	
	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}
	
	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}
	
	var selection_property = function(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	};
	
	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}
	
	function classList(node) {
	  return node.classList || new ClassList(node);
	}
	
	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}
	
	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};
	
	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}
	
	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}
	
	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}
	
	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}
	
	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}
	
	var selection_classed = function(name, value) {
	  var names = classArray(name + "");
	
	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }
	
	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	};
	
	function textRemove() {
	  this.textContent = "";
	}
	
	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}
	
	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}
	
	var selection_text = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	};
	
	function htmlRemove() {
	  this.innerHTML = "";
	}
	
	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}
	
	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}
	
	var selection_html = function(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	};
	
	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}
	
	var selection_raise = function() {
	  return this.each(raise);
	};
	
	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}
	
	var selection_lower = function() {
	  return this.each(lower);
	};
	
	var selection_append = function(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	};
	
	function constantNull() {
	  return null;
	}
	
	var selection_insert = function(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	};
	
	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}
	
	var selection_remove = function() {
	  return this.each(remove);
	};
	
	var selection_datum = function(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	};
	
	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;
	
	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }
	
	  node.dispatchEvent(event);
	}
	
	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}
	
	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}
	
	var selection_dispatch = function(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	};
	
	var root = [null];
	
	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}
	
	function selection() {
	  return new Selection([[document.documentElement]], root);
	}
	
	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};
	
	var select = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	};
	
	var selectAll = function(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	};
	
	var touch = function(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;
	
	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }
	
	  return null;
	};
	
	var touches = function(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;
	
	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }
	
	  return points;
	};
	
	exports.creator = creator;
	exports.local = local;
	exports.matcher = matcher$1;
	exports.mouse = mouse;
	exports.namespace = namespace;
	exports.namespaces = namespaces;
	exports.clientPoint = point;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.selection = selection;
	exports.selector = selector;
	exports.selectorAll = selectorAll;
	exports.style = styleValue;
	exports.touch = touch;
	exports.touches = touches;
	exports.window = defaultView;
	exports.customEvent = customEvent;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-interpolate/ Version 1.1.6. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(20)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Color) { 'use strict';
	
	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}
	
	var basis$1 = function(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var basisClosed = function(values) {
	  var n = values.length;
	  return function(t) {
	    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
	        v0 = values[(i + n - 1) % n],
	        v1 = values[i % n],
	        v2 = values[(i + 1) % n],
	        v3 = values[(i + 2) % n];
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	};
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}
	
	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}
	
	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}
	
	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}
	
	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}
	
	var rgb$1 = ((function rgbGamma(y) {
	  var color$$1 = gamma(y);
	
	  function rgb$$1(start, end) {
	    var r = color$$1((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	        g = color$$1(start.g, end.g),
	        b = color$$1(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	
	  rgb$$1.gamma = rgbGamma;
	
	  return rgb$$1;
	}))(1);
	
	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color$$1;
	    for (i = 0; i < n; ++i) {
	      color$$1 = d3Color.rgb(colors[i]);
	      r[i] = color$$1.r || 0;
	      g[i] = color$$1.g || 0;
	      b[i] = color$$1.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color$$1.opacity = 1;
	    return function(t) {
	      color$$1.r = r(t);
	      color$$1.g = g(t);
	      color$$1.b = b(t);
	      return color$$1 + "";
	    };
	  };
	}
	
	var rgbBasis = rgbSpline(basis$1);
	var rgbBasisClosed = rgbSpline(basisClosed);
	
	var array = function(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(na),
	      c = new Array(nb),
	      i;
	
	  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];
	
	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	};
	
	var date = function(a, b) {
	  var d = new Date;
	  return a = +a, b -= a, function(t) {
	    return d.setTime(a + b * t), d;
	  };
	};
	
	var number = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	};
	
	var object = function(a, b) {
	  var i = {},
	      c = {},
	      k;
	
	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};
	
	  for (k in b) {
	    if (k in a) {
	      i[k] = value(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }
	
	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	};
	
	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB = new RegExp(reA.source, "g");
	
	function zero(b) {
	  return function() {
	    return b;
	  };
	}
	
	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}
	
	var string = function(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators
	
	  // Coerce inputs to strings.
	  a = a + "", b = b + "";
	
	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: number(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }
	
	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }
	
	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	};
	
	var value = function(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant(b)
	      : (t === "number" ? number
	      : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	      : b instanceof d3Color.color ? rgb$1
	      : b instanceof Date ? date
	      : Array.isArray(b) ? array
	      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
	      : number)(a, b);
	};
	
	var round = function(a, b) {
	  return a = +a, b -= a, function(t) {
	    return Math.round(a + b * t);
	  };
	};
	
	var degrees = 180 / Math.PI;
	
	var identity = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};
	
	var decompose = function(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	};
	
	var cssNode;
	var cssRoot;
	var cssView;
	var svgNode;
	
	function parseCss(value) {
	  if (value === "none") return identity;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}
	
	function parseSvg(value) {
	  if (value == null) return identity;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}
	
	function interpolateTransform(parse, pxComma, pxParen, degParen) {
	
	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }
	
	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }
	
	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }
	
	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }
	
	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }
	
	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}
	
	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
	
	var rho = Math.SQRT2;
	var rho2 = 2;
	var rho4 = 4;
	var epsilon2 = 1e-12;
	
	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}
	
	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}
	
	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}
	
	// p0 = [ux0, uy0, w0]
	// p1 = [ux1, uy1, w1]
	var zoom = function(p0, p1) {
	  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	      dx = ux1 - ux0,
	      dy = uy1 - uy0,
	      d2 = dx * dx + dy * dy,
	      i,
	      S;
	
	  // Special case for u0 ≅ u1.
	  if (d2 < epsilon2) {
	    S = Math.log(w1 / w0) / rho;
	    i = function(t) {
	      return [
	        ux0 + t * dx,
	        uy0 + t * dy,
	        w0 * Math.exp(rho * t * S)
	      ];
	    };
	  }
	
	  // General case.
	  else {
	    var d1 = Math.sqrt(d2),
	        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	    S = (r1 - r0) / rho;
	    i = function(t) {
	      var s = t * S,
	          coshr0 = cosh(r0),
	          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	      return [
	        ux0 + u * dx,
	        uy0 + u * dy,
	        w0 * coshr0 / cosh(rho * s + r0)
	      ];
	    };
	  }
	
	  i.duration = S * 1000;
	
	  return i;
	};
	
	function hsl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hsl$2 = hsl$1(hue);
	var hslLong = hsl$1(nogamma);
	
	function lab$1(start, end) {
	  var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	      a = nogamma(start.a, end.a),
	      b = nogamma(start.b, end.b),
	      opacity = nogamma(start.opacity, end.opacity);
	  return function(t) {
	    start.l = l(t);
	    start.a = a(t);
	    start.b = b(t);
	    start.opacity = opacity(t);
	    return start + "";
	  };
	}
	
	function hcl$1(hue$$1) {
	  return function(start, end) {
	    var h = hue$$1((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }
	}
	
	var hcl$2 = hcl$1(hue);
	var hclLong = hcl$1(nogamma);
	
	function cubehelix$1(hue$$1) {
	  return (function cubehelixGamma(y) {
	    y = +y;
	
	    function cubehelix$$1(start, end) {
	      var h = hue$$1((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }
	
	    cubehelix$$1.gamma = cubehelixGamma;
	
	    return cubehelix$$1;
	  })(1);
	}
	
	var cubehelix$2 = cubehelix$1(hue);
	var cubehelixLong = cubehelix$1(nogamma);
	
	var quantize = function(interpolator, n) {
	  var samples = new Array(n);
	  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
	  return samples;
	};
	
	exports.interpolate = value;
	exports.interpolateArray = array;
	exports.interpolateBasis = basis$1;
	exports.interpolateBasisClosed = basisClosed;
	exports.interpolateDate = date;
	exports.interpolateNumber = number;
	exports.interpolateObject = object;
	exports.interpolateRound = round;
	exports.interpolateString = string;
	exports.interpolateTransformCss = interpolateTransformCss;
	exports.interpolateTransformSvg = interpolateTransformSvg;
	exports.interpolateZoom = zoom;
	exports.interpolateRgb = rgb$1;
	exports.interpolateRgbBasis = rgbBasis;
	exports.interpolateRgbBasisClosed = rgbBasisClosed;
	exports.interpolateHsl = hsl$2;
	exports.interpolateHslLong = hslLong;
	exports.interpolateLab = lab$1;
	exports.interpolateHcl = hcl$2;
	exports.interpolateHclLong = hclLong;
	exports.interpolateCubehelix = cubehelix$2;
	exports.interpolateCubehelixLong = cubehelixLong;
	exports.quantize = quantize;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-color/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var define = function(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	};
	
	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}
	
	function Color() {}
	
	var darker = 0.7;
	var brighter = 1 / darker;
	
	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
	var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
	var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
	var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
	var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
	var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
	
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};
	
	define(Color, color, {
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  toString: function() {
	    return this.rgb() + "";
	  }
	});
	
	function color(format) {
	  var m;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format])
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}
	
	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}
	
	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}
	
	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}
	
	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}
	
	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  toString: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "rgb(" : "rgba(")
	        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));
	
	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}
	
	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}
	
	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  }
	}));
	
	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}
	
	var deg2rad = Math.PI / 180;
	var rad2deg = 180 / Math.PI;
	
	var Kn = 18;
	var Xn = 0.950470;
	var Yn = 1;
	var Zn = 1.088830;
	var t0 = 4 / 29;
	var t1 = 6 / 29;
	var t2 = 3 * t1 * t1;
	var t3 = t1 * t1 * t1;
	
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var b = rgb2xyz(o.r),
	      a = rgb2xyz(o.g),
	      l = rgb2xyz(o.b),
	      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}
	
	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}
	
	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}
	
	define(Lab, lab, extend(Color, {
	  brighter: function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker: function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb: function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	      this.opacity
	    );
	  }
	}));
	
	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}
	
	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}
	
	function xyz2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}
	
	function rgb2xyz(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}
	
	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  var h = Math.atan2(o.b, o.a) * rad2deg;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}
	
	function hcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}
	
	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Hcl, hcl, extend(Color, {
	  brighter: function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	  },
	  darker: function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	  },
	  rgb: function() {
	    return labConvert(this).rgb();
	  }
	}));
	
	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}
	
	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}
	
	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}
	
	define(Cubehelix, cubehelix, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));
	
	exports.color = color;
	exports.rgb = rgb;
	exports.hsl = hsl;
	exports.lab = lab;
	exports.hcl = hcl;
	exports.cubehelix = cubehelix;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-collection/ Version 1.0.4. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var prefix = "$";
	
	function Map() {}
	
	Map.prototype = map.prototype = {
	  constructor: Map,
	  has: function(key) {
	    return (prefix + key) in this;
	  },
	  get: function(key) {
	    return this[prefix + key];
	  },
	  set: function(key, value) {
	    this[prefix + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};
	
	function map(object, f) {
	  var map = new Map;
	
	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });
	
	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;
	
	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }
	
	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);
	
	  return map;
	}
	
	var nest = function() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;
	
	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) {
	      if (sortValues != null) array.sort(sortValues);
	      return rollup != null ? rollup(array) : array;
	    }
	
	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map(),
	        values,
	        result = createResult();
	
	    while (++i < n) {
	      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
	        values.push(value);
	      } else {
	        valuesByKey.set(keyValue, [value]);
	      }
	    }
	
	    valuesByKey.each(function(values, key) {
	      setResult(result, key, apply(values, depth, createResult, setResult));
	    });
	
	    return result;
	  }
	
	  function entries(map$$1, depth) {
	    if (++depth > keys.length) return map$$1;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map$$1.entries();
	    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }
	
	  return nest = {
	    object: function(array) { return apply(array, 0, createObject, setObject); },
	    map: function(array) { return apply(array, 0, createMap, setMap); },
	    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	};
	
	function createObject() {
	  return {};
	}
	
	function setObject(object, key, value) {
	  object[key] = value;
	}
	
	function createMap() {
	  return map();
	}
	
	function setMap(map$$1, key, value) {
	  map$$1.set(key, value);
	}
	
	function Set() {}
	
	var proto = map.prototype;
	
	Set.prototype = set.prototype = {
	  constructor: Set,
	  has: proto.has,
	  add: function(value) {
	    value += "";
	    this[prefix + value] = value;
	    return this;
	  },
	  remove: proto.remove,
	  clear: proto.clear,
	  values: proto.keys,
	  size: proto.size,
	  empty: proto.empty,
	  each: proto.each
	};
	
	function set(object, f) {
	  var set = new Set;
	
	  // Copy constructor.
	  if (object instanceof Set) object.each(function(value) { set.add(value); });
	
	  // Otherwise, assume it’s an array.
	  else if (object) {
	    var i = -1, n = object.length;
	    if (f == null) while (++i < n) set.add(object[i]);
	    else while (++i < n) set.add(f(object[i], i, object));
	  }
	
	  return set;
	}
	
	var keys = function(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	};
	
	var values = function(map) {
	  var values = [];
	  for (var key in map) values.push(map[key]);
	  return values;
	};
	
	var entries = function(map) {
	  var entries = [];
	  for (var key in map) entries.push({key: key, value: map[key]});
	  return entries;
	};
	
	exports.nest = nest;
	exports.set = set;
	exports.map = map;
	exports.keys = keys;
	exports.values = values;
	exports.entries = entries;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-format/ Version 1.2.1. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	// Computes the decimal coefficient and exponent of the specified number x with
	// significant digits p, where x is positive and p is in [1, 21] or undefined.
	// For example, formatDecimal(1.23) returns ["123", 0].
	var formatDecimal = function(x, p) {
	  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	  var i, coefficient = x.slice(0, i);
	
	  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	  return [
	    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	    +x.slice(i + 1)
	  ];
	};
	
	var exponent = function(x) {
	  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
	};
	
	var formatGroup = function(grouping, thousands) {
	  return function(value, width) {
	    var i = value.length,
	        t = [],
	        j = 0,
	        g = grouping[0],
	        length = 0;
	
	    while (i > 0 && g > 0) {
	      if (length + g + 1 > width) g = Math.max(1, width - length);
	      t.push(value.substring(i -= g, i + g));
	      if ((length += g + 1) > width) break;
	      g = grouping[j = (j + 1) % grouping.length];
	    }
	
	    return t.reverse().join(thousands);
	  };
	};
	
	var formatNumerals = function(numerals) {
	  return function(value) {
	    return value.replace(/[0-9]/g, function(i) {
	      return numerals[+i];
	    });
	  };
	};
	
	var formatDefault = function(x, p) {
	  x = x.toPrecision(p);
	
	  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
	    switch (x[i]) {
	      case ".": i0 = i1 = i; break;
	      case "0": if (i0 === 0) i0 = i; i1 = i; break;
	      case "e": break out;
	      default: if (i0 > 0) i0 = 0; break;
	    }
	  }
	
	  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
	};
	
	var prefixExponent;
	
	var formatPrefixAuto = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1],
	      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	      n = coefficient.length;
	  return i === n ? coefficient
	      : i > n ? coefficient + new Array(i - n + 1).join("0")
	      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	};
	
	var formatRounded = function(x, p) {
	  var d = formatDecimal(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1];
	  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	};
	
	var formatTypes = {
	  "": formatDefault,
	  "%": function(x, p) { return (x * 100).toFixed(p); },
	  "b": function(x) { return Math.round(x).toString(2); },
	  "c": function(x) { return x + ""; },
	  "d": function(x) { return Math.round(x).toString(10); },
	  "e": function(x, p) { return x.toExponential(p); },
	  "f": function(x, p) { return x.toFixed(p); },
	  "g": function(x, p) { return x.toPrecision(p); },
	  "o": function(x) { return Math.round(x).toString(8); },
	  "p": function(x, p) { return formatRounded(x * 100, p); },
	  "r": formatRounded,
	  "s": formatPrefixAuto,
	  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
	  "x": function(x) { return Math.round(x).toString(16); }
	};
	
	// [[fill]align][sign][symbol][0][width][,][.precision][type]
	var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	
	function formatSpecifier(specifier) {
	  return new FormatSpecifier(specifier);
	}
	
	formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof
	
	function FormatSpecifier(specifier) {
	  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	
	  var match,
	      fill = match[1] || " ",
	      align = match[2] || ">",
	      sign = match[3] || "-",
	      symbol = match[4] || "",
	      zero = !!match[5],
	      width = match[6] && +match[6],
	      comma = !!match[7],
	      precision = match[8] && +match[8].slice(1),
	      type = match[9] || "";
	
	  // The "n" type is an alias for ",g".
	  if (type === "n") comma = true, type = "g";
	
	  // Map invalid types to the default format.
	  else if (!formatTypes[type]) type = "";
	
	  // If zero fill is specified, padding goes after sign and before digits.
	  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";
	
	  this.fill = fill;
	  this.align = align;
	  this.sign = sign;
	  this.symbol = symbol;
	  this.zero = zero;
	  this.width = width;
	  this.comma = comma;
	  this.precision = precision;
	  this.type = type;
	}
	
	FormatSpecifier.prototype.toString = function() {
	  return this.fill
	      + this.align
	      + this.sign
	      + this.symbol
	      + (this.zero ? "0" : "")
	      + (this.width == null ? "" : Math.max(1, this.width | 0))
	      + (this.comma ? "," : "")
	      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
	      + this.type;
	};
	
	var identity = function(x) {
	  return x;
	};
	
	var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];
	
	var formatLocale = function(locale) {
	  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
	      currency = locale.currency,
	      decimal = locale.decimal,
	      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
	      percent = locale.percent || "%";
	
	  function newFormat(specifier) {
	    specifier = formatSpecifier(specifier);
	
	    var fill = specifier.fill,
	        align = specifier.align,
	        sign = specifier.sign,
	        symbol = specifier.symbol,
	        zero = specifier.zero,
	        width = specifier.width,
	        comma = specifier.comma,
	        precision = specifier.precision,
	        type = specifier.type;
	
	    // Compute the prefix and suffix.
	    // For SI-prefix, the suffix is lazily computed.
	    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";
	
	    // What format function should we use?
	    // Is this an integer type?
	    // Can this type generate exponential notation?
	    var formatType = formatTypes[type],
	        maybeSuffix = !type || /[defgprs%]/.test(type);
	
	    // Set the default precision if not specified,
	    // or clamp the specified precision to the supported range.
	    // For significant precision, it must be in [1, 21].
	    // For fixed precision, it must be in [0, 20].
	    precision = precision == null ? (type ? 6 : 12)
	        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	        : Math.max(0, Math.min(20, precision));
	
	    function format(value) {
	      var valuePrefix = prefix,
	          valueSuffix = suffix,
	          i, n, c;
	
	      if (type === "c") {
	        valueSuffix = formatType(value) + valueSuffix;
	        value = "";
	      } else {
	        value = +value;
	
	        // Perform the initial formatting.
	        var valueNegative = value < 0;
	        value = formatType(Math.abs(value), precision);
	
	        // If a negative value rounds to zero during formatting, treat as positive.
	        if (valueNegative && +value === 0) valueNegative = false;
	
	        // Compute the prefix and suffix.
	        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");
	
	        // Break the formatted value into the integer “value” part that can be
	        // grouped, and fractional or exponential “suffix” part that is not.
	        if (maybeSuffix) {
	          i = -1, n = value.length;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), 48 > c || c > 57) {
	              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	              value = value.slice(0, i);
	              break;
	            }
	          }
	        }
	      }
	
	      // If the fill character is not "0", grouping is applied before padding.
	      if (comma && !zero) value = group(value, Infinity);
	
	      // Compute the padding.
	      var length = valuePrefix.length + value.length + valueSuffix.length,
	          padding = length < width ? new Array(width - length + 1).join(fill) : "";
	
	      // If the fill character is "0", grouping is applied after padding.
	      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
	
	      // Reconstruct the final output based on the desired alignment.
	      switch (align) {
	        case "<": value = valuePrefix + value + valueSuffix + padding; break;
	        case "=": value = valuePrefix + padding + value + valueSuffix; break;
	        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
	        default: value = padding + valuePrefix + value + valueSuffix; break;
	      }
	
	      return numerals(value);
	    }
	
	    format.toString = function() {
	      return specifier + "";
	    };
	
	    return format;
	  }
	
	  function formatPrefix(specifier, value) {
	    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	        k = Math.pow(10, -e),
	        prefix = prefixes[8 + e / 3];
	    return function(value) {
	      return f(k * value) + prefix;
	    };
	  }
	
	  return {
	    format: newFormat,
	    formatPrefix: formatPrefix
	  };
	};
	
	var locale;
	
	
	
	defaultLocale({
	  decimal: ".",
	  thousands: ",",
	  grouping: [3],
	  currency: ["$", ""]
	});
	
	function defaultLocale(definition) {
	  locale = formatLocale(definition);
	  exports.format = locale.format;
	  exports.formatPrefix = locale.formatPrefix;
	  return locale;
	}
	
	var precisionFixed = function(step) {
	  return Math.max(0, -exponent(Math.abs(step)));
	};
	
	var precisionPrefix = function(step, value) {
	  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	};
	
	var precisionRound = function(step, max) {
	  step = Math.abs(step), max = Math.abs(max) - step;
	  return Math.max(0, exponent(max) - exponent(step)) + 1;
	};
	
	exports.formatDefaultLocale = defaultLocale;
	exports.formatLocale = formatLocale;
	exports.formatSpecifier = formatSpecifier;
	exports.precisionFixed = precisionFixed;
	exports.precisionPrefix = precisionPrefix;
	exports.precisionRound = precisionRound;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-scale/ Version 1.0.7. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(13), __webpack_require__(26), __webpack_require__(19), __webpack_require__(30), __webpack_require__(80), __webpack_require__(81), __webpack_require__(20)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format', 'd3-color'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Array,d3Collection,d3Interpolate,d3Format,d3Time,d3TimeFormat,d3Color) { 'use strict';
	
	var array = Array.prototype;
	
	var map$1 = array.map;
	var slice = array.slice;
	
	var implicit = {name: "implicit"};
	
	function ordinal(range$$1) {
	  var index = d3Collection.map(),
	      domain = [],
	      unknown = implicit;
	
	  range$$1 = range$$1 == null ? [] : slice.call(range$$1);
	
	  function scale(d) {
	    var key = d + "", i = index.get(key);
	    if (!i) {
	      if (unknown !== implicit) return unknown;
	      index.set(key, i = domain.push(d));
	    }
	    return range$$1[(i - 1) % range$$1.length];
	  }
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [], index = d3Collection.map();
	    var i = -1, n = _.length, d, key;
	    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	    return scale;
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), scale) : range$$1.slice();
	  };
	
	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };
	
	  scale.copy = function() {
	    return ordinal()
	        .domain(domain)
	        .range(range$$1)
	        .unknown(unknown);
	  };
	
	  return scale;
	}
	
	function band() {
	  var scale = ordinal().unknown(undefined),
	      domain = scale.domain,
	      ordinalRange = scale.range,
	      range$$1 = [0, 1],
	      step,
	      bandwidth,
	      round = false,
	      paddingInner = 0,
	      paddingOuter = 0,
	      align = 0.5;
	
	  delete scale.unknown;
	
	  function rescale() {
	    var n = domain().length,
	        reverse = range$$1[1] < range$$1[0],
	        start = range$$1[reverse - 0],
	        stop = range$$1[1 - reverse];
	    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	    if (round) step = Math.floor(step);
	    start += (stop - start - step * (n - paddingInner)) * align;
	    bandwidth = step * (1 - paddingInner);
	    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	    var values = d3Array.range(n).map(function(i) { return start + step * i; });
	    return ordinalRange(reverse ? values.reverse() : values);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = [+_[0], +_[1]], rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = [+_[0], +_[1]], round = true, rescale();
	  };
	
	  scale.bandwidth = function() {
	    return bandwidth;
	  };
	
	  scale.step = function() {
	    return step;
	  };
	
	  scale.round = function(_) {
	    return arguments.length ? (round = !!_, rescale()) : round;
	  };
	
	  scale.padding = function(_) {
	    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingInner = function(_) {
	    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
	  };
	
	  scale.paddingOuter = function(_) {
	    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
	  };
	
	  scale.align = function(_) {
	    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	  };
	
	  scale.copy = function() {
	    return band()
	        .domain(domain())
	        .range(range$$1)
	        .round(round)
	        .paddingInner(paddingInner)
	        .paddingOuter(paddingOuter)
	        .align(align);
	  };
	
	  return rescale();
	}
	
	function pointish(scale) {
	  var copy = scale.copy;
	
	  scale.padding = scale.paddingOuter;
	  delete scale.paddingInner;
	  delete scale.paddingOuter;
	
	  scale.copy = function() {
	    return pointish(copy());
	  };
	
	  return scale;
	}
	
	function point() {
	  return pointish(band().paddingInner(1));
	}
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var number = function(x) {
	  return +x;
	};
	
	var unit = [0, 1];
	
	function deinterpolateLinear(a, b) {
	  return (b -= (a = +a))
	      ? function(x) { return (x - a) / b; }
	      : constant(b);
	}
	
	function deinterpolateClamp(deinterpolate) {
	  return function(a, b) {
	    var d = deinterpolate(a = +a, b = +b);
	    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
	  };
	}
	
	function reinterpolateClamp(reinterpolate) {
	  return function(a, b) {
	    var r = reinterpolate(a = +a, b = +b);
	    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
	  };
	}
	
	function bimap(domain, range$$1, deinterpolate, reinterpolate) {
	  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
	  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
	  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
	  return function(x) { return r0(d0(x)); };
	}
	
	function polymap(domain, range$$1, deinterpolate, reinterpolate) {
	  var j = Math.min(domain.length, range$$1.length) - 1,
	      d = new Array(j),
	      r = new Array(j),
	      i = -1;
	
	  // Reverse descending domains.
	  if (domain[j] < domain[0]) {
	    domain = domain.slice().reverse();
	    range$$1 = range$$1.slice().reverse();
	  }
	
	  while (++i < j) {
	    d[i] = deinterpolate(domain[i], domain[i + 1]);
	    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
	  }
	
	  return function(x) {
	    var i = d3Array.bisect(domain, x, 1, j) - 1;
	    return r[i](d[i](x));
	  };
	}
	
	function copy(source, target) {
	  return target
	      .domain(source.domain())
	      .range(source.range())
	      .interpolate(source.interpolate())
	      .clamp(source.clamp());
	}
	
	// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
	function continuous(deinterpolate, reinterpolate) {
	  var domain = unit,
	      range$$1 = unit,
	      interpolate$$1 = d3Interpolate.interpolate,
	      clamp = false,
	      piecewise,
	      output,
	      input;
	
	  function rescale() {
	    piecewise = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
	    output = input = null;
	    return scale;
	  }
	
	  function scale(x) {
	    return (output || (output = piecewise(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
	  }
	
	  scale.invert = function(y) {
	    return (input || (input = piecewise(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = map$1.call(_, number), rescale()) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.rangeRound = function(_) {
	    return range$$1 = slice.call(_), interpolate$$1 = d3Interpolate.interpolateRound, rescale();
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, rescale()) : clamp;
	  };
	
	  scale.interpolate = function(_) {
	    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
	  };
	
	  return rescale();
	}
	
	var tickFormat = function(domain, count, specifier) {
	  var start = domain[0],
	      stop = domain[domain.length - 1],
	      step = d3Array.tickStep(start, stop, count == null ? 10 : count),
	      precision;
	  specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
	  switch (specifier.type) {
	    case "s": {
	      var value = Math.max(Math.abs(start), Math.abs(stop));
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
	      return d3Format.formatPrefix(specifier, value);
	    }
	    case "":
	    case "e":
	    case "g":
	    case "p":
	    case "r": {
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	      break;
	    }
	    case "f":
	    case "%": {
	      if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	      break;
	    }
	  }
	  return d3Format.format(specifier);
	};
	
	function linearish(scale) {
	  var domain = scale.domain;
	
	  scale.ticks = function(count) {
	    var d = domain();
	    return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return tickFormat(domain(), count, specifier);
	  };
	
	  scale.nice = function(count) {
	    if (count == null) count = 10;
	
	    var d = domain(),
	        i0 = 0,
	        i1 = d.length - 1,
	        start = d[i0],
	        stop = d[i1],
	        step;
	
	    if (stop < start) {
	      step = start, start = stop, stop = step;
	      step = i0, i0 = i1, i1 = step;
	    }
	
	    step = d3Array.tickIncrement(start, stop, count);
	
	    if (step > 0) {
	      start = Math.floor(start / step) * step;
	      stop = Math.ceil(stop / step) * step;
	      step = d3Array.tickIncrement(start, stop, count);
	    } else if (step < 0) {
	      start = Math.ceil(start * step) / step;
	      stop = Math.floor(stop * step) / step;
	      step = d3Array.tickIncrement(start, stop, count);
	    }
	
	    if (step > 0) {
	      d[i0] = Math.floor(start / step) * step;
	      d[i1] = Math.ceil(stop / step) * step;
	      domain(d);
	    } else if (step < 0) {
	      d[i0] = Math.ceil(start * step) / step;
	      d[i1] = Math.floor(stop * step) / step;
	      domain(d);
	    }
	
	    return scale;
	  };
	
	  return scale;
	}
	
	function linear() {
	  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber);
	
	  scale.copy = function() {
	    return copy(scale, linear());
	  };
	
	  return linearish(scale);
	}
	
	function identity() {
	  var domain = [0, 1];
	
	  function scale(x) {
	    return +x;
	  }
	
	  scale.invert = scale;
	
	  scale.domain = scale.range = function(_) {
	    return arguments.length ? (domain = map$1.call(_, number), scale) : domain.slice();
	  };
	
	  scale.copy = function() {
	    return identity().domain(domain);
	  };
	
	  return linearish(scale);
	}
	
	var nice = function(domain, interval) {
	  domain = domain.slice();
	
	  var i0 = 0,
	      i1 = domain.length - 1,
	      x0 = domain[i0],
	      x1 = domain[i1],
	      t;
	
	  if (x1 < x0) {
	    t = i0, i0 = i1, i1 = t;
	    t = x0, x0 = x1, x1 = t;
	  }
	
	  domain[i0] = interval.floor(x0);
	  domain[i1] = interval.ceil(x1);
	  return domain;
	};
	
	function deinterpolate(a, b) {
	  return (b = Math.log(b / a))
	      ? function(x) { return Math.log(x / a) / b; }
	      : constant(b);
	}
	
	function reinterpolate(a, b) {
	  return a < 0
	      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
	      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
	}
	
	function pow10(x) {
	  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
	}
	
	function powp(base) {
	  return base === 10 ? pow10
	      : base === Math.E ? Math.exp
	      : function(x) { return Math.pow(base, x); };
	}
	
	function logp(base) {
	  return base === Math.E ? Math.log
	      : base === 10 && Math.log10
	      || base === 2 && Math.log2
	      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
	}
	
	function reflect(f) {
	  return function(x) {
	    return -f(-x);
	  };
	}
	
	function log() {
	  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
	      domain = scale.domain,
	      base = 10,
	      logs = logp(10),
	      pows = powp(10);
	
	  function rescale() {
	    logs = logp(base), pows = powp(base);
	    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
	    return scale;
	  }
	
	  scale.base = function(_) {
	    return arguments.length ? (base = +_, rescale()) : base;
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };
	
	  scale.ticks = function(count) {
	    var d = domain(),
	        u = d[0],
	        v = d[d.length - 1],
	        r;
	
	    if (r = v < u) i = u, u = v, v = i;
	
	    var i = logs(u),
	        j = logs(v),
	        p,
	        k,
	        t,
	        n = count == null ? 10 : +count,
	        z = [];
	
	    if (!(base % 1) && j - i < n) {
	      i = Math.round(i) - 1, j = Math.round(j) + 1;
	      if (u > 0) for (; i < j; ++i) {
	        for (k = 1, p = pows(i); k < base; ++k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      } else for (; i < j; ++i) {
	        for (k = base - 1, p = pows(i); k >= 1; --k) {
	          t = p * k;
	          if (t < u) continue;
	          if (t > v) break;
	          z.push(t);
	        }
	      }
	    } else {
	      z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
	    }
	
	    return r ? z.reverse() : z;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
	    if (typeof specifier !== "function") specifier = d3Format.format(specifier);
	    if (count === Infinity) return specifier;
	    if (count == null) count = 10;
	    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
	    return function(d) {
	      var i = d / pows(Math.round(logs(d)));
	      if (i * base < base - 0.5) i *= base;
	      return i <= k ? specifier(d) : "";
	    };
	  };
	
	  scale.nice = function() {
	    return domain(nice(domain(), {
	      floor: function(x) { return pows(Math.floor(logs(x))); },
	      ceil: function(x) { return pows(Math.ceil(logs(x))); }
	    }));
	  };
	
	  scale.copy = function() {
	    return copy(scale, log().base(base));
	  };
	
	  return scale;
	}
	
	function raise(x, exponent) {
	  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	}
	
	function pow() {
	  var exponent = 1,
	      scale = continuous(deinterpolate, reinterpolate),
	      domain = scale.domain;
	
	  function deinterpolate(a, b) {
	    return (b = raise(b, exponent) - (a = raise(a, exponent)))
	        ? function(x) { return (raise(x, exponent) - a) / b; }
	        : constant(b);
	  }
	
	  function reinterpolate(a, b) {
	    b = raise(b, exponent) - (a = raise(a, exponent));
	    return function(t) { return raise(a + b * t, 1 / exponent); };
	  }
	
	  scale.exponent = function(_) {
	    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
	  };
	
	  scale.copy = function() {
	    return copy(scale, pow().exponent(exponent));
	  };
	
	  return linearish(scale);
	}
	
	function sqrt() {
	  return pow().exponent(0.5);
	}
	
	function quantile$1() {
	  var domain = [],
	      range$$1 = [],
	      thresholds = [];
	
	  function rescale() {
	    var i = 0, n = Math.max(1, range$$1.length);
	    thresholds = new Array(n - 1);
	    while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
	    return scale;
	  }
	
	  function scale(x) {
	    if (!isNaN(x = +x)) return range$$1[d3Array.bisect(thresholds, x)];
	  }
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN] : [
	      i > 0 ? thresholds[i - 1] : domain[0],
	      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
	    ];
	  };
	
	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [];
	    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
	    domain.sort(d3Array.ascending);
	    return rescale();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), rescale()) : range$$1.slice();
	  };
	
	  scale.quantiles = function() {
	    return thresholds.slice();
	  };
	
	  scale.copy = function() {
	    return quantile$1()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	function quantize() {
	  var x0 = 0,
	      x1 = 1,
	      n = 1,
	      domain = [0.5],
	      range$$1 = [0, 1];
	
	  function scale(x) {
	    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
	  }
	
	  function rescale() {
	    var i = -1;
	    domain = new Array(n);
	    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
	    return scale;
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (n = (range$$1 = slice.call(_)).length - 1, rescale()) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return i < 0 ? [NaN, NaN]
	        : i < 1 ? [x0, domain[0]]
	        : i >= n ? [domain[n - 1], x1]
	        : [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return quantize()
	        .domain([x0, x1])
	        .range(range$$1);
	  };
	
	  return linearish(scale);
	}
	
	function threshold() {
	  var domain = [0.5],
	      range$$1 = [0, 1],
	      n = 1;
	
	  function scale(x) {
	    if (x <= x) return range$$1[d3Array.bisect(domain, x, 0, n)];
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : domain.slice();
	  };
	
	  scale.range = function(_) {
	    return arguments.length ? (range$$1 = slice.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : range$$1.slice();
	  };
	
	  scale.invertExtent = function(y) {
	    var i = range$$1.indexOf(y);
	    return [domain[i - 1], domain[i]];
	  };
	
	  scale.copy = function() {
	    return threshold()
	        .domain(domain)
	        .range(range$$1);
	  };
	
	  return scale;
	}
	
	var durationSecond = 1000;
	var durationMinute = durationSecond * 60;
	var durationHour = durationMinute * 60;
	var durationDay = durationHour * 24;
	var durationWeek = durationDay * 7;
	var durationMonth = durationDay * 30;
	var durationYear = durationDay * 365;
	
	function date(t) {
	  return new Date(t);
	}
	
	function number$1(t) {
	  return t instanceof Date ? +t : +new Date(+t);
	}
	
	function calendar(year, month, week, day, hour, minute, second, millisecond, format$$1) {
	  var scale = continuous(deinterpolateLinear, d3Interpolate.interpolateNumber),
	      invert = scale.invert,
	      domain = scale.domain;
	
	  var formatMillisecond = format$$1(".%L"),
	      formatSecond = format$$1(":%S"),
	      formatMinute = format$$1("%I:%M"),
	      formatHour = format$$1("%I %p"),
	      formatDay = format$$1("%a %d"),
	      formatWeek = format$$1("%b %d"),
	      formatMonth = format$$1("%B"),
	      formatYear = format$$1("%Y");
	
	  var tickIntervals = [
	    [second,  1,      durationSecond],
	    [second,  5,  5 * durationSecond],
	    [second, 15, 15 * durationSecond],
	    [second, 30, 30 * durationSecond],
	    [minute,  1,      durationMinute],
	    [minute,  5,  5 * durationMinute],
	    [minute, 15, 15 * durationMinute],
	    [minute, 30, 30 * durationMinute],
	    [  hour,  1,      durationHour  ],
	    [  hour,  3,  3 * durationHour  ],
	    [  hour,  6,  6 * durationHour  ],
	    [  hour, 12, 12 * durationHour  ],
	    [   day,  1,      durationDay   ],
	    [   day,  2,  2 * durationDay   ],
	    [  week,  1,      durationWeek  ],
	    [ month,  1,      durationMonth ],
	    [ month,  3,  3 * durationMonth ],
	    [  year,  1,      durationYear  ]
	  ];
	
	  function tickFormat(date) {
	    return (second(date) < date ? formatMillisecond
	        : minute(date) < date ? formatSecond
	        : hour(date) < date ? formatMinute
	        : day(date) < date ? formatHour
	        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
	        : year(date) < date ? formatMonth
	        : formatYear)(date);
	  }
	
	  function tickInterval(interval, start, stop, step) {
	    if (interval == null) interval = 10;
	
	    // If a desired tick count is specified, pick a reasonable tick interval
	    // based on the extent of the domain and a rough estimate of tick size.
	    // Otherwise, assume interval is already a time interval and use it.
	    if (typeof interval === "number") {
	      var target = Math.abs(stop - start) / interval,
	          i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
	      if (i === tickIntervals.length) {
	        step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
	        interval = year;
	      } else if (i) {
	        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
	        step = i[1];
	        interval = i[0];
	      } else {
	        step = Math.max(d3Array.tickStep(start, stop, interval), 1);
	        interval = millisecond;
	      }
	    }
	
	    return step == null ? interval : interval.every(step);
	  }
	
	  scale.invert = function(y) {
	    return new Date(invert(y));
	  };
	
	  scale.domain = function(_) {
	    return arguments.length ? domain(map$1.call(_, number$1)) : domain().map(date);
	  };
	
	  scale.ticks = function(interval, step) {
	    var d = domain(),
	        t0 = d[0],
	        t1 = d[d.length - 1],
	        r = t1 < t0,
	        t;
	    if (r) t = t0, t0 = t1, t1 = t;
	    t = tickInterval(interval, t0, t1, step);
	    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
	    return r ? t.reverse() : t;
	  };
	
	  scale.tickFormat = function(count, specifier) {
	    return specifier == null ? tickFormat : format$$1(specifier);
	  };
	
	  scale.nice = function(interval, step) {
	    var d = domain();
	    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
	        ? domain(nice(d, interval))
	        : scale;
	  };
	
	  scale.copy = function() {
	    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format$$1));
	  };
	
	  return scale;
	}
	
	var time = function() {
	  return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
	};
	
	var utcTime = function() {
	  return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
	};
	
	var colors = function(s) {
	  return s.match(/.{6}/g).map(function(x) {
	    return "#" + x;
	  });
	};
	
	var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
	
	var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");
	
	var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");
	
	var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");
	
	var cubehelix$1 = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0));
	
	var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));
	
	var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));
	
	var rainbow = d3Color.cubehelix();
	
	var rainbow$1 = function(t) {
	  if (t < 0 || t > 1) t -= Math.floor(t);
	  var ts = Math.abs(t - 0.5);
	  rainbow.h = 360 * t - 100;
	  rainbow.s = 1.5 - 1.5 * ts;
	  rainbow.l = 0.8 - 0.9 * ts;
	  return rainbow + "";
	};
	
	function ramp(range$$1) {
	  var n = range$$1.length;
	  return function(t) {
	    return range$$1[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	  };
	}
	
	var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
	
	var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
	
	var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
	
	var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
	
	function sequential(interpolator) {
	  var x0 = 0,
	      x1 = 1,
	      clamp = false;
	
	  function scale(x) {
	    var t = (x - x0) / (x1 - x0);
	    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
	  }
	
	  scale.domain = function(_) {
	    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
	  };
	
	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = !!_, scale) : clamp;
	  };
	
	  scale.interpolator = function(_) {
	    return arguments.length ? (interpolator = _, scale) : interpolator;
	  };
	
	  scale.copy = function() {
	    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
	  };
	
	  return linearish(scale);
	}
	
	exports.scaleBand = band;
	exports.scalePoint = point;
	exports.scaleIdentity = identity;
	exports.scaleLinear = linear;
	exports.scaleLog = log;
	exports.scaleOrdinal = ordinal;
	exports.scaleImplicit = implicit;
	exports.scalePow = pow;
	exports.scaleSqrt = sqrt;
	exports.scaleQuantile = quantile$1;
	exports.scaleQuantize = quantize;
	exports.scaleThreshold = threshold;
	exports.scaleTime = time;
	exports.scaleUtc = utcTime;
	exports.schemeCategory10 = category10;
	exports.schemeCategory20b = category20b;
	exports.schemeCategory20c = category20c;
	exports.schemeCategory20 = category20;
	exports.interpolateCubehelixDefault = cubehelix$1;
	exports.interpolateRainbow = rainbow$1;
	exports.interpolateWarm = warm;
	exports.interpolateCool = cool;
	exports.interpolateViridis = viridis;
	exports.interpolateMagma = magma;
	exports.interpolateInferno = inferno;
	exports.interpolatePlasma = plasma;
	exports.scaleSequential = sequential;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-time/ Version 1.0.8. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var t0 = new Date;
	var t1 = new Date;
	
	function newInterval(floori, offseti, count, field) {
	
	  function interval(date) {
	    return floori(date = new Date(+date)), date;
	  }
	
	  interval.floor = interval;
	
	  interval.ceil = function(date) {
	    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
	  };
	
	  interval.round = function(date) {
	    var d0 = interval(date),
	        d1 = interval.ceil(date);
	    return date - d0 < d1 - date ? d0 : d1;
	  };
	
	  interval.offset = function(date, step) {
	    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
	  };
	
	  interval.range = function(start, stop, step) {
	    var range = [], previous;
	    start = interval.ceil(start);
	    step = step == null ? 1 : Math.floor(step);
	    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
	    while (previous < start && start < stop);
	    return range;
	  };
	
	  interval.filter = function(test) {
	    return newInterval(function(date) {
	      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
	    }, function(date, step) {
	      if (date >= date) {
	        if (step < 0) while (++step <= 0) {
	          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
	        } else while (--step >= 0) {
	          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
	        }
	      }
	    });
	  };
	
	  if (count) {
	    interval.count = function(start, end) {
	      t0.setTime(+start), t1.setTime(+end);
	      floori(t0), floori(t1);
	      return Math.floor(count(t0, t1));
	    };
	
	    interval.every = function(step) {
	      step = Math.floor(step);
	      return !isFinite(step) || !(step > 0) ? null
	          : !(step > 1) ? interval
	          : interval.filter(field
	              ? function(d) { return field(d) % step === 0; }
	              : function(d) { return interval.count(0, d) % step === 0; });
	    };
	  }
	
	  return interval;
	}
	
	var millisecond = newInterval(function() {
	  // noop
	}, function(date, step) {
	  date.setTime(+date + step);
	}, function(start, end) {
	  return end - start;
	});
	
	// An optimized implementation for this simple case.
	millisecond.every = function(k) {
	  k = Math.floor(k);
	  if (!isFinite(k) || !(k > 0)) return null;
	  if (!(k > 1)) return millisecond;
	  return newInterval(function(date) {
	    date.setTime(Math.floor(date / k) * k);
	  }, function(date, step) {
	    date.setTime(+date + step * k);
	  }, function(start, end) {
	    return (end - start) / k;
	  });
	};
	
	var milliseconds = millisecond.range;
	
	var durationSecond = 1e3;
	var durationMinute = 6e4;
	var durationHour = 36e5;
	var durationDay = 864e5;
	var durationWeek = 6048e5;
	
	var second = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationSecond) * durationSecond);
	}, function(date, step) {
	  date.setTime(+date + step * durationSecond);
	}, function(start, end) {
	  return (end - start) / durationSecond;
	}, function(date) {
	  return date.getUTCSeconds();
	});
	
	var seconds = second.range;
	
	var minute = newInterval(function(date) {
	  date.setTime(Math.floor(date / durationMinute) * durationMinute);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getMinutes();
	});
	
	var minutes = minute.range;
	
	var hour = newInterval(function(date) {
	  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
	  if (offset < 0) offset += durationHour;
	  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getHours();
	});
	
	var hours = hour.range;
	
	var day = newInterval(function(date) {
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setDate(date.getDate() + step);
	}, function(start, end) {
	  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
	}, function(date) {
	  return date.getDate() - 1;
	});
	
	var days = day.range;
	
	function weekday(i) {
	  return newInterval(function(date) {
	    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step * 7);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
	  });
	}
	
	var sunday = weekday(0);
	var monday = weekday(1);
	var tuesday = weekday(2);
	var wednesday = weekday(3);
	var thursday = weekday(4);
	var friday = weekday(5);
	var saturday = weekday(6);
	
	var sundays = sunday.range;
	var mondays = monday.range;
	var tuesdays = tuesday.range;
	var wednesdays = wednesday.range;
	var thursdays = thursday.range;
	var fridays = friday.range;
	var saturdays = saturday.range;
	
	var month = newInterval(function(date) {
	  date.setDate(1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setMonth(date.getMonth() + step);
	}, function(start, end) {
	  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
	}, function(date) {
	  return date.getMonth();
	});
	
	var months = month.range;
	
	var year = newInterval(function(date) {
	  date.setMonth(0, 1);
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setFullYear(date.getFullYear() + step);
	}, function(start, end) {
	  return end.getFullYear() - start.getFullYear();
	}, function(date) {
	  return date.getFullYear();
	});
	
	// An optimized implementation for this simple case.
	year.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
	    date.setMonth(0, 1);
	    date.setHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setFullYear(date.getFullYear() + step * k);
	  });
	};
	
	var years = year.range;
	
	var utcMinute = newInterval(function(date) {
	  date.setUTCSeconds(0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationMinute);
	}, function(start, end) {
	  return (end - start) / durationMinute;
	}, function(date) {
	  return date.getUTCMinutes();
	});
	
	var utcMinutes = utcMinute.range;
	
	var utcHour = newInterval(function(date) {
	  date.setUTCMinutes(0, 0, 0);
	}, function(date, step) {
	  date.setTime(+date + step * durationHour);
	}, function(start, end) {
	  return (end - start) / durationHour;
	}, function(date) {
	  return date.getUTCHours();
	});
	
	var utcHours = utcHour.range;
	
	var utcDay = newInterval(function(date) {
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCDate(date.getUTCDate() + step);
	}, function(start, end) {
	  return (end - start) / durationDay;
	}, function(date) {
	  return date.getUTCDate() - 1;
	});
	
	var utcDays = utcDay.range;
	
	function utcWeekday(i) {
	  return newInterval(function(date) {
	    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step * 7);
	  }, function(start, end) {
	    return (end - start) / durationWeek;
	  });
	}
	
	var utcSunday = utcWeekday(0);
	var utcMonday = utcWeekday(1);
	var utcTuesday = utcWeekday(2);
	var utcWednesday = utcWeekday(3);
	var utcThursday = utcWeekday(4);
	var utcFriday = utcWeekday(5);
	var utcSaturday = utcWeekday(6);
	
	var utcSundays = utcSunday.range;
	var utcMondays = utcMonday.range;
	var utcTuesdays = utcTuesday.range;
	var utcWednesdays = utcWednesday.range;
	var utcThursdays = utcThursday.range;
	var utcFridays = utcFriday.range;
	var utcSaturdays = utcSaturday.range;
	
	var utcMonth = newInterval(function(date) {
	  date.setUTCDate(1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCMonth(date.getUTCMonth() + step);
	}, function(start, end) {
	  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
	}, function(date) {
	  return date.getUTCMonth();
	});
	
	var utcMonths = utcMonth.range;
	
	var utcYear = newInterval(function(date) {
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCFullYear(date.getUTCFullYear() + step);
	}, function(start, end) {
	  return end.getUTCFullYear() - start.getUTCFullYear();
	}, function(date) {
	  return date.getUTCFullYear();
	});
	
	// An optimized implementation for this simple case.
	utcYear.every = function(k) {
	  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
	    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
	    date.setUTCMonth(0, 1);
	    date.setUTCHours(0, 0, 0, 0);
	  }, function(date, step) {
	    date.setUTCFullYear(date.getUTCFullYear() + step * k);
	  });
	};
	
	var utcYears = utcYear.range;
	
	exports.timeInterval = newInterval;
	exports.timeMillisecond = millisecond;
	exports.timeMilliseconds = milliseconds;
	exports.utcMillisecond = millisecond;
	exports.utcMilliseconds = milliseconds;
	exports.timeSecond = second;
	exports.timeSeconds = seconds;
	exports.utcSecond = second;
	exports.utcSeconds = seconds;
	exports.timeMinute = minute;
	exports.timeMinutes = minutes;
	exports.timeHour = hour;
	exports.timeHours = hours;
	exports.timeDay = day;
	exports.timeDays = days;
	exports.timeWeek = sunday;
	exports.timeWeeks = sundays;
	exports.timeSunday = sunday;
	exports.timeSundays = sundays;
	exports.timeMonday = monday;
	exports.timeMondays = mondays;
	exports.timeTuesday = tuesday;
	exports.timeTuesdays = tuesdays;
	exports.timeWednesday = wednesday;
	exports.timeWednesdays = wednesdays;
	exports.timeThursday = thursday;
	exports.timeThursdays = thursdays;
	exports.timeFriday = friday;
	exports.timeFridays = fridays;
	exports.timeSaturday = saturday;
	exports.timeSaturdays = saturdays;
	exports.timeMonth = month;
	exports.timeMonths = months;
	exports.timeYear = year;
	exports.timeYears = years;
	exports.utcMinute = utcMinute;
	exports.utcMinutes = utcMinutes;
	exports.utcHour = utcHour;
	exports.utcHours = utcHours;
	exports.utcDay = utcDay;
	exports.utcDays = utcDays;
	exports.utcWeek = utcSunday;
	exports.utcWeeks = utcSundays;
	exports.utcSunday = utcSunday;
	exports.utcSundays = utcSundays;
	exports.utcMonday = utcMonday;
	exports.utcMondays = utcMondays;
	exports.utcTuesday = utcTuesday;
	exports.utcTuesdays = utcTuesdays;
	exports.utcWednesday = utcWednesday;
	exports.utcWednesdays = utcWednesdays;
	exports.utcThursday = utcThursday;
	exports.utcThursdays = utcThursdays;
	exports.utcFriday = utcFriday;
	exports.utcFridays = utcFridays;
	exports.utcSaturday = utcSaturday;
	exports.utcSaturdays = utcSaturdays;
	exports.utcMonth = utcMonth;
	exports.utcMonths = utcMonths;
	exports.utcYear = utcYear;
	exports.utcYears = utcYears;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-time-format/ Version 2.1.1. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(80)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Time) { 'use strict';
	
	function localDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
	    date.setFullYear(d.y);
	    return date;
	  }
	  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
	}
	
	function utcDate(d) {
	  if (0 <= d.y && d.y < 100) {
	    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
	    date.setUTCFullYear(d.y);
	    return date;
	  }
	  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
	}
	
	function newYear(y) {
	  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
	}
	
	function formatLocale(locale) {
	  var locale_dateTime = locale.dateTime,
	      locale_date = locale.date,
	      locale_time = locale.time,
	      locale_periods = locale.periods,
	      locale_weekdays = locale.days,
	      locale_shortWeekdays = locale.shortDays,
	      locale_months = locale.months,
	      locale_shortMonths = locale.shortMonths;
	
	  var periodRe = formatRe(locale_periods),
	      periodLookup = formatLookup(locale_periods),
	      weekdayRe = formatRe(locale_weekdays),
	      weekdayLookup = formatLookup(locale_weekdays),
	      shortWeekdayRe = formatRe(locale_shortWeekdays),
	      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
	      monthRe = formatRe(locale_months),
	      monthLookup = formatLookup(locale_months),
	      shortMonthRe = formatRe(locale_shortMonths),
	      shortMonthLookup = formatLookup(locale_shortMonths);
	
	  var formats = {
	    "a": formatShortWeekday,
	    "A": formatWeekday,
	    "b": formatShortMonth,
	    "B": formatMonth,
	    "c": null,
	    "d": formatDayOfMonth,
	    "e": formatDayOfMonth,
	    "f": formatMicroseconds,
	    "H": formatHour24,
	    "I": formatHour12,
	    "j": formatDayOfYear,
	    "L": formatMilliseconds,
	    "m": formatMonthNumber,
	    "M": formatMinutes,
	    "p": formatPeriod,
	    "Q": formatUnixTimestamp,
	    "s": formatUnixTimestampSeconds,
	    "S": formatSeconds,
	    "u": formatWeekdayNumberMonday,
	    "U": formatWeekNumberSunday,
	    "V": formatWeekNumberISO,
	    "w": formatWeekdayNumberSunday,
	    "W": formatWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatYear,
	    "Y": formatFullYear,
	    "Z": formatZone,
	    "%": formatLiteralPercent
	  };
	
	  var utcFormats = {
	    "a": formatUTCShortWeekday,
	    "A": formatUTCWeekday,
	    "b": formatUTCShortMonth,
	    "B": formatUTCMonth,
	    "c": null,
	    "d": formatUTCDayOfMonth,
	    "e": formatUTCDayOfMonth,
	    "f": formatUTCMicroseconds,
	    "H": formatUTCHour24,
	    "I": formatUTCHour12,
	    "j": formatUTCDayOfYear,
	    "L": formatUTCMilliseconds,
	    "m": formatUTCMonthNumber,
	    "M": formatUTCMinutes,
	    "p": formatUTCPeriod,
	    "Q": formatUnixTimestamp,
	    "s": formatUnixTimestampSeconds,
	    "S": formatUTCSeconds,
	    "u": formatUTCWeekdayNumberMonday,
	    "U": formatUTCWeekNumberSunday,
	    "V": formatUTCWeekNumberISO,
	    "w": formatUTCWeekdayNumberSunday,
	    "W": formatUTCWeekNumberMonday,
	    "x": null,
	    "X": null,
	    "y": formatUTCYear,
	    "Y": formatUTCFullYear,
	    "Z": formatUTCZone,
	    "%": formatLiteralPercent
	  };
	
	  var parses = {
	    "a": parseShortWeekday,
	    "A": parseWeekday,
	    "b": parseShortMonth,
	    "B": parseMonth,
	    "c": parseLocaleDateTime,
	    "d": parseDayOfMonth,
	    "e": parseDayOfMonth,
	    "f": parseMicroseconds,
	    "H": parseHour24,
	    "I": parseHour24,
	    "j": parseDayOfYear,
	    "L": parseMilliseconds,
	    "m": parseMonthNumber,
	    "M": parseMinutes,
	    "p": parsePeriod,
	    "Q": parseUnixTimestamp,
	    "s": parseUnixTimestampSeconds,
	    "S": parseSeconds,
	    "u": parseWeekdayNumberMonday,
	    "U": parseWeekNumberSunday,
	    "V": parseWeekNumberISO,
	    "w": parseWeekdayNumberSunday,
	    "W": parseWeekNumberMonday,
	    "x": parseLocaleDate,
	    "X": parseLocaleTime,
	    "y": parseYear,
	    "Y": parseFullYear,
	    "Z": parseZone,
	    "%": parseLiteralPercent
	  };
	
	  // These recursive directive definitions must be deferred.
	  formats.x = newFormat(locale_date, formats);
	  formats.X = newFormat(locale_time, formats);
	  formats.c = newFormat(locale_dateTime, formats);
	  utcFormats.x = newFormat(locale_date, utcFormats);
	  utcFormats.X = newFormat(locale_time, utcFormats);
	  utcFormats.c = newFormat(locale_dateTime, utcFormats);
	
	  function newFormat(specifier, formats) {
	    return function(date) {
	      var string = [],
	          i = -1,
	          j = 0,
	          n = specifier.length,
	          c,
	          pad,
	          format;
	
	      if (!(date instanceof Date)) date = new Date(+date);
	
	      while (++i < n) {
	        if (specifier.charCodeAt(i) === 37) {
	          string.push(specifier.slice(j, i));
	          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	          else pad = c === "e" ? " " : "0";
	          if (format = formats[c]) c = format(date, pad);
	          string.push(c);
	          j = i + 1;
	        }
	      }
	
	      string.push(specifier.slice(j, i));
	      return string.join("");
	    };
	  }
	
	  function newParse(specifier, newDate) {
	    return function(string) {
	      var d = newYear(1900),
	          i = parseSpecifier(d, specifier, string += "", 0),
	          week, day;
	      if (i != string.length) return null;
	
	      // If a UNIX timestamp is specified, return it.
	      if ("Q" in d) return new Date(d.Q);
	
	      // The am-pm flag is 0 for AM, and 1 for PM.
	      if ("p" in d) d.H = d.H % 12 + d.p * 12;
	
	      // Convert day-of-week and week-of-year to day-of-year.
	      if ("V" in d) {
	        if (d.V < 1 || d.V > 53) return null;
	        if (!("w" in d)) d.w = 1;
	        if ("Z" in d) {
	          week = utcDate(newYear(d.y)), day = week.getUTCDay();
	          week = day > 4 || day === 0 ? d3Time.utcMonday.ceil(week) : d3Time.utcMonday(week);
	          week = d3Time.utcDay.offset(week, (d.V - 1) * 7);
	          d.y = week.getUTCFullYear();
	          d.m = week.getUTCMonth();
	          d.d = week.getUTCDate() + (d.w + 6) % 7;
	        } else {
	          week = newDate(newYear(d.y)), day = week.getDay();
	          week = day > 4 || day === 0 ? d3Time.timeMonday.ceil(week) : d3Time.timeMonday(week);
	          week = d3Time.timeDay.offset(week, (d.V - 1) * 7);
	          d.y = week.getFullYear();
	          d.m = week.getMonth();
	          d.d = week.getDate() + (d.w + 6) % 7;
	        }
	      } else if ("W" in d || "U" in d) {
	        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
	        day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	        d.m = 0;
	        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
	      }
	
	      // If a time zone is specified, all fields are interpreted as UTC and then
	      // offset according to the specified time zone.
	      if ("Z" in d) {
	        d.H += d.Z / 100 | 0;
	        d.M += d.Z % 100;
	        return utcDate(d);
	      }
	
	      // Otherwise, all fields are in local time.
	      return newDate(d);
	    };
	  }
	
	  function parseSpecifier(d, specifier, string, j) {
	    var i = 0,
	        n = specifier.length,
	        m = string.length,
	        c,
	        parse;
	
	    while (i < n) {
	      if (j >= m) return -1;
	      c = specifier.charCodeAt(i++);
	      if (c === 37) {
	        c = specifier.charAt(i++);
	        parse = parses[c in pads ? specifier.charAt(i++) : c];
	        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
	      } else if (c != string.charCodeAt(j++)) {
	        return -1;
	      }
	    }
	
	    return j;
	  }
	
	  function parsePeriod(d, string, i) {
	    var n = periodRe.exec(string.slice(i));
	    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortWeekday(d, string, i) {
	    var n = shortWeekdayRe.exec(string.slice(i));
	    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseWeekday(d, string, i) {
	    var n = weekdayRe.exec(string.slice(i));
	    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseShortMonth(d, string, i) {
	    var n = shortMonthRe.exec(string.slice(i));
	    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseMonth(d, string, i) {
	    var n = monthRe.exec(string.slice(i));
	    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
	  }
	
	  function parseLocaleDateTime(d, string, i) {
	    return parseSpecifier(d, locale_dateTime, string, i);
	  }
	
	  function parseLocaleDate(d, string, i) {
	    return parseSpecifier(d, locale_date, string, i);
	  }
	
	  function parseLocaleTime(d, string, i) {
	    return parseSpecifier(d, locale_time, string, i);
	  }
	
	  function formatShortWeekday(d) {
	    return locale_shortWeekdays[d.getDay()];
	  }
	
	  function formatWeekday(d) {
	    return locale_weekdays[d.getDay()];
	  }
	
	  function formatShortMonth(d) {
	    return locale_shortMonths[d.getMonth()];
	  }
	
	  function formatMonth(d) {
	    return locale_months[d.getMonth()];
	  }
	
	  function formatPeriod(d) {
	    return locale_periods[+(d.getHours() >= 12)];
	  }
	
	  function formatUTCShortWeekday(d) {
	    return locale_shortWeekdays[d.getUTCDay()];
	  }
	
	  function formatUTCWeekday(d) {
	    return locale_weekdays[d.getUTCDay()];
	  }
	
	  function formatUTCShortMonth(d) {
	    return locale_shortMonths[d.getUTCMonth()];
	  }
	
	  function formatUTCMonth(d) {
	    return locale_months[d.getUTCMonth()];
	  }
	
	  function formatUTCPeriod(d) {
	    return locale_periods[+(d.getUTCHours() >= 12)];
	  }
	
	  return {
	    format: function(specifier) {
	      var f = newFormat(specifier += "", formats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    parse: function(specifier) {
	      var p = newParse(specifier += "", localDate);
	      p.toString = function() { return specifier; };
	      return p;
	    },
	    utcFormat: function(specifier) {
	      var f = newFormat(specifier += "", utcFormats);
	      f.toString = function() { return specifier; };
	      return f;
	    },
	    utcParse: function(specifier) {
	      var p = newParse(specifier, utcDate);
	      p.toString = function() { return specifier; };
	      return p;
	    }
	  };
	}
	
	var pads = {"-": "", "_": " ", "0": "0"};
	var numberRe = /^\s*\d+/;
	var percentRe = /^%/;
	var requoteRe = /[\\^$*+?|[\]().{}]/g;
	
	function pad(value, fill, width) {
	  var sign = value < 0 ? "-" : "",
	      string = (sign ? -value : value) + "",
	      length = string.length;
	  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
	}
	
	function requote(s) {
	  return s.replace(requoteRe, "\\$&");
	}
	
	function formatRe(names) {
	  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
	}
	
	function formatLookup(names) {
	  var map = {}, i = -1, n = names.length;
	  while (++i < n) map[names[i].toLowerCase()] = i;
	  return map;
	}
	
	function parseWeekdayNumberSunday(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 1));
	  return n ? (d.w = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekdayNumberMonday(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 1));
	  return n ? (d.u = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberSunday(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.U = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberISO(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.V = +n[0], i + n[0].length) : -1;
	}
	
	function parseWeekNumberMonday(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.W = +n[0], i + n[0].length) : -1;
	}
	
	function parseFullYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 4));
	  return n ? (d.y = +n[0], i + n[0].length) : -1;
	}
	
	function parseYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
	}
	
	function parseZone(d, string, i) {
	  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
	  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
	}
	
	function parseMonthNumber(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
	}
	
	function parseDayOfMonth(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseDayOfYear(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
	}
	
	function parseHour24(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.H = +n[0], i + n[0].length) : -1;
	}
	
	function parseMinutes(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.M = +n[0], i + n[0].length) : -1;
	}
	
	function parseSeconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 2));
	  return n ? (d.S = +n[0], i + n[0].length) : -1;
	}
	
	function parseMilliseconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 3));
	  return n ? (d.L = +n[0], i + n[0].length) : -1;
	}
	
	function parseMicroseconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i, i + 6));
	  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
	}
	
	function parseLiteralPercent(d, string, i) {
	  var n = percentRe.exec(string.slice(i, i + 1));
	  return n ? i + n[0].length : -1;
	}
	
	function parseUnixTimestamp(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.Q = +n[0], i + n[0].length) : -1;
	}
	
	function parseUnixTimestampSeconds(d, string, i) {
	  var n = numberRe.exec(string.slice(i));
	  return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
	}
	
	function formatDayOfMonth(d, p) {
	  return pad(d.getDate(), p, 2);
	}
	
	function formatHour24(d, p) {
	  return pad(d.getHours(), p, 2);
	}
	
	function formatHour12(d, p) {
	  return pad(d.getHours() % 12 || 12, p, 2);
	}
	
	function formatDayOfYear(d, p) {
	  return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
	}
	
	function formatMilliseconds(d, p) {
	  return pad(d.getMilliseconds(), p, 3);
	}
	
	function formatMicroseconds(d, p) {
	  return formatMilliseconds(d, p) + "000";
	}
	
	function formatMonthNumber(d, p) {
	  return pad(d.getMonth() + 1, p, 2);
	}
	
	function formatMinutes(d, p) {
	  return pad(d.getMinutes(), p, 2);
	}
	
	function formatSeconds(d, p) {
	  return pad(d.getSeconds(), p, 2);
	}
	
	function formatWeekdayNumberMonday(d) {
	  var day = d.getDay();
	  return day === 0 ? 7 : day;
	}
	
	function formatWeekNumberSunday(d, p) {
	  return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
	}
	
	function formatWeekNumberISO(d, p) {
	  var day = d.getDay();
	  d = (day >= 4 || day === 0) ? d3Time.timeThursday(d) : d3Time.timeThursday.ceil(d);
	  return pad(d3Time.timeThursday.count(d3Time.timeYear(d), d) + (d3Time.timeYear(d).getDay() === 4), p, 2);
	}
	
	function formatWeekdayNumberSunday(d) {
	  return d.getDay();
	}
	
	function formatWeekNumberMonday(d, p) {
	  return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
	}
	
	function formatYear(d, p) {
	  return pad(d.getFullYear() % 100, p, 2);
	}
	
	function formatFullYear(d, p) {
	  return pad(d.getFullYear() % 10000, p, 4);
	}
	
	function formatZone(d) {
	  var z = d.getTimezoneOffset();
	  return (z > 0 ? "-" : (z *= -1, "+"))
	      + pad(z / 60 | 0, "0", 2)
	      + pad(z % 60, "0", 2);
	}
	
	function formatUTCDayOfMonth(d, p) {
	  return pad(d.getUTCDate(), p, 2);
	}
	
	function formatUTCHour24(d, p) {
	  return pad(d.getUTCHours(), p, 2);
	}
	
	function formatUTCHour12(d, p) {
	  return pad(d.getUTCHours() % 12 || 12, p, 2);
	}
	
	function formatUTCDayOfYear(d, p) {
	  return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
	}
	
	function formatUTCMilliseconds(d, p) {
	  return pad(d.getUTCMilliseconds(), p, 3);
	}
	
	function formatUTCMicroseconds(d, p) {
	  return formatUTCMilliseconds(d, p) + "000";
	}
	
	function formatUTCMonthNumber(d, p) {
	  return pad(d.getUTCMonth() + 1, p, 2);
	}
	
	function formatUTCMinutes(d, p) {
	  return pad(d.getUTCMinutes(), p, 2);
	}
	
	function formatUTCSeconds(d, p) {
	  return pad(d.getUTCSeconds(), p, 2);
	}
	
	function formatUTCWeekdayNumberMonday(d) {
	  var dow = d.getUTCDay();
	  return dow === 0 ? 7 : dow;
	}
	
	function formatUTCWeekNumberSunday(d, p) {
	  return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
	}
	
	function formatUTCWeekNumberISO(d, p) {
	  var day = d.getUTCDay();
	  d = (day >= 4 || day === 0) ? d3Time.utcThursday(d) : d3Time.utcThursday.ceil(d);
	  return pad(d3Time.utcThursday.count(d3Time.utcYear(d), d) + (d3Time.utcYear(d).getUTCDay() === 4), p, 2);
	}
	
	function formatUTCWeekdayNumberSunday(d) {
	  return d.getUTCDay();
	}
	
	function formatUTCWeekNumberMonday(d, p) {
	  return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
	}
	
	function formatUTCYear(d, p) {
	  return pad(d.getUTCFullYear() % 100, p, 2);
	}
	
	function formatUTCFullYear(d, p) {
	  return pad(d.getUTCFullYear() % 10000, p, 4);
	}
	
	function formatUTCZone() {
	  return "+0000";
	}
	
	function formatLiteralPercent() {
	  return "%";
	}
	
	function formatUnixTimestamp(d) {
	  return +d;
	}
	
	function formatUnixTimestampSeconds(d) {
	  return Math.floor(+d / 1000);
	}
	
	var locale;
	
	
	
	
	
	defaultLocale({
	  dateTime: "%x, %X",
	  date: "%-m/%-d/%Y",
	  time: "%-I:%M:%S %p",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	
	function defaultLocale(definition) {
	  locale = formatLocale(definition);
	  exports.timeFormat = locale.format;
	  exports.timeParse = locale.parse;
	  exports.utcFormat = locale.utcFormat;
	  exports.utcParse = locale.utcParse;
	  return locale;
	}
	
	var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
	
	function formatIsoNative(date) {
	  return date.toISOString();
	}
	
	var formatIso = Date.prototype.toISOString
	    ? formatIsoNative
	    : exports.utcFormat(isoSpecifier);
	
	function parseIsoNative(string) {
	  var date = new Date(string);
	  return isNaN(date) ? null : date;
	}
	
	var parseIso = +new Date("2000-01-01T00:00:00.000Z")
	    ? parseIsoNative
	    : exports.utcParse(isoSpecifier);
	
	exports.timeFormatDefaultLocale = defaultLocale;
	exports.timeFormatLocale = formatLocale;
	exports.isoFormat = formatIso;
	exports.isoParse = parseIso;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;
	
	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(263)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(264)();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(8);
	var warning = __webpack_require__(9);
	var assign = __webpack_require__(4);
	
	var ReactPropTypesSecret = __webpack_require__(11);
	var checkPropTypes = __webpack_require__(10);
	
	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */
	
	  var ANONYMOUS = '<<anonymous>>';
	
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };
	
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/
	
	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;
	
	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	
	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }
	
	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	
	    return chainedCheckType;
	  }
	
	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }
	
	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }
	
	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }
	
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	
	    return createChainableTypeChecker(validate);
	  }
	
	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }
	
	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }
	
	        return true;
	      default:
	        return false;
	    }
	  }
	
	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }
	
	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }
	
	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }
	
	    return false;
	  }
	
	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }
	
	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }
	
	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }
	
	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }
	
	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(8);
	var ReactPropTypesSecret = __webpack_require__(11);
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };
	
	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(262);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactD3Cloud = __webpack_require__(500);
	
	var _reactD3Cloud2 = _interopRequireDefault(_reactD3Cloud);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class WordCloudComponent extends _react2.default.Component {
	
	  constructor(props) {
	    super(props);
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'word-cloud-container' },
	      _react2.default.createElement(_reactD3Cloud2.default, {
	        data: this.props.data,
	        width: this.props.width,
	        height: this.props.height,
	        padding: this.props.padding
	      })
	    );
	  }
	}
	
	WordCloudComponent.propTypes = {
	  width: _propTypes2.default.number,
	  height: _propTypes2.default.number,
	  data: _propTypes2.default.array,
	  padding: _propTypes2.default.number
	};
	
	exports.default = WordCloudComponent;

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _WordCloud = __webpack_require__(501);
	
	var _WordCloud2 = _interopRequireDefault(_WordCloud);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = _WordCloud2.default;

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _reactFauxDom = __webpack_require__(502);
	
	var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);
	
	var _d3Selection = __webpack_require__(18);
	
	var _d3Scale = __webpack_require__(79);
	
	var _d3Cloud = __webpack_require__(518);
	
	var _d3Cloud2 = _interopRequireDefault(_d3Cloud);
	
	var _defaultMappers = __webpack_require__(519);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var fill = (0, _d3Scale.scaleOrdinal)(_d3Scale.schemeCategory10);
	
	var WordCloud = function (_Component) {
	  _inherits(WordCloud, _Component);
	
	  function WordCloud() {
	    _classCallCheck(this, WordCloud);
	
	    return _possibleConstructorReturn(this, (WordCloud.__proto__ || Object.getPrototypeOf(WordCloud)).apply(this, arguments));
	  }
	
	  _createClass(WordCloud, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.wordCloud = _reactFauxDom2.default.createElement('div');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          data = _props.data,
	          width = _props.width,
	          height = _props.height,
	          padding = _props.padding,
	          font = _props.font,
	          fontSizeMapper = _props.fontSizeMapper,
	          rotate = _props.rotate;
	
	      var wordCounts = data.map(function (text) {
	        return _extends({}, text);
	      });
	
	      // clear old words
	      (0, _d3Selection.select)(this.wordCloud).selectAll('*').remove();
	
	      // render based on new data
	      var layout = (0, _d3Cloud2.default)().size([width, height]).font(font).words(wordCounts).padding(padding).rotate(rotate).fontSize(fontSizeMapper).on('end', function (words) {
	        (0, _d3Selection.select)(_this2.wordCloud).append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(words).enter().append('text').style('font-size', function (d) {
	          return d.size + 'px';
	        }).style('font-family', font).style('fill', function (d, i) {
	          return fill(i);
	        }).attr('text-anchor', 'middle').attr('transform', function (d) {
	          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
	        }).text(function (d) {
	          return d.text;
	        });
	      });
	
	      layout.start();
	
	      return this.wordCloud.toReact();
	    }
	  }]);
	
	  return WordCloud;
	}(_react.Component);
	
	WordCloud.defaultProps = {
	  width: 700,
	  height: 600,
	  padding: 5,
	  font: 'serif',
	  fontSizeMapper: _defaultMappers.defaultFontSizeMapper,
	  rotate: 0
	};
	exports.default = WordCloud;

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(503)
	var Window = __webpack_require__(515)
	var core = __webpack_require__(516)
	var anim = __webpack_require__(517)
	
	var ReactFauxDOM = {
	  Element: Element,
	  defaultView: Window,
	  mixins: {
	    core: core,
	    anim: anim
	  },
	  createElement: function (nodeName) {
	    return new Element(nodeName)
	  },
	  createElementNS: function (namespace, nodeName) {
	    return this.createElement(nodeName)
	  },
	  compareDocumentPosition: function () {
	    // The selector engine tries to validate with this, but we don't care.
	    // 8 = DOCUMENT_POSITION_CONTAINS, so we say all nodes are in this document.
	    return 8
	  }
	}
	
	Element.prototype.ownerDocument = ReactFauxDOM
	
	module.exports = ReactFauxDOM


/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
	var styleAttr = __webpack_require__(504)
	var querySelectorAll = __webpack_require__(505)
	var camelCase = __webpack_require__(509)
	var isString = __webpack_require__(510)
	var isUndefined = __webpack_require__(511)
	var assign = __webpack_require__(512)
	var mapValues = __webpack_require__(513)
	var styleCamelCase = __webpack_require__(514)
	
	function Element (nodeName, parentNode) {
	  this.nodeName = nodeName
	  this.parentNode = parentNode
	  this.childNodes = []
	  this.eventListeners = {}
	  this.text = ''
	  var self = this
	  var props = this.props = {
	    ref: function (component) {
	      self.component = component
	    },
	    style: {
	      setProperty: function (name, value) {
	        props.style[styleCamelCase(name)] = value
	      },
	      getProperty: function (name) {
	        return props.style[styleCamelCase(name)] || ''
	      },
	      removeProperty: function (name) {
	        delete props.style[styleCamelCase(name)]
	      }
	    }
	  }
	
	  this.style = props.style
	}
	
	Element.prototype.nodeType = 1
	
	// This was easy to do with Vim.
	// Just saying.
	Element.prototype.eventNameMappings = {
	  'blur': 'onBlur',
	  'change': 'onChange',
	  'click': 'onClick',
	  'contextmenu': 'onContextMenu',
	  'copy': 'onCopy',
	  'cut': 'onCut',
	  'doubleclick': 'onDoubleClick',
	  'drag': 'onDrag',
	  'dragend': 'onDragEnd',
	  'dragenter': 'onDragEnter',
	  'dragexit': 'onDragExit',
	  'dragleave': 'onDragLeave',
	  'dragover': 'onDragOver',
	  'dragstart': 'onDragStart',
	  'drop': 'onDrop',
	  'error': 'onError',
	  'focus': 'onFocus',
	  'input': 'onInput',
	  'keydown': 'onKeyDown',
	  'keypress': 'onKeyPress',
	  'keyup': 'onKeyUp',
	  'load': 'onLoad',
	  'mousedown': 'onMouseDown',
	  'mouseenter': 'onMouseEnter',
	  'mouseleave': 'onMouseLeave',
	  'mousemove': 'onMouseMove',
	  'mouseout': 'onMouseOut',
	  'mouseover': 'onMouseOver',
	  'mouseup': 'onMouseUp',
	  'paste': 'onPaste',
	  'scroll': 'onScroll',
	  'submit': 'onSubmit',
	  'touchcancel': 'onTouchCancel',
	  'touchend': 'onTouchEnd',
	  'touchmove': 'onTouchMove',
	  'touchstart': 'onTouchStart',
	  'wheel': 'onWheel'
	}
	
	Element.prototype.skipNameTransformationExpressions = [
	  /^data-/,
	  /^aria-/
	]
	
	Element.prototype.attributeNameMappings = {
	  'class': 'className'
	}
	
	Element.prototype.attributeToPropName = function (name) {
	  var skipTransformMatches = this.skipNameTransformationExpressions.map(function (expr) {
	    return expr.test(name)
	  })
	
	  if (skipTransformMatches.some(Boolean)) {
	    return name
	  } else {
	    return this.attributeNameMappings[name] || camelCase(name)
	  }
	}
	
	Element.prototype.setAttribute = function (name, value) {
	  if (name === 'style' && isString(value)) {
	    var styles = styleAttr.parse(value)
	
	    for (var key in styles) {
	      this.style.setProperty(key, styles[key])
	    }
	  } else {
	    this.props[this.attributeToPropName(name)] = value
	  }
	}
	
	Element.prototype.getAttribute = function (name) {
	  return this.props[this.attributeToPropName(name)]
	}
	
	Element.prototype.getAttributeNode = function (name) {
	  var value = this.getAttribute(name)
	
	  if (!isUndefined(value)) {
	    return {
	      value: value,
	      specified: true
	    }
	  }
	}
	
	Element.prototype.removeAttribute = function (name) {
	  delete this.props[this.attributeToPropName(name)]
	}
	
	Element.prototype.eventToPropName = function (name) {
	  return this.eventNameMappings[name] || name
	}
	
	Element.prototype.addEventListener = function (name, fn) {
	  var prop = this.eventToPropName(name)
	  this.eventListeners[prop] = this.eventListeners[prop] || []
	  this.eventListeners[prop].push(fn)
	}
	
	Element.prototype.removeEventListener = function (name, fn) {
	  var listeners = this.eventListeners[this.eventToPropName(name)]
	
	  if (listeners) {
	    var match = listeners.indexOf(fn)
	
	    if (match !== -1) {
	      listeners.splice(match, 1)
	    }
	  }
	}
	
	Element.prototype.appendChild = function (el) {
	  el.parentNode = this
	  this.childNodes.push(el)
	  return el
	}
	
	Element.prototype.insertBefore = function (el, before) {
	  var index = this.childNodes.indexOf(before)
	  el.parentNode = this
	
	  if (index !== -1) {
	    this.childNodes.splice(index, 0, el)
	  } else {
	    this.childNodes.push(el)
	  }
	
	  return el
	}
	
	Element.prototype.removeChild = function (child) {
	  var target = this.childNodes.indexOf(child)
	  this.childNodes.splice(target, 1)
	}
	
	Element.prototype.querySelector = function () {
	  return this.querySelectorAll.apply(this, arguments)[0] || null
	}
	
	Element.prototype.querySelectorAll = function (selector) {
	  if (!selector) {
	    throw new Error('Not enough arguments')
	  }
	
	  return querySelectorAll(selector, this)
	}
	
	Element.prototype.getElementsByTagName = function (nodeName) {
	  var children = this.children
	
	  if (children.length === 0) {
	    return []
	  } else {
	    var matches
	
	    if (nodeName !== '*') {
	      matches = children.filter(function (el) {
	        return el.nodeName === nodeName
	      })
	    } else {
	      matches = children
	    }
	
	    var childMatches = children.map(function (el) {
	      return el.getElementsByTagName(nodeName)
	    })
	
	    return matches.concat.apply(matches, childMatches)
	  }
	}
	
	Element.prototype.getElementById = function (id) {
	  var children = this.children
	
	  if (children.length === 0) {
	    return null
	  } else {
	    var match = children.filter(function (el) {
	      return el.getAttribute('id') === id
	    })[0]
	
	    if (match) {
	      return match
	    } else {
	      var childMatches = children.map(function (el) {
	        return el.getElementById(id)
	      })
	
	      return childMatches.filter(function (match) {
	        return match !== null
	      })[0] || null
	    }
	  }
	}
	
	Element.prototype.getBoundingClientRect = function () {
	  if (!this.component) {
	    return undefined
	  }
	
	  return this.component.getBoundingClientRect()
	}
	
	Element.prototype.toReact = function (index) {
	  index = index || 0
	  var props = assign({}, this.props)
	  props.style = assign({}, props.style)
	
	  var originalElement = this
	
	  function uniqueKey () {
	    return 'faux-dom-' + index
	  }
	
	  if (isUndefined(props.key)) {
	    props.key = uniqueKey()
	  }
	
	  delete props.style.setProperty
	  delete props.style.getProperty
	  delete props.style.removeProperty
	
	  assign(props, mapValues(this.eventListeners, function (listeners) {
	    return function (syntheticEvent) {
	      var event
	
	      if (syntheticEvent) {
	        event = syntheticEvent.nativeEvent
	        event.syntheticEvent = syntheticEvent
	      }
	
	      mapValues(listeners, function (listener) {
	        listener.call(originalElement, event)
	      })
	    }
	  }))
	
	  return React.createElement(this.nodeName, props, this.text || this.children.map(function (el, i) {
	    if (el instanceof Element) {
	      return el.toReact(i)
	    } else {
	      return el
	    }
	  }))
	}
	
	Object.defineProperties(Element.prototype, {
	  nextSibling: {
	    get: function () {
	      var siblings = this.parentNode.children
	      var me = siblings.indexOf(this)
	      return siblings[me + 1]
	    }
	  },
	  previousSibling: {
	    get: function () {
	      var siblings = this.parentNode.children
	      var me = siblings.indexOf(this)
	      return siblings[me - 1]
	    }
	  },
	  innerHTML: {
	    get: function () {
	      return this.text
	    },
	    set: function (text) {
	      this.text = text
	    }
	  },
	  textContent: {
	    get: function () {
	      return this.text
	    },
	    set: function (text) {
	      this.text = text
	    }
	  },
	  children: {
	    get: function () {
	      // So far nodes created by this library are all of nodeType 1 (elements),
	      // but this could change in the future.
	      return this.childNodes.filter(function (el) {
	        if (!el.nodeType) {
	          // It's a React element, we always add it
	          return true
	        }
	
	        // It's a HTML node. We want to filter to have only nodes with type 1
	        return el.nodeType === 1
	      })
	    }
	  }
	})
	
	// These NS methods are called by things like D3 if it spots a namespace.
	// Like xlink:href. I don't care about namespaces, so these functions have NS aliases created.
	var namespaceMethods = [
	  'setAttribute',
	  'getAttribute',
	  'getAttributeNode',
	  'removeAttribute',
	  'getElementsByTagName',
	  'getElementById'
	]
	
	namespaceMethods.forEach(function (name) {
	  var fn = Element.prototype[name]
	  Element.prototype[name + 'NS'] = function () {
	    return fn.apply(this, Array.prototype.slice.call(arguments, 1))
	  }
	})
	
	module.exports = Element


/***/ }),

/***/ 504:
/***/ (function(module, exports) {

	
	
	/*:: type Attr = { [key: string]: string | number } */
	/*:: type Opts = { preserveNumbers: ?boolean } */
	
	/*
	
	style-attr
	====
	
	Very simple parsing and stringifying of style attributes.
	
	`parse`
	----
	
	Convert a style attribute string to an object.
	
	*/
	
	/*:: declare function parse (raw: string, opts: ?Opts): Attr */
	function parse(raw, opts) {
	  opts = opts || {};
	
	  var preserveNumbers = opts.preserveNumbers;
	  var trim = function (s) {
	    return s.trim();
	  };
	  var obj = {};
	
	  getKeyValueChunks(raw).map(trim).filter(Boolean).forEach(function (item) {
	    // split with `.indexOf` rather than `.split` because the value may also contain colons.
	    var pos = item.indexOf(':');
	    var key = item.substr(0, pos).trim();
	    var val = item.substr(pos + 1).trim();
	    if (preserveNumbers && isNumeric(val)) {
	      val = Number(val);
	    }
	
	    obj[key] = val;
	  });
	
	  return obj;
	}
	
	/*
	
	`isNumeric`
	----
	
	Check if a value is numeric.
	Via: https://stackoverflow.com/a/1830844/9324
	
	*/
	
	/*:: declare function isNumeric (n: any): boolean */
	
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	/*
	
	`getKeyValueChunks`
	----
	
	Split a string into chunks matching `<key>: <value>`
	
	*/
	/*:: declare function getKeyValueChunks (raw: string): Array<string> */
	function getKeyValueChunks(raw) {
	  var chunks = [];
	  var offset = 0;
	  var sep = ';';
	  var hasUnclosedUrl = /url\([^\)]+$/;
	  var chunk = '';
	  var nextSplit;
	  while (offset < raw.length) {
	    nextSplit = raw.indexOf(sep, offset);
	    if (nextSplit === -1) {
	      nextSplit = raw.length;
	    }
	
	    chunk += raw.substring(offset, nextSplit);
	
	    // data URIs can contain semicolons, so make sure we get the whole thing
	    if (hasUnclosedUrl.test(chunk)) {
	      chunk += ';';
	      offset = nextSplit + 1;
	      continue;
	    }
	
	    chunks.push(chunk);
	    chunk = '';
	    offset = nextSplit + 1;
	  }
	
	  return chunks;
	}
	
	/*
	
	`stringify`
	----
	
	Convert an object into an attribute string
	
	*/
	/*:: declare function stringify (obj: Attr): string */
	function stringify(obj) {
	  return Object.keys(obj).map(function (key) {
	    return key + ':' + obj[key];
	  }).join(';');
	}
	
	/*
	
	`normalize`
	----
	
	Normalize an attribute string (eg. collapse duplicates)
	
	*/
	/*:: declare function normalize (str: string, opts: ?Opts): string */
	function normalize(str, opts) {
	  return stringify(parse(str, opts));
	}
	
	module.exports.parse = parse;
	module.exports.stringify = stringify;
	module.exports.normalize = normalize;

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(506);

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * css3 selector engine for ie6-8
	 * @author yiminghe@gmail.com
	 */
	
	var util = __webpack_require__(507);
	var parser = __webpack_require__(508);
	
	var EXPANDO_SELECTOR_KEY = '_ks_data_selector_id_',
	  caches = {},
	  isContextXML,
	  uuid = 0,
	  subMatchesCache = {},
	  getAttr = function (el, name) {
	    if (isContextXML) {
	      return util.getSimpleAttr(el, name);
	    } else {
	      return util.attr(el, name);
	    }
	  },
	  hasSingleClass = util.hasSingleClass,
	  isTag = util.isTag,
	  aNPlusB = /^(([+-]?(?:\d+)?)?n)?([+-]?\d+)?$/;
	
	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	var unescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	  unescapeFn = function (_, escaped) {
	    var high = '0x' + escaped - 0x10000;
	    // NaN means non-codepoint
	    return isNaN(high) ?
	      escaped :
	      // BMP codepoint
	      high < 0 ?
	        String.fromCharCode(high + 0x10000) :
	        // Supplemental Plane codepoint (surrogate pair)
	        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	  };
	
	var matchExpr;
	
	var pseudoFnExpr = {
	  'nth-child': function (el, param) {
	    var ab = getAb(param),
	      a = ab.a,
	      b = ab.b;
	    if (a === 0 && b === 0) {
	      return 0;
	    }
	    var index = 0,
	      parent = el.parentNode;
	    if (parent) {
	      var childNodes = parent.childNodes,
	        count = 0,
	        child,
	        ret,
	        len = childNodes.length;
	      for (; count < len; count++) {
	        child = childNodes[count];
	        if (child.nodeType === 1) {
	          index++;
	          ret = matchIndexByAb(index, a, b, child === el);
	          if (ret !== undefined) {
	            return ret;
	          }
	        }
	      }
	    }
	    return 0;
	  },
	  'nth-last-child': function (el, param) {
	    var ab = getAb(param),
	      a = ab.a,
	      b = ab.b;
	    if (a === 0 && b === 0) {
	      return 0;
	    }
	    var index = 0,
	      parent = el.parentNode;
	    if (parent) {
	      var childNodes = parent.childNodes,
	        len = childNodes.length,
	        count = len - 1,
	        child,
	        ret;
	      for (; count >= 0; count--) {
	        child = childNodes[count];
	        if (child.nodeType === 1) {
	          index++;
	          ret = matchIndexByAb(index, a, b, child === el);
	          if (ret !== undefined) {
	            return ret;
	          }
	        }
	      }
	    }
	    return 0;
	  },
	  'nth-of-type': function (el, param) {
	    var ab = getAb(param),
	      a = ab.a,
	      b = ab.b;
	    if (a === 0 && b === 0) {
	      return 0;
	    }
	    var index = 0,
	      parent = el.parentNode;
	    if (parent) {
	      var childNodes = parent.childNodes,
	        elType = el.tagName,
	        count = 0,
	        child,
	        ret,
	        len = childNodes.length;
	      for (; count < len; count++) {
	        child = childNodes[count];
	        if (child.tagName === elType) {
	          index++;
	          ret = matchIndexByAb(index, a, b, child === el);
	          if (ret !== undefined) {
	            return ret;
	          }
	        }
	      }
	    }
	    return 0;
	  },
	  'nth-last-of-type': function (el, param) {
	    var ab = getAb(param),
	      a = ab.a,
	      b = ab.b;
	    if (a === 0 && b === 0) {
	      return 0;
	    }
	    var index = 0,
	      parent = el.parentNode;
	    if (parent) {
	      var childNodes = parent.childNodes,
	        len = childNodes.length,
	        elType = el.tagName,
	        count = len - 1,
	        child,
	        ret;
	      for (; count >= 0; count--) {
	        child = childNodes[count];
	        if (child.tagName === elType) {
	          index++;
	          ret = matchIndexByAb(index, a, b, child === el);
	          if (ret !== undefined) {
	            return ret;
	          }
	        }
	      }
	    }
	    return 0;
	  },
	  lang: function (el, lang) {
	    var elLang;
	    lang = unEscape(lang.toLowerCase());
	    do {
	      if ((elLang = (isContextXML ?
	        el.getAttribute('xml:lang') || el.getAttribute('lang') :
	          el.lang))) {
	        elLang = elLang.toLowerCase();
	        return elLang === lang || elLang.indexOf(lang + '-') === 0;
	      }
	    } while ((el = el.parentNode) && el.nodeType === 1);
	    return false;
	  },
	  not: function (el, negationArg) {
	    return !matchExpr[negationArg.t](el, negationArg.value);
	  }
	};
	
	var pseudoIdentExpr = {
	  empty: function (el) {
	    var childNodes = el.childNodes,
	      index = 0,
	      len = childNodes.length - 1,
	      child,
	      nodeType;
	    for (; index < len; index++) {
	      child = childNodes[index];
	      nodeType = child.nodeType;
	      // only element nodes and content nodes
	      // (such as Dom [Dom-LEVEL-3-CORE] text nodes,
	      // CDATA nodes, and entity references
	      if (nodeType === 1 || nodeType === 3 || nodeType === 4 || nodeType === 5) {
	        return 0;
	      }
	    }
	    return 1;
	  },
	  root: function (el) {
	    if (el.nodeType === 9) {
	      return true;
	    }
	    return el.ownerDocument &&
	      el === el.ownerDocument.documentElement;
	  },
	  'first-child': function (el) {
	    return pseudoFnExpr['nth-child'](el, 1);
	  },
	  'last-child': function (el) {
	    return pseudoFnExpr['nth-last-child'](el, 1);
	  },
	  'first-of-type': function (el) {
	    return pseudoFnExpr['nth-of-type'](el, 1);
	  },
	  'last-of-type': function (el) {
	    return pseudoFnExpr['nth-last-of-type'](el, 1);
	  },
	  'only-child': function (el) {
	    return pseudoIdentExpr['first-child'](el) &&
	      pseudoIdentExpr['last-child'](el);
	  },
	  'only-of-type': function (el) {
	    return pseudoIdentExpr['first-of-type'](el) &&
	      pseudoIdentExpr['last-of-type'](el);
	  },
	  focus: function (el) {
	    var doc = el.ownerDocument;
	    return doc && el === doc.activeElement &&
	      (!doc.hasFocus || doc.hasFocus()) && !!(el.type || el.href || el.tabIndex >= 0);
	  },
	  target: function (el) {
	    var hash = location.hash;
	    return hash && hash.slice(1) === getAttr(el, 'id');
	  },
	  enabled: function (el) {
	    return !el.disabled;
	  },
	  disabled: function (el) {
	    return el.disabled;
	  },
	  checked: function (el) {
	    var nodeName = el.nodeName.toLowerCase();
	    return (nodeName === 'input' && el.checked) ||
	      (nodeName === 'option' && el.selected);
	  }
	};
	
	var attributeExpr = {
	  '~=': function (elValue, value) {
	    if (!value || value.indexOf(' ') > -1) {
	      return 0;
	    }
	    return (' ' + elValue + ' ').indexOf(' ' + value + ' ') !== -1;
	  },
	  '|=': function (elValue, value) {
	    return (' ' + elValue).indexOf(' ' + value + '-') !== -1;
	  },
	  '^=': function (elValue, value) {
	    return value && util.startsWith(elValue, value);
	  },
	  '$=': function (elValue, value) {
	    return value && util.endsWith(elValue, value);
	  },
	  '*=': function (elValue, value) {
	    return value && elValue.indexOf(value) !== -1;
	  },
	  '=': function (elValue, value) {
	    return elValue === value;
	  }
	};
	
	var relativeExpr = {
	  '>': {
	    dir: 'parentNode',
	    immediate: 1
	  },
	  ' ': {
	    dir: 'parentNode'
	  },
	  '+': {
	    dir: 'previousSibling',
	    immediate: 1
	  },
	  '~': {
	    dir: 'previousSibling'
	  }
	};
	
	matchExpr = {
	  tag: isTag,
	  cls: hasSingleClass,
	  id: function (el, value) {
	    return getAttr(el, 'id') === value;
	  },
	  attrib: function (el, value) {
	    var name = value.ident;
	    if (!isContextXML) {
	      name = name.toLowerCase();
	    }
	    var elValue = getAttr(el, name);
	    var match = value.match;
	    if (!match && elValue !== undefined) {
	      return 1;
	    } else if (match) {
	      if (elValue === undefined) {
	        return 0;
	      }
	      var matchFn = attributeExpr[match];
	      if (matchFn) {
	        return matchFn(elValue + '', value.value + '');
	      }
	    }
	    return 0;
	  },
	  pseudo: function (el, value) {
	    var fn, fnStr, ident;
	    if ((fnStr = value.fn)) {
	      if (!(fn = pseudoFnExpr[fnStr])) {
	        throw new SyntaxError('Syntax error: not support pseudo: ' + fnStr);
	      }
	      return fn(el, value.param);
	    }
	    if ((ident = value.ident)) {
	      if (!pseudoIdentExpr[ident]) {
	        throw new SyntaxError('Syntax error: not support pseudo: ' + ident);
	      }
	      return pseudoIdentExpr[ident](el);
	    }
	    return 0;
	  }
	};
	
	function unEscape(str) {
	  return str.replace(unescape, unescapeFn);
	}
	
	parser.lexer.yy = {
	  trim: util.trim,
	  unEscape: unEscape,
	  unEscapeStr: function (str) {
	    return this.unEscape(str.slice(1, -1));
	  }
	};
	
	function resetStatus() {
	  subMatchesCache = {};
	}
	
	function dir(el, direction) {
	  do {
	    el = el[direction];
	  } while (el && el.nodeType !== 1);
	  return el;
	}
	
	function getAb(param) {
	  var a = 0,
	    match,
	    b = 0;
	  if (typeof param === 'number') {
	    b = param;
	  } else if (param === 'odd') {
	    a = 2;
	    b = 1;
	  } else if (param === 'even') {
	    a = 2;
	    b = 0;
	  } else if ((match = param.replace(/\s/g, '').match(aNPlusB))) {
	    if (match[1]) {
	      a = parseInt(match[2], 10);
	      if (isNaN(a)) {
	        if (match[2] === '-') {
	          a = -1;
	        } else {
	          a = 1;
	        }
	      }
	    } else {
	      a = 0;
	    }
	    b = parseInt(match[3], 10) || 0;
	  }
	  return {
	    a: a,
	    b: b
	  };
	}
	
	function matchIndexByAb(index, a, b, eq) {
	  if (a === 0) {
	    if (index === b) {
	      return eq;
	    }
	  } else {
	    if ((index - b) / a >= 0 && (index - b) % a === 0 && eq) {
	      return 1;
	    }
	  }
	  return undefined;
	}
	
	function isXML(elem) {
	  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	  return documentElement ? documentElement.nodeName.toLowerCase() !== 'html' : false;
	}
	
	function matches(str, seeds) {
	  return select(str, null, seeds);
	}
	
	function singleMatch(el, match) {
	  if (!match) {
	    return true;
	  }
	  if (!el) {
	    return false;
	  }
	
	  if (el.nodeType === 9) {
	    return false;
	  }
	
	  var matched = 1,
	    matchSuffix = match.suffix,
	    matchSuffixLen,
	    matchSuffixIndex;
	
	  if (match.t === 'tag') {
	    matched &= matchExpr.tag(el, match.value);
	  }
	
	  if (matched && matchSuffix) {
	    matchSuffixLen = matchSuffix.length;
	    matchSuffixIndex = 0;
	    for (; matched && matchSuffixIndex < matchSuffixLen; matchSuffixIndex++) {
	      var singleMatchSuffix = matchSuffix[matchSuffixIndex],
	        singleMatchSuffixType = singleMatchSuffix.t;
	      if (matchExpr[singleMatchSuffixType]) {
	        matched &= matchExpr[singleMatchSuffixType](el, singleMatchSuffix.value);
	      }
	    }
	  }
	
	  return matched;
	}
	
	// match by adjacent immediate single selector match
	function matchImmediate(el, match) {
	  var matched = 1,
	    startEl = el,
	    relativeOp,
	    startMatch = match;
	
	  do {
	    matched &= singleMatch(el, match);
	    if (matched) {
	      // advance
	      match = match && match.prev;
	      if (!match) {
	        return true;
	      }
	      relativeOp = relativeExpr[match.nextCombinator];
	      el = dir(el, relativeOp.dir);
	      if (!relativeOp.immediate) {
	        return {
	          // advance for non-immediate
	          el: el,
	          match: match
	        };
	      }
	    } else {
	      relativeOp = relativeExpr[match.nextCombinator];
	      if (relativeOp.immediate) {
	        // retreat but advance startEl
	        return {
	          el: dir(startEl, relativeExpr[startMatch.nextCombinator].dir),
	          match: startMatch
	        };
	      } else {
	        // advance (before immediate match + jump unmatched)
	        return {
	          el: el && dir(el, relativeOp.dir),
	          match: match
	        };
	      }
	    }
	  } while (el);
	
	  // only occur when match immediate
	  return {
	    el: dir(startEl, relativeExpr[startMatch.nextCombinator].dir),
	    match: startMatch
	  };
	}
	
	// find fixed part, fixed with seeds
	function findFixedMatchFromHead(el, head) {
	  var relativeOp,
	    cur = head;
	
	  do {
	    if (!singleMatch(el, cur)) {
	      return null;
	    }
	    cur = cur.prev;
	    if (!cur) {
	      return true;
	    }
	    relativeOp = relativeExpr[cur.nextCombinator];
	    el = dir(el, relativeOp.dir);
	  } while (el && relativeOp.immediate);
	  if (!el) {
	    return null;
	  }
	  return {
	    el: el,
	    match: cur
	  };
	}
	
	function genId(el) {
	  var selectorId;
	
	  if (isContextXML) {
	    if (!(selectorId = el.getAttribute(EXPANDO_SELECTOR_KEY))) {
	      el.setAttribute(EXPANDO_SELECTOR_KEY, selectorId = (+new Date() + '_' + (++uuid)));
	    }
	  } else {
	    if (!(selectorId = el[EXPANDO_SELECTOR_KEY])) {
	      selectorId = el[EXPANDO_SELECTOR_KEY] = (+new Date()) + '_' + (++uuid);
	    }
	  }
	
	  return selectorId;
	}
	
	function matchSub(el, match) {
	  var selectorId = genId(el),
	    matchKey;
	  matchKey = selectorId + '_' + (match.order || 0);
	  if (matchKey in subMatchesCache) {
	    return subMatchesCache[matchKey];
	  }
	  subMatchesCache[matchKey] = matchSubInternal(el, match);
	  return subMatchesCache[matchKey];
	}
	
	// recursive match by sub selector string from right to left
	// grouped by immediate selectors
	function matchSubInternal(el, match) {
	  var matchImmediateRet = matchImmediate(el, match);
	  if (matchImmediateRet === true) {
	    return true;
	  } else {
	    el = matchImmediateRet.el;
	    match = matchImmediateRet.match;
	    while (el) {
	      if (matchSub(el, match)) {
	        return true;
	      }
	      el = dir(el, relativeExpr[match.nextCombinator].dir);
	    }
	    return false;
	  }
	}
	
	function select(str, context, seeds) {
	  if (!caches[str]) {
	    caches[str] = parser.parse(str);
	  }
	
	  var selector = caches[str],
	    groupIndex = 0,
	    groupLen = selector.length,
	    contextDocument,
	    group,
	    ret = [];
	
	  if (seeds) {
	    context = context || seeds[0].ownerDocument;
	  }
	
	  contextDocument = context && context.ownerDocument || typeof document !== 'undefined' && document;
	
	  if (context && context.nodeType === 9 && !contextDocument) {
	    contextDocument = context;
	  }
	
	  context = context || contextDocument;
	
	  isContextXML = isXML(context);
	
	  for (; groupIndex < groupLen; groupIndex++) {
	    resetStatus();
	
	    group = selector[groupIndex];
	
	    var suffix = group.suffix,
	      suffixIndex,
	      suffixLen,
	      seedsIndex,
	      mySeeds = seeds,
	      seedsLen,
	      id = null;
	
	    if (!mySeeds) {
	      if (suffix && !isContextXML) {
	        suffixIndex = 0;
	        suffixLen = suffix.length;
	        for (; suffixIndex < suffixLen; suffixIndex++) {
	          var singleSuffix = suffix[suffixIndex];
	          if (singleSuffix.t === 'id') {
	            id = singleSuffix.value;
	            break;
	          }
	        }
	      }
	
	      if (id) {
	        // http://yiminghe.github.io/lab/playground/fragment-selector/selector.html
	        var doesNotHasById = !context.getElementById,
	          contextInDom = util.contains(contextDocument, context),
	          tmp = doesNotHasById ? (
	            contextInDom ?
	              contextDocument.getElementById(id) :
	              null
	          ) : context.getElementById(id);
	        // id bug
	        // https://github.com/kissyteam/kissy/issues/67
	        if (!tmp && doesNotHasById || tmp && getAttr(tmp, 'id') !== id) {
	          var tmps = util.getElementsByTagName('*', context),
	            tmpLen = tmps.length,
	            tmpI = 0;
	          for (; tmpI < tmpLen; tmpI++) {
	            tmp = tmps[tmpI];
	            if (getAttr(tmp, 'id') === id) {
	              mySeeds = [tmp];
	              break;
	            }
	          }
	          if (tmpI === tmpLen) {
	            mySeeds = [];
	          }
	        } else {
	          if (contextInDom && tmp && context !== contextDocument) {
	            tmp = util.contains(context, tmp) ? tmp : null;
	          }
	          mySeeds = tmp ? [tmp] : [];
	        }
	      } else {
	        mySeeds = util.getElementsByTagName(group.value || '*', context);
	      }
	    }
	
	    seedsIndex = 0;
	    seedsLen = mySeeds.length;
	
	    if (!seedsLen) {
	      continue;
	    }
	
	    for (; seedsIndex < seedsLen; seedsIndex++) {
	      var seed = mySeeds[seedsIndex];
	      var matchHead = findFixedMatchFromHead(seed, group);
	      if (matchHead === true) {
	        ret.push(seed);
	      } else if (matchHead) {
	        if (matchSub(matchHead.el, matchHead.match)) {
	          ret.push(seed);
	        }
	      }
	    }
	  }
	
	  if (groupLen > 1) {
	    ret = util.unique(ret);
	  }
	
	  return ret;
	}
	
	module.exports = select;
	
	select.parse = function (str) {
	  return parser.parse(str);
	};
	
	select.matches = matches;
	
	select.util = util;
	
	select.version = '@VERSION@';
	/**
	 * @ignore
	 * note 2013-03-28
	 *  - use recursive call to replace backtracking algorithm
	 *
	 * refer
	 *  - http://www.w3.org/TR/selectors/
	 *  - http://www.impressivewebs.com/browser-support-css3-selectors/
	 *  - http://blogs.msdn.com/ie/archive/2010/05/13/the-css-corner-css3-selectors.aspx
	 *  - http://sizzlejs.com/
	 */

/***/ }),

/***/ 507:
/***/ (function(module, exports) {

	/**
	 * attr fix for old ie
	 * @author yiminghe@gmail.com
	 */
	var R_BOOLEAN = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	  R_FOCUSABLE = /^(?:button|input|object|select|textarea)$/i,
	  R_CLICKABLE = /^a(?:rea)?$/i,
	  R_INVALID_CHAR = /:|^on/;
	
	var attrFix = {},
	  propFix,
	  attrHooks = {
	    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	    tabindex: {
	      get: function (el) {
	        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
	        var attributeNode = el.getAttributeNode('tabindex');
	        return attributeNode && attributeNode.specified ?
	          parseInt(attributeNode.value, 10) :
	          R_FOCUSABLE.test(el.nodeName) ||
	          R_CLICKABLE.test(el.nodeName) && el.href ?
	            0 :
	            undefined;
	      }
	    }
	  },
	  boolHook = {
	    get: function (elem, name) {
	      // 转发到 prop 方法
	      return elem[propFix[name] || name] ?
	        // 根据 w3c attribute , true 时返回属性名字符串
	        name.toLowerCase() :
	        undefined;
	    }
	  },
	  attrNodeHook = {};
	
	attrHooks.style = {
	  get: function (el) {
	    return el.style.cssText;
	  }
	};
	
	propFix = {
	  hidefocus: 'hideFocus',
	  tabindex: 'tabIndex',
	  readonly: 'readOnly',
	  'for': 'htmlFor',
	  'class': 'className',
	  maxlength: 'maxLength',
	  cellspacing: 'cellSpacing',
	  cellpadding: 'cellPadding',
	  rowspan: 'rowSpan',
	  colspan: 'colSpan',
	  usemap: 'useMap',
	  frameborder: 'frameBorder',
	  contenteditable: 'contentEditable'
	};
	
	var ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
	var doc = typeof document !== 'undefined' ? document : {};
	
	function numberify(s) {
	  var c = 0;
	  // convert '1.2.3.4' to 1.234
	  return parseFloat(s.replace(/\./g, function () {
	    return (c++ === 0) ? '.' : '';
	  }));
	}
	
	function ieVersion() {
	  var m, v;
	  if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
	    (v = (m[1] || m[2]))) {
	    return doc.documentMode || numberify(v);
	  }
	}
	
	function mix(s, t) {
	  for (var p in t) {
	    s[p] = t[p];
	  }
	}
	
	function each(arr, fn) {
	  var i = 0, l = arr.length;
	  for (; i < l; i++) {
	    if (fn(arr[i], i) === false) {
	      break;
	    }
	  }
	}
	var ie = ieVersion();
	
	if (ie && ie < 8) {
	  attrHooks.style.set = function (el, val) {
	    el.style.cssText = val;
	  };
	
	  // get attribute value from attribute node for ie
	  mix(attrNodeHook, {
	    get: function (elem, name) {
	      var ret = elem.getAttributeNode(name);
	      // Return undefined if attribute node specified by user
	      return ret && (
	        // fix #100
	      ret.specified || ret.nodeValue) ?
	        ret.nodeValue :
	        undefined;
	    }
	  });
	
	  // ie6,7 不区分 attribute 与 property
	  mix(attrFix, propFix);
	
	  // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	  attrHooks.tabIndex = attrHooks.tabindex;
	
	  // 不光是 href, src, 还有 rowspan 等非 mapping 属性，也需要用第 2 个参数来获取原始值
	  // 注意 colSpan rowSpan 已经由 propFix 转为大写
	  each(['href', 'src', 'width', 'height', 'colSpan', 'rowSpan'], function (name) {
	    attrHooks[name] = {
	      get: function (elem) {
	        var ret = elem.getAttribute(name, 2);
	        return ret === null ? undefined : ret;
	      }
	    };
	  });
	
	  attrHooks.placeholder = {
	    get: function (elem, name) {
	      return elem[name] || attrNodeHook.get(elem, name);
	    }
	  };
	}
	
	if (ie) {
	  var hrefFix = attrHooks.href = attrHooks.href || {};
	  hrefFix.set = function (el, val, name) {
	    var childNodes = el.childNodes,
	      b,
	      len = childNodes.length,
	      allText = len > 0;
	    for (len = len - 1; len >= 0; len--) {
	      if (childNodes[len].nodeType !== 3) {
	        allText = 0;
	      }
	    }
	    if (allText) {
	      b = el.ownerDocument.createElement('b');
	      b.style.display = 'none';
	      el.appendChild(b);
	    }
	    el.setAttribute(name, '' + val);
	    if (b) {
	      el.removeChild(b);
	    }
	  };
	}
	
	var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
	  trim = String.prototype.trim;
	var SPACE = ' ';
	
	var getElementsByTagName;
	getElementsByTagName = function (name, context) {
	  return context.getElementsByTagName(name);
	};
	
	if (doc.createElement) {
	  var div = doc.createElement('div');
	  div.appendChild(document.createComment(''));
	  if (div.getElementsByTagName('*').length) {
	    getElementsByTagName = function (name, context) {
	      var nodes = context.getElementsByTagName(name),
	        needsFilter = name === '*';
	      // <input id='length'>
	      if (needsFilter || typeof nodes.length !== 'number') {
	        var ret = [],
	          i = 0,
	          el;
	        while ((el = nodes[i++])) {
	          if (!needsFilter || el.nodeType === 1) {
	            ret.push(el);
	          }
	        }
	        return ret;
	      } else {
	        return nodes;
	      }
	    };
	  }
	}
	
	var compareNodeOrder = ('sourceIndex' in (doc && doc.documentElement || {})) ? function (a, b) {
	  return a.sourceIndex - b.sourceIndex;
	} : function (a, b) {
	  if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
	    return a.compareDocumentPosition ? -1 : 1;
	  }
	  var bit = a.compareDocumentPosition(b) & 4;
	  return bit ? -1 : 1;
	};
	
	var util = module.exports = {
	  ie: ie,
	
	  unique: (function () {
	    var hasDuplicate,
	      baseHasDuplicate = true;
	
	    // Here we check if the JavaScript engine is using some sort of
	    // optimization where it does not always call our comparison
	    // function. If that is the case, discard the hasDuplicate value.
	    // Thus far that includes Google Chrome.
	    [0, 0].sort(function () {
	      baseHasDuplicate = false;
	      return 0;
	    });
	
	    function sortOrder(a, b) {
	      if (a === b) {
	        hasDuplicate = true;
	        return 0;
	      }
	
	      return compareNodeOrder(a, b);
	    }
	
	    // 排序去重
	    return function (elements) {
	      hasDuplicate = baseHasDuplicate;
	      elements.sort(sortOrder);
	
	      if (hasDuplicate) {
	        var i = 1, len = elements.length;
	        while (i < len) {
	          if (elements[i] === elements[i - 1]) {
	            elements.splice(i, 1);
	            --len;
	          } else {
	            i++;
	          }
	        }
	      }
	      return elements;
	    };
	  })(),
	
	  getElementsByTagName: getElementsByTagName,
	
	  getSimpleAttr: function (el, name) {
	    var ret = el && el.getAttributeNode(name);
	    if (ret && ret.specified) {
	      return 'value' in ret ? ret.value : ret.nodeValue;
	    }
	    return undefined;
	  },
	
	  contains: ie ? function (a, b) {
	    if (a.nodeType === 9) {
	      a = a.documentElement;
	    }
	    // !a.contains => a===document || text
	    // 注意原生 contains 判断时 a===b 也返回 true
	    b = b.parentNode;
	
	    if (a === b) {
	      return true;
	    }
	
	    // when b is document, a.contains(b) 不支持的接口 in ie
	    if (b && b.nodeType === 1) {
	      return a.contains && a.contains(b);
	    } else {
	      return false;
	    }
	  } : function (a, b) {
	    return !!(a.compareDocumentPosition(b) & 16);
	  },
	
	  isTag: function (el, value) {
	    return value === '*' || el.nodeName.toLowerCase() === value.toLowerCase();
	  },
	
	  hasSingleClass: function (el, cls) {
	    // consider xml
	    // https://github.com/kissyteam/kissy/issues/532
	    var className = el && util.getSimpleAttr(el, 'class');
	    return className && (className = className.replace(/[\r\t\n]/g, SPACE)) &&
	      (SPACE + className + SPACE).indexOf(SPACE + cls + SPACE) > -1;
	  },
	
	  startsWith: function (str, prefix) {
	    return str.lastIndexOf(prefix, 0) === 0;
	  },
	
	  endsWith: function (str, suffix) {
	    var ind = str.length - suffix.length;
	    return ind >= 0 && str.indexOf(suffix, ind) === ind;
	  },
	
	  trim: trim ?
	    function (str) {
	      return str == null ? '' : trim.call(str);
	    } :
	    function (str) {
	      return str == null ? '' : (str + '').replace(RE_TRIM, '');
	    },
	
	  attr: function (el, name) {
	    var attrNormalizer, ret;
	    // scrollLeft
	    name = name.toLowerCase();
	    // custom attrs
	    name = attrFix[name] || name;
	    if (R_BOOLEAN.test(name)) {
	      attrNormalizer = boolHook;
	    } else if (R_INVALID_CHAR.test(name)) {
	      // only old ie?
	      attrNormalizer = attrNodeHook;
	    } else {
	      attrNormalizer = attrHooks[name];
	    }
	    if (el && el.nodeType === 1) {
	      // browsers index elements by id/name on forms, give priority to attributes.
	      if (el.nodeName.toLowerCase() === 'form') {
	        attrNormalizer = attrNodeHook;
	      }
	      if (attrNormalizer && attrNormalizer.get) {
	        return attrNormalizer.get(el, name);
	      }
	      ret = el.getAttribute(name);
	      if (ret === '') {
	        var attrNode = el.getAttributeNode(name);
	        if (!attrNode || !attrNode.specified) {
	          return undefined;
	        }
	      }
	      // standard browser non-existing attribute return null
	      // ie<8 will return undefined , because it return property
	      // so norm to undefined
	      return ret === null ? undefined : ret;
	    }
	  }
	};

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

	/*
	  Generated by kison.*/
	var parser = (function (undefined) {
	    /*jshint quotmark:false, loopfunc:true, indent:false, unused:false, asi:true, boss:true*/
	    /* Generated by kison */
	    var parser = {},
	        GrammarConst = {
	            'SHIFT_TYPE': 1,
	            'REDUCE_TYPE': 2,
	            'ACCEPT_TYPE': 0,
	            'TYPE_INDEX': 0,
	            'PRODUCTION_INDEX': 1,
	            'TO_INDEX': 2
	        };
	    /*jslint quotmark: false*/
	    function mix(to, from) {
	        for (var f in from) {
	            to[f] = from[f];
	        }
	    }
	
	    function isArray(obj) {
	        return '[object Array]' === Object.prototype.toString.call(obj);
	    }
	
	    function each(object, fn, context) {
	        if (object) {
	            var key,
	                val,
	                length,
	                i = 0;
	
	            context = context || null;
	
	            if (!isArray(object)) {
	                for (key in object) {
	                    // can not use hasOwnProperty
	                    if (fn.call(context, object[key], key, object) === false) {
	                        break;
	                    }
	                }
	            } else {
	                length = object.length;
	                for (val = object[0]; i < length; val = object[++i]) {
	                    if (fn.call(context, val, i, object) === false) {
	                        break;
	                    }
	                }
	            }
	        }
	    }
	
	    function inArray(item, arr) {
	        for (var i = 0, l = arr.length; i < l; i++) {
	            if (arr[i] === item) {
	                return true;
	            }
	        }
	        return false;
	    }
	    var Lexer = function Lexer(cfg) {
	
	        var self = this;
	
	        /*
	     lex rules.
	     @type {Object[]}
	     @example
	     [
	     {
	     regexp:'\\w+',
	     state:['xx'],
	     token:'c',
	     // this => lex
	     action:function(){}
	     }
	     ]
	     */
	        self.rules = [];
	
	        mix(self, cfg);
	
	        /*
	     Input languages
	     @type {String}
	     */
	
	        self.resetInput(self.input);
	    };
	    Lexer.prototype = {
	        'resetInput': function (input) {
	            mix(this, {
	                input: input,
	                matched: '',
	                stateStack: [Lexer.STATIC.INITIAL],
	                match: '',
	                text: '',
	                firstLine: 1,
	                lineNumber: 1,
	                lastLine: 1,
	                firstColumn: 1,
	                lastColumn: 1
	            });
	        },
	        'getCurrentRules': function () {
	            var self = this,
	                currentState = self.stateStack[self.stateStack.length - 1],
	                rules = [];
	            //#JSCOVERAGE_IF
	            if (self.mapState) {
	                currentState = self.mapState(currentState);
	            }
	            each(self.rules, function (r) {
	                var state = r.state || r[3];
	                if (!state) {
	                    if (currentState === Lexer.STATIC.INITIAL) {
	                        rules.push(r);
	                    }
	                } else if (inArray(currentState, state)) {
	                    rules.push(r);
	                }
	            });
	            return rules;
	        },
	        'pushState': function (state) {
	            this.stateStack.push(state);
	        },
	        'popState': function (num) {
	            num = num || 1;
	            var ret;
	            while (num--) {
	                ret = this.stateStack.pop();
	            }
	            return ret;
	        },
	        'showDebugInfo': function () {
	            var self = this,
	                DEBUG_CONTEXT_LIMIT = Lexer.STATIC.DEBUG_CONTEXT_LIMIT,
	                matched = self.matched,
	                match = self.match,
	                input = self.input;
	            matched = matched.slice(0, matched.length - match.length);
	            //#JSCOVERAGE_IF 0
	            var past = (matched.length > DEBUG_CONTEXT_LIMIT ? '...' : '') +
	                matched.slice(0 - DEBUG_CONTEXT_LIMIT).replace(/\n/, ' '),
	                next = match + input;
	            //#JSCOVERAGE_ENDIF
	            next = next.slice(0, DEBUG_CONTEXT_LIMIT) +
	                (next.length > DEBUG_CONTEXT_LIMIT ? '...' : '');
	            return past + next + '\n' + new Array(past.length + 1).join('-') + '^';
	        },
	        'mapSymbol': function mapSymbolForCodeGen(t) {
	            return this.symbolMap[t];
	        },
	        'mapReverseSymbol': function (rs) {
	            var self = this,
	                symbolMap = self.symbolMap,
	                i,
	                reverseSymbolMap = self.reverseSymbolMap;
	            if (!reverseSymbolMap && symbolMap) {
	                reverseSymbolMap = self.reverseSymbolMap = {};
	                for (i in symbolMap) {
	                    reverseSymbolMap[symbolMap[i]] = i;
	                }
	            }
	            //#JSCOVERAGE_IF
	            if (reverseSymbolMap) {
	                return reverseSymbolMap[rs];
	            } else {
	                return rs;
	            }
	        },
	        'lex': function () {
	            var self = this,
	                input = self.input,
	                i,
	                rule,
	                m,
	                ret,
	                lines,
	                rules = self.getCurrentRules();
	
	            self.match = self.text = '';
	
	            if (!input) {
	                return self.mapSymbol(Lexer.STATIC.END_TAG);
	            }
	
	            for (i = 0; i < rules.length; i++) {
	                rule = rules[i];
	                //#JSCOVERAGE_IF 0
	                var regexp = rule.regexp || rule[1],
	                    token = rule.token || rule[0],
	                    action = rule.action || rule[2] || undefined;
	                //#JSCOVERAGE_ENDIF
	                if ((m = input.match(regexp))) {
	                    lines = m[0].match(/\n.*/g);
	                    if (lines) {
	                        self.lineNumber += lines.length;
	                    }
	                    mix(self, {
	                        firstLine: self.lastLine,
	                        lastLine: self.lineNumber + 1,
	                        firstColumn: self.lastColumn,
	                        lastColumn: lines ?
	                            lines[lines.length - 1].length - 1 : self.lastColumn + m[0].length
	                    });
	                    var match;
	                    // for error report
	                    match = self.match = m[0];
	
	                    // all matches
	                    self.matches = m;
	                    // may change by user
	                    self.text = match;
	                    // matched content utils now
	                    self.matched += match;
	                    ret = action && action.call(self);
	                    if (ret === undefined) {
	                        ret = token;
	                    } else {
	                        ret = self.mapSymbol(ret);
	                    }
	                    input = input.slice(match.length);
	                    self.input = input;
	
	                    if (ret) {
	                        return ret;
	                    } else {
	                        // ignore
	                        return self.lex();
	                    }
	                }
	            }
	        }
	    };
	    Lexer.STATIC = {
	        'INITIAL': 'I',
	        'DEBUG_CONTEXT_LIMIT': 20,
	        'END_TAG': '$EOF'
	    };
	    var lexer = new Lexer({
	        'rules': [
	            ['b', /^\[(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['c', /^(?:[\t\r\n\f\x20]*)\]/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['d', /^(?:[\t\r\n\f\x20]*)~=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['e', /^(?:[\t\r\n\f\x20]*)\|=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['f', /^(?:[\t\r\n\f\x20]*)\^=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['g', /^(?:[\t\r\n\f\x20]*)\$=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['h', /^(?:[\t\r\n\f\x20]*)\*=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['i', /^(?:[\t\r\n\f\x20]*)\=(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['j', /^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)\(/,
	                function () {
	                    this.text = this.yy.trim(this.text).slice(0, -1);
	                    this.pushState('fn');
	                }
	            ],
	            ['k', /^[^\)]*/,
	                function () {
	                    this.popState();
	                },
	                ['fn']
	            ],
	            ['l', /^(?:[\t\r\n\f\x20]*)\)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['m', /^:not\((?:[\t\r\n\f\x20]*)/i,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['n', /^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/,
	                function () {
	                    this.text = this.yy.unEscape(this.text);
	                }
	            ],
	            ['o', /^"(\\"|[^"])*"/,
	                function () {
	                    this.text = this.yy.unEscapeStr(this.text);
	                }
	            ],
	            ['o', /^'(\\'|[^'])*'/,
	                function () {
	                    this.text = this.yy.unEscapeStr(this.text);
	                }
	            ],
	            ['p', /^#(?:(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))+)/,
	                function () {
	                    this.text = this.yy.unEscape(this.text.slice(1));
	                }
	            ],
	            ['q', /^\.(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/,
	                function () {
	                    this.text = this.yy.unEscape(this.text.slice(1));
	                }
	            ],
	            ['r', /^(?:[\t\r\n\f\x20]*),(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['s', /^::?/, 0],
	            ['t', /^(?:[\t\r\n\f\x20]*)\+(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['u', /^(?:[\t\r\n\f\x20]*)>(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['v', /^(?:[\t\r\n\f\x20]*)~(?:[\t\r\n\f\x20]*)/,
	                function () {
	                    this.text = this.yy.trim(this.text);
	                }
	            ],
	            ['w', /^\*/, 0],
	            ['x', /^(?:[\t\r\n\f\x20]+)/, 0],
	            ['y', /^./, 0]
	        ]
	    });
	    parser.lexer = lexer;
	    lexer.symbolMap = {
	        '$EOF': 'a',
	        'LEFT_BRACKET': 'b',
	        'RIGHT_BRACKET': 'c',
	        'INCLUDES': 'd',
	        'DASH_MATCH': 'e',
	        'PREFIX_MATCH': 'f',
	        'SUFFIX_MATCH': 'g',
	        'SUBSTRING_MATCH': 'h',
	        'ALL_MATCH': 'i',
	        'FUNCTION': 'j',
	        'PARAMETER': 'k',
	        'RIGHT_PARENTHESES': 'l',
	        'NOT': 'm',
	        'IDENT': 'n',
	        'STRING': 'o',
	        'HASH': 'p',
	        'CLASS': 'q',
	        'COMMA': 'r',
	        'COLON': 's',
	        'PLUS': 't',
	        'GREATER': 'u',
	        'TILDE': 'v',
	        'UNIVERSAL': 'w',
	        'S': 'x',
	        'INVALID': 'y',
	        '$START': 'z',
	        'selectors_group': 'aa',
	        'selector': 'ab',
	        'simple_selector_sequence': 'ac',
	        'combinator': 'ad',
	        'type_selector': 'ae',
	        'id_selector': 'af',
	        'class_selector': 'ag',
	        'attrib_match': 'ah',
	        'attrib': 'ai',
	        'attrib_val': 'aj',
	        'pseudo': 'ak',
	        'negation': 'al',
	        'negation_arg': 'am',
	        'suffix_selector': 'an',
	        'suffix_selectors': 'ao'
	    };
	    parser.productions = [
	        ['z', ['aa']],
	        ['aa', ['ab'],
	            function () {
	                return [this.$1];
	            }
	        ],
	        ['aa', ['aa', 'r', 'ab'],
	            function () {
	                this.$1.push(this.$3);
	            }
	        ],
	        ['ab', ['ac']],
	        ['ab', ['ab', 'ad', 'ac'],
	            function () {
	                // LinkedList
	
	                this.$1.nextCombinator = this.$3.prevCombinator = this.$2;
	                var order;
	                order = this.$1.order = this.$1.order || 0;
	                this.$3.order = order + 1;
	                this.$3.prev = this.$1;
	                this.$1.next = this.$3;
	                return this.$3;
	            }
	        ],
	        ['ad', ['t']],
	        ['ad', ['u']],
	        ['ad', ['v']],
	        ['ad', ['x'],
	            function () {
	                return ' ';
	            }
	        ],
	        ['ae', ['n'],
	            function () {
	                return {
	                    t: 'tag',
	                    value: this.$1
	                };
	            }
	        ],
	        ['ae', ['w'],
	            function () {
	                return {
	                    t: 'tag',
	                    value: this.$1
	                };
	            }
	        ],
	        ['af', ['p'],
	            function () {
	                return {
	                    t: 'id',
	                    value: this.$1
	                };
	            }
	        ],
	        ['ag', ['q'],
	            function () {
	                return {
	                    t: 'cls',
	                    value: this.$1
	                };
	            }
	        ],
	        ['ah', ['f']],
	        ['ah', ['g']],
	        ['ah', ['h']],
	        ['ah', ['i']],
	        ['ah', ['d']],
	        ['ah', ['e']],
	        ['ai', ['b', 'n', 'c'],
	            function () {
	                return {
	                    t: 'attrib',
	                    value: {
	                        ident: this.$2
	                    }
	                };
	            }
	        ],
	        ['aj', ['n']],
	        ['aj', ['o']],
	        ['ai', ['b', 'n', 'ah', 'aj', 'c'],
	            function () {
	                return {
	                    t: 'attrib',
	                    value: {
	                        ident: this.$2,
	                        match: this.$3,
	                        value: this.$4
	                    }
	                };
	            }
	        ],
	        ['ak', ['s', 'j', 'k', 'l'],
	            function () {
	                return {
	                    t: 'pseudo',
	                    value: {
	                        fn: this.$2.toLowerCase(),
	                        param: this.$3
	                    }
	                };
	            }
	        ],
	        ['ak', ['s', 'n'],
	            function () {
	                return {
	                    t: 'pseudo',
	                    value: {
	                        ident: this.$2.toLowerCase()
	                    }
	                };
	            }
	        ],
	        ['al', ['m', 'am', 'l'],
	            function () {
	                return {
	                    t: 'pseudo',
	                    value: {
	                        fn: 'not',
	                        param: this.$2
	                    }
	                };
	            }
	        ],
	        ['am', ['ae']],
	        ['am', ['af']],
	        ['am', ['ag']],
	        ['am', ['ai']],
	        ['am', ['ak']],
	        ['an', ['af']],
	        ['an', ['ag']],
	        ['an', ['ai']],
	        ['an', ['ak']],
	        ['an', ['al']],
	        ['ao', ['an'],
	            function () {
	                return [this.$1];
	            }
	        ],
	        ['ao', ['ao', 'an'],
	            function () {
	                this.$1.push(this.$2);
	            }
	        ],
	        ['ac', ['ae']],
	        ['ac', ['ao'],
	            function () {
	                return {
	                    suffix: this.$1
	                };
	            }
	        ],
	        ['ac', ['ae', 'ao'],
	            function () {
	                return {
	                    t: 'tag',
	                    value: this.$1.value,
	                    suffix: this.$2
	                };
	            }
	        ]
	    ];
	    parser.table = {
	        'gotos': {
	            '0': {
	                'aa': 8,
	                'ab': 9,
	                'ae': 10,
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 16,
	                'ao': 17,
	                'ac': 18
	            },
	            '2': {
	                'ae': 20,
	                'af': 21,
	                'ag': 22,
	                'ai': 23,
	                'ak': 24,
	                'am': 25
	            },
	            '9': {
	                'ad': 33
	            },
	            '10': {
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 16,
	                'ao': 34
	            },
	            '17': {
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 35
	            },
	            '19': {
	                'ah': 43
	            },
	            '28': {
	                'ab': 46,
	                'ae': 10,
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 16,
	                'ao': 17,
	                'ac': 18
	            },
	            '33': {
	                'ae': 10,
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 16,
	                'ao': 17,
	                'ac': 47
	            },
	            '34': {
	                'af': 11,
	                'ag': 12,
	                'ai': 13,
	                'ak': 14,
	                'al': 15,
	                'an': 35
	            },
	            '43': {
	                'aj': 50
	            },
	            '46': {
	                'ad': 33
	            }
	        },
	        'action': {
	            '0': {
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'n': [1, undefined, 3],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6],
	                'w': [1, undefined, 7]
	            },
	            '1': {
	                'n': [1, undefined, 19]
	            },
	            '2': {
	                'b': [1, undefined, 1],
	                'n': [1, undefined, 3],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6],
	                'w': [1, undefined, 7]
	            },
	            '3': {
	                'a': [2, 9],
	                'r': [2, 9],
	                't': [2, 9],
	                'u': [2, 9],
	                'v': [2, 9],
	                'x': [2, 9],
	                'p': [2, 9],
	                'q': [2, 9],
	                'b': [2, 9],
	                's': [2, 9],
	                'm': [2, 9],
	                'l': [2, 9]
	            },
	            '4': {
	                'a': [2, 11],
	                'r': [2, 11],
	                't': [2, 11],
	                'u': [2, 11],
	                'v': [2, 11],
	                'x': [2, 11],
	                'p': [2, 11],
	                'q': [2, 11],
	                'b': [2, 11],
	                's': [2, 11],
	                'm': [2, 11],
	                'l': [2, 11]
	            },
	            '5': {
	                'a': [2, 12],
	                'r': [2, 12],
	                't': [2, 12],
	                'u': [2, 12],
	                'v': [2, 12],
	                'x': [2, 12],
	                'p': [2, 12],
	                'q': [2, 12],
	                'b': [2, 12],
	                's': [2, 12],
	                'm': [2, 12],
	                'l': [2, 12]
	            },
	            '6': {
	                'j': [1, undefined, 26],
	                'n': [1, undefined, 27]
	            },
	            '7': {
	                'a': [2, 10],
	                'r': [2, 10],
	                't': [2, 10],
	                'u': [2, 10],
	                'v': [2, 10],
	                'x': [2, 10],
	                'p': [2, 10],
	                'q': [2, 10],
	                'b': [2, 10],
	                's': [2, 10],
	                'm': [2, 10],
	                'l': [2, 10]
	            },
	            '8': {
	                'a': [0],
	                'r': [1, undefined, 28]
	            },
	            '9': {
	                'a': [2, 1],
	                'r': [2, 1],
	                't': [1, undefined, 29],
	                'u': [1, undefined, 30],
	                'v': [1, undefined, 31],
	                'x': [1, undefined, 32]
	            },
	            '10': {
	                'a': [2, 38],
	                'r': [2, 38],
	                't': [2, 38],
	                'u': [2, 38],
	                'v': [2, 38],
	                'x': [2, 38],
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6]
	            },
	            '11': {
	                'a': [2, 31],
	                'r': [2, 31],
	                't': [2, 31],
	                'u': [2, 31],
	                'v': [2, 31],
	                'x': [2, 31],
	                'p': [2, 31],
	                'q': [2, 31],
	                'b': [2, 31],
	                's': [2, 31],
	                'm': [2, 31]
	            },
	            '12': {
	                'a': [2, 32],
	                'r': [2, 32],
	                't': [2, 32],
	                'u': [2, 32],
	                'v': [2, 32],
	                'x': [2, 32],
	                'p': [2, 32],
	                'q': [2, 32],
	                'b': [2, 32],
	                's': [2, 32],
	                'm': [2, 32]
	            },
	            '13': {
	                'a': [2, 33],
	                'r': [2, 33],
	                't': [2, 33],
	                'u': [2, 33],
	                'v': [2, 33],
	                'x': [2, 33],
	                'p': [2, 33],
	                'q': [2, 33],
	                'b': [2, 33],
	                's': [2, 33],
	                'm': [2, 33]
	            },
	            '14': {
	                'a': [2, 34],
	                'r': [2, 34],
	                't': [2, 34],
	                'u': [2, 34],
	                'v': [2, 34],
	                'x': [2, 34],
	                'p': [2, 34],
	                'q': [2, 34],
	                'b': [2, 34],
	                's': [2, 34],
	                'm': [2, 34]
	            },
	            '15': {
	                'a': [2, 35],
	                'r': [2, 35],
	                't': [2, 35],
	                'u': [2, 35],
	                'v': [2, 35],
	                'x': [2, 35],
	                'p': [2, 35],
	                'q': [2, 35],
	                'b': [2, 35],
	                's': [2, 35],
	                'm': [2, 35]
	            },
	            '16': {
	                'a': [2, 36],
	                'r': [2, 36],
	                't': [2, 36],
	                'u': [2, 36],
	                'v': [2, 36],
	                'x': [2, 36],
	                'p': [2, 36],
	                'q': [2, 36],
	                'b': [2, 36],
	                's': [2, 36],
	                'm': [2, 36]
	            },
	            '17': {
	                'a': [2, 39],
	                'r': [2, 39],
	                't': [2, 39],
	                'u': [2, 39],
	                'v': [2, 39],
	                'x': [2, 39],
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6]
	            },
	            '18': {
	                'a': [2, 3],
	                'r': [2, 3],
	                't': [2, 3],
	                'u': [2, 3],
	                'v': [2, 3],
	                'x': [2, 3]
	            },
	            '19': {
	                'c': [1, undefined, 36],
	                'd': [1, undefined, 37],
	                'e': [1, undefined, 38],
	                'f': [1, undefined, 39],
	                'g': [1, undefined, 40],
	                'h': [1, undefined, 41],
	                'i': [1, undefined, 42]
	            },
	            '20': {
	                'l': [2, 26]
	            },
	            '21': {
	                'l': [2, 27]
	            },
	            '22': {
	                'l': [2, 28]
	            },
	            '23': {
	                'l': [2, 29]
	            },
	            '24': {
	                'l': [2, 30]
	            },
	            '25': {
	                'l': [1, undefined, 44]
	            },
	            '26': {
	                'k': [1, undefined, 45]
	            },
	            '27': {
	                'a': [2, 24],
	                'r': [2, 24],
	                't': [2, 24],
	                'u': [2, 24],
	                'v': [2, 24],
	                'x': [2, 24],
	                'p': [2, 24],
	                'q': [2, 24],
	                'b': [2, 24],
	                's': [2, 24],
	                'm': [2, 24],
	                'l': [2, 24]
	            },
	            '28': {
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'n': [1, undefined, 3],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6],
	                'w': [1, undefined, 7]
	            },
	            '29': {
	                'n': [2, 5],
	                'w': [2, 5],
	                'p': [2, 5],
	                'q': [2, 5],
	                'b': [2, 5],
	                's': [2, 5],
	                'm': [2, 5]
	            },
	            '30': {
	                'n': [2, 6],
	                'w': [2, 6],
	                'p': [2, 6],
	                'q': [2, 6],
	                'b': [2, 6],
	                's': [2, 6],
	                'm': [2, 6]
	            },
	            '31': {
	                'n': [2, 7],
	                'w': [2, 7],
	                'p': [2, 7],
	                'q': [2, 7],
	                'b': [2, 7],
	                's': [2, 7],
	                'm': [2, 7]
	            },
	            '32': {
	                'n': [2, 8],
	                'w': [2, 8],
	                'p': [2, 8],
	                'q': [2, 8],
	                'b': [2, 8],
	                's': [2, 8],
	                'm': [2, 8]
	            },
	            '33': {
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'n': [1, undefined, 3],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6],
	                'w': [1, undefined, 7]
	            },
	            '34': {
	                'a': [2, 40],
	                'r': [2, 40],
	                't': [2, 40],
	                'u': [2, 40],
	                'v': [2, 40],
	                'x': [2, 40],
	                'b': [1, undefined, 1],
	                'm': [1, undefined, 2],
	                'p': [1, undefined, 4],
	                'q': [1, undefined, 5],
	                's': [1, undefined, 6]
	            },
	            '35': {
	                'a': [2, 37],
	                'r': [2, 37],
	                't': [2, 37],
	                'u': [2, 37],
	                'v': [2, 37],
	                'x': [2, 37],
	                'p': [2, 37],
	                'q': [2, 37],
	                'b': [2, 37],
	                's': [2, 37],
	                'm': [2, 37]
	            },
	            '36': {
	                'a': [2, 19],
	                'r': [2, 19],
	                't': [2, 19],
	                'u': [2, 19],
	                'v': [2, 19],
	                'x': [2, 19],
	                'p': [2, 19],
	                'q': [2, 19],
	                'b': [2, 19],
	                's': [2, 19],
	                'm': [2, 19],
	                'l': [2, 19]
	            },
	            '37': {
	                'n': [2, 17],
	                'o': [2, 17]
	            },
	            '38': {
	                'n': [2, 18],
	                'o': [2, 18]
	            },
	            '39': {
	                'n': [2, 13],
	                'o': [2, 13]
	            },
	            '40': {
	                'n': [2, 14],
	                'o': [2, 14]
	            },
	            '41': {
	                'n': [2, 15],
	                'o': [2, 15]
	            },
	            '42': {
	                'n': [2, 16],
	                'o': [2, 16]
	            },
	            '43': {
	                'n': [1, undefined, 48],
	                'o': [1, undefined, 49]
	            },
	            '44': {
	                'a': [2, 25],
	                'r': [2, 25],
	                't': [2, 25],
	                'u': [2, 25],
	                'v': [2, 25],
	                'x': [2, 25],
	                'p': [2, 25],
	                'q': [2, 25],
	                'b': [2, 25],
	                's': [2, 25],
	                'm': [2, 25]
	            },
	            '45': {
	                'l': [1, undefined, 51]
	            },
	            '46': {
	                'a': [2, 2],
	                'r': [2, 2],
	                't': [1, undefined, 29],
	                'u': [1, undefined, 30],
	                'v': [1, undefined, 31],
	                'x': [1, undefined, 32]
	            },
	            '47': {
	                'a': [2, 4],
	                'r': [2, 4],
	                't': [2, 4],
	                'u': [2, 4],
	                'v': [2, 4],
	                'x': [2, 4]
	            },
	            '48': {
	                'c': [2, 20]
	            },
	            '49': {
	                'c': [2, 21]
	            },
	            '50': {
	                'c': [1, undefined, 52]
	            },
	            '51': {
	                'a': [2, 23],
	                'r': [2, 23],
	                't': [2, 23],
	                'u': [2, 23],
	                'v': [2, 23],
	                'x': [2, 23],
	                'p': [2, 23],
	                'q': [2, 23],
	                'b': [2, 23],
	                's': [2, 23],
	                'm': [2, 23],
	                'l': [2, 23]
	            },
	            '52': {
	                'a': [2, 22],
	                'r': [2, 22],
	                't': [2, 22],
	                'u': [2, 22],
	                'v': [2, 22],
	                'x': [2, 22],
	                'p': [2, 22],
	                'q': [2, 22],
	                'b': [2, 22],
	                's': [2, 22],
	                'm': [2, 22],
	                'l': [2, 22]
	            }
	        }
	    };
	    parser.parse = function parse(input, filename) {
	        var self = this,
	            lexer = self.lexer,
	            state,
	            symbol,
	            action,
	            table = self.table,
	            gotos = table.gotos,
	            tableAction = table.action,
	            productions = self.productions,
	            valueStack = [null],
	            // for debug info
	            prefix = filename ? ('in file: ' + filename + ' ') : '',
	            stack = [0];
	
	        lexer.resetInput(input);
	
	        while (1) {
	            // retrieve state number from top of stack
	            state = stack[stack.length - 1];
	
	            if (!symbol) {
	                symbol = lexer.lex();
	            }
	
	            if (symbol) {
	                // read action for current state and first input
	                action = tableAction[state] && tableAction[state][symbol];
	            } else {
	                action = null;
	            }
	
	            if (!action) {
	                var expected = [],
	                    error;
	                //#JSCOVERAGE_IF
	                if (tableAction[state]) {
	                    for (var symbolForState in tableAction[state]) {
	                        expected.push(self.lexer.mapReverseSymbol(symbolForState));
	                    }
	                }
	                error = prefix + 'syntax error at line ' + lexer.lineNumber +
	                    ':\n' + lexer.showDebugInfo() +
	                    '\n' + 'expect ' + expected.join(', ');
	                throw new Error(error);
	            }
	
	            switch (action[GrammarConst.TYPE_INDEX]) {
	            case GrammarConst.SHIFT_TYPE:
	                stack.push(symbol);
	
	                valueStack.push(lexer.text);
	
	                // push state
	                stack.push(action[GrammarConst.TO_INDEX]);
	
	                // allow to read more
	                symbol = null;
	
	                break;
	
	            case GrammarConst.REDUCE_TYPE:
	                var production = productions[action[GrammarConst.PRODUCTION_INDEX]],
	                    reducedSymbol = production.symbol || production[0],
	                    reducedAction = production.action || production[2],
	                    reducedRhs = production.rhs || production[1],
	                    len = reducedRhs.length,
	                    i = 0,
	                    ret,
	                    $$ = valueStack[valueStack.length - len]; // default to $$ = $1
	
	                ret = undefined;
	
	                self.$$ = $$;
	
	                for (; i < len; i++) {
	                    self['$' + (len - i)] = valueStack[valueStack.length - 1 - i];
	                }
	
	                if (reducedAction) {
	                    ret = reducedAction.call(self);
	                }
	
	                if (ret !== undefined) {
	                    $$ = ret;
	                } else {
	                    $$ = self.$$;
	                }
	
	                stack = stack.slice(0, -1 * len * 2);
	                valueStack = valueStack.slice(0, -1 * len);
	
	                stack.push(reducedSymbol);
	
	                valueStack.push($$);
	
	                var newState = gotos[stack[stack.length - 2]][stack[stack.length - 1]];
	
	                stack.push(newState);
	
	                break;
	
	            case GrammarConst.ACCEPT_TYPE:
	                return $$;
	            }
	        }
	    };
	    return parser;
	})();
	if (true) {
	    module.exports = parser;
	}

/***/ }),

/***/ 509:
/***/ (function(module, exports) {

	var hyphenExpression = /\-+([a-z])/gi
	
	function upperCaseFirstMatch (match, c, offset) {
	  if (offset !== 0) {
	    return c.toUpperCase()
	  } else {
	    return c
	  }
	}
	
	function camelCase (str) {
	  var camelCased = str.replace(hyphenExpression, upperCaseFirstMatch)
	  hyphenExpression.lastIndex = 0
	  return camelCased
	}
	
	module.exports = camelCase


/***/ }),

/***/ 510:
/***/ (function(module, exports) {

	function isString (value) {
	  return typeof value === 'string'
	}
	
	module.exports = isString


/***/ }),

/***/ 511:
/***/ (function(module, exports) {

	function isUndefined (value) {
	  return typeof value === 'undefined'
	}
	
	module.exports = isUndefined


/***/ }),

/***/ 512:
/***/ (function(module, exports) {

	function assign (dest) {
	  var args = arguments
	  var source
	
	  for (var i = 1; i < args.length; i++) {
	    source = args[i]
	
	    for (var key in source) {
	      dest[key] = source[key]
	    }
	  }
	
	  return dest
	}
	
	module.exports = assign


/***/ }),

/***/ 513:
/***/ (function(module, exports) {

	function mapValues (source, fn) {
	  var destination = {}
	
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) {
	      destination[key] = fn(source[key])
	    }
	  }
	
	  return destination
	}
	
	module.exports = mapValues


/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

	var camelCase = __webpack_require__(509)
	
	function styleCamelCase (name) {
	  var camel = camelCase(name)
	
	  // Detect if the style property is already camelCased
	  // To not convert Webkit*, Moz* and O* to lowercase
	  if (camel.charAt(0).toUpperCase() === name.charAt(0)) {
	    return name.charAt(0) + camel.slice(1)
	  }
	
	  if (name.charAt(0) === '-') {
	    return camel.indexOf('ms') === 0 ? camel
	      : camel.charAt(0).toUpperCase() + camel.slice(1)
	  } else {
	    return camel
	  }
	}
	
	module.exports = styleCamelCase


/***/ }),

/***/ 515:
/***/ (function(module, exports) {

	var Window = {
	  getComputedStyle: function (node) {
	    return {
	      getPropertyValue: node.style.getProperty
	    }
	  }
	}
	
	module.exports = Window


/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

	var Element = __webpack_require__(503)
	var mapValues = __webpack_require__(513)
	
	var mixin = {
	  componentWillMount: function () {
	    this.connectedFauxDOM = {}
	    this.animateFauxDOMUntil = 0
	  },
	  connectFauxDOM: function (node, name) {
	    if (!this.connectedFauxDOM[name]) {
	      this.connectedFauxDOM[name] = typeof node !== 'string' ? node : new Element(node)
	      setTimeout(this.drawFauxDOM)
	    }
	    return this.connectedFauxDOM[name]
	  },
	  drawFauxDOM: function () {
	    var virtualDOM = mapValues(this.connectedFauxDOM, function (n) {
	      return n.toReact()
	    })
	    this.setState(virtualDOM)
	  }
	}
	
	module.exports = mixin


/***/ }),

/***/ 517:
/***/ (function(module, exports) {

	var anim = {
	  animateFauxDOM: function (duration) {
	    this.animateFauxDOMUntil = Math.max(Date.now() + duration, this.animateFauxDOMUntil)
	    if (!this.fauxDOMAnimationInterval) {
	      this.fauxDOMAnimationInterval = setInterval(function () {
	        if (Date.now() < this.animateFauxDOMUntil) {
	          this.drawFauxDOM()
	        } else {
	          this.stopAnimatingFauxDOM()
	        }
	      }.bind(this), 16)
	    }
	  },
	  stopAnimatingFauxDOM: function () {
	    this.fauxDOMAnimationInterval = clearInterval(this.fauxDOMAnimationInterval)
	    this.animateFauxDOMUntil = 0
	  },
	  isAnimatingFauxDOM: function () {
	    return !!this.fauxDOMAnimationInterval
	  },
	  componentWillUnmount: function () {
	    this.stopAnimatingFauxDOM()
	  }
	}
	
	module.exports = anim


/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.d3||(g.d3 = {}));g=(g.layout||(g.layout = {}));g.cloud = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	// Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
	// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
	
	var dispatch = require("d3-dispatch").dispatch;
	
	var cloudRadians = Math.PI / 180,
	    cw = 1 << 11 >> 5,
	    ch = 1 << 11;
	
	module.exports = function() {
	  var size = [256, 256],
	      text = cloudText,
	      font = cloudFont,
	      fontSize = cloudFontSize,
	      fontStyle = cloudFontNormal,
	      fontWeight = cloudFontNormal,
	      rotate = cloudRotate,
	      padding = cloudPadding,
	      spiral = archimedeanSpiral,
	      words = [],
	      timeInterval = Infinity,
	      event = dispatch("word", "end"),
	      timer = null,
	      random = Math.random,
	      cloud = {},
	      canvas = cloudCanvas;
	
	  cloud.canvas = function(_) {
	    return arguments.length ? (canvas = functor(_), cloud) : canvas;
	  };
	
	  cloud.start = function() {
	    var contextAndRatio = getContext(canvas()),
	        board = zeroArray((size[0] >> 5) * size[1]),
	        bounds = null,
	        n = words.length,
	        i = -1,
	        tags = [],
	        data = words.map(function(d, i) {
	          d.text = text.call(this, d, i);
	          d.font = font.call(this, d, i);
	          d.style = fontStyle.call(this, d, i);
	          d.weight = fontWeight.call(this, d, i);
	          d.rotate = rotate.call(this, d, i);
	          d.size = ~~fontSize.call(this, d, i);
	          d.padding = padding.call(this, d, i);
	          return d;
	        }).sort(function(a, b) { return b.size - a.size; });
	
	    if (timer) clearInterval(timer);
	    timer = setInterval(step, 0);
	    step();
	
	    return cloud;
	
	    function step() {
	      var start = Date.now();
	      while (Date.now() - start < timeInterval && ++i < n && timer) {
	        var d = data[i];
	        d.x = (size[0] * (random() + .5)) >> 1;
	        d.y = (size[1] * (random() + .5)) >> 1;
	        cloudSprite(contextAndRatio, d, data, i);
	        if (d.hasText && place(board, d, bounds)) {
	          tags.push(d);
	          event.call("word", cloud, d);
	          if (bounds) cloudBounds(bounds, d);
	          else bounds = [{x: d.x + d.x0, y: d.y + d.y0}, {x: d.x + d.x1, y: d.y + d.y1}];
	          // Temporary hack
	          d.x -= size[0] >> 1;
	          d.y -= size[1] >> 1;
	        }
	      }
	      if (i >= n) {
	        cloud.stop();
	        event.call("end", cloud, tags, bounds);
	      }
	    }
	  }
	
	  cloud.stop = function() {
	    if (timer) {
	      clearInterval(timer);
	      timer = null;
	    }
	    return cloud;
	  };
	
	  function getContext(canvas) {
	    canvas.width = canvas.height = 1;
	    var ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
	    canvas.width = (cw << 5) / ratio;
	    canvas.height = ch / ratio;
	
	    var context = canvas.getContext("2d");
	    context.fillStyle = context.strokeStyle = "red";
	    context.textAlign = "center";
	
	    return {context: context, ratio: ratio};
	  }
	
	  function place(board, tag, bounds) {
	    var perimeter = [{x: 0, y: 0}, {x: size[0], y: size[1]}],
	        startX = tag.x,
	        startY = tag.y,
	        maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
	        s = spiral(size),
	        dt = random() < .5 ? 1 : -1,
	        t = -dt,
	        dxdy,
	        dx,
	        dy;
	
	    while (dxdy = s(t += dt)) {
	      dx = ~~dxdy[0];
	      dy = ~~dxdy[1];
	
	      if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;
	
	      tag.x = startX + dx;
	      tag.y = startY + dy;
	
	      if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 ||
	          tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
	      // TODO only check for collisions within current bounds.
	      if (!bounds || !cloudCollide(tag, board, size[0])) {
	        if (!bounds || collideRects(tag, bounds)) {
	          var sprite = tag.sprite,
	              w = tag.width >> 5,
	              sw = size[0] >> 5,
	              lx = tag.x - (w << 4),
	              sx = lx & 0x7f,
	              msx = 32 - sx,
	              h = tag.y1 - tag.y0,
	              x = (tag.y + tag.y0) * sw + (lx >> 5),
	              last;
	          for (var j = 0; j < h; j++) {
	            last = 0;
	            for (var i = 0; i <= w; i++) {
	              board[x + i] |= (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
	            }
	            x += sw;
	          }
	          delete tag.sprite;
	          return true;
	        }
	      }
	    }
	    return false;
	  }
	
	  cloud.timeInterval = function(_) {
	    return arguments.length ? (timeInterval = _ == null ? Infinity : _, cloud) : timeInterval;
	  };
	
	  cloud.words = function(_) {
	    return arguments.length ? (words = _, cloud) : words;
	  };
	
	  cloud.size = function(_) {
	    return arguments.length ? (size = [+_[0], +_[1]], cloud) : size;
	  };
	
	  cloud.font = function(_) {
	    return arguments.length ? (font = functor(_), cloud) : font;
	  };
	
	  cloud.fontStyle = function(_) {
	    return arguments.length ? (fontStyle = functor(_), cloud) : fontStyle;
	  };
	
	  cloud.fontWeight = function(_) {
	    return arguments.length ? (fontWeight = functor(_), cloud) : fontWeight;
	  };
	
	  cloud.rotate = function(_) {
	    return arguments.length ? (rotate = functor(_), cloud) : rotate;
	  };
	
	  cloud.text = function(_) {
	    return arguments.length ? (text = functor(_), cloud) : text;
	  };
	
	  cloud.spiral = function(_) {
	    return arguments.length ? (spiral = spirals[_] || _, cloud) : spiral;
	  };
	
	  cloud.fontSize = function(_) {
	    return arguments.length ? (fontSize = functor(_), cloud) : fontSize;
	  };
	
	  cloud.padding = function(_) {
	    return arguments.length ? (padding = functor(_), cloud) : padding;
	  };
	
	  cloud.random = function(_) {
	    return arguments.length ? (random = _, cloud) : random;
	  };
	
	  cloud.on = function() {
	    var value = event.on.apply(event, arguments);
	    return value === event ? cloud : value;
	  };
	
	  return cloud;
	};
	
	function cloudText(d) {
	  return d.text;
	}
	
	function cloudFont() {
	  return "serif";
	}
	
	function cloudFontNormal() {
	  return "normal";
	}
	
	function cloudFontSize(d) {
	  return Math.sqrt(d.value);
	}
	
	function cloudRotate() {
	  return (~~(Math.random() * 6) - 3) * 30;
	}
	
	function cloudPadding() {
	  return 1;
	}
	
	// Fetches a monochrome sprite bitmap for the specified text.
	// Load in batches for speed.
	function cloudSprite(contextAndRatio, d, data, di) {
	  if (d.sprite) return;
	  var c = contextAndRatio.context,
	      ratio = contextAndRatio.ratio;
	
	  c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
	  var x = 0,
	      y = 0,
	      maxh = 0,
	      n = data.length;
	  --di;
	  while (++di < n) {
	    d = data[di];
	    c.save();
	    c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
	    var w = c.measureText(d.text + "m").width * ratio,
	        h = d.size << 1;
	    if (d.rotate) {
	      var sr = Math.sin(d.rotate * cloudRadians),
	          cr = Math.cos(d.rotate * cloudRadians),
	          wcr = w * cr,
	          wsr = w * sr,
	          hcr = h * cr,
	          hsr = h * sr;
	      w = (Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5 << 5;
	      h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
	    } else {
	      w = (w + 0x1f) >> 5 << 5;
	    }
	    if (h > maxh) maxh = h;
	    if (x + w >= (cw << 5)) {
	      x = 0;
	      y += maxh;
	      maxh = 0;
	    }
	    if (y + h >= ch) break;
	    c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
	    if (d.rotate) c.rotate(d.rotate * cloudRadians);
	    c.fillText(d.text, 0, 0);
	    if (d.padding) c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0);
	    c.restore();
	    d.width = w;
	    d.height = h;
	    d.xoff = x;
	    d.yoff = y;
	    d.x1 = w >> 1;
	    d.y1 = h >> 1;
	    d.x0 = -d.x1;
	    d.y0 = -d.y1;
	    d.hasText = true;
	    x += w;
	  }
	  var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
	      sprite = [];
	  while (--di >= 0) {
	    d = data[di];
	    if (!d.hasText) continue;
	    var w = d.width,
	        w32 = w >> 5,
	        h = d.y1 - d.y0;
	    // Zero the buffer
	    for (var i = 0; i < h * w32; i++) sprite[i] = 0;
	    x = d.xoff;
	    if (x == null) return;
	    y = d.yoff;
	    var seen = 0,
	        seenRow = -1;
	    for (var j = 0; j < h; j++) {
	      for (var i = 0; i < w; i++) {
	        var k = w32 * j + (i >> 5),
	            m = pixels[((y + j) * (cw << 5) + (x + i)) << 2] ? 1 << (31 - (i % 32)) : 0;
	        sprite[k] |= m;
	        seen |= m;
	      }
	      if (seen) seenRow = j;
	      else {
	        d.y0++;
	        h--;
	        j--;
	        y++;
	      }
	    }
	    d.y1 = d.y0 + seenRow;
	    d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
	  }
	}
	
	// Use mask-based collision detection.
	function cloudCollide(tag, board, sw) {
	  sw >>= 5;
	  var sprite = tag.sprite,
	      w = tag.width >> 5,
	      lx = tag.x - (w << 4),
	      sx = lx & 0x7f,
	      msx = 32 - sx,
	      h = tag.y1 - tag.y0,
	      x = (tag.y + tag.y0) * sw + (lx >> 5),
	      last;
	  for (var j = 0; j < h; j++) {
	    last = 0;
	    for (var i = 0; i <= w; i++) {
	      if (((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0))
	          & board[x + i]) return true;
	    }
	    x += sw;
	  }
	  return false;
	}
	
	function cloudBounds(bounds, d) {
	  var b0 = bounds[0],
	      b1 = bounds[1];
	  if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
	  if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
	  if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
	  if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
	}
	
	function collideRects(a, b) {
	  return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
	}
	
	function archimedeanSpiral(size) {
	  var e = size[0] / size[1];
	  return function(t) {
	    return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
	  };
	}
	
	function rectangularSpiral(size) {
	  var dy = 4,
	      dx = dy * size[0] / size[1],
	      x = 0,
	      y = 0;
	  return function(t) {
	    var sign = t < 0 ? -1 : 1;
	    // See triangular numbers: T_n = n * (n + 1) / 2.
	    switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
	      case 0:  x += dx; break;
	      case 1:  y += dy; break;
	      case 2:  x -= dx; break;
	      default: y -= dy; break;
	    }
	    return [x, y];
	  };
	}
	
	// TODO reuse arrays?
	function zeroArray(n) {
	  var a = [],
	      i = -1;
	  while (++i < n) a[i] = 0;
	  return a;
	}
	
	function cloudCanvas() {
	  return document.createElement("canvas");
	}
	
	function functor(d) {
	  return typeof d === "function" ? d : function() { return d; };
	}
	
	var spirals = {
	  archimedean: archimedeanSpiral,
	  rectangular: rectangularSpiral
	};
	
	},{"d3-dispatch":2}],2:[function(require,module,exports){
	// https://d3js.org/d3-dispatch/ Version 1.0.3. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var noop = {value: function() {}};
	
	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}
	
	function Dispatch(_) {
	  this._ = _;
	}
	
	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}
	
	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;
	
	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	      return;
	    }
	
	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	    }
	
	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};
	
	function get(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}
	
	function set(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}
	
	exports.dispatch = dispatch;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	
	},{}]},{},[1])(1)
	});

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultFontSizeMapper = undefined;
	
	var _defaultFontSizeMapper2 = __webpack_require__(520);
	
	var _defaultFontSizeMapper3 = _interopRequireDefault(_defaultFontSizeMapper2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.defaultFontSizeMapper = _defaultFontSizeMapper3.default;

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultFontSizeMapper = function defaultFontSizeMapper(word) {
	  return word.value;
	};
	
	exports.default = defaultFontSizeMapper;

/***/ })

/******/ });
//# sourceMappingURL=word-cloud-bundle.js.map