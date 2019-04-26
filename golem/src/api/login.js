import instance from './axios';

export function loginAction(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}