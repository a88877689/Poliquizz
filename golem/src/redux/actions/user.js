const persistUser = (user) => {
    return { type: "PERSIST_USER", user: user };
}

const deleteUser = () => {
    return { type: "DELETE_USER" };
}

const loadUser = () => {
    return { type: "LOAD_USER" };
}

export {
    persistUser,
    deleteUser,
    loadUser
}