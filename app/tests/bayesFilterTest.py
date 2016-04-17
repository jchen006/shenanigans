import unittest, sys, os
sys.path.append("../")
from bayes_filter import * 

class bayesFilterTest(unittest.TestCase): 

	test_data = [
    		('I love this sandwich.', 'pos'),
    		('This is an amazing place!', 'pos'),
    		('I feel very good about these beers.', 'pos'),
    		('This is my best work.', 'pos'),
    		("What an awesome view", 'pos'),
    		('I do not like this restaurant', 'neg'),
    		('I am tired of this stuff.', 'neg'),
    		("I can't deal with this", 'neg'),
    		('He is my sworn enemy!', 'neg'),
    		('My boss is horrible.', 'neg')
		]
	cl = bayesClassifier(test_data)

	def classifyPhraseTest(self): 

		test = cl.classifyPhrase("Their burgers are amazing")
		test_2 = cl.classifyPhrase("I don't like their pizza.")
		self.assertEqual(test, "pos")
		self.assertEqual(test_2, "neg")

	def checkAccuracy(self): 
		pass

	def updateTrainingTest(self): 
		pass


if __name__=='__main__': 
	unittest.main()