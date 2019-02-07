import React from "react";
import Axis from "../d3/Axis";

const BarGraph = React.createClass({
  propTypes: {
    baseWidth: PropTypes.number.isRequired,
    baseHeight: PropTypes.number.isRequired,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.bottom,
      left: PropTypes.left
    }).isRequired,
    data: PropTypes.array.isRequired
  },

  renderAxis(height) {
    <Axis transform={"translate(0," + height + ")"} />;
  },

  renderBar() {},

  renderLabels() {},

  render() {
    let height =
      this.props.baseHeight - this.props.margin.top - this.props.margin.bottom;
    let width =
      this.props.baseWidth - this.props.margin.left - this.props.margin.right;
    return (
      <svg width={width} height={height}>
        {this.renderAxis(height)}
      </svg>
    );
  }
});
