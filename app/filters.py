# coding: utf-8
#Python built in 
import re, unicodedata, sys
#External Libraries
import en, enchant, nltk
#French 
from constants import *
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
	print "Filtering primary", line
	#Check if ccontains "and" and "or"
	print "0) ", line
	updated_line = remove_x(line)
	print "1) ", updated_line
	updated_line = remove_optional(updated_line)
	print "2) ", updated_line
	updated_line = remove_comma_after(updated_line)
	print "3) ", updated_line
	updated_line = remove_first_token(updated_line)
	print "4) ", updated_line
	updated_line = remove_size(updated_line)
	print "5) ", updated_line
	updated_line = remove_conjunctions(updated_line)
	print "6) ", updated_line
	updated_line = remove_misc(updated_line)
	print "7) ", updated_line
	updated_line = remove_state(updated_line)
	print "8) ", updated_line
	updated_line = remove_second_token(updated_line)
	print "9) ", updated_line
	
	#find some way to cycle through one more time
	print "_____________________"
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
	# print filter_key_ingred("white peaches, halved")
	# print filter_key_ingred("good-quality dark chocolate")
 # 	print filter_key_ingred("whole wheat, soaked for hours in several changes of water (or alternatively use canned cooked wheat, also called pastiera di grano")
	# print filter_key_ingred("orange liqueur (optional)")
	# print filter_key_ingred("rum, bourbon or a mixture of the two")
	# print alternate_names("rum or bourbon")
	# print filter_key_ingred("1 tbsp clear rice vinegar or cider vinegar")
	# print filter_key_ingred("2 large eggs, separated")
	print remove_first_token("400g/14oz fresh blueberries")




