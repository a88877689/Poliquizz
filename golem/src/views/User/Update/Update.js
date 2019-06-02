import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Col, Form } from 'react-bootstrap';
import { updateUser } from "./../../../api/user";
import { onSuccess, onError } from "./../../../notifications/notify";
import { createNotification } from 'react-redux-notify';
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import * as loaderActions from "./../../../redux/actions/loader";
import * as userActions from "./../../../redux/actions/user";

const Update = (props) => {
    const { handleSubmit } = props;

    return (
        <div className="golem-loader-wrapper">
            <LoadingOverlay
                active={props.loading}
                spinner={<CircleLoader color={"#EB2F64"} />}
            >
                <Title
                    title="Update User"
                    pages={[
                        { to: "/", pageName: "Home" },
                        { to: "/user", pageName: "User" },
                        { pageName: "Update" }
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
                                disabled
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" lg="6" >
                            <Field
                                component="input"
                                name="password"
                                type="password"
                                placeholder="**********"
                                className="form-control form-control-lg"
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
                        Update User
                    </Button>
                </Form>
            </LoadingOverlay>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.loader,
        ...state.user,
        initialValues: state.user.userToUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onGetUser: (id) => dispatch(userActions.getUserAction(id)),
        onCreateNotification: (config) => dispatch(createNotification(config))
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        async componentDidMount() {
            const { match } = this.props;
            this.props.onGetUser(match.params.id)
        }
    }),
    reduxForm({
        form: "update:exam",
        onSubmit: async (values, dispatch, props) => {
            try {
                props.onShowLoader();
                const id = props.match.params.id;
                const response = await updateUser(id, values);
                props.onCreateNotification(onSuccess(response.data.message));
                props.onHideLoader();
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
                props.onHideLoader();
            }
        }
    })
)(Update);