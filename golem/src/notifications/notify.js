import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_ERROR
} from "react-redux-notify";



const onSuccess = message => {
    return {
        message: message,
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 2000,
        canDismiss: false,
        icon: <FontAwesomeIcon icon="check" />
    }
}

const onWarning = message => {
    return {
        message: message,
        type: NOTIFICATION_TYPE_WARNING,
        duration: 2000,
        canDismiss: false,
        icon: <FontAwesomeIcon icon="exclamation" />
    }
}

const onError = message => {
    return {
        message: message,
        type: NOTIFICATION_TYPE_ERROR,
        duration: 2000,
        canDismiss: false,
        icon: <FontAwesomeIcon icon="bomb" />
    }
}

export {
    onSuccess,
    onWarning,
    onError
}