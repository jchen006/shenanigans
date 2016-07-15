var margin = {top: -5, right: -5, bottom: -5, left: -5};
var width = 500 - margin.left - margin.right,
    height = 400- margin.top - margin.bottom;

var color = d3.scale.category20();
    
var force = d3.layout.force()
    .charge(-800)
    .linkDistance(100)
    .size([width + margin.left + margin.right, height + margin.top + margin.bottom]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

var container = svg.append("g");

function create_root_network(root) {
    clear_graph();
    d3.json('/api/ingredient_network_json?root=' + root, function(error, graph) {
        force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();
                    
    var link = container.append("g")
        .attr("class", "links")
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });
     
    var node = container.append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
              
    node.append("circle")
        .attr("r", function(d) { 
            console.log(d.name + " " + d.weight);
            return d.weight * 2+ 12; 
        })
        .attr("fill", "white")
        .attr("stroke", "black");

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; });
        });
                    
    var linkedByIndex = {};

    graph.links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
    }

    node.on("mouseover", function(d){
        node.classed("node-active", function(o) {
            thisOpacity = isConnected(d, o) ? true : false;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });

        link.classed("link-active", function(o) {
            return o.source === d || o.target === d ? true : false;
        });
                            
        d3.select(this).classed("node-active", true);

        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", (d.weight * 2+ 12)*1.5);
        })
        .on("mouseout", function(d){
            node.classed("node-active", false);
            link.classed("link-active", false);
                        
            d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", d.weight * 2+ 12);
        });

    node.append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });

    });                
}


function dottype(d) {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}

function clear_graph() {
    d3.select("g.nodes").selectAll("*").remove();
    d3.select("g.links").selectAll("*").remove();
}


