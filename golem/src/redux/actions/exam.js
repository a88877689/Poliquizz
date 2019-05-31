import { showLoader, hideLoader } from "./loader";
import { createNotification } from 'react-redux-notify';
import { onSuccess, onError } from "./../../notifications/notify";
import { getExam } from "./../../api/exam";

const getExamAction = (id) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await getExam(id);
            dispatch(createNotification(onSuccess(response.data.message)));
            dispatch(hideLoader());
            dispatch({
                type: "GET_EXAM",
                exam: response.data.exam
            })
        } catch(error) {
            let message = error.response ? error.response.data.message : "Oops! Something went wront";
            dispatch(createNotification(onError(message)));
            dispatch(hideLoader());
        }
    }
}

export {
    getExamAction
}