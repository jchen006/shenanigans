# coding: utf-8
import re, unicodedata, sys

def remove_measurements(tokens): 
	for m in measurements: 
		if m in tokens: 
			tokens.remove(m)
	return tokens

def remove_comma_after(line): 
	matchObj = re.search(r'(.+)\,', line)
	if matchObj: 
		return matchObj.group(1)
	else: 
		return line

def join(tokens): 
	return " ".join(tokens)

def remove_numbers(tokens): 
	def hasNumbers(inputString):
   		return bool(re.search(r'\d', inputString))
	filtered = [elem for elem in tokens if not hasNumbers(elem)] 
	return filtered

def strip_accents(s):
  return ''.join((c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn'))

def filter_ingred(line): 
	line = remove_comma_after(line)
	token = line.split()
	updated_token = remove_numbers(token)
	updated_token = remove_measurements(updated_token)
	updated_line = join(updated_token)
	print updated_line
	return updated_line

measurements = ['cups', 'oz', 'tsp', 'tablespoons', 
	'teaspoons', 'tabelspoon', 'teaspoon', 'tbsp', 'cup', 'fl', 'g', 'bunch', 'handful', 'pinch']

if __name__=="__main__": 
	print strip_accents(u"1Â¼")

