# coding: utf-8
import unittest, sys, os


def generate_path():
	def get_parent_dir(directory):
		return os.path.dirname(directory)
	file_path = get_parent_dir(os.getcwd())
	return file_path

sys.path.append(generate_path())
from filters import *

class filterTest(unittest.TestCase): 

	def test_1(self):
		self.assertEqual(filter_key_ingred("1 x 500g/1lb 2oz bag fresh gnocchi"), 'gnocchi')

	def test_2(self): 
		self.assertEqual(filter_key_ingred("1 small tub (about 200g/7oz) half-fat creme fraiche"), "creme fraiche")

	def test_3(self): 
		self.assertEqual(filter_key_ingred("4 x 175g/6oz gurnard fillets, pin boned, skin scored"), "gurnard")

	def test_4(self):
		self.assertEqual(filter_key_ingred("2 tbsp finely chopped fresh thyme"), "thyme")

	def test_5(self): 
		self.assertEqual(filter_key_ingred("1 baguette, thinly sliced"), "baguette")

	def test_6(self): 
		self.assertEqual(filter_key_ingred("icing sugar for dusting"), "icing sugar")

	def test_7(self): 
		self.assertEqual(filter_key_ingred("squeeze of lemon juice"), "lemon juice")

	def test_8(self): 
		self.assertEqual(filter_key_ingred("1 loaf sourdough bread, thickly sliced"), "sourdough bread")

	def test_9(self): 
		self.assertEqual(filter_key_ingred("knob of unsalted butter"), "unsalted butter")

	def test_10(self):
		self.assertEqual(filter_key_ingred("600ml/20 fl oz double cream"), "double cream")

	def test_11(self):
		self.assertEqual(filter_key_ingred("sprinkling of paprika"), "paprika")

	def test_12(self): 
		self.assertEqual(filter_key_ingred("a little melted butter"), "butter")

	def test_13(self): 
		self.assertEqual(filter_key_ingred("small handful red or natural (uncoloured) glace cherries"), ('red cherries', 'glace cherries'))
	
	def test_14(self): 
		self.assertEqual(filter_key_ingred("4 tbsp pickled carrot and mooli (see recipe above)"), ('carrot', 'mooli'))
	
	def test_15(self): 
		self.assertEqual(filter_key_ingred("1 tbsp pomace oil or good quality olive oil"), "('pomace oil', 'olive oil')")
	# 4 tbsp chopped, fresh mint or coriander

	 # 1 tbsp strattu or 2 tbsp tomato puree
	# 350g/1214oz cold, cooked leftover turkey meat, sliced into strips
	#225g/8oz tinned pineapple in pineapple juice, drained, dried and roughly chopped
	
	#freshly  lime juice
if __name__ == '__main__':
    unittest.main()
