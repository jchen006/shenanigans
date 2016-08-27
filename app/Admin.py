from app import lm
from flask import Blueprint, render_template
admin  = Blueprint('admin', __name__)
import mongo_admin_helper as mah
from flask.ext.login import UserMixin, login_required

@admin.route('/admin_form')
def admin_form():
  return render_template('admin/admin_form.html')

@lm.user_loader
def user_loader(user_id):
  return mah.getUser(user_id)

#405 error here i need to find out why the post request is getting rejected
@admin.route('/admin_login')
def login():
  formUser = request.form['userId']
  formPassword = request.form['password']
  print request.form
  admin = mah.getUser(formUser)
  if admin:
    if password == admin.password:
      login_user(admin, remember=True)
      return redirect(url_for("admin.control_panel")) #Flash comment
  return render_template("admin_login.html")

@admin.route('/admin_logout')
def logout():
  logout_user()
  return render_template("admin_login.html")

@admin.route('/control_panel')
@login_required
def control_panel():
	pendingItems = mongo_recipe.findAll()
	print pendingItems
	return render_template('control_panel.html', pendingItems=pendingItems)


#4) Script to create admin user
