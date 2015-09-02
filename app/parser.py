from filters import * 
import pymongo as pm
import collections as c
import pickle, os, tempfile, random, logging
from settings import *


Data = c.namedtuple("Data", "url chef ingredients")
"""	Call to the URL will look like... p.recipes['Lemony pork with French beans'].url
	Call to the chef will look like... p.recipes['Lemony pork with French beans'].chef
	Call to the ingredients will look like... p.recipes['Lemony pork with French beans'].ingredients
	"""

# logging.basicConfig(filename = '/log/general.log', level=logging.DEBUG)

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
			# self.ingredients.append(filter_key_ingred(i))
			self.ingredients.append(i)
		self.data = Data(self.url, self.chef, self.ingredients)	

	def get_data(self): 
		return self.data

class parser: 

	# with open(url_for('static', filename='bmidata.txt')) as f:

	def __init__(self): 
		self.recipes = {}
		self.recipe_path = "../recipes/"
		self.data_path = "../data/"

	def picking(self): 
		print "Picking"
		
		num_files = len([f for f in os.listdir(self.recipe_path)if os.path.isfile(os.path.join(self.recipe_path, f))])
		logging.info("Total number of recipes: " + str(num_files))

		if DATA_SET: 

			logging.info("Using dataset of " + str(DATA_SET) + " to convert to graph")

			for i in range(0, DATA_SIZE): 
				file_name = random.choice(os.listdir(self.recipe_path)) 
				r = recipeParse(self.recipe_path + file_name)
				r.parse_ingredients()
				self.recipes[r.name] = r.data
		else: 
			
			logging.info("Using dataset of " + str(num_files) + " to convert to graph")
			self.convert_data()

	def convert_data(self): 
		print "Converting data"
		src = os.path.join(APP_ROOT, 'tmp')
		for i in os.listdir(src):
			if i.endswith(".txt"): 
				temp = src + "/" + i
				r = recipeParse(temp)
				r.parse_ingredients()
				self.recipes[r.name] = r.data

                #should find a cleaner way than creating a client each time...
                #mClient = pm.MongoClient('localhost', 27017)
                #db = mClient['test-database']
                #collection = db['test-collection']
                #post = {r.name: r.data}
                #posts = db.posts
                #post_id = posts.insert_one(post).inserted_id

	def pickle_data(self):
		print "Pickling data"
		with open("../data/recipes.pickle", 'w') as handle:
 			pickle.dump(self.recipes, handle)

 	def unpickle(self): 
 		print "unpickle"
 		self.recipes = pickle.load(open(self.datapth + 'recipes.pickle', "r" ))

def main():
	p = parser()
	p.convert_data()
	p.pickle_data()

if __name__=="__main__": 
	main()
