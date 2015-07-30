from filterLibrary import * 
import collections as c
import pickle, os, tempfile
from settings import *

Data = c.namedtuple("Data", "url chef ingredients")

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
			self.ingredients.append(filter_ingred(i))
		self.data = Data(self.url, self.chef, self.ingredients)	

	def get_data(self): 
		return self.data

class parser: 

	# with open(url_for('static', filename='bmidata.txt')) as f:

	def __init__(self): 
		self.recipes = {}

	def convert_data(self): 
		print "Converting data"
		src = os.path.join(APP_ROOT, 'tmp')
		for i in os.listdir(src):
			if i.endswith(".txt"): 
				temp = src + "/" + i
				r = recipeParse(temp)
				r.parse_ingredients()
				self.recipes[r.name] = r.data

	def pickle_data(self):
		print "Pickling data"
		with open("../data/recipes.pickle", 'w') as handle:
 			pickle.dump(self.recipes, handle)

def main(): 
	p = parser()
	p.convert_data()
	p.pickle_data()

if __name__=="__main__": 
	main()