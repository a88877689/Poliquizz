import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import { createNotification } from 'react-redux-notify';
import { Notify } from 'react-redux-notify';
import { auth } from "./../../api/auth";
import { onSuccess, onError } from "./../../notifications/notify";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import * as loaderActions from "./../../redux/actions/loader";
import * as tokenActions from "./../../redux/actions/token";
import * as userActions from "./../../redux/actions/user";

const Login = (props) => {
    const { handleSubmit } = props;

    return (
        <div className="golem-loader-wrapper">
            <Notify />
            <LoadingOverlay
                active={props.loading}
                spinner={<CircleLoader color={"#EB2F64"} />}
            >
                <div className="golem-login-container">
                    <div className="golem-login-heading">
                        <h1 className="golem-login-heading__primary">welcome</h1>
                        <h2 className="golem-login-heading__secundary">to poliquizz</h2>
                    </div>

                    <div className="golem-login-form-box">
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} sm="12" controlId="validationCustom01">
                                    <Field
                                        component="input"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        className="form-control form-control-lg"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm="12">
                                    <Field
                                        component="input"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        className="form-control form-control-lg"
                                        required
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button
                                size="lg"
                                className="golem-buttons__login"
                                type="submit"
                                sm="12"
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </LoadingOverlay>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.token,
        ...state.loader,
        ...state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPersistToken: (payload) => dispatch(tokenActions.persistToken(payload)),
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onPersistUser: (payload) => dispatch(userActions.persistUser(payload)),
        onCreateNotification: (payload) => dispatch(createNotification(payload))
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidUpdate() {
            if(this.props.token) {
                this.props.history.replace("/");
            }         
        }
    }),
    reduxForm({
        form: "login",
        onSubmit: async (values, dispatch, props) => {
            try {
                props.onShowLoader();
                const response = await auth(values);
                props.onPersistToken(response.data.token);
                props.onPersistUser(response.data.user);
                props.onCreateNotification(onSuccess(response.data.message));
                props.onHideLoader();
                props.history.replace("/");
            } catch(error){
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
                props.onHideLoader();
            }
        }
    })
)(Login);