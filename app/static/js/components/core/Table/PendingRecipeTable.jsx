import React, { PropTypes } from 'react'
import PendingRecipeTableRow from './PendingRecipeTableRow.jsx'
import { Table } from 'react-bootstrap'

const PendingRecipeTable = React.createClass({
  propTypes: {
    recipes: PropTypes.array,
    onEdit: PropTypes.func,
    onApprove: PropTypes.func,
    onDelete: PropTypes.func
  },

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th> Mongo Id </th>
          <th> Name </th>
          <th> Actions </th>
        </tr>
      </thead>
    )
  },

  renderTableRows() {
    return (this.props.recipes.map(recipe => {
      return (
        <PendingRecipeTableRow
          key = {recipe._id.$oid}
          recipe = { recipe }
          onEdit = {this.props.onEdit }
          onApprove = { this.props.onApprove }
          onDelete = {this.props.onDelete }
        />
      )
    }))
  },

  renderTable() {
    return (
      <Table bordered responsive>
        { this.renderTableHeader() }
        <tbody>
          { this.renderTableRows() }
        </tbody>
      </Table>
    )
  },

//Add in pagination and search
  render() {
    return (
      <div className="pending-recipe-table">
        { this.renderTable() }
      </div>
    )
  }
})

export default PendingRecipeTable