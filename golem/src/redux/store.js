import { createStore, combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import sidebar from "./reducers/sidebar";
import device from "./reducers/device";

const store = createStore(
    combineReducers({
        form,
        sidebar,
        device
    })
)

export default store;