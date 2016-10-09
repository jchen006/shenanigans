/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	URL_BASE = 'localhost:5000';
	PENDING_LIST_URL = URL_BASE + "/getIceboxEntries";
	CURRENT_LIST_URL = URL_BASE + "/getMainEntries";
	APPROVE_URL = URL_BASE + "/approve";
	REMOVE_URL = URL_BASE + "/remove";

	var IceBox = React.createClass({
		displayName: "IceBox",

		loadDataFromSever: function loadDataFromSever() {
			$.ajax({
				url: this.props.pendingListUrl,
				dataType: 'json',
				cache: false,
				success: function (data) {
					this.setState({ data: data });
				}.bind(this),
				error: function (xhr, status, err) {
					console.error(this.props.pendingListUrl, status, err.toString());
				}.bind(this)
			});
		},
		getInitialState: function getInitialState() {
			return { data: ['Ingredient1', 'Ingredient2', 'Ingredient3'] };
		},
		/*
	 componentDidMount: function() {
	     this.loadDataFromServer();
	     setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	 },
	 */
		render: function render() {
			return React.createElement(
				"div",
				{ className: "iceBox" },
				"\"IceBox is here\""
			);
		}
	});

	var IceBoxList = React.createClass({
		displayName: "IceBoxList",

		//Passdown the approve link
		render: function render() {
			var itemNodes = this.props.data.map(function (items) {
				return React.createElement(
					IceBoxItem,
					null,
					"Sample Ingredient"
				);
			});
			return React.createElement(
				"div",
				{ className: "IceBoxList" },
				itemNodes
			);
		}
	});

	var IceBoxItem = React.createClass({
		displayName: "IceBoxItem",

		getInitialState: function getInitialState() {
			return { pendingItem: this.props.pendingItem };
		},
		render: function render() {
			return React.createElement(
				"div",
				{ className: "pendingItem" },
				"This is ",
				this.state.pendingItem
			);
		}
	});

	//React Driver Attach and render
	ReactDOM.render(React.createElement(IceBox, { pendingListUrl: "/getIceboxEntries", pollInterval: 60000 }), document.getElementById('content'));

/***/ }
/******/ ]);