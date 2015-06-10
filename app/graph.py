import collections as c
import pickle, os

Data = c.namedtuple("Data", "name url chef ingredients")

class Graph: 

	def __init__(self): 
		self.graph = {}
        self.num_nodes = 0

    def add_node(self, data_obj):
        for i in data_obj.ingredients:
            if self.graph[i] is None:
                self.graph[i] = []
            else:
                self.graph[i].append(data_obj.name)
        pass

	def make_graph_from_pickle(self, filename):
        with open(filename, 'r') as f:
            recipes = pickle.load(f)
        for d in [recipes[k] for k in recipes.keys()]:
            add_node(d)
        return 



