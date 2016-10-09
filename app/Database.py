from flask import Blueprint, request, jsonify, abort
import mongo_helper as mh
import mongo_submit_helper as msh
from bson import json_util, ObjectId
import json

db = Blueprint('db', __name__)

mongo_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
mongo_main = mh.MongoHelper()

"""Updates the recipe 
"""

@db.route("/update_pending", methods=['POST'])
def update_mongo_recipe():
    id = request.json['_id'].encode("ascii", "ignore")
    field = request.json['field'].encode("ascii", "ignore")
    content = request.json['content'].encode("ascii", "ignore")
    result = mongo_recipe.updateFields(id, field, content)
    return jsonify({"action": "ITEM_UPDATED"}), 200

"""Remove the recipe route
"""

@db.route("/remove", methods=['POST'])
def remove_mongo_recipe():
    if not request.json:
        abort(400)
    name = request.json['name']
    result = mongo_recipe.removeOne(name)
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

#Methods to modify the Main Database - No remote edit method
@db.route("/addToRemote", methods=['POST'])
def insert_to_remote(self, json):


@db.route("/deleteFromRemote", methods=['POST'])
def delete_from_remote(self, json):


#Get methods to retrieve from the Database
"""Returns Recipe from the PendingList
"""
@db.route("/getPendingEntries", methods=['GET'])
def retrieve_mongo_icebox_recipes():
    dataBaseItems = msh.findAll();
    filteredRecipes = [];
    keyCounter = 0
    for recipe in dataBaseItems:
        recipe = (recipe['name'], recipe['ingredients'], keyCounter)
        filteredRecipes.append(recipe)
        keyCounter += 1
    return json.dumps(filteredRecipes)

"""Returns Recipe from the Database
"""
@db.route("/getDatabaseEntries", methods=['GET'])
def retrieve_mongo_recipes():
    dataBaseItems = mongo_main.findAll();
    filteredRecipes = [];
    keyCounter = 0
    for recipe in dataBaseItems:
        recipe = (recipe['name'], recipe['ingredients'], keyCounter)
        filteredRecipes.append(recipe)
        keyCounter += 1
    return json.dumps(filteredRecipes)

