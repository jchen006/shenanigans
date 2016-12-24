from settings import APP_ROOT, BASE_DIR
import os

"""
Seasons Parser will have more than one dataset (most likely) that will be cross referenced and may have location tag of 
where the seasons are defined. 

"""
seasons_dir = '/seasons'

class Seasons_Parser: 


	def getDirectoryList(self): 
		directory_list = []
		for dirName, subdirList, fileList in os.walk(BASE_DIR + seasons_dir): 
			print subdirList
			print dirName
   			for fname in fileList:
   				if(fname != "DS_Store"):
   					directory_list.append(dirName + "/" + fname)
   		return directory_list

	def read_through_file(self, directory): 
		ingredient = self.getIngredients(directory)
		month = ingredient[0]
		ingredient.remove(month)
		return month, ingredient

	def consolidate_data(self): 
		pass

	def generate_dictionary(self):
		"""Dictionary strucutre will be the following....
		"name" : {
			"classification' : "",
			"info": "",
			"types", "",
			"timeframe", "Location1" : {"Month start", "Month end"}, 
						"Location2": {"Month start", "Month end"}
			'recipes": "'
		
		"""
		month_to_ingredient = {}
		directories = self.getDirectoryList()
		directories.remove("/Users/jchen9/Documents/personal_workspace/shenanigans/seasons/.DS_Store")
		print(directories)
		for d in directories:
			month, ingredient = self.read_through_file(d)
			month_to_ingredient[month] = ingredient

		print month_to_ingredient

	def getLines(self, directory): 
		seasonal_ingredients = []
		with open(directory) as f: 
			for line in f:
				seasonal_ingredients.append(line.replace("\n", ""))
		return seasonal_ingredients


if __name__=="__main__": 
	s = Seasons_Parser()
	s.generate_dictionary()


