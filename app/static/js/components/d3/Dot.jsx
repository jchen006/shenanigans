import React, { PropTypes } from 'react'

const Dot = React.createClass({

  propTypes: {
    cx: PropTypes.func,
    cy: PropTypes.func,
    r: PropTypes.number,
    class: PropTypes.string,
    fill: PropTypes.string,
    onMouseClick: PropTypes.func,
    name: PropTypes.string
  },

  render() {
    return (
      <circle 
        { ...this.props }
      />
    )
  }

})