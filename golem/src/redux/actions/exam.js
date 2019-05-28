import { showLoader, hideLoader } from "./loader";
import { getExam } from "./../../api/exam";

const getExamAction = (id) => {
    return async dispatch => {
        dispatch(showLoader());
        const response = await getExam(id);
        dispatch(hideLoader());
        dispatch({
            type: "GET_EXAM",
            exam: response.data.exam
        })
    }
}

export {
    getExamAction
}