const initState = {
    token: null
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "PERSIST_TOKEN":
            localStorage.setItem("token", action.token);
            return { ...state, token: action.token };
        case "DELETE_TOKEN":
            localStorage.removeItem("token");
            return { ...state, token: null };
        case "LOAD_TOKEN":
            const token = localStorage.getItem("token");
            return { ...state, token: token };
        default:
            return state;
    }
}

export default reducer;