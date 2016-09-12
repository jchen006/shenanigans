from selenium import webdriver
from depot.manager import DepotManager
from PIL import Image
import os
import sys
sys.path.append("../app")
from settings import *


class Screenshot():

    def __init__(self, url, element):
        self.url = url
        self.element = element

    def get_original_diagram(self):
        depot = DepotManager.get()
        self.driver = webdriver.PhantomJS()
        self.driver.maximize_window()  # set the window size that you need
        self.driver.get(self.url)
        self.ele = self.driver.find_element_by_id(self.element)

        self.loc1 = self.ele.location
        # self.size1 = ele.size

        screenshot_name = self.generate_name()
        print(APP_ROOT + "/static/images")
        self.screenshot_file_location = APP_ROOT + \
            "/static/images/" + screenshot_name + '.png'
        self.driver.save_screenshot(self.screenshot_file_location)

    def crop_screenshot(self):
        image2 = Image.open(self.screenshot_file_location)

        # size is 700x400
        left = self.loc1['x']
        top = self.loc1['y']
        right = self.loc1['x'] + 700
        bottom1 = self.loc1['y'] + 400

        image2 = image2.crop((left, top, right, bottom1))
        os.remove(self.screenshot_file_location)
        image2.save(self.screenshot_file_location)

    def finish(self):
        self.driver.quit()

    def generate_name(self):
        tokens = self.url.split("/")
        print(tokens)
        return tokens[len(tokens) - 1]

    # scatterplot
    # radar_graph
    # lda_graph
    # ingredient_freq
    # word_cloud

if __name__ == "__main__":
    s = Screenshot("http://localhost:5000/lda_graph", "lda")
    s.get_original_diagram()
    s.crop_screenshot()
    s.finish()
