from flask import Blueprint, render_template, request
import app.mongo.mongo_submit_helper as msh
submit = Blueprint('submit', __name__)

mongo_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
mongo_ingred = msh.SubmitMongoHelper('ingredient_updates')

"""Submit recipes page"""


@submit.route('/submit_recipes')
def submit_recipes():
    return render_template('submit/submit_recipes.html')

"""Submission of feedback that goes to our emails"""


@submit.route('/submit_feedback')
def submit_feedback():
    return render_template('submit_feedback.html')

"""Update ingredient will pull from all our existing database
and allow user to pick a specific ingredient and suggest an update to it"""


@submit.route('/update_ingredient')
def update_ingredient():
    return render_template('submit/submit_ingredient.html')


@submit.route("/submit_recipe", methods=['POST'])
def submit_recipe():
    email = request.form['email']
    recipe_name = request.form['recipe_name']
    recipe_ingredients = request.form['ingredients']
    mongo_recipe.insertToRemote(
        {'email': email,
         'recipe_name': recipe_name,
         'ingredients': recipe_ingredients})
    return render_template('submit/submit_success.html', response="Thanks for your recipe submission!")

"""
TODO: need to add specific classifiers as options before they can submit
"""


@submit.route("/submit_ingredient", methods=['GET', 'POST'])
def submit_ingredient():
    email = request.form['email']
    suggested = request.form['name']
    ingred_type = request.form.get('type')
    mongo_ingred.insertToRemote({
        'email': email,
        'action': "suggestion",
        'suggested': suggested,
        'type': ingred_type
    })
    return render_template('submit/submit_success.html', response="Thanks for your ingredient suggestion!")
