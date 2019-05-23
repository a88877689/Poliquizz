import React, { Component } from 'react';
import { Loading } from 'element-react';
import { reduxForm } from 'redux-form';
import PageTitle from '@/components/PageTitle/PageTitle';
import { createQuizz } from '@/api/quizz';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ExamForm from './ExamForm';
import './Create.scss';

class Create extends Component {
    render() {
        return (
            <Loading
                loading={this.props.loading}
                text='Loading...'>
                <div className='golem-main-view-container'>
                    <PageTitle
                        title="Create Exam"
                        pages={[
                            { to: '/exams', title: 'Exams'},
                            { title: 'Create Exam'}
                        ]}
                    />
                    <div className="golem-quizz-container">
                        <ExamForm />
                    </div>
                </div>
            </Loading>
        );
    }
}

export default compose(
    connect(
        state => state.loader
    ), reduxForm({
        form: 'create-quizz',
        onSubmit: async values => {
            console.log(values);
            const response = await createQuizz(values);
            console.log(response);
        }
    })
)(Create);