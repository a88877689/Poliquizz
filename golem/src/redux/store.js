import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { compose } from "recompose";
import { reducer as form } from 'redux-form';
import notifyReducer from 'react-redux-notify';
import sidebar from "./reducers/sidebar";
import device from "./reducers/device";
import loader from "./reducers/loader";
import token from "./reducers/token";
import quizz from "./reducers/quizz";
import exam from "./reducers/exam";
import user from "./reducers/user";

const store = createStore(
    combineReducers({
        notifications: notifyReducer,
        form,
        sidebar,
        device,
        loader,
        token,
        quizz,
        exam,
        user
    }),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(
            thunk
        )
    )
)

export default store;