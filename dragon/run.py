from flask import Flask
from flask_cors import CORS

from models import db
from utils import compere
from views import api_bp

app = Flask(__name__)
app.config.from_object("config")
app.register_blueprint(api_bp, url_prefix="")
db.init_app(app)
CORS(app)
