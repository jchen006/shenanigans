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

	import { Component } from 'react';

	/* IceBox ROUTES */
	var URL_BASE = 'localhost:5000';
	PENDING_LIST_URL = URL_BASE + "db/getIceboxEntries", CURRENT_LIST_URL = URL_BASE + "db/getMainEntries", APPROVE_URL = URL_BASE + "db/approve", REMOVE_URL = URL_BASE + "db/remove", ADD_URL = URL_BASE + "db/add", EDIT_URL = URL_BASE + "db/edit";

	//recipe = (recipe['name'], recipe['ingredients'], keyCounter);
	var approveRecipe = function (recipe) {
		$.ajax({
			url: APPROVE_URL,
			type: 'POST',
			dataType: 'json',
			data: { recipe: recipe },
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				alert(err.toString());
			}.bind(this)
		});
	};

	var removeRecipe = function (recipe) {
		$.ajax({
			url: REMOVE_URL,
			dataType: 'json',
			data: { recipe: recipe },
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				alert(err.toString());
			}.bind(this)
		});
	};

	var addRecipe = function (recipe) {
		$.ajax({
			url: ADD_URL,
			dataType: 'json',
			data: { recipe: recipe },
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				alert(err.toString());
			}.bind(this)
		});
	};

	var editRecipe = function (recipe) {
		$.ajax({
			url: EDIT_URL,
			dataType: 'json',
			data: { current_recipe: recipe, updated_recipe },
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				alert(err.toString());
			}.bind(this)
		});
	};

	//recipe = (recipe['name'], recipe['ingredients'], keyCounter);
	var IceBox = React.createClass({
		displayName: 'IceBox',

		getInitialState: function () {
			return {
				mainRecipes: [],
				pendingRecipes: []
			};
		},
		loadDataFromServer: function () {
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
			return { data: ['Loading Data from the iceBox'] };
		},
		componentDidMount: function () {
			this.loadDataFromServer();
			setInterval(this.loadDataFromServer, this.props.pollInterval);
		},
		render: function () {
			var mainIngredients = this.state.mainIngredients;
			var pendingIngredients = this.state.pendingIngredients;
			return React.createElement(
				'div',
				{ className: 'iceBox' },
				'Pending Items List',
				React.createElement(
					'div',
					{ className: 'iceBoxListWrapper' },
					React.createElement(PendingRecipeList, {
						pendingRecipes: this.state.pendingRecipes
					})
				),
				React.createElement(
					'div',
					{ className: 'mainListWrapper' },
					React.createElement(MainRecipeList, {
						mainRecipes: this.state.mainRecipes
					})
				)
			);
		}
	});

	var PendingRecipeList = React.createClass({
		displayName: 'PendingRecipeList',

		render: function () {
			var pendingRecipes = this.props.pendingRecipe;
			var pendingRecipeNodes = pendingRecipes.map(function (pendingRecipe, i) {
				return React.createElement(PendingRecipe, { pendingRecipe: pendingRecipe, key: i, index: i });
			});
			return React.createElement(
				'div',
				{ className: 'pendingRecipeList' },
				pendingRecipeNodes
			);
		}
	});

	var MainRecipeList = React.createClass({
		displayName: 'MainRecipeList',

		render: function () {
			var mainRecipeList = this.props.mainIngredients;
			var mainRecipeNodes = mainRecipeList.map(function (mainRecipe, i) {
				return React.createElement(MainRecipe, { mainRecipe: mainRecipe, key: i, index: i });
			});
			return React.createElement(
				'div',
				{ className: 'mainRecipeList' },
				mainRecipeNodes
			);
		} });

	var MainRecipe = React.createClass({
		displayName: 'MainRecipe',

		getInitialState: function () {
			return {
				recipeData: this.props.mainRecipe,
				newIngredientField: ""
			};
		},
		handleFieldChange: function (e) {
			this.setState({
				newIngredientField: e.target.value
			});
		}.bind(this),
		handleClickSave: function (recipe) {
			approveRecipe(recipe);
		}.bind(this),
		handleAddClick: function (recipe) {
			addRecipe(recipe);
		}.bind(this),
		handleDeleteClick: function (recipe) {
			removeRecipe(recipe);
		}.bind(this),
		render: function () {
			return React.createElement(
				'div',
				{ className: 'mainRecipe' },
				React.createElement(IngredientsList, { className: 'mainIngredientList',
					handleFieldChange: this.handleFieldChange,
					handleClickSave: this.handleClickSave,
					handleAddClick: this.handleAddClick,
					handleDeleteClick: this.handleDeleteClick })
			);
		}
	});

	var IceBoxRecipe = React.createClass({
		displayName: 'IceBoxRecipe',

		getInitialState: function () {
			return {
				recipeData: this.props.mainRecipe,
				newRecipeField: ""
			};
		},
		handleFieldChange: function (e) {
			this.setState({
				newIngredientField: e.target.value
			});
		}.bind(this),
		handleClickSave: function (recipe) {
			approveRecipe(recipe);
		}.bind(this),
		handleAddClick: function (recipe) {
			addRecipe(recipe);
		}.bind(this),
		handleDeleteClick: function (recipe) {
			removeRecipe(recipe);
		}.bind(this),
		render: function () {
			return React.createElement(
				'div',
				{ className: 'iceBoxRecipe' },
				React.createElement(IngredientsList, { className: 'iceBoxIngredientList',
					handleFieldChange: this.handleFieldChange,
					handleClickSave: this.handleClickSave,
					handleAddClick: this.handleAddClick,
					handleDeleteClick: this.handleDeleteClick })
			);
		}
	});

	var IngredientList = React.createClass({
		displayName: 'IngredientList',

		getInitialState: function () {
			return {
				recipeData: this.props.mainRecipe,
				textField: ""
			};
		},
		handleClickSave: function () {
			approveRecipe(this.state);
		}.bind(this),
		render: function () {
			var ingredientNodes = this.props.recipeData.map(function (ingredient, i) {
				return React.createElement(Ingredient, { ingredient: ingredient, index: i });
			});
			return function () {
				React.createElement(
					'div',
					{ className: 'ingredientList' },
					React.createElement('button', { className: 'ingredientListSaveBtn', onClick: handleClickSave }),
					ingredientNode
				);
			};
		}
	});

	//Add an additional field if it is in the icebox
	var Ingredient = React.createClass({
		displayName: 'Ingredient',

		getInitialState: function () {
			return {
				textField: this.props.ingredient
			};
		},
		handleFieldChange: function (e) {
			this.setState({
				textField: e.target.value
			});
		}.bind(this),
		handleClickSave: function () {}.bind(this),
		handleDeleteClick: function () {}.bind(this),
		render: function () {
			return function () {
				React.createElement(
					'div',
					{ className: "ingredient" + this.props.index },
					React.createElement(
						'form',
						{ className: 'ingredientForm' },
						React.createElement('input', { className: 'ingredientField', type: 'text', value: this.state.textField }),
						React.createElement('button', { className: 'saveButton', type: 'button', value: 'save', onClick: this.handleClickSave }),
						React.createElement('button', { className: 'saveButton', type: 'button', value: 'delete', onClick: this.handleDeleteClick })
					)
				);
			};
		}
	});

	//React Driver Attach and render #mainEntries, easier than pending
	//Add US to guard against messing up data fast, have buttons or something
	//THIS fixed the CORS error by hitting a proper route
	ReactDOM.render(React.createElement(IceBox, { pendingListUrl: '/db/getIceBoxEntries', pollInterval: 3 * 60 * 1000 }), document.getElementById('content'));

/***/ }
/******/ ]);