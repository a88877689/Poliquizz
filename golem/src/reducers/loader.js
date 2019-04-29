const initialState = {
    loading: false
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'showLoader':
            return { loading: true }
        case 'hideLoader':
            return { loading: false }
        default:
            return state;
    }
};