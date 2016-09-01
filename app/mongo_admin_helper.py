from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

class AdminMongoHelper:
	#uri = "mongodb://recipe_user:dinneriscoming@ds035543.mongolab.com:35543/recipes"	
	uri = "mongodb://ohtrahddis:dinneriscoming1@ds035543.mlab.com:35543/recipes"	
	def __init__(self, collection, debug=False):
		self.client = MongoClient()
		self.db = self.client['admin']
		self.collection = self.db[collection]

	def getUser(self, userId):
		print "getUser is called"
		userObject = self.collection.find_one({"userId": userId})
		if userObject:
			"find_one returns something"
			return userObject
		"nothing is found"
		return userObject
