from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import cPickle as pickle


class MongoHelper:

    def __init__(self, db_str='recipes',
                 collection_str='recipe_collection',
                 uri_str="mongodb://recipe_user:dinneriscoming@ds035543.mlab.com:35543/recipes",
                 debug=False):
        self.uri = uri_str
        self.client = MongoClient(uri_str)
        self.db = self.client[db_str]
        self.collection = self.db[collection_str]
        self.binary_collection = self.db['bin-data']

    def insertPickleObj(self, mongo_key, python_obj):
        pickeled_obj = pickle.dumps(python_obj)
        self.binary_collection.insert({mongo_key: Binary(pickeled_obj)})

    def findPickleObj(self, mongo_name):
        objs = []
        # ASSUME ONLY 1 OBJECT RETURNED!!
        for p in self.binary_collection.find({mongo_name: {'$exists': True}}):
            objs.append(p)
        if len(objs) != 0:
            return pickle.loads(objs[0][mongo_name])
        else:
            return None

    def insertToRemote(self, json):
        post_id = None
        if isinstance(json, dict):
            post_id = self.collection.insert_one(json).inserted_id
        elif isinstance(json, list):
            post_id = self.collection.insert_many(json).inserted_ids
        return post_id

    def findByJson(self, json):
        returned_posts = list(self.collection.find(json))
        if len(returned_posts) == 1:
            returned_posts = returned_posts[0]
        return returned_posts

    def findById(self, post_id):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        return self.collection.find_one({"_id": post_id})

    def removeById(self, post_id):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        result = self.collection.delete_one({"_id": post_id})
        return result.deleted_count

    def findAll(self):
        posts = []
        for post in self.collection.find():
            posts.append(post)
        if len(posts) == 1:
            posts = posts[0]
        return posts

    def findByField(self, field_name, field_value):
        return_val = []
        for val in self.collection.find({field_name: field_value}):
            return_val.append(val)
        if len(return_val) == 1:
            return_val = return_val[0]
        return return_val

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


if __name__ == "__main__":
    x = MongoHelper()
    ids = []
    ids += x.insertToRemote({"foo1": "bar1"})
    ids += x.insertToRemote({"foo2": "bar2"})
    ids += x.insertToRemote([{"one": "fish"}, {"two": "fish"},
                             {"red": "fish"}, {"blue": "fish"}])
    ids += x.insertToRemote({"name": "bob", "chef": "gordon",
                             "url": "youtube.com", "ingredients": ["fish", "onions", "garlic"]})

    for id in ids:
        print "id added: " + str(id)
        print x.findById(str(id))

    print "Finding all in database..."
    print x.findAll()

    print "Query for {\"foo\":\"bar\"}"
    print x.findByJson({"foo": "bar"})[:]
    print "Query for {\"foo1\":\"bar1\"}"
    print x.findByJson({"foo1": "bar1"})
    print "Query for {\"foo\":\"fish\"}"
    print x.findByJson({"foo": "fish"})
    print "Query for {\"one\":\"fish\"}"
    print x.findByJson({"one": "fish"})
    print "Query for {\"name\":\"bob\"}"
    print x.findByJson({"name": "bob"})
    print "Query for {\"name\":\"bob\", \"url\":\"youtube.com\"}"
    print x.findByJson({"name": "bob", "url": "youtube.com"})
