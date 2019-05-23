import React from 'react';
import { Button, Form, Layout } from 'element-react';
import { Field, FieldArray } from 'redux-form';
import AddQuizz from './AddQuizz';

// import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { reduxForm } from 'redux-form';
// import { createQuizz } from '@/api/quizz';

const ExamForm = (props) => {
    const { handleSubmit } = props;
    return (
        <Form>
            <Layout.Row gutter="24">
                <Layout.Col>
                    <Layout.Row gutter="24">
                        <Layout.Col lg="12">
                            <Form.Item label="Name">
                                <div className="el-input">
                                    <Field
                                        component="input"
                                        name="name"
                                        className="el-input__inner"
                                        placeholder="Ex.: Exam No. 1"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>
                        <Layout.Col lg="12">
                            <Form.Item label="Points">
                                <div className="el-input">
                                    <Field
                                        component="input"
                                        name="points"
                                        className="el-input__inner"
                                        placeholder="Ex.: 10"
                                    />
                                </div>
                            </Form.Item>
                        </Layout.Col>
                    </Layout.Row>

                    <Form.Item label="General Feedback">
                        <div className="el-textarea">
                            <Field
                                component="textarea"
                                name="generalFeedback"
                                className="el-textarea__inner"
                            />
                        </div>
                    </Form.Item>
                </Layout.Col>

                <h2>Quizzes</h2>
                <hr />

                <Layout.Col>
                    <FieldArray component={AddQuizz} name="quizzes" />
                </Layout.Col>
            </Layout.Row>
            <Form.Item style={{ marginTop: "20px" }} className="text-right">
                <Button
                    onClick={handleSubmit}
                    type="success">Create Exam</Button>
            </Form.Item>
        </Form>
    );   
}

// export default compose(
//     connect(
//         state => state.loader
//     ), reduxForm({
//         form: 'create-quizz',
//         onSubmit: async values => {
//             console.log(values);
//             const response = await createQuizz(values);
//             console.log(response);
//         }
//     })
// )(ExamForm);
export default ExamForm;