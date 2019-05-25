import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CollapseButton = (props) => {
    let collapseBtn = null;
    if(!props.isCollapsed) {
        collapseBtn = (
            <React.Fragment>
                <FontAwesomeIcon icon="chevron-left" className="golem-sidenav__icon" />
                <FontAwesomeIcon icon="chevron-left" className="golem-sidenav__icon" />
                <FontAwesomeIcon icon="chevron-left" className="golem-sidenav__icon" />
                <span className="golem-margin-left__small">Collapse</span>
            </React.Fragment>
        );
    } else {
        collapseBtn = (
            <FontAwesomeIcon icon="chevron-right" className="golem-sidenav__icon" />
        );
    }
    return collapseBtn;
}

const mapStateToProps = (state) => {
    return {
        ...state.sidebar
    }
}

export default connect(
    mapStateToProps
)(CollapseButton);