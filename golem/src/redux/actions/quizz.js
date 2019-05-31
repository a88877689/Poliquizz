import { showLoader, hideLoader } from "./loader";
import { createNotification } from 'react-redux-notify';
import { onSuccess, onError } from "./../../notifications/notify";
import { getQuizz } from "./../../api/quizz";

const getQuizzAction = (id) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await getQuizz(id);
            dispatch(createNotification(onSuccess(response.data.message)));
            dispatch(hideLoader());
            dispatch({
                type: "GET_QUIZZ",
                quizz: response.data.quizz.quizz
            })
        } catch(error) {
            let message = error.response ? error.response.data.message : "Oops! Something went wront";
            dispatch(createNotification(onError(message)));
            dispatch(hideLoader());
        }
    }
}

export {
    getQuizzAction
}