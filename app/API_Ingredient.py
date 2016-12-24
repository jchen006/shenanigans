from flask import Blueprint, jsonify, request, abort 
from ingredient import Ingredient

api_ingredient = Blueprint('ingredients', __name__)

"""This will act as means to search for specific ingredients
and return back specific data as needed"""

# db = IngredientDB()
# db.generateDB()


@api_ingredient.route("/search", methods=['POST'])
def search_db(): 
	if not request.json: 
		abort(400)
	ingredient = request.json['ingredient'].encode("ascii", "ignore")
	result = db.searchDB(ingredient)



@api_ingredient.route("/seasonality", methods=['POST'])
def seasonality(): 
	if not request.json: 
		abort(400)
	month = request.json['month'].encode("ascii", "ignore")
	location = request.json['location'].encode("ascii", "ignore")
	#location doens't exist default to US



