from flask import request
from models import User
from functools import wraps
import jwt


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return { 'message': 'Token is missing' }, 401
        try:
            data = jwt.decode(token, 'thisissecret', algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return { 'message': 'Invalid token' }, 401
        return f(current_user, *args, **kwargs)
    return decorated