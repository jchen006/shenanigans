import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import Axis from '../..components/d3/Axis.jsx'
import Bar from '../../components/d3/Bar.jsx'
import Dot from '../../components/d3/Dot.jsx'

const ScatterplotGraph = React.createClass({

  propTypes: {
    data: PropTypes.array,
    onCoordinateClick: PropTypes.func,

  },

  renderXAxis() {

    return (
      <Axis
      />
    )
  },

  renderYAxis() {
    return (
      <Axis
      />
    )

  },

  renderPoints() {

  },

  render() {
    { this.renderXAxis() }
    { this.renderYAxis() }
    { this.renderPoints() }
  },
})

export default Scatterplotgraph