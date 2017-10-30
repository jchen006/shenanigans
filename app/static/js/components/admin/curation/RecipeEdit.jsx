import React, { PropTypes } from 'react'
import InputField from '../InputField/InputField.jsx'

const RecipeEdit = React.createClass({
  propTypes: {
    recipe: PropTypes.object,
    onApprove: PropTypes.func,
    onRevert: PropTypes.func
  },

  renderName() {
    return (
      <div className="recipe-edit-name-field">
        <InputField
          id = {"name"}
          type = {"text"}
          label = {"Recipe Name"}
          value = { this.propTypes.recipe.name}
        />
      </div>
    )
  },

  render() {
    return (
      <div className="recipe-edit"> 
        { this.renderName() }
      </div>
    )
  }
})

export default RecipeEdit