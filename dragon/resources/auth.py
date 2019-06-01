from flask import request
from flask_restplus import Resource
from models.models import User
from utils import encode
from utils import check
import jwt


class AuthResource(Resource):
    def post(self):
        data = request.get_json()
        if not data or not data['username'] or not data['password']:
            return { 'message': 'Invalid credentials!' }, 401
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return { 'message': 'Invalid credentials!' }, 401
        if not check(user.password, data['password']):
            return { 'message': 'Invalid credentials!' }, 401
        token = jwt.encode({ 'id': user.id }, 'thisissecret', algorithm='HS256')
        user = { 'name': user.name, 'lastname': user.lastname, 'role': user.role }
        return { 'message': 'Welcome!', 'token': token.decode('UTF-8'), 'user': user }, 200