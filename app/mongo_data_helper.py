from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import cPickle as pickle
import mongo_helper


class MongoDataHelper(mongo_helper.MongoHelper):

    def __init__(self, db_str='recipes',
                 collection_str='recipe_collection',
                 uri_str="mongodb://recipe_user:dinneriscoming@ds035543.mlab.com:35543/recipes",
                 debug=False):
        mongo_helper.MongoHelper.__init__(self,
				          db_str,
					  collection_str,
					  uri_str,
					  debug=False)

    def insertObj(self, mongo_name, python_obj):
        pickeled_obj = pickle.dumps(python_obj)
        self.binary_collection.insert({mongo_name: Binary(pickeled_obj)})

    def findObj(self, mongo_name):
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


if __name__ == "__main__":
    x = MongoDataHelper()
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
