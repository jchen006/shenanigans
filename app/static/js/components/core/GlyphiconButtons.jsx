import React, { PropTypes } from 'react'

const GlyphiconButtons = React.createClass({
  propTypes: {
    type: PropTypes.string,
    action: PropTypes.string
  },

  render() {
    return (
      <button type="button" class="btn btn-default btn-sm">
        <span class={this.props.type}></span> {this.props.action}
      </button>
    )
  }
})