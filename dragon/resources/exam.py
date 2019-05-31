from flask import request
from flask_restplus import Resource
from models import ExamSchema
from models import Exam
from models import User
from models import db
from utils import token_required
from datetime import datetime
from typing import Union


exams_schema = ExamSchema(many=True)
exam_schema = ExamSchema()


class ExamResource(Resource):
    @token_required
    def get(self, current_user: User, id: Union[str, None] = None):
        if not id:
            exams = Exam.query.all()
            exams = exams_schema.dump(exams).data
            return { 'message': 'Exams found!', 'exams': exams }, 200
        exam = Exam.query.filter_by(id=id).first()
        if not exam:
            return { 'message': 'Exam does not exist' }, 400
        exam = exam_schema.dump(exam).data
        return { 'message': 'Exam found!', 'exam': exam }, 200

    @token_required
    def post(self, current_user: User):
        json = request.get_json(force=True)
        data, errors = exam_schema.load(json)
        if errors:
            return errors, 422
        exam = Exam.query.filter_by(name=data['name']).first()
        if exam:
            return { 'message': f'Exam name "{exam.name}" already exists' }, 400
        data['date'] = datetime.now().strftime('%b %d, %Y')
        exam = Exam(data)
        db.session.add(exam)
        db.session.commit()
        exam = exam_schema.dump(exam).data
        return { 'message': 'Exam succesfully created', 'exam': exam }, 201

    @token_required
    def put(self, current_user: User, id: str):
        exam = Exam.query.filter_by(id=id).first()
        if not exam:
            return { 'message': 'Exam does not exist' }, 400
        json = request.get_json(force=True)
        data, errors = exam_schema.load(json)
        if errors:
            return errors, 422
        exam.set_attributes(data)
        db.session.commit()
        exam = exam_schema.dump(exam).data
        return { 'message': 'Exam succesfully updated', 'exam': exam }, 200

    @token_required
    def delete(self, current_user: User, id: str):
        exam = Exam.query.filter_by(id=id).delete()
        if not exam:
            return { 'message': 'Exam does not exists' }, 400
        db.session.commit()
        return { 'message': 'Exam succesfully deleted' }, 200