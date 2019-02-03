import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import cloud from 'd3-cloud';
import { withStyles } from '@material-ui/core';

class WordCloud extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], hasError: false }
        this.myRef = React.createRef();
      }
    
      componentWillMount() {
        fetch(`/api/word_cloud_json/${this.props.wordCount}`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              data: data
            })
          })
      }

      componentDidMount() {
        this.renderCloud()
      }
    
      componentDidUpdate() {
        this.renderCloud()
      }

      renderCloud() {
        const color = d3.scaleLinear()
        .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
        .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", 
                "#666", "#555", "#444", "#333", "#222"]);
        const {maxWidth, maxHeight} = this.props
        const draw = (words) => {
            d3.select(this.myRef.current)
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("fill", function(d, i) {
                return color(i);
            })
            .attr("x", (d) => {
                return d.x + maxWidth/2;
            })
            .attr("y", (d) => {
                return d.y  + maxHeight/2;
            })
            .attr("rotate", (d) => {
                return d.rotate;
            })
            .text((d) => {
                return d.text;
            });
        }

        cloud().size([maxWidth, maxHeight])
        .words(this.state.data)
        .rotate(0)
        .fontSize(function(d) {
            return d.size;
        })
        .on("end", draw)
        .start();

      }

      render() {
        const {maxWidth, maxHeight} = this.props
        return (
            <svg className="word_cloud" width={maxWidth} height={maxHeight} ref={this.myRef}>
                <g width={maxWidth} height={maxHeight}  transform={`translate(${370},${155})`}></g>
            </svg>
        )
      }
}

WordCloud.propTypes = {
    classes: PropTypes.object.isRequired,
    maxWidth: PropTypes.number.isRequired,
    maxHeight: PropTypes.number.isRequired,
    wordCount: PropTypes.number.isRequired,
}

WordCloud.defaultProps = {
    wordCount: 100
}

export default withStyles(theme => ({}))(WordCloud)