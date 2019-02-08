import {Component} from 'react';
/*
DEPRECATE TO FULL REACT
 */
/* IceBox ROUTES */
var URL_BASE = "localhost:5000";
(PENDING_LIST_URL = URL_BASE + "db/getPendingEntries"),
  (CURRENT_LIST_URL = URL_BASE + "db/getDatabaseEntries"),
  (APPROVE_URL = URL_BASE + "db/approve"),
  (REMOVE_URL = URL_BASE + "db/deleteFromRemote"),
  (ADD_URL = URL_BASE + "db/addToRemote"),
  (EDIT_URL = URL_BASE + "db/edit");

//recipe = (recipe['name'], recipe['ingredients'], keyCounter);
var approveRecipe = function(recipe) {
  $.ajax({
    url: APPROVE_URL,
    type: "POST",
    dataType: "json",
    data: { recipe: recipe },
    success: function(data) {
      this.setState({ data: data });
    }.bind(this),
    error: function(xhr, status, err) {
      alert(err.toString());
    }.bind(this)
  });
};

var removeRecipe = function(recipe) {
  $.ajax({
    url: REMOVE_URL,
    dataType: "json",
    data: { recipe: recipe },
    cache: false,
    success: function(data) {
      this.setState({ data: data });
    }.bind(this),
    error: function(xhr, status, err) {
      alert(err.toString());
    }.bind(this)
  });
};

var addRecipe = function(recipe) {
  $.ajax({
    url: ADD_URL,
    dataType: "json",
    data: { recipe: recipe },
    cache: false,
    success: function(data) {
      this.setState({ data: data });
    }.bind(this),
    error: function(xhr, status, err) {
      alert(err.toString());
    }.bind(this)
  });
};

var editRecipe = function(recipe) {
  $.ajax({
    url: EDIT_URL,
    dataType: "json",
    data: { current_recipe: recipe, updated_recipe },
    cache: false,
    success: function(data) {
      this.setState({ data: data });
    }.bind(this),
    error: function(xhr, status, err) {
      alert(err.toString());
    }.bind(this)
  });
};

//recipe = (recipe['name'], recipe['ingredients'], keyCounter);
var IceBox = React.createClass({
  getInitialState: function() {
    return {
      mainRecipes: [],
      pendingRecipes: []
    };
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.pendingListUrl,
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.pendingListUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return { data: ["Loading Data from the iceBox"] };
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    setInterval(this.loadDataFromServer, this.props.pollInterval);
  },
  render: function() {
    var mainIngredients = this.state.mainIngredients;
    var pendingIngredients = this.state.pendingIngredients;
    return (
      <div className="iceBox">
        Pending Items List
        <div className="iceBoxListWrapper">
          <PendingRecipeList pendingRecipes={this.state.pendingRecipes} />
        </div>
        <div className="mainListWrapper">
          <MainRecipeList mainRecipes={this.state.mainRecipes} />
        </div>
      </div>
    );
  }
});

var PendingRecipeList = React.createClass({
  render: function() {
    var pendingRecipes = this.props.pendingRecipe;
    var pendingRecipeNodes = pendingRecipes.map(function(pendingRecipe, i) {
      return <PendingRecipe pendingRecipe={pendingRecipe} key={i} index={i} />;
    });
    return <div className="pendingRecipeList">{pendingRecipeNodes}</div>;
  }
});

var MainRecipeList = React.createClass({
  render: function() {
    var mainRecipeList = this.props.mainIngredients;
    var mainRecipeNodes = mainRecipeList.map(function(mainRecipe, i) {
      return <MainRecipe mainRecipe={mainRecipe} key={i} index={i} />;
    });
    return <div className="mainRecipeList">{mainRecipeNodes}</div>;
  }
});

var MainRecipe = React.createClass({
  getInitialState: function() {
    return {
      recipeData: this.props.mainRecipe,
      newIngredientField: ""
    };
  },
  handleFieldChange: function(e) {
    this.setState({
      newIngredientField: e.target.value
    });
  }.bind(this),
  handleClickSave: function(recipe) {
    approveRecipe(recipe);
  }.bind(this),
  handleAddClick: function(recipe) {
    addRecipe(recipe);
  }.bind(this),
  handleDeleteClick: function(recipe) {
    removeRecipe(recipe);
  }.bind(this),
  render: function() {
    return (
      <div className="mainRecipe">
        <IngredientsList
          className="mainIngredientList"
          handleFieldChange={this.handleFieldChange}
          handleClickSave={this.handleClickSave}
          handleAddClick={this.handleAddClick}
          handleDeleteClick={this.handleDeleteClick}
        />
      </div>
    );
  }
});

var IceBoxRecipe = React.createClass({
  getInitialState: function() {
    return {
      recipeData: this.props.mainRecipe,
      newRecipeField: ""
    };
  },
  handleFieldChange: function(e) {
    this.setState({
      newIngredientField: e.target.value
    });
  }.bind(this),
  handleClickSave: function(recipe) {
    approveRecipe(recipe);
  }.bind(this),
  handleAddClick: function(recipe) {
    addRecipe(recipe);
  }.bind(this),
  handleDeleteClick: function(recipe) {
    removeRecipe(recipe);
  }.bind(this),
  render: function() {
    return (
      <div className="iceBoxRecipe">
        <IngredientsList
          className="iceBoxIngredientList"
          handleFieldChange={this.handleFieldChange}
          handleClickSave={this.handleClickSave}
          handleAddClick={this.handleAddClick}
          handleDeleteClick={this.handleDeleteClick}
        />
      </div>
    );
  }
});

var IngredientList = React.createClass({
  getInitialState: function() {
    return {
      recipeData: this.props.mainRecipe,
      textField: ""
    };
  },
  handleClickSave: function() {
    approveRecipe(this.state);
  }.bind(this),
  render: function() {
    var ingredientNodes = this.props.recipeData.map(function(ingredient, i) {
      return <Ingredient ingredient={ingredient} index={i} />;
    });
    return function() {
      <div className="ingredientList">
        <button className="ingredientListSaveBtn" onClick={handleClickSave} />
        {ingredientNode}
      </div>;
    };
  }
});

//Add an additional field if it is in the icebox
var Ingredient = React.createClass({
  getInitialState: function() {
    return {
      textField: this.props.ingredient
    };
  },
  handleFieldChange: function(e) {
    this.setState({
      textField: e.target.value
    });
  }.bind(this),
  handleClickSave: function() {}.bind(this),
  handleDeleteClick: function() {}.bind(this),
  render: function() {
    return function() {
      <div className={"ingredient" + this.props.index}>
        <form className="ingredientForm">
          <input
            className="ingredientField"
            type="text"
            value={this.state.textField}
          />
          <button
            className="saveButton"
            type="button"
            value="save"
            onClick={this.handleClickSave}
          />
          <button
            className="saveButton"
            type="button"
            value="delete"
            onClick={this.handleDeleteClick}
          />
        </form>
      </div>;
    };
  }
});

//React Driver Attach and render #mainEntries, easier than pending
//Add US to guard against messing up data fast, have buttons or something
//THIS fixed the CORS error by hitting a proper route
ReactDOM.render(
  <IceBox pendingListUrl={PENDING_LIST_URL} pollInterval={3 * 60 * 1000} />,
  document.getElementById("content")
);
