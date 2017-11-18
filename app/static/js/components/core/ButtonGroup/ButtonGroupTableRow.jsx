import React, { PropTypes } from 'react'
import GlyphiconButtons from '../Button/GlyphiconButtons.jsx'
import { ButtonGroup } from 'react-bootstrap'

const ButtonGroupTableRow = React.createClass({
  propTypes: {
    recipe: PropTypes.object,
    onEdit: PropTypes.func,
    onApprove: PropTypes.func,
    onDelete: PropTypes.func
  },

  handleOnEdit() {
    this.props.onEdit(this.props.recipe)
  },

  handleOnApprove() {
    this.props.onApprove(this.props.recipe)
  },

  handleOnDelete() {
    this.props.onDelete(this.props.recipe)
  },

  render() {
    return (
      <ButtonGroup>
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-edit"}
          action={"Edit"}
          onClick = { this.handleOnEdit }
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-ok"}
          action={"Approve"}
          onClick = { this.handleOnApprove }
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-remove"}
          action={"Delete"}
          onClick = { this.handleOnDelete }
        />
      </ButtonGroup>
    )
  }
})

export default ButtonGroupTableRow