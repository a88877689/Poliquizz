import React from 'react';
import { Field } from 'redux-form';
import { Form, Layout } from 'element-react';

const Numeric = (props) => {
    return (
        <React.Fragment>
            <Form.Item label="Quizz">
                <div className="el-textarea">
                    <Field
                        component="textarea"
                        placeholder="Ex.: How many champion leagues BarcelonaFC has won?"
                        name={`${props.field}.quizzNumeric`}
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
                                placeholder="Ex.: 4"
                                name={`${props.field}.answer`}
                                className="el-input__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>

                <Layout.Col span="8">
                    <Form.Item label="Error range (%)">
                        <div className="el-input">
                            <Field
                                component="input"
                                placeholder="Ex.: 25"
                                name={`${props.field}.errorRange`}
                                className="el-input__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>

                <Layout.Col span="8">
                    <Form.Item label="Weighing (%)">
                        <div className="el-input">
                            <Field
                                component="input"
                                placeholder="Ex.: 33.33"
                                name={`${props.field}.weighing`}
                                className="el-input__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>
            </Layout.Row>
        </React.Fragment>
    );
}

export default Numeric;