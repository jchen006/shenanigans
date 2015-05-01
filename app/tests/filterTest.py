import unittest
import sys, os

def generate_path():
	def get_parent_dir(directory):
		return os.path.dirname(directory)
	file_path = get_parent_dir(os.getcwd())
	return file_path

sys.path.append(generate_path())
from filterLib import *

class filterTest(unittest.TestCase): 

	def test_basic(self):
		self.assertEqual(filter_ingred("1/2 cups jam, cleaned"), 'jam')

if __name__ == '__main__':
    unittest.main()
