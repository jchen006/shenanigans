import React, {PropTypes} from 'react'
import * as d3 from 'd3'
import BarGraph from '../../components/d3-graphs/BarGraph.jsx'
import InfoPanel from '../../components/core/InfoPanel.jsx'


const FrequencyBarChart = React.createClass({

  getInitialState: function() {
    return { 
      ingredientViewing: null,
      data: [],
      hasError: false,
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

  renderBarGraph() {
    let margin = { top: 40, right: 20, bottom: 30, left: 50 }
    let constants = { xAxis: "axis axis--x", yAxis: "axis axis--y" }
    return( 
      <BarGraph
        data = {this.state.data}
        margin = { margin }
        constants = { constants }
        onClick = { () => {} }
      />
    )
  },

  renderInfoPanel() {
    if(this.state.ingredientViewing) {
      return(
        <Panel
          info = { this.state.ingredientViewing}
        />
      )
    }
  },

  render() {
    return (
      <div className="ingredient-frequency-container">
        { this.renderBarGraph()}
        { this.renderInfoPanel()}
      </div>
    )
  }
})

ReactDOM.render(
  <FrequencyBarChart/>, document.getElementById('ingredient_frequency')
)