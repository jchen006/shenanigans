# coding: utf-8
#Python built in 
import re, unicodedata, sys
#External Libraries
import en, enchant, nltk
#French 
from constants import *

d_us = enchant.Dict("en_US")
d_fr = enchant.Dict("fr_FR")

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

def change_to_singular(token): 
	"""Changes any plural form of a word to singular form"""
	updated_token = token
	updated_token = en.noun.singular(token)
	if d_us.check(updated_token): 
		return updated_token
	else: 
		return token

def remove_numbers(tokens):
	"""Removes any numbers"""
	def hasNumbers(inputString):
   		return bool(re.search(r'\d', inputString))
	filtered = [elem for elem in tokens if not hasNumbers(elem)] 
	return filtered

def remove_verb(tokens): 
	"""Removes all verbs in the tokens"""
	for t in tokens: 
		if en.is_verb(t): 
			tokens.remove(t)
	return tokens

def remove_adverb(tokens): 
	"""Removes all adjectives in the tokens"""
	for t in tokens: 
		if en.is_adverb(t): 
			tokens.remove(t)
	return tokens

def strip_accents(s): 
	"""A bad attempt at trying to handle accents on certain words"""
	return ''.join((c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn'))

def filter_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	return join(tokens)