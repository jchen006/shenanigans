from flask import Blueprint, render_template, request
import mongo_submit_helper as msh
submit = Blueprint('submit', __name__)


#Route to submit to icebox
#I need to submit to the correct collection, might need to modify mongohelper to be generic

mongo = msh.SubmitMongoHelper()

"""Submit recipes page"""
@submit.route('/submit_recipes')
def submit_recipes():
    return render_template('submit_recipes.html')

"""Submission of feedback that goes to our emails"""
@submit.route('/submit_feedback')
def submit_feedback(): 
	return render_template('submit_feedback.html')

"""Update ingredient will pull from all our existing database 
and allow user to pick a specific ingredient and suggest an update to it"""
@submit.route('/update_ingredient')
def update_ingredient(): 
	return render_template('update_ingredient.html')

@submit.route("/submit_ingredient", methods=['POST'])
def submit_ingredient():
	email = request.form['email']
	recipe_name = request.form['recipe_name']
	recipe_ingredients = request.form['ingredients']
	mongo.insertToRemote(
		{'email': email,
		'recipe_name': recipe_name,
		'ingredients': recipe_ingredients})
	return render_template('submit_success.html', recipe_name=recipe_name, ingredients=recipe_ingredients)

@submit.route("/submit_recipe", methods=['POST'])
def submit_recipe(request):
    recipeName = request.recicpeName
    recipeIngredients = []
    for ingredient in request.recipeIngredients:
        recipeIngredients.append(recipeIngredients)
    return msh.insertObject({recipeName: recipeIngredients})

