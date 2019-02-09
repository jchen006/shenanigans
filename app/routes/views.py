from app import shenanigans
from flask import render_template, request
from app.util.renderer.pages import *
from API import parser
from app.util.renderer.recipe_page import RecipePage
import app.mongo.mongo_helper as mh
import os

p = RecipePage(parser)
m = mh.MongoHelper()

def get_last_update_time(dir):
    return str(max(os.path.getmtime(os.path.join(dir, f)) for f in os.listdir(dir)))

@shenanigans.route('/api/recipes')
def recipes():
    """This is to list out all recipes currently in the database"""
    titles = p.create_titles_page()
    recipes = {}
    for t in titles:
        url = p.create_recipe_url(t)
        recipes[t] = url
    return recipes

@shenanigans.route('/', defaults={'path': ''})
@shenanigans.route('/<path:path>')
def index(path):
    #last_updated is used so the browser will request the new file and not used a cached one
    #should be disabled in production and only used in debug mode so reminder to do that
    return render_template('index.html', last_updated=get_last_update_time('app/static/js/react-components'))

@shenanigans.route('/home')
def home():
    return render_template('home.html')





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


@shenanigans.route('/template')
def template():
    return render_template('template.html')



@shenanigans.route('/js-sandbox')
def js_sandbox():
    return render_template('js-sandbox.html')
