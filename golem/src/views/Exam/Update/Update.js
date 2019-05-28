import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Col, Form, Tab, Tabs } from 'react-bootstrap';
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import { MultiSelect, Numeric, SelectMenu, TrueFalse } from "./../../../components/Quizz/index";
import * as loaderActions from "./../../../redux/actions/loader";
import * as examActions from "./../../../redux/actions/exam";

const Update = (props) => {
    const { handleSubmit } = props;

    return (
        <LoadingOverlay
            active={props.loading}
            spinner={<CircleLoader color={"#EB2F64"} />}
        >
            <Title
                title="Update Exam"
                pages={[
                    { to: "/", pageName: "Home" },
                    { to: "/exam", pageName: "Exam" },
                    { pageName: "Update" }
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
                    Update Exam
                </Button>
            </Form>
            
            <div className="golem-margin__medium">
                <h1 className="golem-font-type__bold">Add Your Quizz</h1><hr className="golem-margin__bottom" />
                <Tabs className="golem-font-size__twelve" defaultActiveKey="trueFalse">
                    <Tab eventKey="trueFalse" title="True or False">
                        <TrueFalse id={props.match.params.id} />
                    </Tab>
                    <Tab eventKey="selectMenu" title="Select Menu">
                        <SelectMenu id={props.match.params.id} />
                    </Tab>
                    <Tab eventKey="multiSelect" title="Multi Select">
                        <MultiSelect id={props.match.params.id} />
                    </Tab>
                    <Tab eventKey="numeric" title="Numeric">
                        <Numeric id={props.match.params.id} />
                    </Tab>
                </Tabs>
            </div>
            
        </LoadingOverlay>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.loader,
        ...state.exam,
        initialValues: state.exam.exam
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onGetExam: (id) => dispatch(examActions.getExamAction(id))
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
            this.props.onGetExam(match.params.id)
        }
    }),
    reduxForm({
        form: "update:exam",
        onSubmit: async (values, dispatch, props) => {
            console.log(values)
        }
    })
)(Update);