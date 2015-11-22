from app import app
from flask import render_template
from recipe_page import *
import json
from graph import *
from pages import *
from mongo_helper import *

p = Page()
g = Graph()
g.make_graph_from_mongo()
g.make_d3()

m = MongoHelper()

@app.route('/')
def home():
  return render_template('home.html')
  
@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/recipes')
def recipes(): 
    """This is to list out all recipes currently in the database"""
    titles = p.create_titles_page()
    recipes = {}
    for t in titles: 
        url = p.create_recipe_url(t)
        recipes[t] = url
    return render_template('recipes.html', titles=titles, recipes=recipes)

@app.route('/recipe_page/<recipe>')
def recipe_page(recipe):
    """Takes in the file_name and runs it through the recipePage 
    and generates a specific recipe page related to it
    Should take in individuals values that are needed including original url, 
    chef, and ingredients, and instructions"""    
    title, url, chef, ingredients = p.create_recipe_page(recipe)
    return render_template('recipe_page.html', title=title, url=url, chef=chef, ingredients=ingredients)

@app.route('/ingredients')
def ingredients(): 
    pass

@app.route('/count_graph')
def count_graph(chartID = "hellotherethisisthechartid", chart_type = 'bar', chart_height = 350):
    # put this in a function
    chart = {"renderTo": chartID, "type": chart_type, "height": chart_height}
    #series, title, xAxis, yAxis = g.make_highcharts_graph(
    series = [{"name": 'Label1', "data": [1,2,3]}, {"name": 'Label2', "data": [4, 5, 6]}]
    title = {"text": 'My Title'}
    xAxis = {"categories": ['xAxis Data1', 'xAxis Data2', 'xAxis Data3']}
    yAxis = {"title": {"text": 'yAxis Label'}}

    return render_template('highcharts.html', chartID=chartID, chart=chart, series=series, title=title, xAxis=xAxis, yAxis=yAxis)

@app.route('/graph')
def graph():
    return render_template('graph_page.html')

@app.route('/graph_json')
def graph_json():
    return g.get_d3_json()

@app.route('/ingredient_Frequency')
def ing_freq():
    return render_template('ingredient_Frequency.html')

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

@app.route("/mongo")
def readMongo():
    listOfJson = m.findAll()
    return json.dumps(str(listOfJson))
