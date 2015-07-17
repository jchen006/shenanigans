from app import app
from flask import render_template
from recipePage import *
import json

@app.route('/')
def home():
  return render_template('home.html')
  
@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/recipes')
def recipes(): 
    """This is to list out all recipes currently in the database"""
    r = recipePage()
    recipes = r.generate_list()
    return render_template('recipes.html', recipes=recipes)

@app.route('/recipes/<file_name>')
def recipe():
    """Takes in the file_name and runs it through the recipePage 
    and generates a specific recipe page related to it"""
    return render_template('recipe.html')

@app.route('/d3')
def d3(): 
	return render_template('d3.html')