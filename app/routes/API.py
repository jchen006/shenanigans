from flask import Blueprint
from app.graph import *
from app.radial_graph import *
from app.analytics.analytics import *
import json
from flask import request
import app.mongo.mongo_helper as mh

api = Blueprint('api', __name__)

parser = Parser()
parser.retrieve_data()

# g = Graph(parser)
# g.make_graph_from_mongo()
# g.make_d3()

rg = RadialGraph(parser)
rg.init_graph_from_mongo()

b = BagOfIngredients(parser)
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


# @api.route('/graph')
# def graph_json():
#     return g.get_d3_json()


@api.route('/ingredient_frequency')
def ing_freq_json():
    return b.get_top_N_ingredients_json(30)


@api.route('/ingredient_network_json')
def ingredient_network_json():
    root = request.args.get('root')
    return rg.make_d3_graph_json(root)


@api.route('/lda_graph')
def lda_graph_json():
    return lda_json


@api.route("/mongo")
def readMongo():
    listOfJson = m.findAll()
    return json.dumps(str(listOfJson))


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


@api.route("/word_cloud_json/<num_words>")
def output_word_cloud_json(num_words):
    return b.get_top_N_ingredients_json(N=int(num_words), MAX_FONT=70)
