import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as form } from 'redux-form';
import sidebar from "./reducers/sidebar";
import device from "./reducers/device";
import loader from "./reducers/loader";
import token from "./reducers/token";
import exam from "./reducers/exam";

const store = createStore(
    combineReducers({
        form,
        sidebar,
        device,
        loader,
        token,
        exam
    }),
    // window.__REDUX_DEVTOOLS_EXTENSION__()
    applyMiddleware(
        thunk
    )
)

export default store;