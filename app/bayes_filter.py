from textblob.classifiers import NaiveBayesClassifier 

class bayesClassifier: 
	
	def __init__(self, trainingSet):
		self.model = NaiveBayesClassifier(trainingSet)

	""" Adds new data to the training set
	 and then udpates the model """
	def updateTrainingSet(self, data): 
		self.model.update(data)

	""" Classifies the phrase accordingly based on 
	Bayes model"""
	def classifyPhrase(self, phrase): 
		return self.model.classify(phrase)

	"""Returns the informative features"""
	def getInformativeFeatures(self, numFeatures): 
		return self.model.show_informative_features(numFeatures)
