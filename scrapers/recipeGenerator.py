import os

class Recipe_Generator: 

	def generate_file_name(self, name): 
		title = name.replace(" ", "_")
		title = title.replace("-", "_")
		self.file_name = title + ".txt"
		return self.generate_path() + self.file_name

	def write_to_text(self, name, recipe_url, recipe_ingred, recipe_instruct, chef=None): 
		print "Writing to a text file"
		file_name = self.generate_file_name(name)
		text_file = open(file_name, "w")
		text_file.write(name + "\n")
		text_file.write(recipe_url + "\n")
		if chef is not None: 
			text_file.write(chef + "\n")

		text_file.write("Ingredients \n")
	
		for i in recipe_ingred: 
			text_file.write(i + "\n")

		text_file.write("Instructions \n")
		for i in recipe_instruct: 
			text_file.write(i + "\n")

		text_file.close()

	def generate_path(self):
		def get_parent_dir(directory):
			return os.path.dirname(directory)
		file_path = get_parent_dir(os.getcwd()) + "/recipes/"
		return file_path
