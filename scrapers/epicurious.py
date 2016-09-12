from bs4 import BeautifulSuop
import urllib2
import requests
import re
import os
import logging
import datetime
from recipeGenerator import RecipeGenerator

logging.basicConfig('../log/general.log', level=logging.DEBUG)


class Epicurious:

    def __init__(self, number):
        self.number = number

    def scrape_recipes(self):
        """Scrapes all the recipes 
        will utilize a while loop and keep checking body class="error error404 landscape"
        while it isn't empty then keep incrementing and checking """
        if number == 0:
            while  # base:
        else:
            for i in range(0, self.number + 1):
                    # pass
        pass


class EpicuriousRecipes:

    base_address = "http://www.epicurious.com/recipes/food/views/"

    def __init__(self, number):
        self.url = base_address + number
        self.title = ""
        self.chef = ""
        self.ingredients = []
        self.instructions = []

    def scrape_all(self):
        logging.info("scraping site: " + self.url)

        r = requests.get(self.url)
        data = r.text
        soup = BeautifulSoup(data, from_encoding='utf8')

        self.title = self.scrape_title()
        self.chef = self.scrape_chef()
        self.ingredients = self.scrape_ingredients()
        self.instructions = self.scrape_instructions()

    def scrape_ingredients(self, soup):
        pass

    def scrape_instructions(self, soup):
        pass

    def scrape_title(self, soup):
        pass

    def scrape_chef(self, soup):
        pass

if __name__ == "__main__":
    pass
