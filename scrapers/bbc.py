#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import csv
import requests
import re
import urllib2
import os
import time
import logging
import datetime
from recipeGenerator import Recipe_Generator


def generate_path():
    def get_parent_dir(directory):
        return os.path.dirname(directory)
    file_path = get_parent_dir(os.getcwd()) + "/log/"
    return file_path

logging.basicConfig(filename=generate_path() +
                    'general.log', level=logging.DEBUG)


class BBCSeason:

    base_address = "http://www.bbc.co.uk/food/seasons/"
    base_recipe = "http://www.bbc.co.uk"

    def __init__(self, month):
        self.month = month
        self.url = self.base_address + month
        self.out_season = []
        self.in_season = []

    def scrape_ingredients(self):
        r = requests.get(self.url)
        data = r.text
        soup = BeautifulSoup(data, from_encoding='utf8')

        both = soup.findAll("div", attrs={
                            "class": "related-ingredients-container double-column container flows"})
        if len(both) == 2:
            self.scrape_out_season(both[0])
            self.scrape_in_season(both[1])
        else:
            single = soup.findAll("div", attrs={
                                  "class": "related-ingredients-container single-column container flows"})
            self.scrape_out_season(single[0])
            self.scrape_in_season(both[0])

        self.write_to_text()

    def scrape_out_season(self, out_set):
        all_out = out_set.findAll("li")
        for a in all_out:
            self.out_season.append(a.text.encode("utf8"))

    def scrape_in_season(self, in_set):
        all_in = in_set.findAll("li")
        for a in all_in:
            self.in_season.append(a.text.encode("utf8"))

    def generate_file_name(self):
        file_name = "bbc" + self.month + ".txt"
        self.path = self.generate_path() + file_name

    def write_to_text(self):
        print "Writing to a text file for " + self.month
        self.generate_file_name()
        text_file = open(self.path, "w")
        text_file.write(self.month.capitalize() + "\n")
        text_file.write("\n")
        text_file.write("Out of Season Ingredients\n")
        for i in self.out_season:
            text_file.write(i + "\n")

        text_file.write("\n")
        text_file.write("In Season Ingredients\n")
        for i in self.in_season:
            text_file.write(i + "\n")

        text_file.close()

    def generate_path(self):
        def get_parent_dir(directory):
            return os.path.dirname(directory)
        file_path = get_parent_dir(os.getcwd()) + "/seasons/"
        return file_path

    def scrape_links(self):
        r = requests.get(self.url)
        data = r.text
        soup = BeautifulSoup(data)

        links = soup.findAll("a", href=True)
        for l in links:
            matchObj = re.search(r'\/food\/recipes\/\S+[0-9]{5}', l['href'])
            if matchObj:
                recipe = matchObj.group()
                r = BBCRecipes(self.base_recipe + recipe)
                r.do_all()


class BBCRecipes:

    def __init__(self, url):
        self.url = url
        self.ingredients = []
        self.instructions = []
        self.rg = Recipe_Generator()

    def do_all(self):
        now = datetime.datetime.now()
        logging.info("time: " + now.strftime("%Y-%m-%d %H:%M"))
        logging.info("scraping site:" + self.url)

        r = requests.get(self.url)
        data = r.text
        soup = BeautifulSoup(data, from_encoding='utf8')

        self.scrape_ingredients(soup)
        self.scrape_instructions(soup)
        self.scrape_chef(soup)
        self.scrape_title(soup)

        logging.info("writing site info to text file")
        self.rg.write_to_text(
            self.title, self.url, self.ingredients, self.instructions, chef=self.chef)

    def scrape_ingredients(self, soup):
        logging.info("scraping [" + self.url + "] ingredients")

        section = soup.findAll("p", attrs={"class": "ingredient"})
        for s in section:
            self.ingredients.append(s.text.encode("latin1").decode('utf8'))

    def scrape_instructions(self, soup):
        logging.info("scraping [" + self.url + "] instructions")

        instructions = soup.findAll("li", attrs={"class": "instruction"})
        for i in instructions:
            self.instructions.append(i.text.encode(
                "latin1").decode('utf8').rstrip('\n').strip())

    def scrape_chef(self, soup):
        logging.info("scraping [" + self.url + "] chef")

        chef = soup.findAll("span", attrs={"class": "author"})
        if len(chef) > 0:
            self.chef = str(chef[0].text.encode("latin1").decode('utf8'))
        else:
            self.chef = "None listed"

    def scrape_title(self, soup):
        titles = soup.findAll("div", attrs={"class": "article-title"})
        self.title = titles[0].text.encode(
            "latin1").decode('utf8').rstrip('\n').strip()


def main():
    months = ["january", "february", "march", "april", "may", "june", "july", "august",
              "september", "october", "november", "december"]

    start = time.time()
    for m in months:
        logging.info("working on " + m)
        b = BBCSeason(m)
        b.scrape_links()
    end = time.time()
    total_time = end - start
    logging.info("Total time: " + str(total_time))
    print "Total time: " + str(total_time)


def test():
    b = BBCRecipes(
        "http://www.bbc.co.uk/food/recipes/how_to_make_marmalade_20072")
    b.do_all()


if __name__ == "__main__":
    main()
