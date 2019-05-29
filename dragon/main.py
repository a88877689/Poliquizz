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
    role = db.Column(db.String(10))


class Exam(db.Model):
    __tablename__ = 'exam'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    date = db.Column(db.Date)
    feedback = db.Column(db.String(10000))


class Quizz(db.Model):
    __tablename__ = 'quizz'

    id = db.Column(db.Integer, primary_key=True)
    idExam = db.Column(db.Integer, db.ForeignKey(Exam.id))
    type = db.Column(db.String(50))
    quizz = db.Column(db.JSON)


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
    response['role'] = current_user.role
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
        temp['role'] = user.role
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
        temp['role'] = user.role
        return jsonify({ 'message': 'User found', 'user': response })
    return jsonify({ 'message': 'User not found' })


@app.route('/user', methods=['POST'])

def create_user():
    data: Dict = request.get_json()
    hashed_password: str = generate_password_hash(data['password'],
                                                  method='sha256')
    user: User = User(username=data['username'],
                      password=hashed_password,
                      name=data['name'],
                      lastname=data['lastname'],
                      role=data['role'])
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
        user.role = data['role']
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
    date: str = datetime.datetime.now().strftime('%Y-%m-%d')
    exam: Exam = Exam(name=data['name'],
                      date=date,
                      feedback=data['feedback'])
    db.session.add(exam)
    db.session.commit()

    exam: Union[Exam, None] = Exam.query.filter_by(name=data['name']).first()
    id_exam = exam.id
    return jsonify({ 'message': 'Exam succesfully created', 'id': id_exam })

@app.route('/exam/<id>', methods=['PUT'])
@token_required
def update_exam(current_user, id):
    data: Dict = request.get_json()
    exam: Union[Exam, None] = Exam.query.filter_by(id=id).first()
    if exam:
        exam.name = data['name']
        exam.feedback = data['feedback']
        db.session.commit()
        return jsonify({ 'message': 'The exam has been updated' })
    return jsonify({ 'message': 'Exam not found' })

@app.route('/exam/<id>', methods=['DELETE'])
@token_required
def delete_exam(current_user, id):
    exam: Union[Exam, None] = Exam.query.filter_by(id=id).first()
    if exam:
        db.session.delete(exam)
        db.session.commit()
        return jsonify({ 'message': 'Exam deleted succesfully' })
    return jsonify({ 'message': 'Exam not found' })


###########################################

@app.route('/quizz', methods=['GET'])
@token_required
def get_all_quizzes(current_user):
    quizzes: List = Quizz.query.all()
    response: List = []
    for quizz in quizzes:
        temp: Dict = {}
        temp['id'] = quizz.id
        temp['idExam'] = quizz.idExam
        temp['type'] = quizz.type
        temp['quizz'] = quizz.quizz
        response.append(temp)
    if not response:
        return jsonify({ 'message': 'You have no quizz, create one.', 'quizzes': response })
    return jsonify({ 'message': 'Quizzes found', 'quizzes': response })

@app.route('/quizz/<id>', methods=['GET'])
@token_required
def get_quizz(current_user, id):
    quizz: Union[Quizz, None] = Quizz.query.filter_by(id=id).first()
    if quizz:
        response: Dict = {}
        response['id'] = quizz.id
        response['idExam'] = quizz.idExam
        response['type'] = quizz.type
        response['quizz'] = quizz.quizz
        return jsonify({ 'message': 'Quizz found', 'quizz': response })
    return jsonify({ 'message': 'Quizz not found' })

@app.route('/quizz', methods=['POST'])
@token_required
def create_quizz(current_user):
    data: Dict = request.get_json()
    quizz: Quizz = Quizz(idExam=data['idExam'],
                         type=data['type'],
                         quizz=data['quizz'])
    db.session.add(quizz)
    db.session.commit()
    return jsonify({ 'message': 'Quizz succesfully created' })

@app.route('/quizz/<id>', methods=['PUT'])
@token_required
def update_quizz(current_user, id):
    data: Dict = request.get_json()
    quizz: Union[Quizz, None] = Quizz.query.filter_by(id=id).first()
    if quizz:
        quizz.quizz = data['quizz']
        db.session.commit()
        return jsonify({ 'message': 'The quizz has been updated' })
    return jsonify({ 'message': 'Quizz not found' })

@app.route('/quizz/<id>', methods=['DELETE'])
@token_required
def delete_quizz(current_user, id):
    quizz: Union[Quizz, None] = Quizz.query.filter_by(id=id).first()
    if quizz:
        db.session.delete(quizz)
        db.session.commit()
        return jsonify({ 'message': 'Quizz deleted succesfully' })
    return jsonify({ 'message': 'Quizz not found' })

if __name__ == '__main__':
    app.run(debug=True)