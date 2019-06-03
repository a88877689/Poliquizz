import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import Title from "./../../../components/Title/Title";
import Table from "./../../../containers/Table/Table";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { createNotification } from 'react-redux-notify';
import { examColumns, studentExamColumns } from "./../../../utils/tableColumns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllExams, deleteExam } from "./../../../api/exam";
import { onSuccess, onError } from "./../../../notifications/notify";
import * as loaderActions from "./../../../redux/actions/loader";

const Listing = (props) => {
    let [ examState, setExamState ] = useState([]);
    let { onShowLoader, onHideLoader, onNotification } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                onShowLoader();
                const response = await getAllExams();
                onNotification(onSuccess(response.data.message));
                response.data.exams.map(exam => {
                    exam.xml = (
                        <a
                            href={`${process.env.REACT_APP_API_URL}/xml/${exam.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="primary">
                                <FontAwesomeIcon icon="download" />
                            </Button>
                        </a>
                    )
                    return exam
                });
                setExamState(response.data.exams);
                onHideLoader();
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                onNotification(onError(message));
                onHideLoader();
            }
        }
        fetchData();
    }, [onShowLoader, onHideLoader, onNotification])

    const onCreateNewUser = () => {
        props.history.replace("/exam/create")
    }

    return (
        <React.Fragment>
            <Title
                title="Exams Listing"
                pages={[
                    { to: "/", pageName: "Home" },
                    { pageName: "Exam" }
                ]}
            />
            <Row>
                <Col>
                    <Button
                        size="lg"
                        onClick={onCreateNewUser}
                        className="golem-margin-left__medium
                                   golem-margin-top__small"
                        variant="success"
                    >
                        Create New Exam
                    </Button>
                </Col>
            </Row>
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
                                data={examState}
                                columns={props.user.role !== "student" ? examColumns : studentExamColumns}
                                requested="exam"
                                deleteEndpoint={deleteExam}
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
        ...state.loader,
        ...state.user
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