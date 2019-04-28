import React, { Component } from 'react';
import { Button, Form, Input, Layout } from 'element-react';
import PageTitle from '@/components/PageTitle/PageTitle';
import { reduxForm, Field, FieldArray } from 'redux-form';
import './Create.scss';
import NewQuizz from './NewQuizz';
import { createQuizz } from '@/api/quizz';

class Create extends Component {
    state = {
        numericQuizz: {
            response: 0,
            errorRange: 0
        }        
    }
    render() {
        const { handleSubmit } = this.props;

        return (
            <React.Fragment>
                <PageTitle
                    title="Create Quizz"
                    pages={[
                        { to: '/quizz', title: 'Quizz'},
                        { title: 'Create Quizz'}
                    ]}
                />
                <div className="golem-quizz-container">
                    <Form>
                        <Form.Item className="text-right">
                            <Button onClick={handleSubmit} type="success" size="small">Create quizz</Button>
                        </Form.Item>

                        <Layout.Row gutter="24">
                            <Layout.Col span="16">
                                <FieldArray component={NewQuizz} name="quizzes" />
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
                                                    placeholder="Ex.: Presidents"
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
                                    <Input type="textarea" />
                                </Form.Item>

                                <Layout.Row gutter="24">
                                    <Layout.Col span="12">
                                        <Form.Item label="Wrong answer">
                                            <Input type="textarea" />
                                        </Form.Item>
                                    </Layout.Col>

                                    <Layout.Col span="12">
                                        <Form.Item label="Correct answer">
                                            <Input type="textarea" />
                                        </Form.Item>
                                    </Layout.Col>
                                </Layout.Row>
                            </Layout.Col>
                        </Layout.Row>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default reduxForm({
    form: 'create-quizz',
    onSubmit: async values => {
        const response = await createQuizz(values);
    }
})(Create);