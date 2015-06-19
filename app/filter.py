# coding: utf-8
#Python built in 
import re, unicodedata, sys
#External Libraries
import en, enchant, nltk
#French 
from constants import *
from filterHelper import *

def map_descriptor(key_ingred, phrase): 
	token = phrase.split()
	if key_ingred in token: 
		token.remove(key_ingred)
	if len(token) == 1:
		descriptor = token[0]
	else: 
		descriptor = " ".join(token)
	return descriptor, key_ingred

#Fix encoding issue and then write script to handle french terms
def check_french(phrase): 
	print phrase.encode("ascii", "ignore")
	return d_fr.check(phrase)

def tokenize(phrase): 
	text = nltk.word_tokenize(phrase)
	pos = nltk.pos_tag(text)
	return pos

def key_filter(token_positions):
	keys = [] 
	descriptor = []
	for t in token_positions: 
		if t[1] == "NN" or t[1] == "NNS": 
			keys.append(t[0])
		if t[1] == "JJ": 
			descriptor.append(t[0])
	return keys, descriptor

def filter_ingred(line): 
	"""Filters all the ingredients by using all the above methods"""
	line = remove_comma_after(line)
	token = line.split()
	updated_token = remove_numbers(token)
	updated_token = remove_measurements(updated_token)
	updated_line = join(updated_token)
	return updated_line

def filtered_key(line): 
	"""Filters all the ingredients by using all the above methods"""
	updated = filter_ingred(line)
	return key_filter(tokenize(updated))

def try_all(line):
	print key_filter(tokenize(line))
	print filter_ingred(line)
	print filtered_key(line)

if __name__=="__main__": 
	# print strip_accents(u"1Â¼")
	# print filter_ingred("200g/7oz sugar, plus extra for dusting")
	# print filter_ingred("kalonji (black onion) seeds or nigella seeds")
	# print filter_conjunctions("kalonji (black onion) seeds or nigella seeds")
	# print map_adj("orange", "blood orange")
	# print map_adj("apple", "green apple")
	# print map_adj("apple", "Bramley apple")
	# print map_adj("cabbage", "red cabbage")
	# print map_adj("fish", "fresh water fish")
	# print remove_adverb("freshly ground black pepper")
	# print remove_verb("freshly ground black pepper")
	
	try_all("fresh small strawberries, half hulled")
	try_all("mushroom water")
	try_all("rum, bourbon or a mixture of the two")
	try_all("ready-made lemon curd")
	try_all("uncooked long grain or basmati")




