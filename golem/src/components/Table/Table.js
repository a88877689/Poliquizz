import React from "react";
import ReactTable from 'react-table'

const Table = (props) => (
    <React.Fragment>
        <ReactTable
            data={props.data}
            columns={props.columns}
            showPagination={false}
            minRows={props.data.length > 0 ? props.data.length : 4}
            noDataText="No data to show!"
            getTdProps={props.data.length > 0 ? props.clickEvent : () => ({})}
            className="-striped -highlight"
        />
    </React.Fragment>
);

export default Table;