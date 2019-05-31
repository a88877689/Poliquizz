from flask import Blueprint
from flask_restplus import Api
from resources import AuthResource
from resources import UserResource
from resources import ExamResource
from resources import QuizzResource


api_bp = Blueprint('dragon', __name__)
api = Api(api_bp)


api.add_resource(AuthResource, '/login')
api.add_resource(UserResource, '/user')
api.add_resource(UserResource, '/user/<id>')
api.add_resource(ExamResource, '/exam')
api.add_resource(ExamResource, '/exam/<id>')
api.add_resource(QuizzResource, '/quizz')
api.add_resource(QuizzResource, '/quizz/<id>')