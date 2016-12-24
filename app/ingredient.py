from Seasons_Parser import Seasons_Parser

class Ingredient:

    def __init__(self, name, group_name=None, info=None, classification=None, types=None, timeframe=None, recipes=None):
        self.name = name

        #will be aggregated and scraped from elsewhere
        self.info = info

        # classification = the labels that are prescribed by LDA e.g. fruit,
        # vegetable, etc (a string)
        self.classification = classification

        # types = descriptor to a common ingredient e.g. Fuji Apple, Granny
        # Smith Apple, Green Apple (list of types as strings)
        self.types = types

        # timeframe = seasonality of ingredient in months (list of months as
        # strings)
        self.timeframe = timeframe 

        # recipes = list of strings for the names of the recipes
        self.recipes = recipes


class IngredientDB: 

    def generateDB(self, order_ingredients): 
        pass 

    def searchDB(ingredient): 
        pass

    def checkSeasonality(time): 
        pass

    def checkLabels(ingredient): 
        pass

    months_mappsings = {
        "January" : 1,
        "Feburary" : 2,
        "March" : 3, 
        "April" : 4, 
        "May" : 5, 
        "June" : 6, 
        "July" : 7, 
        "August": 8, 
        "September": 9, 
        "October": 10, 
        "November": 11, 
        "December" : 12
    }




    def pullFromMongo(): 
        """Pulls from Mongo first 
        Starts taking all the recipes and keeping a dictionary of ingredients mapped to recipes they are in 
        Will also do the same with seasonality lists 
        Will also do the same with the ingredinets labels 
        """ 
        pass




if __name__ == "__main__":
    x = Ingredient("buttercake crackers")
