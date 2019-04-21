import { Form, Button, Input } from 'element-react';
import React from 'react';
import './Login.scss';

const login = (props) => {
    let handleLogin = () => {
        props.history.replace('/');
    }

    return (
        <div className="golem-login-background">
            <div className="golem-text-box">
                <h1 className="golem-heading-primary">
                    <span className="golem-heading-primary-main">welcome</span>
                    <span className="golem-heading-primary-sub">to poli-quizz</span>
                </h1>
            </div>
            
            <Form className="golem-login-box">
                <Form.Item>
                    <Input placeholder="Username"></Input>
                </Form.Item>
                <Form.Item>
                    <Input type="password" placeholder="Password"></Input>
                </Form.Item>
                <Form.Item className="golem-btn">
                    <Button onClick={handleLogin} size="large">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default login;