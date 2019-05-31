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


class UserSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String(required=True)
    password = fields.String(required=True)
    name = fields.String(required=True)
    lastname = fields.String(required=True)
    role = fields.String(required=True)