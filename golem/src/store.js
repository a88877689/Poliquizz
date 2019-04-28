import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { reducer as form } from 'redux-form';
import quizz from './reducers/quizz';

export default createStore(
    combineReducers({
        form,
        quizz
    }),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(
            thunk
        ),
        persistState('auth')
    )
);