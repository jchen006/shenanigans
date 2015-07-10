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
	print "_____________________\n"
	print "Filtering primary", line
	size = len(line.split())
	if len(line.split()) == 0: 
		return 
	elif "," in line: 
		#split on commas and run filter key ingredient on it 
		splits = check_commas(line)
		print splits
		updated_line = ""
		for s in splits:
			updated_line = updated_line + filter_key_ingred(s.strip())
		return updated_line
	else: 
		updated_line = such_as_cases(line)
		updated_line = x_of_something(updated_line)
		updated_line = remove_first_comma(updated_line)
		updated_line = remove_parantheses(updated_line)
		updated_line = remove_measurements_and_numbers(updated_line)
		updated_line = remove_x(updated_line)
		updated_line = remove_size(updated_line)
		updated_line = remove_state(updated_line)
		updated_line = remove_misc(updated_line)
		updated_line = for_something(updated_line)
		if "in" in updated_line: 
			return in_cases(updated_line)
		if "or" in updated_line: 
			return or_cases(updated_line)
		if "and" in updated_line: 
			return and_cases(updated_line)
		updated_line = last_cleanups(updated_line)
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

if __name__=="__main__": 
	# filter_key_ingred("1 x 500g/1lb 2oz bag fresh gnocchi")
	# filter_key_ingred("350g/1214oz cold, cooked leftover turkey meat, sliced into strips")
	# filter_key_ingred("1 tbsp strattu or 2 tbsp tomato puree")
	# filter_key_ingred("knob of unsalted butter")
	print "final", filter_key_ingred("4 tbsp chopped, fresh mint or coriander")
	
	# Failed Cases:  4 tbsp chopped, fresh mint or coriander
	#1 tbsp pomace oil or good quality olive oi
	 # 1 tbsp strattu or 2 tbsp tomato puree
	# 350g/1214oz cold, cooked leftover turkey meat, sliced into strips
	#small handful red or natural (uncoloured) glace cherries
	#225g/8oz tinned pineapple in pineapple juice, drained, dried and roughly chopped
	#icing sugar for dusting
	#trimmings and skin from the pumpkin (see below)
	#1 x 400g/7oz tin peach slices in syrup, drained
	# 2 x 320g/11oz ready-made all-butter puff pastry sheets (about 35cm x 23cm/14in x 9in)
	#750g/1lb 14oz mixed summer fruit (such as raspberries, red, white and blackcurrants, tayberries, loganberries, blackberries, cherries and blueberries
		
		# the leaves from 4 or 5 mint sprigs, chopped






