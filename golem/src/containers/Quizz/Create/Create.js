import React, { Component } from 'react';
import { Input, Form, Button } from 'element-react';

class Create extends Component {
    render() {
        return (
            <Form>
                <Form.Item>
                    <Input placeholder="Quizz" />
                </Form.Item>
                <Form.Item>
                    <Input type="textfield" placeholder="Description" />
                </Form.Item>
                <Form.Item>
                    <Button>Create</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Create;