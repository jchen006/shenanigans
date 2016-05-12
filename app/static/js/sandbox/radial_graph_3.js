var data = {"nodes":[
							{"name":"YHO", "full_name":"Yahoo", "type":1, "slug": "www.yahoo.com", "entity":"company", "img_hrefD":"", "img_hrefL":""},
							{"name":"GGL", "full_name":"Google", "type":2, "slug": "www.google.com", "entity":"company", "img_hrefD":"", "img_hrefL":""},
							{"name":"BNG", "full_name":"Bing", "type":2, "slug": "www.bing.com", "entity":"company", "img_hrefD":"", "img_hrefL":""},
							{"name":"YDX", "full_name":"Yandex", "type":2, "slug": "www.yandex.com", "entity":"company", "img_hrefD":"", "img_hrefL":""},
							
							{"name":"Desc1", "type":4, "slug": "", "entity":"description"},
							{"name":"Desc2", "type":4, "slug": "", "entity":"description"},
							{"name":"Desc4", "type":4, "slug": "", "entity":"description"},
							
							{"name":"CEO", "prefix":"Mr.", "fst_name":"Jim", "snd_name":"Bean", "type":3, "slug": "", "entity":"employee"},
							{"name":"ATT", "prefix":"Ms.", "fst_name":"Jenna", "snd_name":"Jameson", "type":3, "slug": "", "entity":"employee"},
							{"name":"CTO", "prefix":"Mr.", "fst_name":"Lucky", "snd_name":"Luke", "type":3, "slug": "", "entity":"employee"},
							{"name":"CDO", "prefix":"Ms.", "fst_name":"Pamela", "snd_name":"Anderson", "type":3, "slug": "", "entity":"employee"},
							{"name":"CEO", "prefix":"Mr.", "fst_name":"Nacho", "snd_name":"Vidal", "type":3, "slug": "", "entity":"employee"},
						], 
				"links":[
							{"source":0,"target":4,"value":1,"distance":5},
							{"source":0,"target":5,"value":1,"distance":5},
							{"source":0,"target":6,"value":1,"distance":5},
							
							{"source":1,"target":4,"value":1,"distance":5},
							{"source":2,"target":5,"value":1,"distance":5},
							{"source":3,"target":6,"value":1,"distance":5},
							
							{"source":7,"target":3,"value":10,"distance":6},
							{"source":8,"target":3,"value":10,"distance":6},
							{"source":9,"target":1,"value":10,"distance":6},
							{"source":10,"target":1,"value":10,"distance":6},
							{"source":11,"target":2,"value":10,"distance":6},
							]
				   }    
			
			
			
		var w = 560,
			h = 500,
			radius = d3.scale.log().domain([0, 312000]).range(["10", "50"]);
		
		var vis = d3.select("body").append("svg:svg")
			.attr("width", w)
			.attr("height", h);
			
			//vis.append("defs").append("marker")
			//.attr("id", "arrowhead")
			//.attr("refX", 22 + 3) /*must be smarter way to calculate shift*/
			//.attr("refY", 2)
			//.attr("markerWidth", 6)
			//.attr("markerHeight", 4)
			//.attr("orient", "auto")
			//.append("path")
				//.attr("d", "M 0,0 V 4 L6,2 Z"); //this is actual shape for arrowhead
		
		//d3.json(data, function(json) {
			var force = self.force = d3.layout.force()
				.nodes(data.nodes)
				.links(data.links)
				.linkDistance(function(d) { return (d.distance*10); })
				//.friction(0.5)
				.charge(-250)
				.size([w, h])
				.start();
		
		
		
			var link = vis.selectAll("line.link")
				.data(data.links)
				.enter().append("svg:line")
				.attr("class", function (d) { return "link" + d.value +""; })
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; })
				.attr("marker-end", function(d) {
													if (d.value == 1) {return "url(#arrowhead)"}
													else    { return " " }
												;});

            function fade(opacity) {
                
                    link.style("opacity", function(d) {
                        return d.source === d || d.target === d ? 1 : opacity;
                    });
                
                }
				
				
			function openLink() {
				return function(d) {
					var url = "";
					if(d.slug != "") {
						url = d.slug
					} //else if(d.type == 2) {
						//url = "clients/" + d.slug
					//} else if(d.type == 3) {
						//url = "agencies/" + d.slug
					//}
					window.open("//"+url)
				}
			}
				
		
			
		
			var node = vis.selectAll("g.node")
				.data(data.nodes)
			  .enter().append("svg:g")
				.attr("class", "node")
				.call(force.drag);
		
			
			node.append("circle")
			  	.attr("class", function(d){ return "node type"+d.type})
				.attr("r",function(d){if(d.entity == "description"){ return 6 } else { return 18 }})
				//.on("mouseover", expandNode);
				//.style("fill", function(d) { return fill(d.type); })
				
						
		
			node.append("svg:image")
				.attr("class", function(d){ return "circle img_"+d.name })
				.attr("xlink:href", function(d){ return d.img_hrefD})
				.attr("x", "-36px")
				.attr("y", "-36px")
				.attr("width", "70px")
				.attr("height", "70px")
				.on("click", openLink())
				.on("mouseover", function (d) { if(d.entity == "company")
													{
    					d3.select(this).attr("width", "90px")
					   					.attr("x", "-46px")
										.attr("y", "-36.5px")
									   .attr("xlink:href", function(d){ return d.img_hrefL});							
													}
					})
				.on("mouseout", function (d) { if(d.entity == "company")
												{
    					d3.select(this).attr("width", "70px")
										.attr("x", "-36px")
										.attr("y", "-36px")
									   .attr("xlink:href", function(d){ return d.img_hrefD});
												}
					});    
					
		
			node.append("text")
				.attr("class", function(d){ return "nodetext title_"+d.name })
				.attr("dx", 0)
				.attr("dy", ".35em")
				.style("font-size","10px")
				.attr("text-anchor", "middle")
				.style("fill", "white")
				.text(function(d) { if (d.entity != "description"){return d.name} });
				
				

			node.on("mouseover", function (d) {
				link.style('stroke-width', function(l) {
				    if (d === l.source || d === l.target)
				    return 4;
				  else
				    return 2;
				});
            	if (d.entity == "company"){   
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){
								return d.full_name;
							})
						.style("font-size","15px")
						
				}
				else if(d.entity == "employee"){
					var asdf = d3.select(this);
                    asdf.select('text').remove();
                    
                    asdf.append("text")
                                .text(function(d){return d.prefix + ' ' + d.fst_name })
                                .attr("class","nodetext")
                            	.attr("dx", 0)
                                .attr("dy", ".35em")
                                .style("font-size","5px")
                                .attr("text-anchor", "middle")
                                .style("fill", "white")
                                .transition()
                                .duration(300)
                                .style("font-size","12px");
                    
                    asdf.append("text").text(function(d){return d.snd_name })
                                .attr("class","nodetext")
                                .attr("transform","translate(0, 12)")
                                .attr("dx", 0)
                                .attr("dy", ".35em")
                                .style("font-size","5px")
                                .attr("text-anchor", "middle")
                                .style("fill", "white")
                                .transition()
                                .duration(300)
                                .style("font-size","12px");                   						
				}
				else {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.style("font-size","15px")
				}
						
		    	if (d.entity == "company") {
					d3.select(this).select('image')
						.attr("width", "90px")
						.attr("x", "-46px")
						.attr("y", "-36.5px")
						.attr("xlink:href", function (d) {
							return d.img_hrefL
		            		});               
		        }
				
				if (d.entity == "company") {
				
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",28)
									
				}
				else if (d.entity == "employee"){
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",32)
				}
		 	})
			
			 
			 node.on("mouseout", function (d) {
				link.style('stroke-width', 2);
				if (d.entity == "company") {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){return d.name;})
						.style("font-size","10px")
					}
				else if(d.entity == "employee"){
                    ///////////////////////////
                    // CHANGE
                    ///////////////////////////
                    
                    d3.select(this).selectAll('text').remove();
                    
					//d3.select(this).select('text')
                    d3.select(this).append('text')
						.text(function(d){return d.name;})
						.style("font-size","14px")	
                    	.attr("dx", 0)
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .style("fill", "white")
                        .attr("class","nodetext")
                    	.transition()
						.duration(300)
						.style("font-size","10px")
					
				}
				else {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.style("font-size","10px")
				}
						
					
				 if (d.entity == "company") {
					d3.select(this).select('image')
						.attr("width", "70px")
						.attr("x", "-36px")
						.attr("y", "-36px")
						.attr("xlink:href", function (d) {
						return d.img_hrefD
					});
				}
				
				if (d.entity == "company" || d.entity == "employee") {
				
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",18)
				}
				
			});
		
			force.on("tick", function() {
			  link.attr("x1", function(d) { return d.source.x; })
				  .attr("y1", function(d) { return d.source.y; })
				  .attr("x2", function(d) { return d.target.x; })
				  .attr("y2", function(d) { return d.target.y; });
		
			  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			});