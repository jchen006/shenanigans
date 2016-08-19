function generate_graph(ingredient) {
	if(ingredient) {
		var response = JSON.parse(api_call(ingredient));
		var nodes = response.nodes;
		var links = response.links;
		draw_graph(nodes, links);
	} else {
		 var visualization = d3plus.viz()
    		.container("#viz")  
    		.error("Enter in an ingredient")  // Halt the viz and display message instead
    		.draw()        
	}
	
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
		.height(700)
		.width(1000)
		.draw()
}

function api_call(ingred) {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/ingredient_network_json?root=" + ingred, false);
	xhr.send();
	return xhr.response;
}


