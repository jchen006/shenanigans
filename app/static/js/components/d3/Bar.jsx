import React, {PropTypes} from 'react';

const Bar = React.createClass({
  propTypes: {
    fill: PropTypes.string,
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    mouseover: PropTypes.function,
    mouseout: PropTypes.function
  },

  render() {
    return (
      <rect
        {...props}
      />
    )
  }
})

Bar.defaultProps = { className: 'bar'}

export default Bar;