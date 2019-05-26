import { createStore, combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import sidebar from "./reducers/sidebar";
import device from "./reducers/device";
import token from "./reducers/token";

const store = createStore(
    combineReducers({
        form,
        sidebar,
        device,
        token
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;