from flask import Flask

app = Flask(__name__)
from app import views
from API import api
from Admin import admin
from Submit import submit

app.register_blueprint(api, url_prefix="/api")
app.register_blueprint(admin, url_prefix="/admin")
app.register_blueprint(submit, url_prefix="/submit")

app.register_blueprint(api, url_prefix="/api")
