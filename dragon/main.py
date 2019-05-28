from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/lightning'

db = SQLAlchemy(app)
CORS(app)


###########################################


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))
    name = db.Column(db.String(50))
    lastname = db.Column(db.String(50))


class Exam(db.Model):
    __tablename__ = 'exam'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    date = db.Column(db.Date)
    feedback = db.Column(db.String(10000))


###########################################


from flask import request
from flask import jsonify
from flask import make_response
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from typing import Dict
from typing import List
from functools import wraps
from typing import Union
import jwt


###########################################


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token: Union[str, None] = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({ 'message': 'Token is missing' }), 401
        try:
            data: Dict = jwt.decode(token,
                                    app.config['SECRET_KEY'],
                                    algorithms=['HS256'])
            current_user: User = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({ 'message': 'Invalid token' }), 401
        return f(current_user, *args, **kwargs)
    return decorated


###########################################


@app.route('/user/me', methods=['GET'])
@token_required
def get_user_me(current_user):
    response: Dict = {}
    response['username'] = current_user.username
    response['name'] = current_user.name
    response['lastname'] = current_user.lastname
    return jsonify({ "me": response })

@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    users: List = User.query.all()
    response: List = []
    for user in users:
        temp: Dict = {}
        temp['id'] = user.id
        temp['username'] = user.username
        temp['password'] = user.password
        temp['name'] = user.name
        temp['lastname'] = user.lastname
        response.append(temp)
    return jsonify({ 'message': 'Users found', 'users': response })


@app.route('/user/<id>', methods=['GET'])
@token_required
def get_user(current_user, id):
    user: Union[User, None] = User.query.filter_by(id=id).first()
    if user:
        response: Dict = {}
        response['id'] = user.id
        response['username'] = user.username
        response['password'] = user.password
        response['name'] = user.name
        response['lastname'] = user.lastname
        return jsonify({ 'message': 'User found', 'user': response })
    return jsonify({ 'message': 'User not found' })


@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    data: Dict = request.get_json()
    hashed_password: str = generate_password_hash(data['password'],
                                                  method='sha256')
    user: User = User(username=data['username'],
                      password=hashed_password,
                      name=data['name'],
                      lastname=data['lastname'])
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'message': 'User succesfully created' })


@app.route('/user/<id>', methods=['PUT'])
@token_required
def update_user(current_user, id):
    data: Dict = request.get_json()
    user: Union[User, None] = User.query.filter_by(id=id).first()
    if user:
        hashed_password: str = generate_password_hash(data['password'],
                                                      method='sha256')
        user.username = data['username']
        user.password = hashed_password
        user.name = data['name']
        user.lastname = data['lastname']
        db.session.commit()
        return jsonify({ 'message': 'The user has been updated' })
    return jsonify({ 'message': 'User not found' })


@app.route('/user/<id>', methods=['DELETE'])
@token_required
def delete_user(current_user, id):
    user: Union[User, None] = User.query.filter_by(id=id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({ 'message': 'User deleted succesfully' })
    return jsonify({ 'message': 'User not found' })


###########################################


@app.route('/login', methods=['GET', 'POST'])
def login():
    auth: Union[Dict, None] = request.get_json()
    if not auth or not auth['username'] or not auth['password']:
        return jsonify({ 'message': 'Invalid credentials' }), 401
    user: Union[User, None] = User.query.filter_by(username=auth['username']).first()
    if not user:
        return jsonify({ 'message': 'Invalid credentials' }), 401
    if check_password_hash(user.password, auth['password']):
        token: str = jwt.encode({ 'id': user.id },
                                app.config['SECRET_KEY'],
                                algorithm='HS256')
        return jsonify({ 'message': 'Welcome!', 'token': token.decode('UTF-8') })
    return jsonify({ 'message': 'Invalid credentials' }), 401



###########################################


@app.route('/exam', methods=['GET'])
@token_required
def get_all_exams(current_user):
    exams: List = Exam.query.all()
    response: List = []
    for exam in exams:
        temp: Dict = {}
        temp['id'] = exam.id
        temp['name'] = exam.name
        temp['date'] = exam.date
        temp['feedback'] = exam.feedback
        response.append(temp)
    if not response:
        return jsonify({ 'message': 'You have no exams, create one.', 'exams': response })
    return jsonify({ 'message': 'Exams found', 'exams': response })

@app.route('/exam/<id>', methods=['GET'])
@token_required
def get_exam(current_user, id):
    exam: Union[Exam, None] = Exam.query.filter_by(id=id).first()
    if exam:
        response: Dict = {}
        response['id'] = exam.id
        response['name'] = exam.name
        response['feedback'] = exam.feedback
        return jsonify({ 'message': 'Exam found', 'exam': response })
    return jsonify({ 'message': 'Exam not found' })

@app.route('/exam', methods=['POST'])
@token_required
def create_exam(current_user):
    data: Dict = request.get_json()
    date: str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(date)
    exam: Exam = Exam(name=data['name'],
                      date=date,
                      feedback=data['feedback'])
    db.session.add(exam)
    db.session.commit()

    exam: Union[Exam, None] = Exam.query.filter_by(name=data['name']).first()
    id_exam = exam.id
    return jsonify({ 'message': 'Exam succesfully created', 'id': id_exam })


@app.route('/exam/<id>', methods=['DELETE'])
@token_required
def delete_exam(current_user, id):
    exam: Union[Exam, None] = Exam.query.filter_by(id=id).first()
    if exam:
        db.session.delete(exam)
        db.session.commit()
        return jsonify({ 'message': 'Exam deleted succesfully' })
    return jsonify({ 'message': 'Exam not found' })


if __name__ == '__main__':
    app.run(debug=True)