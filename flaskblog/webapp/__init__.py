from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__, static_folder="static", static_url_path='/')
api = Api(app)

app.config['SECRET_KEY'] = 'MOBSMOHAMMEDSECRETKEYWEBAPP'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mobilia.webapp'
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static')
Dbs = SQLAlchemy(app)
