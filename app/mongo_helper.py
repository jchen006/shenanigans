from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import cPickle as pickle

class MongoHelper:
    uri = "mongodb://recipe_user:dinneriscoming@ds035543.mongolab.com:35543/recipes"

    def __init__(self, debug=False):
        self.client = MongoClient(MongoHelper.uri)
        self.db = self.client['recipes']
        self.collection = self.db['recipe_collection']
        self.binary_collection = self.db['bin-data']

    def insertObj(self, mongo_name, python_obj):
        pickeled_obj = pickle.dumps(python_obj)
        self.binary_collection.insert({mongo_name : Binary(pickeled_obj)})

    def findObj(self, mongo_name):
        objs = []
        for p in self.binary_collection.find({ mongo_name : { '$exists': True } }): # ASSUME ONLY 1 OBJECT RETURNED!!
            objs.append(p)
        if len(objs) != 0:
            return pickle.loads(objs[0][mongo_name])
        else:
            return None

    def insertToRemote(self, json):
        post_id = None
        if isinstance(json, dict):
            post_id = [self.collection.insert_one(json).inserted_id]
        elif isinstance(json, list):
            post_id = self.collection.insert_many(json).inserted_ids
        return post_id

    def findByJson(self, json):
        return list(self.collection.find(json))

    def findById(self, post_id):
        if isinstance(post_id, str):
            post_id = ObjectId(post_id)
        return self.collection.find_one({"_id": post_id})

    def findAll(self):
        posts = []
        for post in self.collection.find():
            posts.append(post)
        return posts


if __name__ == "__main__":
    x = MongoHelper()
    ids = []
    ids += x.insertToRemote({"foo1":"bar1"})
    ids += x.insertToRemote({"foo2":"bar2"})
    ids += x.insertToRemote([{"one":"fish"}, {"two":"fish"}, {"red":"fish"}, {"blue":"fish"}])
    ids += x.insertToRemote({"name":"bob", "chef":"gordon", "url":"youtube.com", "ingredients":["fish", "onions", "garlic"]})


    for id in ids:
        print "id added: "+ str(id)
        print x.findById(str(id))

    print "Finding all in database..."
    print x.findAll()

    print "Query for {\"foo\":\"bar\"}"
    print x.findByJson({"foo":"bar"})[:]
    print "Query for {\"foo1\":\"bar1\"}"
    print x.findByJson({"foo1":"bar1"})
    print "Query for {\"foo\":\"fish\"}"
    print x.findByJson({"foo":"fish"})
    print "Query for {\"one\":\"fish\"}"
    print x.findByJson({"one":"fish"})
    print "Query for {\"name\":\"bob\"}"
    print x.findByJson({"name":"bob"})
    print "Query for {\"name\":\"bob\", \"url\":\"youtube.com\"}"
    print x.findByJson({"name":"bob", "url":"youtube.com"})
