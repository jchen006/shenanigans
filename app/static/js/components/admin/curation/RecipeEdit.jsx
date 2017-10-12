import React, { PropTypes } from 'react'
import { FieldGroup } from 'react-bootstrap'

const RecipeEdit = React.createClass({
  propTypes: {
    recipe: PropTypes.object
  },

  getInitialState() {
    return ({
      name: this.props.recipe.name,
      chef: this.props.recipe.chef,
      ingredients: this.props.recipe.ingredients
    })
  },

  renderNameField() {
    return (
      
    )
  },

  // Cannot be changed
  renderMongoId() {

  },

  //Cannot be changed
  renderUrl() {

  },

  renderChef() {

  },

  renderOriginalIngredients() {

  },

  renderFilteredIngredients() {

  },

  renderCuisine() {

  },

  render() {
    return (
      <div className="recipe-edit"> 
        { this.renderTitleField() }
        { this.renderMongoId() }
        { this.renderUrl() }
        { this.renderChef() }
        { this.renderOriginalIngredients() }
        { this.renderFilteredIngredients() }
        { this.renderCuisine() }
        { this.renderUpdateButton() }
      </div>
    )
  }
})

export default RecipeEdit