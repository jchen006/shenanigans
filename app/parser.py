from filters import * 
from mongoHelper import *
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

    def __init__(self, file_path=None, name="", url="", chef="", ingredients=[]): 
        self.file_path = file_path
        self.name = name
        self.url = url
        self.chef = chef
        self.ingredients = ingredients

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
            self.ingredients.append(filter_key_ingred(i))
            #self.ingredients.append(i)
        self.data = Data(self.url, self.chef, self.ingredients) 

    def get_data(self): 
        return self.data

class Parser: 

    # with open(url_for('static', filename='bmidata.txt')) as f:

    def __init__(self): 
        self.recipes = {}
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
                r = Recipe(self.recipe_path + file_name)
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
                r = Recipe(temp)
                r.parse_ingredients()
                self.recipes[r.name] = r.data
                
                temp_json = {"name": r.name, "url": r.url, "chef":r.chef, "ingredients":r.ingredients}
                res = self.mongo.findByJson({"name":r.name, "url":r.url, "chef":r.chef})
                if len(res) == 0:
                    self.mongo.insertToRemote(temp_json)
                
    def json_to_recipe(self, temp_dict):
        rp = Recipe(None, temp_dict["name"], temp_dict["url"], temp_dict["chef"], temp_dict["ingredients"])
        return rp

    def retrieve_data(self):
        print "Retrieving from Mongo"
        jsons = self.mongo.findAll()
        for j in jsons:
            self.recipes[j["name"]] = self.json_to_recipe(j)

def main():
    p = Parser()
    #p.convert_data()
    p.retrieve_data()
    #p.pickle_data()

if __name__=="__main__": 
    main()
