import React from 'react';
import { Button, Form, Layout } from 'element-react';
import { Field, FieldArray } from 'redux-form';
import AddQuizz from './AddQuizz';

const ExamForm = (props) => {
    const { handleSubmit } = props;
    return (
        <Form>
            <Layout.Row gutter="24">
                <Layout.Col span="16">
                    <FieldArray component={AddQuizz} name="quizzes" />
                </Layout.Col>

                <Layout.Col span="8">
                    <Layout.Row gutter="24">
                        <Layout.Col span="12">
                            <Form.Item label="Name">
                                <div className="el-input">
                                    <Field
                                        component="input"
                                        name="name"
                                        className="el-input__inner"
                                        placeholder="Ex.: Sports"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>
                        <Layout.Col span="12">
                            <Form.Item label="Points">
                                <div className="el-input">
                                    <Field
                                        component="input"
                                        name="points"
                                        className="el-input__inner"
                                        placeholder="Ex.: 1"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>
                    </Layout.Row>

                    <h2>Feedback</h2>
                    <hr />

                    <Form.Item label="General">
                        <div className="el-textarea">
                            <Field
                                component="textarea"
                                name="generalFeedback"
                                className="el-textarea__inner"
                            />
                        </div>
                    </Form.Item>

                    <Layout.Row gutter="24">
                        <Layout.Col span="12">
                            <Form.Item label="Wrong answer">
                                <div className="el-textarea">
                                    <Field
                                        component="textarea"
                                        name="wrongAnswer"
                                        className="el-textarea__inner"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>

                        <Layout.Col span="12">
                            <Form.Item label="Correct answer">
                                <div className="el-textarea">
                                    <Field
                                        component="textarea"
                                        name="correctAnswer"
                                        className="el-textarea__inner"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>

                    </Layout.Row>
                </Layout.Col>
            </Layout.Row>
            <Form.Item className="text-right">
                <Button
                    onClick={handleSubmit}
                    type="success" size="small">Create Exam</Button>
            </Form.Item>
        </Form>
    );   
}

export default ExamForm;