import React, { PropTypes } from 'react'


const RangeSlider = React.createClass({

  propTypes: {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
    rangeType: PropTypes.string
  },

  render() {
    return (
      <div className={"range " + this.props.rangeType}>
        <input type="range" name="range" min={this.props.min} max={this.props.max} value={this.props.value} onChange={this.props.onChange}/>
        <output id="rangePrimary">{this.props.value}</output>
      </div>
    )
  }

})

export default RangeSlider