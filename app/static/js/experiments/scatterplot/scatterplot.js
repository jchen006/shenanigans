var scatterplot = (function() {
    var elementId, margin, width, height, api_call;
    var highlight = false;
    var clicked = false;

    var createSVG = function() {
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
    }

    var draw = function() {
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

        var div = d3.select("#scatterplot-container")
            .append("div") // declare the tooltip div 
            .attr("class", "tooltip")
            .style("opacity", 0);

        var svg = d3.select(elementId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.json(api_call, function(error, data) {
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
                .attr("name", function(d) { return d.name; })
                .attr("id", function(d) {
                    var id_name = d.name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase();
                    return id_name + "-node";
                }).attr("class", function(d) {
                    return "dot cluster-" + d.cluster;
                }).attr("r", 3.5)
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .style("fill", function(d) { return color(d.cluster); })
                .on("mouseover", function(d) {
                    if (highlight && this.style.opacity == "1") {
                        var id = d.name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase() + "-item";
                        var item = document.getElementById(id);
                        item.style.opacity = "1";
                    }
                }).on("mouseout", function(d) {
                    if (this.style.opacity == "1" && !clicked) {
                        var id = d.name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase();
                        var item = document.getElementById(id + "-item");
                        item.style.opacity = "0.8";
                    }
                }).on("click", function(d) {
                    console.log(d.name);
                    if (this.style.opacity == "1") {
                        //override mouse out 
                        var id = d.name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase() + "-item";
                        console.log(id);
                        var item = document.getElementById(id);
                        console.log(item);
                        item.style.opacity == "1";
                        var recipe_heading = document.getElementById("recipe_info_header");
                        recipe_heading.innerHTML = d.name;
                        var recipe_panel = document.getElementById("recipe_info_heading");
                        recipe_panel.style.color = "black";
                        clicked = true;
                    }
                });

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
                events.highlightNodes(d);
                events.highlightLegend(d);
                highlight = true;
            });
        });
    }

    return {
        init: function(config) {
            elementId = config.elementId;
            api_call = config.api_call;
            createSVG();
            draw();
        }
    }
})();