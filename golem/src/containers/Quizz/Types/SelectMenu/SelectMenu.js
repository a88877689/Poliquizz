import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'element-react';

const SelectMenu = (props) => {
    return (
        <React.Fragment>
            <Form.Item label="Quizz">
                <div className="el-textarea">
                    <Field
                        component="textarea"
                        placeholder="Ex.: Who bit Evander Holyfield?"
                        name={`${props.field}.quizzSelectMenu`}
                        className="el-textarea__inner"
                    />
                </div>
            </Form.Item>

            <Form.Item label="Option 1">
                <div className="el-input">
                    <Field
                        component='input'
                        placeholder="Ex.: Hugo Cesar Chavez"
                        name={`${props.field}.option1`}
                        className="el-input__inner"
                    />
                </div>
            </Form.Item>

            <Form.Item label="Option 2">
                <div className="el-input">
                    <Field
                        component='input'
                        placeholder="Ex.: Mike Tyson"
                        name={`${props.field}.option2`}
                        className="el-input__inner"
                    />
                </div>
            </Form.Item>

            <Form.Item label="Option 3">
                <div className="el-input">
                    <Field
                        component='input'
                        placeholder="Ex.: Muhammad Ali"
                        name={`${props.field}.option3`}
                        className="el-input__inner"
                    />
                </div>
            </Form.Item>

            <Form.Item label="Option 4">
                <div className="el-input">
                    <Field
                        component='input'
                        placeholder="Ex.: George Foreman"
                        name={`${props.field}.option4`}
                        className="el-input__inner"
                    />
                </div>
            </Form.Item>

        </React.Fragment>
    );
}

export default SelectMenu;