FROM python:3.7

COPY . /dragon

WORKDIR /dragon

RUN pip install pipenv
RUN pipenv install

CMD ["pipenv", "run", "uwsgi", "launch.ini"]