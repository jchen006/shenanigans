# coding: utf-8
#Python built in 
import re, unicodedata, sys
#External Libraries
import en, enchant, nltk
#French 
from constants import *

d_us = enchant.Dict("en_US")
d_fr = enchant.Dict("fr_FR")

"""NEED TO STREAMLINE HOW TOKENS RETURNED"""

def remove_measurements(tokens):
	"""Removes the measurements in the front of an ingredients"""
	for m in measurements: 
		if m in tokens: 
			tokens.remove(m)
	return tokens

def remove_optional(tokens): 
	if "(optional)" in tokens: 
		tokens = tokens.replace("(optional)","")
	return tokens

def remove_comma_after(line):
	print line.count(",")
	if line.count(",") == 1:
		"""Removes everything after the comma"""
		matchObj = re.search(r'(.+)\,', line)
		if matchObj: 
			return matchObj.group(1)
		else: 
			return join(line)
	else: 
		return line

def remove_numbers(tokens):
	#Need to handle case "x" is considered a number
	"""Removes any numbers"""
	def hasNumbers(inputString):
   		return bool(re.search(r'\d', inputString))
	filtered = [elem for elem in tokens if not hasNumbers(elem)] 
	return filtered

def remove_misc(tokens): 
	for m in misc: 
		if m in tokens: 
			tokens.remove(m)
	return tokens

def en_remove_verb(tokens): 
	"""Removes all verbs in the tokens"""
	for t in tokens: 
		if en.is_verb(t): 
			tokens.remove(t)
	return tokens

def en_remove_adverb(tokens): 
	"""Removes all adjectives in the tokens"""
	for t in tokens: 
		if en.is_adverb(t): 
			tokens.remove(t)
	return tokens

def remove_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	return join(tokens)

def join(tokens):
	"""Joins the entire string back together"""
	return "".join(tokens)

def change_to_singular(token): 
	"""Changes any plural form of a word to singular form"""
	updated_token = token
	updated_token = en.noun.singular(token)
	if d_us.check(updated_token): 
		return updated_token
	else: 
		return token

def word_type_tokenize(phrase): 
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

