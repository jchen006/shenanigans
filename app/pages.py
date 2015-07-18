"""recipePage is to generate the methods that will be needed to convert
a recipe into an actual page. It will take a text file and convert the 
text file into a page for recipes""" 
from parser import *

class Page: 

	def __init__(self): 
		self.recipe_list = []
		self.ingredient_list = []

	"""Takes the file name converts it to a file name 
	File name will have everything that it needs to have"""

	def create_recipe_page(self): 
		"""Takes the directory and grabs all of the recipes"""
		p = parser()
		p.convert_data()
		return p.recipes.keys()

	def create_ingredient_list(self): 
		"""Takes the graph and generates the ingredient list"""
		pass

if __name__ == "__main__": 
	r = recipePage()
