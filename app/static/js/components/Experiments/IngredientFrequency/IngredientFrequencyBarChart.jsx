import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Axis from 'components/d3/Axis.jsx';
import Bar from 'components/d3/Bar.jsx';
import { withStyles } from '@material-ui/core/styles';


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
    const {margin, maxWidth, maxHeight} = this.props; 
    const width =  maxWidth - margin.left - margin.right
    const height = maxHeight - margin.top - margin.bottom
   
    return (
      <Axis transform={`translate(${margin.left}, ${height + margin.top})`} 
        width={width} 
        height={height} 
        data={this.state.data}
        className = { "axis axis--x"}
      />
    )
  }

  renderYAxis() {
    const {margin, maxWidth, maxHeight} = this.props; 
    const width =  maxWidth - margin.left - margin.right
    const height = maxHeight - margin.top - margin.bottom

    return(
      <Axis 
        transform = { `translate(${margin.left}, ${margin.top})` }
        width = { width }
        height = { height }
        data = { this.state.data }
        className = { "axis axis--y"}
      />
    )
  }

  renderBars() {
    const {margin, maxWidth, maxHeight} = this.props; 
    const width =  maxWidth - margin.left - margin.right
    const height = maxHeight - margin.top - margin.bottom
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    const y = d3.scaleLinear().rangeRound([height, 0]);

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
          <svg width = {this.props.maxWidth} height = {this.props.maxHeight}>
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

FrequencyBarChart.propTypes = {
  classes: PropTypes.object.isRequired,
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }),
}
FrequencyBarChart.defaultProps = {
  margin: { top: 10, right: 20, bottom: 10, left: 50 }
}

const styles = theme => ({
  ingredient_frequency_bar: {
    width: '100%',
    marginTop: 28
  }
})

export default withStyles(styles)(FrequencyBarChart);