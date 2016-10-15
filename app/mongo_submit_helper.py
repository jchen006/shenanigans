from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import mongo_helper


class SubmitMongoHelper(mongo_helper.MongoHelper):

    def __init__(self, collection, debug=False):
        mongo_helper.MongoHelper.__init__(self, db_str='recipes',
                                          collection_str=collection)

    def removeOneRecipe(self, item):
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
