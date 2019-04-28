import React from 'react';
import { Field } from 'redux-form';
import { Form, Layout, Input, Dropdown, Button } from 'element-react';

const NewQuizz = ({ fields }) => (
    <React.Fragment>
        {fields.map((field, idx) => (
            <React.Fragment key={idx}>
                <Form.Item label="Quizz">
                    <div className="el-textarea">
                        <Field
                            component="textarea"
                            placeholder="Ex.: What is the pH of a 0.1M solution?"
                            name={`${field}.quizz`}
                            className="el-textarea__inner"
                        />
                    </div>
                </Form.Item>

                <Layout.Row gutter="24">
                    <Layout.Col span="8">
                        <Form.Item label="Answer">
                            <div className="el-input">
                                <Field
                                    component="input"
                                    placeholder="Ex.: 3.1416"
                                    name={`${field}.answer`}
                                    className="el-input__inner"
                                />
                            </div>
                        </Form.Item>
                    </Layout.Col>

                    <Layout.Col span="8">
                        <Form.Item label="Error range">
                            <Input placeholder="Ex.: 15%" />
                        </Form.Item>
                    </Layout.Col>

                    <Layout.Col span="8">
                        <Form.Item label="Weighing">
                            <Input placeholder="Ex.: 33.33%" />
                        </Form.Item>
                    </Layout.Col>
                </Layout.Row>
            </React.Fragment>
        ))}

        <div className="text-right">
            <Dropdown
                menu={(
                    <Dropdown.Menu>
                        <Dropdown.Item>Numeric</Dropdown.Item>
                        <Dropdown.Item>Multiresponse</Dropdown.Item>
                        <Dropdown.Item>Select Menu</Dropdown.Item>
                        <Dropdown.Item>True or False</Dropdown.Item>
                    </Dropdown.Menu>
                )}
                onCommand={() => fields.push({})}
            >
                <Button type="success" size="small">
                    Add Quizz Type <i className="el-icon-caret-bottom el-icon--right"></i> 
                </Button>
            </Dropdown>
        </div>
    </React.Fragment>
);

export default NewQuizz; 