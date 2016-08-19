from app import shenanigans
from flask import render_template, request
from pages import *
from mongo_helper import *
from API import parser
import mongo_helper as mh

#Adding form components here
#from components import *


p = Page(parser)
m = MongoHelper()

@shenanigans.route('/')
def index():
  return render_template('index.html')

@shenanigans.route('/home')
def home():
  return render_template('home.html')

@shenanigans.route('/recipes')
def recipes():
    """This is to list out all recipes currently in the database"""
    titles = p.create_titles_page()
    recipes = {}
    for t in titles:
        url = p.create_recipe_url(t)
        recipes[t] = url
    return render_template('recipes.html', titles=titles, recipes=recipes)

@shenanigans.route('/recipe_card/<recipe>')
def recipe_card(recipe):
    """Takes in the file_name and runs it through the recipePage
    and generates a specific recipe page related to it
    Should take in individuals values that are needed including original url,
    chef, and ingredients, and instructions"""
    print recipe
    title, url, chef, ingredients = p.create_recipe_page(recipe)
    return render_template('recipe_card.html', title=title, url=url, chef=chef, ingredients=ingredients)

@shenanigans.route('/ingredients')
def ingredients():
    pass

@shenanigans.route('/radial_network_graph')
def radial_network(): 
    return render_template ('radial_network_graph.html')

@shenanigans.route('/graph')
def graph():
    return render_template('graph_page.html')

@shenanigans.route('/ingredient_frequency')
def ing_freq():
    return render_template('ingredient_frequency.html')

@shenanigans.route('/lda_graph')
def lda_graph():
    return render_template('lda_graph.html')

@shenanigans.route('/radar_graph')
def radar_graph():
    return render_template('radar_graph.html')

@shenanigans.route('/recipe_scatterplot')
def recipe_scatterplot():
    return render_template('recipe_scatterplot.html')

@shenanigans.route('/word_cloud')
def word_cloud():
    return render_template('word_cloud.html')

@shenanigans.route('/js-sandbox')
def js_sandbox(): 
    return render_template('js-sandbox.html')
