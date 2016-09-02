from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

class AdminMongoHelper:
	uri = "mongodb://recipe_user:dinneriscoming@ds035543.mongolab.com:35543/recipes"
	#I DID NOT pass in the uri	
	def __init__(self, collection, debug=False):
		self.client = MongoClient(AdminMongoHelper.uri)
		#My error is that client is NOT the collection name, so nothing was found
		self.db = self.client['recipes']
		self.collection = self.db[collection]

	def getUser(self, userId):
		#Chaning from findOne to Find allowed me to use this query pattern
		print "getUser is called"
		userObject = self.collection.find_one({"userId": userId})
		print "userObject", userObject
		if userObject:
			return userObject
		return None

	#For Testing Purposes Only
	def printAll(self):
		allObjects = self.collection.find()
		print allObjects
