import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    if (this.props.className === "axis axis--x") {
      const x = d3
        .scaleBand()
        .rangeRound([0, this.props.width])
        .padding(0.1);
      //Add a domain specific function
      x.domain(
        this.props.data.map(function(d) {
          return d.text;
        })
      );

      let node = this.myRef.current;
      d3.select(node)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-50)");
    } else if (this.props.className === "axis axis--y") {
      const y = d3.scaleLinear().rangeRound([this.props.height, 0]);

      y.domain([
        0,
        d3.max(this.props.data, function(d) {
          return d.size;
        })
      ]);

      let node = this.myRef.current;
      d3.select(node).call(d3.axisLeft(y).ticks(10));
    }
  }

  render() {
    return (
      <g
        ref={this.myRef}
        className={this.props.className}
        transform={this.props.transform}
      />
    );
  }
}

Axis.propTypes = {
  data: PropTypes.array,
  axisType: PropTypes.string,
  text: PropTypes.string,
  scale: PropTypes.func,
  orient: PropTypes.string,
  transform: PropTypes.string,
  y: PropTypes.number,
  dy: PropTypes.string,
  x: PropTypes.number,
  dx: PropTypes.string,
  text: PropTypes.string,
  range: PropTypes.number,
  scaleFunction: PropTypes.func,
  style: PropTypes.string,
  baseLength: PropTypes.number,
  type: PropTypes.string,
  axis: PropTypes.func,
  className: PropTypes.string
};

export default Axis;
