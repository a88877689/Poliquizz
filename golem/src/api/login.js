import instance from './axios';

export function login(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}