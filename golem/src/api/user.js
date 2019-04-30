import instance from './axios';

export function getUser(id) {
    return instance({
        url: '/user',
        method: 'get'
    })
}