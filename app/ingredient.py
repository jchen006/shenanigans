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

if __name__ == "__main__":
    x = Ingredient("buttercake crackers")
