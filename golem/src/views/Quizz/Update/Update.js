import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import Title from "./../../../components/Title/Title";
import { MultiSelect, Numeric, SelectMenu, TrueFalse } from "./../../../components/Quizz/index";
import * as loaderActions from "./../../../redux/actions/loader";
import * as quizzActions from "./../../../redux/actions/quizz";

const Update = (props) => {
    let quizz = null;
    if(props.quizz != null) {
        switch(props.quizz.type) {
            case "MultiSelect":
                quizz = <MultiSelect initialValues={props.initialValues} update={true} />
                break;
            case "Numeric":
                quizz = <Numeric initialValues={props.initialValues} update={true} />
                break;
            case "SelectMenu":
                quizz = <SelectMenu initialValues={props.initialValues} update={true} />
                break;
            case "TrueFalse":
                quizz = <TrueFalse initialValues={props.initialValues} update={true} />
                break;
            default:
                quizz = null;
                break
        }
    }
    
    return (
        <React.Fragment>
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
        </React.Fragment>
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
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
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