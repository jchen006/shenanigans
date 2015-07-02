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
		updated_line = remove_first_comma(line)
		print "1)", updated_line
		updated_line = remove_parantheses(updated_line)
		print "2)", updated_line
		updated_line = remove_measurements_and_numbers(updated_line)
		print "3)", updated_line
		updated_line = x_of_something(updated_line)
		updated_line = remove_size(updated_line)
		updated_line = remove_state(updated_line)
		updated_line = remove_misc(updated_line)
		print updated_line
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
	or_cases = ["or", " or", " or ", " or "]
	for o in or_cases: 
		if o in line: 
			tokens = line.split(o)
	for t in tokens: 
		t.strip()
	return tokens

if __name__=="__main__": 
	# print filter_key_ingred("white peaches, halved")
	# print filter_key_ingred("good-quality dark chocolate")
 # 	print filter_key_ingred("whole wheat, soaked for hours in several changes of water (or alternatively use canned cooked wheat, also called pastiera di grano")
	# print filter_key_ingred("orange liqueur (optional)")
	# print filter_key_ingred("rum, bourbon or a mixture of the two")
	# print alternate_names("rum or bourbon")
	# print filter_key_ingred("1 tbsp clear rice vinegar or cider vinegar")
	# print filter_key_ingred("2 large eggs, separated")
	# p
	# print remove_parantheses("570ml/1 pint milk")
	# print filter_key_ingred("2 fillets sole")
	# print alternate_names("pine nuts or hazulnuts")
	print filter_key_ingred("750ml/1 pint 7fl oz hot vegetable stock")
	# print filter_key_ingred("about 5 tbsp double cream")
	# print filter_key_ingred("75g/3oz cornflour")


	# Failed Cases:  4 tbsp chopped, fresh mint or coriander
	# 1 small tub (about 200g/7oz) half-fat creme fraiche
	# 1 x 500g/1lb 2oz bag fresh gnocchi
	# 2 tbsp finely chopped fresh thyme
	#1 tbsp pomace oil or good quality olive oil




