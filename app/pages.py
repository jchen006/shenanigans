"""recipePage is to generate the methods that will be needed to convert
a recipe into an actual page. It will take a text file and convert the 
text file into a page for recipes""" 
from recipe_parser import *

class Page: 


	def __init__(self): 
		self.p = Parser()
		self.p.retrieve_data()
		self.recipes = self.capitalize_keys(self.p.recipes)
		
	def capitalize_keys(self, dict): 
		"""Updates the keys to capitalized"""
		for k,v in dict.iteritems():
			new_key = k.title()
			dict[new_key] = dict.pop(k)
		return dict

	def create_titles_page(self): 
		"""Returns the titles of the recipes sorted"""
		capitalized = self.capitalize_keys(self.recipes)
		cap_keys = capitalized.keys()
		cap_keys.sort()
		return cap_keys
		
	def create_recipe_page(self, url): 
		"""Returns all the needed fields for the recipe including
		title, url, chef, and the ingredients"""
		recipe_title = self.revert_recipe_url(url)
		recipe_data = self.recipes[recipe_title]
		recipe_url = recipe_data.url
		recipe_chef = recipe_data.chef
		recipe_ingredients = recipe_data.ingredients
		return recipe_title, recipe_url, recipe_chef, recipe_ingredients

	def create_recipe_url(self, recipe): 
		return recipe.replace(" ", "_")

	def revert_recipe_url(self, url): 
		return url.replace("_", " ")
		
if __name__ == "__main__": 
	p = Page()
	# print p.recipe_list
	# print p.create_recipe_url("Winter Vegetable Colcannon")
	# print p.revert_recipe_url("Winter_Vegetable_Colcannon")
	# print p.create_titles_page()
	print p.create_recipe_page("Winter Vegetable Colcannon")
