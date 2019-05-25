const initialState = {
    isCollapsed: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case "COLLAPSE":
            return { ...state, isCollapsed: true };
        case "TOGGLE":
            return { ...state, isCollapsed: false };
        default:
            return state;
    }
}

export default reducer;