from flask import Blueprint, render_template

about = Blueprint('about', __name__)

@about.route('/')
def about():
    return render_template('about_us.html')

@about.route('/experiments')
def experiments():
    return render_template('experiments.html')

@about.route('/references')
def references():
    return render_template('references.html')

@about.route('/project')
def about_project():
    return render_template('about_project.html')
