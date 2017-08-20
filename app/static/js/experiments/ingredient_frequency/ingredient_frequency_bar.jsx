import React, {PropTypes} from 'react'
import d3 from 'd3'
import Axis from '../../components/d3/Axis.jsx'
// import './ingredient_frequency_bar.css'


const FrequencyBarChart = React.createClass({

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
    const margin = { top: 40, right: 20, bottom: 30, left: 40 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
   
    return (
      <Axis transform={ "translate(0," + height + ")" } 
        width={width} 
        height={height} 
        data={this.state.data}
        className = { "axis axis--x"}
      />
    )
  },

  renderYAxis() {
    const margin = { top: 40, right: 20, bottom: 30, left: 40 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    return(
      <Axis 
        transform = { "" }
        width = { width }
        height = { height }
        data = { this.state.data }
        className = { "axis axis--y"}
      />
    )
   
  },

  render() {
    return (
        <div className="ingredient_frequency_bar">
          <svg width = {600} height = {500}>
             { this.renderXAxis() } 
            { this.renderYAxis() }
          </svg>
        </div>
    )
  }
})

ReactDOM.render(
  <FrequencyBarChart/>, document.getElementById('ingredient_frequency')
)