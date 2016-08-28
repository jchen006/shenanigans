from flask import Blueprint, request, jsonify
import mongo_helper as mh
import mongo_submit_helper as msh

db = Blueprint('db', __name__) 

mongo_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
mongo_main = mh.MongoHelper()

"""Edits the recipe route
"""
@db.route("/update")
def update_mongo_recipe(): 
	pass

"""Remove the recipe route
"""
@db.route("/remove", methods=['POST'])
def remove_mongo_recipe():
	if not request.json: 
		abort(400)
	name = request.json['name']
	result = mongo_recipe.removeOne(name)
	if result == 1:
		return jsonify({'action':'REMOVED'}), 200
	else: 
		return jsonify({'action':'ITEM_NOT_FOUND'}), 200

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
		return jsonify({'action':'MOVED'}), 200
	else:
		return jsonify({'action':'ITEM_NOT_FOUND'}), 200
	