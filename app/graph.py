import collections as c
import pickle, os

Data = c.namedtuple("Data", "name url chef ingredients")

class Graph: 
    def __init__(self): 
        self.graph = {}

    def add_node(self, data_obj):
        for i in data_obj.ingredients:
            if self.graph[i] is None:
                self.graph[i] = []
            else:
                self.graph[i].append(data_obj.name)
        return

    def make_graph_from_pickle(self, filename):
        with open(filename, 'r') as f:
            recipes = pickle.load(f)
        for d in [recipes[k] for k in recipes.keys()]:
            import pdb; pdb.set_trace()
            self.add_node(d)
        return 


def main_test():
    g = Graph()
    g.make_graph_from_pickle("../data/recipes.pickle")
    print "Graph dictionary: ", g.graph

if __name__=='__main__':
    main_test()
