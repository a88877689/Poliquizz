import { showLoader, hideLoader } from "./loader";
import { getQuizz } from "./../../api/quizz";

const getQuizzAction = (id) => {
    return async dispatch => {
        dispatch(showLoader());
        const response = await getQuizz(id);
        dispatch(hideLoader());
        dispatch({
            type: "GET_QUIZZ",
            quizz: response.data.quizz.quizz
        })
    }
}

export {
    getQuizzAction
}