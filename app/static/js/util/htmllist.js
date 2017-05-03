var listNotCreated = true;

function updateList(name, list, size, title) {
    var curr = document.getElementById(name).getElementsByTagName("li");
    var cluster_name = document.getElementById("cluster_name");
    if(typeof size !== "undefined" && typeof title !== "undefined") {
         cluster_name.innerHTML = title + " (" + size + ")";
    }
    if (curr.length == 0) {
        createList(name, list);
    }
}

function createList(listName, list) {
    if (listNotCreated) {
        var name_list = [];
        for (var i = 0; i < list.length; i++) {
            name_list.push(list[i].name);
        }
        alphabetized_list = name_list.sort();

        for (var i = 0; i < alphabetized_list.length; i++) {
            appendToList(listName, alphabetized_list[i]);
        }
    }
    listNotCreated = false;
}

function appendToList(name, value) {
    var list = document.getElementById(name);
    var link = document.createElement("a");

    var recipe = value.replace(/\b./g, function(m) { return m.toUpperCase(); });
    recipe = recipe.replace(/ /g, "_");


    var url = "/recipe_page/" + recipe;

    link.textContent = value;
    link.className = "list-group-item";
    link.setAttribute('href', url);
    list.appendChild(link);
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function clearList(name) {
    document.getElementById(name).innerHTML = "";
    var cluster_name = document.getElementById("cluster_name");
    cluster_name.innerHTML = "";
    listNotCreated = true;
}