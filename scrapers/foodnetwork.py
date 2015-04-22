from bs4 import BeautifulSoup 
import csv, requests, re, urllib2, os

def get_parent_dir(directory):
    import os
    return os.path.dirname(directory)

file_path = get_parent_dir(os.getcwd()) + "/recipes/"

class FoodNetwork: 

	def __init__(self, recipe_url):
		self.recipe_url = recipe_url
		self.recipe_ingred = []
		self.recipe_instruct = []
		self.ingred_list = {}

	def do_all(self): 
		self.scrape_name()
		self.scrape_ingredients()
		self.scrape_instructions()
		self.write_to_text()

	def scrape_ingredients(self): 
		r  = requests.get(self.recipe_url)
		data = r.text
		soup = BeautifulSoup(data)
		
		start = soup.findAll("li", attrs={"itemprop":"ingredients"})
		for s in start: 
			self.recipe_ingred.append(str(s.text))

	def scrape_name(self): 
		r = requests.get(self.recipe_url)
		data = r.text 
		soup = BeautifulSoup(data)

		name = soup.findAll("h1", attrs={"itemprop":"name"})
		self.name = name[0].text

	def scrape_instructions(self): 
		r  = requests.get(self.recipe_url)
		data = r.text
		soup = BeautifulSoup(data)

		start = soup.findAll("div", attrs={"class":"col12 directions"})
		paragraphs = start[0].findAll("p")
		for p in paragraphs: 
			self.recipe_instruct.append(str(p.text))

	def generate_file_name(self): 
		title = self.name.replace(" ", "_")
		title = title.replace("-", "_")
		self.file_name = title + ".txt"

	def write_to_text(self): 
		self.generate_file_name()
		text_file = open(file_path + self.file_name, "w")
		text_file.write(self.name + "\n")
		text_file.write(self.recipe_url + "\n")
		for i in self.recipe_ingred: 
			text_file.write(i + "\n")
		for i in self.recipe_instruct: 
			text_file.write(i + "\n")
		text_file.close()

	def parse_ingredients(self): 
		"""Breakdown ingredients and quantity"""
		pass

if __name__=="__main__": 
	test = "http://www.foodnetwork.com/recipes/food-network-kitchens/shrimp-salad-pitas-recipe.html"
	fn = FoodNetwork(test)
	fn.do_all()
