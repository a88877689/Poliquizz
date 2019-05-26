import { createStore, combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import sidebar from "./reducers/sidebar";
import device from "./reducers/device";
import loader from "./reducers/loader";
import token from "./reducers/token";

const store = createStore(
    combineReducers({
        form,
        sidebar,
        device,
        loader,
        token
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;