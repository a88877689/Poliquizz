import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { Button, Col, Form } from 'react-bootstrap';

const Login = (props) => {
    const { handleSubmit } = props;

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default compose(
    reduxForm({
        form: 'login',
        onSubmit: (values, dispatch, props) => {
            console.log(values)
            props.history.replace("/")
        }
    })
)(Login);