import json 

def createRecipeJSON(title, chef, ingredients, instructions, images, culture, url): 
  recipe_obj = {}

  recipe_obj['title'] = title 
  recipe_obj['chef'] = chef
  recipe_obj['ingredients'] = ingredients
  recipe_obj['instructions'] = instructions
  recipe_obj['images'] = images
  recipe_obj['culture'] = url

  return json.dumps(recipe_obj)