from bs4 import BeautifulSoup 
import csv, requests, re, urllib2, os, time

# categories = ['holiday-recipes', 'quick-recipes', 'family-meals', 'healthy', 'desserts', 'chicken']

from recipeGenerator import Recipe_Generator

class bon_appetit: 

	
	base_address = "http://www.bonappetit.com/recipes/"

	def __init__(self, category): 
		self.category = category
		self.recipes = []

	def scrape_page(self, url): 

		r = requests.get(category_url)
		data = r.text 
		soup = BeautifulSoup(data)

		results = soup.findAll("h3", attrs={"class":"result-title"})
		for r in results: 
			for link in soup.findAll('a', href=True):
				potential = link['href']
				if '/recipe/' in potential and potential not in self.recipes: 
					self.recipes.append(potential)

	def scrape_category(self, category):
		category_url = self.base_address + category 
		counter = 1

		r = requests.get(category_url)
		data = r.text 
		soup = BeautifulSoup(data)

		while has_results(soup):
			if counter is 1:
				self.scrape_page(soup)
			else: 
				page_url = base_address + category + "/page" + counter
				counter = counter + 1


	def has_results(self, soup):
		results = soup.findAll("h1") 
		print results[0].text
		if results[0].text == "Not Found":
			return False 
		else: 
			return True

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
	b = bon_appetit("holidays-recipes")
	b.scrape_category()