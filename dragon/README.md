# Dragon

**Dragon** is the backend of the project **(Poliquizz)**. Manages the authentication logic, store the quizes and create the file representation of the exam.

## Contenidos

- [Dependencies](#dependencies)
- [Configuration](#configuration)

---

## Dependencies

![Python +3.7](https://img.shields.io/badge/python-+3.7-blue.svg)
![Docker](https://img.shields.io/badge/docker-*-blue.svg)

---

## Configuration

### Environment Variables File

To run this system it's necessary an **environment file** (**.env**). This file must be in the root of the project.

``` bash
touch .env
```

``` bash
vi .env
```

Then, here's a list of the variables needed with its default value

#### MySQL (Lightning)

Stablish the conection with the MySQL db.

| Variable      | Valor          |
|---------------|----------------|  
| [DB_NAME]     | lightning      |
| [DB_USERNAME] | username       |
| [DB_PASSWORD] | password       |
| [DB_HOST]     | 127.0.0.1:3306 |
| [DB_TYPE]     | mysql+pymysql  |

## Authors

***David Martinez** - [Davestring](https://github.com/Davestring)

## License

This project is licensed under the MIT License
