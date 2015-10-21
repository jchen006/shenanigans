# coding: utf-8
#Python built in 
import re, unicodedata, sys
from constants import *
from settings import *
from filter_helper import *
from nltk.stem import WordNetLemmatizer

"""Will have two separate methods 
(1) Filter for the primary key that will be the key ingredient for instance 
peppercorn, orange 

(2) Filter for the descriptor of the key 
valencia orange -> (valencia, orange)
blood orange -> (blood, orange)
pink peppercorn -> (pink, peppercorn)

(3) Filter for alternate names
",also called" 
", or"
"""

class Filter():

    def __init__(self):
        self.wnl = WordNetLemmatizer()

    def filter_key_ingred(self, line): 
        """Filters for the key ingredient"""
        size = len(line.split())
        if len(line.split()) == 0: 
                return 
        elif "," in line:
                return self.comma_splits(line)
        else: 
            updated_line = such_as_cases(line)
            #Need to check if only one token 
            updated_line = x_of_something(updated_line)
            updated_line = remove_first_comma(updated_line)
            updated_line = remove_parantheses(updated_line)
            updated_line = remove_numbers(updated_line)
            updated_line = remove_measurements(measurements, updated_line)
            updated_line = remove_x(updated_line)
            updated_line = remove_size(updated_line)
            updated_line = remove_state(updated_line)
            updated_line = remove_temperature(updated_line)
            updated_line = remove_misc(updated_line)
            updated_line = for_something(updated_line)
            if " from " in updated_line: 
                    return from_cases(updated_line)
            if " in " in updated_line: 
                    return in_cases(updated_line)
            if " or " in updated_line: 
                    return or_cases(updated_line)
            if "and" in updated_line: 
                    #Handle standalone conjunction cases 
                    return and_cases(updated_line)
            updated_line = remove_conjunctions(conjunctions, updated_line)
            updated_line = last_cleanups(updated_line, self.wnl)
            return updated_line

    def map_descriptor(self, key_ingred, phrase): 
        token = phrase.split()
        if key_ingred in token: 
            token.remove(key_ingred)
        if len(token) == 1:
            descriptor = token[0]
        else: 
            descriptor = " ".join(token)
        return descriptor, key_ingred

    """Splits on commas and then filters each subphrase"""
    def comma_splits(self, line):
        results = ""
        splits = check_commas(line)
        for s in splits: 
            sub_result = self.filter_key_ingred(s)
            if type(sub_result) is tuple: 
                results = sub_result
                break
            elif isinstance(sub_result, str): 
                results = results + " " + sub_result
        if isinstance(results, str): 
            return results.strip()
        return results

if __name__=="__main__": 
    # filter_key_ingred("1 x 500g/1lb 2oz bag fresh gnocchi")
    # filter_key_ingred("350g/1214oz cold, cooked leftover turkey meat, sliced into strips")
    # filter_key_ingred("1 tbsp strattu or 2 tbsp tomato puree")
    # filter_key_ingred("knob of unsalted butter")
    # print filter_key_ingred("4 tbsp chopped, fresh mint or coriander") #Need to check why or case doesn't work
    # print filter_key_ingred("350g/1214oz cold, cooked leftover turkey meat, sliced into strips")
    # filter_key_ingred("225g/8oz tinned pineapple in pineapple juice, drained, dried and roughly chopped")
    # print filter_key_ingred("750g/1lb 14oz mixed summer fruit (such as raspberries, red, white and blackcurrants, tayberries, loganberries, blackberries, cherries and blueberries)")
    # filter_key_ingred("1 small tub (about 200g/7oz) half-fat creme fraiche")
    # filter_key_ingred("1 small tub (about 200g/7oz) half-fat creme fraiche")
    # filter_key_ingred("350g/1214oz cold, cooked leftover turkey meat, sliced into strips")
    F = Filter()
    F.filter_key_ingred("1 tbsp strattu or 2 tbsp tomato puree")
    F.filter_key_ingred("fuji apples")
    # Failed Cases:  4 tbsp chopped, fresh mint or coriander
    #1 tbsp pomace oil or good quality olive oi
     # 1 tbsp strattu or 2 tbsp tomato puree
    # 
    #small handful red or natural (uncoloured) glace cherries
    #
    #trimmings and skin from the pumpkin (see below)
    #1 x 400g/7oz tin peach slices in syrup, drained
    # 2 x 320g/11oz ready-made all-butter puff pastry sheets (about 35cm x 23cm/14in x 9in)
    #
            
            # the leaves from 4 or 5 mint sprigs, chopped


