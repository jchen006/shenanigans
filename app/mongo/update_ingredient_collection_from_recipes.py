from pymongo import MongoClient
from bson.binary import Binary
from bson.objectid import ObjectId
import json
import cPickle as pickle

from mongo_helper import MongoHelper


if __name__ == "__main__":
    x = MongoHelper(collection_str='recipe_collection')
    y = MongoHelper(collection_str='ingredient_collection')
    z = MongoHelper(collection_str='recipe_updated_test')
    all_recipes = x.findAll()
    for recipe in all_recipes:
    	old_ingredients = recipe["ingredients"]
        new_ingredient_objectId_list = []
        for ingred_str in old_ingredients:
            post_id = y.findByField("name", ingred_str)
            if not post_id:
                post_id = y.insertToRemote({"name": ingred_str})
            print "HELLOOO"
            if not isinstance(post_id, ObjectId):
                post_id = post_id["_id"]
            new_ingredient_objectId_list.append(post_id)
        if not z.findByField("_id", recipe["_id"]):
            recipe["ingredients"] = new_ingredient_objectId_list
            new_recipe_id = z.insertToRemote(recipe)
    import pdb; pdb.set_trace()
    

