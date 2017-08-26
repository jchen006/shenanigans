import React, { PropTypes } from 'react'
import * as d3 from 'd3'

const Axis = React.createClass({
  propTypes: {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    className: PropTypes.string
  },

  componentDidMount() {
    this.renderAxis()
  },

  componentDidUpdate() {
    this.renderAxis()
  },

  renderAxis() {
    if(this.props.className === "axis axis--x") {
      var x = d3.scaleBand().rangeRound([0, this.props.width]).padding(0.1)
      
      x.domain(this.props.data.map(function(d) { return d.text; }))

      var node = ReactDOM.findDOMNode(this);
      d3.select(node)
        .call(d3.axisBottom(x)).selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-50)")
              
    } else if(this.props.className === "axis axis--y") {

      var y = d3.scaleLinear().rangeRound([this.props.height, 0]);

      y.domain([0, d3.max(this.props.data, function(d) { 
        return d.size })])

      var node = ReactDOM.findDOMNode(this);
      d3.select(node)
        .call(d3.axisLeft(y).ticks(10))
    }
  },

  render() {
    return(
      <g className= {this.props.className } transform = { this.props.transform }>
      </g>
      )
    }
})



export default Axis