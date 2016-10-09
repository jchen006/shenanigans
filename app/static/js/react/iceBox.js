/* IceBox List */
var URL_BASE = 'localhost:5000'
	PENDING_LIST_URL = URL_BASE + "db/getIceboxEntries";
	CURRENT_LIST_URL = URL_BASE +"db/getMainEntries";
	APPROVE_URL = URL_BASE + "db/approve";
	REMOVE_URL = URL_BASE + "db/remove";

var IceBox = React.createClass({
    loadDataFromServer: function() { //Mispelling caused server to not be recognized
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
    //Remeber to send an ajax request, and modify state at the same time
    approveRecipe: function(recipeName) {

    },
    removeRecipe: function(recipeName) {

    },
    approveIngredient: function(recipeName, ingredientName) {

    },
    removeIngredient: function(recipeName, ingredientName) {

    },
	render: function() {
		return (
			<div className="iceBox">
				Pending Items List
				<div className="iceBoxListWrapper">
					<IceBoxRecipeList 
						pendingRecipes={this.state.data}
						onRecipeApprove={this.approveRecipe}
						onRecipeRemove={this.removeRecipe}
						onIngredientApprove={this.approveIngredient}
						onIngredientRemove={this.removeIngredient}
					/>
				</div>
			</div>
		)
	}
});

//I need to pass down the function
var IceBoxRecipeList = React.createClass({
	render: function() {
		var self = this;
		var recipeListNodes = this.props.pendingRecipes.map(function(recipe) {
			//I need to check to see if this scopin is correct
			return (
				<div className="iceBoxIngredientList">
					<IceBoxIngredientsList 
						name={recipe[0]} 
						ingredients={recipe[1]}
						key={recipe[0]}
						onRecipeApprove={self.props.onRecipeApprove}
						onRecipeRemove={self.props.onRecipeRemove}
						onIngredientApprove={self.props.onIngredientApprove}
						onIngredientRemove={self.props.onIngredientRemove}
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
		{this.state.displayIngredients = !this.state.displayIngredients}		
	},
	handleRecipeApprove: function() {

	},
	handleRecipeRemove: function() {

	},
	render: function() {
		var self = this;
		var ingredientsNodes = this.props.pendingRecipeIngredients.map(function(ingredient) {
			return (
				<div className="ingredientList">
					<IceBoxItem 
						name={ingredient} 
						onIngredientApprove={self.props.onIngredientApprove} 
						onIngredientRemove={self.this.props.onIngredientRemove}
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