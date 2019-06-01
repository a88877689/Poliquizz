import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import Title from "./../../../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BootstrapTable from "react-bootstrap-table-next";
import { createNotification } from 'react-redux-notify';
import { getAllExams, deleteExam } from "./../../../api/exam";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import * as loaderActions from "./../../../redux/actions/loader";
import { onSuccess, onError } from "./../../../notifications/notify";

const Listing = (props) => {
    // eslint-disable-next-line
    const [ ignored, forceUpdate ] = useReducer(x => x, 0);
    let [ examState, setExamState ] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line
        const fetchData = async () => {
            try {
                props.onShowLoader();
                const response = await getAllExams();
                props.onCreateNotification(onSuccess(response.data.message));
                const data = response.data.exams;
                data.map(element => {
                    element.xml = (<Button variant="primary"><FontAwesomeIcon icon="download" /></Button>);
                    element.delete = (<Button variant="danger"><FontAwesomeIcon icon="trash" /></Button>);
                    return element
                });
                setExamState(data);
                props.onHideLoader();
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
                props.onHideLoader();
            }
        }
        fetchData();
    }, []);

    const downloadXML = (row) => {
        console.log("downloadXML", row);
    }

    const handleUpdate = (row) => {
        props.history.replace(`/exam/update/${row.id}`);
    }

    const handleDelete = async (row, rowIndex) => {
        try {
            props.onShowLoader();
            const response = await deleteExam(row.id);
            props.onCreateNotification(onSuccess(response.data.message));
            let data = examState;
            data.splice(rowIndex, 1);
            setExamState(data);
            forceUpdate();
            props.onHideLoader();
        } catch(error) {
            let message = error.response.data.message;
            if(!message) message = "Oops! Something went wront";
            props.onCreateNotification(onError(message));
            props.onHideLoader();
        }
    }

    const onCreateNewExam = () => {
        props.history.replace("/exam/create")
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleUpdate(row);
                }
            }
        },
        {
            dataField: "name",
            text: "Name",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleUpdate(row);
                }
            }
        },
        {
            dataField: "date",
            text: "Date",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleUpdate(row);
                }
            }
        },
        {
            dataField: "xml",
            text: "XML",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    downloadXML(row);
                }
            }
        },
        {
            dataField: "delete",
            text: "",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleDelete(row, rowIndex);
                }
            }
        }
    ];

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
                        onClick={onCreateNewExam}
                        className="golem-margin-left__medium golem-margin-top__small"
                        variant="success"
                    >
                        Create New Exam
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="golem-margin__medium golem-text-align__center">
                        <LoadingOverlay
                            active={props.loading}
                            spinner={<CircleLoader color={"#EB2F64"} />}
                        >
                            <BootstrapTable
                                keyField="id"
                                data={ examState }
                                columns={ columns }
                                noDataIndication="Table is empty"
                                condensed
                                striped
                                hover
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
        onCreateNotification: (config) => dispatch(createNotification(config))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Listing);