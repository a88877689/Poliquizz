import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Col, Form } from 'react-bootstrap';
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import { createExam } from "./../../../api/exam";
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
                    title="Create New Exam"
                    pages={[
                        { to: "/", pageName: "Home" },
                        { to: "/exam", pageName: "Exam" },
                        { pageName: "Create" }
                    ]}
                />
                <Form onSubmit={handleSubmit} className="golem-margin__medium">
                    <Form.Row>
                        <Form.Group as={Col} sm="12">
                            <Field
                                component="input"
                                name="name"
                                type="text"
                                placeholder="Name: Sports"
                                className="form-control form-control-lg"
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} sm="12">
                            <Field
                                component="textarea"
                                name="feedback"
                                type="text"
                                placeholder="Feedback: Answer to all the test questions"
                                className="form-control form-control-lg"
                                rows="6"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        sm="12"
                    >
                        Create Exam
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
        onHideLoader: () => dispatch(loaderActions.hideLoader())
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: "create:exam",
        onSubmit: async (values, dispatch, props) => {
            if(!values.feedback) {
                values.feedback = "";
            }
            try {
                props.onShowLoader();
                const response = await createExam(values);
                alert(response.data.message);
                props.onHideLoader();
                props.history.replace(`/exam/update/${response.data.id}`);
            } catch(error) {
                alert(error.message);
                props.onHideLoader()
            }
        }
    })
)(Create);