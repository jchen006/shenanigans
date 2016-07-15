import collections as c
import pickle, os, itertools, json
import numpy as np
from settings import *
from recipe_parser import *
from ingredient import Ingredient
from collections import defaultdict

#Data = c.namedtuple("Data", "url chef ingredients")

class RadialGraph: 
    def __init__(self): 
        self.graph = {}
        self.d3_json = None
        self.recipes = None
        self.ingred_root = None
        self.PERCENT_INTERSECT_THRESH = 0.3
        self.PERCENT_RECIPE_SIZE = 0.1
        self.MAX_CHILDREN = 10
        self.MAX_NODES = 100

    @property
    def root_recipes(self):
        return self.graph[self.ingred_root].recipes

    def add_node(self, recipe_obj, recipe_name):
        for ingred_name in recipe_obj.ingredients:
            self.insert_ingred_obj(ingred_name, recipe_name)
        return

    def insert_ingred_obj(self, ingred_name, recipe_name):
        if ingred_name not in self.graph:
            new_set = set()
            self.graph[ingred_name] = Ingredient(ingred_name, recipes = new_set)
        ingred_obj = self.graph[ingred_name]
        ingred_obj.recipes.add(recipe_name) # we need to append Recipe ID instead of the name
        return

    ####
    # METHOD TO CONVERT GRAPH INTO d3.json()
    # nodes: [] // Ingredients are nodes
    # links: [] // Ingredients are connected if they share recipes
    #           // The link 'strength' is the count of the number of recipes two ingredients share
    ####
    def make_d3_graph_json(self, root, K_ = 3, level_of_tree = 3):
        self.ingred_root = root
        if root not in self.graph:
            return "NOT A VALID ROOT!!"
        graph_d3_json = {}
        graph_d3_json["nodes"] = []
        graph_d3_json["links"] = []

        temp_node_to_idx = defaultdict(int)

        temp_links_dict = defaultdict(int)
        
        temp_root_ing_val = self.graph[self.ingred_root]
        nodes_to_eval = []
        next_nodes_to_eval = []
        nodes_to_eval.append(temp_root_ing_val)
        graph_d3_json["nodes"].append({"name":temp_root_ing_val.name, "count":0})
        temp_node_to_idx[temp_root_ing_val.name] = len(graph_d3_json["nodes"]) - 1

        overlaps_list = []
        visited_nodes_set = set()
        while(level_of_tree != 0):
            while(len(nodes_to_eval) != 0):
                temp_root_value = nodes_to_eval.pop()
                overlaps = self.find_children_of_root(temp_root_value, visited_nodes_set, K=K_)

                source_idx = temp_node_to_idx[temp_root_value.name]
                for ing_value, overlap_score in overlaps:
                    
                    # TODO: overlaps doesn't return what we want! we need an ingredient object
                    graph_d3_json["nodes"].append({"name":ing_value.name, "count":0})
                    temp_node_to_idx[ing_value.name] = len(graph_d3_json["nodes"]) - 1

                    target_idx = temp_node_to_idx[ing_value.name]
                    graph_d3_json["links"].append({"source":source_idx, "target":target_idx, "value":overlap_score})
                overlaps_list.append(overlaps)

            lists_len = len(overlaps_list)
            for i in xrange(lists_len):
                overlaps = overlaps_list.pop()
                for ing_value, overlap_score in overlaps:
                    nodes_to_eval.append(ing_value)

            K_ = max(K_ / 2, 1)
            level_of_tree -= 1

        return json.dumps(graph_d3_json)

    def find_children_of_root(self, temp_root_ing_val, visited_set, INTERSECT_THRESH=0.4, K=5):

        # do distance to root
        overlaps = defaultdict(tuple)
        for ing_name, ing_value in self.graph.items():
            if(ing_name != "" and ing_name is not None and ing_name != temp_root_ing_val.name and ing_name not in visited_set):

                intersect_percent = self.threshold_intersect_recipe_sets(temp_root_ing_val.recipes, ing_value.recipes)
                if intersect_percent > INTERSECT_THRESH:
                    overlaps[ing_name] = (ing_value, intersect_percent)

        x = sorted(overlaps.items(), key=lambda x: x[1][1]) # [1] gets the value, [0] gets the element in the array with 1 value, [1] gets the intersect_percent
        x = [tup for name, tup in x]
        for ing_val, intersect_percent in x:
            visited_set.add(ing_val.name)

        if len(x) < K:
            return x

        return x[-K:]

    def get_ingredient_common_score(self, ing1, ing2):
        intersect_percent = self.percent_intersect_recipe_sets((ing1.recipes, ing2.recipes))
        return intersect_percent

    def get_d3_json(self):
        if self.d3_json is not None:
            return json.dumps(self.d3_json)
        else:
            return ""
    
    #TODO: 
    # harmonic mean - somehow penalize the small set being too small
    def harmonic_intersect_recipe_sets(self, root_recipe_set, ing_recipe_set):
        len_root_recipe_set = len(root_recipe_set)
        len_ing_recipe_set = len(ing_recipe_set)
        len_intersect = len(self.intersect_recipe_sets([root_recipe_set, ing_recipe_set]))

        intersect_over_root = (1.0*len_intersect)/(1.0*len_root_recipe_set)
        intersect_over_ing = (1.0*len_intersect)/(1.0*len_ing_recipe_set)

        if (intersect_over_root + intersect_over_ing) == 0:
            return 0.0
        harmonic_percent_overlap = ((2.0*intersect_over_root*intersect_over_ing) / (intersect_over_root + intersect_over_ing))
        return harmonic_percent_overlap

    def threshold_intersect_recipe_sets(self, root_recipe_set, ing_recipe_set):
        max_len = max(len(root_recipe_set), len(ing_recipe_set))
        min_len = min(len(root_recipe_set), len(ing_recipe_set))
        len_intersect = len(self.intersect_recipe_sets([root_recipe_set, ing_recipe_set]))
            
        if min_len < self.PERCENT_RECIPE_SIZE * (1.0*max_len):
            return 0.0
            
        return (1.0*len_intersect)/(1.0*min_len)

    def percent_intersect_recipe_sets(self, root_recipe_set, ing_recipe_set):
        len_smallest_recipe_set = min(len(root_recipe_set), len(ing_recipe_set))
        len_intersect = len(self.intersect_recipe_sets([root_recipe_set, ing_recipe_set]))
        return (1.0*len_intersect)/(1.0*len_smallest_recipe_set)

    def intersect_recipe_sets(self, recipe_ing_sets):
        return set.intersection(*recipe_ing_sets)

    def init_graph_from_mongo(self): 
        p = Parser()
        p.retrieve_data()
        self.recipes = p.recipes
        self.ingredients = p.all_ingredients
        for recipe_name in self.recipes.keys(): 
            self.add_node(self.recipes[recipe_name], recipe_name)
        return
    
    def get_ingredients(self):
        return self.graph.keys()

    def to_json(self):
        return str(self)

if __name__=='__main__':
    g = RadialGraph()
    g.init_graph_from_mongo()
    g.make_d3_graph_json('carrot')
    # g.make_graph_from_tuple()
