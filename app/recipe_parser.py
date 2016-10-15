from filters import *
import mongo_helper as mh
import collections as c
import pickle
import os
import tempfile
import random
import logging
import json
from settings import *


Data = c.namedtuple("Data", "url chef ingredients")
""" Call to the URL will look like... p.recipes['Lemony pork with French beans'].url
    Call to the chef will look like... p.recipes['Lemony pork with French beans'].chef
    Call to the ingredients will look like... p.recipes['Lemony pork with French beans'].ingredients
    """

# logging.basicConfig(filename = '/log/general.log', level=logging.DEBUG)


class Recipe:

    def __init__(self, file_path=None, name=None, url=None, chef=None, ingredients=None):
        self.file_path = file_path
        self.name = name
        self.url = url
        self.chef = chef
        self.ingredients = ingredients
        self.filter_obj = Filter()
        self.filter_obj.parse_master_text_files()

    def parse_ingredients(self):
        temp = []
        with open(self.file_path, 'r') as recipe:
            for r in recipe:
                temp.append(r.strip())
        cut = temp.index("Instructions")
        temp = temp[:cut]
        temp.remove("Ingredients")
        self.name = temp.pop(0)
        self.url = temp.pop(0)
        self.chef = temp.pop(0)
        for i in temp:
            # Where filters happen
            ingred = self.filter_obj.filter_key_ingred(i)
            if type(ingred) is list or type(ingred) is tuple:
                for sub_in in ingred:
                    if sub_in is not None and str(sub_in) != "":
                        self.ingredients.append(str(sub_in))
            else:
                if ingred is not None and str(ingred) != "":
                    self.ingredients.append(str(ingred))
        self.data = Data(self.url, self.chef, self.ingredients)

    def get_data(self):
        return self.data


class Parser:

    def __init__(self):
        self.recipes = {}
        self.all_ingredients = set()
        self.recipe_path = "../recipes/"
        self.data_path = "../data/"
        self.mongo = mh.MongoHelper()
        self.stashed_mongo = mh.MongoHelper(collection_str="recipe_snapshots")
        #recipe_snapshots

    def json_to_recipe(self, mongo_json_dict):
        rp = Recipe(None, mongo_json_dict["name"], mongo_json_dict[
                    "url"], mongo_json_dict["chef"], mongo_json_dict["ingredients"])
        return rp

    # CHANGE for j in jsons[:20] to only get 20 recipes
    def retrieve_data(self):
        print "Retrieving from Mongo"
	#jsons = self.stashed_mongo.findObj("recipe_stash")
	#if jsons is None or lookup_timedout:
	#    # TODO: Look at local cache
	#elif local_cache is None:
	#    jsons = self.mongo.findAll()
	jsons = self.mongo.findAll()
        for j in jsons:  # [:20]:
            self.recipes[j["name"]] = self.json_to_recipe(j)
        for r_name, r_val in self.recipes.iteritems():
            self.all_ingredients = self.all_ingredients.union(
                r_val.ingredients)


def main():
    p = Parser()
    p.retrieve_data()

if __name__ == "__main__":
    main()
