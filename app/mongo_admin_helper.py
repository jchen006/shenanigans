from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import mongo_helper


class AdminMongoHelper(mongo_helper.MongoHelper):

    def __init__(self, collection, debug=False):
	mongo_helper.MongoHelper.__init__(self, db_str='recipes',
                                      collection_str=collection)

    def getUser(self, userId):
        # Chaning from findOne to Find allowed me to use this query pattern
        print "getUser is called"
        userObject = self.collection.find_one({"userId": userId})
        print "userObject", userObject
        if userObject:
            return userObject
        return None

    # For Testing Purposes Only
    def printAll(self):
        allObjects = self.collection.find()
        print allObjects
