from bs4 import BeautifulSoup 
import csv, requests, re, urllib2, os, time
from recipe_to_text import Recipe_Generator

class FoodNetwork: 
	
	base = "http://www.foodnetwork.com"

	def __init__(self, query, subset=1): 
		self.subset = subset
		self.query = query
		self.links = []
		self.address = "http://www.foodnetwork.com/search/search-results.html?searchTerm=VALUE&page=NUM&lastFilter=pagination&_charset_=UTF-8"

	def query_links(self): 
		print "Querying " + self.query
		self.update_address(1, self.address)

		r  = requests.get(self.curr_address)
		data = r.text
		soup = BeautifulSoup(data)

		if self.subset == 1: 
			pages = soup.findAll("span", attrs={"class":"total"})
			self.pages = int(pages[0].text)
		else: 
			self.pages = self.subset

		print self.pages

		print "Scraping"
		for i in range(1, self.pages):
			print "..."
			self.update_address(i, self.address)
			self.find_links()
		self.generate_text_file()
		
	def find_links(self): 
		r  = requests.get(self.curr_address)
		data = r.text
		soup = BeautifulSoup(data)

		for link in soup.findAll("a", href=True): 
			recipe = link['href']
			matchObj = re.search(r'\/recipes\/\S+\/\S+\.html', recipe)
			if matchObj: 
				link = matchObj.group()
				if link not in self.links and "photos" not in link and "packages" not in link and "articles" not in link:
					self.links.append(link)

	def update_address(self, page_num, address): 
		address = address.replace("VALUE", self.query)
		self.curr_address = address.replace("NUM", str(page_num))

	def generate_text_file(self):
		path = self.generate_path()
		self.links_file = path + "food_network_" + self.query + ".txt"
		text_file = open(self.links_file, "w")
		for l in self.links:
			text_file.write(self.base + l + "\n")
		text_file.close()
			
	def generate_path(self):
		def get_parent_dir(directory):
			return os.path.dirname(directory)
		file_path = get_parent_dir(os.getcwd()) + "/links/"
		return file_path

	def convert_links(self): 
		print "Converting all links"
		file = open(self.links_file, 'r')
		for line in file:
			print "..."
			recipe = FoodNetworkRecipe(line)
			recipe.do_all()
		print "Finished"

class FoodNetworkRecipe: 

	def __init__(self, recipe_url):
		self.recipe_url = recipe_url
		self.recipe_ingred = []
		self.recipe_instruct = []
		self.ingred_list = {}
		self.generator = Recipe_Generator()
		self.type = False

	def do_all(self): 
		self.check_type()
		if not self.type:
			self.scrape_name()
			self.scrape_ingredients()
			self.scrape_instructions()
			self.generator.write_to_text(self.name, self.recipe_url, self.recipe_ingred, self.recipe_instruct)
		else: 
			print "Cannot scrape"
			print self.recipe_url

	def check_type(self): 
		r  = requests.get(self.recipe_url)
		data = r.text
		soup = BeautifulSoup(data)

		start = soup.findAll("li", attrs={"itemprop":"ingredients"})
		name = soup.findAll("h1", attrs={"itemprop":"name"})
		instr = soup.findAll("div", attrs={"class":"col12 directions"})
		if not name or not start or not instr: 
			self.type = True

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

	def parse_ingredients(self): 
		"""Breakdown ingredients and quantity"""
		pass

if __name__=="__main__": 
	test = "http://www.foodnetwork.com/recipes/food-network-kitchens/shrimp-salad-pitas-recipe.html"
	start = time.time()

	#TODO
	# queries = ['beef', 'chicken', 'broccoli'] 
	#queries = "beef"

	if type(queries) is str:
		fn = FoodNetwork(queries, subset=5)
		fn.query_links()
		fn.convert_links()
	else: 
		for q in queries: 
			fn = FoodNetwork(q, subset=5)
			fn.query_links()
			fn.convert_links()

	end = time.time()
	print "Total run time: " + str(end - start)

