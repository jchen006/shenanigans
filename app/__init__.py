from flask import Flask
from flask.ext.login import LoginManager
shenanigans = Flask(__name__)
lm = LoginManager()
lm.init_app(shenanigans)

import load_app_dir
load_app_dir.add_app_dir()
import app

from app.routes import views
from app.routes.API import api
from app.routes.Admin import admin
from app.routes.Submit import submit
from app.routes.About import about
from app.routes.Experiments import experiments
from app.routes.TestSandbox import test
from app.routes.Database import db
from app.analytics.BayesFilter import bayes


shenanigans.register_blueprint(api, url_prefix="/api")
shenanigans.register_blueprint(admin, url_prefix="/admin")
shenanigans.register_blueprint(submit, url_prefix="/submit")
shenanigans.register_blueprint(about, url_prefix="/about")
shenanigans.register_blueprint(experiments, url_prefix="/experiments")
shenanigans.register_blueprint(test, url_prefix="/test")
shenanigans.register_blueprint(db, url_prefix="/db")
shenanigans.register_blueprint(bayes, url_prefix="/bayes")
