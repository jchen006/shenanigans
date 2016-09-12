from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json

# 153735


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

    def findById(self, post_id):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        return self.collection.find_one({"_id": post_id})

    def removeById(self, post_id):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        result = self.collection.delete_one({"_id": post_id})
        return result.deleted_count

    def removeOne(self, item):
        removal_json = {"recipe_name": item}
        result = self.collection.delete_one(removal_json)
        return result.deleted_count

    def updateField(self, post_id, field, content):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        result = self.collection.update_one(
            {"_id": post_id},
            {
                "$set": {
                    field: content
                }
            },
            {"$currentDate": {"lastModified": True}}
        )
        return result
