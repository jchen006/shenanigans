# coding: utf-8
#Python built in 
import re, unicodedata, sys
from constants import *
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
	result = ""
	if matchObj: 
		result = line.replace(matchObj.group(1), "")
		if PRINT_STEPS: 
			print "Parantheses: ", result
		return result
	else: 
		if PRINT_STEPS: 
			print "Parantheses: ", line
		return line

def remove_first_comma(line): 
	index = line.find(",")
	if index != -1:
		return line[:index]
	else: 
		return line

def check_commas(line): 
	"""Split on commas, filter accordingly, check if contains anything left"""
	return line.split(",")

def remove_x(line):
	if line[:2] == "x ": 
		return line[2:]
	else: 
		return line

def x_of_something(line): 
	"""Looks for '... of ...' cases"""
	matchObj = re.search(r'.+\sof\s(.+)', line)
	if matchObj: 
		result = matchObj.group(1)
		if PRINT_STEPS: 
			print "something of that: ", result
		return result
	else: 
		if PRINT_STEPS: 
			print "something of that:", line
		return line

def for_something(line): 
	"""Looks for "... for ..."""
	matchObj = re.search(r'(.+)\sfor\s.+', line)
	if matchObj: 
		result = matchObj.group(1)
		if PRINT_STEPS: 
			print "for cases: ", result
		return result
	else: 
		if PRINT_STEPS: 
			print "for cases:", line
		return line

def from_the_something(line): 
	"""Looks for "x from something"""
	pass

def remove_comma_after(line):
	"""Removes everything after the comma"""
	matchObj = re.search(r'(.+)\,\w', line)
	if matchObj: 
		result = matchObj.group(1)
		if PRINT_STEPS:
			print "Comma after:", result
		return result
	else: 
		if PRINT_STEPS: 
			print "Comma after:", line
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
			result = opt_1, opt_2 + " " + base
			if PRINT_STEPS: 
				print "or cases:", result
			return result
		result = opt_1 + " " + base, opt_2 + " " + base
		if PRINT_STEPS: 
			print "or cases:", result
		return result
	elif case_2: 
		result = case_2.group(1).strip(), case_2.group(2).strip()
		if PRINT_STEPS: 
			print "or cases:", result
		return result
	else: 
		return line

def such_as_cases(line): 
	"""Handles the (such as cases)"""
	case = re.search(r'(.+\(such\sas\s(.+)\))', line)
	if case: 
		result = case.group(2)
		if PRINT_STEPS: 
			print "such as cases: ", result
	else: 
		if PRINT_STEPS: 
			print "such as cases: ", line
		return line

def and_cases(line): 
	"""Handles x and y which splits into x, y"""
	case = re.search(r'(.+)\sand\s(.+)', line)
	if case: 
		result = case.group(1).strip(), case.group(2).strip()
		if PRINT_STEPS: 
			print "And cases:", result
		return result
	else: 
		if PRINT_STEPS: 
			print "And cases:", line
		return line

def in_cases(line): 
	"""Handles 'something in something'"""
	case = re.search(r'((.+)\sin\s.+)', line)
	if case: 
		result = case.group(2)
		if PRINT_STEPS: 
			print "in cases: ", result
		return result
	else: 
		if PRINT_STEPS: 
			print "in cases: ", line
		return line

def from_cases(line): 
	"""Handles 'from cases'"""
	case = re.search(r'(.+\sfrom\s(.+))', line)
	if case: 
		result = case.group(2)
		if PRINT_STEPS: 
			print "from cases:" , result
		return result
	else: 
		if PRINT_STEPS: 
			print "from cases:", line
		return line

def remove_misc(line): 
	tokens = line.split()
	for m in misc: 
		if m in tokens: 
			tokens.remove(m)
	result = join(tokens)
	if PRINT_STEPS: 
		print "Remove misc:", result
	return result

def remove_size(line): 
	updated_line = line
	for s in size: 
		if s in line: 
			updated_line = line.replace(s, "")
	if PRINT_STEPS: 
		print "Removing size:", updated_line
	return updated_line

def remove_state(line): 
	updated_line = line 
	for s in states: 
		if s in line:
			updated_line = updated_line.replace(s, "")
	if PRINT_STEPS: 
		print "Removing states:", updated_line
	return updated_line

def last_cleanups(line): 
	tokens = line.split()
	if len(tokens) == 0: 
		return line
	if tokens[0] == "a": 
		tokens.remove(tokens[0])
	result = join(tokens).strip()
	if PRINT_STEPS: 
		print "Final cleanup: ", result
	return result

def remove_conjunctions(phrase):
	"""Removes all conjunctions""" 
	tokens = phrase.split()
	for t in tokens: 
		if t in conjunctions: 
			tokens.remove(t)
	result = join(tokens)
	if PRINT_STEPS:
		print "Remove conjunctions:", result
	return result

def convert_singular(line): 
	"""Converts the phrase to singular form"""
	pass

def join(tokens):
	"""Joins the entire string back together"""
	return " ".join(tokens)


