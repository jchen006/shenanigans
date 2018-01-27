import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class WordCloud extends React.component {

  constructor(props) {
    super(props)
  }

  renderCloud() {
    d3.layout
      .cloud()
      .size([this.props.width, this.props.height])
      .words(this.props.words)
      .rotate(0)
      .fontSize((d) => {return d.size})
      .on("end", this.draw())
      .start()
  }

  draw() {

    var color = d3.scale.linear()
      .domain(this.props.domain)
      .range(this.props.range)

    d3.select("#word-cloud-container")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      attr("class", "wordcloud")
      .append("g")
      .attr("transform", "translate(320,220)")
      .selectAll("text")
      .data(this.props.words)
      .enter()
      .append("text")
      .style("style-size", (d) => {
        return d.size + "px"
      })
      .style("fill", (d, i) => {
        return color(i)
      })
      .attr("transform", (d) => {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
      })
      .text((d) => {
        return d.text
      })
  }

  render() {
    return (
      <div className="word-cloud-container">
        { this.renderCloud() }
      </div>
    )
  }

}

WordCloud.propTypes = {
  containerId: PropTypes.string,
  num: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  words: PropTypes.array,
  domain: PropTypes.array,
  range: PropTypes.array
}

export default WordCloud