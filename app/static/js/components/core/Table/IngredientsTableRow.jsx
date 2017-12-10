import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroupTableRow from ''


const IngredientsTableRow = React.createClass({

  render() {
    return (
      <tr key = { index } data-item={this.props.ingredient._id.$oid} onClick={this.props.onClick}>
        <td data-title="Name"> { this.props.ingredient.name } </td>
        <td data-title="Id"> { this.props.ingredient._id.$oid} </td>
      </tr>
    )
  }
})

IngredientsTableRow.propTypes = {
  ingredient: PropTypes.object,
  onClick: PropTypes.func
}

export default IngredientsTableRow 