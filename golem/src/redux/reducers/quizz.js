const initState = {
    quizz: null
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "GET_QUIZZ":
            return { ...state, quizz: action.quizz };
        default:
            return state;
    }
}

export default reducer;