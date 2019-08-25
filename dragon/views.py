from flask import Blueprint
from flask_restplus import Api

from resources import (
    AuthResource,
    ExamResource,
    QuizzResource,
    UserResource,
    XMLResource,
)

api_bp = Blueprint("dragon", __name__)
api = Api(api_bp)


api.add_resource(AuthResource, "/auth")
api.add_resource(UserResource, "/user")
api.add_resource(UserResource, "/user/<id>")
api.add_resource(ExamResource, "/exam")
api.add_resource(ExamResource, "/exam/<id>")
api.add_resource(QuizzResource, "/quizz")
api.add_resource(QuizzResource, "/quizz/<id>")
api.add_resource(XMLResource, "/xml/<id>")
