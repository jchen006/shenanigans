import collections as c
import pickle, os
from settings import *
from parser import *
from ingredient import *

Data = c.namedtuple("Data", "url chef ingredients")

class Graph: 
    def __init__(self): 
        self.graph = {}

    def add_node(self, recipe_obj, recipe_name):
        for ingred_name in recipe_obj.ingredients:
            import pdb; pdb.set_trace()
            if ingred_name not in self.graph:
                self.graph[ingred_name] = Ingredient(ingred_name)
            ingred_obj = self.graph[ingred_name]
            ingred_obj.recipes.append(recipe_name)
        return

    def make_graph_from_mongo(self): 
        p = Parser()
        p.retrieve_data()
        recipes = p.recipes
        for recipe_name in recipes.keys(): 
            self.add_node(recipes[recipe_name], recipe_name)
    
    def get_ingredients(self):
        return self.graph.keys()

def main_test():
    g = Graph()
    g.make_graph_from_pickle("../data/recipes.pickle")
    # g.make_graph_from_tuple()
    ingredients = []

    SET_SIZE = 75
    DEFAULT = len(g.ingredients())

    for i in range(DEFAULT): 
        ing = g.ingredients()[i]
        ingredients.append(ing)
        print "Key " + str(i) + ": ",ing
        #print "Value ", g.graph[ing#]
    return ingredients

if __name__=='__main__':
    main_test()
