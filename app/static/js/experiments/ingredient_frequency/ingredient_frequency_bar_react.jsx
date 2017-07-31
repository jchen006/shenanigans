import React, {PropTypes} from 'react'
import d3 from 'd3'
import Bar from '../../components/d3/Bar.jsx'
// import './ingredient_frequency_bar.css'
import { select } from 'd3-selection'
import { BarChart } from 'react-d3-components'

const FrequencyBarChart = React.createClass({

  getInitialState() {
    return {
      data: [{
        label: 'somethingA',
        values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
      }]
    }
  },

  renderBarGraph() {
    const margin = { top: 40, right: 20, bottom: 130, left: 40 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    var data = [{
      label: 'somethingA',
      values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }];
    return (
      <BarChart
        data = { data}
        width = { width }
        height = { height }
        margin = { margin }
      />
    )
  },

  render() {
    return (
        <div className="ingredient_frequency_bar">
          { this.renderBarGraph() }
          {/* { renderBarGraphs() } */}
        </div>
    )
  }
})

ReactDOM.render(
  <FrequencyBarChart
    mouseover = {() => {}}
    mouseout = {() => {}}/>, document.getElementById('ingredient_frequency')
)