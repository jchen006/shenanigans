from flask import Blueprint
admin  = Blueprint('admin', __name__)

#Use react for the Admin Page views Route to render admin page view
#Import mongo helper object -

#Import mongo helper JUSt for rendering send an http request else
@admin.route('/control_panel')
def control_panel():
  return render_template('control_panel.html')

#Merge Recipe/Ingredient from Icebox
@admin.route('mergePendingItem')
def merge_pending_item():


#Edit recipe/ingredient from Icebox
@admin.route('/editPendingItem')
def edit_pending_item():


@admin.route('/removePendingItem')
#Remvoe recipe/ingredient from Icebox1
def remove_pending_item():


#Add Item to DB
@admin.route('/addItem')
def add_item():
  ingredient = request.ingredient
  return mh.insertObject({'ingredient': ingredient})

#Edit Item in DB
@admin.route('/editItem')
def edit_item():


#Remove Item in DB
@admin.route('/removeItem')
def remove_item():



