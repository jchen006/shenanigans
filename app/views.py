from app import app
from flask import render_template
from pages import *
import json
from graph import *

p = Page()
g = Graph()

@app.route('/')
def home():
  return render_template('home.html')
  
@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/recipes')
def recipes(): 
    """This is to list out all recipes currently in the database"""
    recipes = p.recipe_list
    return render_template('recipes.html', recipes=recipes)

@app.route('/recipes/<file_name>')
def recipe():
    """Takes in the file_name and runs it through the recipePage 
    and generates a specific recipe page related to it"""
    return render_template('recipe.html')

@app.route('/ingredients')
def ingredients(): 

    return render_template('ingredients.html', ingredients=ingredients)

@app.route('/d3')
def d3(): 
    return render_template('d3.html')

@app.route("/data")
@app.route("/data/<int:ndata>")
def data(ndata=100):
    """
    On request, this returns a list of ``ndata`` randomly made data points.
    :param ndata: (optional)
        The number of data points to return.
    :returns data:
        A JSON string of ``ndata`` data points.
    """
    x = 10 * np.random.rand(ndata) - 5
    y = 0.5 * x + 0.5 * np.random.randn(ndata)
    A = 10. ** np.random.rand(ndata)
    c = np.random.rand(ndata)
    return json.dumps([{"_id": i, "x": x[i], "y": y[i], "area": A[i],
        "color": c[i]}
        for i in range(ndata)])
