import instance from './axios';

const BASE_PATH = '/quizz';

export function createQuizz(data) {
    return instance({
        url: BASE_PATH,
        method: 'post',
        data
    });
}

export function getQuizzes() {
    return instance({
        url: BASE_PATH,
        method: 'get'
    });
}

export function getQuizz(id) {
    return instance({
        url: `${BASE_PATH}/${id}`,
        method: 'get'
    });
}