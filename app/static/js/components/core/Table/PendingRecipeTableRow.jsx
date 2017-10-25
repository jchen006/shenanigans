import React, { PropTypes } from 'react'
import ButtonGroupTableRow from '../ButtonGroup/ButtonGroupTableRow.jsx'

const PendingRecipeTableRow = React.createClass({

  propTypes: {
    name: PropTypes.string,
    mongoId: PropTypes.string,
    onEdit: PropTypes.func,
    onApprove: PropTypes.func,
    onDelete: PropTypes.func
  },

  renderActionIcons() {
    return (
      <ButtonGroupTableRow
        onEdit = { this.props.onEdit }
        onApprove = { this.props.onApprove }
        onDelete = { this.props.onDelete }
      />
    )
  },

  render() {
    return (
      <tr key = {this.props.name}>
        <td> { this.props.mongoId } </td>
        <td> { this.props.name } </td>
        <td> {this.renderActionIcons() } </td>
      </tr>
    )
  }
})

export default PendingRecipeTableRow