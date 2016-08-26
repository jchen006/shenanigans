from flask import Flask
shenanigans = Flask(__name__)

from app import views
from API import api
from Admin import admin
from Submit import submit
from About import about
from Experiments import experiments
from TestSandbox import test
from Database import db

shenanigans.register_blueprint(api, url_prefix="/api")
shenanigans.register_blueprint(admin, url_prefix="/admin")
shenanigans.register_blueprint(submit, url_prefix="/submit")
shenanigans.register_blueprint(about, url_prefix="/about")
shenanigans.register_blueprint(experiments, url_prefix="/experiments")
shenanigans.register_blueprint(test, url_prefix="/test")
shenanigans.register_blueprint(db, url_prefix="/db")
