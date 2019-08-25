import os
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(".")
load_dotenv(dotenv_path=env_path)


DB_NAME = os.environ.get("DB_NAME", "my")
DB_USERNAME = os.environ.get("DB_USERNAME", "mysql")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "mysql")
DB_HOST = os.environ.get("DB_HOST", "127.0.0.1")
DB_TYPE = os.environ.get("DB_TYPE", "mysql")


basedir = os.path.abspath(os.path.dirname(__file__))


SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = (
    f"{DB_TYPE}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)
