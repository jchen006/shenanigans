# coding: utf-8
#Python built in 
import re, unicodedata, sys
#External Libraries
# import en, enchant
#French 
from constants import *

def remove_measurements(tokens):
	"""Removes the measurements in the front of an ingredients"""
	for m in measurements: 
		if m in tokens: 
			tokens.remove(m)
	return tokens

def remove_comma_after(line):
	"""Removes everything after the comma"""
	matchObj = re.search(r'(.+)\,', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def join(tokens):
	"""Joins the entire string back together"""
	return " ".join(tokens)

def remove_numbers(tokens):
	"""Removes any numbers"""
	def hasNumbers(inputString):
   		return bool(re.search(r'\d', inputString))
	filtered = [elem for elem in tokens if not hasNumbers(elem)] 
	return filtered

def strip_accents(s): 
	"""A bad attempt at trying to handle accents on certain words"""
	return ''.join((c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn'))

def filter_ingred(line): 
	"""Filters all the ingredients by using all the above methods"""
	line = remove_comma_after(line)
	token = line.split()
	updated_token = remove_numbers(token)
	updated_token = remove_measurements(updated_token)
	updated_line = join(updated_token)
	return updated_line

def filter_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	return join(tokens)

def map_descriptor(key_ingred, phrase): 
	token = phrase.split()
	if key_ingred in token: 
		token.remove(key_ingred)
	if len(token) == 1:
		descriptor = token[0]
	else: 
		descriptor = " ".join(token)
	return descriptor, key_ingred

#Need to also consider spanish cases 

if __name__=="__main__": 
	# print strip_accents(u"1Â¼")
	# print filter_ingred("200g/7oz sugar, plus extra for dusting")
	# print filter_ingred("kalonji (black onion) seeds or nigella seeds")
	# print filter_conjunctions("kalonji (black onion) seeds or nigella seeds")
	# print map_adj("orange", "blood orange")
	# print map_adj("apple", "green apple")
	# print map_adj("apple", "Bramley apple")
	# print map_adj("cabbage", "red cabbage")
	print map_adj("fish", "fresh water fish")

	# print check_french("Crème")
	# print check_french("brûlée")
	# print en.noun.plural("chairs")
	print change_to_singular("chairs")
	# print change_to_singular("chair")
	# print en.noun.singular("octopi")

