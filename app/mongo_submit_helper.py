from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

#153735
class SubmitMongoHelper:
	uri = "mongodb://recipe_user:dinneriscoming@ds035543.mongolab.com:35543/recipes"

	def __init__(self, debug=False):
		self.client = MongoClient(SubmitMongoHelper.uri)
		self.db = self.client['recipes']
		self.collection = self.db['pending_recipe_collection']
		self.binary_collection = self.db['bin-data']


	def insertToRemote(self, json):
	    post_id = None
	    if isinstance(json, dict):
	        post_id = [self.collection.insert_one(json).inserted_id]
	    elif isinstance(json, list):
	        post_id = self.collection.insert_many(json).inserted_ids
	    return post_id







