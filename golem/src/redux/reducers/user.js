const initState = {
    user: {},
    userToUpdate: null
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "GET_USER":
            return { ...state, userToUpdate: action.userToUpdate };
        case "PERSIST_USER":
            localStorage.setItem("user", JSON.stringify(action.user));
            return { ...state, user: action.user };
        case "DELETE_USER":
            localStorage.removeItem("user");
            return { ...state, user: {} };
        case "LOAD_USER":
            let user = localStorage.getItem("user");
            let aux = user ? JSON.parse(user) : {};
            return { ...state, user: aux };
        default:
            return state
    }
}

export default reducer;