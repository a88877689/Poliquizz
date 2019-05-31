from flask import request
from flask import jsonify
from flask_restplus import Resource
from models.models import db
from models.models import User
from models.models import UserSchema
from typing import Union
from typing import Dict
from utils.password import encode


users_schema = UserSchema(many=True)
user_schema = UserSchema()


class UserResource(Resource):
    def get(self, id: Union[int, None] = None):
        pass

    def post(self):
        json = request.get_json(force=True)
        data, errors = user_schema.load(json)
        if errors:
            return errors, 422
        user = User.query.filter_by(username=data['username']).first()
        if user:
            return { 'message': 'Username already exists' }, 400
        user: User = User(
            username=data['username'],
            password=encode(data['password']),
            name=data['name'],
            lastname=data['lastname'],
            role=data['role']
        )
        db.session.add(user)
        db.session.commit()
        result = user_schema.dump(user).data
        return jsonify({ 'message': 'User succesfully created', data: result }), 201
        
    def put(self, id: Union[int, None]):
        pass

    def delete(self, id: Union[int, None]):
        pass