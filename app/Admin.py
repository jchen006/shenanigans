from app import lm
from flask import Blueprint, render_template, request #I did not import the request library
admin  = Blueprint('admin', __name__)
import mongo_admin_helper as mah
from flask.ext.login import UserMixin, login_required, login_user

#Ah! My issues is that i need to instant the admin helper object 
#I need to call it on the the class of the file
mongo_admin = mah.AdminMongoHelper('admin')

@admin.route('/admin_signin')
def admin_form():
  return render_template('admin/admin_signin.html')

@lm.user_loader
def user_loader(user_id):
  return mongo_admin.getUser(user_id)

@admin.route('/admin_login', methods=['GET', 'POST'])
def login():
  formUser = request.form['userId']
  formPassword = request.form['password']
  print "request", formUser, formPassword
  admin = mongo_admin.getUser(formUser)
  #Make sure this is seen as empty
  if admin:
    print "object found", admin
    if formPassword == admin[formPassword]:
      #Almost there, the ADMIN object in the DB must have those 
      #Attrbutes, but most of this works

      login_user(admin, remember=True)
      return redirect(url_for("admin.control_panel.html")) #Flash comment
  return render_template("admin/admin_signin.html")

@admin.route('/admin_logout', methods=['GET', 'POST'])
def logout():
  logout_user()
  return render_template("admin_signin.html")

@admin.route('/control_panel')
@login_required
def control_panel():
	pendingItems = mongo_recipe.findAll()
	print pendingItems
	return render_template('admin/control_panel.html', pendingItems=pendingItems)

#4) Script to create admin user
