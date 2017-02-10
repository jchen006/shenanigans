var renderer = (function() {
    var cleanName = function(name) {
        return name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase();
    }

    var createListItem = function(element, name, className, color, opacity) {
        var entry = document.createElement('li');
        entry.className = "list-group-item";
        entry.style.backgroundColor = color;
        entry.style.opacity = opacity;
        entry.id = cleanName(name) + "-item";
        entry.appendChild(document.createTextNode(name));
        return entry;
    }

    return {
        changeOpacity: function(element, number) {
            element.style("opacity", number);
        },

        populateTable: function(recipes) {
            var recipe_table = document.getElementById("recipe_names");
            var color;
            recipe_table.innerHTML = "";
            for (var i = 0; i < recipes.length; i++) {
                var node = document.getElementById(recipes[i].id);
                var name = node.getAttribute("name");
                color = node.style.fill;
                var entry = createListItem(node, name, "list-group-item", color, 0.8);
                recipe_table.appendChild(entry);
            }

            var recipe_list = recipe_table.getElementsByTagName("li");

            for (var i = 0; i < recipe_list.length; i++) {
                var clicked = false;
                recipe_list[i].onmouseover = function() {
                    if (!clicked) {
                        this.style.opacity = "1";
                    }
                }

                recipe_list[i].onmouseleave = function() {
                    if (!clicked) {
                        this.style.opacity = "0.8";
                    }
                }

                recipe_list[i].onclick = function() {
                    if (clicked) {
                        for (var i = 0; i < recipe_list.length; i++) {
                            recipe_list[i].style.opacity = "0.8";
                        }
                    }
                    clicked = true;
                    this.style.opacity = "1";
                    var name = this.innerHTML;
                    var id_name = cleanName(anme);
                    id_name = "#" + id_name + "-node";
                    var node = d3.select(id_name);
                    var allNodes = d3.selectAll(".dot");
                    allNodes.style("opacity", .2);
                    node.style("opacity", 1);

                }
                var recipe_panel = document.getElementById("recipe_info_heading");
                recipe_panel.style.backgroundColor = color;
            }
        }
    }
})();