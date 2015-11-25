import collections as c
import pickle, os, itertools, json
from settings import *
from recipe_parser import *
from ingredient import *
import numpy as np

#Data = c.namedtuple("Data", "url chef ingredients")

class BagOfIngredients: 
    def __init__(self): 
        self.bag = {}
        self.recipes = None
        self.ordered_ingrediends = None
        self.ordered_recipes = None
        self.recipe_vects = None

    def generate_bag_of_ingredients(self):
        p = Parser()
        p.retrieve_data()
        self.recipes = p.recipes
        all_ingreds = p.all_ingredients
        for ing in all_ingreds:
            self.bag[ing] = 0
            
        for recipe_name, recipe_value in self.recipes.iteritems():
            for ing in recipe_value.ingredients:
                self.bag[ing] += 1
        
        # TODO: ORDER THE RECIPES
        self.ordered_recipes = sorted(self.recipes.values(), lambda x: x.name)
        self.ordered_ingredients = self.bag.keys()
        self.ordered_ingredients.sort()
        return

    def generate_recipe_vectors(self):
        # TODO: RECIPES ALSO NEEDS TO BE ORDERED SINCE recipes.values() returns in random order
        self.recipe_vects = np.zeros((len(self.recipes), len(self.ordered_ingredients)))

        recipes = self.recipes.values()
        for i in range(len(recipes)):
            for j in range(len(self.ordered_ingredients)):
                if self.ordered_ingredients[j] in recipes[i].ingredients:
                    self.recipe_vects[i,j] = 1
        return


if __name__=='__main__':
    b = BagOfIngredients()
    b.generate_bag_of_ingredients()
    b.generate_recipe_vectors()
    import pdb; pdb.set_trace()
    # g.make_graph_from_tuple()
