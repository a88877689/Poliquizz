from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


def encode(password: str) -> str:
    return generate_password_hash(password, method='sha256')


def check(db_password: str, user_password: str) -> bool:
    return check_password_hash(db_password, user_password)
