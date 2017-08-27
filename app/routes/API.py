from flask import Blueprint
from app.analytics.graph import *
from app.analytics.radial_graph import *
from app.analytics.analytics import *
import json
from flask import request
import app.mongo.mongo_helper as mh
from app.util.data.recipe_parser import Parser
from tf import ingred_vae_train as vae_utils

api = Blueprint('api', __name__)

parser = Parser()
parser.retrieve_data()

print(parser)

# g = Graph(parser)
# g.make_graph_from_mongo()
# g.make_d3()

rg = RadialGraph(parser)
rg.init_graph_from_mongo()

boi = BagOfIngredients(parser)
boi.generate_bag_of_ingredients()
boi.generate_recipe_vectors()
top_ingreds, top_freqs = boi.get_top_N_ingredient_frequencies(20)
X = boi.recipe_vects
P = PCAModel(X)
L = LDAModel(X, boi.ordered_ingredients, boi.ordered_recipes)
L.plot_mds()
NN = NearestNeighborsModel(X)
clusters = L.clustered_recipes
lda_json = L.d3_json


VAE_TRAIN_EPOCHS = 1600
_, VAE_SAVE_PATH = vae_utils.create_and_train_vae(
    vae_utils.DEFAULT_NETWORK_ARCHITECTURE, X, X.shape[0], training_epochs=VAE_TRAIN_EPOCHS)
vae = vae_utils.restore_test_vae_from_checkpoint(
    vae_utils.DEFAULT_NETWORK_ARCHITECTURE, VAE_SAVE_PATH)


@api.route('/create_recipe')
def crate_recipe_tensorflow():
    z_mu = request.args.get('vect')
    return vae_utils.generate_recipe_from_vae(boi, vae, z_mu)


@api.route('/ingredient_frequency')
def ing_freq_json():
    return boi.get_top_N_ingredients_json(30)


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
    return boi.get_top_N_ingredients_json(N=int(num_words), MAX_FONT=70)
