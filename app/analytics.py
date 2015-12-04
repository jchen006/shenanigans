import collections as c
import pickle, os, itertools, json
from settings import *
from recipe_parser import *
from ingredient import *
import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.decomposition import PCA
from lda import LDA
from sklearn.neighbors import NearestNeighbors

#Data = c.namedtuple("Data", "url chef ingredients")

class BagOfIngredients: 
    def __init__(self): 
        self.bag = {}
        self.ordered_ingrediends = None
        self.ordered_recipes = None
        self.recipe_vects = None

    def generate_bag_of_ingredients(self):
        p = Parser()
        p.retrieve_data()
        recipes = p.recipes
        all_ingreds = p.all_ingredients
        for ing in all_ingreds:
            self.bag[ing] = 0
            
        for recipe_name, recipe_value in recipes.iteritems():
            for ing in recipe_value.ingredients:
                self.bag[ing] += 1
        
        self.ordered_recipes = sorted(recipes.values(), key=lambda x: x.name)
        self.ordered_ingredients = self.bag.keys()
        self.ordered_ingredients.sort()
        return

    def generate_recipe_vectors(self):
        # TODO: RECIPES ALSO NEEDS TO BE ORDERED SINCE recipes.values() returns in random order
        self.recipe_vects = np.zeros((len(self.ordered_recipes), len(self.ordered_ingredients)))

        for i in range(len(self.ordered_recipes)):
            for j in range(len(self.ordered_ingredients)):
                if self.ordered_ingredients[j] in self.ordered_recipes[i].ingredients:
                    self.recipe_vects[i,j] = 1
        return

    def get_ingredient_frequencies(self):
        return np.sum(self.recipe_vects, axis=0)

    def get_top_N_ingredient_frequencies(self, N):
        freqs = self.get_ingredient_frequencies()
        top_N_indices = freqs.argsort()[-N:][::-1]
        top_ingreds = np.array(self.ordered_ingredients)[top_N_indices]
        top_freqs = freqs[top_N_indices]
        return top_ingreds.tolist(), top_freqs.tolist()

    def get_top_N_ingredients_json(self, N):
        top_ingreds, top_freqs = self.get_top_N_ingredient_frequencies(N)
        js = [{"ingredient": x, "frequency": y} for x, y in zip(top_ingreds, top_freqs)]
        return json.dumps(js)

def PCAModel(bag_of_ingredients_matrix, K=2):
    pca = PCA(K)
    X = pca.fit_transform(bag_of_ingredients_matrix)
    return X
    

def LDAModel(bag_of_ingredients_matrix, ingredient_mapping, K=10):
    model = LDA(K) 
    model.fit(bag_of_ingredients_matrix.astype('int64'))
    for i, topic_dist in enumerate(model.topic_word_):
    	topic_words = np.array(ingredient_mapping)[np.argsort(topic_dist)][:-(K+1):-1]
	
    doc_topic = model.doc_topic_
    return doc_topic

def NearestNeighborsModel(bag_of_ingredients_matrix):
    nbrs = NearestNeighbors()
    nbrs.fit(bag_of_ingredients_matrix)
    return nbrs




if __name__=='__main__':
    b = BagOfIngredients()
    b.generate_bag_of_ingredients()
    b.generate_recipe_vectors()
    top_ingreds, top_freqs = b.get_top_N_ingredient_frequencies(20)
    X = b.recipe_vects
    pca_x = PCAModel(X)
    lda_x_doc_topic = LDAModel(X, b.ordered_ingredients)
    nearest_neighbors_x = NearestNeighborsModel(X)
    import pdb; pdb.set_trace()
    # g.make_graph_from_tuple()
