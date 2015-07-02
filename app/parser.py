from filters import * 
import collections as c
import pickle, os, random
from settings import *


Data = c.namedtuple("Data", "url chef ingredients")
"""	Call to the URL will look like... p.recipes['Lemony pork with French beans'].url
	Call to the chef will look like... p.recipes['Lemony pork with French beans'].chef
	Call to the ingredients will look like... p.recipes['Lemony pork with French beans'].ingredients
	"""

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

	def generate_path(self, directory):
		def get_parent_dir(directory):
			return os.path.dirname(directory)
		file_path = get_parent_dir(os.getcwd()) + "/" + directory + "/"
		return file_path

	def picking(self): 
		print "Picking"
		path = self.generate_path("recipes")
		if DATA_SET: 
			print "Using a test set with size of " + str(DATA_SIZE)
			for i in range(0, DATA_SIZE): 
				file_name = random.choice(os.listdir(path)) 
				print path
				r = recipeParse(path + file_name)
				r.parse_ingredients()
				self.recipes[r.name] = r.data
		else: 
			for i in os.listdir(path):
				if i.endswith(".txt"): 
					r = recipeParse(path + i)
					r.parse_ingredients()
					self.recipes[r.name] = r.data

	def pickle(self):
		self.picking()
		print "pickling"
		with open(self.generate_path("data") + 'recipes.pickle', 'w') as handle:
 			pickle.dump(self.recipes, handle)

 	def unpickle(self): 
 		print "unpickle"
 		self.recipes = pickle.load(open(self.generate_path("data") + 'recipes.pickle', "r" ))

def main():

	p = parser()
	p.pickle()

	# p.unpickle()

if __name__=="__main__": 
	main()
