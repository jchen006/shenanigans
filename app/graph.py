import collections as c
import pickle, os
from settings import *
from parser import *

Data = c.namedtuple("Data", "url chef ingredients")

class Graph: 
    def __init__(self): 
        self.graph = {}

    def add_node(self, data_obj, recipe_name):
        for i in data_obj.ingredients:
            if i not in self.graph:
                self.graph[i] = []
                self.graph[i].append(recipe_name)
            else:
                self.graph[i].append(recipe_name)
        return

    def make_graph_from_pickle(self, filename):
        with open(filename, 'r') as f:
            recipes = pickle.load(f)
        for recipe_name in recipes.keys():
            self.add_node(recipes[recipe_name], recipe_name)
            # NEED TO ADD A LABEL FOR EACH NODE

    def make_graph_from_tuple(self): 
        p = parser()
        p.picking()
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
