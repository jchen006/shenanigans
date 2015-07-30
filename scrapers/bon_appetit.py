from bs4 import BeautifulSoup 
import csv, requests, re, urllib2, os, time

# categories = ['holiday-recipes', 'quick-recipes', 'family-meals', 'healthy', 'desserts', 'chicken']
# 	pages = {'quick-recipes': 53, 
# 		}
from recipeGenerator import Recipe_Generator

class bon_appetit: 

	
	base_address = "http://www.bonappetit.com/recipes/"

	def __init__(self, category): 
		self.category = category
		self.recipes = []

	def scrape_category(self, category): 
		#h3 class = result-title 
		#scrape all the ahref 
		pass

class bon_appetit_recipe:

	def __init__(self, url): 
		self.url = url 
		self.recipe_ingred = []
		self.recipe_instruct = []
		self.ingred_list = {}
		self.generator = Recipe_Generator()

	def do_all(self): 
		self.scrape_title()
		self.scrape_chef()
		self.scrape_ingredients()
		self.scrape_instructions()
		self.generator.write_to_text(self.title, self.url, self.recipe_ingred, self.recipe_instruct)

	def scrape_title(self): 
		r= requests.get(self.url)
		data = r.text 
		soup = BeautifulSoup(data)

		name = soup.findAll("h3", attrs={"class":"recipe-title hidden-xs"})
		self.title = name[0].text

	def scrape_chef(self): 
		r = requests.get(self.url)
		data = r.text
		soup = BeautifulSoup(data)

		contrib = soup.findAll("ul", attrs={"class":"contributors"})
		list = contrib[0].findAll("li")
		element = list[0].text
		self.chef = element.replace("Recipe by ", "")

	def scrape_ingredients(self): 
		r = requests.get(self.url)
		data = r.text 
		soup = BeautifulSoup(data)

		ingred_elements = soup.findAll("span", attrs={"class", "ingredient"})
		for i in ingred_elements: 
			ingredient = i.findAll("span", attrs={"class":"name"})
			self.recipe_ingred.append(ingredient[0].text)

	def scrape_instructions(self): 
		r = requests.get(self.url)
		data = r.text 
		soup = BeautifulSoup(data)

		instruction_items = soup.findAll("div", attrs={"itemprop":"recipeInstructions"})
		for i in instruction_items: 
			self.recipe_instruct.append(i.text)

if __name__=="__main__": 
	b = bon_appetit_recipe("http://www.bonappetit.com/recipe/duck-breast-with-mustard-greens-turnips-and-radishes")	
	b.do_all()