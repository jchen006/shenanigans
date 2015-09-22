"""recipePage is to generate the methods that will be needed to convert
a recipe into an actual page. It will take a text file and convert the 
text file into a page for recipes""" 
from parser import *

class recipePage: 

	def __init__(self): 
		self.recipe_file = []

	"""Takes the file name converts it to a file name 
	File name will have everything that it needs to have"""

	def generate_list(self): 
		"""Takes the directory and grabs all of the recipes"""
		p = parser()
		p.retrieve_data()
		return p.recipes.keys()

if __name__ == "__main__": 
	r = recipePage()
	print r.generate_list()
