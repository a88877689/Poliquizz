const persistToken = (payload) => {
    return { type: "PERSIST_TOKEN", token: payload }
}

const deleteToken = () => {
    return { type: "DELETE_TOKEN" }
}

const loadToken = () => {
    return { type: "LOAD_TOKEN" }
}

export {
    persistToken,
    deleteToken,
    loadToken
}