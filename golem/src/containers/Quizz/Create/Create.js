import React from 'react';
import { Form, Input } from 'element-react';

const create = () => {
    return (
        <Form>
            <label>Quizz:</label>
            <Form.Item>
                <Input></Input>
            </Form.Item>
            <label>Description:</label>
            <Form.Item>
                <Input type="textarea"></Input>
            </Form.Item>
        </Form>

    );
}

export default create;