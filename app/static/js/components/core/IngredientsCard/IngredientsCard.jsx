import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const IngredientsCard = React.createClass({
 propTypes: {
    ingredients: PropTypes.array
  },

  createList() {
    var ingredients = this.props.ingredients
    return ingredients.join(", ")
  },

  render() {
    const title = ( <h3> Recipe </h3> )
    return (
      <div> 
        <Panel header={title}>
          { this.createList() }
        </Panel>
      </div>
    )
  }
})

export default IngredientsCard 