import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reset, reduxForm } from "redux-form";
import { Button, Col, Form } from "react-bootstrap";
import { createQuizz } from "./../../api/quizz";
import * as loaderActions from "./../../redux/actions/loader";

const SelectMenu = (props) => {
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
                            placeholder="Quizz: Who develop React?"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} lg="6">
                        <Field
                            component="select"
                            name="answer"
                            type="select"
                            className="form-control form-control-lg"
                            required
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </Field>
                    </Form.Group>

                    <Form.Group as={Col} sm="6">
                        <Field
                            component="input"
                            name="option1"
                            type="text"
                            placeholder="Option 1: Facebook"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="6">
                        <Field
                            component="input"
                            name="option2"
                            type="text"
                            placeholder="Option 2: Goggle"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="6">
                        <Field
                            component="input"
                            name="option3"
                            type="text"
                            placeholder="Option 3: Microsoft"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm="6">
                        <Field
                            component="input"
                            name="option4"
                            type="text"
                            placeholder="Option 4: Apple"
                            className="form-control form-control-lg"
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} lg="6">
                        <Field
                            component="textarea"
                            name="feedback"
                            type="text"
                            placeholder="Feedback: Owner left Harvard"
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
                    Add Quizz
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

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: "selectMenu:quizz",
        onSubmit: async (values, dispatch, props) => {
            let data = {
                idExam: props.id,
                type: "SelectMenu",
                quizz: values
            }
            try {
                props.onShowLoader();
                const response = await createQuizz(data);
                alert(response.data.message);
                props.onHideLoader();
                dispatch(reset("selectMenu:quizz"));
            } catch(error) {
                console.log(error);
            }
        }
    })
)(SelectMenu);