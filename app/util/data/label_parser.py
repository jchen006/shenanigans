import os
from common.settings import *

'''
Label Parser:
    Class to take a txt file of 'master' labels and turn them into a python set
    to quickly check if a parsed ingredient contains one of these master ingredient labels
    E.g. "chopped garlic freshly washed" contains 'garlic', which is in our master labels file
    and thus we parse this to have the consolidated ingredient label 'garlic'
'''


class LabelParser():

    def __init__(self, food_label):
        self.file_path = os.path.join(
            APP_ROOT, "ingredient_labels/" + food_label + ".txt")

        self.ingred_set = set()
        with open(self.file_path, 'r') as ingred_labels:
            for i in ingred_labels:
                self.ingred_set.add(i[:-1])

    def find_consolidated_ingred(self, ingred_phrase):
        for mi in self.ingred_set:
            if mi in ingred_phrase:
                return mi

        return None


if __name__ == "__main__":
    LP = LabelParser("fruits")
    x = "Phrase: washed apples in cranberry juice"
    print x
    print "Parsed Phrase", LP.find_consolidated_ingred(x)
