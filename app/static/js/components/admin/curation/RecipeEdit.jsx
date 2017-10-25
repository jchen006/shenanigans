import React, { PropTypes } from 'react'
import { FieldGroup } from 'react-bootstrap'
import InlineEdit from 'react-edit-inline'

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

  dataUpdated(data) {
    console.log(data)
  },

  onUpdate() {

  },

  renderNameField() {
    console.log(this.state.name)
    return (
      <h2>
        <InlineEdit
          paramName = "name"
          text = { this.state.name ? this.state.name : ""}
          change = { this.dataUpdated }
          style = {{
            fontSize: 20
          }}
        />
      </h2>
    )
  },

  // Cannot be changed
  renderMongoId() {
    return (
      <p>
        <strong>Mongo Id: </strong> { this.props.recipe._id ? this.props.recipe._id.$oid : " " }
      </p>
    )
  },

  //Cannot be changed
  renderUrl() {
    return (
      <p>
        <strong>URL:</strong> { this.props.recipe.url}
      </p>
    )
  },

  renderChef() {
    return (
      <p>
        <strong>Chef:</strong> {this.state.chef}
      </p>
    )
  },

  renderIngredients() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6}>
            { this.renderOriginalIngredients() }
          </Col>
          <Col xs={6}>
            { this.renderFilteredIngredients() }
          </Col>
        </Row>
      </Grid>
    )
  },

  renderOriginalIngredients() {
    return (
      <p>
      </p>
    )
  },

  renderFilteredIngredients() {
    return (
      <p>
      </p>
    )
  },

  renderCuisine() {
    // Change to inline edit
    return (
      <p>
        <strong>Cuisine:</strong>{this.state.cuisine ? this.state.cuisine : ""}
      </p>
    )
  },

  render() {
    return (
      <div className="recipe-edit"> 
        { this.renderNameField() }
        { this.renderMongoId() }
        { this.renderUrl() }
        {/* { this.renderChef() }
        { this.renderOriginalIngredients() }
        { this.renderFilteredIngredients() }
        { this.renderCuisine() }
        { this.renderUpdateButton() } */}
      </div>
    )
  }
})

export default RecipeEdit