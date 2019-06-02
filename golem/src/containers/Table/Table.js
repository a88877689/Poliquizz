import React from "react";
import ReactTable from "react-table"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify";
import { onSuccess, onWarning, onError } from "../../notifications/notify";
import { getXML } from "./../../api/xml";
import * as loaderActions from "../../redux/actions/loader";

const Table = (props) => {
    const clickEvent = (state, rowInfo, column, instance) => {
        return {
            onClick: async () => {
                if(column.Header === "") {
                    if(rowInfo.original.role === props.user.role) {
                        props.onNotification(onWarning("Admin users can't be deleted."));
                    } else {
                        try {
                            props.onShowLoader();
                            const response = await props.deleteEndpoint(rowInfo.original.id);
                            props.onNotification(onSuccess(response.data.message));
                            props.onHideLoader();
                        } catch(error) {
                            let message = error.response ? error.response.data.message : "Oops! Something went wront";
                            props.onNotification(onError(message));
                            props.onHideLoader();
                        }
                    }
                } else if(column.Header === "XML" ) {
                    try {
                        await getXML(rowInfo.original.id);
                    } catch(error) {
                        let message = error.response ? error.response.data.message : "Oops! Something went wront";
                        props.onNotification(onError(message));
                        props.onHideLoader();
                    }
                } else {
                    props.history.replace(`/${props.requested}/update/${rowInfo.original.id}`)
                }
            }
        }
    }

    return (
        <React.Fragment>
            <ReactTable
                data={props.data}
                columns={props.columns}
                showPagination={false}
                minRows={props.data.length > 0 ? props.data.length : 4}
                noDataText="No data to show!"
                getTdProps={props.data.length > 0 ? clickEvent : () => ({})}
                className="-striped -highlight"
            />
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Table)
);