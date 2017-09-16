import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import { Legend } from 'react-d3-core'

const Legend = React.createClass({
  
  propTypes : {
    legendData: PropTypes.array,
    transform: PropTypes.string
  },

  renderColorRect(color) {
    return (
      <rect x="882" width="18" height="18" style={color}>
      </rect>
    )
  },

  renderText(text) {
    return (
      <text x="876" y="9" dy=".35em" style="text-anchor: end;">
        { text }
      </text>
    )
  },


  render() {
    return (this.props.legendData.map((data) => {
        return 
        (<g className = {data.class} transform = {this.props.transform}>
          { this.renderColor(color) }
          { this.renderText(text) }  
        </g>)
      })
    )
  }





})