import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reset, reduxForm } from "redux-form";
import { Button, Col, Form } from "react-bootstrap";


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
                    Add Quizz
                </Button>
            </Form>
        </React.Fragment>
    );
}

export default compose(
    connect(

    ),
    reduxForm({
        form: "numeric:quizz",
        onSubmit: async (values, dispatch, props) => {
            values.idExam = props.id;
            if(!values.answer) {
                values.answer = false
            }
            console.log(values);
            dispatch(reset("multiSelect:quizz"));
        }
    })
)(Numeric);