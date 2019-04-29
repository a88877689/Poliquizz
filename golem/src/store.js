import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { reducer as form } from 'redux-form';
import auth from './reducers/auth';
import loader from './reducers/loader';
import quizz from './reducers/quizz';

export default createStore(
    combineReducers({
        form,
        auth,
        loader,
        quizz,

    }),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(
            thunk
        ),
        persistState('auth')
    )
);