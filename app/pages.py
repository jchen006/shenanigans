"""recipePage is to generate the methods that will be needed to convert
a recipe into an actual page. It will take a text file and convert the 
text file into a page for recipes""" 
from parser import *

class Page: 


	def __init__(self): 
		pass
		
	def capitalize_keys(): 
		"""Updates the keys to capitalized"""
		pass 

	def create_titles_page(): 
		"""Returns the titles of the recipes sorted"""
		pass

	def create_recipe_page(self, recipe): 
		"""Returns all the needed fields for the recipe including
		title, url, chef, and the ingredients"""
		pass

	def create_recipe_url(self, recipe): 
		return recipe.replace(" ", "_")

	def revert_recipe_url(self, url): 
		return url.replace("_", " ")
		
if __name__ == "__main__": 
	p = Page()
	# print p.recipe_list
	print p.create_recipe_url("Winter Vegetable Colcannon")
	print p.revert_recipe_url("Winter_Vegetable_Colcannon")
