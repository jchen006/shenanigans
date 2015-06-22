from app import app
from flask import render_template
import json

@app.route('/')
def home():
  return render_template('home.html')
  
@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/d3')
def d3(): 
	return render_template('d3.html')