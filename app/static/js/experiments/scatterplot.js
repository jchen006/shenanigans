var highlight = false;
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var div = d3.select("body")
    .append("div")  // declare the tooltip div 
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("#scatterplot").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/api/recipe_scatterplot", function(error, data) {
  if (error) throw error;

  var mds = data.mds_json;
  mds.forEach(function(d) {
    d.y = +d.y;
    d.x = +d.x;
  });

  x.domain(d3.extent(mds, function(d) { return d.x })).nice();
  y.domain(d3.extent(mds, function(d) { return d.y; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("x");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("y")

  svg.selectAll(".dot")
      .data(mds)
      .enter().append("circle")
      .attr("name", function(d) {return d.name;})
      .attr("id", function(d) { 
        var id_name = d.name.replace(/\s/g,'').toLowerCase();
        return id_name + "-node";
      }).attr("class", function(d) {
        return "dot cluster-" + d.cluster;
      }).attr("r", 3.5)
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .style("fill", function(d) { return color(d.cluster); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().sort())
      .enter().append("g")
      .attr("class", function(d) {
        return "legend cluster-" + d;
      }).attr("transform", function(d, i) { 
        return "translate(0," + i * 20 + ")"; 
      });

  var legendRect = legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

  legend.on("click", function(d) {
    highlightNodes(d);  
    highlightLegend(d);
    highlight = true;
  });

  var highlightNodes = function(d) {
    var allNodes = d3.selectAll(".dot");
    allNodes.style("opacity", .2);
    var clusterNodes = d3.selectAll(".dot.cluster-" + d);
    clusterNodes.style("opacity", 1.2);
    populateTable(clusterNodes[0]);
  }

  var highlightLegend = function(d) {
    var allLegend = d3.selectAll(".legend");
    allLegend.style("opacity", .2);
    var clusterLegend = d3.selectAll(".legend.cluster-" + d);
    clusterLegend.style("opacity", 1.2);
  }

  var reset = function() {
    if(highlight) {
      console.log("highlighted");
    }
  }

  var populateTable = function(recipes) {
    var recipe_table = document.getElementById("recipe_names");
    recipe_table.innerHTML = "";
    for(var i = 0; i < recipes.length; i++) {
      var node = document.getElementById(recipes[i].id);
      var name = node.getAttribute("name");
      var color = node.style.fill;
      var entry = document.createElement('li');
      entry.className = "list-group-item";
      entry.style.backgroundColor = color;
      entry.style.opacity = "0.8"
      entry.appendChild(document.createTextNode(name));
      recipe_table.appendChild(entry);
    }

    var recipe_list = recipe_table.getElementsByTagName("li");

    for(var i = 0; i < recipe_list.length; i++) {
      var clicked = false;
      recipe_list[i].onmouseover = function() {
        if(!clicked) {
          this.style.opacity = "1";
        }      
      }

      recipe_list[i].onmouseleave = function() {
        if(!clicked) {
          this.style.opacity = "0.8";
        }     
      }

      recipe_list[i].onclick = function() {
        if(clicked) {
          for(var i = 0; i < recipe_list.length; i++) {
            recipe_list[i].style.opacity = "0.8";
          }
        }
        clicked = true;
        this.style.opacity = "1";
        var name = this.innerHTML;
        var id_name = name.replace(/\s/g,'').toLowerCase();
        id_name = "#" + id_name + "-node";
        var node = d3.select(id_name);
        var allNodes = d3.selectAll(".dot");
        allNodes.style("opacity", .2);
        node.style("opacity", 1);
      }
  }
  }
});