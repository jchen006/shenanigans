from bs4 import BeautifulSoup 
import csv, requests, re, urllib2

class FoodNetwork: 

	def __init__(self, recipe_url):
		self.recipe_url = recipe_url
		self.recipe_ingred = []
		self.recipe_instruct = []
		#To be used later for parsing
		self.ingred_list = {}

	def scrape_ingredients(self): 
		r  = requests.get(self.recipe_url)
		data = r.text
		soup = BeautifulSoup(data)
		
		start = soup.findAll("li", attrs={"itemprop":"ingredients"})
		for s in start: 
			self.recipe_ingred.append(str(s.text))

	def scrape_instructions(self): 
		r  = requests.get(self.recipe_url)
		data = r.text
		soup = BeautifulSoup(data)

		start = soup.findAll("div", attrs={"class":"col12 directions"})
		paragraphs = start[0].findAll("p")
		for p in paragraphs: 
			self.recipe_instruct.append(str(p.text))

	def parse_ingredients(self): 
		pass

if __name__=="__main__": 
	test = "http://www.foodnetwork.com/recipes/food-network-kitchens/shrimp-salad-pitas-recipe.html"
	fn = FoodNetwork(test)
	fn.scrape_ingredients()
	print fn.recipe_ingred
	fn.scrape_instructions()
	print fn.recipe_instruct
