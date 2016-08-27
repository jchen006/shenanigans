from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

#153735
class SubmitMongoHelper:
	uri = "mongodb://recipe_user:dinneriscoming@ds035543.mongolab.com:35543/recipes"

	def __init__(self, collection, debug=False):
		self.client = MongoClient(SubmitMongoHelper.uri)
		self.db = self.client['recipes']
		self.collection = self.db[collection]
		self.binary_collection = self.db['bin-data']

	def insertToRemote(self, json):
	    post_id = None
	    if isinstance(json, dict):
	        post_id = [self.collection.insert_one(json).inserted_id]
	    elif isinstance(json, list):
	        post_id = self.collection.insert_many(json).inserted_ids
	    return post_id

	def findAll(self):
		posts = []
		for post in self.collection.find():
			posts.append(post)
		return posts

	def removeOne(self, item):
		removal_json = {"recipe_name" : item}
		result = self.collection.delete_one(removal_json)
		return result.deleted_count



