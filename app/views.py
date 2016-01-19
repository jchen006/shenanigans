from app import app
from flask import render_template, request
from recipe_page import *
from analytics import *
import json
from graph import *
from pages import *
from mongo_helper import *

p = Page()
g = Graph()
g.make_graph_from_mongo()
g.make_d3()
b = BagOfIngredients()
b.generate_bag_of_ingredients()
b.generate_recipe_vectors()
top_ingreds, top_freqs = b.get_top_N_ingredient_frequencies(20)
X = b.recipe_vects
P = PCAModel(X)
L = LDAModel(X, b.ordered_ingredients, b.ordered_recipes)
L.plot_mds()
NN = NearestNeighborsModel(X)
clusters = L.clustered_recipes
lda_json = L.d3_json

m = MongoHelper()

@app.route('/')
def home():
  return render_template('home.html')
  
@app.route('/about')
def about():
  return render_template('about_us.html')

@app.route('/experiments')
def experiments():
    return render_template('experiments.html')

@app.route('/references')
def references():
    return render_template('references.html')

@app.route('/about_project')
def about_project(): 
    return render_template('about_project.html')

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

@app.route('/ingredient_Frequency_json')
def ing_freq_json():
    return b.get_top_N_ingredients_json(30)

@app.route('/ingredient_Frequency')
def ing_freq():
    return render_template('ingredient_Frequency.html')

@app.route('/lda_graph_json')
def lda_graph_json():
    return lda_json

@app.route('/lda_graph')
def lda_graph(): 
    return render_template('lda_graph.html')

@app.route('/radar_graph') 
def radar_graph(): 
    return render_template('radar_graph.html')

@app.route('/ordered_recipes_json')
def ordered_recipes_json():
    return L.get_ordered_recipes_json()

@app.route('/radar_graph_json')
def radar_graph_json():
    r1 = request.args.get('recipe1')
    r2 = request.args.get('recipe2')
    return L.get_radar_json(r1, r2)

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

@app.route('/recipe_scatterplot_json')
def recipe_scatterplot_json():
    return L.get_mds_json()

@app.route('/recipe_scatterplot')
def recipe_scatterplot(): 
    return render_template('recipe_scatterplot.html')

@app.route("/mongo")
def readMongo():
    listOfJson = m.findAll()
    return json.dumps(str(listOfJson))
