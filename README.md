# Poliquizz

A simple platform were teachers can create dynamic exams that include different types of quizzes with multimedia content (optionally). Any one can participate and see its result instantly so, what are you waiting to get started?

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Before starting you have to have in mind that this project is divided in 3 parts: frontend, backend and database, each of them have a code name; golem (ReactJS), dragon (Python Flask) and lightning (MySQL) respectively.

### Prerequisites

To run this software you basically only need python3.7, NPM and MySQL installed on your machine.

### Installing

I use pipenv and npm as packge managers for the backend and frontend projects respectively, let's get started with dragon:

```bash
pip install pipenv
cd Poliquizz/dragon
pipenv install
```

The first command will help you to install pipenv which is a package manager and to install the dependencies for dragon you just need to run the last command. Once you have installed all the dependencies you have to make the migrations for the database, I will assume that you have already a database on your local with the name "lightning", so let's make those migrations:

```bash
pipenv run python migrate.py lightning init
pipenv run python migrate.py lightning migrate
pipenv run python migrate.py lightning upgrade
```

Finally, let's run the API:

```bash
pipenv run python run.py
```

For golem it will be more easier, you only need to have npm installed in your machine and run:

```bash
npm install
npm start
```

## Running the tests

At the moment this project doesn't have unitests.

## Deployment

Instructions for production deploy will come later.

## Built With

* [Flask](http://flask.pocoo.org/) - The backend framework used
* [Pipenv](https://docs.pipenv.org/en/latest/) - Dependency Management for backend
* [ReactJS](https://es.reactjs.org/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management for frontend
* [Sass](https://sass-lang.com/) - Used to extend CSS and create our own styles
* [Bootstrap](https://getbootstrap.com/) - CSS framework used

## Authors

* **David Martinez** - [Davestring](https://github.com/Davestring)

## License

This project is licensed under the MIT License
