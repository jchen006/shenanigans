from flask import Blueprint, render_template
import mongo_submit_helper as msh
submit = Blueprint('submit', __name__)


#Route to submit to icebox
#I need to submit to the correct collection, might need to modify mongohelper to be generic

#Ryan Submission and Control Panel
@submit.route('/submit_recipes')
def submit_recipes():
    return render_template('submit_recipes_or_ingredients.html')

@submit.route("/submit_ingredient", methods=['POST'])
def submit_ingredient(request):
    ingredient = request.ingredient
    return msh.insertObject({'ingredient': ingredient})

@submit.route("/submit_recipe", methods=['POST'])
def submit_recipe(request):
    recipeName = request.recicpeName
    recipeIngredients = []
    for ingredient in request.recipeIngredients:
        recipeIngredients.append(recipeIngredients)
    return msh.insertObject({recipeName: recipeIngredients})

