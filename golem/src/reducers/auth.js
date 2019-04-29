const initialState = {
    token: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'token':
            return { token: action.token }
        default:
            return state;   
    }
};