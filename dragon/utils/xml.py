from dicttoxml import dicttoxml
import os


BASE_DIR = os.path.abspath(os.path.dirname(__file__))


def xml_resource(exam: dict, quizzes: dict) -> str:
    dictionary = {
        "id": exam['id'],
        "name": exam['name'],
        "date": exam['date'],
        "feedback": exam['feedback'],
        "quizzes": quizzes
    }
    xml = dicttoxml(dictionary, custom_root='Poliquizz', attr_type=False)
    fname = f'{exam["id"]}.- {exam["name"]}.xml'
    path = f'{BASE_DIR}/../xml/{fname}'
    with open(path, 'w') as f:
        f.write(xml.decode('utf-8'))
    return path