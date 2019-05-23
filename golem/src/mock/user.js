import instance from './mock';

export function getMeUser(id) {
    return instance({
        url: '/user/me',
        method: 'get'
    })
}