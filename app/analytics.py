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

class PCAModel:
    def __init__(self, bag_of_ingredients_matrix, K=2):
        self.model = PCA(K)
        self.BOI = bag_of_ingredients_matrix
        self.fit_data = self.model.fit_transform(self.BOI)

class LDAModel:
    def __init__(self, bag_of_ingredients_matrix, ingredients, recipes, K=10):
        self.model = LDA(K) 
        self.BOI = bag_of_ingredients_matrix
        self.ingredients = ingredients
        self.recipes = recipes
        self.model.fit(self.BOI.astype('int64'))
        
        self.doc_topic = self.model.doc_topic_
        self.topic_assignments = self.doc_topic.argmax(axis=1)
        self.clustered_recipes = {}
        for i in range(K):
            self.clustered_recipes[i] = []

        for i in range(len(self.topic_assignments)):
            self.clustered_recipes[self.topic_assignments[i]].append(self.recipes[i].name)
	
	self.d3_json = self.get_d3_json()

    def get_K_topic_words(self, K):
        topic_words_arr = []
        for i, topic_dist in enumerate(self.model.topic_word_):
            topic_words = np.array(self.ingredients)[np.argsort(topic_dist)][:-(K+1):-1]
            topic_words_arr.append(topic_words)
        return np.array(topic_words_arr)

    def get_d3_json(self):
    	temp_json = {}
	temp_json["name"] = "LDA"
	temp_json["children"] = []
	json_clusters = temp_json["children"]
	for i in range(len(self.clustered_recipes)):
	    cluster = self.clustered_recipes[i]
	    temp_cluster_json = {}
	    temp_cluster_json["name"] = "Cluster " + str(i)
	    temp_cluster_json["children"] = []
	    children = temp_cluster_json["children"]
	    for r in cluster:
	    	children.append({"name": r,"size":1})
	    
	    json_clusters.append(temp_cluster_json)
	
	return json.dumps(temp_json)

    def get_ordered_recipes_json(self):
    	temp_json = {}
	temp_json["ordered_recipes"] = self.recipes
	return json.dumps(temp_json)

    def get_radar_json(self, rec_idx1, rec_idx2):
    	vec1, vec2 = self.doc_topic[rec_idx1], self.doc_topic[rec_idx2]
	temp_json = {}
	temp_json["dists"] = []

	for rec_i in [rec_idx1, rec_idx2]:
	   temp_list = []
           vec = self.doc_topic[rec_i]
	   for j in range(len(vec)):
	       temp_list.append({"axis":"cluster " + str(j), "value": "{0:.5f}".format(vec[j]) })
           temp_json["dists"].append(temp_list)

        return json.dumps(temp_json)

class NearestNeighborsModel:
    def __init__(self, bag_of_ingredients_matrix):
        self.model = NearestNeighbors()
        self.BOI = bag_of_ingredients_matrix
        self.model.fit(bag_of_ingredients_matrix)

if __name__=='__main__':
    b = BagOfIngredients()
    b.generate_bag_of_ingredients()
    b.generate_recipe_vectors()
    top_ingreds, top_freqs = b.get_top_N_ingredient_frequencies(20)
    X = b.recipe_vects
    P = PCAModel(X)
    L = LDAModel(X, b.ordered_ingredients, b.ordered_recipes, K=2)
    NN = NearestNeighborsModel(X)
    clusters = L.clustered_recipes
    lda_json = L.d3_json
    import pdb; pdb.set_trace()
    # g.make_graph_from_tuple()
