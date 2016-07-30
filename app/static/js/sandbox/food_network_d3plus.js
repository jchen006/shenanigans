

function generate_graph(ingredient) {
	var response = JSON.parse(api_call(ingredient));
	var nodes = response.nodes;
	var links = response.links;
	draw_graph(nodes, links);
}

function draw_graph(nodes, links) {	
	console.log(typeof nodes)
	var visualization = d3plus.viz()
		.container("#viz")
		.type("network")
		.data(nodes)
		.edges(links)
		.size("count")
		.id("name")
		.draw()
}

function api_call(ingred) {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/ingredient_network_json?root=" + ingred, false);
	xhr.send();
	return xhr.response;
}


