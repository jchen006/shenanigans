from filters import * 
import collections as c
<<<<<<< HEAD
import pickle, os, random
=======
import pickle, os, tempfile
>>>>>>> BA_scraper
from settings import *


@@ -28,36 +32,29 @@ class recipeParse:
			self.ingredients.append(filter_key_ingred(i))
		self.data = Data(self.url, self.chef, self.ingredients)	

	def get_data(self): 
		return self.data

class parser: 

	# with open(url_for('static', filename='bmidata.txt')) as f:

	def __init__(self): 
		self.recipes = {}

	def generate_path(self, directory):
		def get_parent_dir(directory):
			return os.path.dirname(directory)
		file_path = get_parent_dir(os.getcwd()) + "/" + directory + "/"
		return file_path

	def pickle(self): 
		print "Picking and pickling"
		path = self.generate_path("recipes")
		if DATA_SET is "TEST": 
			print "Using a test set with size of " + str(DATA_SIZE)
			for i in range(0, DATA_SIZE): 
				file_name = random.choice(os.listdir(path)) 
				print path
				r = recipeParse(path + file_name)
	def convert_data(self): 
		print "Converting data"
		src = os.path.join(APP_ROOT, 'tmp')
		for i in os.listdir(src):
			if i.endswith(".txt"): 
				temp = src + "/" + i
				r = recipeParse(temp)
				r.parse_ingredients()
				self.recipes[r.name] = r.data
		else: 
			for i in os.listdir(path):
				if i.endswith(".txt"): 
					r = recipeParse(path + i)
					r.parse_ingredients()
					self.recipes[r.name] = r.data

		with open(self.generate_path("data") + 'recipes.pickle', 'w') as handle:
	def pickle_data(self):
		print "Pickling data"
		with open("../data/recipes.pickle", 'w') as handle:
 			pickle.dump(self.recipes, handle)

 	def unpickle(self): 
@@ -66,11 +63,8 @@ class parser:

def main(): 
	p = parser()
	p.pickle()
	# p.unpickle()
	# print p.recipes['Lemony pork with French beans'].url
	# print p.recipes['Lemony pork with French beans'].chef
	# print p.recipes['Lemony pork with French beans'].ingredients
	p.convert_data()
	p.pickle_data()

if __name__=="__main__": 
	main()
