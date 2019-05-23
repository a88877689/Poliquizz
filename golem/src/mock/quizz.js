import instance from './mock';

const BASE_PATH = '/exam';

export function createQuizz(data) {
    return instance({
        url: BASE_PATH,
        method: 'post',
        data
    });
}

export function updateQuizz(id, data) {
    return instance({
        url: `${BASE_PATH}/${id}`,
        method: 'put',
        data
    });
}

export function deleteQuizz(id) {
    return instance({
        url: `${BASE_PATH}/${id}`,
        method: 'delete',
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