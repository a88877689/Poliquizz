import React, { useEffect, useState, useReducer } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import Title from "./../../../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BootstrapTable from "react-bootstrap-table-next";
import { getAllExams } from "./../../../mock/exam";
import LoadingOverlay from "react-loading-overlay";
import CircleLoader from "react-spinners/CircleLoader";
import * as loaderActions from "./../../../redux/actions/loader";

const fakeData = [
    {
        id: 1,
        name: "Sports",
        date: "2019",
        // xml: (<Button variant="primary"><FontAwesomeIcon icon="download" /></Button>),
        // delete: (<Button variant="danger"><FontAwesomeIcon icon="trash" /></Button>)
    },
    {
        id: 2,
        name: "Python",
        date: "2019",
        // xml: (<Button variant="primary"><FontAwesomeIcon icon="download" /></Button>),
        // delete: (<Button variant="danger"><FontAwesomeIcon icon="trash" /></Button>)
    },
    {
        id: 3,
        name: "WAD",
        date: "2019",
        // xml: (<Button variant="primary"><FontAwesomeIcon icon="download" /></Button>),
        // delete: (<Button variant="danger"><FontAwesomeIcon icon="trash" /></Button>)
    },
];

const Listing = (props) => {
    const [ ignored, forceUpdate ] = useReducer(x => x + 1, 0);
    let [ examState, setExamState ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                props.onShowLoader();
                // const response = await getAllExams();
                // const data = response.data;
                const data = fakeData;
                data.map(element => {
                    element.xml = (<Button variant="primary"><FontAwesomeIcon icon="download" /></Button>);
                    element.delete = (<Button variant="danger"><FontAwesomeIcon icon="trash" /></Button>);
                    return element
                });
                setExamState(data);
                props.onHideLoader();
            } catch(error) {
                console.log(error);
                props.onHideLoader();
            }
        }
        fetchData();
    }, []);

    const downloadXML = (row) => {
        console.log("downloadXML", row);
    }

    const handleUpdate = (row) => {
        console.log("handleUpdate", row);
    }

    const handleDelete = (rowIndex) => {
        try {
            let data = examState;
            data.splice(rowIndex, 1);
            setExamState(data);
            forceUpdate();
        } catch(error) {
            console.log(error);
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
                    handleDelete(rowIndex);
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
        onHideLoader: () => dispatch(loaderActions.hideLoader())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Listing);