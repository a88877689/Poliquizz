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
                        name={`${props.field}.quizz`}
                        className="el-textarea__inner"
                    />
                </div>
            </Form.Item>

            <Layout.Row gutter="24">
                <Layout.Col xs="24" lg="12">
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

                <Layout.Col xs="24" lg="12">
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

                <Layout.Col sm="24">
                    <Form.Item label="Feedback">
                        <div className="el-textarea">
                            <Field
                                component="textarea"
                                placeholder=""
                                name={`${props.field}.feedback`}
                                className="el-textarea__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>
            </Layout.Row>
        </React.Fragment>
    );
}

export default Numeric;