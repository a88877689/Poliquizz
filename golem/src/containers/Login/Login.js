import React from 'react';
import { Button, Form, Loading } from 'element-react';
import { Field, reduxForm } from 'redux-form';
import { showLoader, hideLoader } from '@/actions/loader';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from '@/mock/login';
import { authToken } from '@/actions/auth';
import Swal from 'sweetalert2';
// import { loginAction } from '@/api/login';
import './Login.scss';

const Login = (props) => {
    let { handleSubmit, loading } = props;

    return (
        <Loading
            loading={loading}
            text='Loading...'
            fullscreen={true}>
            <div className="golem-login-background golem-login">
                <div className="golem-heading-primary">
                    <h1 className="golem-heading-primary-main">welcome</h1>
                    <h2 className="golem-heading-primary-sub">to poli-quizz</h2>
                </div>
                
                <Form className="golem-login-box">
                    <Form.Item>
                        <div className="el-input">
                            <Field
                                component="input"
                                name="username"
                                placeholder="Username"
                                autoComplete="off"
                                className="el-input__inner"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="el-input">
                            <Field
                                component="input"
                                name="password"
                                placeholder="Password"
                                autoComplete="off"
                                type="password"
                                className="el-input__inner"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item className="golem-btn">
                        <Button 
                            onClick={handleSubmit}
                            size="large"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Loading>
    );
}

export default compose(
    connect(
        state => state.loader
    ),
    reduxForm({
        form: 'login',
        onSubmit: async (values, dispatch, props) => {
            console.log(values);
            dispatch(showLoader());
            try {
                let response = await login(values);
                dispatch(authToken(response.data.token));
                props.history.replace('/');
            } catch(err) {
                Swal({
                    message: err.response.data.fieldError,
                    type: 'error'
                })
                console.log(err.response);
            } finally {
                dispatch(hideLoader());
            }
        }
    })
)(Login);
