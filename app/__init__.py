from flask import Flask

app = Flask(__name__)
from app import views
from API import api


app.register_blueprint(api, url_prefix="/api")