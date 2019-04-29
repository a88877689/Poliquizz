import instance from './mock';

export function login(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}