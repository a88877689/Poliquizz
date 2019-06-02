import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Col, Form } from 'react-bootstrap';
import { createUser } from "./../../../api/user";
import { createNotification } from 'react-redux-notify';
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import { onSuccess, onError } from "./../../../notifications/notify";
import * as loaderActions from "./../../../redux/actions/loader";

const Create = (props) => {
    const { handleSubmit } = props;

    return (
        <div className="golem-loader-wrapper">
            <LoadingOverlay
                active={props.loading}
                spinner={<CircleLoader color={"#EB2F64"} />}
            >
                <Title
                    title="Create New User"
                    pages={[
                        { to: "/", pageName: "Home" },
                        { to: "/user", pageName: "User" },
                        { pageName: "Create" }
                    ]}
                />
                <Form onSubmit={handleSubmit} className="golem-margin__medium">
                    <Form.Row>
                        <Form.Group as={Col} sm="12" lg="6" >
                            <Field
                                component="input"
                                name="name"
                                type="text"
                                placeholder="Name: David"
                                className="form-control form-control-lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" lg="6" >
                            <Field
                                component="input"
                                name="lastname"
                                type="text"
                                placeholder="Lastname: Martinez"
                                className="form-control form-control-lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" lg="6" >
                            <Field
                                component="input"
                                name="username"
                                type="text"
                                placeholder="Username: dmartinez"
                                className="form-control form-control-lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" lg="6" >
                            <Field
                                component="input"
                                name="password"
                                type="password"
                                placeholder="**********"
                                className="form-control form-control-lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" lg="6">
                            <Field
                                component="select"
                                name="role"
                                className="form-control form-control-lg"
                                required
                            >
                                <option hidden>Select Role</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </Field>
                        </Form.Group>
                    </Form.Row>
                    <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        sm="12"
                    >
                        Create User
                    </Button>
                </Form>
            </LoadingOverlay>
        </div>
    )
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

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: "create:user",
        onSubmit: async (values, dispatch, props) => {
            try {
                console.log(values)
                props.onShowLoader();
                const response = await createUser(values);
                props.onHideLoader();
                props.onCreateNotification(onSuccess(response.data.message));
                props.history.replace(`/user/update/${response.data.user.id}`);
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
                props.onHideLoader()
            }
        }
    })
)(Create);