import React, { PropTypes } from 'react'


class RangeSlider extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={"range " + this.props.rangeType}>
        <input type="range" name="range" min={this.props.min ? this.props.min : 0} max={this.props.max} value={this.props.value} onChange={this.props.onChange}/>
        <output id="rangePrimary">{this.props.value}</output>
      </div>
    )
  }
}

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  rangeType: PropTypes.string
}

export default RangeSlider