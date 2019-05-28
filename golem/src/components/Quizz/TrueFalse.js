import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reset, reduxForm } from "redux-form";
import { Button, Col, Form } from "react-bootstrap";


const TrueFalse = (props) => {
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
                            placeholder="Quizz: Is React a Javascrit Framework?"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="select"
                            name="answer"
                            className="form-control form-control-lg"
                            required
                        >
                            <option hidden>Select Answer</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </Field>
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
                            placeholder="Error Feedback: The correct answer is True"
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
        form: "trueFalse:quizz",
        onSubmit: async (values, dispatch, props) => {
            values.idExam = props.id;
            if(!values.answer) {
                values.answer = false
            }
            console.log(values);
            dispatch(reset("multiSelect:quizz"));
        }
    })
)(TrueFalse);