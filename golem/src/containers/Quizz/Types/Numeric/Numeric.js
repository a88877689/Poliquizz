import React, { useState } from 'react';
import { Form, Input, InputNumber } from 'element-react';
import Aux from '@/high-order-components/Aux';

const numeric = () => {
    let [state, setState] = useState({
        response: 0,
        errorRange: 0
    });

    return (
        <Aux>
            <Form.Item label="Quizz">
                <Input type="textarea" placeholder="Ex.: What is the pH of a 0.1M solution?" />
            </Form.Item>


            <div>
                <label>Response</label>
                <InputNumber
                    min={-1 * Infinity}
                    placeholder="Response"
                    defaultValue={state.response}
                />
            </div>

            <div>
                <label>Error range</label>
                <InputNumber
                    placeholder="Error range"
                    defaultValue={state.errorRange}
                />
            </div>

            <Input type="textarea" placeholder="Feedback" />
        </Aux>
    );
}

export default numeric;