class Ingredient:

    def __init__(self, name, group_name=None, info=None, classification=None, types=None, timeframe=None, recipes=None):
        self.name = name
        self.info = info

        # classification = the labels that are prescribed by LDA e.g. fruit,
        # vegitable, etc (a string)
        self.classification = classification

        # types = descriptor to a common ingredient e.g. Fuji Apple, Granny
        # Smith Apple, Green Apple (list of types as strings)
        self.types = types

        # timeframe = seasonality of ingredient in months (list of months as
        # strings)
        self.timeframe = timeframe

        self.recipes = recipes

        # recipes = list of strings for the names of the recipes
        # self._recipes = None

    # @property
    # def recipes(self):
    #     if self._recipes:
    #         return self._recipes
    #     else:
    #         # Search entire DB for all other recipes containing ingredient
    #         # ...
    #         # Update the class cache!
    #         self._recipes = None
    #         pass

if __name__ == "__main__":
    x = Ingredient("buttercake crackers")
