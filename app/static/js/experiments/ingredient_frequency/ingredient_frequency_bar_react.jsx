import React, {PropTypes} from 'react'
import d3 from 'd3'
import Bar from '../../components/d3/Bar.jsx'
import './ingredient_frequency_bar.css'

const FrequencyBarChart = React.createClass({

  componentDidMount() {
    fetch('/api/ingredient_frequency').then((data) => {
      this.setState({
        data: data
      })
    }).catch((error) => {
      console.log("Error")
    })
  },

  createFrequencyBarChart() {
    const node = this.node
    const margin = { top: 40, right: 20, bottom: 130, left: 40 }
    const width =  600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const formatPercent = d3.format(".0%")

    const x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    const y = d3.scale.linear()
        .range([height, 0]);

    const xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // const tip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10, 0])
    //     .html(function(d) {
    //         return "<strong>Frequency:</strong> <span style='color:red'>" + d.size + "</span>";
    //     })

    const svg = d3.select("#graph1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // svg.call(tip);

    data = this.state.data
    x.domain(data.map(function(d) { return d.text; }));
    y.domain([0, d3.max(data, function(d) { return d.size; })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-50)");;

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Occurences");

    // svg.selectAll(".bar")
    //   .data(data)
    //   .enter().append("rect")
    //   .attr("class", "bar")
    //   .attr("x", function(d) { return x(d.text); })
    //   .attr("width", x.rangeBand())
    //   .attr("y", function(d) { return y(d.size); })
    //   .attr("height", function(d) { return height - y(d.size); })
    //   .on('mouseover', tip.show)
    //   .on('mouseout', tip.hide)

    // function type(d) {
    //     d.size = +d.size;
    //     return d;
    // }
  },
  renderBarGraphs() {
    return ( 
      <div>
        { this.state.data.map((d) => <Bar
          x = {(d) => {
            return x(d.text);
          }}
          width = { x.rangeBand() }
          y = {(d) => { 
            return y(d.size);
          }}
          height = {(d) => {
            return height - y(d.size)
          }}
        />)
        }
      </div>
    )
  },

  render() {
    return (
        <div className="ingredient_frequency_bar">
          <h1> Frequency Bar Chart </h1>
          {/* { renderBarGraphs() } */}
        </div>
    )
  }



})

ReactDOM.render(
  <FrequencyBarChart 
    mouseover={()=> {}} 
    mouseout={()=> {}}
  />, document.getElementById('ingredient_frequency')
)