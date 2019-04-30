import instance from './mock';

export function getUser(id) {
    return instance({
        url: '/user',
        method: 'get'
    })
}