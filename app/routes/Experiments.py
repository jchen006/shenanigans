from flask import Blueprint, render_template

experiments = Blueprint('experiments', __name__)


@experiments.route('/radial_network_graph')
def radial_network():
    return render_template('radial_network_graph.html')


@experiments.route('/graph')
def graph():
    return render_template('graph_page.html')


@experiments.route('/ingredient_frequency')
def ing_freq():
    return render_template('ingredient_frequency.html')


@experiments.route('/lda_graph')
def lda_graph():
    return render_template('lda_graph.html')


@experiments.route('/radar_graph')
def radar_graph():
    return render_template('radar_graph.html')


@experiments.route('/recipe_scatterplot')
def recipe_scatterplot():
    return render_template('recipe_scatterplot.html')


@experiments.route('/word_cloud')
def word_cloud():
    return render_template('word_cloud.html')

@experiments.route('/generate_recipe')
def generate_recipe(): 
    items=['Steph', 'KD']
    return render_template('generate_recipe.html', n=5)