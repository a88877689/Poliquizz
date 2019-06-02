from flask import request
from flask import send_file
from flask_restplus import Resource
from models.models import Exam
from models.models import ExamSchema
from models.models import Quizz
from models.models import QuizzSchema
from utils import xml_resource


exam_schema = ExamSchema()
quizzes_schema = QuizzSchema(many=True)


class XMLResource(Resource):
    def get(self, id: str):
        exam = Exam.query.filter_by(id=id).first()
        exam = exam_schema.dump(exam).data
        quizzes = Quizz.query.filter_by(idExam=exam['id'])
        quizzes = quizzes_schema.dump(quizzes).data
        filedir = xml_resource(exam=exam, quizzes=quizzes)
        return send_file(filedir, as_attachment=True)
