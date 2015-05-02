# coding: utf-8
import unittest, sys, os

def generate_path():
	def get_parent_dir(directory):
		return os.path.dirname(directory)
	file_path = get_parent_dir(os.getcwd())
	return file_path

sys.path.append(generate_path())
from filterLib import *

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
		self.assertEqual(strip_accents(u"35ml/1Â¼fl"), 'whisky')

if __name__ == '__main__':
    unittest.main()
