import unittest, sys, os
sys.path.append("../")
from bayes_filter import * 

class bayesFilterTest(unittest.TestCase): 

	def test_classifyPhrase(self): 
  		test_data = [
			('I love this sandwich.', 'pos'),
			('this is an amazing place!', 'pos'),
			('I feel very good about these beers.', 'pos'),
			('this is my best work.', 'pos'),
			("what an awesome view", 'pos'),
			('I do not like this restaurant', 'neg'),
			('I am tired of this stuff.', 'neg'),
			("I can't deal with this", 'neg'),
			('he is my sworn enemy!', 'neg'),
			('my boss is horrible.', 'neg')
 		]
 		cl = bayesClassifier(test_data)
 		test_response = cl.classifyPhrase("The beer is good. But the hangover is horrible.")
 		self.assertEqual(test_response, "pos")

 	def test_accuracy(self): 
 		test_data = [
			('I love this sandwich.', 'pos'),
			('this is an amazing place!', 'pos'),
			('I feel very good about these beers.', 'pos'),
			('this is my best work.', 'pos'),
			("what an awesome view", 'pos'),
			('I do not like this restaurant', 'neg'),
			('I am tired of this stuff.', 'neg'),
			("I can't deal with this", 'neg'),
			('he is my sworn enemy!', 'neg'),
			('my boss is horrible.', 'neg')
 		]
 		cl = bayesClassifier(test_data)
 		test = [
    		('the beer was good.', 'pos'),
			('I do not enjoy my job', 'neg'),
			("I ain't feeling dandy today.", 'neg'),
			("I feel amazing!", 'pos'),
			('Gary is a friend of mine.', 'pos'),
			("I can't believe I'm doing this.", 'neg')
		]
 		self.assertEqual(cl.model.accuracy(test), 0.8333333333333334)


 	def test_updateTrainingSet(self): 
 		test_data = [
			('I love this sandwich.', 'pos'),
			('this is an amazing place!', 'pos'),
			('I feel very good about these beers.', 'pos'),
			('this is my best work.', 'pos'),
			("what an awesome view", 'pos'),
			('I do not like this restaurant', 'neg'),
			('I am tired of this stuff.', 'neg'),
			("I can't deal with this", 'neg'),
			('he is my sworn enemy!', 'neg'),
			('my boss is horrible.', 'neg')
 		]
 		cl = bayesClassifier(test_data)
 		test = [
    		('the beer was good.', 'neg'),
			('I do not enjoy my job', 'neg'),
			("I ain't feeling dandy today.", 'neg'),
			("I feel amazing!", 'pos'),
			('Gary is a friend of mine.', 'pos'),
			("I can't believe I'm doing this.", 'neg')
		]
 		cl.updateTrainingSet(test)
 		test_response = cl.classifyPhrase("The beer is good. But the hangover is horrible.")
 		self.assertEqual(test_response, "neg")




if __name__=='__main__': 
	unittest.main()