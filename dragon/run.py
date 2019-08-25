from flask import Flask
from flask_cors import CORS

from models import db
from views import api_bp
from utils import compere

app = Flask(__name__)
app.config.from_object("config")
app.register_blueprint(api_bp, url_prefix="")
db.init_app(app)
CORS(app)


if __name__ == '__main__':
    compere()
    app.run(debug=True)
