import { deleteQuizz, getQuizz, getQuizzes } from '@/mock/quizz';
import { showLoader, hideLoader } from './loader';

export function getQuizzAction(id) {
    return async dispatch => {
        const response = await getQuizz(id);
        dispatch({
            type: 'quizz',
            quizz: response.data
        });
    }
}

export function getQuizzesAction(id) {
    return async dispatch => {
        dispatch(showLoader());
        const response = await getQuizzes();
        dispatch(hideLoader());
        dispatch({
            type: 'quizzes',
            quizzes: response.data
        });
    }
}

export function deleteQuizzAction(id) {
    return async dispatch => {
        dispatch(showLoader());
        const response = await deleteQuizz(id);
        dispatch(hideLoader());
        console.log(response);
    }
}