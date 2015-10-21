from filters import * 
from mongo_helper import *
import collections as c
import pickle, os, tempfile, random, logging, json
from settings import *


Data = c.namedtuple("Data", "url chef ingredients")
""" Call to the URL will look like... p.recipes['Lemony pork with French beans'].url
    Call to the chef will look like... p.recipes['Lemony pork with French beans'].chef
    Call to the ingredients will look like... p.recipes['Lemony pork with French beans'].ingredients
    """

# logging.basicConfig(filename = '/log/general.log', level=logging.DEBUG)

class Recipe: 

    def __init__(self, file_path=None, name=None, url=None, chef=None, ingredients=None):
        self.file_path = file_path
        self.name = name
        self.url = url
        self.chef = chef
        self.ingredients = ingredients
        self.filter_obj = Filter()

    def parse_ingredients(self): 
        temp = []
        with open(self.file_path,'r') as recipe:       
            for r in recipe:
                temp.append(r.strip())
        cut = temp.index("Instructions")
        temp = temp[:cut]
        temp.remove("Ingredients")
        self.name = temp.pop(0)
        self.url = temp.pop(0)
        self.chef = temp.pop(0) 
        for i in temp: 
            #Where filters happen
            ingred = self.filter_obj.filter_key_ingred(i)
            if type(ingred) is list or type(ingred) is tuple:
                for sub_in in ingred:
                    self.ingredients.append(sub_in)
            else:
                self.ingredients.append(ingred)
        print self.ingredients
        self.data = Data(self.url, self.chef, self.ingredients) 

    def get_data(self): 
        return self.data

class Parser: 

    # with open(url_for('static', filename='bmidata.txt')) as f:

    def __init__(self): 
        self.recipes = {}
        self.all_ingredients = set()
        self.recipe_path = "../recipes/"
        self.data_path = "../data/"
        self.mongo = MongoHelper()

    def picking(self): 
        print "Picking"
        
        num_files = len([f for f in os.listdir(self.recipe_path)if os.path.isfile(os.path.join(self.recipe_path, f))])
        logging.info("Total number of recipes: " + str(num_files))

        if DATA_SET: 

            logging.info("Using dataset of " + str(DATA_SET) + " to convert to graph")

            for i in range(0, DATA_SIZE): 
                file_name = random.choice(os.listdir(self.recipe_path)) 
                r = Recipe(self.recipe_path + file_name, ingredients = [])
                r.parse_ingredients()
                self.recipes[r.name] = Recipe(None, r.name)
        else: 
            
            logging.info("Using dataset of " + str(num_files) + " to convert to graph")
            self.convert_data()

    def convert_data(self): 
        print "Converting data"
        src = os.path.join(APP_ROOT, 'tmp')
        for i in os.listdir(src):
            if i.endswith(".txt"): 
                temp = src + "/" + i
                new_list = []
                r = Recipe(temp, ingredients = new_list)
                r.parse_ingredients()
                self.all_ingredients = self.all_ingredients.union(r.ingredients)
                #for ing in r.ingredients:
                #    if(ing is not in self.all_ingredients):
                #        self.all_ingredients[ing] = True
                ## Check for duplicates right now
                #for ing_str in r.ingredients:
                #    for stored_ing in self.all_ingredients.keys():
                #        if ing_str in stored_ing:
                #            # if the ingredient to add is a substring of a stored ingredient then we replace that stored ingredient
                #            # TODO: THIS ELIMINTES LABELS FOR INGREDIENTS e.g. FUJI APPLE AND GREEN APPLE BECOME APPLE
                #            # Consider having the Dictionary of All Ingredients have Keys as the singularized, consolodiated form
                #            #and the values as a list of variants e.g. all_ingredients["apple"] = ["fuji", "green", "granny smith"]
                #            # TODO: WE ALSO NEED TO CHECK THE ORDER OF THE ADDITIONS e.g. if "lemon" is parsed first, "lemon zest" won't be a substring of "lemon" (but the inverse is true)
                #            #self.all_ingredients[stored_ing] = ing_str
                #            self.all_ingredients[]

                self.recipes[r.name] = r.data
                
                temp_json = {"name": r.name, "url": r.url, "chef":r.chef, "ingredients":r.ingredients}
                res = self.mongo.findByJson({"name":r.name, "url":r.url, "chef":r.chef})
                if len(res) == 0:
                    self.mongo.insertToRemote(temp_json)
        #self.all_ingredients = check_duplicates(self.ingredients)
        #for recipe_name, recipe_val in self.recipes.items():
        #    recipe_val.ingredients = filter_ingredients(recipe_val.ingredients, self.ingredients)

        # TODO: add to recipes, and json / mongo logic
                
    def json_to_recipe(self, mongo_json_dict):
        rp = Recipe(None, mongo_json_dict["name"], mongo_json_dict["url"], mongo_json_dict["chef"], mongo_json_dict["ingredients"])
        return rp

    # CHANGE for j in jsons[:20] to only get 20 recipes
    def retrieve_data(self):
        print "Retrieving from Mongo"
        jsons = self.mongo.findAll()
        for j in jsons:
            self.recipes[j["name"]] = self.json_to_recipe(j)

def main():
    p = Parser()
    p.convert_data()
    #p.retrieve_data()
    #p.pickle_data()

if __name__=="__main__": 
    main()
