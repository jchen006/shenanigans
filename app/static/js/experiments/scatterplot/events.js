  var events = (function() {
      return {
          highlightNodes: function(d) {
              var allNodes = d3.selectAll(".dot");
              renderer.changeOpacity(allNodes, 0.2);
              var clusterNodes = d3.selectAll(".dot.cluster-" + d);
              renderer.changeOpacity(clusterNodes, 1);
              renderer.populateTable(clusterNodes[0]);
          },
          highlightLegend: function(d) {
              var allLegend = d3.selectAll(".legend");
              renderer.changeOpacity(allLegend, 0.2);
              var clusterLegend = d3.selectAll(".legend.cluster-" + d);
              renderer.changeOpacity(clusterLegend, 1);
          },
      }
  })();