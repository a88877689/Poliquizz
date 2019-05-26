const initState = {
    token: null
}

const reducer = (state=initState, action) => {
    console.log("action", action)
    switch(action.type) {
        case "PERSIST_TOKEN":
            localStorage.setItem("token", action.token);
            return { ...state, token: action.token };
        case "DELETE_TOKEN":
            localStorage.removeItem("token");
            return { ...state, token: null };
        case "LOAD_TOKEN":
            const token = localStorage.getItem("token");
            console.log("load_token", token)
            return { ...state, token: token };
        default:
            return state;
    }
}

export default reducer;