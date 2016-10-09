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

	var URL_BASE = 'localhost:5000';
	PENDING_LIST_URL = URL_BASE + "/getIceboxEntries";
	CURRENT_LIST_URL = URL_BASE + "/getMainEntries";
	APPROVE_URL = URL_BASE + "/approve";
	REMOVE_URL = URL_BASE + "/remove";

	var IceBox = React.createClass({
		displayName: "IceBox",

		loadDataFromServer: function () {
			//Mispelling caused server to not be recognized
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
		getInitialState: function () {
			return { data: ['Ingredient1', 'Ingredient2', 'Ingredient3', 'Recipe1', 'Recipe2'] };
		},
		componentDidMount: function () {
			this.loadDataFromServer();
			setInterval(this.loadDataFromServer, this.props.pollInterval);
		},
		//Utility functions to Approve and Remove Items - Need the correct JS
		approveItem: function (item) {
			this.setState({
				data: this.state.data.concat([item])
			});
		},
		removeItem: function (item) {
			/*
	  var itemList = this.state.data
	  var removalIndex = itemList.indexOf(item)
	  if (index > -1) {
	  	itemList.splice(removalIndex, 1)
	  };
	  	this.setState({ data: itemList })
	  })
	  */
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "iceBox" },
				"Pending Items List",
				React.createElement(
					"div",
					{ className: "listWrapper" },
					React.createElement(IceBoxList, { pendingItems: this.state.data,
						onItemApprove: this.approveItem,
						onItemRemove: this.removeItem
					})
				)
			);
		}
	});

	var IceBoxList = React.createClass({
		displayName: "IceBoxList",

		render: function () {
			var itemNodes = this.props.pendingItems.map(function (item) {
				console.log(item, "here are the recipeItems");
				return React.createElement(
					"div",
					{ className: "itemWrapper" },
					React.createElement(IceBoxItem, { name: item[0], ingredients: item[1], key: item[2] })
				);
			});
			return React.createElement(
				"div",
				{ className: "iceBoxList" },
				itemNodes
			);
		}
	});

	var IceBoxItem = React.createClass({
		displayName: "IceBoxItem",

		getInitialState: function () {
			return { pendingItem: this.props.name };
		},
		updateItem: function (e) {
			this.setState({
				pendingItem: e.target.value
			});
		},
		handleApprove: function () {
			this.props.onItemApprove(this.state.pendingItem);
		},
		handleRemove: function () {
			this.props.onItemRemove(this.state.pendingItem);
		},
		render: function () {
			return React.createElement(
				"div",
				{ className: "pendingItem" },
				React.createElement("input", { type: "text", value: this.state.pendingItem, onChange: this.updateNewFriend }),
				React.createElement(
					"button",
					{ onClick: this.handleApprove },
					" Approve Item "
				),
				React.createElement(
					"button",
					{ onClick: this.handleRemove },
					" Remove Item "
				)
			);
		}
	});

	//React Driver Attach and render #mainEntries, easier than pending
	//Add US to guard against messing up data fast, have buttons or something
	//THIS fixed the CORS error by hitting a proper route
	ReactDOM.render(React.createElement(IceBox, { pendingListUrl: "/db/getMainEntries", pollInterval: 3 * 60 * 1000 }), document.getElementById('content'));

/***/ }
/******/ ]);