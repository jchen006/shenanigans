# coding: utf-8
#Python built in 
import re, unicodedata, sys
from constants import *
from string import digits


"""NEED TO STREAMLINE HOW TOKENS RETURNED"""

#look at splitting first by the line and remove all measurements and numbers 
def remove_measurements(line):
	"""Removes the measurements in the front of an ingredients"""
	updated_line = line
	for m in measurements: 
		if m in line: 
			updated_line = updated_line.replace(m, "")
	return updated_line

def remove_first_token(line): 
	tokens = line.split(" ")
	first = tokens[0]
	updated_first = remove_numbers(first)
	updated_first = remove_measurements(updated_first)
	if not updated_first.isalpha(): 
		return " ".join(tokens[1:])
	return updated_first + " " + " ".join(tokens[1:])

def remove_second_token(line): 
	tokens = line.split(" ")
	first = tokens[0]
	for m in measurements: 
		if m == first: 
			print first 
			print m
			tokens.remove(first)
	return " ".join(tokens)

def remove_parantheses(line): 
	pass

def remove_optional(tokens): 
	if "(optional)" in tokens: 
		tokens = tokens.replace("(optional)","")
	return tokens

def remove_comma_after(line):
	if line.count(",") == 1:
		"""Removes everything after the comma"""
		matchObj = re.search(r'(.+)\,', line)
		if matchObj: 
			return matchObj.group(1)
		else: 
			return join(line)
	else: 
		return line

def remove_numbers(line):
	#Need to handle case "x" is considered a number
	"""Removes any numbers"""
	updated_line = line.translate(None, digits)
	return updated_line

def remove_x(line): 
	updated_line = line
	if "x" is line[0]: 
		updated_line = line[1:]
	return updated_line

def remove_misc(line): 
	tokens = line.split()
	for m in misc: 
		if m in tokens: 
			tokens.remove(m)
	return join(tokens)

def remove_size(line): 
	updated_line = line
	for s in size: 
		if s in line: 
			updated_line = line.replace(s, "")
	return updated_line

def remove_state(line): 
	updated_line = line 
	for s in states: 
		if s in line:
			updated_line = line.replace(s, "")
	return updated_line

def remove_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	return join(tokens)

def join(tokens):
	"""Joins the entire string back together"""
	return " ".join(tokens)

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

