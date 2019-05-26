const initState = {
    loading: false
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "SHOW_LOADER":
            return { ...state, loading: true };
        case "HIDE_LOADER":
            return { ...state, loading: false };
        default:
            return state
    }
}

export default reducer;