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
		self.assertEqual(filter_ingred("1/2 cups jam"), 'jam')

	def test_2(self):
		self.assertEqual(filter_ingred("1/2 cups raspberry jam"), 'raspberry jam')

	def test_3(self):
		self.assertEqual(filter_ingred("2 tsp lemon juice"), 'lemon juice')

	def test_4(self):
		self.assertEqual(filter_ingred("1 digestive biscuit, crushed "), 'digestive biscuit')

	def test_5(self):
		self.assertEqual(filter_ingred("35ml/1 1/4 fl oz whisky"), 'whisky')

	def test_6(self):
		self.assertEqual(filter_ingred("pinch mixed spice"), 'mixed spice')

	def test_7(self):
		self.assertEqual(filter_ingred("35ml/1Â¼fl oz whisky"), 'whisky')

	def test_8(self):
		self.assertEqual(filter_ingred("2 blood oranges"), 'blood oranges')

	def test_10(self): 
		self.assertEqual(change_to_singular("oranges"), "orange")

	def test_11(self): 
		self.assertEqual(change_to_singular("apples"), "apple")

	def test_12(self): 
		self.assertEqual(change_to_singular("octopi"), "octopus")

	def test_13(self): 
		self.assertEqual(change_to_singular("blueberries"), "blueberry")

	def test_14(self): 
		self.assertEqual(change_to_singular("tomatoes"), "tomato")

	def test_15(self): 
		self.assertEqual(map_descriptor("apple", "green apple")[0], "green")

	def test_16(self): 
		self.assertEqual(map_descriptor("apple", "Bramley apple")[0], "Bramley")

	def test_17(self): 
		self.assertEqual(map_descriptor("cabbage", "red cabbage")[0], "red")

	def test_18(self): 
		self.assertEqual(map_descriptor("fish", "fresh water fish")[0], "fresh water")

	def test_19(self): 
		self.assertEqual(filter_key_ingred("walnut pieces"), "walnut")

	def test_20(self): 
		self.assertEqual(filter_key_ingred("garlic clove"), "garlic")

	def test_21(self): 
		self.assertEqual(filter_key_ingred("ready-made lemon curd"), "lemon curd")

	def test_22(self): 
		self.assertEqual(filter_key_ingred("medium parsnip, peeled"), "parsnip")

if __name__ == '__main__':
    unittest.main()
