# coding: utf-8
#Python built in 
import re, unicodedata, sys
from string import digits
#Internal Libraries
from constants import *
from settings import *




def remove_measurements_and_numbers(line): 
	tokens = line.split(" ")
	index = []
	updated = []
	for t in tokens: 
		for m in measurements: 
			if m == t or contains_digits(t):
				index.append(tokens.index(t))
	for i in range(len(tokens)): 
		if i not in index: 
			updated.append(tokens[i])
	result = " ".join(updated)
	if PRINT_STEPS: 
		print "Measurements and numbers result: ", result
	return result

_digits = re.compile('\d')
def contains_digits(d):
    return bool(_digits.search(d))

def remove_parantheses(line): 
	matchObj = re.search(r'.+(\(.+\)).*', line)
	if matchObj: 
		return line.replace(matchObj.group(1), "")
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

def remove_x(line):
	if line[:2] == "x ": 
		return line[2:]
	else: 
		return line

def x_of_something(line): 
	"""Looks for '... of ...' cases"""
	matchObj = re.search(r'.+\sof\s(.+)', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def for_something(line): 
	"""Looks for "... for ..."""
	matchObj = re.search(r'(.+)\sfor\s.+', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def from_the_something(line): 
	"""Looks for "x from something"""
	pass

def remove_comma_after(line):
	"""Removes everything after the comma"""
	matchObj = re.search(r'(.+)\,\w', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def or_cases(line): 
	"""Handles x or y z which splits into x z or y z 
	Handles x or y which splits into x y """
	case_1 = re.search(r'(.+)\sor(.+)\s(.+)', line)
	case_2 = re.search(r'(.+)\sor\s(.+)', line)
	if case_1: 
		base = case_1.group(3)
		opt_1 = case_1.group(1).strip()
		opt_2 = case_1.group(2).strip()
		if base in opt_1: 
			return opt_1, opt_2 + " " + base
		return opt_1 + " " + base, opt_2 + " " + base
	elif case_2: 
		return case_2.group(1).strip(), case_2.group(2).strip()
	else: 
		return line

def such_as_cases(line): 
	"""Handles the (such as cases)"""
	case = re.search(r'(.+\(such\sas\s(.+)\))', line)
	if case: 
		return case.group(2)
	else: 
		return line

def and_cases(line): 
	"""Handles x and y which splits into x, y"""
	case = re.search(r'(.+)\sand\s(.+)', line)
	if case: 
		return case.group(1).strip(), case.group(2).strip()
	else: 
		return line

def in_cases(line): 
	"""Handles 'something in something'"""
	case = re.search(r'((.+)\sin\s.+)', line)
	if case: 
		return case.group(2)
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
			updated_line = updated_line.replace(s, "")
	return updated_line

def last_cleanups(line): 
	tokens = line.split()
	if len(tokens) == 0: 
		return line
	if tokens[0] == "a": 
		tokens.remove(tokens[0])
	return join(tokens).strip()

def remove_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	return join(tokens)

def convert_singular(line): 
	"""Converts the phrase to singular form"""
	pass

def join(tokens):
	"""Joins the entire string back together"""
	return " ".join(tokens)


