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
	elif size < 4: 
		print line.split()
		updated_line = remove_optional(line)
		updated_line = remove_comma_after(updated_line)
		updated_line = remove_first_token(updated_line)
		updated_line = remove_size(updated_line)
		updated_line = remove_first_token(updated_line)
		updated_line = updated_line.replace("of ", "")
		updated_line = change_to_singular(updated_line)
		print updated_line
	elif size < 6: 
		print line.split()
		print "medium"
	else:
		#Check if ccontains "and" and "or"
		if " or " in line: 
			print line
		updated_line = remove_x(line)
		updated_line = remove_optional(updated_line)
		updated_line = remove_comma_after(updated_line)
		updated_line = remove_first_token(updated_line)
		updated_line = remove_size(updated_line)
		updated_line = remove_conjunctions(updated_line)
		updated_line = remove_misc(updated_line)
		updated_line = remove_state(updated_line)
		updated_line = remove_second_token(updated_line)
		
		print updated_line
		return updated_line
		#find some way to cycle through one more time
	
		

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
	# p
	# print filter_key_ingred("570ml/1 pint milk")
	print change_to_singular("pine nuts")




