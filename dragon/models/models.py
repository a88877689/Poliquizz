from marshmallow import fields
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


ma = Marshmallow()
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(10), nullable=False)

    def __init__(self, data):
        self.set_attributes(data)

    def set_attributes(self, data):
        for key, value in data.items():
            setattr(self, key, value)


class UserSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String(required=True)
    password = fields.String(required=True)
    name = fields.String(required=True)
    lastname = fields.String(required=True)
    role = fields.String(required=True)


class Exam(db.Model):
    __tablename__ = 'exam'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    feedback = db.Column(db.String(1000))

    def __init__(self, data):
        self.set_attributes(data)

    def set_attributes(self, data):
        for key, value in data.items():
            setattr(self, key, value)


class ExamSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String(required=True)
    date = fields.String()
    feedback = fields.String()


class Quizz(db.Model):
    __tablename__ = 'quizz'

    id = db.Column(db.Integer, primary_key=True)
    quizz = db.Column(db.JSON, nullable=False)
    idExam = db.Column(db.Integer,
                       db.ForeignKey(Exam.id, ondelete='CASCADE', onupdate='CASCADE'),
                       nullable=False)

    def __init__(self, data):
        self.set_attributes(data)

    def set_attributes(self, data):
        for key, value in data.items():
            setattr(self, key, value)


class QuizzSchema(ma.Schema):
    id = fields.Integer()
    idExam = fields.Integer(required=True)
    quizz = fields.Dict(required=True)