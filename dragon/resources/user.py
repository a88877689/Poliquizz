from flask import request
from flask_restplus import Resource
from models.models import UserSchema
from models.models import User
from models.models import db
from utils import token_required
from utils import encode
from typing import Union
import jwt


users_schema = UserSchema(many=True)
user_schema = UserSchema()


class UserResource(Resource):
    @token_required
    def get(self, current_user: User, id: Union[str, None] = None):
        if not id:
            users = User.query.all()
            users = users_schema.dump(users).data
            return { 'message': 'Users found', 'users': users }, 200
        if id == 'me':
            # TODO: get currect user in function attributes.
            token = request.headers['x-access-token']
            data = jwt.decode(token, 'thisissecret', algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['id']).first()
            response = { 'name': current_user.name, 'lastname': current_user.lastname }
            return { 'message': f'Current user found', 'user': response }, 200 
        user = User.query.filter_by(id=id).first()
        if not user:
            return { 'message': 'User does not exist' }, 404
        user = user_schema.dump(user).data
        return { 'message': 'User found', 'user': user }, 200

    @token_required
    def post(self, current_user: User):
        json = request.get_json(force=True)
        data, errors = user_schema.load(json)
        if errors:
            return errors, 422
        user = User.query.filter_by(username=data['username']).first()
        if user:
            return { 'message': f'Username "{user.username}" already exists' }, 400
        data['password'] = encode(data['password'])
        user = User(data)
        db.session.add(user)
        db.session.commit()
        user = user_schema.dump(user).data
        return { 'message': 'User succesfully created', 'user': user }, 201

    @token_required
    def put(self, current_user: User, id: str):
        user = User.query.filter_by(id=id).first()
        if not user:
            return { 'message': 'User does not exists' }, 400
        json = request.get_json(force=True)
        json['password'] = encode(json['password']) if 'password' in json else user.password
        data, errors = user_schema.load(json)
        if errors:
            return errors, 422
        user.set_attributes(data)
        db.session.commit()
        user = user_schema.dump(user).data
        return { 'message': 'User succesfully updated', 'user': user }, 200

    @token_required
    def delete(self, current_user: User, id: str):
        user = User.query.filter_by(id=id).delete()
        if not user:
            return { 'message': 'User does not exists' }, 400
        db.session.commit()
        return { 'message': 'User succesfully deleted' }, 200
        