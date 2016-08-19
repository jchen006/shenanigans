from flask import Flask


shenanigans = Flask(__name__)

from app import views
from API import api
from Admin import admin
from Submit import submit
from About import about

shenanigans.register_blueprint(api, url_prefix="/api")
shenanigans.register_blueprint(admin, url_prefix="/admin")
shenanigans.register_blueprint(submit, url_prefix="/submit")
shenanigans.register_blueprint(about, url_prefix="/about")
