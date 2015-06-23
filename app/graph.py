import collections as c
import pickle, os
from environment import *

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
        return 
    
    def ingredients(self):
        return self.graph.keys()


def main_test():
    g = Graph()
    g.make_graph_from_pickle("../data/recipes.pickle")
    for i in range(0, NODE_PRINT): 
        ing = g.ingredients()[i]
        print "Key " + str(i) + ":" ,ing,"Value: ",g.graph[ing]

if __name__=='__main__':
    main_test()
