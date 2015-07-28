"""recipePage is to generate the methods that will be needed to convert
a recipe into an actual page. It will take a text file and convert the 
text file into a page for recipes""" 
from parser import *

class Page: 

	def __init__(self): 
		self.recipe_list = self.create_recipe_page()
		self.ingredient_list = []

	"""Takes the file name converts it to a file name 
	File name will have everything that it needs to have"""

	def create_recipe_page(self): 
		"""Takes the directory and grabs all of the recipes"""
		p = parser()
		p.convert_data()
		recipes = p.recipes.keys()
		recipes = self.capitalize(recipes)
		recipes.sort()
		return recipes

	def capitalize(self, recipes):
		"""Capitalizes everything in recipes"""
		cap_recipes = []
		for r in recipes: 
			cap_recipes.append(r.title())
		return cap_recipes

	def create_individual_page(self): 
		"""Creates an individual page based on the recipe
		based on the information that is converted"""
		pass 

	def general_recipe_url(self): 
		"""Creates takes in a URL and convert it to a html
		for instance apple pie becomes /apple_pie.html"""
		pass

if __name__ == "__main__": 
	p = Page()
	print p.recipe_list
