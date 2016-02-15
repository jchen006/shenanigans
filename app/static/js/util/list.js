function updateList(name, list) {
  var curr = document.getElementById(name).getElementsByTagName("li");
  if(curr.length == 0) {
    createList(name,list);
  } 
}

function createList(listName, list) {
  for(var i = 0; i < list.length; i++) {
     appendToList(listName, list[i].name);
  }
}

function appendToList(name, value) {
  var list = document.getElementById(name); 
  var entry = document.createElement("li");
  var link = document.createElement("a");

  var recipe = value.replace(/\b./g, function(m){ return m.toUpperCase(); });
  console.log(recipe);
  recipe = recipe.replace(/ /g, "_");

 
  var url = "/recipe_page/" + recipe;

  link.textContent = value;
  link.setAttribute('href', url);
  entry.appendChild(link);
  list.appendChild(entry);
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
}