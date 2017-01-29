from flask import Blueprint, render_template

about = Blueprint('about', __name__)


@about.route('/')
def about_us():
    return render_template('about_us.html')


@about.route('/references')
def about_references():
    return render_template('references.html')


@about.route('/project')
def about_project():
    return render_template('about_project.html')


@about.route('/experiments')
def about_experiments():
    return render_template('experiments.html')
