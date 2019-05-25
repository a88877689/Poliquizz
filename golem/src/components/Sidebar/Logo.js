import React from "react";
import { connect } from "react-redux";
import PoliquizzLogo from "./../../assets/logo.png";

const Logo = (props) => {
    return (
        <React.Fragment>
            <img 
                className="golem-sidebar__logo"
                src={PoliquizzLogo}
                alt="golem-logo"
            />
            {!props.isCollapsed ? <span
                className="golem-sidebar__title"
            >
                POLIQUIZZ
            </span> : null}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.sidebar
    }
}

export default connect(
    mapStateToProps
)(Logo);