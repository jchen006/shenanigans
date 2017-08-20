import React, { PropTypes } from 'react'
import * as d3 from 'd3'

const Axis = React.createClass({
  propTypes: {
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
      
      console.log(this.props.data)
      //Add a domain specific function
      x.domain(this.props.data.map(function(d) { return d.text; }))

      console.log(typeof x)

      var node = ReactDOM.findDOMNode(this);
      d3.select(node)
        .call(d3.axisBottom(x)).selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-50)")
              
    } else if(this.props.className === "axis axis--y") {

       var y = d3.scaleLinear().rangeRound([this.props.height, 0]);

      y.domain([0, d3.max(this.props.data, function(d) { return d.size })])

      var node = ReactDOM.findDOMNode(this);
      d3.select(node)
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency")
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