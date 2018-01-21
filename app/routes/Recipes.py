from flask import Blueprint

recipes = Blueprint('recipes', __name__)

@recipes.route('/all')
def getAllRecipes(): 
  return render_template('allRecipes.html')

@recipes.route('/<id>')
def getRecipe(): 
  return render_template('recipe.html', id)