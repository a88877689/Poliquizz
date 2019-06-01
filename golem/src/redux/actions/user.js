import { showLoader, hideLoader } from "./loader";
import { createNotification } from 'react-redux-notify';
import { onSuccess, onError } from "./../../notifications/notify";
import { getUser } from "./../../api/user";

const getUserAction = (id) => {
    return async dispatch => {
        try {
            dispatch(showLoader());            
            const response = await getUser(id);
            dispatch(createNotification(onSuccess(response.data.message)));
            dispatch(hideLoader());
            dispatch({
                type: "GET_USER",
                userToUpdate: response.data.user
            })
        } catch(error) {
            let message = error.response ? error.response.data.message : "Oops! Something went wront";
            dispatch(createNotification(onError(message)));
            dispatch(hideLoader());
        }
    }
}

const persistUser = (user) => {
    return { type: "PERSIST_USER", user: user };
}

const deleteUser = () => {
    return { type: "DELETE_USER" };
}

const loadUser = () => {
    return { type: "LOAD_USER" };
}

export {
    getUserAction,
    persistUser,
    deleteUser,
    loadUser
}