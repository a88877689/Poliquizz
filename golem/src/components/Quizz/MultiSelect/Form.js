import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reset, reduxForm } from "redux-form";
import { Button, Col, Form } from "react-bootstrap";
import { createNotification } from 'react-redux-notify';
import { createQuizz, updateQuizz } from "../../../api/quizz";
import * as loaderActions from "../../../redux/actions/loader";
import { onSuccess, onError } from "./../../../notifications/notify";

const MultiSelect = (props) => {
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
                            placeholder="Quizz: Which of these are web mapping technologies?"
                            className="form-control form-control-lg"
                            multiple
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="select"
                            name="answer"
                            type="select-multiple"
                            className="form-control form-control-lg"
                            value={[]}
                            multiple={true}
                            required
                        >   
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </Field>
                    </Form.Group>

                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="option1"
                            type="text"
                            placeholder="Option 1: Docker"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="option2"
                            type="text"
                            placeholder="Option 2: OpenStreetMap"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="option3"
                            type="text"
                            placeholder="Option 3: MapBox"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="input"
                            name="option4"
                            type="text"
                            placeholder="Option 4: None of above"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg="6">
                        <Field
                            component="textarea"
                            name="feedback"
                            type="text"
                            placeholder="Feedback: There are two correct answers"
                            className="form-control form-control-lg"
                            rows="4"
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="textarea"
                            name="errorFeedback"
                            type="text"
                            placeholder="Error Feedback: The correct answer is Facebook"
                            className="form-control form-control-lg"
                            rows="4"
                            required
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
            form: "multiSelect:quizz",
            onSubmit: async (values, dispatch, props) => {
                try {
                    props.onShowLoader();
                    if(!props.update) {
                        values.type = "MultiSelect";
                        let data = {
                            idExam: props.id,
                            type: "MultiSelect",
                            quizz: values
                        }
                        const response = await createQuizz(data);
                        dispatch(reset("multiSelect:quizz"));
                        props.onCreateNotification(onSuccess(response.data.message));
                    } else {
                        const id = props.match.params.id;
                        const response = await updateQuizz(id, { quizz: values });
                        props.onCreateNotification(onSuccess(response.data.message));
                    }
                    props.onHideLoader();
                } catch(error) {
                    let message = error.response.data.message;
                    if(!message) message = "Oops! Something went wront";
                    props.onCreateNotification(onError(message));
                    props.onHideLoader();
                }
            }
        })
    )(MultiSelect)
);