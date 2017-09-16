import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import Scatterplot from '../../components/d3-graphs/Scatterplot.jsx'
//import List from '../../components/core/List.jsx
//import InfoPanel from '../../components/core/InfoPanel.jsx'

const RecipeScatterplot = React.createClass({

  getInitialState: function() {
    return {
      data: [],
      isViewing: false
    }
  },

  componentWillMount() {
    fetch('/api/recipe_scatterplot')
    .then(response => response.json())
    .then(data => {
      this.setState({
        data: data.mds_json
      })
    })
  },

  renderScatterplot() {
    return (
      <Scatterplot
        data = {this.state.data}
      />
    )
  },

  onCoordinateClick() {

  },

  render() {

  },

})

ReactDom.render(
  <RecipeScatterplot/>, document.getElementById('scatterplot')
)