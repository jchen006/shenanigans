from flask import Blueprint, jsonify, request, abort 
from ingredient import Ingredient

api_ingredient = Blueprint('ingredients', __name__)

"""This will act as means to search for specific ingredients
and return back specific data as needed"""

# db = ingredientDB()

@api_ingredient.route("/search", methods=['POST'])
"""Does a search for a specific ingredient and returns all data regarding it. 
Will not support recipes as part of the data returned."""
def search_db(): 
	if not request.json: 
		abort(400)
	ingredient = request.json['ingredient'].encode("ascii", "ignore")


@api_ingredient.route("/seasonality", methods=['POST'])
def seasonality(): 
	if not request.json: 
		abort(400)
	month = request.json['month'].encode("ascii", "ignore")
	location = request.json['location'].encode("ascii", "ignore")
	#location doens't exist default to US



