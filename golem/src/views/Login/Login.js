import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import * as loaderActions from "./../../redux/actions/loader";
import * as tokenActions from "./../../redux/actions/token";
import { login } from "./../../api/login";

const Login = (props) => {
    const { handleSubmit } = props;

    return (
        <div className="login-loader-wrapper">
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
        ...state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPersistToken: (payload) => dispatch(tokenActions.persistToken(payload)),
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader())
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
                const response = await login(values);
                props.onPersistToken(response.data.token);
                props.onHideLoader();
                props.history.replace("/");
            } catch(error){
                props.onHideLoader();
                if(error.response)  {
                    alert(error.response.data.message);
                } else {
                    alert("Server internal error")
                }
            }
            
        }
    })
)(Login);