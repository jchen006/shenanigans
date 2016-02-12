var margin = 20,
    diameter = 500;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.size; })

var svg = d3.select("#lda").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Recipe:</strong> <span style='color:red'>" + d.name + "</span>";
})

svg.call(tip);

d3.json("/api/lda_graph", function(error, root) {
  if (error) throw error;

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circles = svg.selectAll("circle")
      .data(nodes)
      .enter();

  var circle = circles.append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle,text");

  d3.select("graph")
      .style("background", color(-1))
      .on("click", function() { 
        //remove everything from the list
        //repopulatewithclusters
        zoom(root); }
      );

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    console.log(focus0);
    console.log(focus);

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { 
            zoomTo(i(t));
          };
        });

    transition.selectAll("text")
        .filter(function(d) { 
          return d.parent === focus || this.style.display === "inline"; 
        })
        .style("fill-opacity", function(d) { 
          console.log("opacity");
          return d.parent === focus ? 1 : 0; 
        })
        .each("start", function(d) { 
          if (d.parent === focus) clearList("ingred"); 
          console.log(focus);
        })
        .each("end", function(d) { 
          console.log("red");
          if (d.parent !== focus) updateList("ingred", focus.children); 
        });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});


d3.select(self.frameElement).style("height", diameter + "px");


