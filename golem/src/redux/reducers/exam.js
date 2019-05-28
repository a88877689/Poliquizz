const initState = {
    exam: null
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "GET_EXAM":
            return { ...state, exam: action.exam };
        default:
            return state;
    }
}

export default reducer;