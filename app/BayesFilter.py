from textblob.classifiers import NaiveBayesClassifier 
from flask import Blueprint, jsonify, request
import mongo_bayes_helper as mbh

bayes = Blueprint('bayes', __name__)
training = mbh.MongoBayesHelper()


@bayes.route("/add", methods=['POST'])
def add_data(): 
	if not request.json: 
		abort(400)
	text = request.json['text'].encode("ascii", "ignore")
	label = request.json['label'].encode("ascii", "ignore")
	new_data = {
		"text" : text, 
		"label" : label
	}
	training.insertToRemote(new_data)
	return jsonify({"action": "ADDED"}), 200

class bayesClassifier: 
	
	def __init__(self):
		trainingSet = training.findAll()
		print(trainingSet)
		self.model = NaiveBayesClassifier(trainingSet)

	def clean_data(self, data): 
		for element in data: 
			del element['_id']

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

