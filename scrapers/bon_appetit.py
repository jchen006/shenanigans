from bs4 import BeautifulSoup 
import csv, requests, re, urllib2, os, time

categories = ['holiday-recipes', 'quick-recipes', 'family-meals', 'healthy', 'desserts', 'chicken']
	pages = {'quick-recipes': 53, 
		}

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
		#h1 itemprop ="name"
		#ul class=ingredients
		#span class="ingredient", 
		#quantity, "unit", "name"

		#div class=prep-steps 
		#li class = step
		#ul class=contributors 

def main(): 
	scrape_all()


if __name__=="__main__": 
	scrape_category