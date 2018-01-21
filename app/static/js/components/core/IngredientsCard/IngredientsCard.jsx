import React from 'react'
import PropTypes from 'prop-types'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

class IngredientsCard extends React.Component {

  constructor(props) {
    super(props)
  }

  createTable() {
    var ingredients = this.props.ingredients
    return (
      <ListGroup>
        { ingredients.map((i) => {
          return (<ListGroupItem href='#'> 
            {i}
          </ListGroupItem>)
        })}
      </ListGroup>
    )
  }

  createList() {
    var ingredients = this.props.ingredients
    return ingredients.join(", ")
  }

  ingredientPanel() {
    const title = ( <h3> Recipe </h3> )
    return (
      <Panel header={ title }>
        { this.createList() }
      </Panel>
    )
  }

  render() {
    return (
      <div className="suggested-recipe-panel">
        { this.ingredientPanel() }
      </div>
    )
  }
}

IngredientsCard.propTypes = {
  ingredients: PropTypes.array
}

export default IngredientsCard 