from filters import * 
import collections as c
import pickle, os, random, logging
from settings import *


Data = c.namedtuple("Data", "url chef ingredients")
"""	Call to the URL will look like... p.recipes['Lemony pork with French beans'].url
	Call to the chef will look like... p.recipes['Lemony pork with French beans'].chef
	Call to the ingredients will look like... p.recipes['Lemony pork with French beans'].ingredients
	"""

logging.basicConfig(filename='../log/general.log', level=logging.DEBUG)

class recipeParse: 

	def __init__(self, file_path): 
		self.file_path = file_path
		self.ingredients = []

	def parse_ingredients(self): 
		temp = []
		with open(self.file_path,'r') as recipe:       
			for r in recipe:
				temp.append(r.strip())
		cut = temp.index("Instructions")
		temp = temp[:cut]
		temp.remove("Ingredients")
		self.name = temp.pop(0)
		self.url = temp.pop(0)
		self.chef = temp.pop(0)	
		for i in temp: 
			#Where filters happen
			self.ingredients.append(filter_key_ingred(i))
		self.data = Data(self.url, self.chef, self.ingredients)	

class parser: 

	def __init__(self): 
		self.recipes = {}

	def picking(self): 
		print "Picking"
		recipe_path = "../recipes/"
		data_path = "../data/"
		
		num_files = len([f for f in os.listdir(recipe_path)if os.path.isfile(os.path.join(recipe_path, f))])
		logging.info("Total number of recipes: " + str(num_files))

		if DATA_SET: 
			logging.info("Using dataset of " + str(DATA_SET) + " to convert to graph")
			for i in range(0, DATA_SIZE): 
				file_name = random.choice(os.listdir(recipe_path)) 
				r = recipeParse(path + file_name)
				r.parse_ingredients()
				self.recipes[r.name] = r.data
		else: 
			logging.info("Using dataset of " + str(num_files) + " to convert to graph")
			for i in os.listdir(recipe_path):
				if i.endswith(".txt"): 
					r = recipeParse(recipe_path + i)
					r.parse_ingredients()
					self.recipes[r.name] = r.data

	def pickle(self):
		self.picking()
		print "pickling"
		with open(data_path + 'recipes.pickle', 'w') as handle:
 			pickle.dump(self.recipes, handle)

 	def unpickle(self): 
 		print "unpickle"
 		self.recipes = pickle.load(open(datapth + 'recipes.pickle', "r" ))

def main():

	p = parser()
	p.pickle()

	# p.unpickle()

if __name__=="__main__": 
	main()
