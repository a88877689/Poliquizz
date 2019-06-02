import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { reset, reduxForm } from "redux-form";
import { createNotification } from 'react-redux-notify';
import { createQuizz, updateQuizz } from "./../../api/quizz";
import { onSuccess, onError } from "./../../notifications/notify";
import { SelectMenu } from "./../../components/Quizz/index";
import * as loaderActions from "./../../redux/actions/loader";

const SelectMenuForm = (props) => {    
    return (
        <SelectMenu update={props.update} handleSubmit={props.handleSubmit} />
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onCreateNotification: (config) => dispatch(createNotification(config))
    }
}

export default withRouter(
    compose(
        connect(
            mapStateToProps,
            mapDispatchToProps
        ),
        reduxForm({
            form: "selectMenu:quizz",
            onSubmit: async (values, dispatch, props) => {
                try {
                    props.onShowLoader();
                    if(!props.update) {
                        values.type = "SelectMenu";
                        let data = {
                            idExam: props.id,
                            type: "SelectMenu",
                            quizz: values
                        }
                        const response = await createQuizz(data);
                        dispatch(reset("selectMenu:quizz"));
                        props.onCreateNotification(onSuccess(response.data.message));
                    } else {
                        const id = props.match.params.id;
                        const response = await updateQuizz(id, { quizz: values });
                        props.onCreateNotification(onSuccess(response.data.message));
                    }
                    props.onHideLoader();
                } catch(error) {
                    let message = error.response ? error.response.data.message : "Oops! Something went wront";
                    props.onCreateNotification(onError(message));
                    props.onHideLoader();
                }
            }
        })
    )(SelectMenuForm)
);