from app import app
from flask import render_template, request
from pages import *
from mongo_helper import *
from API import parser


p = Page(parser)
m = MongoHelper()

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/home')
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

@app.route('/recipe_card/<recipe>')
def recipe_card(recipe):
    """Takes in the file_name and runs it through the recipePage 
    and generates a specific recipe page related to it
    Should take in individuals values that are needed including original url, 
    chef, and ingredients, and instructions"""
    print recipe
    title, url, chef, ingredients = p.create_recipe_page(recipe)
    return render_template('recipe_card.html', title=title, url=url, chef=chef, ingredients=ingredients)

@app.route('/ingredients')
def ingredients(): 
    pass

@app.route('/radial_network_graph')
def radial_network(): 
    return render_template ('radial_network_graph.html')

@app.route('/graph')
def graph():
    return render_template('graph_page.html')

@app.route('/ingredient_frequency')
def ing_freq():
    return render_template('ingredient_frequency.html')

@app.route('/lda_graph')
def lda_graph(): 
    return render_template('lda_graph.html')

@app.route('/radar_graph') 
def radar_graph(): 
    return render_template('radar_graph.html')

@app.route('/recipe_scatterplot')
def recipe_scatterplot(): 
    return render_template('recipe_scatterplot.html')

@app.route('/word_cloud')
def word_cloud(): 
    return render_template('word_cloud.html')

@app.route('/js-sandbox')
def js_sandbox(): 
    return render_template('js-sandbox.html')

