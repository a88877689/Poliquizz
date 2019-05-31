from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


def encode(password: str) -> str:
    return generate_password_hash(password, method='sha256')
