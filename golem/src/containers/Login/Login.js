import { Form, Button, Input } from 'element-react';
import React from 'react';
import styles from './Login.scss';

const login = () => {
    let handleLogin = () => {
        console.log('hello');
    }

    return (
        <div className={styles.golem-login-background}>
            <div className={styles.golem-text-box}>
                <h1 className={styles.golem-heading-primary}>
                    <span className={styles.golem-heading-primary-main}>welcome</span>
                    <span className={styles.golem-heading-primary-sub}>to poli-quizz</span>
                </h1>
            </div>
            
            <Form className={styles.golem-login-box}>
                <Form.Item>
                    <Input placeholder="Username"></Input>
                </Form.Item>
                <Form.Item>
                    <Input type="password" placeholder="Password"></Input>
                </Form.Item>
                <Form.Item className={styles.golem-btn}>
                    <Button onClick={handleLogin} size="large">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default login;