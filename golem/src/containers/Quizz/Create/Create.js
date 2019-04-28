import React, { Component } from 'react';
import { Button, Form, Input, Tabs, Layout } from 'element-react';
import { Numeric, SelectMenu, TrueFalse } from '@/containers/Quizz/Types/index';
import PageTitle from '@/components/PageTitle/PageTitle';
import './Create.scss';

class Create extends Component {
    state = {
        numericQuizz: {
            response: 0,
            errorRange: 0
        }        
    }
    render() {
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
                        <Form.Item label="Name">
                            <Input placeholder="Ex.: Presidents" />
                        </Form.Item>
                        <Form.Item label="Quizz">
                            <Input type="textarea" placeholder="Ex.: Who is the current president of México?" />
                        </Form.Item>

                        <Form.Item label="Quizz type">
                            <Tabs type="border-card" activeName="1">
                                <Tabs.Pane label="Numeric" name="1">
                                    <Numeric />
                                </Tabs.Pane>
                                <Tabs.Pane label="Multi-response" name="2">Config</Tabs.Pane>
                                <Tabs.Pane label="Select-menu" name="3">
                                    <SelectMenu />
                                </Tabs.Pane>
                                <Tabs.Pane label="True or false" name="4">
                                    <TrueFalse />
                                </Tabs.Pane>
                            </Tabs>
                        </Form.Item>

                        <h2>Feedback</h2>

                        <hr />

                        <Form.Item label="General">
                            <Input type="textarea" />
                        </Form.Item>

                        <Layout.Row gutter="30">
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

                        <Form.Item className="text-right">
                            <Button type="success">Create quizz</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default Create;