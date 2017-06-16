from scraper import *
import re
from bs4 import BeautifulSoup
import requests
import re
import urllib2
from jsonGenerator import *

class GordonRamsaySite(Scraper, object):

  def __init__(self, name, website): 
    super(GordonRamsaySite, self).__init__(name, website)
    self.url_list = []

  def scrapeSite(self): 
    scraped_set = {"data_set" : [] }
    url_list = self.getRecipeURLs("/gr/recipes/")
    url_list = [x for x in url_list if x != "/gr/recipes/books/"] 
    url_list = list(set(url_list))
    print url_list
    for url in url_list:
      print ".....scraping....." + url
      scraped_recipe = self.scrapePage(url)
      scraped_set['data_set'].append(scraped_recipe)
      print "....finished and appeneded....."
    return scraped_set

  def getRecipeURLs(self, index_page): 
    r = requests.get(self.website + index_page)
    data = r.text 
    soup = BeautifulSoup(data)
    url_list = []

    for link in soup.findAll("a", href=True):
      recipe = link['href']
      matchObj = re.search(r'\/gr\/recipes\/\w+.*', recipe)
      if matchObj: 
        url_list.append(matchObj.group())
    return url_list

  def scrapePage(self, url): 
    r = requests.get(self.website + url)
    data = r.text 
    soup = BeautifulSoup(data)

    title = self.scrapeTitle(soup)
    chef = self.scrapeChef(soup)
    ingredients = self.scrapeIngredients(soup)
    instructions = self.scrapeInstructions(soup)
    images = self.scrapeImages(soup)
    culture = self.scrapeCulture(soup)
   
    recipe_obj = createRecipeJSON(title, chef, ingredients, instructions, images, culture, url)
    return recipe_obj
  
  def scrapeTitle(self, html_string): 
    titleDiv = html_string.findAll("div", attrs={"class", "hero-title-recipe"})
    title = titleDiv[0].find("h2")
    return title.text

  def scrapeChef(self, html_string): 
    return "Gordon Ramsay"
  
  def scrapeIngredients(self, html_string): 
    ingredients = []
    ingredientSection = html_string.findAll("aside", attrs={"class", "recipe-ingredients"})
    ingred_list = ingredientSection[0].findAll("li")
    for i in ingred_list:
      ingredients.append(i.text)
    return ingredients

  def scrapeInstructions(self, html_string): 
    instructions = []
    instructionSection = html_string.findAll("article", attrs={"class", "recipe-instructions"})
    instruct_list = instructionSection[0].findAll("ol")
    for i in instruct_list:
      instructions.append(i.text)
    return instructions

  def scrapeImages(self, html_string): 
    link = html_string.find("img")
    return link["src"]

  def scrapeCulture(self, html_string): 
    return "n/a"


if __name__== "__main__": 
  gr = GordonRamsaySite("Gordon Ramsay", "https://www.gordonramsay.com")
  print(gr.scrapeSite())

