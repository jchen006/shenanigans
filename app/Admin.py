from flask import Blueprint, render_template
admin  = Blueprint('admin', __name__)
import mongo_submit_helper as msh
mongo_recipe = msh.SubmitMongoHelper('pending_recipe_collection')
from flask.ext.login import LoginManager, UserMixin, login_required


#https://realpython.com/blog/python/using-flask-login-for-user-management-with-flask/
#1) Admin User Class - With Mongo DB - Add a new collection

#2)  User Loader

#3) Login and logout


@admin.route('/admin_login')
def admin_login():
    return render_template('admin_login.html')

#4) Control Panel Endpoint
@admin.route('/control_panel')
def control_panel():
	pendingItems = mongo_recipe.findAll()
	print pendingItems
	return render_template('control_panel.html', pendingItems=pendingItems)

#4) Script to create admin user

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
