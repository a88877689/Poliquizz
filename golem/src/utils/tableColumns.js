import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usersColumns = [
    {
        Header: "ID",
        accessor: "id",
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

export {
    usersColumns
}