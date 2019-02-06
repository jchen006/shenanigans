import React from 'react';
import PropTypes from 'prop-types';

class Bar extends React.Component {
  render() {
    return (
      <rect
        {... this.props}
      />
    )
  }
}

Bar.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number
}

Bar.defaultProps = { className: 'bar'}

export default Bar;