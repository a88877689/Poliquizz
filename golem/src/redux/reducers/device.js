const initState = {
    isMobile: null
}

const reducer = (state=initState, action) => {
    switch(action.type) {
        case "IS_MOBILE":
            return { ...state, isMobile: true };
        case "NOT_MOBILE":
            return { ...state, isMobile: false };
        default:
            return state;
    }
}

export default reducer;