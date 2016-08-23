from flask import Blueprint, render_template
admin  = Blueprint('admin', __name__)
import mongo_submit_helper as msh
mongo_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
#Use react for the Admin Page views Route to render admin page view
#Import mongo helper object -

#Import mongo helper JUSt for rendering send an http request else
@admin.route('/control_panel')
def control_panel():
	pendingItems = mongo_recipe.findAll() 
	print pendingItems
	return render_template('control_panel.html', pendingItems=pendingItems)



'''
#Merge Recipe/Ingredient from Icebox
@admin.route('mergePendingItem')
def merge_pending_item():
    pass

#Edit recipe/ingredient from Icebox
@admin.route('/editPendingItem')
def edit_pending_item():
    pass

@admin.route('/removePendingItem')
#Remvoe recipe/ingredient from Icebox1
def remove_pending_item():
    pass

#Add Item to DB
@admin.route('/addItem')
def add_item():
  ingredient = request.ingredient
  return mh.insertObject({'ingredient': ingredient})

#Edit Item in DB
@admin.route('/editItem')
def edit_item():
    pass

#Remove Item in DB
@admin.route('/removeItem')
def remove_item():
    pass
'''
