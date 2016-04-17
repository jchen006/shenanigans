var width = 800,
    height = 500;

var force = d3.layout.force()
    .gravity(.05)
    .charge(-800)
    .size([width, height])
    .linkDistance(100);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var root = getData();
var nodes = flatten(root),
    links = d3.layout.tree().links(nodes);

nodes.forEach(function(d, i) {
    d.x = width/2 + i;
    d.y = height/2 + 100 * d.depth;
});

root.fixed = true;
root.x = width / 2;
root.y = height / 2;

force.nodes(nodes)
    .links(links)
    .start();

var link = svg.selectAll("line")
    .data(links)
    .enter()
    .insert("svg:line")
    .attr("class", "link");

var node = svg.selectAll("node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", function(d) {return d.weight*10})
    .attr("class", "node")
    .on("mouseover", function(d) {console.log(d.name)});

node.append("text")
    .attr("dy", ".40em")
    .text(function(d) {return d.name;});


force.on("tick", function(e) {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

});

function flatten(root) {
    var nodes = [];
    function recurse(node, depth) {
        if (node.children) {
            node.children.forEach(function(child) {
                recurse(child, depth + 1);
            });
        }
        node.depth = depth;
        nodes.push(node);
    }
    recurse(root, 1);
    return nodes;
}

// var linkedByIndex 



function getData() {
    return {
    "name":"leeks",
    "weight": 1,
    "children": [
            {
                "name":"garlic",
                "weight" : 0.5,
                "children": [
                    {
                        "name": "paprika",
                        "weight": 0.3
                    }, {
                         "name": "croutons",
                         "weight": 0.3
                    }
                ]
            }, {
                "name":"onions",
                "weight": 0.5,
                 "children": [
                    {
                        "name": "paprika",
                        "weight": 0.3
                    }, {
                         "name": "croutons",
                         "weight": 0.3
                    }, {
                        "name" : "butter",
                        "weight": 0.3
                    }
                ]
            }, {
                "name":"potatoes",
                "weight": 0.5,
                 "children": [
                    {
                        "name": "paprika",
                        "weight": 0.3
                    }, {
                         "name": "croutons",
                         "weight": 0.3
                    }
                ]
            }, {
                "name" : "sea bass",
                "weight": 0.5
            }
        ]
    };
}