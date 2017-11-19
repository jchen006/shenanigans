import React, {PropTypes} from 'react';

const Bar = React.createClass({
  propTypes: {
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number
  },

  render() {
    return (
      <rect
        {... this.props}
      />
    )
  }
})

Bar.defaultProps = { className: 'bar'}

export default Bar;