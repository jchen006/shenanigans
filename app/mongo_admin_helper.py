from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

class AdminMongoHelper:

	def __init__(self, collection, debug=False):
		self.client = MongoClient()
		self.db = self.client['admin']
		self.collection = self.db[collection]

	def getUser(self, userId):
		return self.collection.find_one({"userId": userId})
