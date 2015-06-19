import collections as c
import pickle, os

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
    # ing1, ing2, ing3 = g.ingredients()[1], g.ingredients()[2], g.ingredients()[3]
    # ing4, ing5, ing6 = g.ingredients()[4], g.ingredients()[5], g.ingredients()[6]
    # ing7, ing8, ing9 = g.ingredients()[7], g.ingredients()[8], g.ingredients()[9]

    SET_SIZE = 20

    for i in range(SET_SIZE): 
        ing = g.ingredients()[i]
        print "Key: ",ing,"Value: ",g.graph[ing]
    # print "Key: ",ing2,"Value: ",g.graph[ing2]
    # print "Key: ",ing3,"Value: ",g.graph[ing3]
    # print "Key: ",ing4,"Value: ",g.graph[ing4]
    # print "Key: ",ing5,"Value: ",g.graph[ing5]
    # print "Key: ",ing6,"Value: ",g.graph[ing6]
    # print "Key: ",ing7,"Value: ",g.graph[ing7]
    # print "Key: ",ing8,"Value: ",g.graph[ing8]
    # print "Key: ",ing9,"Value: ",g.graph[ing9]



if __name__=='__main__':
    main_test()
