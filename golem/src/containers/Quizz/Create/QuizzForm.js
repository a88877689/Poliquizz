import React from 'react';
import { Form, Layout } from 'element-react';
import { FieldArray } from 'redux-form';
import NewQuizz from './NewQuizz';

const QuizzForm = (props) => {
    // const { handleSubmit } = props;
    return (
        <Form>
            <Layout.Row>
                <Layout.Col>
                    <FieldArray component={NewQuizz} name="quizzes" />
                </Layout.Col>
            </Layout.Row>
        </Form>
    );   
}

export default QuizzForm;