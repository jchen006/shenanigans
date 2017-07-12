var renderer = (function() {
    var cleanName = function(name) {
        return name.replace(/\s/g, '').replace(/[^\w\s]/gi, '').toLowerCase();
    }

    //<span class="label label-primary">Primary
    var renderRecipeLabels = function(recipe, color) {
        let recipe_label = document.createElement("span")
        recipe_label.className = "label label-primary"
        recipe_label.backgroundColor = color
        recipe_label.innerHTML = recipe
        recipe_label.id = cleanName(recipe) + "-item";
        console.log(recipe_label)
        return recipe_label
    }

    return {
        changeOpacity: function(element, number) {
            element.style("opacity", number);
        },
         populateTable: function(recipes) {
            console.log(recipes)
            var recipe_list = document.getElementById("recipe_list")
            for (var i = 0; i < recipes.length; i++) {
                var node = document.getElementById(recipes[i].id);
                var name = node.getAttribute("name");
                color = node.style.fill;
                var entry = renderRecipeLabels(name, color);
                console.log(entry)
                recipe_list.appendChild(entry);
            }
         }
    }
})();