var graph = {
    "nodes":[
        {"name":"1","rating":90,"id":2951},
        {"name":"2","rating":80,"id":654654},
        {"name":"3","rating":80,"id":6546544},
        {"name":"4","rating":1,"id":68987978},
        {"name":"5","rating":1,"id":9878933},
        {"name":"6","rating":1,"id":6161},
        {"name":"7","rating":1,"id":64654},
        {"name":"8","rating":20,"id":354654},
        {"name":"9","rating":50,"id":8494},     
        {"name":"10","rating":1,"id":6846874},
        {"name":"11","rating":1,"id":5487},
        {"name":"12","rating":80,"id":"parfum_kenzo"},
        {"name":"13","rating":1,"id":65465465},
        {"name":"14","rating":90,"id":"jungle_de_kenzo"},
        {"name":"15","rating":20,"id":313514},
        {"name":"16","rating":40,"id":36543614},
        {"name":"17","rating":100,"id":"Yann_YA645"},
        {"name":"18","rating":1,"id":97413},
        {"name":"19","rating":1,"id":97414},
        {"name":"20","rating":100,"id":976431231},
        {"name":"21","rating":1,"id":9416},
        {"name":"22","rating":1,"id":998949},
        {"name":"23","rating":100,"id":984941},
        {"name":"24","rating":100,"id":"99843"},
        {"name":"25","rating":1,"id":94915},
        {"name":"26","rating":1,"id":913134},
        {"name":"27","rating":1,"id":9134371}
    ],
    "links":[
        {"source":6,"target":5,"value":6, "label":"publishedOn"},
        {"source":8,"target":5,"value":6, "label":"publishedOn"},
        {"source":7,"target":1,"value":4, "label":"containsKeyword"},
        {"source":8,"target":10,"value":3, "label":"containsKeyword"},
        {"source":7,"target":14,"value":4, "label":"publishedBy"},
        {"source":8,"target":15,"value":6, "label":"publishedBy"},
        {"source":9,"target":1,"value":6, "label":"depicts"},
        {"source":10,"target":1,"value":6, "label":"depicts"},
        {"source":16,"target":1,"value":6, "label":"manageWebsite"},
        {"source":16,"target":2,"value":5, "label":"manageWebsite"},     
        {"source":16,"target":3,"value":6, "label":"manageWebsite"},
        {"source":16,"target":4,"value":6, "label":"manageWebsite"},
        {"source":19,"target":18,"value":2, "label":"postedOn"},
        {"source":18,"target":1,"value":6, "label":"childOf"},
        {"source":17,"target":19,"value":8, "label":"describes"},
        {"source":18,"target":11,"value":6, "label":"containsKeyword"},
        {"source":17,"target":13,"value":3, "label":"containsKeyword"},
        {"source":20,"target":13,"value":3, "label":"containsKeyword"},
        {"source":20,"target":21,"value":3, "label":"postedOn"},
        {"source":22,"target":20,"value":3, "label":"postedOn"},
        {"source":23,"target":21,"value":3, "label":"manageWebsite"},
        {"source":23,"target":24,"value":3, "label":"manageWebsite"},
        {"source":23,"target":25,"value":3, "label":"manageWebsite"},
        {"source":23,"target":26,"value":3, "label":"manageWebsite"}
    ]
}


var margin = {top: -5, right: -5, bottom: -5, left: -5};
        var width = 500 - margin.left - margin.right,
    height = 400- margin.top - margin.bottom;

        var color = d3.scale.category20();
    
    var force = d3.layout.force()
            .charge(-200)
            .linkDistance(50)
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

//d3.json('http://blt909.free.fr/wd/map2.json', function(error, graph) {
                
                force
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .start();
                
      
        
        var link = container.append("g")
                        .attr("class", "links")
                        .selectAll(".link")
            .data(graph.links)
                        .enter().append("line")
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
            .attr("r", function(d) { return d.weight * 2+ 12; })
            .style("fill", function(d) { return color(1/d.rating); });
         
                
                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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


        function dottype(d) {
          d.x = +d.x;
          d.y = +d.y;
          return d;
        }
