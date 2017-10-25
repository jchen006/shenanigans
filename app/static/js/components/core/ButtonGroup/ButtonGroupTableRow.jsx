import React, { PropTypes } from 'react'
import GlyphiconButtons from '../Button/GlyphiconButtons.jsx'
import { ButtonGroup } from 'react-bootstrap'

const ButtonGroupTableRow = React.createClass({
  propTypes: {
    onEdit: PropTypes.func,
    onApprove: PropTypes.func,
    onDelete: PropTypes.func
  },

  render() {
    return (
      <ButtonGroup>
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-edit"}
          action={"Edit"}
          onClick = { this.props.onEdit }
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-ok"}
          action={"Approve"}
          onClick = { this.props.onApprove }
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-remove"}
          action={"Delete"}
          onClick = { this.props.onDelete }
        />
      </ButtonGroup>
    )
  }
})

export default ButtonGroupTableRow