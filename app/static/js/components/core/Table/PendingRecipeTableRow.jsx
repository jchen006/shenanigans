import React, { PropTypes } from "react";
import ButtonGroupTableRow from "../ButtonGroup/ButtonGroupTableRow.jsx";

const PendingRecipeTableRow = React.createClass({
  propTypes: {
    recipe: PropTypes.object,
    onEdit: PropTypes.func,
    onApprove: PropTypes.func,
    onDelete: PropTypes.func
  },

  renderActionIcons() {
    return (
      <ButtonGroupTableRow
        recipe={this.props.recipe}
        onEdit={this.props.onEdit}
        onApprove={this.props.onApprove}
        onDelete={this.props.onDelete}
      />
    );
  },

  render() {
    return (
      <tr key={this.props.name}>
        <td> {this.props.recipe._id.$oid} </td>
        <td> {this.props.recipe.name} </td>
        <td> {this.renderActionIcons()} </td>
      </tr>
    );
  }
});

export default PendingRecipeTableRow;
