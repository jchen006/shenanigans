from flask import Blueprint, request, jsonify, abort
import app.mongo.mongo_helper as mh
import app.mongo.mongo_submit_helper as msh
from bson import json_util
import json

db = Blueprint('db', __name__)

pending_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
mongo_main = mh.MongoHelper()

"""Gets all recipes"""
@db.route("/recipes", methods=['GET'])
def get_mongo_recipes(): 
    recipes = mongo_main.findAll()
    recipes_cleaned = json.loads(json_util.dumps(recipes))
    return jsonify({"Recipes": recipes_cleaned}), 200

"""Updates the recipe 
"""
@db.route("/update_pending", methods=['POST'])
def update_mongo_recipe():
    id = request.json['_id'].encode("ascii", "ignore")
    field = request.json['field'].encode("ascii", "ignore")
    content = request.json['content'].encode("ascii", "ignore")
    database = request.json['database'].encode("ascii", "ignore")
    if(database == "PENDING"):
    	result = pending_recipe.updateFields(id, field, content)
    elif(database == "MAIN"): 
    	result = mongo_main.updateFields(id, field, content)
    else: 
    	abort(400, {"Database not recognized"})
    return jsonify({"action": "ITEM_UPDATED"}), 200

"""Remove the recipe route
"""
@db.route("/remove", methods=['POST'])
def remove_mongo_recipe():
    if not request.json:
        abort(400)
    name = request.json['name'].encode("ascii", "ignore")
    database = request.json['database'].encode("ascii", "ignore")
    if(database == "PENDING"): 
    	result = pending_recipe.removeOneRecipe(name)
    elif(database == "MAIN"):
    	result = mongo_main.removeOneRecipe(name)
    else: 
    	abort(400, {"Database not recognized"})

    if result == 1:
        return jsonify({'action': 'REMOVED'}), 200
    else:
        return jsonify({'action': 'ITEM_NOT_FOUND'}), 200

"""Removes the recipe from icebox to main route
"""
@db.route("/approve", methods=['POST'])
def approve_mongo_recipe():
    if not request.json:
        abort(400)
    id = request.json['id'].encode("ascii", "ignore")
    pending_recipe = mongo_recipe.findById(id)
    recipe_to_move = {
        "name": pending_recipe['recipe_name'].encode("ascii", "ignore"),
        "ingredients": str(pending_recipe['ingredients']).split(","),
        "url": "",
        "chef": ""
    }
    mongo_main.insertToRemote(recipe_to_move)
    result = mongo_recipe.removeById(id)
    if result == 1:
        return jsonify({'action': 'MOVED'}), 200
    else:
        return jsonify({'action': 'ITEM_NOT_FOUND'}), 200
