# coding: utf-8
#Python built in 
import re, unicodedata, sys
from string import digits
#Internal Libraries
from constants import *

"""NEED TO STREAMLINE HOW TOKENS RETURNED"""

#look at splitting first by the line and remove all measurements and numbers 
def remove_digits(line):
	tokens = line.split(" ")
	for t in tokens: 
		if contains_digits(t):
			tokens.remove(t)
	return " ".join(tokens)

def remove_measurements_and_numbers(line): 
	tokens = line.split(" ")
	index = []
	updated = []
	for t in tokens: 
		for m in measurements: 
			if m in t or contains_digits(t): 
				index.append(tokens.index(t))

	for i in range(len(tokens)): 
		if i not in index: 
			updated.append(tokens[i])

	return " ".join(updated)

_digits = re.compile('\d')
def contains_digits(d):
    return bool(_digits.search(d))

def remove_parantheses(line): 
	matchObj = re.search(r'(.+)\(', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def remove_optional(tokens): 
	if "(optional)" in tokens: 
		tokens = tokens.replace("(optional)","")
	return tokens

def remove_first_comma(line): 
	index = line.find(",")
	if index != -1:
		return line[:index]
	else: 
		return line

def x_of_something(line): 
	"""Looks for '... of ...' cases"""
	matchObj = re.search(r'.+\sof\s(.+)', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def remove_comma_after(line):
	"""Removes everything after the comma"""
	matchObj = re.search(r'(.+)\,\w', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

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


