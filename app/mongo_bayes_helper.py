from pymongo import MongoClient 
import json 
import cPickle as pickle 

class MongoBayesHelper: 
	uri = "mongodb://recipe_user:dinneriscoming@ds017736.mlab.com:17736/bayesian_training"

	def __init__(self, debug=False): 
		self.client = MongoClient(MongoBayesHelper.uri)
		self.db = self.client['bayesian_training']
		self.collection = self.db['training_data']

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