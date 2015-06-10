import collections as c
import pickle, os

Data = c.namedtuple("Data", "url chef ingredients")

class Graph: 
    def __init__(self): 
        self.graph = {}

    def add_node(self, data_obj, recipe_name):
        for i in data_obj.ingredients:
            if i not in self.graph:
                self.graph[i] = set()
            else:
                self.graph[i].add(recipe_name)
        return

    def make_graph_from_pickle(self, filename):
        with open(filename, 'r') as f:
            recipes = pickle.load(f)
        for data_obj in [recipes[recipe_name] for recipe_name in recipes.keys()]:
            self.add_node(data_obj, recipe_name)
        return 


def main_test():
    g = Graph()
    g.make_graph_from_pickle("../data/recipes.pickle")
    print "Graph dictionary: ", g.graph

if __name__=='__main__':
    main_test()
