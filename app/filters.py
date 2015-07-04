# coding: utf-8
#Python built in 
import re, unicodedata, sys 
from constants import *
from settings import *
from filterHelper import *

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

def filter_key_ingred(line): 
	"""Filters for the key ingredient"""
	print "_____________________"
	print "Filtering primary", line
	size = len(line.split())
	if len(line.split()) == 0: 
		return 
	else: 
		updated_line = x_of_something(line)
		print "0)", updated_line
		updated_line = remove_first_comma(updated_line)
		print "1)", updated_line
		updated_line = remove_parantheses(updated_line)
		print "2)", updated_line
		updated_line = remove_measurements_and_numbers(updated_line)
		print "3)", updated_line
		updated_line = remove_x(updated_line)
		print "4) ", updated_line
		updated_line = remove_size(updated_line)
		print "5) ", updated_line
		updated_line = remove_state(updated_line)
		print "6) ", updated_line
		updated_line = remove_misc(updated_line)
		print "7) ", updated_line
		updated_line = for_something(updated_line)
		if "or" in updated_line: 
			return or_cases(updated_line)
		if "and" in updated_line: 
			print "and case"
			return and_cases(updated_line)
		return updated_line

def map_descriptor(key_ingred, phrase): 
	token = phrase.split()
	if key_ingred in token: 
		token.remove(key_ingred)
	if len(token) == 1:
		descriptor = token[0]
	else: 
		descriptor = " ".join(token)
	return descriptor, key_ingred

def alternate_names(line): 
	"""Finds the alternative name that is listed"""
	pass

if __name__=="__main__": 
	# filter_key_ingred("1 x 500g/1lb 2oz bag fresh gnocchi")
	# filter_key_ingred("350g/1214oz cold, cooked leftover turkey meat, sliced into strips")
	# filter_key_ingred("1 tbsp strattu or 2 tbsp tomato puree")
	# filter_key_ingred("knob of unsalted butter")
	print or_cases("red or natural glace cherries")
	print or_cases("pink or black sea salt")
	print or_cases("mooli or jicama")
	# Failed Cases:  4 tbsp chopped, fresh mint or coriander
	#1 tbsp pomace oil or good quality olive oil
	 # 1 tbsp strattu or 2 tbsp tomato puree
	# 350g/1214oz cold, cooked leftover turkey meat, sliced into strips
	#small handful red or natural (uncoloured) glace cherries
	#225g/8oz tinned pineapple in pineapple juice, drained, dried and roughly chopped
	#icing sugar for dusting





