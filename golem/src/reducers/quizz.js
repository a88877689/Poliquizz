
const initialState = {
    quizz: null,
    quizzes: []
};

export default function reducer(state = initialState, action) {
    console.log("action", action.quizz)
    switch (action.type) {
        case 'quizz':
            return {
                ...state,
                quizz: action.quizz,
            };
        case 'quizzes':
            return {
                ...state,
                quizzes: action.quizzes
            }
        default:
            return state;
    }
};