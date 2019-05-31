from flask import request
from flask_restplus import Resource
from models import QuizzSchema
from models import Quizz
from models import User
from models import db
from utils import token_required
from typing import Union


quizzes_schema = QuizzSchema(many=True)
quizz_schema = QuizzSchema()


class QuizzResource(Resource):
    @token_required
    def get(self, current_user: User, id: Union[str, None] = None):
        if not id:
            quizzes = Quizz.query.all()
            if not quizzes:
                return { 'message': 'You have no quizzes, create one!' }, 404
            quizzes = quizzes_schema.dump(quizzes).data
            return { 'message': 'Quizzes found!', 'quizzes': quizzes }, 200
        quizz = Quizz.query.filter_by(id=id).first()
        if not quizz:
            return { 'message': 'Quizz does not exist' }, 400
        quizz = quizz_schema.dump(quizz).data
        return { 'message': 'Quizz found!', 'quizz': quizz }, 200

    @token_required
    def post(self, current_user: User):
        json = request.get_json(force=True)
        data, errors = quizz_schema.load(json)
        if errors:
            return errors, 422
        quizz = Quizz(data)
        db.session.add(quizz)
        db.session.commit()
        quizz = quizz_schema.dump(quizz).data
        return { 'message': 'Quizz succesfully created', 'quizz': quizz }, 201

    @token_required
    def put(self, current_user: User, id: str):
        quizz = Quizz.query.filter_by(id=id).first()
        if not quizz:
            return { 'message': 'Quizz does not exist' }, 400
        json = request.get_json(force=True)
        json['idExam'] = quizz.idExam
        data, errors = quizz_schema.load(json)
        if errors:
            return errors, 422
        quizz.set_attributes(data)
        db.session.commit()
        quizz = quizz_schema.dump(quizz).data
        return { 'message': 'Quizz succesfully updated', 'quizz': quizz }, 200

    @token_required
    def delete(self, current_user: User, id: str):
        quizz = Quizz.query.filter_by(id=id).delete()
        if not quizz:
            return { 'message': 'Quizz does not exists' }, 400
        db.session.commit()
        return { 'message': 'Quizz succesfully deleted' }, 200