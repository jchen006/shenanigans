import collections as c
import pickle, os
from settings import *
from recipe_parser import *
from ingredient import *

#Data = c.namedtuple("Data", "url chef ingredients")

class Graph: 
    def __init__(self): 
        self.graph = {}

    def add_node(self, recipe_obj, recipe_name):
        for ingred_name in recipe_obj.ingredients:
            if type(ingred_name) is list:
                for in_name_sub in ingred_name:
                    self.insert_ingred_obj(in_name_sub, recipe_name)
            else:
                self.insert_ingred_obj(ingred_name, recipe_name)
        return

    def insert_ingred_obj(self, ingred_name, recipe_name):
        if ingred_name not in self.graph:
            new_list = []
            self.graph[ingred_name] = Ingredient(ingred_name, recipes = new_list)
        ingred_obj = self.graph[ingred_name]
        ingred_obj.recipes.append(recipe_name)
        return

    def make_graph_from_mongo(self): 
        p = Parser()
        p.retrieve_data()
        recipes = p.recipes
        for recipe_name in recipes.keys(): 
            self.add_node(recipes[recipe_name], recipe_name)
        return
    
    def get_ingredients(self):
        return self.graph.keys()

    def to_json(self):
        return str(self)

if __name__=='__main__':
    g = Graph()
    g.make_graph_from_mongo()
    # g.make_graph_from_tuple()
