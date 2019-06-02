import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import * as quizzActions from "./../../../redux/actions/quizz";
import {
    MultiSelectForm,
    NumericForm,
    SelectMenuForm,
    TrueFalseForm
} from "./../../../containers/Quizz/index";


const Update = (props) => {
    let quizz = null;
    if(props.quizz != null) {
        switch(props.quizz.type) {
            case "MultiSelect":
                quizz = <MultiSelectForm initialValues={props.initialValues} update={true} />
                break;
            case "Numeric":
                quizz = <NumericForm initialValues={props.initialValues} update={true} />
                break;
            case "SelectMenu":
                quizz = <SelectMenuForm initialValues={props.initialValues} update={true} />
                break;
            case "TrueFalse":
                quizz = <TrueFalseForm initialValues={props.initialValues} update={true} />
                break;
            default:
                quizz = null;
                break
        }
    }
    
    return (
        <div className="golem-loader-wrapper">
            <LoadingOverlay
                active={props.loading}
                spinner={<CircleLoader color={"#EB2F64"} />}
            >
                <Title
                    title="Quizz Update"
                    pages={[
                        { to: "/", pageName: "Home" },
                        { to: "/quizz", pageName: "Quizz" },
                        { pageName: "Update" }
                    ]}
                />
                
                <div className="golem-margin-left__medium golem-margin-right__medium">
                    {quizz}
                </div>
            </LoadingOverlay>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.loader,
        ...state.quizz,
        initialValues: state.quizz.quizz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetQuizz: (id) => dispatch(quizzActions.getQuizzAction(id))
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        async componentDidMount() {
            const { match } = this.props;
            this.props.onGetQuizz(match.params.id)
        }
    })
)(Update);