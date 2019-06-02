import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { createNotification } from 'react-redux-notify';
import { quizzColumns } from "./../../../utils/tableColumns";
import { getAllQuizzes, deleteQuizz } from "./../../../api/quizz";
import { onSuccess, onError } from "./../../../notifications/notify";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import Table from "./../../../containers/Table/Table";
import * as loaderActions from "./../../../redux/actions/loader";

const Listing = (props) => {
    let [ quizzState, setQuizzState ] = useState([]);
    let { onShowLoader, onHideLoader, onNotification } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                onShowLoader();
                const response = await getAllQuizzes();
                const data = response.data.quizzes.map(quizz => {
                    return {
                        id: quizz.id,
                        idExam: quizz.idExam,
                        quizz: quizz.quizz,
                        name: quizz.quizz.name,
                        type: quizz.quizz.type
                    }
                });
                onNotification(onSuccess(response.data.message));
                setQuizzState(data);
                onHideLoader();
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                onNotification(onError(message));
                onHideLoader();
            }
        }
        fetchData();
    }, [onShowLoader, onHideLoader, onNotification])

    return (
        <React.Fragment>
            <Title
                title="Quizz Listing"
                pages={[
                    { to: "/", pageName: "Home" },
                    { pageName: "Quizz" }
                ]}
            />
            <Row>
                <Col xs={12}>
                    <div className="golem-margin__medium 
                                    golem-text-align__center
                                    golem-font-size__twelve">
                        <LoadingOverlay
                            active={props.loading}
                            spinner={<CircleLoader color={"#EB2F64"} />}
                        >
                            <Table
                                data={quizzState}
                                columns={quizzColumns}
                                requested="quizz"
                                deleteEndpoint={deleteQuizz}
                            />
                        </LoadingOverlay>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowLoader: () => dispatch(loaderActions.showLoader()),
        onHideLoader: () => dispatch(loaderActions.hideLoader()),
        onNotification: (config) => dispatch(createNotification(config))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Listing);