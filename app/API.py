from flask import Blueprint
from graph import *
from analytics import *
import json
from flask import request
import mongo_helper as mh

api = Blueprint('api', __name__)

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

@api.route('/graph')
def graph_json():
    return g.get_d3_json()

@api.route('/lda_graph')
def lda_graph_json():
    return lda_json

@api.route('/ingredient_frequency')
def ing_freq_json():
    return b.get_top_N_ingredients_json(30)

@api.route('/ordered_recipes')
def ordered_recipes_json():
    return L.get_ordered_recipes_json()

@api.route('/radar_graph')
def radar_graph_json():
    r1 = request.args.get('recipe1')
    r2 = request.args.get('recipe2')
    return L.get_radar_json(r1, r2)

@api.route('/recipe_scatterplot')
def recipe_scatterplot_json():
    return L.get_mds_json()

@api.route("/mongo")
def readMongo():
    listOfJson = m.findAll()
    return json.dumps(str(listOfJson))

@api.route("/word_cloud_json/<num_words>")
def output_word_cloud_json(num_words):
    return b.get_top_N_ingredients_json(N=int(num_words), MAX_FONT=70)

#Routes to add recipe and ingredients into the system - API routes, for these things
@api.route("/submit_ingredient", methods=['POST'])
def submit_ingredient(request):
    ingredient = request.ingredient
    return mh.insertObject({'ingredient': ingredient})

@api.route("/submit_recipe", methods=['POST'])
def submit_recipe(request):
    recipeName = request.recicpeName
    recipeIngredients = []
    for ingredient in request.recipeIngredients:
      recipeIngredients.append(recipeIngredients)
    return mh.insertObject({recipeName: recipeIngredients})

#Private Method in the routes -> Admin MongoHelper.by
