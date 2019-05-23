import React from 'react';
import { Field } from 'redux-form';
import { Form, Layout } from 'element-react';

const TrueFalse = (props) => {
    return (
        <React.Fragment>
            <Layout.Row gutter="24" style={{marginTop: "20px"}}>
                <Layout.Col lg="18" xs="24">
                    <Form.Item label="Quizz">
                        <div className="el-textarea">
                            <Field
                                component="textarea"
                                placeholder="Ex.: Is Michael Jordan one of the best basketball players of all time?"
                                name={`${props.field}.quizz`}
                                className="el-textarea__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>

                <Layout.Col lg="6" xs="24">
                    <Form.Item label="True or False">
                        <div className="switch">
                            <Field
                                component='input'
                                type='checkbox'
                                name={`${props.field}.trueFalse`}
                            />
                            <span className="slider round" />
                        </div>
                    </Form.Item>
                </Layout.Col>
            </Layout.Row>
        </React.Fragment>
    );
}

export default TrueFalse;