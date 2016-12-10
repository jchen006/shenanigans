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
		mainIngredients: [],
		pendingIngredients: []
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
					<IceBoxRecipeList


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
	}

	return (
		<div className="pendingRecipeList">
			{pendingRecipeNodes}
		</div>
	)
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
})


var MainRecipe = React.createClass({
	getInitialState: function() {
		recipeData: this.props.mainRecipe,
		newIngredientField: "";
	}
	handleChange: function(e) {
		this.setState({
			newIngredientField: e.target.value;
		})
	}
	handleAddIngredientClick: function() {

	}
	render: function() {
		return (
			<div className="mainRecipe"
				<IngredientsList />
			</div>
		)
	}
})

var IceBoxRecipe = React.createClass({
	getInitialState: function() {
		recipeData = this.props.mainRecipe,
		newRecipeField = "";
	}
	handleChange: function(e) {
		this.setState({
			newIngredientField: e.target.value;
		})
	}
	handleAddIngredientClick: function() {

	}
	render: function() {
		return (
			<div className="iceBoxRecipe"
				<IngredientsList />
			</div>
		)
	}
})

var ingredientList = React.createClass({
	getInitialState: function() {
		textField: "";
	}
	handleEditClick: function() {

	}
	handleDeleteClick: function() {

	}
	return: function() {
		return (

		)
	}

})


//I need to pass down the function
var IceBoxRecipeList = React.createClass({
	render: function() {
		var self = this;
		var recipeListNodes = this.props.pendingRecipes.map(function(recipe) {
			return (
				<div className="iceBoxIngredientList">
					<IceBoxIngredientsList 
						name={recipe[0]} 
						ingredients={recipe[1]}
						key={recipe[0]}
						onRecipeApprove={self.props.onRecipeApprove}
						onRecipeRemove={self.props.onRecipeRemove}
					/> 
				</div>
			)
		})
		return (
			<div className="iceBoxRecipeList">
				{recipeListNodes}
			</div>
		)
	}
});

var IceBoxIngredientsList = React.createClass({
	getInitialState: function() {
		return {recipeName: this.props.name, ingredientList: this.props.ingredients, displayIngredients: false}
	},
	toggleDisplayIngredients: function() {
		this.setState({
			this.state.displayIngredients = !this.state.displayIngredients
		})
	},
	render: function() {
		var self = this;
		var ingredientsNodes = this.props.ingredients.map(function(ingredient) {
			return (
				<div className="ingredientList">
					<IceBoxItem 
						name={ingredient} 



					/>
				</div>
			)
		})
		/*Render Logic can it be implemented like this? */
		if (this.displayIngredients) {
			return (
				<div className="recipeContainer">
					Recipe Name: {this.props.name}
					<button onClick={this.toggleDisplayIngredients}> Collapse Recipe </button>
					<button onClick={this.handleRecipeApprove}> Approve Recipe </button>
					<button onClick={this.handleRecipeRemove}> Remove Recipe </button>
					{ingredientsNodes}
				</div>
			)
		}
		return (
			<div className="recipeContainer">
				Recipe Name: {this.props.name}
				<button onClick={this.toggleDisplayIngredients}> Expand Recipe </button>
				<button onClick={this.handleRecipeApprove}> Approve Recipe </button>
				<button onClick={this.handleRecipeRemove}> Remove Recipe </button>
			</div>
		)
	}
});

//Might want to mod this to also have ingredients, in their own separate list and render them separately
var IceBoxItem = React.createClass({
	getInitialState: function() {
		return {pendingItem: this.props.name}
	},
	updateItem: function(e) {
		this.setState({
			pendingItem: e.target.value
		})
	},
	handleApprove: function() {
		this.props.onItemApprove(this.state.pendingItem)
	},
	handleRemove: function() {
		this.props.onItemRemove(this.state.pendingItem)
	},
	render: function() {
		return (
			<div className="pendingItem">
				<input type="text" value={this.state.pendingItem} onChange={this.updateItem}/>
				<button onClick={this.handleApprove}> Approve Item </button>
				<button onClick={this.handleRemove}> Remove Item </button>
			</div>
		)
	}
});


//React Driver Attach and render #mainEntries, easier than pending
//Add US to guard against messing up data fast, have buttons or something
//THIS fixed the CORS error by hitting a proper route
ReactDOM.render(
    <IceBox pendingListUrl="/db/getIceBoxEntries" pollInterval={3 * 60 * 1000} />,
    document.getElementById('content')
);