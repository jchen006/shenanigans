var width = 1680,
    height = 900;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/api/graph", function(error, graph) {
    console.log(graph)
    if (error) throw error;

    
});