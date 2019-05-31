from flask import Flask
from flask_cors import CORS
from app import api_bp
from models.models import db
from utils.compere import compere


def dragon(config_filename: str):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.register_blueprint(api_bp, url_prefix='')
    db.init_app(app)
    CORS(app)
    return app


if __name__ == '__main__':
    app = dragon('config')
    compere()
    app.run(debug=True)