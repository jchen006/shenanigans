import React, {PropTypes} from 'react'
import * as d3 from 'd3'
import Axis from '../../components/d3/Axis.jsx'
import Bar from '../../components/d3/Bar.jsx'
// import './ingredient_frequency_bar.css'


const FrequencyBarChart = React.createClass({

  constants : {
    margin : { top: 40, right: 20, bottom: 30, left: 50 },
    width : 600 - margin.left - margin.right,
    height: 500 - margin.top - margin.bottom,
    xAxis: "axis axis--x",
    yAxis: "axis axis--y"
  },

  getInitialState: function() {
    return { 
      data: [],
      hasError: false
    };
  },

  componentWillMount() {
    fetch('/api/ingredient_frequency')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        })
      })
  },

  renderXAxis() {   
    return (
      <Axis transform={ "translate(" + constants.margin.left +"," + constants.height + ")" } 
        width={ constants.width } 
        height={ constants.height } 
        data={ this.state.data }
        className = { constants.xAxis }
      />
    )
  },

  renderYAxis() {
    const margin = { top: 40, right: 20, bottom: 30, left: 50 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    return(
      <Axis 
        transform = { "translate(" + constants.margin.left + ",0)" }
        width = { constants.width }
        height = { constants.height }
        data = { this.state.data }
        className = { constants.yAxis }
      />
    )
  },

  renderBars() {
    var x = d3.scaleBand().rangeRound([0, constants.width]).padding(0.1)
    var y = d3.scaleLinear().rangeRound([ constants.height, 0]);

    y.domain([0, d3.max(this.state.data, function(d) { 
        return d.size })])

    x.domain(this.state.data.map(function(d) { return d.text; }))

    return this.state.data.map((d) => {
        return (
          <Bar
            className = { "bar" }
            x = { x(d.text) }
            y = { y(d.size) }
            height = { constants.height - y(d.size) } 
            width = { x.bandwidth() }
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

ReactDOM.render(
  <FrequencyBarChart/>, document.getElementById('ingredient_frequency')
)