import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reset, reduxForm } from "redux-form";
import { Button, Col, Form } from "react-bootstrap";
import { createQuizz, updateQuizz } from "./../../api/quizz";
import * as loaderActions from "./../../redux/actions/loader";

const Numeric = (props) => {
    const { handleSubmit } = props;
    
    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} className="golem-margin-top__medium">
                <Form.Row>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="name"
                            type="text"
                            placeholder="How much is 5 + 5"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="answer"
                            type="number"
                            placeholder="Answer"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="textarea"
                            name="feedback"
                            type="text"
                            placeholder="Feedback: Some clues..."
                            className="form-control form-control-lg"
                            rows="4"
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="textarea"
                            name="errorFeedback"
                            type="text"
                            placeholder="Error Feedback: The correct answer is 10"
                            className="form-control form-control-lg"
                            rows="4"
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                    variant="success"
                    size="lg"
                    type="submit"
                    sm="12"
                >
                    {!props.update ? "Add Quizz" : "Update Quizz"}
                </Button>
            </Form>
        </React.Fragment>
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
        onHideLoader: () => dispatch(loaderActions.hideLoader())
    }
}

export default withRouter(
    compose(
        connect(
            mapStateToProps,
            mapDispatchToProps
        ),
        reduxForm({
            form: "numeric:quizz",
            onSubmit: async (values, dispatch, props) => {
                try {
                    props.onShowLoader();
                    if(!props.update) {
                        values.type = "Numeric";
                        let data = {
                            idExam: props.id,
                            type: "Numeric",
                            quizz: values
                        }
                        const response = await createQuizz(data);
                        console.log(response.data.message);
                        dispatch(reset("numeric:quizz"));
                    } else {
                        const id = props.match.params.id;
                        const response = await updateQuizz(id, { quizz: values });
                        console.log(response.data.message);
                        props.history.replace("/quizz");
                    }
                    props.onHideLoader();
                } catch(error) {
                    console.log(error);
                }
            }
        })
    )(Numeric)
);