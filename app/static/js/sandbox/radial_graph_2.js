var diameter = 960;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter - 150)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("static/js/experiments/food.json", function(error, root) {
  if (error) throw error;

  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", 50);

  node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { 
        var adjust = adjustment(d.x);
        console.log(d.name + d.x  + "->" + adjust);
        var rotate = 180;
        // return "rotate(" + adjust + ")translate(-10)"; 
        return "translate(-10)"; 
      })
      .text(function(d) { return d.name; });
});

var adjustment = function(currentPos) {
  var rotate;
  if(currentPos <= 90) {
    rotate = 90 - currentPos;
  } 
  if(currentPos <= 180 && currentPos > 90) {
    rotate = currentPos + 180;
  }
  if(currentPos <= 270 && currentPos > 180) {
    rotate = currentPos + 360; 
  }
  if(currentPos <= 360 && currentPos > 270) {
    rotate = currentPos - 180;
  }
  return rotate;
}

d3.select(self.frameElement).style("height", diameter - 150 + "px");
