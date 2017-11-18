import React, { PropTypes } from 'react'
import InputField from '../InputField/InputField.jsx'

const RecipeEditForm = React.createClass({
  propTypes: {
    recipe: PropTypes.object,
    onUpdate: PropTypes.func
  },


//   <form>
//   <div class="form-group row">
//     <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
//     <div class="col-sm-10">
//       <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
//     </div>
//   </div>
//   <div class="form-group row">
//     <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
//     <div class="col-sm-10">
//       <input type="password" class="form-control" id="inputPassword" placeholder="Password">
//     </div>
//   </div>
// </form>

  renderMongoId() {
    return (
      <div className="form-group">
        <p> <strong>Mongo Id:</strong> {this.props.recipe._id ? this.props.recipe._id.$oid : ""} </p>
      </div>
    )
  },

  renderName() {
    console.log(this.props.recipe)
    return (
      <div className="form-group">
        <label for="recipe-name"> Recipe Name </label>
        <input type="text" className="form-control" value = { this.props.recipe ? this.props.recipe.name : ""} /> 
      </div>
    )
  },

  renderFilteredIngredients() {
    return (
      <div className="form-group"> 
        <label> Ingredients </label>
        { this.props.recipe.ingredients ? this.props.recipe.ingredients.map(ingredient => {
          return (<input type="text" className="form-control" value={ingredient}/>)
        }) : ""}
      </div>
    )

  },

  // renderOrignialIngredients() {

  // },

  // renderIngredients() {
  //   return (

  //   )
  // },

  renderCuisine() {
    //Selection based
  },

  renderChef() {
    return (
      <div className="form-group">
        <label for="recipe-name"> Chef </label>
        <input type="text" className="form-control" value = { this.props.recipe ? this.props.recipe.chef : ""} /> 
      </div>
    )
  },

  renderTags() {
    //Selection based
  },

  handleSubmit(event) {
    this.props.onUpdate(recipe)
  },

  handleChange(event) {
    var updateValue = event.target.value
  },

  render() {
    return (
      <div className="recipe-edit"> 
        <form onSubmit={this.handleSubmit}>
          { this.renderMongoId() }
          { this.renderName() }
          { this.renderFilteredIngredients()}
          { this.renderChef() }
        </form>
      </div>
    )
  }
})

export default RecipeEditForm