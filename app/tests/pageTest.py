#coding: utf-8
import unittest, sys, os
sys.path.append("../")
from pages import *

class pageTest(unittest.TestCase): 

	def test_1(self):
		p = Page()
		self.assertEqual(p.create_recipe_url("Winter Vegetable Colcannon"), "Winter_Vegetable_Colcannon")

	def test_2(self): 
		p = Page()
		self.assertEqual(p.revert_recipe_url("Winter_Vegetable_Colcannon"), "Winter Vegetable Colcannon")

if __name__ == '__main__':
    unittest.main()