import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import Axis from '../../components/d3/Axis.jsx'
import Bar from '../../components/d3/Bar.jsx'

const BarGraph = React.createClass({    

  propTypes: {
    data: PropTypes.array,
    onClick: PropTypes.func,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    constants: PropTypes.shape({
      xAxis: PropTypes.string,
      yAxis: PropTypes.string
    })
  },

 renderXAxis() {   
    var constants = this.props.constants
    var margin = this.props.margin
    var width = 600 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom
    return (
      <Axis transform={ "translate(" + margin.left +"," + height + ")" } 
        width={ width } 
        height={ height } 
        data={ this.props.data }
        className = { constants.xAxis }
      />
    )
  },

  renderYAxis() {
    var constants = this.props.constants
    var margin = this.props.margin
    var width = 600 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom
    return(
      <Axis 
        transform = { "translate(" + margin.left + ",0)" }
        width = { width }
        height = { height }
        data = { this.props.data }
        className = { constants.yAxis }
      />
    )
  },

  renderBars() {
    var margin = this.props.margin
    var width = 600 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    var y = d3.scaleLinear().rangeRound([ height, 0]);

    y.domain([0, d3.max(this.props.data, function(d) { 
        return d.size })])

    x.domain(this.props.data.map(function(d) { return d.text; }))

    return this.props.data.map((d) => {
        return (
          <Bar
            className = { "bar" }
            x = { x(d.text) }
            y = { y(d.size) }
            height = { height - y(d.size) } 
            width = { x.bandwidth() }
            onClick = { this.props.onClick }
          />
        )
      })
  },

  render() {
    return (
        <div className="ingredient_frequency_bar">
          <svg width = {900} height = {500}>
            { this.renderXAxis() } 
            { this.renderYAxis() }
            <g transform="translate(50,0)">
              { this.renderBars() }
            </g>
          </svg>
        </div>
    )
  }
})


export default BarGraph