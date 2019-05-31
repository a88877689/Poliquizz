import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BootstrapTable from "react-bootstrap-table-next";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { createNotification } from 'react-redux-notify';
import Title from "./../../../components/Title/Title";
import { getAllQuizzes, deleteQuizz } from "./../../../api/quizz";
import * as loaderActions from "./../../../redux/actions/loader";
import { onSuccess, onError } from "./../../../notifications/notify";

const Listing = (props) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [ ignored, forceUpdate ] = useReducer(x => x + 1, 0);
    let [ quizzState, setQuizzState ] = useState([]);

    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchData = async () => {
            try {
                props.onShowLoader();
                const response = await getAllQuizzes();
                props.onCreateNotification(onSuccess(response.data.message));
                response.data.quizzes.map(element => {
                    element.type = element.quizz.type;
                    element.delete = (
                        <Button variant="danger">
                            <FontAwesomeIcon icon="trash" />
                        </Button>
                    );
                    return element
                });
                setQuizzState(response.data.quizzes);
                props.onHideLoader();
            } catch(error) {
                let message = error.response ? error.response.data.message : "Oops! Something went wront";
                props.onCreateNotification(onError(message));
                props.onHideLoader();
            }
        }
        fetchData();
    }, []);

    const handleUpdate = (row) => {
        props.history.replace(`/quizz/update/${row.id}`);
    }

    const handleDelete = async (row, rowIndex) => {
        try {
            props.onShowLoader()
            const response = await deleteQuizz(row.id);
            props.onCreateNotification(onSuccess(response.data.message));
            let data = quizzState;
            data.splice(rowIndex, 1);
            setQuizzState(data);
            forceUpdate();
            props.onHideLoader()
        } catch(error) {
            let message = error.response.data.message;
            if(!message) message = "Oops! Something went wront";
            props.onCreateNotification(onError(message));
            props.onHideLoader();
        }
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
            dataField: "idExam",
            text: "Exam ID",
            filter: textFilter(),
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleUpdate(row);
                }
            }
        },
        {
            dataField: "type",
            text: "Type",
            events: {
                onClick(event, column, columnIndex, row, rowIndex) {
                    handleUpdate(row);
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
                title="Quizz Listing"
                pages={[
                    { to: "/", pageName: "Home" },
                    { pageName: "Quizz" }
                ]}
            />
            <Row>
                <Col xs={12}>
                    <div className="golem-margin__medium golem-text-align__center">
                        <LoadingOverlay
                            active={props.loading}
                            spinner={<CircleLoader color={"#EB2F64"} />}
                        >
                            <BootstrapTable
                                keyField="id"
                                data={ quizzState }
                                columns={ columns }
                                noDataIndication="Table is empty"
                                filter={ filterFactory() }
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