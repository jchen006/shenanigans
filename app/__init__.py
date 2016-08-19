from flask import Flask
from app import views
from API import api
from Admin import admin
from Submit import submit
from About import about

app = Flask(__name__)

app.register_blueprint(api, url_prefix="/api")
app.register_blueprint(admin, url_prefix="/admin")
app.register_blueprint(submit, url_prefix="/submit")
app.register_blueprint(about, url_prefix="/about")
