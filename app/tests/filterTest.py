# coding: utf-8
import unittest, sys, os

def generate_path():
	def get_parent_dir(directory):
		return os.path.dirname(directory)
	file_path = get_parent_dir(os.getcwd())
	return file_path

sys.path.append(generate_path())
from filterLibrary import filter_ingred, strip_accents, change_to_singular

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

	def test_9(self):
		self.assertEqual(strip_accents(u"35ml/1Â¼fl"), '')

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
		self.assertEqual(change_to_singular("kalonji (black onion) seeds or nigella seeds"), "kalonji (black onion) seeds nigella seeds")
	

if __name__ == '__main__':
    unittest.main()
