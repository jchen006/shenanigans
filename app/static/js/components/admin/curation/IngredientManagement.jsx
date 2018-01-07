import React, { PropTypes } from 'react'
import IngredientTable from '../core/Table/IngredientsTable.jsx'
import IngredientsEditProfile from '../'

const IngredientManagement = React.createClass({


  renderTable() {

  },

  renderEditProfile() {
    
  },

  render() {
    return (
      <div className="ingredient-management">
        { this.renderTable() }
        { this.renderEditProfile() }
      </div>
    )
  }



})