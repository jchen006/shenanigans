import React, { PropTypes } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

const GlyphiconButtons = React.createClass({
  propTypes: {
    glyphiconType: PropTypes.string,
    action: PropTypes.string,
    onClick: PropTypes.func,
    data: PropTypes.object
  },

  handleOnClick() {
    this.props.onClick(this.props.data)
  },

  render() {
    return (
      <Button bsSize="xsmall" onClick={this.handleOnClick}>
        <Glyphicon glyph={this.props.glyphiconType}/> {this.props.action}
      </Button>
    )
  }
})

export default GlyphiconButtons