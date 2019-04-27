import { Form, Button, Input } from 'element-react';
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
        return (
            <div className="golem-login-background golem-login">
                <div className="golem-heading-primary">
                    <h1 className="golem-heading-primary-main">welcome</h1>
                    <h2 className="golem-heading-primary-sub">to poli-quizz</h2>
                </div>
                
                <Form
                    ref="form"
                    model={this.state.form}
                    rules={this.state.rules}
                    className="golem-login-box" >
                    <Form.Item prop="username">
                        <Input
                            value={this.state.form.username}
                            onChange={this.onChange.bind(this, 'username')}
                            placeholder="Username"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item prop="password">
                        <Input
                            value={this.state.form.password}
                            onChange={this.onChange.bind(this, 'password')}
                            placeholder="Username"
                            autoComplete="off"
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item className="golem-btn">
                        <Button 
                            onClick={this.handleLogin.bind(this)}
                            size="large"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;