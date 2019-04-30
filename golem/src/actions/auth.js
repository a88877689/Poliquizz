export function authToken(token) {
    return { type: 'token', token }
}

export function deleteToken() {
    localStorage.clear()
}