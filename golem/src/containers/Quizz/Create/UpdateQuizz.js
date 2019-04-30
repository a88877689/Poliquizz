import React from 'react';
import { reduxForm } from 'redux-form';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import PageTitle from '@/components/PageTitle/PageTitle';
import { getQuizzAction } from './../../../actions/quizz';
import Loader from '@/components/Loader/Loader';
import { connect } from 'react-redux';
import QuizzForm from './QuizzForm';
import './Create.scss';

const Update = ({ quizz }) => (
    <div className='golem-main-view-container'>
        <PageTitle
            title=" Update Quizz"
            pages={[
                { to: '/quizz', title: 'Quizz'},
                { title: quizz && quizz.name }
            ]}
        />
        <div className="golem-quizz-container">
            <QuizzForm />
        </div>
    </div>
);

export default compose(
    connect(
        state => ({
            ...state.quizz,
            text: 'Loading...',
            initialValues: state.quizz.quizz
        })
    ),
    lifecycle({
        async componentDidMount() {
            const { match, dispatch } = this.props;
            dispatch(getQuizzAction(match.params.id));
        }
    }),
    branch(
        props => !props.quizz,
        renderComponent(Loader)
    ),
    reduxForm({
        form: 'update-quizz',
        onSubmit: async (values, dispatch, props) => {
            // let { id } = props.location.params;
            // const response = await updateQuizz(id, values);
            // console.log(response);
        }
    })
)(Update);