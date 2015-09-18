class Ingredient: 

	def __init__(self, name, info=None, classification=[], types=[], timeframe=[], recipes=[]):
		self.name = name 
                self.info = info

                # classification = the labels that are prescribed by LDA e.g. fruit, vegitable, etc (a string)
                self.classificataion = classification 

                # types = descriptor to a common ingredient e.g. Fuji Apple, Granny Smith Apple, Green Apple (list of types as strings)
                self.types = types

                # timeframe = seasonality of ingredient in months (list of months as strings)
                self.timeframe = timeframe
                
                # recipes = list of strings for the names of the recipes
		self.recipes = recipes 

	def __str__(self): 
		pass
