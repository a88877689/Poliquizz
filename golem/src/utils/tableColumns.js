import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userColumns = [
    {
        Header: "ID",
        accessor: "id",
        width: 75
    },
    {
        Header: "Username",
        accessor: "username",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Lastname",
        accessor: "lastname",
    },
    {
        Header: "Role",
        accessor: "role",
        filterable: true
    },
    {
        Header: "",
        accessor: "",
        width: 50,
        Cell: () => (
            <Button variant="danger">
                <FontAwesomeIcon icon="trash" />
            </Button>
        )
    }
];

const examColumns = [
    {
        Header: "ID",
        accessor: "id",
        width: 75
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Date",
        accessor: "date",
        width: 200
    },
    {
        Header: "XML",
        accessor: "xml",
        width: 50
    },
    {
        Header: "Solve",
        accessor: "",
        width: 50,
        Cell: () => (
            <Button variant="success" disabled>
                <FontAwesomeIcon icon="pencil-alt" />
            </Button>
        )
    },
    {
        Header: "",
        accessor: "",
        width: 50,
        Cell: () => (
            <Button variant="danger">
                <FontAwesomeIcon icon="trash" />
            </Button>
        )
    }
];

const quizzColumns = [
    {
        Header: "ID",
        accessor: "id",
        width: 75
    },
    {
        Header: "ExamID",
        accessor: "idExam",
        width: 100,
        filterable: true
    },
    {
        Header: "Quizz",
        accessor: "name",
    },
    {
        Header: "Type",
        accessor: "type",
        width: 200,
        filterable: true
    },
    {
        Header: "",
        accessor: "",
        width: 50,
        Cell: () => (
            <Button variant="danger">
                <FontAwesomeIcon icon="trash" />
            </Button>
        )
    }
];

const studentExamColumns = [
    {
        Header: "ID",
        accessor: "id",
        width: 75
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Date",
        accessor: "date",
        width: 200
    },
    {
        Header: "XML",
        accessor: "xml",
        width: 50
    },
    {
        Header: "Solve",
        accessor: "",
        width: 50,
        Cell: () => (
            <Button variant="success" disabled>
                <FontAwesomeIcon icon="pencil-alt" />
            </Button>
        )
    }
];

export {
    userColumns,
    examColumns,
    quizzColumns,
    studentExamColumns
}