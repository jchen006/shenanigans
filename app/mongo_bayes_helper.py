from pymongo import MongoClient
import json
import cPickle as pickle
import mongo_helper


class MongoBayesHelper(mongo_helper.MongoHelper):
    uri = "mongodb://recipe_user:dinneriscoming@ds017736.mlab.com:17736/bayesian_training"

    def __init__(self,  debug=False):
	mongo_helper.MongoHelper.__init__(self, uri_str=MongoBayesHelper.uri,
									  db_str='bayesian_training',
									  collection_str='training_data')

    def insertToRemote(self, json):
        post_id = None
        if isinstance(json, dict):
            post_id = [self.collection.insert_one(json).inserted_id]
        elif isinstance(json, list):
            post_id = self.collection.insert_many(json).inserted_ids
        return post_id
