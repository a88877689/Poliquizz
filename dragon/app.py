from flask import Blueprint
from flask_restplus import Api
from resources.user import UserResource


api_bp = Blueprint('dragon', __name__)
api = Api(api_bp)


api.add_resource(UserResource, '/user')
api.add_resource(UserResource, '/user/<id>')