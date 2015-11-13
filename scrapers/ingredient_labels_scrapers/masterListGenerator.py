#https://en.wikipedia.org/wiki/List_of_vegetables
#http://vegetablesfruitsgrains.com/list-of-vegetables/



""""Scraping sets on the following categories
(1) Fruits // fruits.txt

(2) Vegetables // vegetables.txt, sea_vegetables.txt
	http://vegetablesfruitsgrains.com/list-of-vegetables/

(3) Herbs 

(4) Dairy 

(5) Cheese

(6) Beans 

(7) Spices  

(8) Game Meats 

(9) Poultry

(10) Sauces (Fish Sauce, Roux, etc)

(11) Fish // fish.txt 

(12) Crustaceans 

(13) Echinoderms 

(14) Mollusk 

(15) Medusozoa 

(12) Grains  

(13) Seeds (Sesame seeds)

(14) Fats, Oils (Truffle oil, avocado oil)

(15) Desserts (Sugar, Brown sugar, demara sugar)

(16) Pasta

(17) Mushrooms

(18) Alcohols

(19) Berry


The master list will exhibit a decent level of granularity 
such as shellfish will be independent of seafood. Idea is to
scrape a number of different lists and cross reference each one
to create a more or less common master list. 

Parse all ingredients labels and generate a massive table that maps 
ingredient to the particular label
"""

class masterListGenerator: 


	def _init_(self, list): 
		self.list = list