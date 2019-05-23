import React, { Component } from 'react';
import { Loading } from 'element-react';
import { reduxForm } from 'redux-form';
import PageTitle from '@/components/PageTitle/PageTitle';
import { createQuizz } from '@/api/quizz';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import QuizzForm from './QuizzForm';
import './Create.scss';

class Create extends Component {
    render() {
        return (
            <Loading
                loading={this.props.loading}
                text='Loading...'>
                <div className='golem-main-view-container'>
                    <PageTitle
                        title="Create Quizz"
                        pages={[
                            { to: '/quizz', title: 'Quizz'},
                            { title: 'Create Quizz'}
                        ]}
                    />
                    <div className="golem-quizz-container">
                        <QuizzForm />
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