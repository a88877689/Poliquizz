import { getQuizz, getQuizzes } from '@/mock/quizz';
import { showLoader, hideLoader } from './loader';

export function loadQuizz(id) {
    return async dispatch => {
        const response = await getQuizz(id);
        dispatch({
            type: 'quizz',
            quizz: response.data
        });
    }
}

export function loadQuizzes(id) {
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