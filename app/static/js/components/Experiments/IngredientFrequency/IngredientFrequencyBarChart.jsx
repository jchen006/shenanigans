import React from 'react';
import * as d3 from "d3";
import Axis from 'components/d3/Axis.jsx';
import Bar from 'components/d3/Bar.jsx';

class FrequencyBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], hasError: false }
  }

  componentWillMount() {
    fetch('/api/ingredient_frequency')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  renderXAxis() {
    const margin = { top: 40, right: 20, bottom: 30, left: 50 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
   
    return (
      <Axis transform={ "translate(" + margin.left +"," + height + ")" } 
        width={width} 
        height={height} 
        data={this.state.data}
        className = { "axis axis--x"}
      />
    )
  }

  renderYAxis() {
    const margin = { top: 40, right: 20, bottom: 30, left: 50 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    return(
      <Axis 
        transform = { "translate(" + margin.left + ",0)" }
        width = { width }
        height = { height }
        data = { this.state.data }
        className = { "axis axis--y"}
      />
    )
  }

  renderBars() {
    const margin = { top: 40, right: 20, bottom: 30, left: 50 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    var y = d3.scaleLinear().rangeRound([height, 0]);

    y.domain([0, d3.max(this.state.data, function(d) { 
        return d.size })])

    x.domain(this.state.data.map(function(d) { return d.text; }))

    return this.state.data.map((d, index) => {
        return (
          <Bar
            className = { "bar" }
            x = { x(d.text) }
            y = { y(d.size) }
            height = { height - y(d.size) } 
            width = { x.bandwidth() }
            key={index}
          />
        )
      })
  }

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
}

export default FrequencyBarChart;