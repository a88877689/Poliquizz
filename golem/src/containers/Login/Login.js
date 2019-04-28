import { Form, Button } from 'element-react';
import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';
import { loginAction } from '@/api/login';
import './Login.scss';

class Login extends Component {
    state = {
        form: {
            username: '',
            password: '' 
        },
        rules: {
            username: [{ required: true, message: 'Please enter your username.', trigger: 'blur' }],
            password: [{ required: true, message: 'Please enter your password.', trigger: 'blur' }]
        },
        errors: null
    };

    onChange(key, value){
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    handleLogin(e){
        e.preventDefault();

        let data = this.state.form;
        this.refs.form.validate(async (valid) => {
            if (valid) {
                this.setState({ errors: null });
                const response = await loginAction(data);
                console.log(response);
                this.props.history.replace('/');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="golem-login-background golem-login">
                <div className="golem-heading-primary">
                    <h1 className="golem-heading-primary-main">welcome</h1>
                    <h2 className="golem-heading-primary-sub">to poli-quizz</h2>
                </div>
                
                <Form
                    ref="form"
                    model={this.state.form}
                    className="golem-login-box"
                >
                    <Form.Item prop="username">
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
                    <Form.Item prop="password">
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
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmit: values => {
        console.log(values);
    }
})(Login);