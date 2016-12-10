import {Component} from 'react';

/* IceBox List */
var URL_BASE = 'localhost:5000'
	PENDING_LIST_URL = URL_BASE + "db/getIceboxEntries",
	CURRENT_LIST_URL = URL_BASE +"db/getMainEntries",
	APPROVE_URL = URL_BASE + "db/approve",
	REMOVE_URL = URL_BASE + "db/remove";

//recipe = (recipe['name'], recipe['ingredients'], keyCounter);

var approveRecipe = function(argument) {
    $.ajax({
	    url: APPROVE_URL,
	    type: 'POST',
	    data: {}
	}).done(function(data) {
		    this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		    console.error(this.props.pendingListUrl, status, err.toString());
	    }.bind(this)
    });
}	

var removeRecipe = function(argument) {
    $.ajax({
	    url: REMOVE_URL,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		    this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		    console.error(this.props.pendingListUrl, status, err.toString());
	    }.bind(this)
    });
}

//recipe = (recipe['name'], recipe['ingredients'], keyCounter);
var IceBox = React.createClass({
	getInitialState() {
		mainRecipes: [],
		pendingRecipes: []
	},
    loadDataFromServer: function() {
	    $.ajax({
		    url: this.props.pendingListUrl,
		    dataType: 'json',
		    cache: false,
		    success: function(data) {
			    this.setState({data: data});
		    }.bind(this),
		    error: function(xhr, status, err) {
			    console.error(this.props.pendingListUrl, status, err.toString());
		    }.bind(this)
	    });
    },
    getInitialState: function() {
        return {data: ['Loading Data from the iceBox']}
    },
    componentDidMount: function() {
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, this.props.pollInterval)
    },
	render: function() {
		var mainIngredients = this.state.mainIngredients;
		var pendingIngredients = this.state.pendingIngredients;
		return (
			<div className="iceBox">
				Pending Items List
				<div className="iceBoxListWrapper">
					<PendingRecipeList
						pendingRecipes={this.state.pendingRecipes};
					/>
				</div>
				<div className="mainListWrapper">
					<MainRecipeList
						mainRecipes={this.state.mainRecipes};
					/>
				</div>

			</div>
		)
	}
});

var PendingRecipeList = React.createClass({
	render: function() {
		var pendingRecipes = this.props.pendingRecipe;
		var pendingRecipeNodes = pendingRecipes.map(function(pendingRecipe, i) {
			return (
				<PendingRecipe pendingRecipe={pendingRecipe} key={i} index={i} />
			)
		})
		return (
			<div className="pendingRecipeList">
				{pendingRecipeNodes}
			</div>
		)
	}
})


var MainRecipeList = React.createClass({
	render: function() {
		var mainRecipeList = this.props.mainIngredients;
		var mainRecipeNodes = mainRecipeList.map(function(mainRecipe, i) {
			return (
				<MainRecipe mainRecipe = {mainRecipe} key={i} index={i} />
			)
		})
	return (
		<div className="mainRecipeList">
			{mainRecipeNodes}
		</div>
	)
}});

var MainRecipe = React.createClass({
	getInitialState: function() {
		recipeData: this.props.mainRecipe,
		newIngredientField: "";
	},
	handleFieldChange: function(e) {
		this.setState({
			newIngredientField: e.target.value;
		})
	},
	handleClickSave: function() {
		//Call the save
	},
	handleAddClick: function() {
		//Call the add function
	},
	handleDeleteClick: function() {

	},
	render: function() {
		return (
			<div className="mainRecipe">
				<IngredientsList />
			</div>
		)
	}
})

var IceBoxRecipe = React.createClass({
	getInitialState: function() {
		recipeData = this.props.mainRecipe,
		newRecipeField = "";
	},
	handleFieldChange: function(e) {
		this.setState({
			newIngredientField: e.target.value;
		})
	},
	handleClickSave: function() {
		//Call the save
	},
	handleAddClick: function() {
		//Call the add function
	},
	handleDeleteClick: function() {

	},
	render: function() {
		return (
			<div className="iceBoxRecipe">
				<IngredientsList />
			</div>
		)
	}
})

var IngredientList = React.createClass({
	getInitialState: function() {
		recipeData = this.props.mainRecipe,
		textField: "";
	},
	handleClickSave: function() {
		//Send field to endpoint
	},
	render: function() {
		ingredientNodes = this.props.recipeData.map(function(ingredient, i) {
			return (
				<Ingredient ingredient={ingredient} index={i}/>
			)
		})
		return: function() {
			return (
				<div className="ingredientList">
					{ingredientNode}
				</div>
			)
		}
	}
})

//Add an additional field if it is in the icebox
var Ingredient = React.createClass({
	getInitialState: function() {
		textField: this.props.ingredient
	},
	handleFieldChange: function(e) {
		this.setState({
			textField: e.target.value;
		})
	},
	handleClickSave: function() {

	},
	handleDeleteClick: function() {

	},
	render: function() {
		return function() {
			<div className={"ingredient" + this.props.index } >
				<form className="ingredientForm">
					<input className="ingredientField" type="text" value={this.state.textField} />
					<button className="saveButton" type="button" value="save" onClick={this.handleClickSave}/>
					<button className="saveButton" type="button" value="delete" onClick{this.handleDeleteClick}/>
				</form>
			</div>
		}
	}
})

//React Driver Attach and render #mainEntries, easier than pending
//Add US to guard against messing up data fast, have buttons or something
//THIS fixed the CORS error by hitting a proper route
ReactDOM.render(
    <IceBox pendingListUrl="/db/getIceBoxEntries" pollInterval={3 * 60 * 1000} />,
    document.getElementById('content')
);