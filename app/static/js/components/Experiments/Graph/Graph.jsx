import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], hasError: false };
        this.force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);
        this.myRef = React.createRef();
    }

    componentWillMount() {
        fetch("/api/ingredient_frequency")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data
                });
            });
    }

    componentDidMount() {
        this.renderGraph()
    }
    
    componentDidUpdate() {
        this.renderGraph()
    }

    renderGraph() {
        const svg = d3.select(this.myRef.current);
        const graph = this.state.data;
        force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

        const link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        const node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

        node.append("title")
        .text(function(d) { console.log(d.name); return d.name; });

        force.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
        });
    }



    render() {
        const {maxWidth, maxHeight} = this.props;
        return (
            <svg ref={this.myRef} width={maxWidth} height={maxHeight}>
            </svg>
        )
    }
}

Graph.propTypes = {
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number
}

export default Graph