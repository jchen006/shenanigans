import collections as c
import pickle
import os
import itertools
import json
import numpy as np
from settings import *
from recipe_parser import *
from ingredient import *

#Data = c.namedtuple("Data", "url chef ingredients")


class Graph:

    def __init__(self, parser_obj):
        self.graph = {}
        self.d3_json = None
        self.recipes = None
        self.parser = parser_obj

    def add_node(self, recipe_obj, recipe_name):
        for ingred_name in recipe_obj.ingredients:
            self.insert_ingred_obj(ingred_name, recipe_name)
        return

    def insert_ingred_obj(self, ingred_name, recipe_name):
        if ingred_name not in self.graph:
            new_list = []
            self.graph[ingred_name] = Ingredient(ingred_name, recipes=new_list)
        ingred_obj = self.graph[ingred_name]
        # we need to append Recipe ID instead of the name
        ingred_obj.recipes.append(recipe_name)
        return

    ####
    # METHOD TO CONVERT GRAPH INTO d3.json()
    # nodes: [] // Ingredients are nodes
    # links: [] // Ingredients are connected if they share recipes
    #           // The link 'strength' is the count of the number of recipes two ingredients share
    ####
    def make_d3(self):
        graph_d3_json = {}
        graph_d3_json["nodes"] = []
        graph_d3_json["links"] = []

        temp_node_to_idx = {}

        temp_links_dict = {}

        # NODES WITH NO LINKS ARE DUE TO LISTS
        for ing_name, ing_value in self.graph.items():
            if(ing_value.name != "" and ing_value.name is not None):
                graph_d3_json["nodes"].append(
                    {"name": ing_value.name, "count": 0})
                temp_node_to_idx[ing_value.name] = len(
                    graph_d3_json["nodes"]) - 1

        # CHANGE recipe_parser.py's retrieve_data() method to get fewer results
        # TODO: we have duplicate links! need to fix
        if self.recipes is not None:
            for recipe_name, recipe_value in self.recipes.items():
                ingreds_in_recipe = recipe_value.ingredients
                for ingred1, ingred2 in list(itertools.combinations(ingreds_in_recipe, 2)):
                    if(ingred1 != "" and ingred2 != "" and ingred1 is not None and ingred2 is not None):

                        idx1 = temp_node_to_idx[ingred1]
                        idx2 = temp_node_to_idx[ingred2]

                        if (idx1 in temp_links_dict) and (temp_links_dict[idx1] == idx2):
                            continue
                        elif idx1 != idx2:
                            temp_links_dict[idx1] = idx2
                            graph_d3_json["links"].append(
                                {"source": idx1, "target": idx2, "value": 1})
                            continue

        self.d3_json = graph_d3_json
        return

    def get_d3_json(self):
        if self.d3_json is not None:
            return json.dumps(self.d3_json)
        else:
            return ""

    # TODO:
    # args for intersection radial graph
    # maxThresh: the percentage overlap required to be in connection with a node
    # minThresh: the minimum percentage overlap required to be in the graph at all
    # k: number of nodes (children? each with 2 children max or something)

    def percent_intersect_recipe_sets(self, recipe_ing_sets):
        smallest_set_idx = np.argmin([len(x) for x in recipe_ing_sets])
        len_smallest_recipe_set = len(recipe_ing_sets[smallest_set_idx])
        return (1.0 * len(self.intersect_recipe_sets(recipe_ing_sets))) / (1.0 * len_smallest_recipe_set)

    def intersect_recipe_sets(self, recipe_ing_sets):
        return set.intersection(*recipe_ing_sets)

    # Returns a List of source,dest tuples where Source and Dest are
    # Ingredient ID's
    def find_d3_links(self):
        pass

    def find_common_recipe(self, ingred1, ingred2):
        pass

    def make_graph_from_mongo(self):
        self.recipes = self.parser.recipes
        self.ingredients = self.parser.all_ingredients
        for recipe_name in self.recipes.keys():
            self.add_node(self.recipes[recipe_name], recipe_name)
        return

    def get_ingredients(self):
        return self.graph.keys()

    def to_json(self):
        return str(self)

if __name__ == '__main__':
    g = Graph()
    g.make_graph_from_mongo()
    g.make_d3()
    # g.make_graph_from_tuple()
